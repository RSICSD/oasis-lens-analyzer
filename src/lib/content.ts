// Bilingual content for blog/news/reports. Backed by Supabase (news_posts,
// articles, reports tables); the *ByLang objects below double as the
// fallback when the database is unreachable and as static SEO data for head().

import { queryOptions } from "@tanstack/react-query";
import type { Lang } from "./i18n";
import { supabase } from "./supabase";

type News = { id: string; date: string; title: string; excerpt: string };
type Article = { id: string; date: string; author: string; title: string; excerpt: string };
type Report = { id: string; date: string; title: string; description: string; url: string; pages: number };

export const newsByLang: Record<Lang, News[]> = {
  ar: [
    { id: "n1", date: "2026-06-10", title: "إطلاق المرحلة التجريبية في محلية البرقيق – الشمالية", excerpt: "بدء أعمال التأسيس للمجمع الرائد ومصنع منتجات النخيل كأول مصنع تشغيلي." },
    { id: "n2", date: "2026-05-22", title: "توقيع مذكرة تفاهم مع جامعة وادي النيل", excerpt: "شراكة بحثية لتطوير مختبرات الجودة ومراكز التدريب الصناعي." },
    { id: "n3", date: "2026-05-01", title: "ورشة عمل مع مجالس المجتمع المحلي", excerpt: "نقاش نموذج الشركات المجتمعية وآليات الحوكمة الشفافة." },
  ],
  en: [
    { id: "n1", date: "2026-06-10", title: "Pilot phase launched in Al-Burgig — Northern State", excerpt: "Groundbreaking for the flagship complex and the dates products factory as the first operational unit." },
    { id: "n2", date: "2026-05-22", title: "MoU signed with Wadi El-Neel University", excerpt: "A research partnership to develop quality labs and industrial training centers." },
    { id: "n3", date: "2026-05-01", title: "Workshop with local community councils", excerpt: "Discussion of the community-enterprise model and transparent governance mechanisms." },
  ],
};

export const articlesByLang: Record<Lang, Article[]> = {
  ar: [
    { id: "a1", date: "2026-06-01", author: "فريق المبادرة", title: "لماذا الصناعة الريفية المجتمعية الآن؟", excerpt: "قراءة في اللحظة التاريخية التي يمر بها السودان، والفرصة لإعادة بناء الاقتصاد من القاعدة الريفية." },
    { id: "a2", date: "2026-05-15", author: "د. الأمين", title: "الاقتصاد الدائري في المجمعات الصناعية الريفية", excerpt: "كيف تتحول النفايات الصناعية إلى مدخلات إنتاج وقيمة مضافة في النموذج المقترح." },
    { id: "a3", date: "2026-04-28", author: "م. خالد", title: "نموذج الشركة المجتمعية: الملكية والحوكمة", excerpt: "تفصيل لهيكل الملكية المجتمعية وآليات اتخاذ القرار وتوزيع الأرباح." },
  ],
  en: [
    { id: "a1", date: "2026-06-01", author: "Initiative team", title: "Why community-led rural industry, now?", excerpt: "A reading of Sudan's historic moment and the chance to rebuild the economy from its rural base." },
    { id: "a2", date: "2026-05-15", author: "Dr. Al-Amin", title: "The circular economy inside rural industrial complexes", excerpt: "How industrial by-products become inputs and added value in the proposed model." },
    { id: "a3", date: "2026-04-28", author: "Eng. Khaled", title: "The community-enterprise model: ownership and governance", excerpt: "A breakdown of community ownership structure, decision-making, and profit distribution." },
  ],
};

export const reportsByLang: Record<Lang, Report[]> = {
  ar: [
    { id: "r1", date: "2026-06-01", title: "الملف التعريفي للمبادرة", description: "نظرة شاملة على مبادرة المجمعات الصناعية الريفية المجتمعية وأركانها الستة.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 42 },
    { id: "r2", date: "2026-04-15", title: "دراسة الجدوى — محلية البرقيق", description: "تحليل اقتصادي واجتماعي للمجمع الرائد في الولاية الشمالية.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 88 },
  ],
  en: [
    { id: "r1", date: "2026-06-01", title: "Initiative Profile Document", description: "A comprehensive overview of the RSIC initiative and its six pillars.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 42 },
    { id: "r2", date: "2026-04-15", title: "Feasibility Study — Al-Burgig Locality", description: "Economic and social analysis of the flagship complex in the Northern State.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 88 },
  ],
};

async function fetchNews(lang: Lang): Promise<News[]> {
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data?.length) return newsByLang[lang];
  return data.map((r) => ({
    id: r.id,
    date: r.date,
    title: lang === "ar" ? r.title_ar : r.title_en,
    excerpt: lang === "ar" ? r.excerpt_ar : r.excerpt_en,
  }));
}

async function fetchArticles(lang: Lang): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data?.length) return articlesByLang[lang];
  return data.map((r) => ({
    id: r.id,
    date: r.date,
    author: lang === "ar" ? r.author_ar : r.author_en,
    title: lang === "ar" ? r.title_ar : r.title_en,
    excerpt: lang === "ar" ? r.excerpt_ar : r.excerpt_en,
  }));
}

async function fetchReports(lang: Lang): Promise<Report[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data?.length) return reportsByLang[lang];
  return data.map((r) => ({
    id: r.id,
    date: r.date,
    title: lang === "ar" ? r.title_ar : r.title_en,
    description: lang === "ar" ? r.description_ar : r.description_en,
    url: r.url,
    pages: r.pages,
  }));
}

export const newsQueryOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ["news", lang],
    queryFn: () => fetchNews(lang),
    initialData: newsByLang[lang],
    staleTime: 30_000,
  });

export const articlesQueryOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ["articles", lang],
    queryFn: () => fetchArticles(lang),
    initialData: articlesByLang[lang],
    staleTime: 30_000,
  });

export const reportsQueryOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ["reports", lang],
    queryFn: () => fetchReports(lang),
    initialData: reportsByLang[lang],
    staleTime: 30_000,
  });

export const social = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "X", href: "https://x.com", icon: "x" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;
