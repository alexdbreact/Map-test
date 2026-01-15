"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Menu from "./components/Menu";
import SlideContent from "./components/SlideContent";
import { Satellite, Eye, Maximize2, Minimize2, Lock, User, LogOut } from "lucide-react";
import { locations, baseColors } from "./data/locations";
import { optionColors, optionLabels, uiText } from "./data/constants";
import './globals.css'


/* ================= MAP (NO SSR) ================= */
const MapWithNoSSR = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
        <p className="text-gray-600 dark:text-gray-400">
          جاري تحميل الخريطة...
        </p>
      </div>
    </div>
  ),
});

/* ================= SLIDES ================= */
const slides = locations.map(location => ({
  id: location.id,
  title: location.name,
  color: location.color,
  description: location.description,
  stats: {
    population: location.population,
    area: location.area,
    established: location.established,
    projects: location.projects,
    garden: location.garden,
    another: location.another
  }
}));

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSlide, setActiveSlide] = useState(2);
  const [selectedLocations, setSelectedLocations] = useState([2]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [mapCenter, setMapCenter] = useState([31.2000, 29.9000]);
  const [mapZoom, setMapZoom] = useState(12);
  const [mounted, setMounted] = useState(false);
  
  // State for option markers
  const [activeOption, setActiveOption] = useState(null);
  const [optionMarkers, setOptionMarkers] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(2);
  
  // State for selected marker
  const [selectedMarker, setSelectedMarker] = useState(null);

  /* ================= INIT ================= */
  useEffect(() => {
    setMounted(true);
    
    // Check if user is already logged in from localStorage
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
    
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  /* ================= LOGIN FUNCTIONS ================= */
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    // Static credentials
    const correctUsername = "Admin";
    const correctPassword = "5685";

    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  /* ================= TOGGLES ================= */
  const toggleDarkMode = () => {
    const v = !isDarkMode;
    setIsDarkMode(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("theme", v ? "dark" : "light");
  };

  const toggleSatelliteMode = () => {
    setIsSatelliteMode(!isSatelliteMode);
  };

  const toggleFullscreenMap = () => {
    setIsFullscreenMap(!isFullscreenMap);
  };

  const handleShowAll = () => {
    const allLocationIds = locations.map(loc => loc.id);
    setSelectedLocations(allLocationIds);
    setShowAllMarkers(true);
    setActiveOption(null);
    setOptionMarkers([]);
    setSelectedMarker(null);
    setMapCenter([31.2000, 29.9000]);
    setMapZoom(11);
    setActiveSlide(1);
  };

  /* ================= HANDLERS ================= */
  const handleLocationSelect = (locationId) => {
    setSelectedLocations([locationId]);
    setShowAllMarkers(false);
    setActiveOption(null);
    setOptionMarkers([]);
    setSelectedMarker(null);
    const location = locations.find((l) => l.id === locationId);
    if (location) {
      setMapCenter([location.center.lat, location.center.lng]);
      setMapZoom(14);
      setSelectedDistrict(locationId);
      setActiveSlide(locationId);
    }
  };

  // Handle option selection
  const handleOptionSelect = (districtId, optionId) => {
    const location = locations.find((l) => l.id === districtId);
    if (location && location.optionMarkers && location.optionMarkers[optionId]) {
      setActiveOption(optionId);
      setOptionMarkers(location.optionMarkers[optionId]);
      setSelectedDistrict(districtId);
      setActiveSlide(districtId);
      setSelectedLocations([districtId]);
      setShowAllMarkers(false);
      setSelectedMarker(null);
      
      // Center map on the first marker of the option
      if (location.optionMarkers[optionId].length > 0) {
        const firstMarker = location.optionMarkers[optionId][0];
        setMapCenter([firstMarker.lat, firstMarker.lng]);
        setMapZoom(15);
      }
    }
  };

  // Handle marker selection
  const handleMarkerSelect = (marker) => {
    setSelectedMarker(marker);
    
    // Center map on the selected marker
    setMapCenter([marker.lat, marker.lng]);
    setMapZoom(16);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          {uiText.loading}
        </p>
      </div>
    );
  }

  /* ================= LOGIN PAGE ================= */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 mylog">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Lock className="w-10 h-10 text-white" />
                <h1 className="text-2xl font-bold text-white">نظام إدارة أصول الإسكندرية</h1>
              </div>
              <p className="text-blue-100 text-sm">
                يرجى تسجيل الدخول للوصول إلى لوحة التحكم
              </p>
            </div>

            {/* Login Form */}
            <div className="p-8">
              <form onSubmit={handleLogin}>
                {/* Username Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                      placeholder="أدخل اسم المستخدم"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                      placeholder="أدخل كلمة المرور"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 text-sm text-center">
                      {loginError}
                    </p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  تسجيل الدخول
                </button>

                {/* Demo Credentials */}
                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-blue-700 dark:text-blue-300 text-sm text-center">
                    <span className="font-bold">بيانات الدخول:</span>  يرجى الحفاظ على بيانات الدخول في مكان آمن
                  </p>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-extrabold">
                  نظام عرض حصر الأصول الخاصة لمحافظة الإسكندرية © 2026
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
             
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= MAIN APP ================= */
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {uiText.title}
              </h1>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                {uiText.subtitle}
              </p>
            </div>
            
            {/* Welcome Message */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                مرحباً، {localStorage.getItem("username")}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleShowAll}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                showAllMarkers
                  ? 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-md border ${
                showAllMarkers
                  ? 'border-blue-500'
                  : isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span className="font-medium text-sm">عرض الكل</span>
            </button>

            <button
              onClick={toggleSatelliteMode}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                isSatelliteMode 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-md border ${
                isSatelliteMode 
                  ? 'border-blue-500' 
                  : isDarkMode 
                    ? 'border-gray-700' 
                    : 'border-gray-200'
              }`}
            >
              <Satellite className="h-4 w-4" />
              <span className="font-medium text-sm">
                {isSatelliteMode ? "عادي" : "أقمار"}
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-md border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              {isDarkMode ? (
                <>
                  <span className="text-lg">☀️</span>
                  <span className="font-medium text-sm">فاتح</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🌙</span>
                  <span className="font-medium text-sm">داكن</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 shadow-md border border-red-200 dark:border-red-800"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium text-sm">تسجيل خروج</span>
            </button>
          </div>
        </div>
      </div> 

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Right: Menu - Hidden in fullscreen mode */}
        {!isFullscreenMap && (
          <div dir="ltr" className="md:w-2/5 w-full border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
            <Menu
              slides={slides}
              activeSlide={activeSlide}
              onSlideChange={(id) => {
                setActiveSlide(id);
                handleLocationSelect(id);
              }}
              onOptionSelect={handleOptionSelect}
              isDarkMode={isDarkMode}
              colors={baseColors}
              selectedOption={activeOption}
              optionColors={optionColors}
              optionLabels={optionLabels}
              locations={locations}
            />
          </div>
        )}

        {/* Middle: Map */}
        <div className={`${isFullscreenMap ? 'w-full' : 'md:w-2.5/5 w-full'} relative`}>
          <div className="h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
            <MapWithNoSSR
              isDarkMode={isDarkMode}
              isSatelliteMode={isSatelliteMode}
              locations={locations}
              selectedLocations={selectedLocations}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              getSelectedLocationsData={() =>
                locations.filter((l) => selectedLocations.includes(l.id))
              }
              activeOption={activeOption}
              optionMarkers={optionMarkers}
              optionColors={optionColors}
              showAllMarkers={showAllMarkers}
              handleLocationSelect={handleLocationSelect}
              selectedDistrict={selectedDistrict}
              onMarkerClick={handleMarkerSelect}
              selectedMarker={selectedMarker}
            />
          </div>
          
          {/* Fullscreen Map Button */}
          <button
            onClick={toggleFullscreenMap}
            className={`absolute top-4 left-4 z-[1000] p-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/90 hover:bg-gray-800 text-white' 
                : 'bg-white/90 hover:bg-white text-gray-900'
            } shadow-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {isFullscreenMap ? (
              <>
                <Minimize2 className="h-4 w-4" />
                <span className="text-sm font-medium">تصغير</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                <span className="text-sm font-medium">تكبير الخريطة</span>
              </>
            )}
          </button>
        </div>

        {/* Left: Slide Content - Hidden in fullscreen mode */}
        {!isFullscreenMap && (
          <div className="md:w-0.5/5 w-full p-4 lg:p-6 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
            <SlideContent
              slide={slides.find((s) => s.id === activeSlide)}
              isDarkMode={isDarkMode}
              selectedOption={activeOption}
              optionColors={optionColors}
              optionLabels={optionLabels}
              selectedMarker={selectedMarker}
              setSelectedMarker={setSelectedMarker}
            />
          </div>
        )}
      </div>
    </div>
  );
}