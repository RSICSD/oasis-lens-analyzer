// Sitewide constants for the RSIC initiative.
// Replace these strings with final copy once the client provides it.

export const site = {
  nameAr: "مجمعات التنمية الريفية الصناعية",
  nameShort: "RSIC",
  tagline: "نبني مستقبل الريف عبر الصناعة والمعرفة",
  description:
    "مبادرة مجمعات التنمية الريفية الصناعية: بنية تحتية متكاملة تربط الزراعة بالصناعة والمعرفة لتحقيق السيادة الغذائية والاقتصادية.",
  phone: "+20 000 000 0000",
  email: "info@rsic.org",
  donateCta: "تبرع الآن",
} as const;

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن المشروع" },
  { to: "/projects", label: "مشاريعنا" },
  { to: "/impact", label: "الأثر المتوقع" },
  { to: "/governance", label: "الحوكمة والتمويل" },
  { to: "/blog", label: "المدونة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export const pillars = [
  {
    n: "01",
    title: "الزراعة المتجددة",
    body: "ربط الإنتاج الزراعي بسلاسل قيمة محلية تضمن دخلاً عادلاً للمزارع وأمناً غذائياً للمجتمع.",
  },
  {
    n: "02",
    title: "الصناعة الريفية",
    body: "إنشاء وحدات تصنيع لامركزية تحوّل المنتج الخام إلى منتج نهائي داخل القرية نفسها.",
  },
  {
    n: "03",
    title: "نقل المعرفة",
    body: "مراكز تدريب وأبحاث مفتوحة تنقل التقنيات الحديثة إلى الكوادر المحلية.",
  },
  {
    n: "04",
    title: "البنية الرقمية",
    body: "منصات تشغيل وإدارة لوجستية تربط المجمعات ببعضها وبالأسواق الإقليمية.",
  },
] as const;

export const impactStats = [
  { value: "+12", label: "مجمعاً مستهدفاً" },
  { value: "+50K", label: "أسرة مستفيدة" },
  { value: "+3K", label: "فرصة عمل" },
  { value: "+18", label: "محافظة" },
] as const;
