const Menu = ({ 
  slides, 
  locations, 
  activeSlide, 
  selectedLocations, 
  onSlideChange, 
  onLocationSelect,
  isDarkMode 
}) => {
  return (
    <div className={`lg:w-80 w-full h-auto lg:h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-l shadow-2xl`}>
      
      {/* Menu Header */}
      <div className={`p-4 lg:p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Alexandria Districts
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Select districts to view development plans
        </p>
      </div>

      {/* Slides Section */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="mb-6 lg:mb-8">
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <span>📊</span> Development Plans ({slides.length})
          </h3>
          <div className="space-y-2">
            {slides.map(slide => (
              <button
                key={slide.id}
                onClick={() => onSlideChange(slide.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  activeSlide === slide.id
                    ? isDarkMode 
                      ? 'bg-blue-900/50 border border-blue-500/50 text-white' 
                      : 'bg-blue-50 border border-blue-200 text-blue-700'
                    : isDarkMode
                      ? 'hover:bg-gray-700/50 border border-gray-700 text-gray-300'
                      : 'hover:bg-gray-50 border border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeSlide === slide.id
                      ? isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <span className={`text-sm font-bold ${
                      activeSlide === slide.id ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {slide.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium truncate">{slide.title}</h4>
                  </div>
                  {activeSlide === slide.id && (
                    <span className="animate-pulse">▶️</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Locations Section */}
        <div>
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            <span>📍</span> Districts ({locations.length})
          </h3>
          <div className="space-y-2">
            {locations.map(location => {
              const isSelected = selectedLocations.includes(location.id);
              return (
                <button
                  key={location.id}
                  onClick={() => onLocationSelect(location.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    isSelected
                      ? isDarkMode 
                        ? 'bg-green-900/30 border border-green-500/50' 
                        : 'bg-green-50 border border-green-200'
                      : isDarkMode
                        ? 'hover:bg-gray-700/50 border border-gray-700'
                        : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: location.color }}
                    >
                      <span className="text-white text-sm font-bold">
                        {location.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium truncate ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {location.name}
                      </h4>
                      <p className={`text-xs truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {location.center?.lat?.toFixed(2) || 'N/A'}, {location.center?.lng?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: location.color }}></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Footer */}
      <div className={`p-4 lg:p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center justify-between mb-2">
            <span>Selected Districts:</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedLocations.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedLocations.map(id => {
              const location = locations.find(loc => loc.id === id);
              return location ? (
                <span
                  key={id}
                  className="px-2 py-1 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: location.color }}
                >
                  {location.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;