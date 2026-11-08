"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Segmented, Select, Button, Space, Tooltip, Badge } from "antd";
import {
  DesktopOutlined,
  TabletOutlined,
  MobileOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const PAGE_OPTIONS = [
  { value: "/", label: "Home Page (/)" },
  { value: "/about", label: "About Us (/about)" },
  { value: "/contact", label: "Contact (/contact)" },
  { value: "/eligibility", label: "Eligibility (/eligibility)" },
  { value: "/success-stories", label: "Success Stories (/success-stories)" },
  { value: "/privacy-policy", label: "Privacy Policy (/privacy-policy)" },
  { value: "/terms-and-conditions", label: "Terms & Conditions (/terms-and-conditions)" },
  { value: "/disclaimer", label: "Disclaimer (/disclaimer)" },
  { value: "/copyright", label: "Copyright (/copyright)" },
];

const DEVICE_WIDTHS = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function PreviewShell({ content, activeTab = "home" }) {
  const iframeRef = useRef(null);
  const [device, setDevice] = useState("desktop");
  const [targetPath, setTargetPath] = useState("/");
  const [synced, setSynced] = useState(true);

  // Sync target page based on active tab when tab changes
  useEffect(() => {
    if (activeTab === "legal") {
      setTargetPath("/privacy-policy");
    } else if (activeTab === "stories") {
      setTargetPath("/success-stories");
    } else if (activeTab === "navigation" || activeTab === "footer" || activeTab === "home") {
      setTargetPath("/");
    }
  }, [activeTab]);

  // Send preview update to iframe
  const sendUpdate = useCallback(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && content) {
      try {
        iframeRef.current.contentWindow.postMessage(
          { type: "CMS_PREVIEW_UPDATE", content },
          "*"
        );
        // Also sync to sessionStorage
        sessionStorage.setItem("cms_preview_content", JSON.stringify(content));
        setSynced(true);
      } catch {
        // Ignore cross-origin error
      }
    }
  }, [content]);

  // Send update whenever content changes
  useEffect(() => {
    setSynced(false);
    const timer = setTimeout(() => {
      sendUpdate();
    }, 150);
    return () => clearTimeout(timer);
  }, [content, sendUpdate]);

  // Listen for iframe readiness
  useEffect(() => {
    const handleMessage = event => {
      if (event.data && event.data.type === "CMS_PREVIEW_READY") {
        sendUpdate();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendUpdate]);

  const reloadIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `${targetPath}?preview=1&t=${Date.now()}`;
    }
  };

  return (
    <div className="cms-preview-shell">
      {/* Top Preview Control Bar */}
      <div className="cms-preview-toolbar">
        <Space size={16} align="center" wrap>
          <div className="cms-preview-page-select">
            <span style={{ fontSize: "12px", color: "var(--muted)", marginRight: 8 }}>Page:</span>
            <Select
              value={targetPath}
              onChange={val => {
                setTargetPath(val);
                if (iframeRef.current) {
                  iframeRef.current.src = `${val}?preview=1`;
                }
              }}
              style={{ width: 220 }}
              size="small"
              options={PAGE_OPTIONS}
            />
          </div>

          <Segmented
            size="small"
            value={device}
            onChange={setDevice}
            options={[
              { label: "Desktop", value: "desktop", icon: <DesktopOutlined /> },
              { label: "Tablet", value: "tablet", icon: <TabletOutlined /> },
              { label: "Mobile", value: "mobile", icon: <MobileOutlined /> },
            ]}
          />
        </Space>

        <Space size={12} align="center">
          <Badge
            status={synced ? "success" : "processing"}
            text={
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                {synced ? "Live Synced" : "Updating..."}
              </span>
            }
          />

          <Tooltip title="Refresh preview frame">
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={reloadIframe}
            />
          </Tooltip>

          <Button
            size="small"
            type="link"
            icon={<ArrowRightOutlined />}
            href={targetPath}
            target="_blank"
            style={{ fontSize: "12px", padding: 0 }}
          >
            Open in new tab
          </Button>
        </Space>
      </div>

      {/* Frame Container */}
      <div className="cms-preview-stage">
        <div
          className={`cms-preview-viewport ${device}`}
          style={{ width: DEVICE_WIDTHS[device] }}
        >
          <iframe
            ref={iframeRef}
            title="Website Live Preview"
            src={`${targetPath}?preview=1`}
            className="cms-preview-iframe"
            onLoad={sendUpdate}
          />
        </div>
      </div>
    </div>
  );
}
