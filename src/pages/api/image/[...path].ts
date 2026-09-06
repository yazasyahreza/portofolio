import type { APIRoute } from "astro";

const CMS_API_URL = import.meta.env.CMS_API_URL || "http://localhost:8080";

export const GET: APIRoute = async ({ params }) => {
  const path = params.path;

  const res = await fetch(`${CMS_API_URL}/uploads/${path}`);

  if (!res.ok) {
    return new Response("Not found", { status: 404 });
  }

  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  const body = await res.arrayBuffer();

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
