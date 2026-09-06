export function resolveImageUrl(url: string): string {
  if (url.startsWith("/uploads/")) {
    return `/api/image${url.replace("/uploads", "")}`;
  }
  return url;
}
