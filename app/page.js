"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Menu from './components/Menu';
import SlideContent from './components/SlideContent';

// Dynamically import all Leaflet components with no SSR
const MapWithNoSSR = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  )
});

// Define 10 locations/districts in Alexandria, Egypt with polygon coordinates
const locations = [
  { 
    id: 1, 
    name: "Downtown Alexandria", 
    center: { lat: 31.1978, lng: 29.8925 }, 
    color: "#3B82F6", 
    description: "Heart of Alexandria with historic buildings and commercial centers",
    polygon: [
      { lat: 31.1950, lng: 29.8900 },
      { lat: 31.2000, lng: 29.8900 },
      { lat: 31.1970, lng: 29.8920 },
      { lat: 31.1980, lng: 29.8910 },
      { lat: 31.2000, lng: 29.8950 },
      { lat: 31.1950, lng: 29.8950 },
      { lat: 31.1950, lng: 29.8900 }
    ]
  },
  { 
    id: 2, 
    name: "Montaza District", 
    center: { lat: 31.2892, lng: 30.0089 }, 
    color: "#10B981", 
    description: "Royal gardens, palaces, and upscale residential areas",
    polygon: [
      { lat: 31.2800, lng: 30.0000 },
      { lat: 31.2950, lng: 30.0000 },
      { lat: 31.2950, lng: 30.0150 },
      { lat: 31.2800, lng: 30.0150 },
      { lat: 31.2800, lng: 30.0000 }
    ]
  },
  { 
    id: 3, 
    name: "Stanley Bay", 
    center: { lat: 31.2497, lng: 29.9661 }, 
    color: "#8B5CF6", 
    description: "Scenic bay with bridges, cafes, and waterfront promenade",
    polygon: [
      { lat: 31.2450, lng: 29.9600 },
      { lat: 31.2550, lng: 29.9600 },
      { lat: 31.2550, lng: 29.9700 },
      { lat: 31.2450, lng: 29.9700 },
      { lat: 31.2450, lng: 29.9600 }
    ]
  },
  { 
    id: 4, 
    name: "Shatby Medical District", 
    center: { lat: 31.2050, lng: 29.9083 }, 
    color: "#EF4444", 
    description: "University hospitals and medical facilities area",
    polygon: [
      { lat: 31.2000, lng: 29.9030 },
      { lat: 31.2100, lng: 29.9030 },
      { lat: 31.2100, lng: 29.9130 },
      { lat: 31.2000, lng: 29.9130 },
      { lat: 31.2000, lng: 29.9030 }
    ]
  },
  { 
    id: 5, 
    name: "Sporting District", 
    center: { lat: 31.2333, lng: 29.9500 }, 
    color: "#06B6D4", 
    description: "Residential area with sporting clubs and facilities",
    polygon: [
      { lat: 31.2280, lng: 29.9450 },
      { lat: 31.2380, lng: 29.9450 },
      { lat: 31.2380, lng: 29.9550 },
      { lat: 31.2280, lng: 29.9550 },
      { lat: 31.2280, lng: 29.9450 }
    ]
  },
  { 
    id: 6, 
    name: "Smouha", 
    center: { lat: 31.2089, lng: 29.9564 }, 
    color: "#F59E0B", 
    description: "Modern residential district with gardens and commercial centers",
    polygon: [
      { lat: 31.2030, lng: 29.9510 },
      { lat: 31.2130, lng: 29.9510 },
      { lat: 31.2130, lng: 29.9610 },
      { lat: 31.2030, lng: 29.9610 },
      { lat: 31.2030, lng: 29.9510 }
    ]
  },
  { 
    id: 7, 
    name: "Miami District", 
    center: { lat: 31.2667, lng: 29.9833 }, 
    color: "#EC4899", 
    description: "Beachfront area with resorts and entertainment venues",
    polygon: [
      { lat: 31.2600, lng: 29.9780 },
      { lat: 31.2720, lng: 29.9780 },
      { lat: 31.2720, lng: 29.9880 },
      { lat: 31.2600, lng: 29.9880 },
      { lat: 31.2600, lng: 29.9780 }
    ]
  },
  { 
    id: 8, 
    name: "Gleem District", 
    center: { lat: 31.2550, lng: 29.9750 }, 
    color: "#84CC16", 
    description: "Upscale residential neighborhood near the beach",
    polygon: [
      { lat: 31.2500, lng: 29.9700 },
      { lat: 31.2600, lng: 29.9700 },
      { lat: 31.2600, lng: 29.9800 },
      { lat: 31.2500, lng: 29.9800 },
      { lat: 31.2500, lng: 29.9700 }
    ]
  },
  { 
    id: 9, 
    name: "Sidi Gaber", 
    center: { lat: 31.2583, lng: 29.9667 }, 
    color: "#6366F1", 
    description: "Commercial and transportation hub with train station",
    polygon: [
      { lat: 31.2530, lng: 29.9610 },
      { lat: 31.2630, lng: 29.9610 },
      { lat: 31.2630, lng: 29.9710 },
      { lat: 31.2530, lng: 29.9710 },
      { lat: 31.2530, lng: 29.9610 }
    ]
  },
  { 
    id: 10, 
    name: "Borg El Arab", 
    center: { lat: 30.8667, lng: 29.5667 }, 
    color: "#F97316", 
    description: "Industrial city and new urban communities",
    polygon: [
      { lat: 30.8600, lng: 29.5600 },
      { lat: 30.8730, lng: 29.5600 },
      { lat: 30.8730, lng: 29.5730 },
      { lat: 30.8600, lng: 29.5730 },
      { lat: 30.8600, lng: 29.5600 }
    ]
  }
];

// Slide data - each slide corresponds to a district
const slides = [
  { id: 1, title: "Downtown Development", description: "Revitalization of historic downtown Alexandria with preservation of heritage buildings and modernization of infrastructure." },
  { id: 2, title: "Montaza Preservation", description: "Conservation of royal gardens and palaces while developing sustainable tourism facilities." },
  { id: 3, title: "Stanley Bay Tourism", description: "Development of waterfront tourism infrastructure including walkways, cafes, and entertainment venues." },
  { id: 4, title: "Medical Hub Expansion", description: "Expansion of medical facilities and research centers in the Shatby district." },
  { id: 5, title: "Sports Infrastructure", description: "Development of public sports facilities and clubs in the Sporting district." },
  { id: 6, title: "Residential Modernization", description: "Urban renewal and modernization of residential areas in Smouha district." },
  { id: 7, title: "Tourism & Entertainment", description: "Development of beachfront resorts and entertainment facilities in Miami district." },
  { id: 8, title: "Upscale Residential", description: "Development of luxury residential communities in Gleem district." },
  { id: 9, title: "Transportation Hub", description: "Modernization of transportation infrastructure in Sidi Gaber commercial district." },
  { id: 10, title: "Industrial Growth", description: "Expansion of industrial zones and new urban communities in Borg El Arab." }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([1]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapCenter, setMapCenter] = useState([31.2000, 29.9000]); // Center of Alexandria
  const [mapZoom, setMapZoom] = useState(12);
  const [mounted, setMounted] = useState(false);
  const [activePolygon, setActivePolygon] = useState(null);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle location selection
  const handleLocationSelect = (locationId) => {
    setSelectedLocations(prev => {
      if (prev.includes(locationId)) {
        return prev.filter(id => id !== locationId);
      } else {
        return [...prev, locationId];
      }
    });
    
    // Center map on selected location
    const location = locations.find(loc => loc.id === locationId);
    if (location && location.center) {
      setMapCenter([location.center.lat, location.center.lng]);
      setMapZoom(14);
      setActivePolygon(location.polygon);
    }
  };

  // Handle slide change
  const handleSlideChange = (slideId) => {
    setActiveSlide(slideId);
    // Automatically select corresponding location
    handleLocationSelect(slideId);
  };

  // Get selected location data
  const getSelectedLocationsData = () => {
    return locations.filter(loc => selectedLocations.includes(loc.id));
  };

  // Convert polygon objects to arrays for Leaflet
  const getPolygonArray = (polygon) => {
    if (!polygon) return [];
    return polygon.map(point => [point.lat, point.lng]);
  };

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Alexandria Presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6">
          
          {/* Slide Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <div>
                <h1 className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Alexandria Urban Development
                </h1>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Presentation of district development plans
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 shadow-md'
                }`}
              >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>

            <SlideContent 
              slide={slides.find(s => s.id === activeSlide)}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Map Container */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
            <MapWithNoSSR
              isDarkMode={isDarkMode}
              locations={locations}
              selectedLocations={selectedLocations}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              getSelectedLocationsData={getSelectedLocationsData}
              activePolygon={activePolygon ? getPolygonArray(activePolygon) : null}
              handleLocationSelect={handleLocationSelect}
              getPolygonArray={getPolygonArray}
            />
          </div>
        </div>

        {/* Side Menu */}
        <Menu 
          slides={slides}
          locations={locations}
          activeSlide={activeSlide}
          selectedLocations={selectedLocations}
          onSlideChange={handleSlideChange}
          onLocationSelect={handleLocationSelect}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}