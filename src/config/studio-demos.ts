/**
 * The fourteen industry demos, in one place.
 *
 * Feeds the homepage hero explorer, the featured-work tiles and the full
 * index. Every highlight below is a feature that exists in the demo's own
 * code (see README.md, "The fourteen demos"). To add a demo, add one entry
 * here and the homepage picks it up everywhere.
 */

export type DemoGroup = "food-stay" | "shops-property" | "care-services" | "creative" | "institutions";

export const demoGroups: { id: DemoGroup; label: string }[] = [
  { id: "food-stay", label: "Food, stay and travel" },
  { id: "shops-property", label: "Shops and property" },
  { id: "care-services", label: "Care and services" },
  { id: "creative", label: "Creative and events" },
  { id: "institutions", label: "Education and building" },
];

export type StudioDemo = {
  slug: string;
  name: string;
  industry: string;
  group: DemoGroup;
  /** One sentence on what the demo site does for its business. */
  summary: string;
  /** Concrete features present in the demo. */
  highlights: string[];
};

export const studioDemos: StudioDemo[] = [
  { slug: "restaurant", name: "Ember & Olive", industry: "Restaurant", group: "food-stay", summary: "A dark, wood-fired room with the menu, hours and a table request up front.", highlights: ["Menu page", "Reservation request", "Dish rail"] },
  { slug: "hotel", name: "The Aurelia House", industry: "Hotel", group: "food-stay", summary: "Rooms with rates and an availability request that is easy to find.", highlights: ["Booking bar", "Rooms and rates", "House details"] },
  { slug: "travel", name: "Wayfare & Co", industry: "Travel agency", group: "food-stay", summary: "A destination search first, then a day-by-day sample itinerary.", highlights: ["Destination search", "Itinerary", "Trip listings"] },
  { slug: "retail", name: "Fielding & Rye", industry: "Shop", group: "shops-property", summary: "A storefront with filtering, product pages and a cart that works.", highlights: ["Filter and sort", "Product pages", "Working cart"] },
  { slug: "realestate", name: "Halyard Property", industry: "Real estate", group: "shops-property", summary: "Search listings the way buyers do, then ask about the one you like.", highlights: ["Search", "Map-synced listings", "Key-facts table"] },
  { slug: "auto", name: "Ridgeline Motors", industry: "Car dealership", group: "shops-property", summary: "Inventory search and a spec comparison that reads like a real table.", highlights: ["Inventory search", "Spec comparison", "Finance estimator"] },
  { slug: "clinic", name: "Willowmere Dental Care", industry: "Dental clinic", group: "care-services", summary: "Calm and readable, with a short appointment request.", highlights: ["Service accordion", "Booking steps", "Appointment band"] },
  { slug: "salon", name: "Maison Form", industry: "Salon", group: "care-services", summary: "A clear price list and a simple way to ask for an appointment.", highlights: ["Price list", "Booking request", "Studio page"] },
  { slug: "fitness", name: "Vantage Athletic Club", industry: "Gym", group: "care-services", summary: "Programs, membership plans and a free-trial booking.", highlights: ["Timetable", "Plan comparison", "Trial booking"] },
  { slug: "service", name: "Northline Home Services", industry: "Home services", group: "care-services", summary: "Quote requests that are quick to send and clear about what happens next.", highlights: ["Quote form in hero", "Process timeline", "Mobile action bar"] },
  { slug: "photography", name: "Rowan & Ash Photography", industry: "Photographer", group: "creative", summary: "The portfolio is the site, with pricing set in plain type.", highlights: ["Masonry gallery", "Plain-type pricing", "Portfolio page"] },
  { slug: "wedding", name: "Linden & Rose Events", industry: "Weddings and events", group: "creative", summary: "A story scroll of weddings and a consultative enquiry form.", highlights: ["Story scroll", "Packages", "Enquiry form"] },
  { slug: "education", name: "Cobalt University", industry: "University", group: "institutions", summary: "A university site with a programme finder, three schools, key dates and admissions.", highlights: ["Programme finder", "Schools", "Key dates"] },
  { slug: "construction", name: "Marrow & Stone", industry: "Construction and architecture", group: "institutions", summary: "A blueprint-style process grid and a before-and-after project.", highlights: ["Process grid", "Before and after", "Projects page"] },
];

export const demoBySlug = Object.fromEntries(studioDemos.map((d) => [d.slug, d])) as Record<string, StudioDemo>;
