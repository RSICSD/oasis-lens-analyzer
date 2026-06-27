import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  // Header / nav
  "nav./": { ar: "الرئيسية", en: "Home" },
  "nav./about": { ar: "عن المبادرة", en: "About" },
  "nav./projects": { ar: "النموذج والمصانع", en: "Model & Factories" },
  "nav./impact": { ar: "الأثر المتوقع", en: "Impact" },
  "nav./governance": { ar: "الحوكمة والتمويل", en: "Governance & Funding" },
  "nav./blog": { ar: "المدونة", en: "Blog" },
  "nav./poc": { ar: "لوحة المشروع", en: "Project Dashboard" },
  "nav./contact": { ar: "تواصل معنا", en: "Contact" },
  "cta.donate": { ar: "ادعم المبادرة", en: "Support the Initiative" },
  "cta.call": { ar: "اتصل بنا", en: "Call us" },
  "lang.toggle": { ar: "EN", en: "ع" },
  "lang.aria": { ar: "Switch to English", en: "التبديل إلى العربية" },
  "menu.open": { ar: "فتح القائمة", en: "Open menu" },
  "menu.close": { ar: "إغلاق القائمة", en: "Close menu" },

  // Footer
  "footer.links": { ar: "روابط", en: "Links" },
  "footer.contact": { ar: "تواصل", en: "Contact" },
  "footer.rights": { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },

  // News floating
  "news.floating.title": { ar: "آخر الأخبار", en: "Latest News" },
  "news.button": { ar: "الأخبار", en: "News" },
  "news.close": { ar: "إغلاق", en: "Close" },

  // Home
  "home.hero.eyebrow": { ar: "مبادرة وطنية سودانية", en: "A Sudanese national initiative" },
  "home.hero.lede": {
    ar: "بدلاً من أن يهاجر الإنسان إلى الصناعة، ننقل الصناعة إلى حيث الإنسان والأرض — شبكة وطنية من 378 مجمعاً صناعياً ريفياً تُعيد بناء السودان من قاعدته المجتمعية.",
    en: "Instead of people migrating to industry, we bring industry to where people and land already are — a national network of 378 rural industrial complexes rebuilding Sudan from its community base.",
  },
  "home.hero.cta2": { ar: "النموذج والمصانع الرائدة", en: "The model & flagship factories" },
  "home.why.eyebrow": { ar: "لماذا الآن؟", en: "Why now?" },
  "home.why.title": {
    ar: "لحظة تاريخية فارقة لإعادة بناء السودان",
    en: "A defining historical moment to rebuild Sudan",
  },
  "home.why.s1.k": { ar: "220 مليون", en: "220 million" },
  "home.why.s1.v": {
    ar: "فدان من الأراضي الزراعية، منها 50 مليون قابلة للاستثمار فوراً",
    en: "acres of farmland, 50 million of them immediately investable",
  },
  "home.why.s2.k": { ar: "+60%", en: "+60%" },
  "home.why.s2.v": {
    ar: "من السكان من الشباب — قوة بشرية متعلمة ومستعدة للعمل الصناعي",
    en: "of the population are youth — an educated workforce ready for industry",
  },
  "home.why.s3.k": { ar: "<7%", en: "<7%" },
  "home.why.s3.v": {
    ar: "مساهمة الصناعة في الناتج المحلي، بعد أن كانت تتجاوز 20% في الثمانينات",
    en: "industry's share of GDP — down from over 20% in the 1980s",
  },
  "home.pillars.eyebrow": { ar: "الأركان الستة", en: "The Six Pillars" },
  "home.pillars.title": {
    ar: "ستة أركان تبني مجمعاً صناعياً متكاملاً ومستقلاً",
    en: "Six pillars that build an integrated, self-sufficient complex",
  },
  "home.pillars.lede": {
    ar: "كل ركن يخدم المصانع الأساسية ويدعم استدامتها — لتكامل وظيفي واستقلالية تشغيلية حتى في ظل ضعف البنية التحتية.",
    en: "Each pillar serves the core factories and sustains them — functional integration and operational independence even where infrastructure is weak.",
  },
  "home.goals.eyebrow": { ar: "الأهداف العامة", en: "Strategic Goals" },
  "home.goals.title": { ar: "ستة أهداف وطنية تقود التحول", en: "Six national goals driving the transformation" },
  "home.cta.title": { ar: "هذا مشروع أمة... لا مشروع قطاع", en: "A nation-scale project — not a sector project" },
  "home.cta.lede": {
    ar: "دعوة مفتوحة للمساهمين والمهندسين والجامعات والمجتمعات المحلية للمشاركة في النهضة.",
    en: "An open invitation to shareholders, engineers, universities, and local communities to join the renaissance.",
  },

  // About
  "about.eyebrow": { ar: "عن المبادرة", en: "About" },
  "about.title": {
    ar: "نهضة صناعية شاملة يقودها المجتمع",
    en: "A comprehensive, community-led industrial renaissance",
  },
  "about.desc": {
    ar: "مبادرة وطنية رائدة لإحداث تحول صناعي شامل عبر إنشاء مجمعات صناعية متكاملة في الولايات والمحليات، تُحوّل الموارد المحلية إلى منتجات ذات قيمة مضافة عالية.",
    en: "A pioneering national initiative for comprehensive industrial transformation through integrated complexes across states and localities, turning local resources into high-value products.",
  },
  "about.pillars.eyebrow": { ar: "المرتكزات", en: "Foundations" },
  "about.pillars.title": {
    ar: "رؤية جديدة لبناء الاقتصاد السوداني",
    en: "A new vision for building Sudan's economy",
  },
  "about.found1.k": { ar: "الاعتماد على الذات", en: "Self-reliance" },
  "about.found1.v": { ar: " بدلاً من التبعية للاستيراد والمساعدات.", en: " instead of dependence on imports and aid." },
  "about.found2.k": { ar: "الملكية المجتمعية", en: "Community ownership" },
  "about.found2.v": { ar: " بدلاً من الاحتكار الفردي أو النخبوي.", en: " instead of individual or elite monopolies." },
  "about.found3.k": { ar: "تكامل العلم والتقنية مع الإنتاج المحلي والإرث المعرفي", en: "Integrating science and technology with local production and heritage knowledge" },
  "about.found3.v": { ar: " بدلاً من الفصل بينهما.", en: " instead of separating them." },
  "about.vision.eyebrow": { ar: "الرؤية", en: "Vision" },
  "about.vision.title": { ar: "سودانٌ مزدهر", en: "A prosperous Sudan" },
  "about.vision.body": {
    ar: "«سودانٌ مزدهر، قائمٌ على اقتصادٍ صناعي متين تراحمي ومسؤول ومستدام، تقوده المجتمعات المحلية بالمعرفة والتكافل والإبداع، ويرتكز على الأخلاق الفضيلة وحب الخير.»",
    en: "“A prosperous Sudan, built on a resilient, compassionate, responsible, and sustainable industrial economy led by local communities through knowledge, solidarity, and creativity — anchored in virtuous ethics and a love of doing good.”",
  },
  "about.mission.eyebrow": { ar: "الرسالة", en: "Mission" },
  "about.mission.title": { ar: "تمكين المجتمعات", en: "Empowering communities" },
  "about.mission.body": {
    ar: "«تمكين المجتمعات السودانية من بناء وتشغيل مجمعات صناعية ريفية مجتمعية (RSICs) تستخدم وتطور مواردها المحلية بكفاءة وتميز تنافسي عالمي، وتحقق الأمن الغذائي والاكتفاء الذاتي، وتخلق فرص عمل حقيقية ونوعية، وتعيد الثقة بين المواطن والدولة من خلال نموذج اقتصادي عادل وشفاف ومستدام.»",
    en: "“Empowering Sudanese communities to build and operate Rural Social Industrial Complexes (RSICs) that use and develop local resources with efficiency and globally competitive excellence — achieving food security and self-sufficiency, creating real and high-quality jobs, and restoring trust between citizen and state through a fair, transparent, and sustainable economic model.”",
  },
  "about.core.eyebrow": { ar: "الفكرة الجوهرية", en: "Core Idea" },
  "about.core.title": { ar: "إعادة تموضع الصناعة داخل الريف", en: "Repositioning industry inside the countryside" },
  "about.core.l1": { ar: "بدلاً من أن يهاجر الإنسان إلى الصناعة،", en: "Instead of people migrating to industry," },
  "about.core.l2": { ar: "ننقل الصناعة إلى حيث الإنسان والأرض.", en: "we bring industry to where people and land already are." },
  "about.core.body": {
    ar: "كل مجمع صناعي ريفي هو منظومة إنتاج متكاملة تتكون من 40–50 مصنعاً متخصصاً، وخدمات مركزية مشتركة (طاقة – مياه – مختبرات – لوجستيات – تدريب – صيانة)، وإدارة تشغيل احترافية موحدة، وشراكة مجتمعية تعزز الملكية المحلية والمساءلة.",
    en: "Each rural complex is an integrated production system of 40–50 specialized factories with shared central services (energy, water, labs, logistics, training, maintenance), unified professional operations, and a community partnership that reinforces local ownership and accountability.",
  },

  // Projects
  "projects.eyebrow": { ar: "النموذج والمصانع", en: "Model & Factories" },
  "projects.title": {
    ar: "النموذج الأولي — محلية البرقيق، الشمالية",
    en: "The pilot model — Al-Bergig Locality, Northern State",
  },
  "projects.desc": {
    ar: "تبدأ المبادرة بـ 7 مصانع متكاملة في الشمالية، يتقدمها مصنع التمور الرائد، كنموذج محسوب وقابل للتوسع.",
    en: "The initiative starts with 7 integrated factories in the Northern State, led by the flagship dates factory — a deliberate, scalable pilot.",
  },
  "projects.pilot.eyebrow": { ar: "المصانع الرائدة", en: "Flagship Factories" },
  "projects.pilot.title": {
    ar: "أولوية استراتيجية مبنية على الموارد المحلية",
    en: "Strategic priority grounded in local resources",
  },
  "projects.sizing.eyebrow": { ar: "توزيع المصانع داخل المجمع", en: "Factory mix inside each complex" },
  "projects.sizing.title": {
    ar: "40–50 مصنعاً بثلاثة أحجام متكاملة",
    en: "40–50 factories in three complementary sizes",
  },
  "projects.sizing.col1": { ar: "الفئة", en: "Tier" },
  "projects.sizing.col2": { ar: "النسبة", en: "Share" },
  "projects.sizing.col3": { ar: "الحجم التقريبي", en: "Approx. size" },
  "projects.sizing.col4": { ar: "الوظيفة الاقتصادية", en: "Economic role" },
  "projects.rollout.eyebrow": { ar: "خطة الانتشار الوطني", en: "National rollout plan" },
  "projects.rollout.title": { ar: "من نموذج تجريبي إلى شبكة وطنية", en: "From pilot to national network" },

  // Impact
  "impact.eyebrow": { ar: "الأثر المتوقع", en: "Expected Impact" },
  "impact.title": {
    ar: "نتائج قابلة للقياس على ثلاثة مستويات",
    en: "Measurable results on three levels",
  },
  "impact.desc": {
    ar: "من اقتصاد خام إلى اقتصاد قيمة — أثر اقتصادي واجتماعي وعمراني يمتد من المحلية إلى الأمة.",
    en: "From a raw-materials economy to a value economy — economic, social, and spatial impact from locality to nation.",
  },
  "impact.long.eyebrow": { ar: "رؤية وطنية بعيدة المدى", en: "Long-range national vision" },
  "impact.long.title": {
    ar: "من تنمية مركزية إلى تنمية متوازنة، ومن استهلاك القيمة إلى صناعتها",
    en: "From centralized to balanced development, and from consuming value to producing it",
  },

  // Governance
  "gov.eyebrow": { ar: "الحوكمة والتمويل", en: "Governance & Funding" },
  "gov.title": { ar: "ملكية مجتمعية وشفافية مؤسسية", en: "Community ownership and institutional transparency" },
  "gov.desc": {
    ar: "نموذج الملكية المجتمعية هو صمام الأمان الفلسفي للمبادرة — ينقل القوة المالية من يد الأفراد إلى كيان مجتمعي مؤسسي مستدام.",
    en: "Community ownership is the philosophical safety valve — moving financial power from individuals into a sustainable institutional community entity.",
  },
  "gov.entity.eyebrow": { ar: "الكيان القانوني", en: "Legal entity" },
  "gov.entity.title": { ar: "الشركة المجتمعية (Community Enterprise)", en: "The Community Enterprise" },
  "gov.entity.body": {
    ar: "تدمج بين مبادئ الرأسمالية (الربحية والكفاءة) ومبادئ الاشتراكية (التركيز على مصلحة المجتمع والعدالة في التوزيع)، لتكون أفضل وسيلة قانونية لتمكين المجتمعات من امتلاك القوة المالية بطريقة مؤسسية مستدامة.",
    en: "Combines capitalist principles (profitability and efficiency) with social principles (community benefit and distributive justice) — the best legal vehicle for sustainable community ownership of financial power.",
  },
  "gov.member1": { ar: "المزارعون والمنتجون المحليون", en: "Local farmers and producers" },
  "gov.member2": { ar: "الشباب والخريجون", en: "Youth and graduates" },
  "gov.member3": { ar: "الجهات الشريكة والمساهمون الاجتماعيون", en: "Partner organizations and social shareholders" },
  "gov.council.eyebrow": { ar: "آلية الحوكمة", en: "Governance mechanism" },
  "gov.council.title": { ar: "مجلس مجتمعي متخصص", en: "A specialized community council" },
  "gov.council.body": {
    ar: "تُدار كل مجمعات الولاية من قبل مجلس مجتمعي متخصص (Community Council) يمثل صمام الأمان لحماية المبادرة من الفساد والصراع على الموارد، مع شفافية مالية كاملة وتقارير دورية للعموم.",
    en: "Every state's complexes are managed by a specialized Community Council — the safety valve protecting the initiative from corruption and resource conflict — with full financial transparency and regular public reporting.",
  },
  "gov.profits.eyebrow": { ar: "توزيع العائد", en: "Profit distribution" },
  "gov.profits.title": { ar: "ثلاثة مسارات للأرباح", en: "Three tracks for profits" },
  "gov.profits.l1": { ar: "1. تطوير الخدمات المجتمعية (تعليم وصحة في المحلية).", en: "1. Community services (local education and health)." },
  "gov.profits.l2": { ar: "2. نمو المجمع: توسعة المصانع أو بناء مجمعات جديدة.", en: "2. Growth: expanding factories or building new complexes." },
  "gov.profits.l3": { ar: "3. عائد عادل للأعضاء المساهمين في الكيان.", en: "3. A fair return for members and shareholders of the entity." },
  "gov.finance.eyebrow": { ar: "استراتيجية التمويل", en: "Funding strategy" },
  "gov.finance.title": { ar: "التمويل المختلط (Blended Finance)", en: "Blended Finance" },
  "gov.finance.body": {
    ar: "مزيج من المساهمة المجتمعية (النفير)، والمنح، والتمويل الاجتماعي، والاستثمار المسؤول — مع إعادة استثمار الأرباح داخل المجتمع وفق مبدأ «الدورة المغلقة» لتمويل التوسعات الصناعية وتحديث المعدات (CapEx) ودعم الخدمات المجتمعية.",
    en: "A mix of community contribution (Nafeer), grants, social finance, and responsible investment — with profits reinvested locally under a “closed-loop” principle to fund expansions, CapEx upgrades, and community services.",
  },

  // Blog
  "blog.eyebrow": { ar: "المدونة", en: "Blog" },
  "blog.title": { ar: "مقالات، تقارير، وأخبار", en: "Articles, reports, and news" },
  "blog.desc": { ar: "محتوى المبادرة من تحليلات ودراسات وتحديثات ميدانية.", en: "Analyses, studies, and field updates from the initiative." },
  "blog.tab.articles": { ar: "المقالات", en: "Articles" },
  "blog.tab.reports": { ar: "التقارير", en: "Reports" },
  "blog.tab.news": { ar: "الأخبار", en: "News" },
  "blog.download": { ar: "تحميل PDF", en: "Download PDF" },
  "blog.pages": { ar: "صفحة", en: "pages" },

  // Contact
  "contact.eyebrow": { ar: "تواصل", en: "Contact" },
  "contact.title": { ar: "نسعد بتواصلك معنا", en: "We'd love to hear from you" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.email": { ar: "البريد", en: "Email" },
  "contact.f.name": { ar: "الاسم", en: "Name" },
  "contact.f.email": { ar: "البريد الإلكتروني", en: "Email address" },
  "contact.f.message": { ar: "الرسالة", en: "Message" },
  "contact.f.submit": { ar: "إرسال", en: "Send" },
  "contact.f.sent": { ar: "تم استلام رسالتك، سنعود إليك قريباً.", en: "Message received — we'll get back to you soon." },
  "contact.f.err.name": { ar: "الاسم قصير جداً", en: "Name is too short" },
  "contact.f.err.email": { ar: "بريد إلكتروني غير صالح", en: "Invalid email address" },
  "contact.f.err.message": { ar: "الرسالة قصيرة جداً", en: "Message is too short" },

  // Donate
  "donate.eyebrow": { ar: "التبرع", en: "Donate" },
  "donate.title": { ar: "ساهم في بناء مجمع كامل", en: "Help fund an entire complex" },
  "donate.desc": { ar: "كل مساهمة موثقة وتذهب لمشروع محدد بنتائج قابلة للقياس.", en: "Every contribution is documented and goes to a specific project with measurable results." },
  "donate.type": { ar: "نوع التبرع", en: "Donation type" },
  "donate.once": { ar: "مرة واحدة", en: "One-time" },
  "donate.monthly": { ar: "شهري", en: "Monthly" },
  "donate.amount": { ar: "المبلغ (جنيه مصري)", en: "Amount (EGP)" },
  "donate.custom.label": { ar: "أو أدخل مبلغاً مخصصاً", en: "Or enter a custom amount" },
  "donate.summary": { ar: "ستتبرع بمبلغ", en: "You'll donate" },
  "donate.summary.currency": { ar: "جنيه", en: "EGP" },
  "donate.summary.monthly": { ar: "شهرياً", en: "monthly" },
  "donate.summary.once": { ar: "كدفعة واحدة", en: "as a one-time payment" },
  "donate.continue": { ar: "متابعة الدفع الآمن", en: "Continue to secure payment" },
  "donate.note": { ar: "بوابة الدفع ستفعّل عند ربط Stripe — يتطلب موافقتك ضمن المرحلة التالية.", en: "Payment gateway activates once Stripe is connected — requires your approval in the next step." },

  // PoC
  "poc.eyebrow": { ar: "شفافية لحظية", en: "Live transparency" },
  "poc.title": { ar: "لوحة تحكم مشروع إثبات المفهوم", en: "Proof-of-Concept Dashboard" },
  "poc.desc.prefix": { ar: "تتبّع تقدّم المصنع الرائد في", en: "Track the flagship factory's progress in" },
  "poc.desc.suffix": { ar: "البيانات تُحدَّث من الميدان عبر Google Sheets.", en: "Data is updated from the field via Google Sheets." },
  "poc.source": { ar: "المصدر", en: "Source" },
  "poc.source.sheet": { ar: "Google Sheets (حيّ)", en: "Google Sheets (live)" },
  "poc.source.fallback": { ar: "بيانات تجريبية", en: "Sample data" },
  "poc.lastUpdate": { ar: "آخر تحديث", en: "Last updated" },
  "poc.refresh": { ar: "تحديث", en: "Refresh" },
  "poc.three.title": { ar: "نموذج المجمّع ثلاثي الأبعاد", en: "3D Complex Model" },
  "poc.three.hint": {
    ar: "اسحب للدوران، استخدم العجلة للتكبير، وانقر على أي وحدة لعرض تفاصيل حزم العمل والتمويل.",
    en: "Drag to rotate, scroll to zoom, click any unit for work-package and funding details.",
  },
  "poc.matchNone": { ar: "لا توجد نتائج مطابقة.", en: "No matching results." },
  "poc.match": { ar: "عرض {n} من {t} حزمة عمل.", en: "Showing {n} of {t} work packages." },
  "poc.kpi.funding": { ar: "نسبة التمويل المستلم", en: "Funding received" },
  "poc.kpi.funding.sub": { ar: "{r} / {a} دولار", en: "${r} of ${a} received" },
  "poc.kpi.progress": { ar: "نسبة الإنجاز", en: "Completion" },
  "poc.kpi.progress.sub": { ar: "{d} من {t} حزمة عمل", en: "{d} of {t} work packages" },
  "poc.kpi.schedule": { ar: "الالتزام بالجدول الزمني", en: "Schedule adherence" },
  "poc.kpi.schedule.onTime": { ar: "في الموعد", en: "On schedule" },
  "poc.kpi.schedule.late": { ar: "{n} يوم تأخير", en: "{n} days late" },
  "poc.kpi.schedule.early": { ar: "{n} يوم تقدم", en: "{n} days early" },
  "poc.kpi.schedule.sub": { ar: "متوسط الفارق للحزم المنجزة", en: "Avg delta for completed packages" },
  "poc.kpi.docs": { ar: "الوثائق الموقّعة", en: "Signed documents" },
  "poc.kpi.docs.sub": { ar: "اتفاقيات ومذكرات وعقود", en: "Agreements, MoUs, and contracts" },
  "poc.milestones": { ar: "المعالم الرئيسية", en: "Key Milestones" },
  "poc.documents": { ar: "الوثائق والاتفاقيات", en: "Documents & Agreements" },
  "poc.documents.empty": { ar: "لا توجد وثائق منشورة بعد.", en: "No documents published yet." },
  "poc.timeline": { ar: "الجدول الزمني (مخطط / فعلي)", en: "Timeline (planned / actual)" },
  "poc.timeline.planned": { ar: "مخطط", en: "Planned" },
  "poc.timeline.actual": { ar: "فعلي", en: "Actual" },
  "poc.filter.search": { ar: "ابحث في حزم العمل والوثائق...", en: "Search work packages and documents..." },
  "poc.filter.allCat": { ar: "كل الفئات", en: "All categories" },
  "poc.filter.allStatus": { ar: "كل الحالات", en: "All statuses" },
  "poc.filter.clear": { ar: "مسح", en: "Clear" },
  "poc.drawer.funding": { ar: "التمويل", en: "Funding" },
  "poc.drawer.wps": { ar: "حزم العمل", en: "Work packages" },
  "poc.drawer.wps.empty": { ar: "لا توجد حزم عمل مرتبطة.", en: "No linked work packages." },
  "poc.drawer.docs": { ar: "الوثائق", en: "Documents" },

  // Common
  "common.backToHome": { ar: "العودة للرئيسية", en: "Back to home" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string, vars?: Record<string, string | number>) => string };

const I18nContext = createContext<Ctx | null>(null);

function format(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rsic.lang") as Lang | null;
      if (stored === "ar" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("rsic.lang", l);
    } catch {}
  };

  const t = (key: string, vars?: Record<string, string | number>) =>
    format(dict[key]?.[lang] ?? key, vars);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: "ar" as Lang,
      setLang: () => {},
      t: (k: string, v?: Record<string, string | number>) => format(dict[k]?.ar ?? k, v),
    };
  }
  return ctx;
}
