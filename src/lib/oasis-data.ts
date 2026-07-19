// Oasis Lens — national rollout dataset for the RSIC initiative.
// Projected/target data illustrating the phased expansion of Rural Social
// Industrial Complexes across Sudan's 18 states. Pilot is Al-Burgig (Northern).
// All records are bilingual; numbers are locale-formatted at render time.

import type { Lang } from "./i18n";

export type RolloutStatus = "active" | "committed" | "planned";

export type StateDatum = {
  id: string; // matches sudan-states.json id
  name_ar: string;
  name_en: string;
  status: RolloutStatus;
  localities: number;
  complexes: number; // target complexes (≈ 2 per locality)
  factories: number; // target factories across complexes
  note_ar: string;
  note_en: string;
};

// ── Per-state rollout (targets sum toward the national 189 localities / 378 complexes) ──
export const statesData: StateDatum[] = [
  { id: "northern", name_ar: "الشمالية", name_en: "Northern", status: "active", localities: 7, complexes: 14, factories: 630,
    note_ar: "موقع النموذج الأولي في محلية البرقيق — مصنع التمور الرائد قيد التنفيذ.", note_en: "Home of the pilot in Al-Burgig — the flagship dates factory is underway." },
  { id: "river-nile", name_ar: "نهر النيل", name_en: "River Nile", status: "committed", localities: 8, complexes: 16, factories: 720,
    note_ar: "المرشح التالي للتوسع؛ بنية تحتية زراعية وتعدينية قوية.", note_en: "Next expansion candidate; strong agricultural and mining base." },
  { id: "khartoum", name_ar: "الخرطوم", name_en: "Khartoum", status: "committed", localities: 7, complexes: 12, factories: 540,
    note_ar: "مركز لوجستي وتمويلي يدعم مجمعات الولايات المجاورة.", note_en: "Logistics and finance hub supporting neighboring states." },
  { id: "gezira", name_ar: "الجزيرة", name_en: "Gezira", status: "committed", localities: 8, complexes: 18, factories: 810,
    note_ar: "قلب الزراعة المروية — أولوية للصناعات الغذائية.", note_en: "Heart of irrigated agriculture — priority for food industries." },
  { id: "kassala", name_ar: "كسلا", name_en: "Kassala", status: "committed", localities: 11, complexes: 20, factories: 900,
    note_ar: "بوابة شرقية للتصدير عبر البحر الأحمر.", note_en: "Eastern gateway for export via the Red Sea." },
  { id: "red-sea", name_ar: "البحر الأحمر", name_en: "Red Sea", status: "planned", localities: 10, complexes: 16, factories: 720,
    note_ar: "منفذ التصدير الرئيسي عبر بورتسودان.", note_en: "Primary export outlet via Port Sudan." },
  { id: "gedaref", name_ar: "القضارف", name_en: "Gedaref", status: "planned", localities: 12, complexes: 22, factories: 990,
    note_ar: "سلة الغلال — تصنيع الحبوب والبذور الزيتية.", note_en: "The grain basket — cereals and oilseed processing." },
  { id: "sennar", name_ar: "سنار", name_en: "Sennar", status: "planned", localities: 7, complexes: 12, factories: 540,
    note_ar: "زراعة مروية وطاقة كهرومائية.", note_en: "Irrigated agriculture and hydropower." },
  { id: "blue-nile", name_ar: "النيل الأزرق", name_en: "Blue Nile", status: "planned", localities: 6, complexes: 10, factories: 450,
    note_ar: "موارد غابية وزراعية متنوعة.", note_en: "Diverse forestry and agricultural resources." },
  { id: "white-nile", name_ar: "النيل الأبيض", name_en: "White Nile", status: "planned", localities: 9, complexes: 16, factories: 720,
    note_ar: "ثروة حيوانية وصناعات ألبان وأعلاف.", note_en: "Livestock, dairy, and animal-feed industries." },
  { id: "north-kordofan", name_ar: "شمال كردفان", name_en: "North Kordofan", status: "planned", localities: 10, complexes: 18, factories: 810,
    note_ar: "الصمغ العربي والثروة الحيوانية.", note_en: "Gum arabic and livestock." },
  { id: "south-kordofan", name_ar: "جنوب كردفان", name_en: "South Kordofan", status: "planned", localities: 9, complexes: 14, factories: 630,
    note_ar: "قطن وحبوب وموارد معدنية.", note_en: "Cotton, grains, and mineral resources." },
  { id: "west-kordofan", name_ar: "غرب كردفان", name_en: "West Kordofan", status: "planned", localities: 8, complexes: 12, factories: 540,
    note_ar: "نفط وصمغ عربي وثروة حيوانية.", note_en: "Oil, gum arabic, and livestock." },
  { id: "north-darfur", name_ar: "شمال دارفور", name_en: "North Darfur", status: "planned", localities: 11, complexes: 18, factories: 810,
    note_ar: "ثروة حيوانية وتعدين — تكامل مع سلاسل الإمداد.", note_en: "Livestock and mining — supply-chain integration." },
  { id: "south-darfur", name_ar: "جنوب دارفور", name_en: "South Darfur", status: "planned", localities: 12, complexes: 22, factories: 990,
    note_ar: "أكبر الولايات سكاناً — فرص تشغيل واسعة.", note_en: "Most populous state — large employment opportunity." },
  { id: "central-darfur", name_ar: "وسط دارفور", name_en: "Central Darfur", status: "planned", localities: 6, complexes: 10, factories: 450,
    note_ar: "زراعة مطرية وبساتين فاكهة.", note_en: "Rain-fed agriculture and fruit orchards." },
  { id: "east-darfur", name_ar: "شرق دارفور", name_en: "East Darfur", status: "planned", localities: 6, complexes: 10, factories: 450,
    note_ar: "ثروة حيوانية وموارد نفطية.", note_en: "Livestock and petroleum resources." },
  { id: "west-darfur", name_ar: "غرب دارفور", name_en: "West Darfur", status: "planned", localities: 5, complexes: 8, factories: 360,
    note_ar: "تجارة حدودية وزراعة متنوعة.", note_en: "Cross-border trade and diverse agriculture." },
  { id: "abyei", name_ar: "أبيي", name_en: "Abyei", status: "planned", localities: 1, complexes: 2, factories: 90,
    note_ar: "منطقة خاصة — تُدرج ضمن التخطيط بعيد المدى.", note_en: "Special area — included in long-range planning." },
];

export const statusOrder: RolloutStatus[] = ["active", "committed", "planned"];

export const statusMeta: Record<RolloutStatus, { ar: string; en: string }> = {
  active: { ar: "قيد التنفيذ", en: "Active pilot" },
  committed: { ar: "التوسع التالي", en: "Committed" },
  planned: { ar: "مُخطط", en: "Planned" },
};

// ── National indices (top strip) ──
export type GlobalIndex = {
  id: string;
  label_ar: string;
  label_en: string;
  value: number | string;
  sub_ar: string;
  sub_en: string;
};

export const globalIndices: GlobalIndex[] = [
  { id: "complexes", label_ar: "المجمعات المستهدفة", label_en: "Target Complexes", value: 378, sub_ar: "عبر السودان", sub_en: "Across Sudan" },
  { id: "localities", label_ar: "المحليات", label_en: "Localities", value: 189, sub_ar: "في 18 ولاية", sub_en: "In 18 states" },
  { id: "factories", label_ar: "المصانع في الشبكة", label_en: "Network Factories", value: 17010, sub_ar: "عند اكتمال الانتشار", sub_en: "At full rollout" },
  { id: "states", label_ar: "الولايات المشمولة", label_en: "States Covered", value: 18, sub_ar: "خارطة الطريق الوطنية", sub_en: "National roadmap" },
  { id: "active", label_ar: "المشاريع النشطة", label_en: "Active Pilots", value: 1, sub_ar: "محلية البرقيق", sub_en: "Al-Burgig locality" },
];

// ── National roadmap tasks ──
export type TaskStatus = "done" | "in_progress" | "planned";
export type RoadmapTask = {
  id: string;
  phase: number;
  status: TaskStatus;
  title_ar: string;
  title_en: string;
};

export const roadmapTasks: RoadmapTask[] = [
  { id: "t1", phase: 1, status: "done", title_ar: "تخصيص أرض المجمع الرائد في البرقيق", title_en: "Pilot complex land allocated in Al-Burgig" },
  { id: "t2", phase: 1, status: "done", title_ar: "العناية الواجبة الفنية والمالية", title_en: "Technical & financial due diligence" },
  { id: "t3", phase: 1, status: "in_progress", title_ar: "تنفيذ مصنع التمور الرائد", title_en: "Build the flagship dates factory" },
  { id: "t4", phase: 1, status: "in_progress", title_ar: "تشغيل صوامع التخزين وخط التعبئة", title_en: "Commission storage silos and packaging line" },
  { id: "t5", phase: 2, status: "planned", title_ar: "توسعة إلى نهر النيل والجزيرة وكسلا", title_en: "Expand to River Nile, Gezira, and Kassala" },
  { id: "t6", phase: 2, status: "planned", title_ar: "إطلاق مركز التدريب الصناعي الإقليمي", title_en: "Launch the regional industrial training center" },
  { id: "t7", phase: 3, status: "planned", title_ar: "الانتشار الوطني: 378 مجمعاً في 189 محلية", title_en: "National rollout: 378 complexes across 189 localities" },
  { id: "t8", phase: 4, status: "planned", title_ar: "نقل النموذج إلى دول الجنوب العالمي", title_en: "Transfer the model to Global South countries" },
];

export const roadmapPhases: { phase: number; ar: string; en: string }[] = [
  { phase: 1, ar: "المرحلة التجريبية", en: "Pilot Phase" },
  { phase: 2, ar: "التنوع الولائي", en: "State-Level Diversification" },
  { phase: 3, ar: "الانتشار الوطني", en: "National Rollout" },
  { phase: 4, ar: "التوسع على مستوى الأمة", en: "Nation-Scale Expansion" },
];

// ── Helpers ──
export function pickName<T extends { name_ar: string; name_en: string }>(item: T, lang: Lang) {
  return lang === "ar" ? item.name_ar : item.name_en;
}

export function pickText(item: { ar: string; en: string }, lang: Lang) {
  return lang === "ar" ? item.ar : item.en;
}

export function fmtNum(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(n);
}

const byId = new Map(statesData.map((s) => [s.id, s]));
export function stateById(id: string) {
  return byId.get(id);
}

export const rolloutTotals = {
  complexes: statesData.reduce((a, s) => a + s.complexes, 0),
  factories: statesData.reduce((a, s) => a + s.factories, 0),
  localities: statesData.reduce((a, s) => a + s.localities, 0),
};
