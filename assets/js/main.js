/*
  عدّل هذه القيم عند الحاجة:
  1) libraryName: اسمك أو اسم المكتبة
  2) email: البريد الإلكتروني المخصص للمكتبة
  3) siteUrl: رابط الموقع المنشور
*/
const CONFIG = {
    libraryName: 'سَيْدِنا',
    email: 'ahmad.seidina@gmail.com',
    siteUrl: 'https://kutub-seidina.github.io'
};
if (!window.KutubI18n) {
    document.documentElement.classList.remove("i18n-pending");
    throw new Error("i18n module failed to load. Native form validation will remain active.");
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 1000;

// -------------------------------------------------------------
// طبقة التخزين الآمنة والوقائية (Safe Storage Layer)
// -------------------------------------------------------------
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

function safeSessionRemove(key) {
    try {
        sessionStorage.removeItem(key);
        return true;
    } catch (_) {
        return false;
    }
}

const emailAddress = document.getElementById("emailAddress");
const emailButton = document.getElementById("emailButton");
const copyEmail = document.getElementById("copyEmail");
const toast = document.getElementById("toast");
const bookReportForm = document.getElementById("bookReportForm");
if (bookReportForm) {
    bookReportForm.noValidate = true;
}

const ARABIC_REPLY_METHODS = {
    email: "البريد الإلكتروني",
    phone: "واتساب أو مكالمة",
    telegram: "تيليغرام",
    other: "وسيلة أخرى"
};

function syncSubmissionMetadata() {
    if (!window.KutubI18n) return;
    const lang = KutubI18n.getLanguage();

    const submitLang = document.getElementById("submitLang");
    const submitSubject = document.getElementById("submitSubject");

    if (submitLang) {
        submitLang.value = lang === "ar" ? "العربية" : "الإنجليزية";
    }

    if (submitSubject) {
        submitSubject.value = "بلاغ إعادة كتاب جديد";
    }

    if (submitReplyMethod) {
        submitReplyMethod.value =
            ARABIC_REPLY_METHODS[replyMethod.value] || "";
    }
}
const successRedirect = document.getElementById("successRedirect");
const bookTitle = document.getElementById("bookTitle");
const bookCover = document.getElementById("bookCover");
const foundLocation = document.getElementById("foundLocation");
const reportMessage = document.getElementById("reportMessage");
const messageCounter = document.getElementById("messageCounter");
const replyMethod = document.getElementById("replyMethod");
const replyContact = document.getElementById("replyContact");
const submitReplyMethod = document.getElementById("submitReplyMethod");
const replyContactLabelText = document.getElementById("replyContactLabelText");
const replyContactHint = document.getElementById("replyContactHint");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewThumbnail = document.getElementById("imagePreviewThumbnail");
const imagePreviewName = document.getElementById("imagePreviewName");
const removeImage = document.getElementById("removeImage");
const submitButton = document.getElementById("submitReport");
const submitLabel = submitButton.querySelector(".submit-label");
const reportFormLink = document.getElementById("reportFormLink");
const reportFormTitle = document.getElementById("reportFormTitle");

const errors = {
    bookIdentity: document.getElementById("bookIdentityError"),
    bookCover: document.getElementById("bookCoverError"),
    replyMethod: document.getElementById("replyMethodError"),
    replyContact: document.getElementById("replyContactError")
};

const formSummaryError = document.getElementById("formSummaryError");

function checkAndHideSummaryError() {
    if (!formSummaryError) return;
    const hasErrors = Object.values(errors).some(errEl => errEl && !errEl.hidden);
    if (!hasErrors) {
        formSummaryError.hidden = true;
    }
}

if (emailAddress) emailAddress.textContent = CONFIG.email;
if (bookReportForm) bookReportForm.action = `https://formsubmit.co/${CONFIG.email}`;
if (successRedirect) successRedirect.value = `${CONFIG.siteUrl}/thanks.html`;

function updateMailtoLink() {
    if (!emailButton) return;
    const subjectText = KutubI18n.t("mailto.subject");
    const bodyTemplate = KutubI18n.t("mailto.body");

    const titleVal = bookTitle && bookTitle.value ? cleanSingleLine(bookTitle.value) : "";
    const locationVal = foundLocation && foundLocation.value ? cleanSingleLine(foundLocation.value) : "";
    const msgVal = reportMessage && reportMessage.value ? reportMessage.value.trim() : "";
    const contactVal = replyContact && replyContact.value ? replyContact.value.trim() : "";

    const bodyText = bodyTemplate
        .replace("{bookTitle}", titleVal)
        .replace("{foundLocation}", locationVal)
        .replace("{reportMessage}", msgVal)
        .replace("{replyContact}", contactVal);

    emailButton.href = `mailto:${CONFIG.email}` +
        `?subject=${encodeURIComponent(subjectText)}` +
        `&body=${encodeURIComponent(bodyText)}`;
}

updateMailtoLink();

let toastTimer;
let previewObjectUrl = null;
let selectedImageIsValid = false;
let imageValidationPromise = Promise.resolve();
let isSubmitting = false;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function getFieldContainer(control) {
    return control.closest(".reply-control") || control.closest(".form-field");
}

function setError(control, errorElement, errorKey) {
    const container = getFieldContainer(control);
    if (container) container.classList.add("has-error");
    control.setAttribute("aria-invalid", "true");
    errorElement.dataset.i18nError = errorKey;
    errorElement.textContent = KutubI18n.t(errorKey);
    errorElement.hidden = false;
}

function clearError(control, errorElement) {
    const container = getFieldContainer(control);
    if (container) container.classList.remove("has-error");
    control.removeAttribute("aria-invalid");
    delete errorElement.dataset.i18nError;
    errorElement.textContent = "";
    errorElement.hidden = true;
}

function normalizeDigits(value) {
    return value
        .replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
        .replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
}

function cleanSingleLine(value) {
    return value.trim().replace(/\s+/g, " ");
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function normalizePhoneForDisplay(value) {
    return normalizeDigits(value)
        .replace(/[–—−]/g, "-")
        .trim()
        .replace(/\s+/g, " ");
}

function isValidPhone(value) {
    const normalized = normalizePhoneForDisplay(value);
    if (!/^[+]?([0-9()\s-]+)$/.test(normalized)) return false;
    if ((normalized.match(/\+/g) || []).length > 1) return false;
    if (normalized.includes("+") && !normalized.startsWith("+")) return false;
    const digits = normalized.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
}

function isValidTelegram(value) {
    const username = /^@[A-Za-z0-9_]{5,32}$/;
    const link = /^https:\/\/t\.me\/[A-Za-z0-9_]{5,32}\/?$/i;
    return username.test(value) || link.test(value);
}

function formatFileSize(bytes) {
    const mb = (bytes / (1024 * 1024)).toFixed(bytes < 1024 * 1024 ? 2 : 1);
    return `${mb} ${KutubI18n.getLanguage() === "ar" ? "ميجابايت" : "MB"}`;
}

function resetImagePreview({
    clearInput = false,
    clearValidation = true
} = {}) {
    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }
    imagePreview.classList.remove("visible");
    imagePreviewThumbnail.removeAttribute("src");
    imagePreviewThumbnail.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
    imagePreviewName.textContent = "";
    selectedImageIsValid = false;
    if (clearInput) {
        bookCover.value = "";
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });
    }
    if (clearValidation) clearError(bookCover, errors.bookCover);
}

async function hasValidImageSignature(file) {
    const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const isJpeg = bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
    const isPng = bytes.length >= 8 &&
        bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
        bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A;
    return isJpeg || isPng;
}

async function canDecodeImage(file) {
    if ("createImageBitmap" in window) {
        const bitmap = await createImageBitmap(file);
        const valid = bitmap.width > 0 && bitmap.height > 0;
        bitmap.close();
        return valid;
    }

    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            const valid = image.naturalWidth > 0 && image.naturalHeight > 0;
            URL.revokeObjectURL(url);
            resolve(valid);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Invalid image"));
        };
        image.src = url;
    });
}

async function validateSelectedImage() {
    resetImagePreview({
        clearInput: false,
        clearValidation: true
    });
    const [file] = bookCover.files;
    if (!file) return true;

    if (file.size === 0) {
        setError(bookCover, errors.bookCover, "errors.imageEmpty");
        bookCover.value = "";
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });
        return false;
    }

    if (file.size > MAX_IMAGE_SIZE) {
        setError(bookCover, errors.bookCover, "errors.imageSize");
        bookCover.value = "";
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });
        return false;
    }

    const extensionIsValid = /\.(jpe?g|png)$/i.test(file.name);
    const mimeIsValid = file.type === "image/jpeg" || file.type === "image/png" || file.type === "";

    try {
        const signatureIsValid = await hasValidImageSignature(file);
        if (!extensionIsValid || !mimeIsValid || !signatureIsValid || !(await canDecodeImage(file))) {
            throw new Error("Unsupported image");
        }
    } catch {
        setError(bookCover, errors.bookCover, "errors.imageType");
        bookCover.value = "";
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });
        return false;
    }

    selectedImageIsValid = true;
    updateDraftImageState({
        hadImage: true,
        showWarning: false
    });
    previewObjectUrl = URL.createObjectURL(file);
    imagePreviewThumbnail.src = previewObjectUrl;
    imagePreviewName.textContent = `${file.name} — ${formatFileSize(file.size)}`;
    imagePreview.classList.add("visible");
    clearError(bookCover, errors.bookCover);
    clearError(bookTitle, errors.bookIdentity);
    return true;
}

function updateReplyContactField({
    clearValidation = true
} = {}) {
    if (clearValidation) {
        clearError(replyMethod, errors.replyMethod);
        clearError(replyContact, errors.replyContact);
    }
    replyContact.disabled = !replyMethod.value;
    replyContact.removeAttribute("pattern");
    replyContact.removeAttribute("inputmode");

    const val = replyMethod.value || "default";

    replyContactLabelText.textContent = KutubI18n.t(`form.replyContact.label.${val}`);
    replyContact.placeholder = KutubI18n.t(`form.replyContact.placeholder.${val}`);
    replyContactHint.textContent = KutubI18n.t(`form.replyContact.hint.${val}`);

    switch (replyMethod.value) {
        case "email":
            replyContact.dir = "ltr";
            replyContact.type = "email";
            replyContact.inputMode = "email";
            replyContact.autocomplete = "email";
            break;
        case "phone":
            replyContact.dir = "ltr";
            replyContact.type = "tel";
            replyContact.inputMode = "tel";
            replyContact.autocomplete = "tel";
            break;
        case "telegram":
            replyContact.dir = "ltr";
            replyContact.type = "text";
            replyContact.inputMode = "text";
            replyContact.autocomplete = "off";
            break;
        case "other":
            replyContact.dir = "auto";
            replyContact.type = "text";
            replyContact.inputMode = "text";
            replyContact.autocomplete = "off";
            break;
        default:
            replyContact.dir = "auto";
            replyContact.type = "text";
            replyContact.autocomplete = "off";
    }
}

function validateBookIdentity() {
    const hasTitle = cleanSingleLine(bookTitle.value).length > 0;
    const hasImage = selectedImageIsValid && bookCover.files.length > 0;
    if (!hasTitle && !hasImage) {
        setError(bookTitle, errors.bookIdentity, "errors.bookIdentity");
        return false;
    }
    clearError(bookTitle, errors.bookIdentity);
    return true;
}

function validateReplyMethod() {
    if (!replyMethod.value) {
        setError(replyMethod, errors.replyMethod, "errors.replyMethodRequired");
        return false;
    }
    clearError(replyMethod, errors.replyMethod);
    return true;
}

function validateReplyContact() {
    const method = replyMethod.value;
    let value = replyContact.value.trim();

    if (!method) return false;
    if (!value) {
        setError(replyContact, errors.replyContact, "errors.replyContactRequired");
        return false;
    }

    if (method === "email") {
        if (!isValidEmail(value)) {
            setError(replyContact, errors.replyContact, "errors.invalidEmail");
            return false;
        }
    } else if (method === "phone") {
        value = normalizePhoneForDisplay(value);
        replyContact.value = value;
        if (!isValidPhone(value)) {
            setError(replyContact, errors.replyContact, "errors.invalidPhone");
            return false;
        }
    } else if (method === "telegram") {
        if (!isValidTelegram(value)) {
            setError(replyContact, errors.replyContact, "errors.invalidTelegram");
            return false;
        }
    } else if (method === "other") {
        if (cleanSingleLine(value).length < 5) {
            setError(replyContact, errors.replyContact, "errors.invalidOther");
            return false;
        }
    }

    clearError(replyContact, errors.replyContact);
    return true;
}

function getFirstInvalidControl(results) {
    if (!results.bookIdentity) return bookTitle;
    if (!results.image) return bookCover;
    if (!results.method) return replyMethod;
    if (!results.contact) return replyContact;
    return null;
}

async function copyEmailAddress() {
    try {
        await navigator.clipboard.writeText(CONFIG.email);
        showToast(KutubI18n.t("toast.copied"));
    } catch {
        const range = document.createRange();
        range.selectNodeContents(emailAddress);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand("copy");
            selection.removeAllRanges();
            showToast(KutubI18n.t("toast.copied"));
        } catch {
            showToast(KutubI18n.t("toast.copyFailed"));
        }
    }
}

// -------------------------------------------------------------
// إدارة وحفظ مسودة البلاغ (Draft Saving & Restoring)
// -------------------------------------------------------------
const DRAFT_STORAGE_KEY = "kutub-seidina:report-draft";
const DRAFT_VERSION = 2;

let draftSaveTimeout = null;
let hasUnsavedChanges = false;
let draftHadImage = false;

const draftImageWarning = document.getElementById("draftImageWarning");

function updateDraftImageState({
    hadImage,
    showWarning = false
}) {
    draftHadImage = hadImage;
    if (draftImageWarning) {
        draftImageWarning.hidden = !showWarning;
    }
}

// دالة التحقق والتنقية للمسودة المسترجعة
function sanitizeDraft(raw) {
    if (!raw) return null;
    try {
        const draft = JSON.parse(raw);
        if (!draft || typeof draft !== "object" || draft.version !== DRAFT_VERSION) {
            return null;
        }

        const allowedMethods = ["email", "phone", "telegram", "other"];
        const method = allowedMethods.includes(draft.replyMethod) ? draft.replyMethod : "";
        const contact = (method && typeof draft.replyContact === "string") ? draft.replyContact.slice(0, 120) : "";

        const clean = {
            version: DRAFT_VERSION,
            bookTitle: typeof draft.bookTitle === "string" ? draft.bookTitle.slice(0, 150) : "",
            foundLocation: typeof draft.foundLocation === "string" ? draft.foundLocation.slice(0, 200) : "",
            reportMessage: typeof draft.reportMessage === "string" ? draft.reportMessage.slice(0, 1000) : "",
            replyMethod: method,
            replyContact: contact,
            hadImage: !!draft.hadImage
        };

        return clean;
    } catch (_) {
        return null;
    }
}

// دالة التحقق مما إذا كان النموذج فارغاً تماماً
function isFormEmpty() {
    const title = bookTitle ? bookTitle.value.trim() : "";
    const location = foundLocation ? foundLocation.value.trim() : "";
    const message = reportMessage ? reportMessage.value.trim() : "";
    const method = replyMethod ? replyMethod.value : "";
    const contact = replyContact ? replyContact.value.trim() : "";

    return !title && !location && !message && !method && !contact && !draftHadImage;
}

// دالة تجميع بيانات المسودة الحالية
function getDraftData() {
    return {
        version: DRAFT_VERSION,
        bookTitle: bookTitle ? bookTitle.value : "",
        foundLocation: foundLocation ? foundLocation.value : "",
        reportMessage: reportMessage ? reportMessage.value : "",
        replyMethod: replyMethod ? replyMethod.value : "",
        replyContact: replyContact ? replyContact.value : "",
        hadImage: draftHadImage
    };
}

// الحفظ الفوري للمسودة
function saveDraftImmediately() {
    if (draftSaveTimeout) {
        clearTimeout(draftSaveTimeout);
        draftSaveTimeout = null;
    }

    if (isFormEmpty()) {
        safeSessionRemove(DRAFT_STORAGE_KEY);
        hasUnsavedChanges = false;
        return;
    }

    const data = getDraftData();
    safeSessionSet(DRAFT_STORAGE_KEY, JSON.stringify(data));
    hasUnsavedChanges = false;
}

// جدولة الحفظ المؤجل (Debounced Save)
function scheduleDraftSave() {
    hasUnsavedChanges = true;
    if (draftSaveTimeout) clearTimeout(draftSaveTimeout);
    draftSaveTimeout = setTimeout(() => {
        saveDraftImmediately();
    }, 500);
}

// دالة استرجاع وتعبئة المسودة
function restoreDraft() {
    const raw = safeSessionGet(DRAFT_STORAGE_KEY);
    if (!raw) return;

    const draft = sanitizeDraft(raw);
    if (!draft) {
        safeSessionRemove(DRAFT_STORAGE_KEY);
        return;
    }

    updateDraftImageState({
        hadImage: draft.hadImage,
        showWarning: draft.hadImage
    });

    if (bookTitle) bookTitle.value = draft.bookTitle;
    if (foundLocation) foundLocation.value = draft.foundLocation;
    if (reportMessage) {
        reportMessage.value = draft.reportMessage;
        if (messageCounter) {
            messageCounter.textContent = `${draft.reportMessage.length} / ${MAX_MESSAGE_LENGTH}`;
        }
    }
    if (replyMethod) {
        replyMethod.value = draft.replyMethod;
    }

    updateReplyContactField();

    if (replyContact) replyContact.value = draft.replyContact;

    updateMailtoLink();

    const draftNotice = document.getElementById("draftNotice");
    if (draftNotice) {
        draftNotice.hidden = false;
    }
}

// الحفظ الوقائي الفوري عند إغلاق التبويب أو إخفائه
window.addEventListener("pagehide", () => {
    if (hasUnsavedChanges) {
        saveDraftImmediately();
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && hasUnsavedChanges) {
        saveDraftImmediately();
    }
});

bookCover.addEventListener("change", () => {
    imageValidationPromise = validateSelectedImage().then(() => {
        if (errors.bookIdentity && !errors.bookIdentity.hidden) {
            validateBookIdentity();
        }
        checkAndHideSummaryError();
        scheduleDraftSave();
    });
});

removeImage.addEventListener("click", () => {
    resetImagePreview({
        clearInput: true,
        clearValidation: true
    });
    if (errors.bookIdentity && !errors.bookIdentity.hidden) {
        validateBookIdentity();
    }
    checkAndHideSummaryError();
    bookCover.focus();
    scheduleDraftSave();
});

const clearDraftBtn = document.getElementById("clearDraftBtn");
if (clearDraftBtn) {
    clearDraftBtn.addEventListener("click", () => {
        if (draftSaveTimeout) {
            clearTimeout(draftSaveTimeout);
            draftSaveTimeout = null;
        }

        safeSessionRemove(DRAFT_STORAGE_KEY);
        hasUnsavedChanges = false;
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });

        bookReportForm.reset();
        syncSubmissionMetadata();
        resetImagePreview({
            clearInput: true,
            clearValidation: true
        });

        if (messageCounter) {
            messageCounter.textContent = `0 / ${MAX_MESSAGE_LENGTH}`;
        }

        Object.values(errors).forEach(errEl => {
            if (errEl) {
                errEl.textContent = "";
                errEl.hidden = true;
            }
        });

        document.querySelectorAll(".has-error").forEach(container => {
            container.classList.remove("has-error");
        });

        document.querySelectorAll("[aria-invalid]").forEach(control => {
            control.removeAttribute("aria-invalid");
        });

        if (formSummaryError) formSummaryError.hidden = true;

        updateReplyContactField();
        updateMailtoLink();

        const draftNotice = document.getElementById("draftNotice");
        if (draftNotice) draftNotice.hidden = true;

        if (bookTitle) bookTitle.focus();
    });
}

bookTitle.addEventListener("input", () => {
    if (errors.bookIdentity && !errors.bookIdentity.hidden) {
        validateBookIdentity();
        checkAndHideSummaryError();
    }
    updateMailtoLink();
    scheduleDraftSave();
});

if (foundLocation) {
    foundLocation.addEventListener("input", () => {
        updateMailtoLink();
        scheduleDraftSave();
    });
}

reportMessage.addEventListener("input", () => {
    messageCounter.textContent = `${reportMessage.value.length} / ${MAX_MESSAGE_LENGTH}`;
    updateMailtoLink();
    scheduleDraftSave();
});

replyMethod.addEventListener("change", () => {
    updateReplyContactField();
    syncSubmissionMetadata();
    replyContact.focus();
    checkAndHideSummaryError();
    updateMailtoLink();
    scheduleDraftSave();
});

replyContact.addEventListener("input", () => {
    const container = getFieldContainer(replyContact);
    if (container && container.classList.contains("has-error")) {
        validateReplyContact();
        checkAndHideSummaryError();
    }
    updateMailtoLink();
    scheduleDraftSave();
});

replyContact.addEventListener("blur", () => {
    if (replyMethod.value === "phone") {
        replyContact.value = normalizePhoneForDisplay(replyContact.value);
    }
    const container = getFieldContainer(replyContact);
    if (container && container.classList.contains("has-error")) {
        validateReplyContact();
        checkAndHideSummaryError();
    }
    updateMailtoLink();
    scheduleDraftSave();
});

function getScrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ?
        "auto" :
        "smooth";
}

bookReportForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    if (formSummaryError) formSummaryError.hidden = true;

    try {
        await imageValidationPromise;

        bookTitle.value = cleanSingleLine(bookTitle.value);
        reportMessage.value = reportMessage.value.trim();

        const results = {
            bookIdentity: validateBookIdentity(),
            image: !bookCover.files.length || selectedImageIsValid,
            method: validateReplyMethod(),
            contact: validateReplyContact()
        };

        if (!results.image) {
            setError(bookCover, errors.bookCover, "errors.imageType");
        }

        const firstInvalid = getFirstInvalidControl(results);
        if (firstInvalid) {
            isSubmitting = false;
            if (formSummaryError) formSummaryError.hidden = false;
            firstInvalid.focus();
            firstInvalid.scrollIntoView({
                behavior: getScrollBehavior(),
                block: "center"
            });
            return;
        }

        saveDraftImmediately();

        submitButton.disabled = true;
        submitButton.classList.add("is-loading");
        submitLabel.textContent = KutubI18n.t("form.submit.loading");

        // توليد رمز إرسال فريد وحفظه في الجلسة لمطابقته في صفحة النجاح
        const token = typeof crypto.randomUUID === "function" ?
            crypto.randomUUID() :
            (Date.now().toString(36) + Math.random().toString(36).substring(2));

        safeSessionSet("kutub-seidina:submission-token", token);

        // إرفاق الرمز في رابط التوجيه بعد النجاح
        if (successRedirect && successRedirect.value) {
            try {
                const redirectUrl = new URL(successRedirect.value);
                redirectUrl.searchParams.set("submission", token);
                successRedirect.value = redirectUrl.toString();
            } catch (_) {
                const separator = successRedirect.value.includes("?") ? "&" : "?";
                successRedirect.value = successRedirect.value + separator + "submission=" + encodeURIComponent(token);
            }
        }

        syncSubmissionMetadata();
        HTMLFormElement.prototype.submit.call(bookReportForm);
    } catch {
        isSubmitting = false;
        submitButton.disabled = false;
        submitButton.classList.remove("is-loading");
        submitLabel.textContent = KutubI18n.t("form.submit");
        showToast(KutubI18n.t("errors.prepareFailed"));
    }
});

window.addEventListener("pageshow", () => {
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
    submitLabel.textContent = KutubI18n.t("form.submit");

    // معالجة العودة بالصفحة الخلفية (BFCache) بعد إرسال ناجح
    const completedToken = safeSessionGet("kutub-seidina:submission-complete");
    if (completedToken) {
        updateDraftImageState({
            hadImage: false,
            showWarning: false
        });
        bookReportForm.reset();
        syncSubmissionMetadata();
        resetImagePreview({
            clearInput: true,
            clearValidation: true
        });

        if (messageCounter) {
            messageCounter.textContent = `0 / ${MAX_MESSAGE_LENGTH}`;
        }

        Object.values(errors).forEach(errEl => {
            if (errEl) {
                errEl.textContent = "";
                errEl.hidden = true;
            }
        });

        document.querySelectorAll(".has-error").forEach(container => {
            container.classList.remove("has-error");
        });

        document.querySelectorAll("[aria-invalid]").forEach(control => {
            control.removeAttribute("aria-invalid");
        });

        if (formSummaryError) formSummaryError.hidden = true;

        updateReplyContactField();
        updateMailtoLink();

        const draftNotice = document.getElementById("draftNotice");
        if (draftNotice) draftNotice.hidden = true;

        safeSessionRemove("kutub-seidina:submission-complete");
    }
});

copyEmail.addEventListener("click", copyEmailAddress);
updateReplyContactField();

if (reportFormLink && reportFormTitle) {
    reportFormLink.addEventListener("click", event => {
        const behavior = getScrollBehavior();
        event.preventDefault();
        reportFormTitle.scrollIntoView({
            behavior,
            block: "start"
        });
        setTimeout(() => {
            reportFormTitle.focus({
                preventScroll: true
            });
        }, behavior === "auto" ? 0 : 300);
    });
}

// -------------------------------------------------------------
// تسجيل اشتراك في محرك الترجمة لتحديث الأخطاء والعناصر الفعالة
// -------------------------------------------------------------
KutubI18n.subscribe(lang => {
    // 1. تحديث الأخطاء المعروضة حالياً في الواجهة
    document.querySelectorAll("[data-i18n-error]").forEach(el => {
        const key = el.dataset.i18nError;
        el.textContent = KutubI18n.t(key);
    });

    // 2. إعادة بناء الحقول والملصقات الخاصة بوسيلة الرد
    updateReplyContactField({
        clearValidation: false
    });

    // 3. تحديث موضوع ونص رابط البريد mailto
    updateMailtoLink();

    // 4. تحديث المدخلات المخفية لـ FormSubmit
    syncSubmissionMetadata();

    // 5. تحديث ملصق الإرسال بناءً على حالة الإرسال الحالية
    if (isSubmitting) {
        submitLabel.textContent = KutubI18n.t("form.submit.loading");
    } else {
        submitLabel.textContent = KutubI18n.t("form.submit");
    }

    // 6. تحديث حجم الصورة المسترجعة بالوحدة المناسبة للغة المختارة
    const [file] = bookCover.files;
    if (file && selectedImageIsValid) {
        const imagePreviewName = document.getElementById("imagePreviewName");
        if (imagePreviewName) {
            imagePreviewName.textContent = `${file.name} — ${formatFileSize(file.size)}`;
        }
    }
});

// استعادة المسودة المستندة إلى الجلسة عند تحميل الصفحة لأول مرة
restoreDraft();
