import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

/**
 * Read-only Sanity client for published content. The dataset is public, so no
 * token is needed. Project ID and dataset aren't secret; the env vars only exist
 * to point a local build at another dataset.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pnwv3t0x";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-10-01",
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * CDN URL for a Sanity image at a given width, keeping its aspect ratio,
 * or "" when no image is set.
 */
export function imageUrlAtWidth(
  image: { asset?: { _ref: string } | null } | null | undefined,
  width: number
): string {
  if (!image?.asset?._ref) return "";
  return builder
    .image(image as SanityImageSource)
    .width(width)
    .auto("format")
    .url();
}

/**
 * Cropped CDN URL for a Sanity image field (respects its hotspot/crop),
 * or "" when no image is set.
 */
export function imageUrl(
  image: { asset?: { _ref: string } | null } | null | undefined,
  width: number,
  height: number
): string {
  if (!image?.asset?._ref) return "";
  return builder
    .image(image as SanityImageSource)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}
