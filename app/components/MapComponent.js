"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapComponent = ({ 
  isDarkMode,
  locations,
  selectedLocations,
  mapCenter,
  mapZoom,
  getSelectedLocationsData,
  activePolygon,
  handleLocationSelect,
  getPolygonArray
}) => {
  
  // Function to create custom icon
  const createCustomIcon = (color) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: 'custom-marker-icon'
    });
  };

  // Function to create selected icon
  const createSelectedIcon = (color) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 3px ${color}80, 0 4px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          animation: pulse 2s infinite;
        ">
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        </style>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      className: 'custom-marker-icon-selected'
    });
  };

  // Initialize map only on client
  useEffect(() => {
    // Ensure Leaflet CSS is loaded
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: '100%', width: '100%' }}
      className="rounded-2xl"
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url={isDarkMode 
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Render polygons for selected locations */}
      {getSelectedLocationsData().map(location => {
        const polygonArray = getPolygonArray(location.polygon);
        if (!polygonArray || polygonArray.length === 0) return null;
        
        return (
          <Polygon
            key={`polygon-${location.id}`}
            positions={polygonArray}
            pathOptions={{
              fillColor: location.color,
              color: isDarkMode ? '#ffffff' : '#000000',
              weight: 3,
              opacity: 0.8,
              fillOpacity: selectedLocations.includes(location.id) ? 0.3 : 0.1
            }}
            eventHandlers={{
              click: () => handleLocationSelect(location.id),
            }}
          >
            <Popup>
              <div className={`p-2 ${isDarkMode ? 'text-gray-900' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: location.color }}
                  ></div>
                  <h3 className="font-bold text-lg">{location.name}</h3>
                </div>
                <p className="text-sm mt-1">{location.description}</p>
                <div className="mt-2 text-xs text-gray-600">
                  <div>District Area</div>
                  <div>Click to {selectedLocations.includes(location.id) ? 'deselect' : 'select'}</div>
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* Highlight active polygon with stronger fill */}
      {activePolygon && selectedLocations.length > 0 && (
        <Polygon
          positions={activePolygon}
          pathOptions={{
            fillColor: locations.find(l => selectedLocations.includes(l.id))?.color || '#3B82F6',
            color: '#ffffff',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.4,
            dashArray: '10, 10'
          }}
        />
      )}

      {/* Markers for all locations */}
      {locations.map(location => {
        if (!location.center || !location.center.lat || !location.center.lng) return null;
        
        const isSelected = selectedLocations.includes(location.id);
        return (
          <Marker
            key={location.id}
            position={[location.center.lat, location.center.lng]}
            icon={isSelected ? createSelectedIcon(location.color) : createCustomIcon(location.color)}
            eventHandlers={{
              click: () => handleLocationSelect(location.id),
            }}
          >
            <Popup>
              <div className={`p-2 ${isDarkMode ? 'text-gray-900' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: location.color }}
                  ></div>
                  <h3 className="font-bold text-lg">{location.name}</h3>
                </div>
                <p className="text-sm mt-1">{location.description}</p>
                <div className="mt-2 text-xs text-gray-600">
                  <div>Center: {location.center.lat?.toFixed(4) || 'N/A'}, {location.center.lng?.toFixed(4) || 'N/A'}</div>
                  <div>District Area: {location.polygon?.length || 0} points</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handleLocationSelect(location.id)}
                  >
                    {isSelected ? 'Deselect District' : 'Select District'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;