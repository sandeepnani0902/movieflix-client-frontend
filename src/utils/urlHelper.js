// Utility functions for URL handling

/**
 * Returns the original URL if it is already absolute (starts with http:// or https://).
 * Otherwise, prefixes it with the backend API base URL defined in environment variables.
 */
export function normalizeUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  // Ensure no leading slash duplication
  const cleaned = url.startsWith("/") ? url.slice(1) : url;
  return `${base}/${cleaned}`;
}

/**
 * Builds a full Cloudinary URL from a given path.
 * Expects CLOUDINARY_BASE_URL env variable like "https://res.cloudinary.com/yourcloud/image/upload".
 */
export function cloudinaryUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = import.meta.env.VITE_CLOUDINARY_BASE_URL || "";
  const cleaned = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${cleaned}`;
}
