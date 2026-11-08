import { NextResponse } from "next/server";
import dbModal from "../../../database/index.js";
import { ApiError, readJson } from "../../http.js";
import { defaultWebsiteContent, mergeWebsiteContent } from "../../../lib/website/default-content.js";

const MAX_CONTENT_BYTES = 1024 * 1024;

function parseStored(value) {
  if (!value) return null;
  return typeof value === "string" ? JSON.parse(value) : value;
}

function validateContent(content) {
  if (!content || typeof content !== "object" || Array.isArray(content)) throw new ApiError(400, "Website content is required");
  const normalized = mergeWebsiteContent(content);
  const json = JSON.stringify(normalized);
  if (Buffer.byteLength(json, "utf8") > MAX_CONTENT_BYTES) throw new ApiError(413, "Website content is too large");
  if (!Array.isArray(normalized.home?.sections) || normalized.home.sections.length > 50) throw new ApiError(400, "Invalid page sections");
  return { normalized, json };
}

async function query() {
  const [row] = await dbModal.query("SELECT draft_json, published_json, published_at, updated_at FROM website_content WHERE content_key = ? LIMIT 1", ["site"]);
  return NextResponse.json({ status: true, message: "Website content retrieved", data: {
    content: mergeWebsiteContent(parseStored(row?.draft_json) || defaultWebsiteContent),
    published: Boolean(row?.published_json), publishedAt: row?.published_at || null, updatedAt: row?.updated_at || null,
  } });
}

async function publicQuery() {
  const [row] = await dbModal.query("SELECT published_json, published_at FROM website_content WHERE content_key = ? LIMIT 1", ["site"]);
  return NextResponse.json({ status: true, message: "Published website content retrieved", data: {
    content: mergeWebsiteContent(parseStored(row?.published_json) || defaultWebsiteContent), publishedAt: row?.published_at || null,
  } });
}

async function update(request, { user }) {
  const body = await readJson(request, MAX_CONTENT_BYTES + 2048);
  const { normalized, json } = validateContent(body.content);
  const publish = body.publish === true;
  await dbModal.transaction(async db => {
    await db.query(`INSERT INTO website_content (content_key, draft_json, published_json, updated_by, published_at)
      VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE draft_json = VALUES(draft_json),
      published_json = IF(? = 1, VALUES(published_json), published_json), updated_by = VALUES(updated_by),
      published_at = IF(? = 1, UTC_TIMESTAMP(), published_at)`,
      ["site", json, publish ? json : null, user.id, publish ? new Date() : null, publish ? 1 : 0, publish ? 1 : 0]);
    await db.query("INSERT INTO website_content_revisions (content_key, content_json, action, created_by) VALUES (?, ?, ?, ?)",
      ["site", json, publish ? "publish" : "draft", user.id]);
  });
  return NextResponse.json({ status: true, message: publish ? "Website published" : "Draft saved", data: { content: normalized } });
}

export default {
  query: { method: "GET", handle: query },
  "query-selector": { method: "GET", public: true, handle: publicQuery },
  update: { method: "POST", handle: update },
};
