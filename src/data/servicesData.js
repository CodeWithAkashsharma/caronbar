export const SERVICES_DATA = [
  {
    id: 'express-wash',
    slug: 'express-wash',
    name: 'Exterior Snow Foam Wash',
    category: 'exterior',
    tagline: 'High-pressure soft foam bath & tyre shine',
    shortDescription: 'Quick 35-min exterior snow foam wash and tyre polish right at your doorstep.',
    fullDescription: 'High-pressure de-ionized soft water rinse followed by thick pH-neutral snow foam shampoo bath, scratch-free microfiber wipe, and wet-look tyre dressing.',
    priceINR: '₹499',
    numericPrice: 499,
    basePrice: 499,
    originalBasePrice: 699,
    duration: '35 Mins',
    processSteps: ['Soft Water Rinse', 'Snow Foam Wash', 'Microfiber Hand Dry', 'Tyre Dressing'],
    procedure: [
      'De-ionized soft water pre-rinse to loosen road dust and dirt',
      'High-pressure dense snow foam application with pH-neutral shampoo',
      'Gentle multi-mitt microfiber hand wash to avoid swirl marks',
      'High-pressure clean water final rinse and warm air blast',
      'Microfiber plush towel drying and rich silicone tyre dressing'
    ],
    image: '/carousel/slide1_creta_foam.webp',
    video: '/videos/car_foam_video.mp4',
    prices: {
      'hatchback-sedan': 499,
      hatchback: 499,
      sedan: 599,
      suv: 699,
      '2wheeler': 299
    },
    features: [
      'High-pressure soft water wash',
      'Thick pH-neutral snow foam',
      'Scratch-free microfiber wipe',
      'Tyre shine & glass cleaning'
    ]
  },
  {
    id: 'underbody-wash',
    slug: 'underbody-wash',
    name: 'Exterior + Underbody Wash',
    category: 'exterior',
    tagline: 'Full exterior foam wash plus underbody mud blaster',
    shortDescription: 'High-pressure chassis mud blast, wheel-arch flush, snow foam rinse, and tyre polish.',
    fullDescription: 'Complete underbody high-pressure mud blast and wheel arch decontamination combined with full exterior snow foam wash and tyre polish.',
    priceINR: '₹699',
    numericPrice: 699,
    basePrice: 699,
    originalBasePrice: 899,
    duration: '45 Mins',
    processSteps: ['Underbody Chassis Blast', 'Wheel Arch Wash', 'Snow Foam Rinse', 'Gloss Dressing'],
    procedure: [
      'Under-chassis high pressure soft water mud and salt blasting',
      'Deep wheel arch flush and iron grime decontamination',
      'Exterior dense snow foam coverage and microfiber hand wash',
      'Final pure water rinse and clean microfiber drying',
      'Tyre high-gloss protective dressing and glass cleaning'
    ],
    image: '/carousel/slide4_wheel_blast.webp',
    video: '/videos/two_wheeler_video.mp4',
    prices: {
      'hatchback-sedan': 699,
      hatchback: 699,
      sedan: 799,
      suv: 899,
      '2wheeler': 399
    },
    features: [
      'Heavy underbody high-pressure wash',
      'Wheel arch mud & grit removal',
      'Thick snow foam exterior rinse',
      'Tyre dresser & mirror cleaning'
    ]
  },
  {
    id: 'interior-steam',
    slug: 'interior-steam',
    name: 'Deep Interior Steam Cleaning',
    category: 'interior',
    tagline: '160°C dry steam sanitization & seat stain removal',
    shortDescription: 'Deep cabin vacuuming and hot steam extraction to remove dust, stains, and odors.',
    fullDescription: 'Comprehensive interior dry steam treatment at 160°C that sanitizes upholstery, extracts deep stains from fabric/leather seats, kills bacteria in AC ducts, and restores dashboard finish.',
    priceINR: '₹699',
    numericPrice: 699,
    basePrice: 699,
    originalBasePrice: 999,
    duration: '60 Mins',
    processSteps: ['Deep Cabin Vacuum', 'Hot Steam Extraction', 'AC Vent Sanitization', 'Dashboard Polish'],
    procedure: [
      'Heavy commercial vacuuming of seats, floor mats, carpets, and boot',
      '160°C dry steam injection on upholstery for deep stain removal',
      'High-pressure steam sanitization of AC vents and blower channels',
      'Dashboard, console, and door panel UV protection polish',
      'Glass inside anti-fog wipe and organic fresh scent spray'
    ],
    image: '/services/interior_steam_service.webp',
    video: '/videos/car_foam_video.mp4',
    prices: {
      'hatchback-sedan': 699,
      hatchback: 699,
      sedan: 799,
      suv: 899,
      '2wheeler': 399
    },
    features: [
      'Full seat & floor deep vacuum',
      '160°C hot steam stain removal',
      'Dashboard & door trim UV polish',
      'Fresh AC vent antibacterial clean'
    ]
  },
  {
    id: 'complete-wash',
    slug: 'complete-wash',
    name: 'Complete Wash (Inside & Out)',
    category: 'both',
    tagline: 'High-pressure foam wash + deep interior steam sanitization',
    shortDescription: 'Our most popular doorstep combo: sparkling exterior snow foam wash plus deep interior steam cleaning.',
    fullDescription: 'The ultimate inside-out refresh: full exterior high-pressure foam wash and tyre shine combined with thorough interior vacuuming and 160°C hot steam sanitization.',
    priceINR: '₹999',
    numericPrice: 999,
    basePrice: 999,
    originalBasePrice: 1399,
    duration: '80 Mins',
    processSteps: ['Exterior Foam Bath', 'Underbody Jet Rinse', 'Deep Cabin Vacuum', '160°C Steam Sanitize'],
    procedure: [
      'Full exterior snow foam bath and scratch-free microfiber wash',
      'Underbody and wheel rim high-pressure mud blast',
      'Complete cabin vacuuming including carpets, seats, and boot',
      '160°C dry steam sanitization of seats, upholstery, and AC vents',
      'Premium tyre gloss, dashboard UV dressing, and glass crystal polish'
    ],
    image: '/carousel/slide3_audi_detail.webp',
    video: '/videos/two_wheeler_video.mp4',
    prices: {
      'hatchback-sedan': 999,
      hatchback: 999,
      sedan: 1199,
      suv: 1299,
      '2wheeler': 599
    },
    features: [
      'Full exterior snow foam wash',
      'Deep interior steam & vacuum',
      'Dashboard UV protection & shine',
      'Tyre shine & cabin fragrance'
    ]
  }
];
