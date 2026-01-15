import { Building2, Users, MapPinned, Calendar, Store, Target, Clock, TrendingUp, LayoutGrid, LayoutList, ImageIcon, X, ChevronLeft, ChevronRight, Eye, Sprout } from "lucide-react";
import { useState, useEffect } from "react";
import { optionColors, optionLabels } from "../data/constants";


// Helper function to get district name
const getDistrictName = (districtId) => {
  const districts = {
    1: "حي شرق",
    2: "حي وسط", 
    3: "حي غرب",
    4: "حي أول المنتزه",
    5: "حي ثان المنتزة",
    6: "حي العامرية أول",
    7: "حي العامرية ثان",
    8: "برج العرب",
    9: "حي الجمرك",
    10: "حي العجمي"
  };
  return districts[districtId] || "الحي";
};

// Function to get general images when no marker is selected
const getGeneralImageData = (slideId, selectedOption, viewMode) => {
  const basePath = "/images";
  
  if (viewMode === 'districts') {
    // General district images
    return [
      { id: 1, src: `${basePath}/districts/${slideId}/general/1.jpg`, 
        title: `منظر عام لـ ${getDistrictName(slideId)}`, 
        description: `صورة عامة لحي ${getDistrictName(slideId)}` },
      { id: 2, src: `${basePath}/districts/${slideId}/general/2.jpg`, 
        title: `معالم ${getDistrictName(slideId)}`, 
        description: `معالم بارزة في حي ${getDistrictName(slideId)}` },
      { id: 3, src: `${basePath}/districts/${slideId}/general/3.jpg`, 
        title: `شوارع ${getDistrictName(slideId)}`, 
        description: `البنية التحتية في حي ${getDistrictName(slideId)}` },
      { id: 4, src: `${basePath}/districts/${slideId}/general/4.jpg`, 
        title: `خدمات ${getDistrictName(slideId)}`, 
        description: `المرافق والخدمات في حي ${getDistrictName(slideId)}` }
    ];
  } else {
    // Subject overview images
    if (selectedOption) {
      return [
        { id: 1, src: `${basePath}/subjects/${selectedOption}/general/1.jpg`, 
          title: `أمثلة على ${optionLabels[selectedOption]}`, 
          description: `نماذج من ${optionLabels[selectedOption]} في محافظة الإسكندرية` },
        { id: 2, src: `${basePath}/subjects/${selectedOption}/general/2.jpg`, 
          title: `${optionLabels[selectedOption]} متنوعة`, 
          description: `تنوع في ${optionLabels[selectedOption]} عبر الأحياء` },
        { id: 3, src: `${basePath}/subjects/${selectedOption}/general/3.jpg`, 
          title: `توزيع ${optionLabels[selectedOption]}`, 
          description: `خريطة توزيع ${optionLabels[selectedOption]} في المحافظة` },
        { id: 4, src: `${basePath}/subjects/${selectedOption}/general/4.jpg`, 
          title: `إحصائيات ${optionLabels[selectedOption]}`, 
          description: `بيانات وإحصائيات عن ${optionLabels[selectedOption]}` }
      ];
    } else {
      // Overview images
      return [
        { id: 1, src: `${basePath}/overview/1.jpg`, 
          title: "نظرة عامة على أصول المحافظة", 
          description: "خريطة شاملة لأصول محافظة الإسكندرية" },
        { id: 2, src: `${basePath}/overview/2.jpg`, 
          title: "توزيع الأصول", 
          description: "توزيع مختلف أنواع الأصول عبر الأحياء" }
      ];
    }
  }
};

const SlideContent = ({ 
  slide, 
  isDarkMode, 
  selectedOption, 
  optionColors, 
  optionLabels, 
  viewMode,
  selectedMarker,
  setSelectedMarker
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  if (!slide) return null;

  // Load image data when slide, selectedOption, viewMode, or selectedMarker changes
  useEffect(() => {
    if (selectedMarker && selectedMarker.images) {
      // Load marker-specific images
      const markerImages = selectedMarker.images.map((imgPath, index) => ({
        id: index + 1,
        src: `/images/${imgPath}`,
        title: selectedMarker.name,
        description: selectedMarker.description || "صورة للموقع المحدد"
      }));
      setImageData(markerImages);
      setShowGallery(true); // Auto-open gallery when marker is selected
    } else {
      // Load general images
      const images = getGeneralImageData(slide.id, selectedOption, viewMode);
      setImageData(images);
    }
    setImageLoadErrors({});
  }, [slide, selectedOption, viewMode, selectedMarker]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleNextImage = () => {
    const currentIndex = imageData.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % imageData.length;
    setSelectedImage(imageData[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = imageData.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + imageData.length) % imageData.length;
    setSelectedImage(imageData[prevIndex]);
  };

  const handleImageError = (imageId) => {
    setImageLoadErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const handleBackToDistrict = () => {
    setSelectedMarker(null);
    setShowGallery(true); // Keep gallery open but with district images
  };

  return (
    <div 
      dir="rtl"
      className={`flex-1 rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      } shadow-2xl overflow-y-auto`}
    >
      
      {/* Back to District Button (when a marker is selected) */}
      {selectedMarker && (
        <button
          onClick={handleBackToDistrict}
          className={`mb-6 w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-blue-700 dark:text-blue-300">
            العودة إلى عرض الحي الكامل
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {slide.title}
          </span>
        </button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          {/* Marker Indicator */}
          {selectedMarker && (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <MapPinned className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300">
                    {selectedMarker.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {selectedMarker.description}
                  </p>
                  <div className="mt-2 text-xs text-blue-500 dark:text-blue-500">
                    <span className="font-medium">القيمة الإيجارية:</span> {selectedMarker.value}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Mode Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              {viewMode === 'districts' ? (
                <>
                  <LayoutGrid className="w-3 h-3" />
                  <span>عرض حسب الأحياء</span>
                </>
              ) : (
                <>
                  <LayoutList className="w-3 h-3" />
                  <span>عرض حسب البيانات</span>
                </>
              )}
            </span>
            
            {/* Slide Number Badge */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold`}
              style={{ 
                backgroundColor: slide.color + '20',
                color: slide.color
              }}
            >
              <span className="flex items-center gap-2">
                {viewMode === 'districts' ? (
                  <>
                    <Building2 className="w-3 h-3" />
                    الحي {slide.id} من 10
                  </>
                ) : (
                  <>
                    {selectedOption === 'population' && <Users className="w-3 h-3" />}
                    {selectedOption === 'area' && <Store className="w-3 h-3" />}
                    {selectedOption === 'established' && <Calendar className="w-3 h-3" />}
                    {selectedOption === 'garden' && <Sprout className="w-3 h-3" />}
                    {selectedOption === 'another' && <MapPinned className="w-3 h-3" />}
                    {optionLabels[selectedOption] || 'البيانات'}
                  </>
                )}
              </span>
            </span>
          </div>

          {/* Slide Title */}
          <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedMarker ? selectedMarker.name : (viewMode === 'districts' ? slide.title : (optionLabels[selectedOption] || 'البيانات'))}
          </h2>
          <div className="w-24 h-1.5 rounded-full mb-4" style={{ 
            backgroundColor: selectedMarker ? optionColors[selectedOption] : (viewMode === 'districts' ? slide.color : (optionColors[selectedOption] || slide.color))
          }}></div>
        </div>

        {/* Color Indicator */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {selectedMarker ? 'لون الموقع' : (viewMode === 'districts' ? 'لون الحي' : 'لون البيانات')}
          </div>
          <div 
            className="w-12 h-12 rounded-xl shadow-lg"
            style={{ 
              backgroundColor: selectedMarker ? optionColors[selectedOption] : (viewMode === 'districts' ? slide.color : (optionColors[selectedOption] || slide.color))
            }}
          />
        </div>
      </div>

      {/* Gallery Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowGallery(!showGallery)}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
            showGallery 
              ? isDarkMode ? 'bg-gray-800/80' : 'bg-blue-50' 
              : isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${showGallery ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="font-semibold">عرض المعرض</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {showGallery ? 'إخفاء الصور' : `اظهر صور ${selectedMarker ? selectedMarker.name : (viewMode === 'districts' ? slide.title : optionLabels[selectedOption])}`}
              </div>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${showGallery ? 'rotate-180' : ''}`}>
            <ChevronLeft className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Gallery Section */}
      {showGallery && (
        <div className={`mb-8 p-5 rounded-xl transition-all duration-500 ${isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50/50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold text-lg flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <ImageIcon className="w-5 h-5" style={{ 
                color: selectedMarker ? optionColors[selectedOption] : (viewMode === 'districts' ? slide.color : (optionColors[selectedOption] || slide.color))
              }} />
              معرض الصور
              {selectedMarker && (
                <span className="text-sm font-normal text-blue-600 dark:text-blue-400">
                  (موقع محدد)
                </span>
              )}
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {imageData.length} صورة
            </div>
          </div>
          
          {imageData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {imageData.map((image) => (
                <div 
                  key={image.id}
                  className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  onClick={() => handleImageClick(image)}
                >
                  {/* Image Container */}
                  <div className="aspect-square w-full relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {!imageLoadErrors[image.id] ? (
                      <>
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={() => handleImageError(image.id)}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <ImageIcon className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-600 mb-2" />
                          <div className="text-xs text-gray-500 dark:text-gray-400">لا توجد صورة</div>
                        </div>
                      </div>
                    )}
                    
                    {/* View Icon */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-1.5 bg-black/50 rounded-full">
                        <Eye className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Title */}
                  <div className="mt-2">
                    <div className="text-xs font-medium truncate">{image.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{image.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-3">
                <ImageIcon className={`w-12 h-12 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                لا توجد صور متاحة
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                لا توجد صور متاحة لـ {selectedMarker ? selectedMarker.name : (viewMode === 'districts' ? slide.title : optionLabels[selectedOption])}
              </div>
            </div>
          )}
          
          {/* Gallery Footer */}
          {imageData.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                انقر على أي صورة لعرضها بالحجم الكامل
              </div>
            </div>
          )}
        </div>
      )}

      {/* Option Selection Indicator */}
      {selectedOption && !selectedMarker && (
        <div className="mb-8 p-5 rounded-2xl border-2 shadow-lg animate-pulse-subtle" style={{ 
          borderColor: (optionColors[selectedOption]) + '40',
          backgroundColor: (optionColors[selectedOption]) + '10',
          boxShadow: `0 4px 20px ${(optionColors[selectedOption])}20`
        }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl" style={{ 
                backgroundColor: (optionColors[selectedOption]) + '30'
              }}>
                {selectedOption === 'population' && <Users className="w-6 h-6" style={{ color: optionColors[selectedOption] }} />}
                {selectedOption === 'area' && <Store className="w-6 h-6" style={{ color: optionColors[selectedOption] }} />}
                {selectedOption === 'established' && <Calendar className="w-6 h-6" style={{ color: optionColors[selectedOption] }} />}
                {selectedOption === 'garden' && <Sprout className="w-6 h-6" style={{ color: optionColors[selectedOption] }} />}
                {selectedOption === 'another' && <MapPinned className="w-6 h-6" style={{ color: optionColors[selectedOption] }} />}
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: optionColors[selectedOption] }}>
                  {optionLabels[selectedOption]}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  البيانات المعروضة على الخريطة حالياً
                </p>
              </div>
            </div>
            <div className="text-3xl font-bold" style={{ color: optionColors[selectedOption] }}>
              {selectedOption === 'population' ? slide.stats.population :
               selectedOption === 'area' ? slide.stats.area :
               selectedOption === 'established' ? slide.stats.established :
               selectedOption === 'garden' ? slide.stats.garden : slide.stats.another}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>تم تحديث اللون على الخريطة</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: optionColors[selectedOption] }} />
              <span>لون المؤشرات</span>
            </div>
          </div>
        </div>
      )}

      {/* Slide Description */}
      {!selectedMarker && (
        <div className={`mb-8 p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
          <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {slide.description}
          </p>
        </div>
      )}

      {/* District Stats Section */}
      {!selectedMarker && (
        <div className={`mb-8 p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/40' : 'bg-gray-100/40'}`}>
          <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Target className="w-5 h-5" style={{ color: slide.color }} />
            إحصائيات الحي
          </h3>
          
          <div className="grid grid-cols-5 lg:grid-cols-3 gap-4 ">
            {[
              { id: 'population', icon: <Users className="w-5 h-5" />, label: "الإسكان", value: slide.stats.population, color: "#3B82F6" },
              { id: 'area', icon: <Store className="w-5 h-5" />, label: "الأسواق", value: slide.stats.area, color: "#EF4444" },
              { id: 'established', icon: <Calendar className="w-5 h-5" />, label: "دورات المياه", value: slide.stats.established, color: "#8B5CF6" },
              { id: 'garden', icon: <Sprout className="w-5 h-5" />, label: "الحدائق", value: slide.stats.garden, color:"#10B981" },
              { id: 'another', icon: <MapPinned className="w-5 h-5" />, label: "أصول اخري", value: slide.stats.another, color:"#F59E0B" },
            ].map((stat, index) => (
              <div 
                key={index}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800/60' : 'bg-white'
                } shadow-md ${selectedOption === stat.id ? 'ring-2 ring-offset-2' : ''}`}
                style={selectedOption === stat.id ? { 
                  ringColor: stat.color,
                  ringOffsetColor: isDarkMode ? '#1f2937' : '#ffffff'
                } : {}}
              >
                <div className="flex flex-col text-center  items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: stat.color + '20' }}>
                    <div style={{ color: stat.color }}>{stat.icon}</div>
                  </div>
                  <span className={`text-sm text-center font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </span>
                </div>
                <div className={`text-xl text-center font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value ? stat.value : "بيانات جاري حصرها"}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Section */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: slide.color + '10' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: slide.color }} />
                <span className="font-medium" style={{ color: slide.color }}>التقدم في المشاريع</span>
              </div>
              <span className="font-bold" style={{ color: slide.color }}>
                {slide.stats.projects} مشروع
              </span>
            </div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${Math.min(slide.stats.projects * 4, 100)}%`,
                  backgroundColor: slide.color 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Development Goals */}
      {!selectedMarker && (
        <div className="mb-8">
          <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Target className="w-5 h-5" style={{ color: slide.color }} />
            أهداف التنمية الرئيسية
          </h3>
          
          <div className="space-y-3">
            {[
              "تحسين وتطوير شبكة الطرق والنقل العام",
              "تطوير البنية التحتية للمياه والصرف الصحي",
              "زيادة المساحات الخضراء والحدائق العامة",
              "تطوير المرافق التعليمية والصحية",
              "تشجيع الاستثمار ودعم الأعمال المحلية",
              "تحسين جودة الحياة للمواطنين",
              "الحفاظ على التراث المعماري والتاريخي",
              "تعزيز الأمن والسلامة العامة"
            ].map((point, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-gray-800/50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}
                  style={{ 
                    backgroundColor: slide.color + '20',
                    color: slide.color
                  }}
                >
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <span className={`flex-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {!selectedMarker && (
        <div className={`mt-8 p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/40' : 'bg-blue-50/50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5" style={{ color: slide.color }} />
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              الجدول الزمني للتنفيذ
            </h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>نسبة الإنجاز</span>
              <span className="font-bold" style={{ color: slide.color }}>
                {Math.min(slide.id * 10, 100)}%
              </span>
            </div>
            
            <div className="relative">
              <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(slide.id * 10, 100)}%`,
                    backgroundColor: slide.color 
                  }}
                />
              </div>
              
              {/* Milestone dots */}
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2">
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div key={percent} className="relative">
                    <div 
                      className={`w-3 h-3 rounded-full ${Math.min(slide.id * 10, 100) >= percent ? '' : 'hidden'}`}
                      style={{ backgroundColor: slide.color }}
                    />
                    <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between text-xs mt-6">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                بداية المشروع: يناير 2023
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                نهاية المشروع: ديسمبر 2025
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Hint */}
      <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            💡
          </span>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedMarker 
                ? `أنت تشاهد صور الموقع "${selectedMarker.name}" - اضغط على "العودة إلى عرض الحي الكامل" للرجوع`
                : selectedOption 
                  ? `تم اختيار ${optionLabels[selectedOption]} - المؤشرات على الخريطة بلون ${optionLabels[selectedOption]}`
                  : "انقر على أي حي في القائمة الجانبية ثم اختر نوع البيانات لعرضها على الخريطة"
              }
            </p>
            {selectedMarker && (
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                انقر على أي علامة أخرى على الخريطة لعرض صورها
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Navigation Buttons */}
            {imageData.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              </>
            )}
            
            {/* Image Container */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              {!imageLoadErrors[selectedImage.id] ? (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(selectedImage.id)}
                />
              ) : (
                <div className="text-center p-8">
                  <ImageIcon className="w-20 h-20 mx-auto text-gray-600 mb-4" />
                  <div className="text-xl text-gray-400 mb-2">لا توجد صورة</div>
                  <div className="text-sm text-gray-500">لم يتم العثور على الصورة المطلوبة</div>
                </div>
              )}
            </div>
            
            {/* Image Info */}
            <div className="p-6 bg-gray-800">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedImage.title}</h3>
                  <p className="text-gray-400">{selectedImage.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {imageData.findIndex(img => img.id === selectedImage.id) + 1} / {imageData.length}
                </div>
              </div>
              
              {/* Image Context */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>المعرض:</span>
                  <span className="font-medium">
                    {selectedMarker ? selectedMarker.name : (viewMode === 'districts' ? slide.title : optionLabels[selectedOption])}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideContent;