import { Building2, ChevronDown, ChevronUp, Users, MapPinned, Calendar, Store, LayoutGrid, LayoutList, Sprout } from "lucide-react";
import { useState } from "react";
import { optionColors, optionLabels } from "../data/constants";

const Menu = ({
  slides,
  activeSlide,
  onSlideChange,
  onOptionSelect,
  isDarkMode,
  colors,
  selectedOption,
  locations,
}) => {
  const [viewMode, setViewMode] = useState('districts'); // 'districts' or 'subjects'
  const [expandedDistrict, setExpandedDistrict] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  
 // Subjects data
  const subjects = [
    { id: 'population', label: optionLabels.population, icon: <Users className="w-4 h-4" />, color: optionColors.population },
    { id: 'area', label: optionLabels.area, icon: <Store className="w-4 h-4" />, color: optionColors.area },
    { id: 'established', label: optionLabels.established, icon: <Calendar className="w-4 h-4" />, color: optionColors.established },
    { id: 'garden', label: optionLabels.garden, icon: <Sprout className="w-4 h-4" />, color: optionColors.garden },
    { id: 'another', label: optionLabels.another, icon: <MapPinned className="w-4 h-4" />, color: optionColors.another },
  ];

  // Get subject data for all districts
  const getSubjectData = (subjectId) => {
    return slides.map(slide => ({
      id: slide.id,
      title: slide.title,
      color: slide.color,
      value: slide.stats[subjectId] || "",
      description: slide.description,
      stats: slide.stats
    }));
  };

  const toggleDistrict = (districtId) => {
    if (expandedDistrict === districtId) {
      setExpandedDistrict(null);
    } else {
      setExpandedDistrict(districtId);
      if (!activeSlide || activeSlide !== districtId) {
        onSlideChange(districtId);
      }
    }
  };

  const toggleSubject = (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(subjectId);
    }
  };

  const handleDistrictOptionClick = (districtId, optionId) => {
    onOptionSelect(districtId, optionId);
  };

  const handleSubjectDistrictClick = (subjectId, districtId) => {
    onOptionSelect(districtId, subjectId);
  };

  return (
    <div 
      dir="rtl"
      className={`h-full p-4 overflow-y-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <div className="mb-6 sticky top-0 bg-inherit pb-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">
            {viewMode === 'districts' ? 'الأحياء والبيانات' : 'البيانات والأحياء'}
          </h2>
          
          {/* View Mode Toggle */}
          <div className={`flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setViewMode('districts')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                viewMode === 'districts' 
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` 
                  : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <span>حسب الأحياء</span>
            </button>
            <button
              onClick={() => setViewMode('subjects')}
              className={`px-1 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                viewMode === 'subjects' 
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` 
                  : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <span>حسب البيانات</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {viewMode === 'districts' 
            ? "اختر حياً ثم اختر نوع البيانات لعرض مواقعها على الخريطة"
            : "اختر نوع البيانات ثم اختر حياً لعرض مواقعه على الخريطة"}
        </p>
        
        {/* Selected Option Display */}
        {selectedOption && (
          <div className={`mt-3 p-2 rounded-lg animate-pulse-subtle ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`} 
            style={{ borderLeft: `4px solid ${optionColors[selectedOption]}` }}>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: optionColors[selectedOption] }}
              />
              <span className="text-sm font-medium">
                {optionLabels[selectedOption]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-auto">
                نشط
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ================= DISTRICTS VIEW ================= */}
      {viewMode === 'districts' && (
        <div className="space-y-2">
          {slides.map((slide) => {
            const isActive = slide.id === activeSlide;
            const isExpanded = expandedDistrict === slide.id;
            
            return (
              <div 
                key={slide.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? 'shadow-lg ring-1 ring-opacity-20'
                    : 'hover:shadow-md'
                } ${
                  isActive
                    ? isDarkMode 
                      ? 'ring-blue-500 bg-gray-800' 
                      : 'ring-blue-300 bg-blue-50'
                    : isDarkMode 
                      ? 'hover:bg-gray-800/50' 
                      : 'hover:bg-gray-50'
                }`}
                style={isActive ? { 
                  boxShadow: `0 0 0 1px ${slide.color}40, 0 4px 12px rgba(0,0,0,0.1)`
                } : {}}
              >
                {/* District Header */}
                <button
                  onClick={() => toggleDistrict(slide.id)}
                  className={`w-full flex items-center justify-between p-3 transition-all duration-300 ${
                    isExpanded 
                      ? isDarkMode 
                        ? 'bg-gray-800/80' 
                        : 'bg-blue-50/80'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Color Indicator */}
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: slide.color }}
                    />

                    {/* Icon */}
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive 
                          ? 'bg-opacity-20' 
                          : 'bg-opacity-10'
                      }`}
                      style={{ 
                        backgroundColor: slide.color + (isActive ? '40' : '20')
                      }}
                    >
                      <Building2 
                        className="w-5 h-5" 
                        style={{ 
                          color: isActive ? slide.color : slide.color + '80'
                        }} 
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-right">
                      <div className="font-medium text-sm">{slide.title}</div>
                      <div className={`text-xs mt-1 ${
                        isActive 
                          ? isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                       {/*
                         {slide.stats.projects} نقطة • {slide.stats.population} 
                        
                        */}
                      </div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className={`transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Options Collapse */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-medium mb-3 text-gray-500 dark:text-gray-400">
                      اختر نوع البيانات لعرض مواقعها:
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject.id}
                          onClick={() => handleDistrictOptionClick(slide.id, subject.id)}
                          className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                            selectedOption === subject.id
                              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-100 shadow-inner'
                              : isDarkMode 
                                ? 'hover:bg-gray-700/50 bg-gray-800/30' 
                                : 'hover:bg-gray-100 bg-gray-50'
                          }`}
                          style={selectedOption === subject.id ? {
                            border: `2px solid ${subject.color}`,
                            backgroundColor: subject.color + '10'
                          } : {}}
                        >
                          <div 
                            className="p-1 rounded-lg"
                            style={{ backgroundColor: subject.color + '20' }}
                          >
                            <div style={{ color: subject.color }}>
                              {subject.icon}
                            </div>
                          </div>
                          <span className="text-xs font-medium">{subject.label}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                              {/*
                            
                             {slide.stats[subject.id]} 
                            */}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Quick Info */}
                    <div className="mt-2 pt-1 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">سيظهر على الخريطة</span>
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-2 h-2 rounded-full shadow-sm"
                            style={{ backgroundColor: selectedOption ? optionColors[selectedOption] : slide.color }}
                          />
                          <span className="font-bold">
                            {selectedOption ? '٤ مواقع' : '١ موقع'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= SUBJECTS VIEW ================= */}
      {viewMode === 'subjects' && (
        <div className="space-y-2">
          {subjects.map((subject) => {
            const subjectDistricts = getSubjectData(subject.id);
            const isExpanded = expandedSubject === subject.id;
            const isActive = selectedOption === subject.id;
            
            return (
              <div 
                key={subject.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? 'shadow-lg ring-1 ring-opacity-20'
                    : 'hover:shadow-md'
                } ${
                  isActive
                    ? isDarkMode 
                      ? 'ring-blue-500 bg-gray-800' 
                      : 'ring-blue-300 bg-blue-50'
                    : isDarkMode 
                      ? 'hover:bg-gray-800/50' 
                      : 'hover:bg-gray-50'
                }`}
                style={isActive ? { 
                  boxShadow: `0 0 0 1px ${subject.color}40, 0 4px 12px rgba(0,0,0,0.1)`
                } : {}}
              >
                {/* Subject Header */}
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className={`w-full flex items-center justify-between p-3 transition-all duration-300 ${
                    isExpanded 
                      ? isDarkMode 
                        ? 'bg-gray-800/80' 
                        : 'bg-blue-50/80'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Color Indicator */}
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: subject.color }}
                    />

                    {/* Icon */}
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive 
                          ? 'bg-opacity-20' 
                          : 'bg-opacity-10'
                      }`}
                      style={{ 
                        backgroundColor: subject.color + (isActive ? '40' : '20')
                      }}
                    >
                      <div style={{ color: isActive ? subject.color : subject.color + '80' }}>
                        {subject.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-right">
                      <div className="font-medium text-sm">{subject.label}</div>
                      <div className={`text-xs mt-1 ${
                        isActive 
                          ? isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>


                        {/*
                        
                        {subjectDistricts.length} حي • {subjectDistricts[0]?.value || ''}
                        */}
                        
                      </div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className={`transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Districts Collapse */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-medium mb-3 text-gray-500 dark:text-gray-400">
                      اختر حياً لعرض مواقع البيانات:
                    </h4>
                    
                    <div className="space-y-2">
                      {subjectDistricts.map((district) => {
                        const isDistrictActive = activeSlide === district.id && selectedOption === subject.id;
                        
                        return (
                          <button
                            key={district.id}
                            onClick={() => handleSubjectDistrictClick(subject.id, district.id)}
                            className={`w-full p-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
                              isDistrictActive
                                ? isDarkMode ? 'bg-gray-700' : 'bg-gray-100 shadow-inner'
                                : isDarkMode 
                                  ? 'hover:bg-gray-700/50 bg-gray-800/30' 
                                  : 'hover:bg-gray-100 bg-gray-50'
                            }`}
                            style={isDistrictActive ? {
                              borderRight: `4px solid ${district.color}`,
                            } : {}}
                          >
                            <div className="flex items-center gap-2">
                              {/* District Color Indicator */}
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: district.color }}
                              />

                              {/* District Icon */}
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: district.color + '20' }}
                              >
                                <Building2 
                                  className="w-4 h-4" 
                                  style={{ color: district.color }}
                                />
                              </div>

                              {/* District Info */}
                              <div className="flex-1 text-right">
                                <div className="font-medium text-sm">{district.title}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {/*
                                  
                                    {district.value}
                                  */}
                                
                                </div>
                              </div>
                            </div>

                            {/* Active Indicator */}
                            {isDistrictActive && (
                              <div 
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: subject.color }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    {/* Quick Info */}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">مجموع البيانات</span>
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="font-bold">
                            {subjectDistricts.length * 5} موقع
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-gray-500 dark:text-gray-400">المجموع</span>
          <div className="flex items-center gap-2">
            {colors && colors.slice(0, 3).map((color, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            ))}
            <span className="font-bold">
              {viewMode === 'districts' ? '١٠ أحياء' : '5 أنواع بيانات'}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {selectedOption ? (
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: optionColors[selectedOption] }}
              />
              <span>يتم عرض مواقع {optionLabels[selectedOption]}</span>
            </div>
          ) : (
            viewMode === 'districts' 
              ? "اختر خياراً لعرض مواقع البيانات على الخريطة"
              : "اختر حياً لعرض مواقع البيانات على الخريطة"
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;