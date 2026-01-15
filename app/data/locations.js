/* ================= BASE COLORS ================= */
export const baseColors = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#6366F1", // Indigo
];

/* ================= LOCATIONS DATA ================= */
export const locations = [
  {
    id: 1,
    name: "حي شرق",
    center: { lat: 31.2075, lng: 29.9436 },
    color: baseColors[2],
    description: "منطقة تجارية وسكنية حديثة بها مراكز تسوق ومطاعم",
    population: "٢٨٠,٠٠٠",
    area: "٨.٢ كم²",
    established: "١٩٢٥",
    projects: 18,
    garden: "٢٥٠ مليون جنيه",
    another: "٢0٠ مليون جنيه",
    // Option-specific markers with images
    optionMarkers: {
      population: [
        { 
          lat: 31.2040, 
          lng: 29.9390, 
          name: "مركز تسجيل السكان", 
          description: "المكتب الرئيسي لتسجيل السكان", 
          value: "٥٠,٠٠٠ نسمة",
          images: [
            "districts/1/population/markers/1/1.jpg",
            "districts/1/population/markers/1/2.jpg"
          ]
        },
        { 
          lat: 31.2090, 
          lng: 29.9450, 
          name: "مستشفى سموحة", 
          description: "المستشفى الرئيسي للمنطقة", 
          value: "١٠٠,٠٠٠ مريض/سنوياً",
          images: [
            "districts/1/population/markers/2/1.jpg",
            "districts/1/population/markers/2/2.jpg"
          ]
        },
        { 
          lat: 31.2060, 
          lng: 29.9410, 
          name: "مدرسة سموحة الثانوية", 
          description: "أكبر مدرسة في المنطقة", 
          value: "٣,٠٠٠ طالب",
          images: [
            "districts/1/population/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.2110, 
          lng: 29.9480, 
          name: "حي الشيخ زايد السكني", 
          description: "مجمع سكني حديث", 
          value: "١٠,٠٠٠ نسمة",
          images: [
            "districts/1/population/markers/4/1.jpg",
            "districts/1/population/markers/4/2.jpg"
          ]
        },
      ],
      area: [
        { 
          lat: 31.2050, 
          lng: 29.9430, 
          name: "حديقة الأندلس", 
          description: "أكبر حديقة عامة في الحي", 
          value: "٥٠,٠٠٠ م²",
          images: [
            "districts/1/area/markers/1/1.jpg",
            "districts/1/area/markers/1/2.jpg"
          ]
        },
        { 
          lat: 31.2080, 
          lng: 29.9400, 
          name: "سوق سموحة المركزي", 
          description: "السوق التجاري الرئيسي", 
          value: "١٥,٠٠٠ م²",
          images: [
            "districts/1/area/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.2070, 
          lng: 29.9490, 
          name: "ملعب سموحة الرياضي", 
          description: "الملعب الرئيسي", 
          value: "٢٠,٠٠٠ م²",
          images: [
            "districts/1/area/markers/3/1.jpg",
            "districts/1/area/markers/3/2.jpg"
          ]
        },
        { 
          lat: 31.2100, 
          lng: 29.9460, 
          name: "منطقة الصناعات الخفيفة", 
          description: "المنطقة الصناعية", 
          value: "١٠٠,٠٠٠ م²",
          images: [
            "districts/1/area/markers/4/1.jpg"
          ]
        },
      ],
      established: [
        { 
          lat: 31.2095, 
          lng: 29.9445, 
          name: "قاعة سموحة البلدية", 
          description: "أقدم مبنى حكومي في الحي", 
          value: "مبني عام ١٩٢٥",
          images: [
            "districts/1/established/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.2065, 
          lng: 29.9415, 
          name: "مسجد سموحة القديم", 
          description: "أقدم مسجد في المنطقة", 
          value: "مبني عام ١٩٣٠",
          images: [
            "districts/1/established/markers/2/1.jpg",
            "districts/1/established/markers/2/2.jpg"
          ]
        },
        { 
          lat: 31.2045, 
          lng: 29.9395, 
          name: "سوق الخضار التاريخي", 
          description: "السوق التقليدي", 
          value: "مبني عام ١٩٤٠",
          images: [
            "districts/1/established/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.2115, 
          lng: 29.9485, 
          name: "قصر سموحة", 
          description: "قصر تاريخي", 
          value: "مبني عام ١٩١٠",
          images: [
            "districts/1/established/markers/4/1.jpg",
            "districts/1/established/markers/4/2.jpg"
          ]
        },
      ],
      garden: [
        { 
          lat: 31.2075, 
          lng: 29.9435, 
          name: "مشروع تطوير الطرق", 
          description: "تحسين شبكة الطرق", 
          value: "٥٠ مليون جنيه",
          images: [
            "districts/1/garden/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.2085, 
          lng: 29.9405, 
          name: "مشروع الصرف الصحي", 
          description: "تحديث شبكة الصرف", 
          value: "٣٠ مليون جنيه",
          images: [
            "districts/1/garden/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.2065, 
          lng: 29.9495, 
          name: "مشروع الإسكان الاجتماعي", 
          description: "بناء وحدات سكنية", 
          value: "١٠٠ مليون جنيه",
          images: [
            "districts/1/garden/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.2095, 
          lng: 29.9465, 
          name: "مشروع الحدائق العامة", 
          description: "تطوير المساحات الخضراء", 
          value: "٢٠ مليون جنيه",
          images: [
            "districts/1/garden/markers/4/1.jpg"
          ]
        },
      ],
      another: [
        { 
          lat: 31.2095, 
          lng: 29.11, 
          name: "قاعة سموحة البلدية", 
          description: "أقدم مبنى حكومي في الحي", 
          value: "مبني عام ١٩٢٥",
          images: [
            "districts/1/another/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.2065, 
          lng: 29.11, 
          name: "مسجد سموحة القديم", 
          description: "أقدم مسجد في المنطقة", 
          value: "مبني عام ١٩٣٠",
          images: [
            "districts/1/another/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.2045, 
          lng: 29.11, 
          name: "سوق الخضار التاريخي", 
          description: "السوق التقليدي", 
          value: "مبني عام ١٩٤٠",
          images: [
            "districts/1/another/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.2115, 
          lng: 29.11, 
          name: "قصر سموحة", 
          description: "قصر تاريخي", 
          value: "مبني عام ١٩١٠",
          images: [
            "districts/1/another/markers/4/1.jpg"
          ]
        },
      ]
    }
  },
  {
    id: 2,
    name: "حي وسط",
    center: { lat: 31.20472, lng: 29.919 },
    color: baseColors[0],
    description: "قلب الإسكندرية ويضم المباني التاريخية والمراكز التجارية",
    population: "عدد 8 (بإجمالي 5961 وحدة - 110 بلوك)",
    area: "عدد 3 أسواق",
    established: "عدد 33  دورة مياه عمومية",
    projects:  "48 نقطة",
    garden: "عدد 38 مساحة خضراء ",
    another: "عدد 4 مبانى أوأصول أخرى",
    optionMarkers: {
      population: [
        { 
          lat: 31.194228, 
          lng: 29.929279, 
          name: "طوسون بمحرم بك", 
          description: "32 بلوك / 1929 وحدة", 
          value: "8.56-21.630",
          images: [
            "districts/2/population/markers/1/1.jpg",
            "districts/2/population/markers/1/2.jpg"
          ]
        },
        { 
          lat: 31.194283, 
          lng: 29.925034, 
          name: "الجمهورية الجديدة", 
          description:  "27 بلوك / 1768 وحدة", 
          value: "4.87-36.44",
          images: [
            "districts/2/population/markers/2/1.jpg",
            "districts/2/population/markers/2/2.jpg"
          ]
        },
        { 
          lat: 31.19632, 
          lng: 29.921374, 
          name: "الجمهورية القديمة", 
          description:  "11 بلوك / 272 وحدة", 
          value: "2.34-42.14",
          images: [
            "districts/2/population/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.195236, 
          lng: 29.927557, 
          name: "امبروزو", 
          description:  "10 بلوك / 500 وحدة", 
          value: "---",
          images: [
            "districts/2/population/markers/4/1.jpg"
          ]
        },
        { 
          lat: 31.196915, 
          lng: 29.920251, 
          name: "ضرغام", 
          description:  "9 بلوك / 50 وحدة", 
          value: "8.050-9.390",
          images: [
            "districts/2/population/markers/5/1.jpg"
          ]
        },
        { 
          lat: 31.188784, 
          lng: 29.91256, 
          name: "العرضي", 
          description:  "3 بلوك / 176 وحدة", 
          value: "4.98",
          images: [
            "districts/2/population/markers/6/1.jpg"
          ]
        },
        { 
          lat: 31.20472, 
          lng: 29.91219, 
          name: "سوتير", 
          description:  "5 بلوك / 240 وحدة", 
          value: "---",
          images: [
            "districts/2/population/markers/7/1.jpg"
          ]
        },
        { 
          lat: 31.205524, 
          lng: 29.930285, 
          name: "الحضرة البحرية", 
          description:  "13 بلوك / 626 وحدة", 
          value: "2.950",
          images: [
            "districts/2/population/markers/8/1.jpg",
            "districts/2/population/markers/8/2.jpg"
          ]
        },
      ],
      area: [
        { 
          lat: 31.21293, 
          lng: 29.92474, 
          name: "سوق شيديا", 
          description: "9600 متر مربع", 
          value: "60 محل",
          images: [
            "districts/2/area/markers/1/1.jpg",
            "districts/2/area/markers/1/2.jpg"
          ]
        },
        { 
          lat: 31.19091, 
          lng: 29.92454, 
          name: "سوق الغيط الصعيدى", 
          description: "6500 متر مربع", 
          value: "78 محل",
          images: [
            "districts/2/area/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.1912, 
          lng: 29.90429, 
          name: "سوق الشهداء بمحطة مصر", 
          description: "7000 متر مربع", 
          value: "101 محل",
          images: [
            "districts/2/area/markers/3/1.jpg",
            "districts/2/area/markers/3/2.jpg"
          ]
        },
      ],
      established: [
        { 
          lat: 31.212, 
          lng: 29.9153, 
          name: "الشاطبي (شاطئ الشاطبي)", 
          description: "دورة مياه عمومية (الشاطبي)", 
          value: "السياحة والمصايف",
          images: [
            "districts/2/established/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.219, 
          lng: 29.927, 
          name: "الابراهيميه (شاطئ الابراهيميه)", 
          description: "دورة مياه عمومية (الابراهيميه)", 
          value: "السياحة والمصايف",
          images: [
            "districts/2/established/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.216, 
          lng: 29.922, 
          name: "كامب شيزار (شاطئ كامب شيزار)", 
          description: "", 
          value: "السياحة والمصايف",
          images: [
            "districts/2/established/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.201, 
          lng: 29.901, 
          name: "محطة الرمل (ميدان محطة الرمل)", 
          description: "دورة مياه عمومية (محطة الرمل)", 
          value: "مغلقة لحين إعادة الطرح",
          images: [
            "districts/2/established/markers/4/1.jpg"
          ]
        },
        { 
          lat: 31.1997, 
          lng: 29.927, 
          name: "الإيطالي", 
          description: "دورة مياه عمومية (جلال الدسوقي)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/5/1.jpg",
            "districts/2/established/markers/5/2.jpg",
            "districts/2/established/markers/5/3.jpg",
            
          ]
        },
        { 
          lat: 31.198, 
          lng: 29.931, 
          name: "الحضرة القبلية", 
          description: "دورة مياه عمومية (الحضرة القبلية)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/6/1.jpg"
          ]
        },
        { 
          lat: 31.194, 
          lng: 29.926, 
          name: "الحميات", 
          description: "دورة مياه عمومية (ش عبد الناصر)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/7/1.jpg",
            "districts/2/established/markers/7/2.jpg"
          ]
        },
        { 
          lat: 31.192, 
          lng: 29.93, 
          name: "طوسون", 
          description: "دورة مياه عمومية (مساكن طوسون)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/8/1.jpg"
          ]
        },
        { 
          lat: 31.188, 
          lng: 29.914, 
          name: "عرفان", 
          description: "دورة مياه عمومية (ش عرفان)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/9/1.jpg"
          ]
        },
        { 
          lat: 31.189, 
          lng: 29.912, 
          name: "المحكمة", 
          description: "دورة مياه عمومية (مساكن العرضي)", 
          value: "متعدي عليها",
          images: [
            "districts/2/established/markers/10/1.jpg"
          ]
        },
        { 
          lat: 31.188, 
          lng: 29.906, 
          name: "ابيدوس", 
          description: "دورة مياه عمومية ش شجرة الدر", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/11/1.jpg"
          ]
        },
        { 
          lat: 31.189, 
          lng: 29.906, 
          name: "كليه العلوم", 
          description: "دورة مياه عمومية (كليه العلوم)", 
          value: "مغلقة وصادر لها قرار هدم",
          images: [
            "districts/2/established/markers/12/1.jpg"
          ]
        },
        { 
          lat: 31.187, 
          lng: 29.912, 
          name: "(سوق عرفان)", 
          description: "دورة مياه عمومية (سوق عرفان)", 
          value: "متعدي عليها",
          images: [
            "districts/2/established/markers/13/1.jpg"
          ]
        },
        { 
          lat: 31.191, 
          lng: 29.904, 
          name: "الشهداء", 
          description: "دورة مياه عمومية (الشهداء)", 
          value: "تعمل وتحتاج الي صيانة",
          images: [
            "districts/2/established/markers/14/1.jpg",
            "districts/2/established/markers/14/2.jpg",
          ]
        },
        { 
          lat: 31.189, 
          lng: 29.902, 
          name: "المرغنى", 
          description: "دورة مياه عمومية (المرغنى)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/15/1.jpg"
          ]
        },
        { 
          lat: 31.197, 
          lng: 29.899, 
          name: "سيزوستريس", 
          description: "دورة مياه عمومية (سيزوستريس)", 
          value: "مغلقة لحين تنفيذ قرار الترميم",
          images: [
            "districts/2/established/markers/16/1.jpg",
            "districts/2/established/markers/16/2.jpg",
          ]
        },
        { 
          lat: 31.191, 
          lng: 29.92, 
          name: "الرصافة", 
          description: "دورة مياه عمومية (الرصافة)", 
          value: "مغلقة لحين تنفيذ قرار الهدم",
          images: [
            "districts/2/established/markers/17/1.jpg"
          ]
        },
        { 
          lat: 31.1995, 
          lng: 29.903, 
          name: "جاليس", 
          description: "دورة مياه عمومية (جاليس)", 
          value: "تعمل وتحتاج الي صيانة",
          images: [
            "districts/2/established/markers/18/1.jpg"
          ]
        },
        { 
          lat: 31.208, 
          lng: 29.93, 
          name: "جواد حسنى", 
          description: "دورة مياه عمومية (جواد حسنى)", 
          value: "متعدي عليها وحالياً زاوية صلاة",
          images: [
            "districts/2/established/markers/19/1.jpg"
          ]
        },
        { 
          lat: 31.213, 
          lng: 29.924, 
          name: "شيديا", 
          description: "دورة مياه عمومية (شيديا)", 
          value: "يعمل الرجالي والحريمى مغلق",
          images: [
            "districts/2/established/markers/20/1.jpg"
          ]
        },
        { 
          lat: 31.213, 
          lng: 29.924, 
          name: "سوق شيديا", 
          description: "دورة مياه عمومية (سوق شيديا)", 
          value: "تعمل وتحتاج الي صيانة",
          images: [
            "districts/2/established/markers/21/1.jpg",
            "districts/2/established/markers/21/2.jpg",
            "districts/2/established/markers/21/3.jpg",
          ]
        },
        { 
          lat: 31.205, 
          lng: 29.929, 
          name: "الحضرة البحرية", 
          description: "دورة مياه عمومية (الحضرة البحرية)", 
          value: "تعمل وتحتاج الي صيانة",
          images: [
            "districts/2/established/markers/22/1.jpg"
          ]
        },
        { 
          lat: 31.204, 
          lng: 29.913, 
          name: "الشلالات", 
          description: "دورة مياه عمومية (الشلالات)", 
          value: "مغلقة ولها قرار هدم",
          images: [
            "districts/2/established/markers/23/1.jpg"
          ]
        },
        { 
          lat: 31.1994, 
          lng: 29.899, 
          name: "كوتاريللي", 
          description: "دورة مياه عمومية (كوتاريللي)", 
          value: "مغلقة وآيلة للسقوط ومتعدي عليها",
          images: [
            "districts/2/established/markers/24/1.jpg",
            "districts/2/established/markers/24/2.jpg",
          ]
        },
        { 
          lat: 31.197, 
          lng: 29.909, 
          name: "سليمان يسرى", 
          description: "دورة مياه عمومية (سليمان يسرى)", 
          value: "تم هدمها وضمت لمرفق المياه",
          images: [
            "districts/2/established/markers/25/1.jpg"
          ]
        },
        { 
          lat: 31.198, 
          lng: 29.907, 
          name: "المتحف", 
          description: "دورة مياه عمومية (المتحف)", 
          value: "تم هدمها وضمت للمنطقة الاثرية",
          images: [
            "districts/2/established/markers/26/1.jpg"
          ]
        },
        { 
          lat: 31.195, 
          lng: 29.923, 
          name: "ضرغام", 
          description: "دورة مياه عمومية (ضرغام)", 
          value: "تم هدمها وضمت لمستشفي الحميات",
          images: [
            "districts/2/established/markers/27/1.jpg"
          ]
        },
        { 
          lat: 31.191, 
          lng: 29.902, 
          name: "الشهداء 1", 
          description: "دورة مياه عمومية (الشهداء 1)", 
          value: "تم هدمها ضمن اعمال التطوير",
          images: [
            "districts/2/established/markers/28/1.jpg"
          ]
        },
        { 
          lat: 31.191, 
          lng: 29.902, 
          name: "الشهداء 2", 
          description: "دورة مياه عمومية (الشهداء 2)", 
          value: "تم هدمها ضمن اعمال التطوير",
          images: [
            "districts/2/established/markers/29/1.jpg"
          ]
        },
        { 
          lat: 31.188, 
          lng: 29.903, 
          name: "الحضرى", 
          description: "دورة مياه عمومية (الحضرى)", 
          value: "تم هدمها بقرار هدم",
          images: [
            "districts/2/established/markers/30/1.jpg"
          ]
        },
        { 
          lat: 31.198, 
          lng: 29.93, 
          name: "عبد المقصود", 
          description: "دورة مياه عمومية (عبد المقصود)", 
          value: "تم ضمها للمسجد",
          images: [
            "districts/2/established/markers/31/1.jpg"
          ]
        },
        { 
          lat: 31.195, 
          lng: 29.914, 
          name: "منشا", 
          description: "دورة مياه عمومية (منشا)", 
          value: "تم بناء مسجد مكانها",
          images: [
            "districts/2/established/markers/32/1.jpg"
          ]
        },
        { 
          lat: 31.207, 
          lng: 29.906, 
          name: "كوته", 
          description: "دورة مياه عمومية (كوته)", 
          value: "تم التسليم للقوات المسلحة",
          images: [
            "districts/2/established/markers/33/1.jpg"
          ]
        },
      ],
      garden: [
        { 
          lat: 31.20258656360886, 
          lng: 29.91860757641708, 
          name: "نبوية موسي", 
          description: "مساحة 18 قيراط", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.203952028011216, 
          lng: 29.922123791885856, 
          name: "الكومنولث الانجليزية", 
          description: "مساحة 2 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.20454990077081, 
          lng: 29.92384407743751, 
          name: "جبل المنارة", 
          description: "مساحة 2 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.20523167840724, 
          lng: 29.925512317379837, 
          name: "جمال عبد الناصر", 
          description: "مساحة 1 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/4/1.jpg",
            "districts/2/garden/markers/4/2.jpg",
            "districts/2/garden/markers/4/3.jpg",
            "districts/2/garden/markers/4/4.jpg",
            "districts/2/garden/markers/4/5.jpg",
            "districts/2/garden/markers/4/6.jpg",
            "districts/2/garden/markers/4/7.jpg",
            "districts/2/garden/markers/4/8.jpg",
          ]
        },
        { 
          lat: 31.205753655887694, 
          lng: 29.926716840156885, 
          name: "معهد البحوث", 
          description: "مساحة 1 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/5/1.jpg"
          ]
        },
        { 
          lat: 31.209017135468653, 
          lng: 29.924550131918938, 
          name: "حديقتي احمد قمحه", 
          description: "مساحة 1.18 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/6/1.jpg"
          ]
        },
        { 
           lat: 31.209017135468653, 
          lng: 29.924550131918938, 
          name: "حديقتي احمد قمحه", 
          description: "مساحة 1.18 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/7/1.jpg"
          ]
        },
        { 
         lat: 31.20184541104976, 
          lng: 29.915999550240112, 
          name: "الجزر الوسطي بطريق الحرية", 
          description: "-----", 
          value: "",
          images: [
            "districts/2/garden/markers/8/1.jpg"
          ]
        },
        { 
        lat: 31.20818026543833, 
          lng: 29.931211073481723, 
          name: "الجزر الوسطي بشارع جواد حسني", 
          description: "-----", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/9/1.jpg"
          ]
        },
        { 
                lat: 31.201414249574373, 
          lng: 29.915091745687626, 
          name: "  حوض ساعة الزهور ", 
          description: "مساحة 2750 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/10/1.jpg"
          ]
        },
        { 
          lat: 31.200141181319214, 
          lng: 29.918764102832007, 
          name: " ميدان زويل ", 
          description: "مساحة 2137 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/11/1.jpg"
          ]
        },
        { 
          lat: 31.200280881429595, 
          lng: 29.914573294512564, 
          name: "جزيرة لومومبا  ", 
          description: "مساحة 2370 متر مربع",
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/12/1.jpg"
          ]
        },
        { 
          lat: 31.198635748884843, 
          lng: 29.914046524065483, 
          name: " حديقة السفارة الكويتيه  ", 
          description: "مساحة 1760 متر مربع", 
          value: "مستولي عليها",
          images: [
            "districts/2/garden/markers/13/1.jpg",
            "districts/2/garden/markers/13/2.jpg"
          ]
        },
        { 
          lat: 31.19811556284001, 
          lng: 29.913607962599116, 
          name: " الكازولي ", 
          description: "مساحة 2407 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/14/1.jpg"
          ]
        },
        { 
          lat: 31.199410806602284, 
          lng: 29.925813040138134, 
          name: " الإيطالي ", 
          description: "مساحة 899 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/15/1.jpg"
          ]
        },
        { 
          lat: 31.20075376113937, 
          lng: 29.91523468294919, 
          name: "الشلالات القبلية  ", 
          description: "مساحة 32600 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/16/1.jpg"
          ]
        },
        { 
          lat: 31.20231927768362, 
          lng: 29.91413965890407, 
          name: "الشلالات البحرية  ", 
          description: "مساحة 17 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/17/1.jpg"
          ]
        },
        { 
          lat: 31.201393, 
          lng: 29.907725, 
          name: " ميدان الخرطوم  ", 
          description: "مساحة 3/4 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/18/1.jpg"
          ]
        },
        { 
          lat: 31.202205, 
          lng: 29.909595, 
          name: " حديقه كرومر  ", 
          description: "مساحة ربع فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/19/1.jpg"
          ]
        },
        { 
          lat: 31.20231927768362, 
          lng: 29.91413965890407, 
          name: " حديقه  الاطفال  ", 
          description: "مساحة 3 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/20/1.jpg"
          ]
        },
        { 
          lat: 31.198182, 
          lng: 29.916209, 
          name: " مثلث الرمد  ", 
          description: "مساحة 475 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/21/1.jpg"
          ]
        },
        { 
          lat: 31.194896, 
          lng: 29.924182, 
          name: " مساكن طوسون  ", 
          description: "مساحة 500 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/22/1.jpg"
          ]
        },
        { 
          lat: 31.19644, 
          lng: 29.911212, 
          name: " الاسعاف ", 
          description: "مساحة 1.5 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/23/1.jpg",
            "districts/2/garden/markers/23/2.jpg",
            "districts/2/garden/markers/23/3.jpg",
            "districts/2/garden/markers/23/4.jpg",
            "districts/2/garden/markers/23/5.jpg",
            "districts/2/garden/markers/23/6.jpg",
            "districts/2/garden/markers/23/7.jpg",
            "districts/2/garden/markers/23/8.jpg",
          ]
          },

        { 
          lat: 31.195127, 
          lng: 29.90633, 
          name: "جزر المطافى   ", 
          description: "مساحة 100 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/24/1.jpg"
          ]
        },
        { 
          lat: 31.195841, 
          lng: 29.915854, 
          name: " حديقه شارع منشا  ", 
          description: "مساحة 60 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/25/1.jpg"
          ]
        },
        { 
          lat: 31.20416, 
          lng: 29.903701, 
          name: " حديقه االشهداء ", 
          description: "مساحة 400 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/26/1.jpg"
          ]
        },
        { 
          lat: 31.20416, 
          lng: 29.914478, 
          name: " قنال السويس  ", 
          description: "مساحة 100 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/27/1.jpg"
          ]
        },
        { 
          lat: 31.195386, 
          lng: 29.920104, 
          name: "الجبل الجانبى الأيمن اتجاه محمد فريد  ", 
          description: "مساحة 5000 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/28/1.jpg"
          ]
        },
        { 
          lat: 31.195705, 
          lng: 29.9205, 
         name: " الجبل الجانب الأيسر ش مساكن طوسون  ",  
          description: "مساحة 5000 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/29/1.jpg"
          ]
        },
        { 
          lat: 31.201751, 
          lng: 29.916822, 
          name: " حديقه المركزيه بطريق الحريه  ",  
          description: "مساحة 3235 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/30/1.jpg"
          ]
        },
        { 
          lat: 31.203517, 
          lng: 29.907171, 
          name: " حديقه الحى وسط  ", 
          description: "مساحة 3500 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/31/1.jpg"
          ]
        },
        { 
          lat: 31.196276, 
          lng: 29.904102, 
             name: " حديقه صفيه زغلول  ",  
          description: "مساحة 100 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/32/1.jpg"
          ]
        },
        { 
          lat: 31.200893, 
          lng: 29.899364, 
          name: " حديقه سعد زغلول  ", 
          description: "مساحة 5000 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/33/1.jpg"
          ]
        },
        { 
          lat: 31.203046, 
          lng: 29.903517, 
          name: "  حديقه جامع القائد ابراهيم ", 
          description: "مساحة 1000 متر مربع", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/34/1.jpg"
          ]
        },
        { 
          lat: 31.209941, 
          lng: 29.908168, 
          name: " حديقه السلسله  ", 
          description: "مساحة 1 فدان", 
          value: "مغلقة",
          images: [
            "districts/2/garden/markers/35/1.jpg"
          ]
        },
        { 
          lat: 31.209869, 
          lng: 29.918781, 
          name: " الجزر الكورنيش الوسطى طريق الكورنيش  ", 
          description: "مساحة 1.5 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/36/1.jpg"
          ]
        },
        { 
          lat: 31.213681, 
          lng: 29.918781, 
          name: " الجزر الوسطى الكورنيش  ", 
          description: "مساحة 1.25 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/37/1.jpg"
          ]
        },
        { 
          lat: 31.220347, 
          lng: 29.930021, 
          name: " جزر سبورتنج  ", 
          description: "مساحة 0.25 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/38/1.jpg"
          ]
        },
        
        { 
          lat: 31.211728, 
          lng: 29.916747, 
          name: " حديقة بيرم التونسى  ", 
          description: "مساحة 1.25 فدان", 
          value: "مفتوحة",
          images: [
            "districts/2/garden/markers/39/1.jpg"
          ]
        },
      ],
      another: [
        { 
          lat: 31.192080, 
          lng: 29.941790, 
          name: "أرض فضاء", 
          description: "طريق المطار – بجوار مستشفى طلعت مصطفى", 
          value: "10680 متر",
          images: [
            "districts/2/another/markers/1/1.jpg"
          ]
        },
        { 
          lat: 31.187410, 
          lng: 29.936259, 
          name: "أرض فضاء", 
          description: "جزء من ارض البطاطين بجوار دار الحنان", 
          value: "32440.3 متر",
          images: [
            "districts/2/another/markers/2/1.jpg"
          ]
        },
        { 
          lat: 31.185967, 
          lng: 29.927916, 
          name: "أرض محاطة بسور عنابر", 
          description: "الدريسة – خلف محطة قطار محرم بك", 
          value: "3232 متر",
          images: [
            "districts/2/another/markers/3/1.jpg"
          ]
        },
        { 
          lat: 31.1985, 
          lng: 29.927916, 
          name: "مصنع أطلس", 
          description: "محرم بك – خلف محطة شرب المنشية الجديدة", 
          value: "3154.456 متر",
          images: [
            "districts/2/another/markers/4/1.jpg"
          ]
        },
      ]
    }
  },
  // Add other districts here with the same structure...
  // For now, I'll add empty templates for districts 3-10
  // You can fill them with your actual data
  {
    id: 3,
    name: "حي غرب",
    center: { lat: 31.2250, lng: 29.9417 },
    color: baseColors[4],
    description: "منطقة ساحلية راقية بشواطئ وفنادق فاخرة",
    population: "٤١٠,٠٠٠",
    area: "١٤.٣ كم²",
    established: "١٨٩٠",
    projects: 21,
    garden: "٤٠٠ مليون جنيه",
    another: "٤٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 4,
    name: "حي أول المنتزه",
    center: { lat: 31.2892, lng: 30.0089 },
    color: baseColors[1],
    description: "الحدائق الملكية والقصور والمناطق السكنية الراقية",
    population: "٣٢٠,٠٠٠",
    area: "١٨.٧ كم²",
    established: "١٩٠٠",
    projects: 15,
    garden: "٣٠٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 5,
    name: "حي ثان المنتزة",
    center: { lat: 31.2556, lng: 29.9964 },
    color: baseColors[8],
    description: "منطقة سكنية راقية بمناظر بانورامية للبحر",
    population: "٣٧٠,٠٠٠",
    area: "١٠.٤ كم²",
    established: "١٩٦٠",
    projects: 22,
    garden: "٣٥٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 6,
    name: "حي العامرية أول",
    center: { lat: 31.2422, lng: 29.9606 },
    color: baseColors[5],
    description: "منطقة سكنية وتعليمية هامة تضم جامعة الإسكندرية",
    population: "٥٥٠,٠٠٠",
    area: "١٦.٨ كم²",
    established: "١٩٣٠",
    projects: 26,
    garden: "٤٥٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 7,
    name: "حي العامرية ثان",
    center: { lat: 31.2750, lng: 29.9700 },
    color: baseColors[6],
    description: "منطقة صناعية وسكنية مختلطة",
    population: "٢٣٠,٠٠٠",
    area: "١١.٢ كم²",
    established: "١٩٥٠",
    projects: 19,
    garden: "٢٢٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 8,
    name: "برج العرب",
    center: { lat: 31.2639, lng: 29.9839 },
    color: baseColors[7],
    description: "منطقة سكنية حديثة بها مساحات خضراء",
    population: "١٨٠,٠٠٠",
    area: "٧.٩ كم²",
    established: "١٩٧٠",
    projects: 14,
    garden: "١٨٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 9,
    name: "حي الجمرك",
    center: { lat: 31.1936, lng: 29.8825 },
    color: baseColors[3],
    description: "الميناء الرئيسي ومنطقة تجارية تاريخية",
    population: "١٩٠,٠٠٠",
    area: "٦.٥ كم²",
    established: "١٨٣٠",
    projects: 12,
    garden: "٢٠٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
  {
    id: 10,
    name: "حي العجمي",
    center: { lat: 31.1806, lng: 29.8578 },
    color: baseColors[9],
    description: "منطقة صناعية وتموينات رئيسية للمدينة",
    population: "٢٢٠,٠٠٠",
    area: "٤٥.٦ كم²",
    established: "١٩٤٠",
    projects: 31,
    garden: "٥٥٠ مليون جنيه",
    another: "٣٠ مليون جنيه",
    optionMarkers: {
      population: [],
      area: [],
      established: [],
      garden: [],
      another: []
    }
  },
];