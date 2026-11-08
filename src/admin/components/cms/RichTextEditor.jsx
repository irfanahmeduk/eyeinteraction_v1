"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Button, Tooltip, Space, Divider, Modal, Input } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  CodeOutlined,
  ClearOutlined,
} from "@ant-design/icons";

export function RichTextEditor({ value = "", onChange, placeholder = "Write content here...", minHeight = 220 }) {
  const editorRef = useRef(null);
  const [sourceMode, setSourceMode] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Track the last value we pushed INTO the editor so we can detect external changes
  const lastExternalValue = useRef(value);
  // Track whether the current change originated inside the editor (user typing)
  const isTyping = useRef(false);

  // Initialise the contentEditable div with the starting HTML exactly once.
  // We use useLayoutEffect so the DOM is ready before the browser paints.
  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
      lastExternalValue.current = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty – run once on mount only

  // When the value prop changes from outside (e.g. parent resets/loads data),
  // push the new HTML in imperatively — but ONLY if the user is not mid-type
  // and the value is actually different from what we last pushed.
  useEffect(() => {
    if (isTyping.current) return; // user is typing – don't steal the cursor
    if (value === lastExternalValue.current) return; // no real change

    lastExternalValue.current = value || "";
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  // Called on every keystroke / paste inside the editor
  const handleInput = () => {
    if (!editorRef.current) return;
    const newHtml = editorRef.current.innerHTML;
    lastExternalValue.current = newHtml;
    isTyping.current = true;

    // Reset typing flag after the current event loop so the useEffect above
    // won't fight with typing, but will react to truly external resets.
    Promise.resolve().then(() => { isTyping.current = false; });

    onChange?.(newHtml);
  };

  const exec = (command, arg = null) => {
    // Save and restore selection so formatting commands don't move the caret
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleHeading = level => {
    editorRef.current?.focus();
    exec("formatBlock", level ? `<h${level}>` : "<p>");
  };

  const addLink = () => {
    if (!linkUrl.trim()) return;
    let url = linkUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
      url = "https://" + url;
    }
    exec("createLink", url);
    setLinkUrl("");
    setLinkModalVisible(false);
  };

  // Source mode (raw HTML textarea)
  const [sourceHtml, setSourceHtml] = useState("");

  const enterSourceMode = () => {
    const current = editorRef.current?.innerHTML || "";
    setSourceHtml(current);
    setSourceMode(true);
  };

  const exitSourceMode = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sourceHtml;
      lastExternalValue.current = sourceHtml;
    }
    onChange?.(sourceHtml);
    setSourceMode(false);
  };

  const handleSourceChange = e => {
    const next = e.target.value;
    setSourceHtml(next);
    onChange?.(next);
  };

  return (
    <div className="cms-rich-editor-wrapper">
      <div className="cms-rich-toolbar">
        <Space size={2} wrap>
          <Button.Group size="small">
            <Tooltip title="Paragraph">
              <Button type="text" onClick={() => handleHeading(0)}>P</Button>
            </Tooltip>
            <Tooltip title="Heading 2">
              <Button type="text" onClick={() => handleHeading(2)}>H2</Button>
            </Tooltip>
            <Tooltip title="Heading 3">
              <Button type="text" onClick={() => handleHeading(3)}>H3</Button>
            </Tooltip>
          </Button.Group>

          <Divider type="vertical" style={{ height: "16px", margin: "0 4px" }} />

          <Button.Group size="small">
            <Tooltip title="Bold">
              <Button type="text" icon={<BoldOutlined />} onClick={() => exec("bold")} />
            </Tooltip>
            <Tooltip title="Italic">
              <Button type="text" icon={<ItalicOutlined />} onClick={() => exec("italic")} />
            </Tooltip>
            <Tooltip title="Underline">
              <Button type="text" icon={<UnderlineOutlined />} onClick={() => exec("underline")} />
            </Tooltip>
            <Tooltip title="Strikethrough">
              <Button type="text" icon={<StrikethroughOutlined />} onClick={() => exec("strikeThrough")} />
            </Tooltip>
          </Button.Group>

          <Divider type="vertical" style={{ height: "16px", margin: "0 4px" }} />

          <Button.Group size="small">
            <Tooltip title="Bullet List">
              <Button type="text" icon={<UnorderedListOutlined />} onClick={() => exec("insertUnorderedList")} />
            </Tooltip>
            <Tooltip title="Numbered List">
              <Button type="text" icon={<OrderedListOutlined />} onClick={() => exec("insertOrderedList")} />
            </Tooltip>
          </Button.Group>

          <Divider type="vertical" style={{ height: "16px", margin: "0 4px" }} />

          <Button.Group size="small">
            <Tooltip title="Insert Link">
              <Button type="text" icon={<LinkOutlined />} onClick={() => setLinkModalVisible(true)} />
            </Tooltip>
            <Tooltip title="Clear Formatting">
              <Button type="text" icon={<ClearOutlined />} onClick={() => exec("removeFormat")} />
            </Tooltip>
          </Button.Group>

          <Divider type="vertical" style={{ height: "16px", margin: "0 4px" }} />

          <Tooltip title={sourceMode ? "Visual Editor" : "View HTML Source"}>
            <Button
              size="small"
              type={sourceMode ? "primary" : "text"}
              icon={<CodeOutlined />}
              onClick={sourceMode ? exitSourceMode : enterSourceMode}
            >
              {sourceMode ? "Visual" : "HTML"}
            </Button>
          </Tooltip>
        </Space>
      </div>

      {sourceMode ? (
        <Input.TextArea
          value={sourceHtml}
          onChange={handleSourceChange}
          style={{ minHeight, fontFamily: "monospace", fontSize: "13px" }}
          className="cms-rich-textarea"
        />
      ) : (
        /*
         * IMPORTANT: do NOT use dangerouslySetInnerHTML here.
         * React reconciliation would reset innerHTML on every render,
         * moving the caret to position 0 while the user is typing.
         * Content is managed imperatively through the editorRef instead.
         */
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="cms-rich-contentarea"
          style={{ minHeight }}
          onInput={handleInput}
          onBlur={handleInput}
          placeholder={placeholder}
        />
      )}

      <Modal
        title="Insert Link"
        open={linkModalVisible}
        onOk={addLink}
        onCancel={() => { setLinkModalVisible(false); setLinkUrl(""); }}
        okText="Insert"
        destroyOnClose
      >
        <div style={{ paddingTop: 12 }}>
          <Input
            placeholder="https://example.com or /contact"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onPressEnter={addLink}
            autoFocus
          />
        </div>
      </Modal>
    </div>
  );
}
