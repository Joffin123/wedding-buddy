-- ============================================================================
--  Wedding Buddy — seed data
--  Run AFTER schema.sql (Supabase SQL Editor → paste → Run).
--  Safe to re-run: truncates and reinserts.
--
--  image_path columns follow the convention   images/<folder>/<file>.jpg
--  You can upload matching files in Studio → Storage → images and they'll
--  appear automatically. Rows with a missing image will render a gradient
--  fallback on the site, so seeding works even before you upload photos.
-- ============================================================================

truncate table public.venues, public.vendors, public.gallery restart identity cascade;

-- ---------- venues ----------
insert into public.venues
  (slug, name, location, region, type, capacity_min, capacity_max, price_from, tagline, highlights, gradient, featured, image_path)
values
  ('bolgatty-palace',       'Bolgatty Palace',        'Mulavukad Island, Kochi',          'Kochi',                'Palace',     150,  800,  850000, 'A 1744 Dutch palace on a private island, ringed by the backwaters.',                   array['Waterfront mandap','Heritage banquet hall','On-site boutique hotel'],     'from-amber-200 via-rose-100 to-white',   true,  'images/venues/bolgatty-palace.jpg'),
  ('taj-kumarakom',         'Taj Kumarakom',          'Vembanad Lake, Kumarakom',         'Kumarakom',            'Resort',      80,  300, 1200000, 'A 140-year-old Baker bungalow on the shores of Vembanad.',                             array['Lakeside lawn','Ayurvedic spa pavilion','Houseboat processional'],       'from-emerald-200 via-teal-100 to-white', true,  'images/venues/taj-kumarakom.jpg'),
  ('kovalam-leela',         'Kovalam Leela',          'Kovalam Cliff, Thiruvananthapuram','Thiruvananthapuram',   'Beachfront', 100,  450,  980000, 'A clifftop Charles Correa masterpiece overlooking the Arabian Sea.',                   array['Sunset ceremony deck','Ocean-facing suites','Helipad for arrivals'],      'from-sky-200 via-indigo-100 to-white',   false, 'images/venues/kovalam-leela.jpg'),
  ('tea-trails-munnar',     'Tea Trails Munnar',      'Kanan Devan Hills, Munnar',        'Munnar',               'Estate',      40,  180,  620000, 'An intimate plantation bungalow wrapped in 1,400m of emerald tea.',                    array['Misty hill mandap','Colonial bungalow stays','Plantation walk ceremony'], 'from-emerald-200 via-lime-100 to-white', false, 'images/venues/tea-trails-munnar.jpg'),
  ('vivanta-ernakulam',     'Vivanta Ernakulam',      'Marine Drive, Kochi',              'Kochi',                'Heritage',   250, 1200,  740000, 'A grand ballroom overlooking the harbour — Kerala''s largest pillarless hall.',       array['Pillarless ballroom','Rooftop sangeet','Dedicated wedding planner'],      'from-fuchsia-200 via-purple-100 to-white',false,'images/venues/vivanta-ernakulam.jpg'),
  ('spice-village-thekkady','Spice Village Thekkady', 'Periyar Reserve, Thekkady',        'Thekkady',             'Resort',      60,  220,  580000, 'Thatched cottages nestled beside the Periyar tiger reserve.',                          array['Forest-edge mandap','Organic Sadya kitchen','Bonfire baraat'],            'from-amber-200 via-orange-100 to-white', false, 'images/venues/spice-village-thekkady.jpg'),
  ('vythiri-village',       'Vythiri Village',        'Lakkidi, Wayanad',                 'Wayanad',              'Resort',      80,  260,  690000, 'A rainforest retreat with tree villas and a natural stream.',                          array['Treehouse suites','Stream-side ceremony','Adventure activities'],         'from-teal-200 via-emerald-100 to-white', false, 'images/venues/vythiri-village.jpg'),
  ('gateway-varkala',       'Gateway Varkala',        'Varkala Cliff',                    'Varkala',              'Beachfront',  80,  350,  710000, 'Red cliffs, black sand beaches, and a sunset made for vows.',                          array['Cliff-edge pavilion','Beach baraat','Ayurveda welcome ritual'],           'from-rose-200 via-orange-100 to-white',  false, 'images/venues/gateway-varkala.jpg'),
  ('kumarakom-lake-resort', 'Kumarakom Lake Resort',  'Vembanad, Kumarakom',              'Kumarakom',            'Houseboat',   30,  120,  460000, 'A fleet of Kettuvallams for an intimate floating ceremony.',                           array['Six-houseboat fleet','Meenachil backwaters','Sadya on deck'],             'from-indigo-200 via-sky-100 to-white',   false, 'images/venues/kumarakom-lake-resort.jpg');

-- ---------- vendors ----------
insert into public.vendors
  (slug, category, name, tagline, location, price_from, price_unit, rating, reviews, specialties, gradient, initials, verified, featured, image_path)
values
  -- Photographers
  ('stark-studios',   'Photographers', 'Stark Studios',     'Candid documentary with a cinematic, film-grain soul.', 'Kochi · Travels pan-India',            240000, 'per wedding', 4.9, 214, array['Candid','Cinematic film','Drone coverage'],         'from-rose-200 via-amber-100 to-white',   'SS', true,  true,  'images/vendors/stark-studios.jpg'),
  ('weva',            'Photographers', 'Weva Photography',  'Regal portraiture for the modern Malayali bride.',      'Thrissur · Kochi · Bangalore',         180000, 'per wedding', 4.8, 318, array['Traditional','Portrait','Pre-wedding'],             'from-fuchsia-200 via-purple-100 to-white','WP', true,  false, 'images/vendors/weva.jpg'),
  ('kahani-weddings', 'Photographers', 'Kahani Weddings',   'Storytellers. Two films, zero posing, every tear kept.','Thiruvananthapuram',                   150000, 'per wedding', 4.9, 147, array['Storytelling','Same-day edit','Reels'],             'from-indigo-200 via-sky-100 to-white',   'KW', true,  false, 'images/vendors/kahani-weddings.jpg'),
  ('pixel-petals',    'Photographers', 'Pixel Petals',      'Editorial lighting, glossy magazine-style albums.',     'Kozhikode',                            120000, 'per wedding', 4.7,  92, array['Editorial','Flat lay','Couture detail'],            'from-amber-200 via-rose-100 to-white',   'PP', false, false, 'images/vendors/pixel-petals.jpg'),
  -- Caterers
  ('dhe-puttu',       'Caterers',      'Dhe Puttu',         'Modern Kerala sadya — 28 courses, plated with restraint.','Kochi · Thiruvananthapuram',         1250, 'per plate',   4.9, 402, array['Sadya','Plated','Live counters'],                   'from-emerald-200 via-lime-100 to-white', 'DP', true,  true,  'images/vendors/dhe-puttu.jpg'),
  ('paragon',         'Caterers',      'Paragon Weddings',  'A Kerala institution since 1939 — biryani royalty.',    'Kozhikode · Pan-Kerala',                 1450, 'per plate',   4.8, 611, array['Malabar','Biryani','Seafood'],                      'from-amber-200 via-orange-100 to-white', 'PW', true,  false, 'images/vendors/paragon.jpg'),
  ('zam-zam',         'Caterers',      'Zam Zam Feasts',    'Slow-cooked thalassery biryani on copper handi.',       'Kannur · Kozhikode',                      980, 'per plate',   4.7, 264, array['Thalassery','Mughlai','Copper service'],            'from-rose-200 via-amber-100 to-white',   'ZZ', true,  false, 'images/vendors/zam-zam.jpg'),
  ('grand-sadya-co',  'Caterers',      'Grand Sadya Co.',   'Banana-leaf service, 26 dishes, pure vegetarian.',      'Palakkad · Thrissur',                     850, 'per plate',   4.8, 189, array['Pure veg','Banana leaf','Traditional'],             'from-emerald-200 via-teal-100 to-white', 'GS', false, false, 'images/vendors/grand-sadya-co.jpg'),
  -- Decorators
  ('bloom-room',      'Decorators',    'Bloom Room Kerala', 'Floral architecture — suspended installations & cascades.','Kochi · Kumarakom',                 450000, 'per event',   4.9, 138, array['Floral','Suspended','Imported blooms'],             'from-rose-200 via-fuchsia-100 to-white', 'BR', true,  true,  'images/vendors/bloom-room.jpg'),
  ('velvet-vine',     'Decorators',    'Velvet & Vine',     'Maximalist mehendi décor — monsoon palette specialists.','Thiruvananthapuram',                 280000, 'per event',   4.8,  96, array['Mehendi','Sangeet','Drape work'],                   'from-fuchsia-200 via-pink-100 to-white', 'VV', true,  false, 'images/vendors/velvet-vine.jpg'),
  ('heritage-mandap', 'Decorators',    'Heritage Mandap',   'Traditional brass, coconut fronds, Nilavilakku-lit ceremonies.','Thrissur · Guruvayoor',       180000, 'per event',   4.9, 223, array['Traditional','Brass','Temple style'],               'from-amber-200 via-yellow-100 to-white', 'HM', true,  false, 'images/vendors/heritage-mandap.jpg'),
  ('backdrop-studio', 'Decorators',    'The Backdrop Studio','Minimalist, Pinterest-forward aesthetics for intimate weddings.','Kochi',                      140000, 'per event',   4.7,  74, array['Minimal','Pampas','Candlelit'],                     'from-indigo-200 via-slate-100 to-white', 'BS', false, false, 'images/vendors/backdrop-studio.jpg'),
  -- Makeup Artists
  ('vikas-vks',       'Makeup Artists','Vikas Vks',         'Kerala''s most-booked bridal artist — HD airbrush specialist.','Kochi · Travels nationwide',   65000,  'per bride',   4.9, 512, array['HD airbrush','Bridal','South Indian'],              'from-rose-200 via-pink-100 to-white',    'VV', true,  true,  'images/vendors/vikas-vks.jpg'),
  ('lakme-salon-pro', 'Makeup Artists','Lakmé Salon Pro',   'Flagship bridal studio with certified Lakmé master artists.','Kochi · Thiruvananthapuram · Kozhikode', 48000, 'per bride', 4.8, 286, array['Bridal','Pre-bridal','Hair'],                     'from-fuchsia-200 via-rose-100 to-white', 'LS', true,  false, 'images/vendors/lakme-salon-pro.jpg'),
  ('sajna-hashim',    'Makeup Artists','Sajna Hashim',      'Subtle, glow-first makeup for the modern Muslim bride.','Kozhikode · Malappuram',                42000,  'per bride',   4.9, 198, array['Nikah','Dewy','Draping'],                           'from-emerald-200 via-teal-100 to-white', 'SH', true,  false, 'images/vendors/sajna-hashim.jpg'),
  ('studio-aura',     'Makeup Artists','Studio Aura',       'Editorial-grade bridal with runway hair stylists.',     'Thiruvananthapuram',                    38000,  'per bride',   4.7, 131, array['Editorial','Hair','Engagement'],                    'from-indigo-200 via-violet-100 to-white','SA', false, false, 'images/vendors/studio-aura.jpg');

-- ---------- gallery (inspiration shown by the chatbot) ----------
insert into public.gallery (title, caption, tags, image_path) values
  ('Backwater mandap at dusk',        'Kettuvallam procession into the ceremony.',      array['mandap','backwater','kumarakom','ceremony'],  'images/gallery/backwater-mandap.jpg'),
  ('Floral suspended canopy',         'Orchid & jasmine cascade over the mandap.',      array['floral','decor','mandap','luxury'],           'images/gallery/floral-canopy.jpg'),
  ('Candid bridal portrait',          'Kanjivaram silk catching the first light.',      array['bride','candid','portrait','kanjivaram'],     'images/gallery/bridal-portrait.jpg'),
  ('Sadya on banana leaf',            '28-course traditional feast, plated with care.', array['sadya','catering','traditional','food'],      'images/gallery/sadya-feast.jpg'),
  ('Clifftop sunset vows',            'Varkala vows as the sun dips into the Arabian sea.', array['beachfront','sunset','varkala','ceremony'], 'images/gallery/sunset-vows.jpg'),
  ('Mehendi night in marigold',       'Velvet drapes and monsoon-palette florals.',     array['mehendi','decor','floral','sangeet'],         'images/gallery/mehendi-night.jpg'),
  ('Palace banquet reception',        'Bolgatty''s heritage hall lit by 400 candles.', array['palace','reception','luxury','kochi'],         'images/gallery/palace-reception.jpg'),
  ('Hill country morning ceremony',   'Misty tea-estate mandap in Munnar.',             array['munnar','estate','morning','hills'],          'images/gallery/hill-ceremony.jpg');
