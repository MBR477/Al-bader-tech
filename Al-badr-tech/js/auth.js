$(document).ready(function () {
  // دالة فحص صحة البريد الإلكتروني
  function isValidEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  // كود تحكم موحد للثلاثة النماذج (تسجيل الدخول، إنشاء حساب، تواصل معنا)
  $("form").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var isValid = true;

    // 1. المكتوبة لدية HTML فحص جميع الحقول العادية بالاعتماد على خصائص (required, minlength, type)
    form.find("input, textarea").each(function () {
      var input = $(this);
      var val = input.val().trim();
      var minlen = input.attr("minlength") || 1;
      var isInputValid = true;

      // إذا كان الحقل مطلوب أو فارغ أو أقل من الحد الأدنى للحروف
      if (input.prop("required") && (val === "" || val.length < minlen)) {
        isInputValid = false;
      }

      // إذا كان نوع الحقل بريد إلكتروني
      if (input.attr("type") === "email" && val !== "" && !isValidEmail(val)) {
        isInputValid = false;
      }

      // تطبيق التنبيهين (أحمر للمخطئ / أخضر للمصحيح)
      if (!isInputValid) {
        input.addClass("is-invalid").removeClass("is-valid");
        isValid = false;
      } else {
        input.addClass("is-valid").removeClass("is-invalid");
      }
    });

    // 2. تحقق خاص بتطابق كلمة المرور في صفحة إنشاء الحساب
    var pass = $("#regPassword");
    var confirmPass = $("#regConfirmPassword");

    if (pass.length && confirmPass.length) {
      if (confirmPass.val().trim() === "" || confirmPass.val().trim() !== pass.val().trim()) {
        confirmPass.addClass("is-invalid").removeClass("is-valid");
        isValid = false;
      } else if (confirmPass.val().trim() !== "") {
        confirmPass.addClass("is-valid").removeClass("is-invalid");
      }
    }

    // 3. إظهار إشعار Toastr وتفريغ الحقول في حال كانت كل البيانات صحيحة
    if (isValid) {
      // إعدادات إشعار Toastr (بدون شريط زمني - أسفل اليسار - 3 ثوانٍ)
      toastr.options = {
        closeButton: true,
        progressBar: false, // إلغاء الشريط الزمني المتحرك
        positionClass: "toast-bottom-left",
        timeOut: "3000", // الاختفاء بعد 3 ثوانٍ
        rtl: true, // محاذاة للغة العربية
      };

      // إظهار الإشعار الأخضر المطابق لطلبك
      toastr.success("شكراً لتواصلك معنا! تم استلام رسالتك وسنقوم بالرد في أقرب وقت.", "تم الإرسال");

      // تفريغ كافة الحقول وإعادة ضبط النموذج
      form[0].reset();

      // إزالة حدود التحقق الأخضر والأحمر لإعادة النموذج لحالته الطبيعية
      form.find("input, textarea").removeClass("is-valid is-invalid");
    }
  });

  // إزالة التنبيه الأحمر فور بدء المستخدم بالكتابة داخل أي حقل
  $("input, textarea").on("input change input", function () {
    if ($(this).val().trim() !== "") {
      $(this).removeClass("is-invalid");
    }
  });
});
