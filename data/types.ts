// ==========================================
// 1. SLIDES / BANNERS SCHEMA
// ==========================================
export interface Slide {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
}

// ==========================================
// 2. TOUR PACKAGES SCHEMA
// ==========================================
export interface ItineraryItem {
  day: string;
  details: string;
}

export interface Package {
  id: string;
  title: string;
  duration: string;
  rating: number;
  price: string;
  features: string[];
  tag: string;
  places_covered?: string;
  itinerary?: ItineraryItem[];
}

// ==========================================
// 3. TEMPLES / EXPLORATION SCHEMA
// ==========================================
export interface Temple {
  id: string;
  name: string;
  address: string;
  deity: string;
  desc: string;
  images: string[];
  history?: string;
  timings?: string;
  bestTime?: string;
  dressCode?: string;
  rituals?: string[];
}

// ==========================================
// 4. PHOTO GALLERY SCHEMA
// ==========================================
export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "jyotirlinga" | "sacred" | "jain";
  image: string;
  description: string;
}

// ==========================================
// 5. LIVE DARSHAN FEED SCHEMA
// ==========================================
export interface FeedItem {
  id: string;
  title: string;
  source: string;
  embedId: string;
  description: string;
}

// ==========================================
// 6. ROUTE PLANNER CONFIG SCHEMA
// ==========================================
export interface PlannerDestination {
  id: string;
  name: string;
  state: string;
  price: number;
}

export interface PlannerTransport {
  id: string;
  name: string;
  pricePerDay: number;
  capacity: number;
  details: string;
}

export interface PlannerStay {
  id: string;
  name: string;
  pricePerNight: number;
  details: string;
}

export interface PlannerDevotionalService {
  id: string;
  name: string;
  price: number;
  type: string; // e.g. "per_person", "per_person_per_day", "fixed"
  details: string;
}

// ==========================================
// 7. VEDIC PANCHANG CALENDAR SCHEMA
// ==========================================
export interface PanchangEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  significance: string;
  benefits: string;
  recommendedPackageId: string;
  temple?: string;
  puja?: string;
  parikrama?: string;
}
