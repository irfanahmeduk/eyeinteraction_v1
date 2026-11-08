import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { ApiError } from "../../http.js";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/gif": ".gif",
};

export async function handleUpload(request) {
  const contentType = request.headers.get("content-type") || "";
  let buffer = null;
  let extension = "";
  let originalName = "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      throw new ApiError(400, "Image file is required");
    }

    if (file.size > MAX_FILE_BYTES) {
      throw new ApiError(413, "Image file is too large (maximum 5MB)");
    }

    const mime = file.type?.toLowerCase();
    extension = ALLOWED_MIME_TYPES[mime];
    if (!extension) {
      // Fallback check from filename extension
      const extFromName = path.extname(file.name || "").toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"].includes(extFromName)) {
        extension = extFromName === ".jpeg" ? ".jpg" : extFromName;
      } else {
        throw new ApiError(415, "Only JPG, PNG, WEBP, SVG, and GIF images are supported");
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    originalName = file.name || "upload";
  } else if (contentType.includes("application/json")) {
    const body = await request.json();
    const { dataUrl, filename = "upload" } = body || {};
    if (!dataUrl || typeof dataUrl !== "string") {
      throw new ApiError(400, "Image data URL is required");
    }

    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) {
      throw new ApiError(400, "Invalid base64 image data URL");
    }

    const mime = match[1].toLowerCase();
    extension = ALLOWED_MIME_TYPES[mime] || ".png";
    buffer = Buffer.from(match[2], "base64");
    if (buffer.length > MAX_FILE_BYTES) {
      throw new ApiError(413, "Image file is too large (maximum 5MB)");
    }
    originalName = filename;
  } else {
    throw new ApiError(415, "Content-Type must be multipart/form-data or application/json");
  }

  const cleanBase = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .slice(0, 24);
  const randomSuffix = crypto.randomBytes(4).toString("hex");
  const filename = `${cleanBase || "story"}-${Date.now()}-${randomSuffix}${extension}`;

  const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, buffer);

  const publicUrl = `/images/uploads/${filename}`;

  return NextResponse.json({
    status: true,
    message: "Image uploaded successfully",
    data: {
      url: publicUrl,
      filename,
      size: buffer.length,
    },
  });
}

export default {
  create: { method: "POST", handle: handleUpload },
};
