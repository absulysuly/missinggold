"use client";

import MultiVenueHomepage from "./components/MultiVenueHomepage";
import Navigation from "./components/Navigation";

/**
 * Home Page - Multi-Venue Platform
 * 
 * Features:
 * - Events, Hotels, Restaurants, Activities, Services
 * - Tabbed navigation
 * - Venue listings
 */

export default function Home() {
  return (
    <>
      <Navigation />
      <MultiVenueHomepage />
    </>
  );
}
