export const MONTHLY_PACKAGES_DATA = [
  {
    id: 'monthly-1m',
    type: 'monthly',
    name: 'Monthly',
    tagline: '1x Full body wash + 4x internal wash',
    basePrice: 999,
    originalBasePrice: 1499,
    prices: {
      hatchback: 999,
      sedan: 1199,
      suv: 1499
    },
    period: '/ month',
    popular: true,
    badge: 'Monthly Plan',
    duration: '30 Days Care',
    servicesIncluded: [
      '1x Full body snow foam wash',
      '4x Internal cabin wash & vacuum',
      'Weekly tyre gloss & rim cleaning',
      'Streak-free glass & mirror wipe'
    ]
  },
  {
    id: 'quarterly',
    type: 'monthly',
    name: 'Quarterly',
    tagline: '3 Months daily care + weekly foam wash',
    basePrice: 1400,
    originalBasePrice: 1799,
    prices: {
      hatchback: 1400,
      sedan: 1700,
      suv: 2800
    },
    period: '/ 3 months',
    popular: false,
    badge: 'Quarterly Plan',
    duration: '90 Days Care',
    servicesIncluded: [
      'Daily doorstep full body wash',
      '12x Internal cabin vacuuming',
      'Weekly high-pressure foam wash',
      'Tyre dressing & glass polish'
    ]
  },
  {
    id: 'half-yearly',
    type: 'monthly',
    name: 'Half Yearly',
    tagline: '6 Months care + deep interior steam clean',
    basePrice: 2700,
    originalBasePrice: 3499,
    prices: {
      hatchback: 2700,
      sedan: 3300,
      suv: 5500
    },
    period: '/ 6 months',
    popular: false,
    badge: 'Best Savings',
    duration: '180 Days Care',
    servicesIncluded: [
      'Everything in Quarterly Plan',
      '24x Deep interior cabin vacuums',
      '2x Hot steam stain removals',
      'Free machine gloss wax polish'
    ]
  },
  {
    id: 'yearly',
    type: 'monthly',
    name: 'Yearly',
    tagline: '365 days full vehicle care & shine guarantee',
    basePrice: 5500,
    originalBasePrice: 6999,
    prices: {
      hatchback: 5500,
      sedan: 6500,
      suv: 10000
    },
    period: '/ year',
    popular: false,
    badge: 'Best Value',
    duration: '365 Days Care',
    servicesIncluded: [
      'Full 365 days doorstep daily cleaning',
      'Weekly pressure foam washes',
      'Monthly interior steam sanitization',
      'Machine paint polish & ceramic seal'
    ]
  }
];

export const DAILY_PACKAGES_DATA = [
  {
    id: 'complete-wash',
    serviceId: 'complete-wash',
    type: 'daily',
    name: 'Full Body Wash',
    tagline: 'Complete foam wash + deep interior vacuum & steam clean',
    basePrice: 999,
    originalBasePrice: 1499,
    prices: {
      hatchback: 999,
      sedan: 1199,
      suv: 1499
    },
    period: '/ visit',
    popular: true,
    badge: 'Inside + Outside Combo',
    duration: '1.5 Hours',
    servicesIncluded: [
      'High-pressure exterior snow foam wash',
      'Complete interior steam & seat vacuum',
      'Underbody chassis & alloy cleaning',
      'Dashboard UV shine & fresh fragrance'
    ]
  },
  {
    id: 'interior-steam',
    serviceId: 'interior-steam',
    type: 'daily',
    name: 'Inside Wash',
    tagline: '160°C dry steam sanitization & seat stain removal',
    basePrice: 699,
    originalBasePrice: 999,
    prices: {
      hatchback: 699,
      sedan: 799,
      suv: 999
    },
    period: '/ visit',
    popular: false,
    badge: 'Deep Hygiene',
    duration: '1 Hour',
    servicesIncluded: [
      'Full seat & floor carpet deep vacuum',
      '160°C hot steam stain extraction',
      'AC vent antibacterial sanitization',
      'Dashboard & door trim UV protectant'
    ]
  },
  {
    id: 'express-wash',
    serviceId: 'express-wash',
    type: 'daily',
    name: 'Outside Wash',
    tagline: 'High-pressure soft water foam wash & tyre gloss',
    basePrice: 499,
    originalBasePrice: 699,
    prices: {
      hatchback: 499,
      sedan: 599,
      suv: 799
    },
    period: '/ visit',
    popular: false,
    badge: 'Quick Exterior',
    duration: '35 Mins',
    servicesIncluded: [
      'De-ionized soft water pressure rinse',
      'Thick pH-neutral snow foam bath',
      'Scratch-free microfiber hand dry',
      'Wet-look tyre shine & glass cleaning'
    ]
  }
];

export const BIKE_PACKAGES_DATA = [
  {
    id: 'bike-monthly-399',
    type: 'monthly',
    name: '1 Month Bike & Scooter Care',
    tagline: 'Monthly subscription: 20x water wash + 1x deep foam clean',
    basePrice: 399,
    originalBasePrice: 599,
    prices: {
      hatchback: 399,
      sedan: 399,
      suv: 399,
      '2wheeler': 399
    },
    period: '/ month',
    popular: true,
    badge: '1 Month Subscription',
    duration: '30 Days Care (20 Water Washes + 1 Deep Clean)',
    image: '/vehicles/two_wheeler_wash1.webp',
    servicesIncluded: [
      '20x Water wash visits',
      '1x Deep snow foam wash & steam clean',
      'Chain degreasing & Teflon lubrication',
      'Engine fin & mudguard de-griming',
      'Tyre dressing & body gloss polish'
    ]
  }
];

export const ALL_PACKAGES_DATA = [...MONTHLY_PACKAGES_DATA, ...DAILY_PACKAGES_DATA, ...BIKE_PACKAGES_DATA];

export const PACKAGES_DATA = ALL_PACKAGES_DATA;

export const ADDONS_DATA = [
  {
    id: 'underbody-wash',
    name: 'Heavy Underbody Wash',
    icon: '🚿',
    price: 299,
    description: 'High-pressure mud & grime removal under the car.',
    category: 'exterior'
  },
  {
    id: 'wheel-balancing',
    name: 'Alloy Deep Decontam',
    icon: '🛞',
    price: 249,
    description: 'Brake dust removal & iron decontamination on rims.',
    category: 'wheels'
  },
  {
    id: 'engine-bay',
    name: 'Engine Bay Cleaning',
    icon: '⚙️',
    price: 349,
    description: 'Degrease and dress engine compartment plastics.',
    category: 'exterior'
  },
  {
    id: 'leather-conditioner',
    name: 'Leather Milk Conditioner',
    icon: '💺',
    price: 299,
    description: 'Deep moisturization to prevent leather cracking.',
    category: 'interior'
  },
  {
    id: 'glass-rain-repellent',
    name: 'Rain Repellent Glass Coating',
    icon: '🌧️',
    price: 199,
    description: 'Hydrophobic windshield coating for clear monsoon vision.',
    category: 'glass'
  }
];
