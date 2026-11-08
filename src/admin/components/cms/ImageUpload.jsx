"use client";

import React, { useRef, useState } from "react";
import { Button, Input, Modal, message, Typography } from "antd";
import {
  UploadOutlined,
  EyeOutlined,
  DeleteOutlined,
  LinkOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { websiteApi } from "../../lib/websiteApi";

const { Text } = Typography;

export function ImageUpload({
  value = "",
  onChange,
  type = "cover", // "avatar" | "cover"
  label,
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [urlInputMode, setUrlInputMode] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const handleFile = async file => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      message.error("File is too large (maximum 5MB)");
      return;
    }

    setUploading(true);
    try {
      const data = await websiteApi.uploadMedia(file);
      onChange?.(data.url);
      message.success("Image uploaded");
    } catch (err) {
      message.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const isAvatar = type === "avatar";

  return (
    <div className="cms-image-upload-wrapper">
      {label && (
        <div style={{ marginBottom: 6 }}>
          <Text strong style={{ fontSize: "13px" }}>{label}</Text>
        </div>
      )}

      {value ? (
        <div className={`cms-image-preview-card ${isAvatar ? "avatar-layout" : "cover-layout"}`}>
          <div className="cms-image-thumb-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded thumbnail"
              className={isAvatar ? "cms-thumb-avatar" : "cms-thumb-cover"}
              onError={e => {
                e.currentTarget.src = isAvatar
                  ? "/images/success-stories/irfan-ahmed-avatar.jpg"
                  : "/images/success-stories/irfan-ahmed-cover.jpg";
              }}
            />
          </div>

          <div className="cms-image-meta">
            <Text ellipsis className="cms-image-url-text" title={value}>
              {value.split("/").pop() || value}
            </Text>
            <div className="cms-image-actions">
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => setPreviewVisible(true)}
              >
                View
              </Button>
              <Button
                size="small"
                loading={uploading}
                icon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
              >
                Change
              </Button>
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onChange?.("")}
              />
            </div>
          </div>
        </div>
      ) : urlInputMode ? (
        <div className="cms-image-url-form">
          <Input.Search
            placeholder="Enter image URL (e.g. /images/stories/avatar.jpg)"
            enterButton="Apply"
            value={customUrl}
            onChange={e => setCustomUrl(e.target.value)}
            onSearch={val => {
              if (val.trim()) {
                onChange?.(val.trim());
                setUrlInputMode(false);
                setCustomUrl("");
              }
            }}
          />
          <Button
            type="link"
            size="small"
            style={{ padding: 0, marginTop: 4 }}
            onClick={() => setUrlInputMode(false)}
          >
            Switch to file upload
          </Button>
        </div>
      ) : (
        <div
          className="cms-image-dropzone"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="cms-dropzone-content">
              <LoadingOutlined style={{ fontSize: 20, color: "var(--color-primary)" }} />
              <span style={{ fontSize: "13px" }}>Uploading image...</span>
            </div>
          ) : (
            <div className="cms-dropzone-content">
              <UploadOutlined style={{ fontSize: 18, color: "var(--muted)" }} />
              <div>
                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                  Click to upload or drag & drop
                </span>
                <span className="cms-dropzone-hint">
                  {isAvatar ? "Square recommended (PNG, JPG, WEBP up to 5MB)" : "16:9 banner (PNG, JPG, WEBP up to 5MB)"}
                </span>
              </div>
              <Button
                type="link"
                size="small"
                icon={<LinkOutlined />}
                style={{ padding: 0, fontSize: "12px", height: "auto" }}
                onClick={e => {
                  e.stopPropagation();
                  setUrlInputMode(true);
                }}
              >
                Paste URL instead
              </Button>
            </div>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        style={{ display: "none" }}
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />

      <Modal
        open={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
        width={isAvatar ? 360 : 700}
      >
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Full Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              borderRadius: isAvatar ? "50%" : "8px",
              objectFit: "contain",
              border: "1px solid var(--line)",
            }}
          />
          <div style={{ marginTop: 12 }}>
            <Text type="secondary" copyable>{value}</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}
