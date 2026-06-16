export interface Hall {
  name: string;
  capacity: number;
  priceType: "per_pax" | "flat";
  price: number;
  minPax?: number;
}

export interface KeralaVenue {
  slug: string;
  name: string;
  district: string;
  type: "Hotel" | "Convention Centre" | "Resort" | "Palace" | "Heritage Hall" | "Beach Resort" | "Houseboat";
  address: string;
  description: string;
  highlights: string[];
  halls: Hall[];
}

export const KERALA_DISTRICTS = [
  { name: "Thiruvananthapuram", slug: "thiruvananthapuram", emoji: "🏛️", tagline: "Palaces, clifftop resorts & beach ceremonies" },
  { name: "Kollam", slug: "kollam", emoji: "⚓", tagline: "Cashew coast, backwaters & heritage venues" },
  { name: "Pathanamthitta", slug: "pathanamthitta", emoji: "🛕", tagline: "Serene forest resorts & riverside weddings" },
  { name: "Alappuzha", slug: "alappuzha", emoji: "🚣", tagline: "Venice of the East — houseboat ceremonies" },
  { name: "Kottayam", slug: "kottayam", emoji: "📚", tagline: "Rubber plantations & scenic backwater resorts" },
  { name: "Idukki", slug: "idukki", emoji: "🌿", tagline: "Misty hills — tea estates & waterfall venues" },
  { name: "Ernakulam", slug: "ernakulam", emoji: "🏙️", tagline: "Kochi metro — modern ballrooms & island venues" },
  { name: "Thrissur", slug: "thrissur", emoji: "🎭", tagline: "Cultural capital — grand traditional weddings" },
  { name: "Palakkad", slug: "palakkad", emoji: "🌾", tagline: "Gap of the Ghats — heritage & garden venues" },
  { name: "Malappuram", slug: "malappuram", emoji: "🌸", tagline: "Malabar coast — elegant banquet halls" },
  { name: "Kozhikode", slug: "kozhikode", emoji: "🏖️", tagline: "Calicut — heritage & beachside weddings" },
  { name: "Wayanad", slug: "wayanad", emoji: "🌲", tagline: "Highlands — jungle & plantation ceremonies" },
  { name: "Kannur", slug: "kannur", emoji: "🥁", tagline: "Theyyam country — North Kerala traditions" },
  { name: "Kasaragod", slug: "kasaragod", emoji: "🏰", tagline: "Fort backdrop & Arabian Sea views" },
];

export const KERALA_VENUES: KeralaVenue[] = [
  // THIRUVANANTHAPURAM
  {
    slug: "kowdiar-palace-banquet",
    name: "Kowdiar Palace Banquet",
    district: "Thiruvananthapuram",
    type: "Palace",
    address: "Kowdiar, Thiruvananthapuram, Kerala 695003",
    description: "A regal wedding experience set within the historic Kowdiar precinct. Lavish halls with colonial architecture, manicured lawns, and a dedicated wedding concierge team.",
    highlights: ["Royal ambience", "Heritage architecture", "Private lawns", "Dedicated bridal suite"],
    halls: [
      { name: "Grand Durbar Hall", capacity: 800, priceType: "flat", price: 250000 },
      { name: "Rose Garden Lawn", capacity: 1200, priceType: "flat", price: 180000 },
      { name: "Royal Chamber", capacity: 150, priceType: "flat", price: 80000 },
    ],
  },
  {
    slug: "leela-kovalam",
    name: "The Leela Kovalam",
    district: "Thiruvananthapuram",
    type: "Hotel",
    address: "Beach Hotel Road, Kovalam, Kerala 695527",
    description: "Perched on a clifftop overlooking the Arabian Sea, The Leela offers breathtaking ocean views and world-class hospitality for destination weddings.",
    highlights: ["Clifftop ocean views", "Infinity pool backdrop", "International cuisine", "Premium suites"],
    halls: [
      { name: "Sea View Ballroom", capacity: 500, priceType: "per_pax", price: 3500, minPax: 100 },
      { name: "Cliff Lawn", capacity: 800, priceType: "per_pax", price: 2800, minPax: 200 },
      { name: "Private Beach Pavilion", capacity: 200, priceType: "per_pax", price: 5000, minPax: 50 },
    ],
  },
  {
    slug: "vivanta-trivandrum",
    name: "Vivanta Trivandrum",
    district: "Thiruvananthapuram",
    type: "Hotel",
    address: "Punnen Road, Trivandrum, Kerala 695001",
    description: "A landmark city hotel offering elegant banquet facilities in the heart of Kerala's capital.",
    highlights: ["City centre location", "Rooftop views", "Kerala & continental cuisine", "Expert event team"],
    halls: [
      { name: "Sapphire Ballroom", capacity: 700, priceType: "per_pax", price: 2800, minPax: 100 },
      { name: "Emerald Terrace", capacity: 200, priceType: "per_pax", price: 3500, minPax: 50 },
    ],
  },

  // KOLLAM
  {
    slug: "quilon-beach-hotel",
    name: "Quilon Beach Hotel",
    district: "Kollam",
    type: "Hotel",
    address: "Beach Road, Kollam, Kerala 691001",
    description: "A grand beachfront property combining Kerala's warm hospitality with modern amenities for memorable wedding celebrations.",
    highlights: ["Beachfront location", "Kerala cuisine specialists", "Sea-facing halls", "Banquet expertise"],
    halls: [
      { name: "Marine Grand Hall", capacity: 600, priceType: "per_pax", price: 1800, minPax: 100 },
      { name: "Sunset Lawn", capacity: 400, priceType: "per_pax", price: 1500, minPax: 80 },
    ],
  },
  {
    slug: "golden-sand-resort-kollam",
    name: "Golden Sand Resort",
    district: "Kollam",
    type: "Resort",
    address: "Ashtamudi Lake, Kollam, Kerala 691001",
    description: "A serene backwater resort on the shores of Ashtamudi Lake offering picturesque wedding ceremonies.",
    highlights: ["Ashtamudi Lake views", "Houseboat arrangements", "Kerala cuisine", "Coir village experiences"],
    halls: [
      { name: "Ashtamudi Banquet", capacity: 300, priceType: "flat", price: 95000 },
      { name: "Lakeside Gazebo", capacity: 100, priceType: "flat", price: 50000 },
    ],
  },

  // PATHANAMTHITTA
  {
    slug: "serenity-lake-resort",
    name: "Serenity Lake Resort",
    district: "Pathanamthitta",
    type: "Resort",
    address: "Konni, Pathanamthitta, Kerala 689691",
    description: "A tranquil resort nestled near the Konni elephant training centre, surrounded by lush forests and serene backwaters.",
    highlights: ["Forest setting", "River view", "Elephant sightings", "Traditional rituals support"],
    halls: [
      { name: "Forest Pavilion", capacity: 250, priceType: "flat", price: 90000 },
      { name: "Riverside Garden", capacity: 300, priceType: "flat", price: 75000 },
    ],
  },

  // ALAPPUZHA
  {
    slug: "emerald-isle-alappuzha",
    name: "Emerald Isle Heritage Villa",
    district: "Alappuzha",
    type: "Houseboat",
    address: "Punnamada Lake, Alappuzha, Kerala 688013",
    description: "An enchanting backwater wedding venue nestled in a 130-year-old heritage villa with private canals and traditional Kerala architecture.",
    highlights: ["130-year heritage property", "Private canal frontage", "Traditional architecture", "Ayurvedic spa"],
    halls: [
      { name: "Heritage Hall", capacity: 200, priceType: "flat", price: 150000 },
      { name: "Canal Lawn", capacity: 300, priceType: "flat", price: 120000 },
      { name: "Rooftop Terrace", capacity: 80, priceType: "flat", price: 60000 },
    ],
  },
  {
    slug: "lake-palace-alappuzha",
    name: "Lake Palace Resort",
    district: "Alappuzha",
    type: "Resort",
    address: "Punnamada, Alappuzha, Kerala 688003",
    description: "A floating palace resort on Punnamada Lake offering houseboat ceremonies and backwater wedding packages.",
    highlights: ["Houseboat ceremonies", "Backwater views", "Traditional Sadya catering", "Kathakali shows"],
    halls: [
      { name: "Lake View Banquet", capacity: 300, priceType: "per_pax", price: 2200, minPax: 50 },
      { name: "Floating Pavilion", capacity: 100, priceType: "per_pax", price: 3500, minPax: 30 },
    ],
  },
  {
    slug: "alleppey-prince-hotel",
    name: "Alleppey Prince Hotel",
    district: "Alappuzha",
    type: "Hotel",
    address: "AS Road, Alappuzha, Kerala 688001",
    description: "The premier hotel of Alleppey, offering modern banquet facilities with the iconic backwater ambience.",
    highlights: ["Central Alleppey location", "Multiple halls", "Traditional & buffet options", "Professional event team"],
    halls: [
      { name: "Prince Grand Hall", capacity: 500, priceType: "per_pax", price: 1600, minPax: 80 },
      { name: "Backwater Hall", capacity: 200, priceType: "per_pax", price: 1800, minPax: 40 },
    ],
  },

  // KOTTAYAM
  {
    slug: "taj-kumarakom",
    name: "Taj Kumarakom Resort & Spa",
    district: "Kottayam",
    type: "Resort",
    address: "Kumarakom North P.O., Kottayam, Kerala 686563",
    description: "Spread across 26 acres of lush greenery on the shores of Vembanad Lake, offering exquisite backwater wedding experiences.",
    highlights: ["26-acre lakeshore property", "Vembanad Lake views", "Ayurvedic wellness", "Heritage wooden cottages"],
    halls: [
      { name: "Vembanad Ballroom", capacity: 400, priceType: "per_pax", price: 4500, minPax: 100 },
      { name: "Lakeview Lawn", capacity: 600, priceType: "per_pax", price: 3500, minPax: 150 },
      { name: "Heritage Pavilion", capacity: 100, priceType: "per_pax", price: 6000, minPax: 30 },
    ],
  },
  {
    slug: "aida-hotel-kottayam",
    name: "Aida Hotel Kottayam",
    district: "Kottayam",
    type: "Hotel",
    address: "KK Road, Kottayam, Kerala 686001",
    description: "A beloved landmark in Kottayam, Aida Hotel has been hosting traditional Kerala weddings for decades with authentic warmth.",
    highlights: ["Established reputation", "Traditional Kerala weddings", "Sadya specialists", "Central location"],
    halls: [
      { name: "Aida Convention Hall", capacity: 600, priceType: "flat", price: 110000 },
      { name: "Garden Lawn", capacity: 400, priceType: "flat", price: 70000 },
    ],
  },

  // IDUKKI
  {
    slug: "spice-garden-munnar",
    name: "Spice Garden Resort Munnar",
    district: "Idukki",
    type: "Resort",
    address: "Pallivasal, Munnar, Idukki, Kerala 685612",
    description: "Surrounded by tea and spice plantations at 1600m elevation, offering misty mountain wedding experiences like no other.",
    highlights: ["Tea estate backdrop", "Misty mountain air", "Tribal culture experiences", "Organic spice gardens"],
    halls: [
      { name: "Plantation Pavilion", capacity: 200, priceType: "flat", price: 120000 },
      { name: "Valley View Lawn", capacity: 300, priceType: "flat", price: 95000 },
    ],
  },
  {
    slug: "windermere-estate-munnar",
    name: "Windermere Estate",
    district: "Idukki",
    type: "Heritage Hall",
    address: "Pothamedu, Munnar, Idukki, Kerala 685612",
    description: "A 19th-century British Raj estate converted into a luxury wedding venue with sweeping tea garden vistas.",
    highlights: ["Colonial estate", "Panoramic tea garden views", "Period furniture", "Outdoor chapel"],
    halls: [
      { name: "Colonial Banquet Hall", capacity: 150, priceType: "flat", price: 100000 },
      { name: "Estate Lawn", capacity: 250, priceType: "flat", price: 80000 },
    ],
  },

  // ERNAKULAM
  {
    slug: "grand-hyatt-kochi-bolgatty",
    name: "Grand Hyatt Kochi Bolgatty",
    district: "Ernakulam",
    type: "Hotel",
    address: "Bolgatty Island, Kochi, Kerala 682504",
    description: "Located on the iconic Bolgatty Island, this 5-star luxury hotel offers spectacular backwater and cityscape views for your dream wedding.",
    highlights: ["Island location", "Backwater views", "International ballroom", "Celebrity chef catering"],
    halls: [
      { name: "Grand Ballroom", capacity: 1500, priceType: "per_pax", price: 3800, minPax: 200 },
      { name: "Island Lawn", capacity: 2000, priceType: "per_pax", price: 2800, minPax: 300 },
      { name: "Bolgatty Hall", capacity: 600, priceType: "per_pax", price: 4200, minPax: 100 },
      { name: "Terrace Garden", capacity: 200, priceType: "per_pax", price: 5500, minPax: 50 },
    ],
  },
  {
    slug: "kochi-convention-centre",
    name: "Kochi Convention Centre",
    district: "Ernakulam",
    type: "Convention Centre",
    address: "Marine Drive, Ernakulam, Kochi, Kerala 682031",
    description: "Kerala's premier convention facility offering state-of-the-art infrastructure for grand wedding receptions and ceremonies.",
    highlights: ["State-of-the-art AV", "Multiple halls", "Central location", "Ample parking"],
    halls: [
      { name: "Grand Convention Hall", capacity: 3000, priceType: "flat", price: 400000 },
      { name: "Seminar Hall A", capacity: 500, priceType: "flat", price: 120000 },
      { name: "Seminar Hall B", capacity: 500, priceType: "flat", price: 120000 },
      { name: "Open Air Arena", capacity: 5000, priceType: "flat", price: 600000 },
    ],
  },
  {
    slug: "taj-malabar-kochi",
    name: "Taj Malabar Resort & Spa",
    district: "Ernakulam",
    type: "Hotel",
    address: "Willingdon Island, Kochi, Kerala 682009",
    description: "A legendary property on Willingdon Island blending colonial heritage with harbour views for truly unforgettable weddings.",
    highlights: ["Willingdon Island", "Harbour views", "Colonial heritage", "World-class spa"],
    halls: [
      { name: "Harbour Ballroom", capacity: 600, priceType: "per_pax", price: 4500, minPax: 100 },
      { name: "Spice Garden Lawn", capacity: 800, priceType: "per_pax", price: 3500, minPax: 150 },
    ],
  },

  // THRISSUR
  {
    slug: "city-centre-thrissur",
    name: "City Centre Convention Hall",
    district: "Thrissur",
    type: "Convention Centre",
    address: "MG Road, Thrissur, Kerala 680001",
    description: "The most sought-after convention venue in Thrissur's cultural heart, hosting grand Kerala traditional weddings with impeccable service.",
    highlights: ["Central location", "Traditional décor options", "Excellent acoustics", "Professional wedding team"],
    halls: [
      { name: "Platinum Hall", capacity: 2000, priceType: "flat", price: 300000 },
      { name: "Gold Hall", capacity: 1000, priceType: "flat", price: 180000 },
      { name: "Silver Hall", capacity: 500, priceType: "flat", price: 100000 },
    ],
  },
  {
    slug: "ramada-thrissur",
    name: "Ramada by Wyndham Thrissur",
    district: "Thrissur",
    type: "Hotel",
    address: "Punkunnam, Thrissur, Kerala 680002",
    description: "A premium hotel in the heart of Thrissur offering elegant banquet facilities with professional event management.",
    highlights: ["5-star facilities", "Professional event team", "Bridal packages", "Traditional Sadya"],
    halls: [
      { name: "Magnolia Ballroom", capacity: 800, priceType: "per_pax", price: 2500, minPax: 100 },
      { name: "Jasmine Hall", capacity: 300, priceType: "per_pax", price: 2000, minPax: 50 },
    ],
  },

  // PALAKKAD
  {
    slug: "fort-garden-palakkad",
    name: "Fort Garden Heritage Hotel",
    district: "Palakkad",
    type: "Heritage Hall",
    address: "Fort Maidan, Palakkad, Kerala 678001",
    description: "Adjacent to the historic Tipu Sultan Fort, this heritage property blends colonial grandeur with Kerala's traditional wedding values.",
    highlights: ["Fort views", "Colonial architecture", "Garden lawns", "Heritage interiors"],
    halls: [
      { name: "Fort View Hall", capacity: 500, priceType: "flat", price: 100000 },
      { name: "Heritage Garden", capacity: 700, priceType: "flat", price: 80000 },
      { name: "Colonial Banquet", capacity: 200, priceType: "flat", price: 60000 },
    ],
  },
  {
    slug: "kairali-palakkad",
    name: "Kairali Ayurvedic Resort",
    district: "Palakkad",
    type: "Resort",
    address: "Kodumbu, Palakkad, Kerala 678551",
    description: "A serene ayurvedic resort surrounded by lush paddy fields and mango groves, ideal for intimate destination weddings.",
    highlights: ["Paddy field views", "Ayurvedic wellness", "Organic cuisine", "Eco-friendly setting"],
    halls: [
      { name: "Mango Grove Pavilion", capacity: 150, priceType: "flat", price: 75000 },
      { name: "Paddy Field Lawn", capacity: 200, priceType: "flat", price: 60000 },
    ],
  },

  // MALAPPURAM
  {
    slug: "malappuram-convention-centre",
    name: "Malappuram Convention Centre",
    district: "Malappuram",
    type: "Convention Centre",
    address: "Uphill, Malappuram, Kerala 676505",
    description: "The premier wedding and events venue in Malappuram district, offering modern facilities with a traditional Malabar touch.",
    highlights: ["Modern AV systems", "Multiple hall options", "Malabar cuisine specialists", "Ample parking"],
    halls: [
      { name: "Grand Hall", capacity: 2500, priceType: "flat", price: 280000 },
      { name: "Banquet Hall A", capacity: 800, priceType: "flat", price: 130000 },
      { name: "Banquet Hall B", capacity: 600, priceType: "flat", price: 100000 },
    ],
  },
  {
    slug: "oyo-malabar-malappuram",
    name: "Hotel Malabar Palace",
    district: "Malappuram",
    type: "Hotel",
    address: "Calicut Road, Malappuram, Kerala 676505",
    description: "A modern hotel in the heart of Malappuram combining Malabar hospitality with contemporary amenities.",
    highlights: ["Business district", "Malabar cuisine", "Banquet expertise", "Modern facilities"],
    halls: [
      { name: "Malabar Banquet Hall", capacity: 400, priceType: "per_pax", price: 1600, minPax: 80 },
      { name: "Garden Terrace", capacity: 200, priceType: "per_pax", price: 1400, minPax: 50 },
    ],
  },

  // KOZHIKODE
  {
    slug: "taj-malabar-kozhikode",
    name: "The Taj Gateway Hotel",
    district: "Kozhikode",
    type: "Hotel",
    address: "Calicut Beach Road, Kozhikode, Kerala 673032",
    description: "An iconic heritage property overlooking the Arabian Sea, steeped in the rich Zamorin history of Calicut.",
    highlights: ["Sea-facing ballroom", "Malabar cuisine", "Heritage architecture", "Beachfront lawn"],
    halls: [
      { name: "Arabian Sea Ballroom", capacity: 600, priceType: "per_pax", price: 3200, minPax: 100 },
      { name: "Beach Lawn", capacity: 800, priceType: "per_pax", price: 2500, minPax: 150 },
      { name: "Heritage Terrace", capacity: 150, priceType: "per_pax", price: 4500, minPax: 50 },
    ],
  },
  {
    slug: "kozhikode-beach-hotel",
    name: "Beach Heritage Hotel Kozhikode",
    district: "Kozhikode",
    type: "Heritage Hall",
    address: "Beach Road, Kozhikode, Kerala 673001",
    description: "A colonial-era beach hotel restored to its original grandeur, offering heritage charm for Malabar wedding ceremonies.",
    highlights: ["Colonial heritage", "Beach access", "Zamorin history", "Traditional Malabar cuisine"],
    halls: [
      { name: "Colonial Hall", capacity: 350, priceType: "flat", price: 90000 },
      { name: "Sea Breeze Lawn", capacity: 500, priceType: "flat", price: 70000 },
    ],
  },

  // WAYANAD
  {
    slug: "vythiri-resort-wayanad",
    name: "Vythiri Resort",
    district: "Wayanad",
    type: "Resort",
    address: "Lakkidi, Vythiri, Wayanad, Kerala 673576",
    description: "A luxury jungle resort in the heart of the Wayanad forest, offering treehouse suites and waterfall wedding ceremonies.",
    highlights: ["Treehouse suites", "Waterfall nearby", "Tribal cultural shows", "Jungle canopy walks"],
    halls: [
      { name: "Jungle Amphitheatre", capacity: 250, priceType: "flat", price: 130000 },
      { name: "Riverside Lawn", capacity: 150, priceType: "flat", price: 90000 },
    ],
  },
  {
    slug: "wayanad-wilderness-resort",
    name: "Wayanad Wilderness Resort",
    district: "Wayanad",
    type: "Resort",
    address: "Meppadi, Wayanad, Kerala 673577",
    description: "An exclusive jungle retreat where weddings are celebrated under a canopy of century-old trees with tribal cultural performances.",
    highlights: ["Ancient tree canopy", "Coffee & tea plantation views", "Tribal performances", "Organic farm"],
    halls: [
      { name: "Forest Clearing", capacity: 200, priceType: "flat", price: 110000 },
      { name: "Plantation Pavilion", capacity: 150, priceType: "flat", price: 85000 },
    ],
  },

  // KANNUR
  {
    slug: "kannur-beach-house",
    name: "Kannur Beach House",
    district: "Kannur",
    type: "Beach Resort",
    address: "Payyambalam Beach, Kannur, Kerala 670001",
    description: "A premium beachfront property overlooking the pristine Payyambalam Beach, ideal for sunset wedding ceremonies.",
    highlights: ["Payyambalam Beach frontage", "Theyyam cultural shows", "North Kerala cuisine", "Lighthouse views"],
    halls: [
      { name: "Beach Banquet Hall", capacity: 400, priceType: "per_pax", price: 1800, minPax: 80 },
      { name: "Sunset Lawn", capacity: 600, priceType: "per_pax", price: 1500, minPax: 100 },
    ],
  },
  {
    slug: "ayisha-manzil-kannur",
    name: "Ayisha Manzil Heritage Home",
    district: "Kannur",
    type: "Heritage Hall",
    address: "Thalassery, Kannur, Kerala 670101",
    description: "A 200-year-old Moplah heritage home that offers an authentic North Kerala Muslim wedding experience steeped in Thalassery culture.",
    highlights: ["200-year Moplah heritage", "Thalassery cuisine", "Heritage interiors", "Intimate ceremonies"],
    halls: [
      { name: "Heritage Courtyard", capacity: 100, priceType: "flat", price: 65000 },
      { name: "Manzil Garden", capacity: 150, priceType: "flat", price: 55000 },
    ],
  },

  // KASARAGOD
  {
    slug: "bekal-resort-spa",
    name: "Bekal Resort & Spa",
    district: "Kasaragod",
    type: "Resort",
    address: "Bekal Fort Road, Kasaragod, Kerala 671315",
    description: "Adjacent to the magnificent Bekal Fort with panoramic views of the Arabian Sea and historic fort walls as your wedding backdrop.",
    highlights: ["Bekal Fort backdrop", "Arabian Sea views", "KTDC luxury facilities", "Archaeological setting"],
    halls: [
      { name: "Fort View Banquet", capacity: 350, priceType: "flat", price: 110000 },
      { name: "Sea View Lawn", capacity: 500, priceType: "flat", price: 85000 },
    ],
  },
  {
    slug: "the-lalit-bekal",
    name: "The LaLiT Resort Bekal",
    district: "Kasaragod",
    type: "Resort",
    address: "Kappil Beach, Bekal, Kasaragod, Kerala 671321",
    description: "A luxury resort between Bekal Fort and the backwaters, offering one-of-a-kind wedding experiences with fort and sea views simultaneously.",
    highlights: ["Between fort & backwaters", "Premium luxury", "International & Kerala cuisine", "Spa & wellness"],
    halls: [
      { name: "Bekal Grand Ballroom", capacity: 500, priceType: "per_pax", price: 3500, minPax: 80 },
      { name: "Backwater Lawn", capacity: 700, priceType: "per_pax", price: 2800, minPax: 120 },
      { name: "Fort View Terrace", capacity: 150, priceType: "per_pax", price: 5000, minPax: 30 },
    ],
  },
];

export function getVenuesByDistrict(district: string): KeralaVenue[] {
  return KERALA_VENUES.filter(
    (v) => v.district.toLowerCase() === district.toLowerCase()
  );
}

export function getVenueBySlug(slug: string): KeralaVenue | undefined {
  return KERALA_VENUES.find((v) => v.slug === slug);
}

export function getDistrictBySlug(slug: string) {
  return KERALA_DISTRICTS.find((d) => d.slug === slug);
}
