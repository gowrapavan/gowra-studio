/**
 * Listing data for the Halyard Property real-estate demo. Sydney, AUD —
 * one country's address format, currency and phrasing applied throughout,
 * same rule the other five demos follow.
 */
import { realestate } from "@/config/images";
import type { Photo } from "@/config/images";

export type Listing = {
  slug: string;
  address: string;
  suburb: string;
  price: number; // AUD
  type: "House" | "Apartment" | "Townhouse";
  purpose: "For sale" | "For rent";
  beds: number;
  baths: number;
  parking: number;
  landSize?: number; // sqm, houses/townhouses only
  description: string;
  features: string[];
  gallery: Photo[];
  /** Rough position on the stylised suburb map, in percent (0–100). */
  mapPosition: { x: number; y: number };
};

export const listings: Listing[] = [
  {
    slug: "14-birchgrove-road-balmain",
    address: "14 Birchgrove Road",
    suburb: "Balmain",
    price: 2150000,
    type: "House",
    purpose: "For sale",
    beds: 4,
    baths: 2,
    parking: 1,
    landSize: 320,
    description:
      "A freestanding double-brick house on a quiet stretch of Birchgrove Road, with a north-facing garden and a kitchen opening straight onto it.",
    features: [
      "North-facing rear garden",
      "Original timber floors throughout",
      "Off-street parking",
      "Walk to the Balmain ferry wharf",
    ],
    gallery: [
      realestate.hero,
      realestate.livingRoom,
      realestate.kitchen,
      realestate.bedroom,
    ],
    mapPosition: { x: 32, y: 40 },
  },
  {
    slug: "8-108-king-street-newtown",
    address: "8/108 King Street",
    suburb: "Newtown",
    price: 780000,
    type: "Apartment",
    purpose: "For sale",
    beds: 2,
    baths: 1,
    parking: 1,
    description:
      "A top-floor two-bedroom apartment in a small 1930s block, fully renovated but keeping its original picture rails and fireplace surround.",
    features: [
      "Top floor, no shared walls above",
      "Original fireplace surround",
      "Secure basement parking",
      "500m to King Street shops",
    ],
    gallery: [realestate.apartmentExterior, realestate.livingRoom, realestate.studyNook],
    mapPosition: { x: 55, y: 62 },
  },
  {
    slug: "3-harbour-view-terrace-manly",
    address: "3 Harbour View Terrace",
    suburb: "Manly",
    price: 1450,
    type: "Townhouse",
    purpose: "For rent",
    beds: 3,
    baths: 2,
    parking: 2,
    landSize: 180,
    description:
      "A three-storey townhouse with a rooftop terrace looking back toward the harbour, available for a twelve-month lease.",
    features: [
      "Private rooftop terrace",
      "Double lock-up garage",
      "Ducted air conditioning",
      "Ten-minute walk to Manly Beach",
    ],
    gallery: [
      realestate.exteriorTwo,
      realestate.balcony,
      realestate.bathroom,
      realestate.bedroom,
    ],
    mapPosition: { x: 78, y: 22 },
  },
  {
    slug: "22-orchard-lane-glebe",
    address: "22 Orchard Lane",
    suburb: "Glebe",
    price: 1180000,
    type: "Townhouse",
    purpose: "For sale",
    beds: 3,
    baths: 2,
    parking: 0,
    landSize: 140,
    description:
      "A terrace-style townhouse on a laneway two streets back from Glebe Point Road, recently reroofed and rewired.",
    features: [
      "Reroofed and rewired in the last two years",
      "Small private courtyard",
      "Study nook on the return landing",
      "Zoned for Glebe Public School",
    ],
    gallery: [realestate.streetView, realestate.studyNook, realestate.kitchen],
    mapPosition: { x: 45, y: 50 },
  },
  {
    slug: "6-the-esplanade-coogee",
    address: "6 The Esplanade",
    suburb: "Coogee",
    price: 950,
    type: "Apartment",
    purpose: "For rent",
    beds: 1,
    baths: 1,
    parking: 0,
    description:
      "A one-bedroom apartment two blocks back from Coogee Beach, available furnished or unfurnished.",
    features: [
      "Available furnished or unfurnished",
      "Full-height windows to the living room",
      "Building rooftop shared space",
      "Two blocks from Coogee Beach",
    ],
    gallery: [realestate.apartmentExterior, realestate.balcony, realestate.bathroom],
    mapPosition: { x: 68, y: 75 },
  },
  {
    slug: "41-fig-tree-avenue-annandale",
    address: "41 Fig Tree Avenue",
    suburb: "Annandale",
    price: 2650000,
    type: "House",
    purpose: "For sale",
    beds: 5,
    baths: 3,
    parking: 2,
    landSize: 410,
    description:
      "A restored Federation house on one of Annandale's widest streets, extended at the rear with a glazed kitchen and living pavilion.",
    features: [
      "Rear glazed kitchen and living pavilion",
      "Restored Federation facade and joinery",
      "Double garage with internal access",
      "Pool-sized rear garden",
    ],
    gallery: [
      realestate.exteriorTwo,
      realestate.kitchen,
      realestate.livingRoom,
      realestate.bedroom,
    ],
    mapPosition: { x: 22, y: 65 },
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

/** AUD, whole-dollar sale prices; rent listings show "/week". */
export function formatAUD(listing: Listing): string {
  const amount = `$${listing.price.toLocaleString("en-AU")}`;
  return listing.purpose === "For rent" ? `${amount}/wk` : amount;
}

export const suburbs = Array.from(new Set(listings.map((l) => l.suburb))).sort();
export const types = Array.from(new Set(listings.map((l) => l.type)));
