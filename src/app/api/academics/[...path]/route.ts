import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.EDUFLOW_API_TOKEN;

async function proxy(request: NextRequest) {
  if (!API_BASE_URL || !API_TOKEN) {
    return NextResponse.json(
      { detail: "Backend URL or EDUFLOW_API_TOKEN is not configured in .env.local." },
      { status: 500 }
    );
  }

  const marker = "/api/academics/";
  const index = request.nextUrl.pathname.indexOf(marker);
  const requestedPath = index >= 0 ? request.nextUrl.pathname.slice(index + marker.length) : "";
  const cleanPath = requestedPath.split("/").filter(Boolean).join("/");
  const upstreamPath = cleanPath ? `${cleanPath}/` : "";
  const base = API_BASE_URL.replace(/\/+$/, "");
  const url = `${base}/${upstreamPath}${request.nextUrl.search}`;

  const headers = new Headers({
    Authorization: `Token ${API_TOKEN}`,
    Accept: "application/json",
  });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.text();

  try {
    const upstream = await fetch(url, {
      method: request.method,
      headers,
      body: body || undefined,
      cache: "no-store",
    });
    const responseBody = await upstream.text();
    return new NextResponse(responseBody || null, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { detail: "Could not connect to the Django backend. Check that Django is running." },
      { status: 502 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
