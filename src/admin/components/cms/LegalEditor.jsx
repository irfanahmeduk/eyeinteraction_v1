"use client";

import React from "react";
import { Collapse, Input, Typography, Tag, Space, Card, Button } from "antd";
import { FileTextOutlined, LinkOutlined } from "@ant-design/icons";
import { RichTextEditor } from "./RichTextEditor";

const { Text } = Typography;

const DEFAULT_PAGES = [
  { key: "privacy-policy", defaultTitle: "Privacy Policy" },
  { key: "terms-and-conditions", defaultTitle: "Terms & Conditions" },
  { key: "disclaimer", defaultTitle: "Disclaimer" },
  { key: "copyright", defaultTitle: "Copyright" },
];

export function LegalEditor({ legal = {}, onChange }) {
  const keys = Object.keys(legal).length > 0
    ? Object.keys(legal)
    : DEFAULT_PAGES.map(p => p.key);

  const updatePage = (key, patch) => {
    const currentPage = legal[key] || {
      title: key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      summary: "",
      updatedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      content: "",
    };
    onChange({
      ...legal,
      [key]: {
        ...currentPage,
        ...patch,
      },
    });
  };

  const collapseItems = keys.map(key => {
    const page = legal[key] || {};
    const title = page.title || key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const wordCount = (page.content || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;

    return {
      key,
      label: (
        <div className="cms-legal-header-label">
          <Space align="center" size={10}>
            <FileTextOutlined style={{ color: "var(--color-primary)", fontSize: "15px" }} />
            <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--text)" }}>{title}</span>
            <Tag style={{ margin: 0, fontSize: "11px", fontWeight: 500 }}>/{key}</Tag>
          </Space>
          <Space size={8} className="cms-legal-meta-tags">
            {page.updatedAt && (
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Updated {page.updatedAt}
              </Text>
            )}
            <Tag color="default" style={{ margin: 0, fontSize: "11px" }}>
              {wordCount} words
            </Tag>
          </Space>
        </div>
      ),
      extra: (
        <Button
          size="small"
          type="text"
          icon={<LinkOutlined />}
          href={`/${key}`}
          target="_blank"
          onClick={e => e.stopPropagation()}
        >
          View page
        </Button>
      ),
      children: (
        <div className="cms-fields cms-legal-fields">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
            <label className="cms-field">
              <Text strong style={{ fontSize: "13px" }}>Page Title</Text>
              <Input
                value={page.title || ""}
                onChange={e => updatePage(key, { title: e.target.value })}
                placeholder="e.g. Privacy Policy"
              />
            </label>

            <label className="cms-field">
              <Text strong style={{ fontSize: "13px" }}>Last Updated Date</Text>
              <Input
                value={page.updatedAt || ""}
                onChange={e => updatePage(key, { updatedAt: e.target.value })}
                placeholder="e.g. 21 September 2026"
              />
            </label>
          </div>

          <label className="cms-field">
            <Text strong style={{ fontSize: "13px" }}>Page Summary (Subtitle / Meta description)</Text>
            <Input.TextArea
              rows={2}
              value={page.summary || ""}
              onChange={e => updatePage(key, { summary: e.target.value })}
              placeholder="Brief summary shown at the top of the policy page and in search engines"
            />
          </label>

          <div className="cms-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Text strong style={{ fontSize: "13px" }}>Policy Body Content (Rich Text)</Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>Supports headings, bold, lists, and links</Text>
            </div>
            <RichTextEditor
              value={page.content || ""}
              onChange={content => updatePage(key, { content })}
              placeholder="Enter full legal document text..."
              minHeight={260}
            />
          </div>
        </div>
      ),
    };
  });

  return (
    <Card className="cms-editor-panel cms-legal-panel" title="Legal & Compliance Policies" extra={<Text type="secondary" style={{ fontSize: "12px" }}>Each section is collapsible</Text>}>
      <Collapse
        accordion
        defaultActiveKey={[keys[0]]}
        items={collapseItems}
        className="cms-legal-collapse"
      />
    </Card>
  );
}
