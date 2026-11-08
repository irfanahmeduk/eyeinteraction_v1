"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Switch,
  Tag,
  Typography,
  Collapse,
  Space,
  Popconfirm,
  Tooltip,
  Empty,
  Divider,
} from "antd";
import {
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { ImageUpload } from "./ImageUpload";

const { Text, Title } = Typography;

function blankStory() {
  const id = Date.now().toString(36);
  return {
    slug: `candidate-${id}`,
    published: true,
    name: "New Candidate",
    role: "Global Talent Endorsed",
    field: "Software Engineering",
    outcome: "Endorsement Approved",
    duration: "6 Months",
    approvedDate: new Date().getFullYear().toString(),
    grantedDate: new Date().getFullYear().toString(),
    avatar: "",
    coverImage: "",
    eyebrow: "Success Story",
    title: "Endorsement Journey",
    subtitle: "How structured mentorship led to an approved endorsement.",
    intro: "Professional background and achievements positioned for recognition.",
    quote: "The guidance and feedback were invaluable throughout the entire process.",
    highlights: ["Profile & gap review completed", "Document structuring and evidence presentation"],
    timeline: [
      { date: "Month 1", title: "Assessment & Gap Review", description: "Initial profile assessment and evidence roadmap." },
      { date: "Month 6", title: "Endorsement Approved", description: "Application formally endorsed." },
    ],
  };
}

export function StoriesEditor({ stories = [], onChange }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const updateStory = (index, patch) => {
    const updated = stories.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange(updated);
  };

  const addStory = () => {
    const newStory = blankStory();
    onChange([newStory, ...stories]);
    setActiveStoryIndex(0);
  };

  const removeStory = index => {
    const updated = stories.filter((_, i) => i !== index);
    onChange(updated);
    if (activeStoryIndex >= updated.length) {
      setActiveStoryIndex(Math.max(0, updated.length - 1));
    }
  };

  const moveStory = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= stories.length) return;
    const updated = [...stories];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(updated);
    setActiveStoryIndex(target);
  };

  const activeStory = stories[activeStoryIndex] || stories[0];

  return (
    <div className="cms-stories-container">
      <div className="cms-stories-layout">
        {/* Left Side: Stories List */}
        <Card
          className="cms-stories-sidebar"
          title="Candidate Stories"
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={addStory}
            >
              Add Story
            </Button>
          }
        >
          {stories.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No stories yet" />
          ) : (
            <div className="cms-stories-list">
              {stories.map((story, index) => {
                const isSelected = index === activeStoryIndex;
                return (
                  <div
                    key={story.slug || index}
                    className={`cms-story-item-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setActiveStoryIndex(index)}
                  >
                    <div className="cms-story-item-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={story.avatar || "/images/success-stories/irfan-ahmed-avatar.jpg"}
                        alt={story.name || "Avatar"}
                        className="cms-story-avatar-img"
                        onError={e => {
                          e.currentTarget.src = "/images/success-stories/irfan-ahmed-avatar.jpg";
                        }}
                      />
                    </div>

                    <div className="cms-story-item-info">
                      <div className="cms-story-item-top">
                        <span className="cms-story-name">{story.name || "Untitled"}</span>
                        <Tag color={story.published ? "success" : "default"} style={{ margin: 0, fontSize: "10px" }}>
                          {story.published ? "Live" : "Draft"}
                        </Tag>
                      </div>
                      <span className="cms-story-role">{story.role || story.field}</span>
                    </div>

                    <div className="cms-story-item-actions" onClick={e => e.stopPropagation()}>
                      <Tooltip title="Move up">
                        <Button
                          type="text"
                          size="small"
                          disabled={!index}
                          icon={<ArrowUpOutlined style={{ fontSize: "11px" }} />}
                          onClick={() => moveStory(index, -1)}
                        />
                      </Tooltip>
                      <Tooltip title="Move down">
                        <Button
                          type="text"
                          size="small"
                          disabled={index === stories.length - 1}
                          icon={<ArrowDownOutlined style={{ fontSize: "11px" }} />}
                          onClick={() => moveStory(index, 1)}
                        />
                      </Tooltip>
                      <Popconfirm
                        title="Delete this story?"
                        onConfirm={() => removeStory(index)}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined style={{ fontSize: "11px" }} />}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Right Side: Detailed Story Editor */}
        <Card
          className="cms-editor-panel cms-story-editor-card"
          title={
            activeStory ? (
              <Space size={8}>
                <UserOutlined style={{ color: "var(--color-primary)" }} />
                <span>{activeStory.name || "Story Details"}</span>
              </Space>
            ) : (
              "Story Details"
            )
          }
          extra={
            activeStory && (
              <Space align="center" size={12}>
                <Text type="secondary" style={{ fontSize: "12px" }}>Status:</Text>
                <Switch
                  checkedChildren="Published"
                  unCheckedChildren="Draft"
                  checked={activeStory.published !== false}
                  onChange={published => updateStory(activeStoryIndex, { published })}
                />
              </Space>
            )
          }
        >
          {!activeStory ? (
            <Empty description="Select a story from the list or click Add Story" />
          ) : (
            <div className="cms-fields">
              {/* Media Section: Avatar & Cover Image */}
              <div className="cms-story-media-grid">
                <ImageUpload
                  label="Candidate Photo (Avatar)"
                  type="avatar"
                  value={activeStory.avatar || ""}
                  onChange={avatar => updateStory(activeStoryIndex, { avatar })}
                />
                <ImageUpload
                  label="Cover / Hero Banner"
                  type="cover"
                  value={activeStory.coverImage || ""}
                  onChange={coverImage => updateStory(activeStoryIndex, { coverImage })}
                />
              </div>

              <Divider style={{ margin: "16px 0 8px" }} />

              {/* Candidate Info */}
              <Title level={5} style={{ margin: "0 0 8px" }}>Candidate & Endorsement Details</Title>
              <div className="cms-grid-3">
                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Full Name</Text>
                  <Input
                    value={activeStory.name || ""}
                    onChange={e => updateStory(activeStoryIndex, { name: e.target.value })}
                    placeholder="e.g. Irfan Ahmed"
                  />
                </label>

                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Role / Title</Text>
                  <Input
                    value={activeStory.role || ""}
                    onChange={e => updateStory(activeStoryIndex, { role: e.target.value })}
                    placeholder="e.g. AI Researcher / Founder"
                  />
                </label>

                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Professional Field</Text>
                  <Input
                    value={activeStory.field || ""}
                    onChange={e => updateStory(activeStoryIndex, { field: e.target.value })}
                    placeholder="e.g. Computer Vision & AI"
                  />
                </label>
              </div>

              <div className="cms-grid-3">
                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Outcome Badge</Text>
                  <Input
                    value={activeStory.outcome || ""}
                    onChange={e => updateStory(activeStoryIndex, { outcome: e.target.value })}
                    placeholder="e.g. Endorsement Approved"
                  />
                </label>

                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Duration</Text>
                  <Input
                    value={activeStory.duration || ""}
                    onChange={e => updateStory(activeStoryIndex, { duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                  />
                </label>

                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>URL Slug</Text>
                  <Input
                    value={activeStory.slug || ""}
                    onChange={e => updateStory(activeStoryIndex, { slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                    placeholder="e.g. irfan-ahmed"
                  />
                </label>
              </div>

              <Divider style={{ margin: "16px 0 8px" }} />

              {/* Story Content & Narrative */}
              <Title level={5} style={{ margin: "0 0 8px" }}>Story Headline & Narrative</Title>
              <div className="cms-grid-2">
                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Story Eyebrow</Text>
                  <Input
                    value={activeStory.eyebrow || ""}
                    onChange={e => updateStory(activeStoryIndex, { eyebrow: e.target.value })}
                    placeholder="e.g. Global Talent Spotlight"
                  />
                </label>

                <label className="cms-field">
                  <Text strong style={{ fontSize: "13px" }}>Main Headline</Text>
                  <Input
                    value={activeStory.title || ""}
                    onChange={e => updateStory(activeStoryIndex, { title: e.target.value })}
                    placeholder="e.g. From Confusion to Clarity"
                  />
                </label>
              </div>

              <label className="cms-field">
                <Text strong style={{ fontSize: "13px" }}>Subtitle</Text>
                <Input.TextArea
                  rows={2}
                  value={activeStory.subtitle || ""}
                  onChange={e => updateStory(activeStoryIndex, { subtitle: e.target.value })}
                  placeholder="Supporting subtitle explaining the journey"
                />
              </label>

              <label className="cms-field">
                <Text strong style={{ fontSize: "13px" }}>Candidate Quote</Text>
                <Input.TextArea
                  rows={2}
                  value={activeStory.quote || ""}
                  onChange={e => updateStory(activeStoryIndex, { quote: e.target.value })}
                  placeholder="Direct testimonial quote from the candidate"
                />
              </label>

              <label className="cms-field">
                <Text strong style={{ fontSize: "13px" }}>Introduction / Full Summary</Text>
                <Input.TextArea
                  rows={3}
                  value={activeStory.intro || ""}
                  onChange={e => updateStory(activeStoryIndex, { intro: e.target.value })}
                  placeholder="Introductory background narrative"
                />
              </label>

              <Divider style={{ margin: "16px 0 8px" }} />

              {/* Highlights List */}
              <div className="cms-array">
                <div className="cms-array-heading">
                  <Text strong style={{ fontSize: "14px" }}>Key Highlights (Bullet Points)</Text>
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const current = activeStory.highlights || [];
                      updateStory(activeStoryIndex, { highlights: [...current, "New achievement highlight"] });
                    }}
                  >
                    Add Highlight
                  </Button>
                </div>
                {(activeStory.highlights || []).map((highlight, hIndex) => (
                  <div key={hIndex} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <Input
                      value={highlight}
                      onChange={e => {
                        const updated = [...(activeStory.highlights || [])];
                        updated[hIndex] = e.target.value;
                        updateStory(activeStoryIndex, { highlights: updated });
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const updated = (activeStory.highlights || []).filter((_, i) => i !== hIndex);
                        updateStory(activeStoryIndex, { highlights: updated });
                      }}
                    />
                  </div>
                ))}
              </div>

              <Divider style={{ margin: "16px 0 8px" }} />

              {/* Journey Timeline */}
              <div className="cms-array">
                <div className="cms-array-heading">
                  <Text strong style={{ fontSize: "14px" }}>Journey Timeline Milestones</Text>
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const current = activeStory.timeline || [];
                      updateStory(activeStoryIndex, {
                        timeline: [...current, { date: "New Date", title: "Milestone Title", description: "Milestone details" }],
                      });
                    }}
                  >
                    Add Milestone
                  </Button>
                </div>
                {(activeStory.timeline || []).map((step, sIndex) => (
                  <div key={sIndex} className="cms-timeline-editor-item">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "8px", alignItems: "center" }}>
                      <Input
                        placeholder="e.g. Month 1 or November 2024"
                        value={step.date}
                        onChange={e => {
                          const updated = [...(activeStory.timeline || [])];
                          updated[sIndex] = { ...step, date: e.target.value };
                          updateStory(activeStoryIndex, { timeline: updated });
                        }}
                      />
                      <Input
                        placeholder="Milestone title"
                        value={step.title}
                        onChange={e => {
                          const updated = [...(activeStory.timeline || [])];
                          updated[sIndex] = { ...step, title: e.target.value };
                          updateStory(activeStoryIndex, { timeline: updated });
                        }}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          const updated = (activeStory.timeline || []).filter((_, i) => i !== sIndex);
                          updateStory(activeStoryIndex, { timeline: updated });
                        }}
                      />
                    </div>
                    <Input.TextArea
                      rows={2}
                      placeholder="Milestone description..."
                      value={step.description}
                      style={{ marginTop: "6px" }}
                      onChange={e => {
                        const updated = [...(activeStory.timeline || [])];
                        updated[sIndex] = { ...step, description: e.target.value };
                        updateStory(activeStoryIndex, { timeline: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
