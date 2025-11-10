"use client";

import MultiVenueHomepage from "./components/MultiVenueHomepage";
import TopNavBar from "./components/TopNavBar";

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
      <TopNavBar />
      <MultiVenueHomepage />
    </>
  );
}
