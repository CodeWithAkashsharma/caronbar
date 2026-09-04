// Original 4 vehicle types — used by Daily packages, Services page, and all other pages
export const VEHICLE_TYPES = [
  {
    id: 'hatchback',
    name: 'HATCHBACK',
    multiplier: 1.0,
    icon: 'Car',
    examples: 'Swift, Baleno, i20, WagonR',
    description: 'Compact daily cars requiring standard wash surface area.',
    image: '/vehicles/swift_hatchback.jpg'
  },
  {
    id: 'sedan',
    name: 'SEDAN',
    multiplier: 1.2,
    icon: 'CarFront',
    examples: 'Dzire, Honda City, Verna, Ciaz',
    description: 'Mid-size sedans with elegant body lines and boot area.',
    image: '/vehicles/dzire_sedan.jpg'
  },
  {
    id: 'suv',
    name: 'SUV',
    multiplier: 1.5,
    icon: 'SUV',
    examples: 'Creta, Brezza, Fortuner, Thar',
    description: 'Full-sized 4x4s and compact SUVs requiring specialized care.',
    image: '/vehicles/creta_suv.jpg'
  },
  {
    id: '2wheeler',
    name: '2-WHEELER',
    multiplier: 1.0,
    icon: 'Bike',
    examples: 'Activa, Bullet, Pulsar, Superbike',
    description: 'Doorstep foam wash, chain degrease & Teflon polish for bikes & scooters.',
    image: '/vehicles/2wheeler.jpeg'
  }
];

// Merged 3-tab vehicle types — used ONLY for Monthly packages tab
export const MONTHLY_VEHICLE_TYPES = [
  {
    id: 'hatchback-sedan',
    name: 'HATCHBACK / SEDAN',
    multiplier: 1.0,
    icon: 'Car',
    examples: 'Swift, Baleno, Dzire, City',
    description: 'Compact hatchbacks and mid-size sedans.',
    image: '/vehicles/swift_hatchback.jpg'
  },
  {
    id: 'suv',
    name: 'SUV',
    multiplier: 1.5,
    icon: 'SUV',
    examples: 'Creta, Brezza, Fortuner, Innova',
    description: 'Full-sized 4x4s and compact SUVs requiring specialized care.',
    image: '/vehicles/creta_suv.jpg'
  },
  {
    id: '2wheeler',
    name: '2-WHEELER',
    multiplier: 1.0,
    icon: 'Bike',
    examples: 'Activa, Bullet, Pulsar, Superbike',
    description: 'Doorstep foam wash, chain degrease & Teflon polish for bikes & scooters.',
    image: '/vehicles/2wheeler.jpeg'
  }
];
