(function () {
    if (!window.KutubI18n) {
        document.documentElement.classList.remove("i18n-pending");
    }

    const SUBMISSION_TOKEN_KEY = "kutub-seidina:submission-token";
    const COMPLETE_TOKEN_KEY = "kutub-seidina:submission-complete";
    const DRAFT_STORAGE_KEY = "kutub-seidina:report-draft";

    function safeSessionGet(key) {
        try {
            return sessionStorage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    function safeSessionSet(key, value) {
        try {
            sessionStorage.setItem(key, value);
            return true;
        } catch (_) {
            return false;
        }
    }

    // 1. استخراج معامل الإرسال من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const searchToken = urlParams.get("submission");
    const storedToken = safeSessionGet(SUBMISSION_TOKEN_KEY);

    // 2. التحقق من تطابق الرمز لحذف المسودة بأمان
    if (searchToken && storedToken && searchToken === storedToken) {
        // إزالة المعامل من شريط العنوان فوراً لمنع التكرار عند التحديث
        try {
            window.history.replaceState(null, "", window.location.pathname);
        } catch (_) {}

        // تعيين علامة إتمام الإرسال لاستخدامها في BFCache بالصفحة الرئيسية
        safeSessionSet(COMPLETE_TOKEN_KEY, storedToken);

        // حذف المسودة المحفوظة بنجاح
        try {
            sessionStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch (_) {}

        // تنظيف رمز الإرسال المؤقت
        try {
            sessionStorage.removeItem(SUBMISSION_TOKEN_KEY);
        } catch (_) {}
    }
})();
