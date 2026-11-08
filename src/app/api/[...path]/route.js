import { dispatch } from '@/routes/index.js';

// Next.js equivalent of app.use('/api', routes).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const PATCH = dispatch;
export const DELETE = dispatch;
export const HEAD = dispatch;
export const OPTIONS = dispatch;
