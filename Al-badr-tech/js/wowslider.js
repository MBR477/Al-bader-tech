// 1. جلب قائمة الصور (ul) لتمريرها أفقياً
const sliderContainer = document.querySelector("#wowslider-container1 .ws_images ul");

// 2.  جلب جميع الشرائح كامصفوفة (li) لمعرفة عددها ومواقعها
const slides = document.querySelectorAll("#wowslider-container1 .ws_images li");

// 3. عداد لتحديد رقم الشريحة الحالية المعروضة (يبدأ من أول صورة 0)
let currentSlide = 0;

// 4. مؤقت يعمل تلقائياً كل 3 ثوانٍ
setInterval(() => {
  // زيادة العداد بمقدار 1 والعودة للصورة الأولى تلقائياً عند انتهاء الشرائح
  currentSlide = (currentSlide + 1) % slides.length;

  // تحريك شريط الصور فقط لموضع الصورة الجديدة بنعومة دون التأثير على تمرير الصفحة
  sliderContainer.scrollTo({
    left: slides[currentSlide].offsetLeft, // الوصول لموقع الصورة أفقياً
    behavior: "smooth", // جعل الانتقال ناعماً وليس مفاجئاً
  });
}, 3000);
