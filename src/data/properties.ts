
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  images: string[];
  amenities: string[];
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent';
  location: {
    lat: number;
    lng: number;
  };
  yearBuilt: number;
  featured: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Waterfront Villa",
    address: "123 Oceanview Drive, Miami, FL 33101",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    description: "Stunning waterfront property with panoramic ocean views. This modern villa features an open floor plan, gourmet kitchen with high-end appliances, and a spacious master suite with a luxurious bathroom. The outdoor space includes a pool, spa, and a private dock.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
    ],
    amenities: ["Pool", "Spa", "Private Dock", "Smart Home System", "Wine Cellar", "Home Theater"],
    type: "house",
    status: "for-sale",
    location: {
      lat: 25.761681,
      lng: -80.191788
    },
    yearBuilt: 2019,
    featured: true
  },
  {
    id: "2",
    title: "Luxury Downtown Penthouse",
    address: "456 Skyline Avenue, New York, NY 10001",
    price: 3500000,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2800,
    description: "Exclusive penthouse in the heart of downtown with breathtaking city views. This luxury residence features floor-to-ceiling windows, custom finishes, and a gourmet kitchen. The building offers premium amenities including a 24-hour doorman, fitness center, and rooftop terrace.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["24-hour Doorman", "Fitness Center", "Rooftop Terrace", "Private Elevator", "Wine Storage"],
    type: "apartment",
    status: "for-sale",
    location: {
      lat: 40.712776,
      lng: -74.005974
    },
    yearBuilt: 2018,
    featured: true
  },
  {
    id: "3",
    title: "Charming Suburban Cottage",
    address: "789 Maple Street, Portland, OR 97201",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    description: "Charming cottage in a peaceful suburban neighborhood. This well-maintained home features hardwood floors, a cozy fireplace, and a renovated kitchen. The backyard includes a garden and a deck perfect for entertaining.",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["Fireplace", "Hardwood Floors", "Garden", "Deck", "Renovated Kitchen"],
    type: "house",
    status: "for-sale",
    location: {
      lat: 45.523064,
      lng: -122.676483
    },
    yearBuilt: 1945,
    featured: false
  },
  {
    id: "4",
    title: "Modern Urban Loft",
    address: "101 Industrial Way, Chicago, IL 60607",
    price: 2500,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 1200,
    description: "Stylish loft in a converted warehouse with exposed brick walls and high ceilings. This modern space features an open floor plan, industrial-style kitchen, and large windows providing abundant natural light.",
    images: [
      "https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-61dc8275fbf3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["Exposed Brick", "High Ceilings", "Stainless Steel Appliances", "In-unit Laundry"],
    type: "apartment",
    status: "for-rent",
    location: {
      lat: 41.878113,
      lng: -87.629799
    },
    yearBuilt: 2005,
    featured: false
  },
  {
    id: "5",
    title: "Elegant Victorian Home",
    address: "222 Heritage Lane, San Francisco, CA 94109",
    price: 1850000,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 3500,
    description: "Beautifully restored Victorian home with original architectural details. This elegant residence features a grand staircase, formal dining room, updated kitchen, and a spacious primary suite. Located in a historic neighborhood close to parks and shops.",
    images: [
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b9?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1974&auto=format&fit=crop"
    ],
    amenities: ["Original Hardwood", "Crown Molding", "Bay Windows", "Fireplace", "Garden"],
    type: "house",
    status: "for-sale",
    location: {
      lat: 37.774929,
      lng: -122.419418
    },
    yearBuilt: 1895,
    featured: true
  },
  {
    id: "6",
    title: "Luxury Beachfront Condo",
    address: "333 Shoreline Drive, San Diego, CA 92109",
    price: 4500,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    description: "Stunning beachfront condo with unobstructed ocean views. This luxury unit features high-end finishes, a gourmet kitchen, and a spacious balcony perfect for enjoying sunsets. The building offers resort-style amenities.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop"
    ],
    amenities: ["Ocean View", "Pool", "Fitness Center", "Concierge", "Secured Parking"],
    type: "condo",
    status: "for-rent",
    location: {
      lat: 32.715736,
      lng: -117.161087
    },
    yearBuilt: 2015,
    featured: true
  },
  {
    id: "7",
    title: "Contemporary Townhouse",
    address: "444 Urban Street, Austin, TX 78701",
    price: 650000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2000,
    description: "Modern townhouse in a vibrant urban neighborhood. This contemporary home features an open concept living area, sleek kitchen, and a rooftop deck with city views. Walking distance to restaurants, shops, and entertainment.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["Rooftop Deck", "Smart Home Features", "Energy Efficient", "Attached Garage"],
    type: "townhouse",
    status: "for-sale",
    location: {
      lat: 30.267153,
      lng: -97.743057
    },
    yearBuilt: 2020,
    featured: false
  },
  {
    id: "8",
    title: "Rustic Mountain Cabin",
    address: "555 Pine Trail, Aspen, CO 81611",
    price: 875000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    description: "Cozy mountain cabin with stunning views. This rustic retreat features a stone fireplace, exposed beam ceilings, and a wraparound deck. Perfect for enjoying outdoor activities year-round.",
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491741-a69593e43133?q=80&w=2074&auto=format&fit=crop"
    ],
    amenities: ["Mountain Views", "Fireplace", "Hot Tub", "Hiking Trails", "Ski Storage"],
    type: "house",
    status: "for-sale",
    location: {
      lat: 39.191097,
      lng: -106.817535
    },
    yearBuilt: 1985,
    featured: false
  }
];
