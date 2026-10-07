import {
  siGoogleads,
  siGooglesheets,
  siGoogleslides,
  siShopify,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

/**
 * Live systems the agents read from and write to, shown under the hero's run
 * trace. All appear on the CV. `writeTarget` marks where the illustrated run
 * writes (the Slides reporting agent updates a deck).
 */
export const PLATFORMS: { name: string; icon: SimpleIcon; writeTarget?: boolean }[] = [
  { name: "Google Ads", icon: siGoogleads },
  { name: "Google Sheets", icon: siGooglesheets },
  { name: "Google Slides", icon: siGoogleslides, writeTarget: true },
  { name: "WordPress", icon: siWordpress },
  { name: "Shopify", icon: siShopify },
];
