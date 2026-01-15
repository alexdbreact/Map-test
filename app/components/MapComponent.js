"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Building2, Users, MapPinned,  Calendar, Navigation, LayoutGrid, LayoutList, Store, Sprout, ImageIcon } from "lucide-react";
import { optionLabels } from "../data/constants";
const MapComponent = ({
  isDarkMode,
  isSatelliteMode,
  locations,
  selectedLocations,
  mapCenter,
  mapZoom,
  activeOption,
  optionMarkers,
  optionColors,
  showAllMarkers,
  handleLocationSelect,
  selectedDistrict,
  viewMode = 'districts',
  onMarkerClick,
  selectedMarker,
}) => {
  
  // Create custom marker icon with color
  const createMarkerIcon = (color, size = "medium", isOptionMarker = false, isSubjectView = false, isSelected = false) => {
    const sizes = {
      small: { container: "w-6 h-6", icon: "w-3 h-3", border: "2px" },
      medium: { container: "w-8 h-8", icon: "w-4 h-4", border: "3px" },
      large: { container: "w-10 h-10", icon: "w-5 h-5", border: "4px" },
      xlarge: { container: "w-12 h-12", icon: "w-6 h-6", border: "4px" }
    };
    
    const { container, icon, border } = sizes[size];

    // Different styles for selected markers
    const iconHtml = renderToStaticMarkup(
      <div className="relative">
        <div 
          className={`${container} rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200 ${isSelected ? 'ring-4 ring-white ring-offset-2 animate-pulse' : ''} ${isOptionMarker ? (isSubjectView ? 'ring-2 ring-white ring-offset-2' : 'ring-2 ring-white ring-offset-1') : ''}`}
          style={{ 
            backgroundColor: color, 
            border: `${border} solid white`,
            boxShadow: isSelected 
              ? `0 0 0 4px ${color}80, 0 4px 20px ${color}80` 
              : isOptionMarker 
                ? `0 4px 12px ${color}60` 
                : isSubjectView
                  ? `0 4px 20px ${color}40`
                  : '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {isOptionMarker ? (
            <div className="text-white font-bold">
              {size === "small" ? (
                <div className="w-3 h-3 flex items-center justify-center">•</div>
              ) : size === "large" ? (
                <div className="w-5 h-5 flex items-center justify-center text-lg">●</div>
              ) : (
                <div className="w-4 h-4 flex items-center justify-center text-md">●</div>
              )}
            </div>
          ) : (
            <svg className={`${icon} text-white`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          )}
        </div>
        <div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
          style={{ 
            backgroundColor: color,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>
    );

    return divIcon({
      html: iconHtml,
      iconSize: isOptionMarker 
        ? [size === "small" ? 20 : size === "large" ? 36 : size === "xlarge" ? 48 : 28, 
           size === "small" ? 20 : size === "large" ? 36 : size === "xlarge" ? 48 : 28]
        : size === "small" ? [24, 24] : size === "large" ? [40, 40] : [32, 32],
      iconAnchor: isOptionMarker
        ? [size === "small" ? 10 : size === "large" ? 18 : size === "xlarge" ? 24 : 14, 
           size === "small" ? 10 : size === "large" ? 18 : size === "xlarge" ? 24 : 14]
        : size === "small" ? [12, 24] : size === "large" ? [20, 40] : [16, 32],
      popupAnchor: [0, isOptionMarker ? (isSubjectView ? -30 : -20) : -32],
      className: 'custom-marker'
    });
  };

  const getTileUrl = () => {
    if (isSatelliteMode) {
      return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    }
    return isDarkMode
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  };

  // Get all district markers to display
  const getDistrictMarkers = () => {
    if (showAllMarkers) {
      return locations.map(loc => ({
        lat: loc.center.lat,
        lng: loc.center.lng,
        name: loc.name,
        locationId: loc.id,
        locationName: loc.name,
        locationColor: loc.color,
        isDistrict: true,
        description: loc.description,
        population: loc.population,
        area: loc.area,
        established: loc.established,
        garden: loc.garden,
        another: loc.another,
        projects: loc.projects
      }));
    } else if (selectedLocations.length > 0) {
      return locations
        .filter(loc => selectedLocations.includes(loc.id))
        .map(loc => ({
          lat: loc.center.lat,
          lng: loc.center.lng,
          name: loc.name,
          locationId: loc.id,
          locationName: loc.name,
          locationColor: loc.color,
          isDistrict: true,
          description: loc.description,
          population: loc.population,
          area: loc.area,
          established: loc.established,
          garden: loc.garden,
          another: loc.another,
          projects: loc.projects
        }));
    }
    return [];
  };

  // Get option markers to display
  const getOptionMarkersToDisplay = () => {
    if (activeOption && optionMarkers && optionMarkers.length > 0) {
      return optionMarkers.map((marker, index) => ({
        ...marker,
        locationId: selectedDistrict,
        locationName: locations.find(l => l.id === selectedDistrict)?.name || "",
        optionType: activeOption,
        optionColor: optionColors[activeOption] || "#3B82F6",
        isOptionMarker: true,
        markerId: `${selectedDistrict}-${activeOption}-${index}`,
        viewMode: viewMode
      }));
    }
    return [];
  };

  const districtMarkers = getDistrictMarkers();
  const optionMarkersToDisplay = getOptionMarkersToDisplay();
  const allMarkers = [...districtMarkers, ...optionMarkersToDisplay];

  // Check if a marker is selected
  const isMarkerSelected = (marker) => {
    if (!selectedMarker || !marker.isOptionMarker) return false;
    return (
      marker.lat === selectedMarker.lat &&
      marker.lng === selectedMarker.lng &&
      marker.name === selectedMarker.name
    );
  };

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url={getTileUrl()}
        attribution={isSatelliteMode 
          ? "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      />

      {/* View Mode Indicator */}
      <div className="leaflet-top leaflet-right" style={{ marginTop: '50px', marginRight: '10px' }}>
        <div className={`leaflet-control rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'}`}>
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {viewMode === 'districts' ? (
                  <LayoutGrid className="w-4 h-4" />
                ) : (
                  <LayoutList className="w-4 h-4" />
                )}
              </div>
              <div className="text-xs font-medium">
                {viewMode === 'districts' ? 'عرض حسب الأحياء' : 'عرض حسب البيانات'}
              </div>
            </div>
            {activeOption && (
              <div className="mt-1 flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: optionColors[activeOption] }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {optionLabels[activeOption]}
                </span>
              </div>
            )}
            {selectedMarker && (
              <div className="mt-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600 dark:text-green-400">
                  موقع محدد
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {allMarkers.map((marker) => {
        const isOption = marker.isOptionMarker;
        const markerColor = isOption ? marker.optionColor : marker.locationColor;
        const isSubjectView = marker.viewMode === 'subjects';
        const isSelected = isMarkerSelected(marker);
        
        return (
          <Marker
            key={isOption ? marker.markerId : `${marker.locationId}-district`}
            position={[marker.lat, marker.lng]}
            icon={createMarkerIcon(
              markerColor, 
              isOption ? (isSubjectView ? "medium" : "small") : "large",
              isOption,
              isSubjectView,
              isSelected
            )}
            eventHandlers={!isOption ? { 
              click: () => handleLocationSelect(marker.locationId) 
            } : {}}
          >
            <Tooltip 
              direction="top" 
              offset={[0, isOption ? (isSubjectView ? -20 : -15) : -10]} 
              opacity={1} 
              permanent={!isOption && !showAllMarkers}
              className="custom-tooltip"
            >
              <div className="flex flex-col items-center">
                <span 
                  className={`font-bold px-2 py-1 rounded ${isOption ? 'text-xs' : 'text-sm'} whitespace-nowrap mb-1`}
                  style={{ 
                    backgroundColor: markerColor + '20',
                    color: markerColor,
                    border: `1px solid ${markerColor}40`
                  }}
                >
                  {isOption ? `${marker.name}` : marker.name}
                </span>
                
                {isOption && (
                  <div className={`flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} shadow-sm`}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: markerColor }} />
                    <span className="text-xs font-medium" style={{ color: markerColor }}>
                      {optionLabels[activeOption]}
                    </span>
                  </div>
                )}
              </div>
            </Tooltip>
            
            {/* Popup for option markers */}
            {isOption && (
              <Popup className="custom-popup" maxWidth={320}>
                <div dir="rtl" className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-sm mb-1" style={{ color: marker.optionColor }}>
                        {marker.name}
                      </h3>
                      <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        <span>{marker.locationName}</span>
                      </div>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: marker.optionColor + '20' }}
                    >
                      {activeOption === 'population' && <Users className="w-4 h-4" style={{ color: marker.optionColor }} />}
                      {activeOption === 'area' && <Store className="w-4 h-4" style={{ color: marker.optionColor }} />}
                      {activeOption === 'established' && <Calendar className="w-4 h-4" style={{ color: marker.optionColor }} />}
                      {activeOption === 'garden' && <Sprout className="w-4 h-4" style={{ color: marker.optionColor }} />}
                      {activeOption === 'another' && <MapPinned className="w-4 h-4" style={{ color: marker.optionColor }} />}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {marker.description || "موقع خاص بالبيانات المحددة"}
                    </p>
                  </div>

                  {/* Value */}
                  <div className="mb-4 p-2 rounded-lg" style={{ backgroundColor: marker.optionColor + '10' }}>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">القيمة الإيجارية</div>
                      <div className="text-lg font-bold" style={{ color: marker.optionColor }}>
                        {marker.value}
                      </div>
                    </div>
                  </div>

                  {/* Images Button */}
                  <button
                    onClick={() => onMarkerClick && onMarkerClick(marker)}
                    className={`w-full mt-3 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                      marker.images && marker.images.length > 0
                        ? isDarkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!marker.images || marker.images.length === 0}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {marker.images && marker.images.length > 0 
                        ? `عرض ${marker.images.length} صورة` 
                        : 'لا توجد صور'}
                    </span>
                  </button>

                  {/* View Mode Info */}
                  <div className="mb-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">طريقة العرض:</span>
                      <span className="font-medium">
                        {isSubjectView ? 'عرض حسب البيانات' : 'عرض حسب الأحياء'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-gray-600 dark:text-gray-400">نوع البيانات:</span>
                      <span className="font-medium" style={{ color: marker.optionColor }}>
                        {optionLabels[activeOption]}
                      </span>
                    </div>
                  </div>

                  {/* Type Indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      {activeOption === 'population' ? 'بيانات الإسكان' :
                       activeOption === 'area' ? 'بيانات الأسواق' :
                       activeOption === 'established' ? 'المبالات ' :
                       activeOption === 'garden' ? 'مساحات خضراء' : 
                       activeOption === 'another' ? 'اخري' : 'غير مستغل '}
                    </span>
                    <span className="flex items-center gap-1">
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: marker.optionColor }}
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        {marker.locationId}:{activeOption}
                      </span>
                    </span>
                  </div>
                </div>
              </Popup>
            )}

            {/* Popup for district markers */}
            {!isOption && (
              <Popup className="district-popup">
                <div dir="rtl" className="p-4 min-w-[280px]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: marker.locationColor }}>
                        {marker.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {marker.description}
                      </p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: marker.locationColor + '20' }}
                    >
                      <Building2 className="w-6 h-6" style={{ color: marker.locationColor }} />
                    </div>
                  </div>

                  {/* View Mode Info */}
                  <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {viewMode === 'districts' ? (
                          <LayoutGrid className="w-4 h-4 text-blue-500" />
                        ) : (
                          <LayoutList className="w-4 h-4 text-purple-500" />
                        )}
                        <span className="text-sm font-medium">
                          {viewMode === 'districts' ? 'عرض حسب الأحياء' : 'عرض حسب البيانات'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        الوضع الحالي
                      </div>
                    </div>
                  </div>

                  {/* Active Option Indicator */}
                  {activeOption && (
                    <div className="mb-4 p-3 rounded-lg" style={{ 
                      backgroundColor: optionColors[activeOption] + '10',
                      border: `1px solid ${optionColors[activeOption]}30`
                    }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {activeOption === 'population' && <Users className="w-4 h-4" style={{ color: optionColors[activeOption] }} />}
                          {activeOption === 'area' && <Store className="w-4 h-4" style={{ color: optionColors[activeOption] }} />}
                          {activeOption === 'established' && <Calendar className="w-4 h-4" style={{ color: optionColors[activeOption] }} />}
                          {activeOption === 'garden' && <Sprout className="w-4 h-4" style={{ color: optionColors[activeOption] }} />}
                          {activeOption === 'another' && <MapPinned className="w-4 h-4" style={{ color: optionColors[activeOption] }} />}
                          <span className="font-medium text-sm" style={{ color: optionColors[activeOption] }}>
                            {optionLabels[activeOption]}
                          </span>
                        </div>
                        <div className="text-lg font-bold" style={{ color: optionColors[activeOption] }}>
                          {optionMarkersToDisplay.length} موقع
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-medium">الإسكان</span>
                      </div>
                      <div className="text-sm font-bold">{marker.population}</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <Store className="w-3 h-3 text-green-500" />
                        <span className="text-xs font-medium">الأسواق</span>
                      </div>
                      <div className="text-sm font-bold">{marker.area}</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-purple-500" />
                        <span className="text-xs font-medium">دورة مياه عمومية</span>
                      </div>
                      <div className="text-sm font-bold">{marker.established}</div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <Sprout className="w-3 h-3 text-amber-500" />
                        <span className="text-xs font-medium">حديقة</span>
                      </div>
                      <div className="text-sm font-bold">{marker.garden}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <MapPinned className="w-3 h-3 text-amber-500" />
                        <span className="text-xs font-medium">اخري</span>
                      </div>
                      <div className="text-sm font-bold">{marker.another}</div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">الموقع</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" 
                        style={{ 
                          backgroundColor: marker.locationColor + '20',
                          color: marker.locationColor
                        }}>
                        {marker.projects} موقع
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full"
                        style={{ 
                          width: `${Math.min(marker.projects * 3, 100)}%`,
                          backgroundColor: marker.locationColor 
                        }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      اختر خياراً من القائمة الجانبية لعرض المواقع التفصيلية
                    </p>
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;