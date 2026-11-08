import 'server-only';
import { NextResponse } from 'next/server';
import auth from './auth/index.js';
import websiteContent from './website/content/index.js';
import websiteMedia from './website/media/index.js';
import { ApiError, assertSameOrigin } from './http.js';
import { currentUser } from '../auth/session.js';

// Register domains here. Prefix domains use keys such as 'website/testimonials'.
const domains = new Map([
  ['auth', auth],
  ['website/content', websiteContent],
  ['website/media', websiteMedia],
]);

export async function dispatch(request, context) {
  try {
    const { path = [] } = await context.params;
    const endpoint = path.at(-1);
    const domain = domains.get(path.slice(0, -1).join('/'));
    const route = domain?.[endpoint];
    if (!route || !Object.hasOwn(domain, endpoint)) throw new ApiError(404, 'Endpoint not found');
    if (request.method !== route.method) {
      return NextResponse.json({ status: false, message: 'Method not allowed' }, {
        status: 405, headers: { Allow: route.method, 'Cache-Control': 'no-store' },
      });
    }
    if (!['GET', 'HEAD'].includes(request.method)) assertSameOrigin(request);
    const user = route.public === true ? null : await currentUser();
    if (route.public !== true && !user) throw new ApiError(401, 'Please sign in');
    const response = await route.handle(request, { user });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    if (!(error instanceof ApiError)) console.error('API request failed', { name: error.name, code: error.code, error });
    return NextResponse.json({ status: false, message: error instanceof ApiError ? error.message : 'Unable to complete the request. Please try again.' }, {
      status: error instanceof ApiError ? error.status : 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
