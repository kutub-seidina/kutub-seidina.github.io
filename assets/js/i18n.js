(function () {
    const dictionary = {
        ar: {
            "title": "إعادة كتاب | مكتبة سَيْدِنا",
            "success.title": "تم إرسال البلاغ | مكتبة سَيْدِنا",
            "meta.desc": "صفحة تواصل لإعادة كتاب من مكتبة شخصية إلى صاحبه.",
            "success.meta.desc": "تأكيد نجاح إرسال بلاغ إعادة كتاب.",
            "libraryType": "مكتبة شخصية",
            "libraryName": "مكتبة سَيْدِنا",
            "footer.libraryName": "مكتبة سَيْدِنا الشخصية",
            "welcome.title": "شكرًا لحرصك على إعادة هذا الكتاب",
            "welcome.desc": "هذا الكتاب من مقتنيات مكتبة شخصية. إذا عثرت عليه أو وصل إليك بطريق الخطأ، يرجى التواصل معنا لترتيب إعادته.",
            "mainCta": "إرسال بلاغ عن الكتاب",
            "emailButton": "تواصل بالبريد مباشرة",
            "copyEmail": "نسخ البريد",
            "emailAltLabel": "أو تواصل معنا مباشرة عبر البريد الإلكتروني:",
            "steps.title": "خطوات إعادة الكتاب",
            "steps.step1.title": "عرّفنا بالكتاب",
            "steps.step1.desc": "أرسل اسم الكتاب أو صورة واضحة لغلافه.",
            "steps.step2.title": "أضف مكان العثور إن كان معروفًا",
            "steps.step2.desc": "هذه المعلومة اختيارية، لكنها تساعد على ترتيب الإعادة.",
            "steps.step3.title": "رتّب معنا إعادة الكتاب",
            "steps.step3.desc": "سنتفق معك على وسيلة مناسبة لاستلامه.",
            "form.title": "إرسال بلاغ سريع",
            "form.description": "يمكنك إرسال معلومات الكتاب مباشرة من هنا، وسنرد عليك عبر الوسيلة التي تختارها.",
            "form.requiredNote": "الحقول المعلّمة بعلامة * مطلوبة.",
            "form.identity.legend": "التعرّف على الكتاب",
            "form.identity.hint": "أدخل اسم الكتاب أو أرفق صورة واضحة لغلافه — يكفي أحدهما.",
            "form.bookTitle.label": "اسم الكتاب — بديل عن الصورة",
            "form.bookTitle.placeholder": "اكتب اسم الكتاب إن كان معروفًا",
            "form.bookCover.label": "صورة غلاف الكتاب — بديل عن الاسم",
            "form.bookCover.hint": "صورة JPG أو PNG، وبحجم لا يتجاوز 5 ميجابايت.",
            "form.bookCover.btn": "اختيار صورة",
            "form.bookCover.noFile": "لم يتم اختيار ملف",
            "form.removeImage": "إزالة الصورة",
            "form.imagePreviewAlt": "معاينة صورة غلاف الكتاب",
            "form.foundLocation.label": "مكان العثور على الكتاب (اختياري، لكنه مفيد)",
            "form.foundLocation.placeholder": "مثال: مكتبة، جامعة، مقهى أو حي",
            "form.message.label": "رسالة إضافية (اختياري)",
            "form.message.placeholder": "أضف أي تفاصيل تساعد على التعرّف على الكتاب أو ترتيب إعادته",
            "form.replyMethod.label": "وسيلة التواصل المفضلة",
            "form.replyMethod.default": "اختر الوسيلة",
            "form.replyMethod.email": "البريد الإلكتروني",
            "form.replyMethod.phone": "واتساب أو مكالمة",
            "form.replyMethod.telegram": "تيليغرام",
            "form.replyMethod.other": "وسيلة أخرى",
            "form.replyContact.label.default": "بيانات التواصل",
            "form.replyContact.label.email": "البريد الإلكتروني",
            "form.replyContact.label.phone": "رقم الهاتف أو واتساب",
            "form.replyContact.label.telegram": "اسم مستخدم تيليغرام",
            "form.replyContact.label.other": "وسيلة التواصل وتفاصيلها",
            "form.replyContact.placeholder.default": "اختر وسيلة الرد أولًا",
            "form.replyContact.placeholder.email": "name@example.com",
            "form.replyContact.placeholder.phone": "4567 123 50 966+",
            "form.replyContact.placeholder.telegram": "@username أو https://t.me/username",
            "form.replyContact.placeholder.other": "مثال: حساب Signal باسم ...",
            "form.replyContact.hint.default": "لن تُستخدم هذه البيانات إلا للرد بشأن إعادة الكتاب.",
            "form.replyContact.hint.email": "أدخل بريدًا يمكننا الرد عليه بشأن إعادة الكتاب.",
            "form.replyContact.hint.phone": "يمكنك إدخال رمز الدولة والمسافات والشرطات، من دون حروف.",
            "form.replyContact.hint.telegram": "اكتب اسم المستخدم مسبوقًا بـ @ أو رابط t.me الكامل.",
            "form.replyContact.hint.other": "اكتب وصفًا واضحًا لوسيلة التواصل، بخمسة أحرف على الأقل.",
            "form.submit": "إرسال البلاغ",
            "form.submit.loading": "جارٍ إرسال البلاغ…",
            "form.submit.help": "قد يستغرق الانتقال لصفحة التأكيد لحظات تبعاً لسرعة الاتصال لديك.",
            "form.privacy": "قد تُحفظ الحقول النصية مؤقتًا على جهازك خلال هذه الجلسة لتجنّب فقدانها، دون حفظ صورة الغلاف. لا تُرسل البيانات إلا عند إرسال البلاغ، وتُستخدم بيانات التواصل فقط لترتيب إعادة الكتاب. تُحذف المسودة بعد نجاح الإرسال.",
            "footer.text": "شكرًا لأمانتك وحرصك على إعادة الكتب إلى أصحابها.",
            "noscript": "بعض التحسينات، مثل معاينة الصورة والتحقق المخصص، تحتاج إلى JavaScript. يمكنك تعبئة النموذج باستخدام التحقق الأساسي للمتصفح، أو التواصل عبر البريد الإلكتروني الموضح أعلاه.",
            "toast.copied": "تم نسخ البريد الإلكتروني",
            "toast.copyFailed": "تعذر النسخ؛ حدّد البريد وانسخه يدوياً",
            "draftNotice.restored": "استُعيدت مسودتك من هذه الجلسة.",
            "draftNotice.deleteBtn": "حذف المسودة",
            "draftNotice.imageWarning": "يرجى إعادة إرفاق صورة غلاف الكتاب.",
            "errors.bookIdentity": "يرجى كتابة اسم الكتاب أو إرفاق صورة الغلاف.",
            "errors.imageEmpty": "ملف الصورة فارغ أو تالف.",
            "errors.imageSize": "حجم الصورة يتجاوز 5 ميجابايت.",
            "errors.imageType": "الصورة غير صالحة أو صيغتها غير مدعومة. استخدم صورة JPG أو PNG صالحة.",
            "errors.replyMethodRequired": "يرجى اختيار وسيلة الرد.",
            "errors.replyContactRequired": "يرجى إدخال بيانات التواصل.",
            "errors.invalidEmail": "البريد الإلكتروني غير صحيح.",
            "errors.invalidPhone": "رقم الهاتف غير صحيح.",
            "errors.invalidTelegram": "اسم المستخدم غير صحيح.",
            "errors.invalidOther": "يرجى كتابة تفاصيل وسيلة التواصل.",
            "errors.summary": "يرجى تصحيح الحقول المحددة أدناه.",
            "errors.prepareFailed": "تعذر تجهيز البلاغ. حاول مرة أخرى.",
            "mailto.subject": "بلاغ إعادة كتاب",
            "mailto.body": "أهلاً، عثرت على كتاب وأرغب في إعادته.\n\nتفاصيل الكتاب:\n- اسم الكتاب: {bookTitle}\n- مكان العثور: {foundLocation}\n- رسالة إضافية: {reportMessage}\n- بيانات التواصل للرد: {replyContact}",
            "formsubmit.subject": "بلاغ إعادة كتاب جديد",
            "langSwitch.text": "English",
            "langSwitch.ariaLabel": "التبديل إلى الإنجليزية",
            "thanks.title": "تم إرسال البلاغ بنجاح",
            "thanks.desc": "شكرًا لأمانتك. سنتواصل معك عبر الوسيلة التي اخترتها لترتيب إعادة الكتاب.",
            "thanks.note": "يمكنك الآن إغلاق هذه الصفحة، ولا حاجة إلى إرسال البلاغ مرة أخرى.",
            "thanks.btnHome": "العودة إلى الصفحة الرئيسية",
            "thanks.btnAnother": "إرسال بلاغ آخر"
        },
        en: {
            "title": "Return a Book | Saydina Library",
            "success.title": "Report Sent | Saydina Library",
            "meta.desc": "Contact page to return a book from a personal library to its owner.",
            "success.meta.desc": "Confirmation of a successful book return report.",
            "libraryType": "Personal Library",
            "libraryName": "Saydina Library",
            "footer.libraryName": "Saydina Personal Library",
            "welcome.title": "Thank you for returning this book",
            "welcome.desc": "This book belongs to a personal library. If you found it or received it by mistake, please contact us to arrange its return.",
            "mainCta": "Submit a report about the book",
            "emailButton": "Contact us directly by email",
            "copyEmail": "Copy email",
            "emailAltLabel": "Or contact us directly by email:",
            "steps.title": "Steps to return the book",
            "steps.step1.title": "Identify the book",
            "steps.step1.desc": "Send the book's name or a clear image of its cover.",
            "steps.step2.title": "Add found location if known",
            "steps.step2.desc": "This information is optional, but it helps coordinate the return.",
            "steps.step3.title": "Coordinate the return",
            "steps.step3.desc": "We will agree with you on a convenient way to receive it.",
            "form.title": "Send a quick report",
            "form.description": "You can send the book's details directly from here, and we will reply via your preferred method.",
            "form.requiredNote": "Fields marked with * are required.",
            "form.identity.legend": "Identify the book",
            "form.identity.hint": "Enter the book's name or attach a clear cover image — either is enough.",
            "form.bookTitle.label": "Book title — alternative to a cover image",
            "form.bookTitle.placeholder": "Type the book name if known",
            "form.bookCover.label": "Book cover image — alternative to the title",
            "form.bookCover.hint": "JPG or PNG image, up to 5 MB.",
            "form.bookCover.btn": "Choose image",
            "form.bookCover.noFile": "No file chosen",
            "form.removeImage": "Remove image",
            "form.imagePreviewAlt": "Book cover preview",
            "form.foundLocation.label": "Where the book was found (Optional, but helpful)",
            "form.foundLocation.placeholder": "Example: Library, university, cafe, or neighborhood",
            "form.message.label": "Additional message (Optional)",
            "form.message.placeholder": "Add any details that help identify the book or coordinate its return",
            "form.replyMethod.label": "Preferred reply method",
            "form.replyMethod.default": "Select method",
            "form.replyMethod.email": "Email",
            "form.replyMethod.phone": "WhatsApp or Call",
            "form.replyMethod.telegram": "Telegram",
            "form.replyMethod.other": "Other method",
            "form.replyContact.label.default": "Contact details",
            "form.replyContact.label.email": "Email Address",
            "form.replyContact.label.phone": "Phone Number or WhatsApp",
            "form.replyContact.label.telegram": "Telegram Username",
            "form.replyContact.label.other": "Other Contact Method",
            "form.replyContact.placeholder.default": "Select a reply method first",
            "form.replyContact.placeholder.email": "name@example.com",
            "form.replyContact.placeholder.phone": "+966 50 123 4567",
            "form.replyContact.placeholder.telegram": "@username or https://t.me/username",
            "form.replyContact.placeholder.other": "Example: Signal account named ...",
            "form.replyContact.hint.default": "This data will only be used to reply about returning the book.",
            "form.replyContact.hint.email": "Enter an email we can reply to regarding the book return.",
            "form.replyContact.hint.phone": "You may include the country code, spaces, and hyphens, but not letters.",
            "form.replyContact.hint.telegram": "Write the username starting with @ or the full t.me link.",
            "form.replyContact.hint.other": "Write a clear description of the contact method, at least 5 characters.",
            "form.submit": "Submit Report",
            "form.submit.loading": "Sending report…",
            "form.submit.help": "Redirecting to the confirmation page may take a moment depending on your connection speed.",
            "form.privacy": "Text fields may be saved temporarily on your device during this session to prevent data loss; the cover image is not saved. Data is sent only when you submit the report, and contact details are used only to arrange the book’s return. The draft is deleted after a successful submission.",
            "footer.text": "Thank you for your honesty and care in returning books to their owners.",
            "noscript": "Some features, like image preview and custom validation, require JavaScript. You can fill the form using basic browser validation, or contact via the email shown above.",
            "toast.copied": "Email address copied",
            "toast.copyFailed": "Failed to copy; please select and copy manually",
            "draftNotice.restored": "Your draft from this session has been restored automatically.",
            "draftNotice.deleteBtn": "Delete draft",
            "draftNotice.imageWarning": "Please re-attach the book cover image.",
            "errors.bookIdentity": "Please write the book name or attach the cover image.",
            "errors.imageEmpty": "The image file is empty or corrupted.",
            "errors.imageSize": "The image size exceeds 5 MB.",
            "errors.imageType": "Unsupported image format. Use a valid JPG or PNG.",
            "errors.replyMethodRequired": "Please select a reply method.",
            "errors.replyContactRequired": "Please enter your contact details.",
            "errors.invalidEmail": "Invalid email address.",
            "errors.invalidPhone": "Invalid phone number.",
            "errors.invalidTelegram": "Invalid Telegram username.",
            "errors.invalidOther": "Please enter contact method details.",
            "errors.summary": "Please correct the highlighted fields below.",
            "errors.prepareFailed": "Failed to prepare report. Please try again.",
            "mailto.subject": "Book Return Report",
            "mailto.body": "Hello, I found a book and would like to arrange its return.\n\nBook Details:\n- Book Name: {bookTitle}\n- Found Location: {foundLocation}\n- Additional Message: {reportMessage}\n- Contact Info for Reply: {replyContact}",
            "formsubmit.subject": "New Book Return Report",
            "langSwitch.text": "العربية",
            "langSwitch.ariaLabel": "Switch to Arabic",
            "thanks.title": "Report Sent Successfully",
            "thanks.desc": "Thank you for your honesty. We will contact you via your selected method to arrange the book return.",
            "thanks.note": "You can now close this page; there is no need to resubmit.",
            "thanks.btnHome": "Back to the home page",
            "thanks.btnAnother": "Submit another report"
        }
    };

    let currentLang = "ar";
    const listeners = [];
    let initialized = false;

    function safeStorageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    function safeStorageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (_) {}
    }

    function getSystemLanguage() {
        const lang = navigator.language || navigator.userLanguage || "ar";
        return lang.startsWith("ar") ? "ar" : "en";
    }

    function applyLanguageDOM() {
        // 1. Update HTML attributes
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
        document.documentElement.classList.remove("ar-active", "en-active");
        document.documentElement.classList.add(`${currentLang}-active`);

        // 2. Update Page Titles & Meta Description
        const titles = {
            home: currentLang === "ar" ? "إعادة كتاب | مكتبة سَيْدِنا" : "Return a Book | Saydina Library",
            thanks: currentLang === "ar" ? "تم إرسال البلاغ | مكتبة سَيْدِنا" : "Report Sent | Saydina Library"
        };
        const isThanksPage = document.body.classList.contains("page-thanks");
        document.title = isThanksPage ? titles.thanks : titles.home;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const descKey = isThanksPage ? "success.meta.desc" : "meta.desc";
            metaDescription.setAttribute("content", dictionary[currentLang][descKey]);
        }

        // 3. Update elements with data-i18n
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (dictionary[currentLang][key]) {
                el.textContent = dictionary[currentLang][key];
            }
        });

        // 4. Update elements with data-i18n-placeholder
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (dictionary[currentLang][key]) {
                el.placeholder = dictionary[currentLang][key];
            }
        });

        // 4.5. Update elements with data-i18n-alt
        document.querySelectorAll("[data-i18n-alt]").forEach(el => {
            const key = el.dataset.i18nAlt;
            if (dictionary[currentLang][key]) {
                el.alt = dictionary[currentLang][key];
            }
        });

        // 5. Update language switch button text, aria-label, and lang attribute
        const langSwitchBtn = document.getElementById("langSwitch");
        if (langSwitchBtn) {
            const targetLang = currentLang === "ar" ? "en" : "ar";
            langSwitchBtn.textContent = dictionary[currentLang]["langSwitch.text"];
            langSwitchBtn.setAttribute("aria-label", dictionary[currentLang]["langSwitch.ariaLabel"]);
            langSwitchBtn.setAttribute("lang", targetLang);
            langSwitchBtn.hidden = false;
        }

        // Remove the pending class to show the page content
        document.documentElement.classList.remove("i18n-pending");
    }

    function notifyListeners() {
        listeners.forEach(callback => {
            try {
                callback(currentLang);
            } catch (error) {
                console.error(error);
            }
        });
    }

    function init() {
        const saved = safeStorageGet("kutub-seidina:language");
        currentLang = (saved === "ar" || saved === "en") ? saved : getSystemLanguage();

        applyLanguageDOM();
        initialized = true;
        notifyListeners();

        // Bind event listener to langSwitch if exists
        const langSwitchBtn = document.getElementById("langSwitch");
        if (langSwitchBtn) {
            langSwitchBtn.addEventListener("click", () => {
                const nextLang = currentLang === "ar" ? "en" : "ar";
                setLanguage(nextLang);
            });
        }
    }

    function setLanguage(lang) {
        if (lang !== "ar" && lang !== "en") return;
        currentLang = lang;
        safeStorageSet("kutub-seidina:language", lang);
        applyLanguageDOM();
        notifyListeners();
    }

    function getLanguage() {
        return currentLang;
    }

    function t(key) {
        return dictionary[currentLang][key] || key;
    }

    function subscribe(callback) {
        if (typeof callback !== "function") return;
        listeners.push(callback);
        if (initialized) {
            try {
                callback(currentLang);
            } catch (e) {
                console.error(e);
            }
        }
    }

    window.KutubI18n = {
        init,
        setLanguage,
        getLanguage,
        t,
        subscribe
    };

    // Run init immediately on DOMContentLoaded or if already loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
