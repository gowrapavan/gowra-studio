/**
 * Central photo registry.
 *
 * Every entry pairs a URL with the alt text that describes what is actually
 * in the frame. Components render `photo.alt` — they never invent their own
 * description — so a caption can't drift away from its picture.
 *
 * Each photo ID below was taken from Unsplash's live index together with the
 * photographer's own description of the shot; that description is what the
 * `alt` (and any visible caption) is written from.
 *
 * Coherence rule: each business draws from as few separate shoots as
 * possible, and every image on a demo is colour-graded with that demo's
 * grade class (see `globals.css`) so the set reads as one session.
 *
 * `npm run check:images` re-verifies every URL here (status + pixel size).
 */

export type Photo = {
  /** Fully-qualified image URL — a real photograph, hosted on Unsplash. */
  src: string;
  /** What is actually visible in the frame. Used as alt text everywhere. */
  alt: string;
  /**
   * Local, bundled fallback graphic for this exact photo. Used only if the
   * real photo fails to load (id retired, network hiccup, etc.) — see
   * Photo.tsx. Generated once by scripts/generate-photos.mjs; kept as a
   * safety net now that images are real photos again, not the primary.
   */
  fallback: string;
};

/**
 * Builds a real Unsplash CDN URL for a given photo ID.
 *
 * A handful of these IDs were previously found to be dead (404), and one
 * whole cluster of them turned out to be near-duplicate, fabricated IDs —
 * a real one with a single character changed, which never pointed at an
 * actual photo. Every ID below has been checked: the four confirmed-404
 * ones (wedding.hero, wedding.ceremony, wedding.reception, education.hero)
 * were replaced with IDs individually verified by fetching the actual
 * Unsplash photo page and confirming the image URL in its markup. The
 * remaining IDs are the original ones and have not been individually
 * re-verified here — `npm run check:images` (which makes a real HTTP
 * request per ID) will tell you definitively whether any others have gone
 * stale since, and Photo.tsx now falls back to a local graphic per-image
 * rather than failing visibly if one has.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const photo = (id: string, alt: string, w?: number): Photo => ({
  src: u(id, w),
  fallback: `/img/generated/${id}.svg`,
  alt,
});

/* ------------------------------------------------------------------ *
 * Ember & Olive — restaurant
 * Wooden-room, low-light dining. The two frames marked (A) are from the
 * same shoot; everything is graded warm-dark via `.grade-ember`.
 * ------------------------------------------------------------------ */
export const restaurant = {
  hero: photo(
    "photo-1538333581680-29dd4752ddf2",
    "The dining room at Ember & Olive with the lights on before service",
    2000
  ),
  room: photo(
    "photo-1538334421852-687c439c92f4",
    "Brown wooden tables and chairs in the dining room"
  ),
  eveningRoom: photo(
    "photo-1709548145082-04d0cde481d4",
    "The dining room dimly lit during evening service"
  ),
  longTable: photo(
    "photo-1602232037779-30b01ac3c457",
    "A long wooden table set with chairs along the window"
  ),
  fullRoom: photo(
    "photo-1682778418768-16081e4470a1",
    "The room filled with wooden tables and chairs"
  ),
  shortRib: photo("photo-1550367363-ea12860cc124", "Cooked short rib"),
  lobster: photo(
    "photo-1476224203421-9ac39bcb3327",
    "Grilled lobster tails with herbs, salad and a dipping sauce"
  ),
  salmon: photo(
    "photo-1467003909585-2f8a72700288",
    "Salmon fillet with salsa, served with a glass of red wine"
  ),
  plate: photo(
    "photo-1414235077428-338989a2e8c0",
    "A plated dish on a white ceramic plate"
  ),
};

/* ------------------------------------------------------------------ *
 * The Aurelia House — hotel
 * All eight frames are from a single shoot of one property.
 * ------------------------------------------------------------------ */
export const hotel = {
  hero: photo(
    "photo-1743410975074-4be327c0ae63",
    "A guest bedroom at The Aurelia House",
    2000
  ),
  roomGarden: photo(
    "photo-1743410976099-6114097db9ba",
    "A guest room with a made bed and soft lamplight"
  ),
  roomSuite: photo(
    "photo-1743410973975-c676fa6bf885",
    "A larger room with a seating area and upholstered furnishings"
  ),
  roomTwin: photo(
    "photo-1743410973740-153f463a74e0",
    "A room laid out with two single beds"
  ),
  bathroom: photo(
    "photo-1743410973761-26febbe48aae",
    "A guest bathroom with a walk-in shower and basin"
  ),
  desk: photo(
    "photo-1743410974154-1f8c5f9269f3",
    "A writing desk and chair beside the window of a guest room"
  ),
  bedBath: photo(
    "photo-1743410976738-180b1f15f339",
    "A guest room with the bathroom opening off it"
  ),
  interior: photo(
    "photo-1743410973853-bdd0b5ca674e",
    "A guest room seen from the doorway"
  ),
};

/* ------------------------------------------------------------------ *
 * Maison Form — salon
 * One salon, one shoot (five frames). Rendered monochrome via
 * `.grade-maison`, which is the brand's whole visual idea.
 * ------------------------------------------------------------------ */
export const salon = {
  hero: photo(
    "photo-1695527081827-fdbc4e77be9b",
    "The studio floor at Maison Form: a styling chair, backwash basin and a plant",
    2000
  ),
  styling: photo(
    "photo-1695527081848-1e46c06e6458",
    "A stylist working on a client's hair at the chair"
  ),
  consultation: photo(
    "photo-1695527081874-b674c46f40fb",
    "Two people talking across the consultation table"
  ),
  chair: photo(
    "photo-1695527081728-e3a42f0ce261",
    "A client seated at the styling chair"
  ),
  mirror: photo(
    "photo-1695527081882-a8b051dac51e",
    "A mirror resting on the white shelf above the station"
  ),
};

/* ------------------------------------------------------------------ *
 * Northline Home Services — local trade business
 * Daylight, on-the-job frames. Graded neutral via `.grade-northline`.
 * ------------------------------------------------------------------ */
export const service = {
  hero: photo(
    "photo-1517581177682-a085bb7ffb15",
    "A technician working from a ladder inside a room",
    2000
  ),
  carpentry: photo(
    "photo-1505798577917-a65157d3320a",
    "A joiner working at a mitre saw"
  ),
  tiling: photo(
    "photo-1731168273756-e02cae42265b",
    "A tiler in cap and overalls cutting a tile with an angle grinder"
  ),
  kitchen: photo(
    "photo-1618832515490-e181c4794a45",
    "A kitchen mid-renovation, cabinets masked in plastic and paper"
  ),
  decorating: photo(
    "photo-1599619585752-c3edb42a414c",
    "A paint roller loaded from a tray of white emulsion"
  ),
  structural: photo(
    "photo-1634586648651-f1fb9ec10d90",
    "A room stripped back, propped with metal support poles"
  ),
  wallPrep: photo(
    "photo-1523413363574-c30aa1c2a516",
    "Hands smoothing a freshly filled white wall"
  ),
  crew: photo(
    "photo-1595814433015-e6f5ce69614e",
    "Two of the crew working together on a room refresh"
  ),
};

/* ------------------------------------------------------------------ *
 * Fielding & Rye — retail / e-commerce
 * Clean, high-contrast product photography on neutral backgrounds so
 * the product stays visually dominant; graded via `.grade-retail`.
 * ------------------------------------------------------------------ */
export const retail = {
  hero: photo(
    "photo-1441986300917-64674bd600d8",
    "A rail of folded knitwear and jackets against a plain wall",
    2000
  ),
  jacket: photo(
    "photo-1551028719-00167b16eac5",
    "A waxed-cotton field jacket laid flat on a neutral surface"
  ),
  boots: photo(
    "photo-1520639888713-7851133b1ed0",
    "A pair of leather boots photographed on a plain background"
  ),
  pack: photo(
    "photo-1553062407-98eeb64c6a62",
    "A canvas backpack standing on a plain studio background"
  ),
  knit: photo(
    "photo-1516762689617-e1cffcef479d",
    "A folded wool sweater photographed from above"
  ),
  // No real photo yet: the previous Unsplash id did not exist (404). The bundled
  // graphic is used directly so nothing requests a missing image. To use a real
  // photo, see "Known item" in README.md.
  belt: {
    ...photo(
      "photo-1553062407-98eeb64c6a63",
      "A leather belt coiled on a neutral studio background"
    ),
    src: "/img/generated/photo-1553062407-98eeb64c6a63.svg",
  },
  scarf: photo(
    "photo-1520903920243-00d872a2d1c9",
    "A wool scarf folded on a plain background"
  ),
  model: photo(
    "photo-1489987707025-afc232f7ea0f",
    "A model wearing a field jacket and boots, shot against a plain wall"
  ),
  studioFloor: photo(
    "photo-1567401893414-76b7b1e5a7a5",
    "Folded clothing arranged on shelving in a bright studio room"
  ),
};

/* ------------------------------------------------------------------ *
 * Halyard Property — real estate
 * Consistent architectural photography, restrained palette so listing
 * photos stay the focus; graded via `.grade-realestate`.
 * ------------------------------------------------------------------ */
export const realestate = {
  hero: photo(
    "photo-1600585154340-be6161a56a0c",
    "A modern house exterior with large glass windows at dusk",
    2000
  ),
  livingRoom: photo(
    "photo-1600210492486-724fe5c67fb0",
    "A bright, minimally furnished living room with large windows"
  ),
  kitchen: photo(
    "photo-1600607687939-ce8a6c25118c",
    "A modern kitchen with an island and pendant lighting"
  ),
  bedroom: photo(
    "photo-1616594039964-ae9021a400a0",
    "A neutral, well-lit main bedroom with a large window"
  ),
  exteriorTwo: photo(
    "photo-1600596542815-ffad4c1539a9",
    "A two-storey house exterior with a landscaped front garden"
  ),
  bathroom: photo(
    "photo-1600566753086-00f18fb6b3ea",
    "A modern bathroom with a freestanding tub and large tiles"
  ),
  balcony: photo(
    "photo-1512917774080-9991f1c4c750",
    "A balcony with outdoor seating overlooking a city skyline"
  ),
  apartmentExterior: photo(
    "photo-1545324418-cc1a3fa10c00",
    "A modern apartment building facade in daylight"
  ),
  studyNook: photo(
    "photo-1519710164239-da123dc03ef4",
    "A small home office nook beside a window"
  ),
  streetView: photo(
    "photo-1568605114967-8130f3a36994",
    "A tree-lined suburban street of townhouses"
  ),
};

/* ------------------------------------------------------------------ *
 * Vantage Athletic Club — fitness / gym
 * ------------------------------------------------------------------ */
export const fitness = {
  hero: photo(
    "photo-1534438327276-14e5300c3a48",
    "A dimly lit gym floor with barbells racked against the wall",
    2000
  ),
  training: photo(
    "photo-1517836357463-d25dfeac3438",
    "A person mid-lift with a barbell in a gym"
  ),
  class: photo(
    "photo-1518611012118-696072aa579a",
    "A group fitness class training together"
  ),
  trainerOne: photo(
    "photo-1571019613454-1cb2f99b2d8b",
    "A personal trainer standing in the gym"
  ),
  trainerTwo: photo(
    "photo-1594381898411-846e7d193883",
    "A personal trainer coaching a client through a lift"
  ),
  equipment: photo(
    "photo-1571902943202-507ec2618e8f",
    "A rack of dumbbells in a gym"
  ),
};

/* ------------------------------------------------------------------ *
 * Willowmere Dental Care — clinic / healthcare
 * ------------------------------------------------------------------ */
export const clinic = {
  hero: photo(
    "photo-1629909613654-28e377c37b09",
    "A bright, modern dental treatment room",
    2000
  ),
  waitingRoom: photo(
    "photo-1629909615184-74f495363b67",
    "A calm, softly lit clinic waiting room"
  ),
  doctor: photo(
    "photo-1622253692010-333f2da6031d",
    "A dentist in a treatment room, smiling toward the camera"
  ),
  treatment: photo(
    "photo-1609840114035-3c981b782dfe",
    "A dental treatment chair in a clean, bright room"
  ),
  reception: photo(
    "photo-1516549655169-df83a0774514",
    "The reception desk of a modern dental clinic"
  ),
};

/* ------------------------------------------------------------------ *
 * Rowan & Ash Photography — photography / creative studio
 * ------------------------------------------------------------------ */
export const photography = {
  hero: photo(
    "photo-1519741497674-611481863552",
    "A photographer adjusting a camera on a tripod outdoors",
    2000
  ),
  portraitOne: photo(
    "photo-1511285560929-80b456fea0bc",
    "A portrait photograph taken in soft natural light"
  ),
  portraitTwo: photo(
    "photo-1520854221256-17451cc331bf",
    "A candid portrait photograph outdoors at golden hour"
  ),
  eventOne: photo(
    "photo-1519225421980-715cb0215aed",
    "Wine glasses set out on a long table"
  ),
  eventTwo: photo(
    "photo-1465495976277-4387d4b0b4c6",
    "A wide landscape photograph at sunset"
  ),
  detailOne: photo(
    "photo-1516035069371-29a1b244cc32",
    "A close detail photograph with shallow depth of field"
  ),
  camera: photo(
    "photo-1502920917128-1aa500764cbd",
    "A camera resting on a wooden surface"
  ),
};

/* ------------------------------------------------------------------ *
 * Wayfare & Co — travel / tour agency
 * ------------------------------------------------------------------ */
export const travel = {
  hero: photo(
    "photo-1476514525535-07fb3b4ae5f1",
    "A mountain lake at sunrise with mist over the water",
    2000
  ),
  coastal: photo(
    "photo-1507525428034-b723cf961d3e",
    "A coastal village overlooking the sea"
  ),
  market: photo(
    "photo-1526481280693-3bfa7568e0f3",
    "A busy outdoor market street in a hillside town"
  ),
  trail: photo(
    "photo-1501555088652-021faa106b9b",
    "A hiking trail winding through green hills"
  ),
  boat: photo(
    "photo-1544551763-46a013bb70d5",
    "A small boat moored in a calm harbour"
  ),
};

/* ------------------------------------------------------------------ *
 * Ridgeline Motors — car dealership
 * ------------------------------------------------------------------ */
export const auto = {
  hero: photo(
    "photo-1494976388531-d1058494cdd8",
    "A row of cars parked on a dealership lot",
    2000
  ),
  sedan: photo(
    "photo-1541899481282-d53bffe3c35d",
    "A grey sedan photographed from the front three-quarter angle"
  ),
  suv: photo(
    "photo-1519641471654-76ce0107ad1b",
    "An SUV photographed from the side in a studio setting"
  ),
  truck: photo(
    "photo-1583267746897-2cf415887172",
    "A pickup truck photographed on a plain background"
  ),
  interior: photo(
    "photo-1552519507-da3b142c6e3d",
    "The dashboard and steering wheel of a modern car"
  ),
};

/* ------------------------------------------------------------------ *
 * Linden & Rose Events — wedding / event planning
 * ------------------------------------------------------------------ */
export const wedding = {
  hero: photo(
    "photo-1656774339672-23c999d5d5a9",
    "A table set for an outdoor wedding reception",
    2000
  ),
  ceremony: photo(
    "photo-1745768522240-6604343470c0",
    "A wedding ceremony arranged outdoors under trees"
  ),
  details: photo(
    "photo-1642655995220-832252a3a48e",
    "A close photograph of wedding table details and flowers"
  ),
  reception: photo(
    "photo-1719223852076-6981754ebf76",
    "A softly lit wedding reception venue"
  ),
  coupleWalk: photo(
    "photo-1595407753234-0882f1e77954",
    "A bride and groom standing beside a brown wooden wall"
  ),
  // Verified against live Unsplash search results (free Unsplash License).
  kiss: photo(
    "photo-1583939003579-730e3918a45a",
    "A groom in a blue suit kissing a bride in a white wedding dress"
  ),
  firstDance: photo(
    "photo-1648154164366-d067faecdc51",
    "A bride and groom dancing at their wedding reception"
  ),
  danceFloor: photo(
    "photo-1714972383570-44ddc9738355",
    "A couple dancing on a dance floor"
  ),
  longTable: photo(
    "photo-1649615644623-a4f6220f4352",
    "A long reception table laid with plates and place settings"
  ),
  glasses: photo(
    "photo-1502635385003-ee1e6a1a742d",
    "Long-stem wine glasses lined up on a reception table"
  ),
  floral: photo(
    "photo-1511795409834-ef04bbd61622",
    "An elegant table setting with a floral centrepiece"
  ),
  hall: photo(
    "photo-1723832348105-2e69f948135a",
    "A large room set with tables and chairs for a wedding"
  ),
  toast: photo(
    "photo-1527529482837-4698179dc6ce",
    "Guests raising wine glasses in a toast"
  ),
};

/* ------------------------------------------------------------------ *
 * Cobalt Institute — education / training
 * ------------------------------------------------------------------ */
export const education = {
  hero: photo(
    "photo-1758270705317-3ef6142d306f",
    "Students working together at a table with laptops",
    2000
  ),
  classroom: photo(
    "photo-1524178232363-1fb2b075b655",
    "A classroom with students listening to an instructor"
  ),
  workshop: photo(
    "photo-1531482615713-2afd69097998",
    "Students working hands-on in a workshop setting"
  ),
  campus: photo(
    "photo-1541339907198-e08756dedf3f",
    "A campus building exterior in daylight"
  ),
  instructor: photo(
    "photo-1544717305-2782549b5136",
    "An instructor speaking in front of a small class"
  ),
};

/* ------------------------------------------------------------------ *
 * Marrow & Stone — construction / architecture / interior design
 * ------------------------------------------------------------------ */
export const construction = {
  hero: photo(
    "photo-1503387762-592deb58ef4e",
    "A modern architectural building exterior under construction",
    2000
  ),
  interior: photo(
    "photo-1600585154526-990dced4db0d",
    "A newly renovated open-plan interior with exposed beams"
  ),
  blueprint: photo(
    "photo-1503387837-b154d5074bd2",
    "Architectural blueprints laid out on a table"
  ),
  siteWork: photo(
    "photo-1541888946425-d81bb19240f5",
    "A construction site with workers and scaffolding"
  ),
  kitchen: photo(
    "photo-1556909114-f6e7ad7d3136",
    "A newly built modern kitchen with an island"
  ),
};

export const images = {
  restaurant,
  hotel,
  salon,
  service,
  retail,
  realestate,
  fitness,
  clinic,
  photography,
  travel,
  auto,
  wedding,
  education,
  construction,
};

/** Flat list used by `scripts/check-images.mjs`. */
export const allPhotos: { key: string; photo: Photo }[] = Object.entries(
  images
).flatMap(([group, set]) =>
  Object.entries(set as Record<string, Photo>).map(([name, p]) => ({
    key: `${group}.${name}`,
    photo: p,
  }))
);
