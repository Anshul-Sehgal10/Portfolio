import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
const proxySecret = process.env.PROXY_SHARED_SECRET;

export async function POST(request: NextRequest) {
  if (!proxySecret) {
    return NextResponse.json({ error: 'Proxy is not configured.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const userAgent = request.headers.get('user-agent') || '';

  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-proxy-token': proxySecret,
        'x-forwarded-for': forwardedFor,
        'user-agent': userAgent,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const result = (await response.json()) as unknown;
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: 'Contact service is unavailable right now. Please try again later.' },
      { status: 502 }
    );
  }
}
