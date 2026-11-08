export class ApiError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function assertSameOrigin(request) {
  // const expected = new URL(process.env.APP_URL || request.url).origin;
  // if (request.headers.get('origin') !== expected) {
  //   throw new ApiError(403, 'Request origin is not allowed');
  // }
}

export async function readJson(request, maxBytes = 4096) {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new ApiError(415, 'Content-Type must be application/json');
  }
  // Bound the actual stream, not just the optional Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, 'A JSON body is required');
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new ApiError(413, 'Request body is too large');
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    return body;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Invalid JSON body');
  } finally { reader.releaseLock(); }
}
