// Wedding Buddy — Supabase bootstrap
// Usage:  node supabase/bootstrap.mjs
//
// Prereq:  you have run `supabase/schema.sql` once in the Supabase SQL Editor
//          (takes 5 seconds — Studio → SQL → paste → Run).
//
// This script then seeds all the rows via the REST API with service_role, so
// you can re-run it any time to reset the dataset. It will also create the
// `images` storage bucket if it doesn't already exist.

import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !SERVICE) {
  console.error("✖ .env.local missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supa = createClient(URL, SERVICE, { auth: { persistSession: false } });

// ============================================================================
// DATA — mirrors seed.sql for REST-based seeding
// ============================================================================

const VENUES = [
  { slug: "bolgatty-palace",        name: "Bolgatty Palace",        location: "Mulavukad Island, Kochi",          region: "Kochi",              type: "Palace",     capacity_min: 150, capacity_max:  800, price_from:  850000, tagline: "A 1744 Dutch palace on a private island, ringed by the backwaters.",             highlights: ["Waterfront mandap","Heritage banquet hall","On-site boutique hotel"],     gradient: "from-amber-200 via-rose-100 to-white",     featured: true,  image_path: "images/venues/bolgatty-palace.jpg" },
  { slug: "taj-kumarakom",          name: "Taj Kumarakom",          location: "Vembanad Lake, Kumarakom",          region: "Kumarakom",          type: "Resort",     capacity_min:  80, capacity_max:  300, price_from: 1200000, tagline: "A 140-year-old Baker bungalow on the shores of Vembanad.",                       highlights: ["Lakeside lawn","Ayurvedic spa pavilion","Houseboat processional"],       gradient: "from-emerald-200 via-teal-100 to-white",   featured: true,  image_path: "images/venues/taj-kumarakom.jpg" },
  { slug: "kovalam-leela",          name: "Kovalam Leela",          location: "Kovalam Cliff, Thiruvananthapuram", region: "Thiruvananthapuram", type: "Beachfront", capacity_min: 100, capacity_max:  450, price_from:  980000, tagline: "A clifftop Charles Correa masterpiece overlooking the Arabian Sea.",             highlights: ["Sunset ceremony deck","Ocean-facing suites","Helipad for arrivals"],      gradient: "from-sky-200 via-indigo-100 to-white",     featured: false, image_path: "images/venues/kovalam-leela.jpg" },
  { slug: "tea-trails-munnar",      name: "Tea Trails Munnar",      location: "Kanan Devan Hills, Munnar",         region: "Munnar",             type: "Estate",     capacity_min:  40, capacity_max:  180, price_from:  620000, tagline: "An intimate plantation bungalow wrapped in 1,400m of emerald tea.",              highlights: ["Misty hill mandap","Colonial bungalow stays","Plantation walk ceremony"], gradient: "from-emerald-200 via-lime-100 to-white",   featured: false, image_path: "images/venues/tea-trails-munnar.jpg" },
  { slug: "vivanta-ernakulam",      name: "Vivanta Ernakulam",      location: "Marine Drive, Kochi",               region: "Kochi",              type: "Heritage",   capacity_min: 250, capacity_max: 1200, price_from:  740000, tagline: "A grand ballroom overlooking the harbour — Kerala's largest pillarless hall.",  highlights: ["Pillarless ballroom","Rooftop sangeet","Dedicated wedding planner"],      gradient: "from-fuchsia-200 via-purple-100 to-white", featured: false, image_path: "images/venues/vivanta-ernakulam.jpg" },
  { slug: "spice-village-thekkady", name: "Spice Village Thekkady", location: "Periyar Reserve, Thekkady",         region: "Thekkady",           type: "Resort",     capacity_min:  60, capacity_max:  220, price_from:  580000, tagline: "Thatched cottages nestled beside the Periyar tiger reserve.",                    highlights: ["Forest-edge mandap","Organic Sadya kitchen","Bonfire baraat"],            gradient: "from-amber-200 via-orange-100 to-white",   featured: false, image_path: "images/venues/spice-village-thekkady.jpg" },
  { slug: "vythiri-village",        name: "Vythiri Village",        location: "Lakkidi, Wayanad",                  region: "Wayanad",            type: "Resort",     capacity_min:  80, capacity_max:  260, price_from:  690000, tagline: "A rainforest retreat with tree villas and a natural stream.",                    highlights: ["Treehouse suites","Stream-side ceremony","Adventure activities"],         gradient: "from-teal-200 via-emerald-100 to-white",   featured: false, image_path: "images/venues/vythiri-village.jpg" },
  { slug: "gateway-varkala",        name: "Gateway Varkala",        location: "Varkala Cliff",                     region: "Varkala",            type: "Beachfront", capacity_min:  80, capacity_max:  350, price_from:  710000, tagline: "Red cliffs, black sand beaches, and a sunset made for vows.",                    highlights: ["Cliff-edge pavilion","Beach baraat","Ayurveda welcome ritual"],           gradient: "from-rose-200 via-orange-100 to-white",    featured: false, image_path: "images/venues/gateway-varkala.jpg" },
  { slug: "kumarakom-lake-resort",  name: "Kumarakom Lake Resort",  location: "Vembanad, Kumarakom",               region: "Kumarakom",          type: "Houseboat",  capacity_min:  30, capacity_max:  120, price_from:  460000, tagline: "A fleet of Kettuvallams for an intimate floating ceremony.",                     highlights: ["Six-houseboat fleet","Meenachil backwaters","Sadya on deck"],             gradient: "from-indigo-200 via-sky-100 to-white",     featured: false, image_path: "images/venues/kumarakom-lake-resort.jpg" },
];

const VENDORS = [
  // Photographers
  { slug: "stark-studios",   category: "Photographers",  name: "Stark Studios",    tagline: "Candid documentary with a cinematic, film-grain soul.",         location: "Kochi · Travels pan-India",            price_from: 240000, price_unit: "per wedding", rating: 4.9, reviews: 214, specialties: ["Candid","Cinematic film","Drone coverage"], gradient: "from-rose-200 via-amber-100 to-white",    initials: "SS", verified: true,  featured: true,  image_path: "images/vendors/stark-studios.jpg" },
  { slug: "weva",            category: "Photographers",  name: "Weva Photography", tagline: "Regal portraiture for the modern Malayali bride.",              location: "Thrissur · Kochi · Bangalore",         price_from: 180000, price_unit: "per wedding", rating: 4.8, reviews: 318, specialties: ["Traditional","Portrait","Pre-wedding"],     gradient: "from-fuchsia-200 via-purple-100 to-white", initials: "WP", verified: true,  featured: false, image_path: "images/vendors/weva.jpg" },
  { slug: "kahani-weddings", category: "Photographers",  name: "Kahani Weddings",  tagline: "Storytellers. Two films, zero posing, every tear kept.",        location: "Thiruvananthapuram",                   price_from: 150000, price_unit: "per wedding", rating: 4.9, reviews: 147, specialties: ["Storytelling","Same-day edit","Reels"],     gradient: "from-indigo-200 via-sky-100 to-white",    initials: "KW", verified: true,  featured: false, image_path: "images/vendors/kahani-weddings.jpg" },
  { slug: "pixel-petals",    category: "Photographers",  name: "Pixel Petals",     tagline: "Editorial lighting, glossy magazine-style albums.",             location: "Kozhikode",                            price_from: 120000, price_unit: "per wedding", rating: 4.7, reviews:  92, specialties: ["Editorial","Flat lay","Couture detail"],    gradient: "from-amber-200 via-rose-100 to-white",    initials: "PP", verified: false, featured: false, image_path: "images/vendors/pixel-petals.jpg" },
  // Caterers
  { slug: "dhe-puttu",       category: "Caterers",       name: "Dhe Puttu",        tagline: "Modern Kerala sadya — 28 courses, plated with restraint.",     location: "Kochi · Thiruvananthapuram",           price_from:   1250, price_unit: "per plate",   rating: 4.9, reviews: 402, specialties: ["Sadya","Plated","Live counters"],           gradient: "from-emerald-200 via-lime-100 to-white",   initials: "DP", verified: true,  featured: true,  image_path: "images/vendors/dhe-puttu.jpg" },
  { slug: "paragon",         category: "Caterers",       name: "Paragon Weddings", tagline: "A Kerala institution since 1939 — biryani royalty.",            location: "Kozhikode · Pan-Kerala",               price_from:   1450, price_unit: "per plate",   rating: 4.8, reviews: 611, specialties: ["Malabar","Biryani","Seafood"],              gradient: "from-amber-200 via-orange-100 to-white",   initials: "PW", verified: true,  featured: false, image_path: "images/vendors/paragon.jpg" },
  { slug: "zam-zam",         category: "Caterers",       name: "Zam Zam Feasts",   tagline: "Slow-cooked thalassery biryani on copper handi.",               location: "Kannur · Kozhikode",                   price_from:    980, price_unit: "per plate",   rating: 4.7, reviews: 264, specialties: ["Thalassery","Mughlai","Copper service"],    gradient: "from-rose-200 via-amber-100 to-white",    initials: "ZZ", verified: true,  featured: false, image_path: "images/vendors/zam-zam.jpg" },
  { slug: "grand-sadya-co",  category: "Caterers",       name: "Grand Sadya Co.",  tagline: "Banana-leaf service, 26 dishes, pure vegetarian.",              location: "Palakkad · Thrissur",                  price_from:    850, price_unit: "per plate",   rating: 4.8, reviews: 189, specialties: ["Pure veg","Banana leaf","Traditional"],     gradient: "from-emerald-200 via-teal-100 to-white",   initials: "GS", verified: false, featured: false, image_path: "images/vendors/grand-sadya-co.jpg" },
  // Decorators
  { slug: "bloom-room",      category: "Decorators",     name: "Bloom Room Kerala", tagline: "Floral architecture — suspended installations & cascades.",    location: "Kochi · Kumarakom",                    price_from: 450000, price_unit: "per event",   rating: 4.9, reviews: 138, specialties: ["Floral","Suspended","Imported blooms"],     gradient: "from-rose-200 via-fuchsia-100 to-white",  initials: "BR", verified: true,  featured: true,  image_path: "images/vendors/bloom-room.jpg" },
  { slug: "velvet-vine",     category: "Decorators",     name: "Velvet & Vine",    tagline: "Maximalist mehendi décor — monsoon palette specialists.",       location: "Thiruvananthapuram",                   price_from: 280000, price_unit: "per event",   rating: 4.8, reviews:  96, specialties: ["Mehendi","Sangeet","Drape work"],           gradient: "from-fuchsia-200 via-pink-100 to-white",  initials: "VV", verified: true,  featured: false, image_path: "images/vendors/velvet-vine.jpg" },
  { slug: "heritage-mandap", category: "Decorators",     name: "Heritage Mandap",  tagline: "Traditional brass, coconut fronds, Nilavilakku-lit ceremonies.", location: "Thrissur · Guruvayoor",              price_from: 180000, price_unit: "per event",   rating: 4.9, reviews: 223, specialties: ["Traditional","Brass","Temple style"],       gradient: "from-amber-200 via-yellow-100 to-white",  initials: "HM", verified: true,  featured: false, image_path: "images/vendors/heritage-mandap.jpg" },
  { slug: "backdrop-studio", category: "Decorators",     name: "The Backdrop Studio", tagline: "Minimalist, Pinterest-forward aesthetics for intimate weddings.", location: "Kochi",                            price_from: 140000, price_unit: "per event",   rating: 4.7, reviews:  74, specialties: ["Minimal","Pampas","Candlelit"],             gradient: "from-indigo-200 via-slate-100 to-white",  initials: "BS", verified: false, featured: false, image_path: "images/vendors/backdrop-studio.jpg" },
  // Makeup Artists
  { slug: "vikas-vks",       category: "Makeup Artists", name: "Vikas Vks",        tagline: "Kerala's most-booked bridal artist — HD airbrush specialist.", location: "Kochi · Travels nationwide",          price_from:  65000, price_unit: "per bride",   rating: 4.9, reviews: 512, specialties: ["HD airbrush","Bridal","South Indian"],      gradient: "from-rose-200 via-pink-100 to-white",     initials: "VV", verified: true,  featured: true,  image_path: "images/vendors/vikas-vks.jpg" },
  { slug: "lakme-salon-pro", category: "Makeup Artists", name: "Lakmé Salon Pro",  tagline: "Flagship bridal studio with certified Lakmé master artists.",  location: "Kochi · Thiruvananthapuram · Kozhikode", price_from: 48000, price_unit: "per bride",  rating: 4.8, reviews: 286, specialties: ["Bridal","Pre-bridal","Hair"],               gradient: "from-fuchsia-200 via-rose-100 to-white",  initials: "LS", verified: true,  featured: false, image_path: "images/vendors/lakme-salon-pro.jpg" },
  { slug: "sajna-hashim",    category: "Makeup Artists", name: "Sajna Hashim",     tagline: "Subtle, glow-first makeup for the modern Muslim bride.",        location: "Kozhikode · Malappuram",              price_from:  42000, price_unit: "per bride",   rating: 4.9, reviews: 198, specialties: ["Nikah","Dewy","Draping"],                    gradient: "from-emerald-200 via-teal-100 to-white",  initials: "SH", verified: true,  featured: false, image_path: "images/vendors/sajna-hashim.jpg" },
  { slug: "studio-aura",     category: "Makeup Artists", name: "Studio Aura",      tagline: "Editorial-grade bridal with runway hair stylists.",             location: "Thiruvananthapuram",                  price_from:  38000, price_unit: "per bride",   rating: 4.7, reviews: 131, specialties: ["Editorial","Hair","Engagement"],             gradient: "from-indigo-200 via-violet-100 to-white", initials: "SA", verified: false, featured: false, image_path: "images/vendors/studio-aura.jpg" },
];

const GALLERY = [
  { title: "Backwater mandap at dusk",      caption: "Kettuvallam procession into the ceremony.",         tags: ["mandap","backwater","kumarakom","ceremony"],   image_path: "images/gallery/backwater-mandap.jpg" },
  { title: "Floral suspended canopy",       caption: "Orchid & jasmine cascade over the mandap.",         tags: ["floral","decor","mandap","luxury"],            image_path: "images/gallery/floral-canopy.jpg" },
  { title: "Candid bridal portrait",        caption: "Kanjivaram silk catching the first light.",         tags: ["bride","candid","portrait","kanjivaram"],      image_path: "images/gallery/bridal-portrait.jpg" },
  { title: "Sadya on banana leaf",          caption: "28-course traditional feast, plated with care.",    tags: ["sadya","catering","traditional","food"],       image_path: "images/gallery/sadya-feast.jpg" },
  { title: "Clifftop sunset vows",          caption: "Varkala vows as the sun dips into the Arabian sea.",tags: ["beachfront","sunset","varkala","ceremony"],    image_path: "images/gallery/sunset-vows.jpg" },
  { title: "Mehendi night in marigold",     caption: "Velvet drapes and monsoon-palette florals.",        tags: ["mehendi","decor","floral","sangeet"],          image_path: "images/gallery/mehendi-night.jpg" },
  { title: "Palace banquet reception",      caption: "Bolgatty's heritage hall lit by 400 candles.",      tags: ["palace","reception","luxury","kochi"],         image_path: "images/gallery/palace-reception.jpg" },
  { title: "Hill country morning ceremony", caption: "Misty tea-estate mandap in Munnar.",                tags: ["munnar","estate","morning","hills"],           image_path: "images/gallery/hill-ceremony.jpg" },
];

// ============================================================================
// RUN
// ============================================================================

async function tableExists(name) {
  const { error } = await supa.from(name).select("id").limit(1);
  if (!error) return true;
  // PostgREST returns PGRST205 / "relation does not exist" when missing
  return false;
}

async function main() {
  // 1. Verify schema is in place
  const haveVenues  = await tableExists("venues");
  const haveVendors = await tableExists("vendors");
  const haveGallery = await tableExists("gallery");
  if (!haveVenues || !haveVendors || !haveGallery) {
    console.error("");
    console.error("✖ Schema not found. Run supabase/schema.sql in the Supabase SQL Editor first:");
    console.error("  1. Open  https://supabase.com/dashboard/project/crxygdrvlckoaykpafss/sql/new");
    console.error("  2. Paste the contents of  supabase/schema.sql");
    console.error("  3. Click  Run");
    console.error("  4. Then re-run  node supabase/bootstrap.mjs");
    console.error("");
    process.exit(1);
  }
  console.log("✓ schema detected");

  // 2. Ensure `images` bucket exists and is public
  const { data: buckets } = await supa.storage.listBuckets();
  const hasBucket = buckets?.some((b) => b.name === "images");
  if (!hasBucket) {
    const { error } = await supa.storage.createBucket("images", { public: true });
    if (error && !/already exists/i.test(error.message)) {
      console.warn("⚠ could not create 'images' bucket:", error.message);
    } else {
      console.log("✓ created 'images' storage bucket (public)");
    }
  } else {
    console.log("✓ 'images' storage bucket present");
  }

  // 3. Seed — upserts on `slug` so re-runs update rows instead of duplicating
  console.log(`→ upserting ${VENUES.length} venues …`);
  {
    const { error } = await supa.from("venues").upsert(VENUES, { onConflict: "slug" });
    if (error) throw error;
  }

  console.log(`→ upserting ${VENDORS.length} vendors …`);
  {
    const { error } = await supa.from("vendors").upsert(VENDORS, { onConflict: "slug" });
    if (error) throw error;
  }

  console.log(`→ inserting ${GALLERY.length} gallery items …`);
  {
    // gallery has no unique column besides id; wipe + insert
    await supa.from("gallery").delete().gte("created_at", "1900-01-01");
    const { error } = await supa.from("gallery").insert(GALLERY);
    if (error) throw error;
  }

  console.log("✓ seed complete");
  console.log("");
  console.log("Next: upload photos in Studio → Storage → images → venues/, vendors/, gallery/");
  console.log("      (missing photos fall back to a gradient — site works without them)");
}

main().catch((e) => {
  console.error("✖ bootstrap failed:", e.message || e);
  process.exit(1);
});
