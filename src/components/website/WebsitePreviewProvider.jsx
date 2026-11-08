"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const WebsitePreviewContext = createContext({
  content: null,
  isPreview: false,
});

export function WebsitePreviewProvider({ initialContent, children }) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if running inside iframe or preview mode query param
    const inIframe = typeof window !== "undefined" && (window.self !== window.top || window.location.search.includes("preview=1"));
    if (inIframe) {
      setIsPreview(true);

      // Try reading cached preview draft from sessionStorage
      try {
        const cached = sessionStorage.getItem("cms_preview_content");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            setContent(current => ({ ...current, ...parsed }));
          }
        }
      } catch {
        // Ignore sessionStorage errors
      }

      // Signal parent frame that the preview iframe is ready
      try {
        window.parent.postMessage({ type: "CMS_PREVIEW_READY" }, "*");
      } catch {
        // Ignore cross-origin error
      }

      const handleMessage = event => {
        if (event.data && event.data.type === "CMS_PREVIEW_UPDATE" && event.data.content) {
          setContent(event.data.content);
          try {
            sessionStorage.setItem("cms_preview_content", JSON.stringify(event.data.content));
          } catch {
            // Ignore quota errors
          }
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, []);

  const value = useMemo(() => ({
    content: content || initialContent,
    isPreview,
  }), [content, initialContent, isPreview]);

  return (
    <WebsitePreviewContext.Provider value={value}>
      {children}
    </WebsitePreviewContext.Provider>
  );
}

export function useWebsiteContent() {
  const context = useContext(WebsitePreviewContext);
  return context.content;
}

export function useIsPreview() {
  const context = useContext(WebsitePreviewContext);
  return context.isPreview;
}
