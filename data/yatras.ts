/**
 * DATABASE SCHEMA MAPPING & DUMMY DATA FOR UJJAINMAHAKALYATRA.COM
 * 
 * Data is now read from JSON files to simulate future REST API responses.
 * To integrate with a real backend, you can replace these static imports 
 * with dynamic `fetch('/api/packages')` or database queries.
 */

import slidesJson from "./slides.json";
import packagesJson from "./packages.json";
import templesJson from "./temples.json";

import { Slide, Package, Temple, ItineraryItem } from "./types";
export type { Slide, Package, Temple, ItineraryItem };

export const slidesData: Slide[] = slidesJson as Slide[];
export const packagesData: Package[] = packagesJson as Package[];
export const templesData: Temple[] = templesJson as Temple[];
