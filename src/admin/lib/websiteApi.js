async function request(endpoint, options = {}) {
  const response = await fetch(`/api/website/content/${endpoint}`, { cache: "no-store", credentials: "same-origin", ...options });
  const result = await response.json();
  if (!response.ok || !result.status) throw new Error(result.message || "Unable to complete the request");
  return result.data;
}

export const websiteApi = {
  query: () => request("query"),
  save: (content, publish = false) => request("update", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, publish }),
  }),
  uploadMedia: async (fileOrDataUrl, filename) => {
    let body;
    let headers = {};
    if (typeof window !== "undefined" && (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob)) {
      body = new FormData();
      body.append("file", fileOrDataUrl);
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({ dataUrl: fileOrDataUrl, filename });
    }
    const response = await fetch("/api/website/media/create", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
      headers,
      body,
    });
    const result = await response.json();
    if (!response.ok || !result.status) throw new Error(result.message || "Failed to upload image");
    return result.data;
  },
};
