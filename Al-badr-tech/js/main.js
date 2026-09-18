// ==========================================
// 1. بيانات المنتجات
// ==========================================

var productsData = {
  p1: {
    title: "ماك بوك اير M3",
    specs: "معالج M3 قوي، ذاكرة 8GB، مساحة 256GB SSD، شاشة Retina مقاس 13.6 بوصة.",
  },

  p2: {
    title: "ديل XPS 15",
    specs: "معالج Intel i7، ذاكرة 16GB، مساحة 512GB SSD، كرت شاشة RTX 4050.",
  },

  p3: {
    title: "لينوفو Legion 5",
    specs: "معالج Ryzen 7، ذاكرة 16GB، مساحة 512GB SSD، كرت شاشة RTX 4060 مخصص للألعاب.",
  },

  p4: {
    title: "HP Spectre x360",
    specs: "شاشة لمس 4K متحركة 360 درجة، معالج Intel i7، ذاكرة 16GB، مساحة 1TB SSD.",
  },

  p5: {
    title: "ماوس Logitech MX 3S",
    specs: "ماوس لاسلكي مريح جداً، ضغطات صامتة، بطارية تدوم حتى 70 يوماً، دقة 8000 DPI.",
  },

  p6: {
    title: "كيبورد ميكانيكي",
    specs: "إضاءة RGB متعددة، مفاتيح ميكانيكية استجابة سريعة، مخصص للألعاب والطباعة السريعة.",
  },

  p7: {
    title: "سماعة HyperX Cloud II",
    specs: "صوت محيطي 7.1، وسائد أذن مريحة للجلوس الطويل، ميكروفون مانع للضوضاء.",
  },

  p8: {
    title: "شاشة سامسونج 4K",
    specs: "شاشة 27 بوصة بدقة 4K UHD، معدل تحديث 60Hz، ألوان دقيقة جداً للمصممين.",
  },

  p9: {
    title: "آيفون 15 برومكس",
    specs: "شريحة A17 Pro، خامة تيتانيوم، كاميرا 48 ميجابكسل مع تقريب 5x، شاشة 120Hz.",
  },

  p10: {
    title: "سامسونج S24 ألترا",
    specs: "معالج Snapdragon 8 Gen 3، قلم S-Pen مدمج، ميزات الذكاء الاصطناعي Galaxy AI.",
  },

  p11: {
    title: "شاومي 14 ألترا",
    specs: "عدسات Leica احترافية، معالج Snapdragon 8 Gen 3، شحن سريع بقدرة 90W.",
  },

  p12: {
    title: "جوجل بكسل 8 برو",
    specs: "معالج Google Tensor G3، أفضل معالجة صور بالذكاء الاصطناعي، شاشة Super Actua.",
  },

  p13: {
    title: "AirPods Pro 2",
    specs: "عزل ضوضاء نشط مضاعف، صوت محيطي مخصص، علبة شحن مزودة برنان ومكبر صوت.",
  },

  p14: {
    title: "Galaxy Buds 2 Pro",
    specs: "صوت دقيق Hi-Fi 24-bit، عزل ضوضاء ذكي، مقاومة للماء معيار IPX7.",
  },

  p15: {
    title: "باور بنك Anker",
    specs: "سعة 20,000 مللي أمبير، منفذين شحن سريع USB-C، شاشة شحن شريحة ملونة.",
  },

  p16: {
    title: "شاحن MagSafe",
    specs: "شحن لاسلكي مغناطيسي سريع بقدرة 15W مخصص لأجهزة الآيفون والسماعات.",
  },
};

// ==========================================
// 2. عرض تفاصيل المنتج باستخدام Ajax + Modal
// ==========================================

$(document.body).on("click", ".view-details-btn", function () {
  // الحصول على رقم المنتج
  var productId = $(this).data("id");

  // تجهيز بيانات المنتجات بصيغة JSON
  var productsJson = JSON.stringify(productsData);

  // إنشاء مصدر بيانات محلي للـ Ajax
  var ajaxUrl = "data:application/json;charset=utf-8," + encodeURIComponent(productsJson);

  // تنفيذ Ajax
  $.ajax({
    url: ajaxUrl,

    method: "GET",

    dataType: "json",

    success: function (data) {
      // التأكد من وجود المنتج
      if (data[productId]) {
        // وضع اسم المنتج داخل Modal
        $("#modalProductTitle").text(data[productId].title);

        // وضع تفاصيل المنتج داخل Modal
        $("#modalProductSpecs").text(data[productId].specs);
      } else {
        // في حالة عدم وجود المنتج
        $("#modalProductTitle").text("تنبيه");

        $("#modalProductSpecs").text("عذراً، لم يتم العثور على تفاصيل هذا المنتج.");
      }

      // إنشاء Bootstrap Modal
      var detailsModal = new bootstrap.Modal(document.getElementById("productDetailsModal"));

      // عرض Modal
      detailsModal.show();
    },

    // في حالة حدوث خطأ في Ajax
    error: function () {
      $("#modalProductTitle").text("خطأ");

      $("#modalProductSpecs").text("حدث خطأ أثناء تحميل تفاصيل المنتج.");

      var detailsModal = new bootstrap.Modal(document.getElementById("productDetailsModal"));

      detailsModal.show();
    },
  });
});
