const SlideContent = ({ slide, isDarkMode }) => {
  if (!slide) return null;

  const getDistrictStats = (slideId) => {
    const stats = {
      1: { population: "850,000", area: "12.5 km²", density: "68,000/km²", projects: 24 },
      2: { population: "320,000", area: "18.7 km²", density: "17,000/km²", projects: 15 },
      3: { population: "280,000", area: "8.2 km²", density: "34,000/km²", projects: 18 },
      4: { population: "190,000", area: "6.5 km²", density: "29,000/km²", projects: 12 },
      5: { population: "410,000", area: "14.3 km²", density: "28,700/km²", projects: 21 },
      6: { population: "550,000", area: "16.8 km²", density: "32,700/km²", projects: 26 },
      7: { population: "230,000", area: "11.2 km²", density: "20,500/km²", projects: 19 },
      8: { population: "180,000", area: "7.9 km²", density: "22,800/km²", projects: 14 },
      9: { population: "370,000", area: "10.4 km²", density: "35,600/km²", projects: 22 },
      10: { population: "220,000", area: "45.6 km²", density: "4,800/km²", projects: 31 }
    };
    return stats[slideId] || { population: "N/A", area: "N/A", density: "N/A", projects: 0 };
  };

  const stats = getDistrictStats(slide.id);

  return (
    <div className={`flex-1 rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    } shadow-2xl overflow-y-auto`}>
      
      {/* Slide Number Badge */}
      <div className="inline-flex items-center gap-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
        }`}>
          District {slide.id} of 10
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      </div>

      {/* Slide Title */}
      <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {slide.title}
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
      </h2>

      {/* Slide Description */}
      <div className="mb-8">
        <p className={`text-lg leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {slide.description}
        </p>
      </div>

      {/* District Stats Section */}
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <div className="text-center p-3">
          <div className={`text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Population
          </div>
          <div className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stats.population}
          </div>
        </div>
        <div className="text-center p-3">
          <div className={`text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Area
          </div>
          <div className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stats.area}
          </div>
        </div>
        <div className="text-center p-3">
          <div className={`text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Density
          </div>
          <div className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stats.density}
          </div>
        </div>
        <div className="text-center p-3">
          <div className={`text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Projects
          </div>
          <div className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stats.projects}
          </div>
        </div>
      </div>

      {/* Development Goals */}
      <div className="space-y-3">
        <h3 className={`font-semibold text-lg mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Development Goals
        </h3>
        {[
          "Improve public transportation accessibility",
          "Enhance green spaces and public parks",
          "Modernize water and sanitation infrastructure",
          "Promote sustainable tourism initiatives",
          "Support local businesses and job creation"
        ].map((point, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'hover:bg-gray-800/50' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <span className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                ✓
              </span>
            </div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              {point}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className={`mt-8 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-800/30' : 'bg-blue-50/50'
      }`}>
        <h4 className={`font-semibold mb-2 ${
          isDarkMode ? 'text-blue-300' : 'text-blue-700'
        }`}>
          Implementation Timeline
        </h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              style={{ width: `${Math.min(slide.id * 10, 100)}%` }}
            ></div>
          </div>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {Math.min(slide.id * 10, 100)}%
          </span>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className={`mt-8 pt-6 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`text-sm flex items-center gap-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <span>📍</span>
          Click on districts in the map to select/deselect areas
        </p>
      </div>
    </div>
  );
};

export default SlideContent;