import "server-only";
import dbModal from "@/database/index.js";
import { defaultWebsiteContent, mergeWebsiteContent } from "./default-content.js";

export async function getWebsiteContent({ draft = false } = {}) {
  try {
    const [row] = await dbModal.query(`SELECT ${draft ? "draft_json" : "published_json"} AS content FROM website_content WHERE content_key = ? LIMIT 1`, ["site"]);
    if (!row?.content) return structuredClone(defaultWebsiteContent);
    return mergeWebsiteContent(typeof row.content === "string" ? JSON.parse(row.content) : row.content);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.warn("Website CMS fallback active:", error.code || error.message);
    return structuredClone(defaultWebsiteContent);
  }
}
