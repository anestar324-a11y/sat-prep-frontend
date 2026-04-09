import { useState, useEffect, useRef } from "react";
import { LoginPage, RegisterPage } from "./AuthPages";
import AdminPanel from "./AdminPanel";
/* ─── colour tokens ─── */
const T = {
  bg: "#F7F8FA",
  card: "#FFFFFF",
  primary: "#3B6BF5",
  primaryLight: "#EBF0FF",
  accent: "#FFCC00",
  accentLight: "#FFF8DC",
  text: "#1A1D26",
  textSec: "#6B7280",
  textTer: "#9CA3AF",
  border: "#E5E7EB",
  success: "#22C55E",
  successLight: "#ECFDF5",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  orange: "#F97316",
  orangeLight: "#FFF7ED",
};

/* ─── icon components ─── */
const Icon = ({ name, size = 20, color = T.textSec }) => {
  const s = { width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" };
  const icons = {
    home: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    book: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    test: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    topic: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    flash: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/></svg>,
    user: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    settings: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    logout: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    chevron: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    fire: <span style={{ fontSize: size }}>🔥</span>,
    wave: <span style={{ fontSize: size }}>👋</span>,
    star: <svg style={s} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    clock: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    play: <svg style={s} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    lock: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    arrow: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    target: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    refresh: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    news: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/><line x1="7" y1="8" x2="13" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><line x1="7" y1="16" x2="9" y2="16"/></svg>,
    bulb: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>,
    shield: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    info: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    bookmark: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
  };
  return icons[name] || null;
};

/* ─── data ─── */
const mathTopics = [
  { id: 1, name: "Heart of Algebra", desc: "Linear equations, inequalities, systems", lessons: 12, progress: 75 },
  { id: 2, name: "Problem Solving & Data", desc: "Ratios, percentages, data interpretation", lessons: 10, progress: 40 },
  { id: 3, name: "Passport to Advanced Math", desc: "Quadratics, polynomials, exponentials", lessons: 14, progress: 20 },
  { id: 4, name: "Additional Topics", desc: "Geometry, trigonometry, complex numbers", lessons: 8, progress: 0 },
];

const rwTopics = [
  { id: 5, name: "Reading Comprehension", desc: "Main idea, inference, evidence", lessons: 10, progress: 60 },
  { id: 6, name: "Vocabulary in Context", desc: "Word meaning, tone, purpose", lessons: 8, progress: 85 },
  { id: 7, name: "Standard English Conventions", desc: "Grammar, punctuation, sentence structure", lessons: 12, progress: 30 },
  { id: 8, name: "Expression of Ideas", desc: "Organization, development, effective language", lessons: 9, progress: 10 },
];

const practiceTests = [
  { id: 1, name: "Practice Test 1", completed: true, score: 1420, date: "2026-03-20" },
  { id: 2, name: "Practice Test 2", completed: true, score: 1380, date: "2026-03-27" },
  { id: 3, name: "Practice Test 3", completed: false, score: null, date: null },
  { id: 4, name: "Practice Test 4", completed: false, score: null, date: null },
  { id: 5, name: "Practice Test 5", completed: false, score: null, date: null },
  { id: 6, name: "Practice Test 6", completed: false, score: null, date: null },
];

const topicTests = {
  math: [
    { id: "m1", name: "Linear Equations", difficulty: "Easy", questions: 15, bestScore: 14, emoji: "📐" },
    { id: "m2", name: "Systems of Equations", difficulty: "Medium", questions: 15, bestScore: 12, emoji: "📊" },
    { id: "m3", name: "Quadratic Functions", difficulty: "Hard", questions: 15, bestScore: null, emoji: "📈" },
    { id: "m4", name: "Ratios & Proportions", difficulty: "Easy", questions: 15, bestScore: 15, emoji: "⚖️" },
    { id: "m5", name: "Percentages & Data", difficulty: "Medium", questions: 15, bestScore: null, emoji: "📉" },
    { id: "m6", name: "Polynomials", difficulty: "Hard", questions: 15, bestScore: 10, emoji: "🔢" },
    { id: "m7", name: "Geometry Basics", difficulty: "Easy", questions: 15, bestScore: null, emoji: "📏" },
    { id: "m8", name: "Trigonometry", difficulty: "Hard", questions: 15, bestScore: null, emoji: "📐" },
  ],
  english: [
    { id: "e1", name: "Main Idea & Purpose", difficulty: "Easy", questions: 15, bestScore: 13, emoji: "📖" },
    { id: "e2", name: "Inference & Evidence", difficulty: "Medium", questions: 15, bestScore: 11, emoji: "🔍" },
    { id: "e3", name: "Vocabulary in Context", difficulty: "Easy", questions: 15, bestScore: 14, emoji: "📝" },
    { id: "e4", name: "Grammar & Punctuation", difficulty: "Medium", questions: 15, bestScore: null, emoji: "✏️" },
    { id: "e5", name: "Sentence Structure", difficulty: "Hard", questions: 15, bestScore: 9, emoji: "🏗️" },
    { id: "e6", name: "Rhetorical Synthesis", difficulty: "Hard", questions: 15, bestScore: null, emoji: "🎯" },
  ],
};

const flashcardDecks = {
  math: [
    { id: "fm1", name: "Algebra Essentials", difficulty: "Easy", cards: 40, mastered: 32, emoji: "➕" },
    { id: "fm2", name: "Geometry Terms", difficulty: "Easy", cards: 30, mastered: 20, emoji: "📐" },
    { id: "fm3", name: "Statistics Vocab", difficulty: "Medium", cards: 35, mastered: 10, emoji: "📊" },
    { id: "fm4", name: "Advanced Functions", difficulty: "Hard", cards: 45, mastered: 5, emoji: "📈" },
  ],
  english: [
    { id: "fe1", name: "Common SAT Words", difficulty: "Easy", cards: 50, mastered: 40, emoji: "📚" },
    { id: "fe2", name: "Academic Vocabulary", difficulty: "Medium", cards: 60, mastered: 25, emoji: "🎓" },
    { id: "fe3", name: "Advanced Vocabulary", difficulty: "Hard", cards: 50, mastered: 8, emoji: "💎" },
    { id: "fe4", name: "Context Clue Words", difficulty: "Medium", cards: 40, mastered: 15, emoji: "🔎" },
    { id: "fe5", name: "Tone & Rhetoric", difficulty: "Hard", cards: 35, mastered: 3, emoji: "🎭" },
  ],
};

const sampleFlashcards = [
  { front: "Ephemeral", back: "Lasting for a very short time", example: "The ephemeral beauty of cherry blossoms draws millions of visitors each spring." },
  { front: "Ubiquitous", back: "Present, appearing, or found everywhere", example: "Smartphones have become ubiquitous in modern society." },
  { front: "Pragmatic", back: "Dealing with things sensibly and realistically", example: "She took a pragmatic approach to solving the budget crisis." },
  { front: "Ambivalent", back: "Having mixed feelings or contradictory ideas", example: "He felt ambivalent about leaving his hometown for the new job." },
  { front: "Benevolent", back: "Well meaning and kindly", example: "The benevolent donor funded scholarships for underprivileged students." },
];

const newsArticles = [
  {
    id: 1, category: "tips", categoryLabel: "Зөвлөгөө", emoji: "💡",
    title: "SAT шалгалтын өдөр анхаарах 10 чухал зүйл",
    summary: "Шалгалтын өдрийн бэлтгэл, авч явах зүйлс, цаг хуваарилалт зэрэг шалгалтанд амжилттай орох бүх зөвлөгөөг нэгтгэв.",
    date: "2026-04-05", readTime: "5 мин", pinned: true,
    content: [
      { type: "heading", text: "1. Шалгалтын өмнөх орой" },
      { type: "text", text: "Шалгалтын өмнөх орой эрт унтаж, хангалттай нойр авах нь маш чухал. Хамгийн багадаа 8 цаг унтах хэрэгтэй. Шөнөжин хичээл давтах нь тархины ажиллагаанд сөрөг нөлөөтэй." },
      { type: "heading", text: "2. Авч явах зүйлс" },
      { type: "text", text: "Бүртгэлийн хуудас (Admission Ticket), зургийн үнэмлэх, хэд хэдэн No.2 харандаа, баллуур, тооны машин (зөвшөөрөгдсөн загвар), цаг (гар утас биш), ус болон хөнгөн зууш авч яваарай." },
      { type: "heading", text: "3. Цаг хуваарилалт" },
      { type: "text", text: "Reading & Writing хэсэг 64 минут (2 модуль, модуль тус бүр 32 минут), Math хэсэг 70 минут (2 модуль, модуль тус бүр 35 минут). Нэг асуулт дээр хэт удаан зогсохгүй байх нь чухал." },
      { type: "heading", text: "4. Тооны машин ашиглалт" },
      { type: "text", text: "Зөвхөн Math хэсгийн 2-р модульд тооны машин ашиглах боломжтой. Desmos тооны машин Bluebook апп дотор суулгагдсан байгаа." },
      { type: "heading", text: "5. Стресс менежмент" },
      { type: "text", text: "Гүн амьсгалын дасгал хийж, тайван байлгах хэрэгтэй. Нэг асуулт мэдэхгүй бол дараагийнх руу шилжиж, дараа нь буцаж ирж болно." },
    ],
  },
  {
    id: 2, category: "news", categoryLabel: "Мэдээ", emoji: "📰",
    title: "2026 оны SAT шалгалтын хуваарь гарлаа",
    summary: "College Board 2026 оны SAT шалгалтын хуваарийг зарлалаа. Монголоос өгөх боломжтой огноо, бүртгэлийн хугацааг харна уу.",
    date: "2026-04-01", readTime: "3 мин", pinned: true,
    content: [
      { type: "heading", text: "2026 оны шалгалтын огноонууд" },
      { type: "text", text: "2026 оны 5-р сарын 2, 6-р сарын 6, 8-р сарын 22, 10-р сарын 3, 11-р сарын 7, 12-р сарын 5 гэсэн огноонуудад SAT шалгалт зохион байгуулагдах юм." },
      { type: "heading", text: "Бүртгэлийн хугацаа" },
      { type: "text", text: "Шалгалт өгөхөөс ойролцоогоор 5 долоо хоногийн өмнө бүртгүүлэх ёстой. Хоцрогдсон бүртгэлд нэмэлт хураамж төлнө." },
    ],
  },
  {
    id: 3, category: "strategy", categoryLabel: "Стратеги", emoji: "🎯",
    title: "SAT Math-д 800 оноо авах стратеги",
    summary: "Математикийн хэсэгт хамгийн дээд оноо авахын тулд ямар стратеги баримтлах вэ? Шилдэг оюутнуудын туршлагаас суралцъя.",
    date: "2026-03-28", readTime: "7 мин", pinned: false,
    content: [
      { type: "heading", text: "Алдаагүй ажиллах нь түлхүүр" },
      { type: "text", text: "800 оноо авахын тулд бараг бүх асуултад зөв хариулах шаардлагатай. 1-2 алдаатай байж болох ч түүнээс илүүгүй. Тиймээс хурдаас илүүтэй нарийвчлалд анхаарах хэрэгтэй." },
      { type: "heading", text: "Хоёр удаа шалгах систем" },
      { type: "text", text: "Эхлээд бүх асуултыг нэг удаа бодоод, дараа нь буцаж шалгах нь маш үр дүнтэй. Ялангуяа энгийн асуултуудад анхааралгүйн алдаа гаргахаас зайлсхийх хэрэгтэй." },
      { type: "heading", text: "Plug-in стратеги" },
      { type: "text", text: "Хариултын сонголтуудыг тэгшитгэлд орлуулж шалгах нь олон тохиолдолд алгебрийн бодолтоос хурдан байдаг." },
    ],
  },
  {
    id: 4, category: "tips", categoryLabel: "Зөвлөгөө", emoji: "📖",
    title: "Reading хэсэгт цагаа хэрхэн зөв хуваарилах вэ",
    summary: "Олон оюутан Reading хэсэгт цаг дутагдалтай байдаг. Цагийг үр ашигтай хуваарилах аргуудыг танилцуулж байна.",
    date: "2026-03-25", readTime: "4 мин", pinned: false,
    content: [
      { type: "heading", text: "Модуль бүрт 32 минут" },
      { type: "text", text: "Reading & Writing хэсгийн модуль бүрд 27 асуулт, 32 минутын хугацаа байдаг. Дунджаар нэг асуултад 1 минут 11 секунд ногддог." },
      { type: "heading", text: "Хялбар асуултуудыг эхэлж хийх" },
      { type: "text", text: "Vocabulary, grammar асуултуудыг эхлээд хийж, хамгийн хүнд passage-based асуултуудыг сүүлд хийх нь зөв стратеги юм." },
    ],
  },
  {
    id: 5, category: "news", categoryLabel: "Мэдээ", emoji: "🔄",
    title: "Digital SAT шинэчлэл: 2026 онд юу өөрчлөгдсөн бэ?",
    summary: "College Board Digital SAT-д хэд хэдэн өөрчлөлт оруулсан. Adaptive testing систем, шинэ асуултын төрлүүд зэрэг мэдээллийг уншина уу.",
    date: "2026-03-20", readTime: "6 мин", pinned: false,
    content: [
      { type: "heading", text: "Adaptive Testing" },
      { type: "text", text: "Digital SAT нь adaptive буюу дасан зохицох тест юм. 1-р модульд таны гүйцэтгэлээс хамаарч 2-р модулийн хүндийн зэрэг тодорхойлогддог." },
      { type: "heading", text: "Шинэ асуултын төрлүүд" },
      { type: "text", text: "2026 оноос эхлэн хэд хэдэн шинэ формат бүхий асуултууд нэмэгдсэн. Drag-and-drop, highlight text зэрэг интерактив асуултууд байна." },
    ],
  },
  {
    id: 6, category: "strategy", categoryLabel: "Стратеги", emoji: "✍️",
    title: "Writing хэсэгт байнга гардаг 5 алдааны төрөл",
    summary: "Grammar алдааны хамгийн түгээмэл 5 төрлийг таньж, зөв хариулах аргыг сурна уу.",
    date: "2026-03-15", readTime: "5 мин", pinned: false,
    content: [
      { type: "heading", text: "1. Subject-Verb Agreement" },
      { type: "text", text: "Хамгийн түгээмэл алдааны нэг бол subject (өгүүлэгдэхүүн) болон verb (өгүүлэхүүн)-ийн тоо таарахгүй байх явдал юм." },
      { type: "heading", text: "2. Pronoun Reference" },
      { type: "text", text: "Pronoun (төлөөний нэр) нь ямар noun-г заагаад байгаа нь тодорхой байх ёстой. Хэд хэдэн noun байвал pronoun нь ambiguous болно." },
    ],
  },
];

/* ─── helpers ─── */
const diffColor = (d) => d === "Easy" ? T.success : d === "Medium" ? T.orange : T.danger;
const diffBg = (d) => d === "Easy" ? T.successLight : d === "Medium" ? T.orangeLight : T.dangerLight;

/* ─── styles ─── */
const S = {
  app: { display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', 'Noto Sans', sans-serif", background: T.bg, color: T.text },
  sidebar: {
    width: 260, background: T.card, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column",
    padding: "24px 0", position: "fixed", height: "100vh", zIndex: 100, transition: "transform 0.3s ease",
  },
  logo: { display: "flex", alignItems: "center", gap: 12, padding: "0 24px", marginBottom: 32 },
  logoIcon: {
    width: 44, height: 44, borderRadius: 12, background: T.primary, display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "'Space Grotesk', monospace",
  },
  logoText: { fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px" },
  logoSub: { fontSize: 10, fontWeight: 600, color: T.accent, letterSpacing: "1.5px", textTransform: "uppercase" },
  navItem: (active) => ({
    display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", cursor: "pointer",
    background: active ? T.primaryLight : "transparent", color: active ? T.primary : T.textSec,
    fontWeight: active ? 600 : 500, fontSize: 15, borderRight: active ? `3px solid ${T.primary}` : "3px solid transparent",
    transition: "all 0.2s ease",
  }),
  main: { flex: 1, marginLeft: 260, padding: "32px 40px", maxWidth: 1200 },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 },
  greeting: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.2 },
  subGreeting: { color: T.textSec, fontSize: 15, marginTop: 6 },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 6, background: T.accentLight, color: "#B8860B",
    padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 12,
  },
  dateBox: {
    display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1px solid ${T.border}`,
    borderRadius: 12, padding: "10px 16px", fontSize: 14, color: T.textSec,
  },
  satCountdown: {
    background: `linear-gradient(135deg, ${T.primary}, #2451D4)`, color: "#fff", borderRadius: 14,
    padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, marginTop: 12,
  },
  countdownNum: {
    width: 48, height: 48, borderRadius: "50%", background: T.accent, color: T.text,
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20,
  },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 36 },
  statCard: {
    background: T.card, borderRadius: 16, padding: "24px", border: `1px solid ${T.border}`,
    transition: "box-shadow 0.2s ease",
  },
  statLabel: { fontSize: 12, fontWeight: 600, color: T.textSec, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 12 },
  statValue: { fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginTop: 4 },
  statSub: { fontSize: 14, color: T.textSec, marginTop: 2 },
  growthBadge: {
    display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 12,
    background: T.successLight, color: T.success, fontSize: 12, fontWeight: 600,
  },
  sectionTitle: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 20 },
  card: {
    background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24,
    cursor: "pointer", transition: "all 0.2s ease",
  },
  btn: (variant = "primary") => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: variant === "sm" ? "8px 16px" : "12px 24px", borderRadius: 12, border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: variant === "sm" ? 13 : 15, fontFamily: "inherit",
    background: variant === "outline" ? "transparent" : variant === "accent" ? T.accent : T.primary,
    color: variant === "outline" ? T.primary : variant === "accent" ? T.text : "#fff",
    border: variant === "outline" ? `2px solid ${T.primary}` : "none",
    transition: "all 0.2s ease",
  }),
  progressBar: (pct, color = T.primary) => ({
    height: 6, borderRadius: 3, background: T.border, position: "relative", overflow: "hidden",
    _fill: { height: "100%", borderRadius: 3, background: color, width: `${pct}%`, transition: "width 0.5s ease" },
  }),
  tag: (bg, color) => ({
    display: "inline-flex", padding: "4px 12px", borderRadius: 8, fontSize: 12,
    fontWeight: 600, background: bg, color: color,
  }),
  flashcardOuter: {
    width: "100%", maxWidth: 480, height: 300, perspective: 1000, cursor: "pointer", margin: "0 auto",
  },
  flashcardInner: (flipped) => ({
    width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d",
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
  }),
  flashcardFace: (back) => ({
    position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
    borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: 32, textAlign: "center",
    background: back ? `linear-gradient(135deg, ${T.primary}, #2451D4)` : T.card,
    color: back ? "#fff" : T.text, border: back ? "none" : `2px solid ${T.border}`,
    transform: back ? "rotateY(180deg)" : "rotateY(0)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  }),
};

/* ─── ProgressBar component ─── */
const ProgressBar = ({ pct, color = T.primary, height = 6 }) => (
  <div style={{ height, borderRadius: height / 2, background: T.border, overflow: "hidden" }}>
    <div style={{ height: "100%", borderRadius: height / 2, background: color, width: `${pct}%`, transition: "width 0.6s ease" }} />
  </div>
);

/* ─── PAGES ─── */

/* HOME PAGE */
const HomePage = () => {
  const today = new Date();
  const satDate = new Date(2026, 4, 2);
  const daysLeft = Math.ceil((satDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <div style={S.topBar}>
        <div>
          <div style={S.badge}>⊕ ШИНЭ АМЖИЛТ!</div>
          <div style={S.greeting}>Сайн байна уу, Бат! <Icon name="wave" size={32} /></div>
          <div style={S.subGreeting}>Өнөөдөр суралцахад таатай өдөр байна.</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={S.dateBox}>
            <Icon name="calendar" size={16} />
            {today.toLocaleDateString("mn-MN", { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <div style={S.satCountdown}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px", opacity: 0.8, textTransform: "uppercase" }}>Дараагийн SAT</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>2026 оны 5-р сарын 2</div>
            </div>
            <div style={S.countdownNum}>{daysLeft}</div>
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>өдөр</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={S.statsRow}>
        <div style={S.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="target" size={22} color={T.primary} />
            </div>
            <div style={S.growthBadge}>+12% өсөлт</div>
          </div>
          <div style={S.statLabel}>Сүүлийн оноо</div>
          <div style={S.statValue}>1420 <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>/ 1600</span></div>
        </div>
        <div style={S.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.orangeLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="fire" size={22} />
            </div>
            <div style={{ width: 44, height: 24, borderRadius: 12, background: T.primary, position: "relative" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", right: 3, top: 3 }} />
            </div>
          </div>
          <div style={S.statLabel}>Суралцсан хоног</div>
          <div style={S.statValue}>14 <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>өдөр дараалан</span> <Icon name="fire" size={20} /></div>
        </div>
        <div style={S.statCard}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: T.successLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="check" size={22} color={T.success} />
          </div>
          <div style={S.statLabel}>Үзсэн хичээл</div>
          <div style={S.statValue}>42 <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>нийт 120-оос</span></div>
          <div style={{ marginTop: 8 }}><ProgressBar pct={35} /></div>
        </div>
      </div>

      {/* Continue learning & Word bank */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 4, height: 24, borderRadius: 2, background: T.accent }} />
              <span style={{ fontSize: 18, fontWeight: 700 }}>Үргэлжлүүлэн үзэх</span>
            </div>
            <span style={{ color: T.primary, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Бүгдийг үзэх →</span>
          </div>
          {[
            { title: "Heart of Algebra - Linear Equations", topic: "SAT Math", progress: 75, duration: "12 мин" },
            { title: "Vocabulary in Context - Lesson 6", topic: "SAT Reading", progress: 45, duration: "8 мин" },
          ].map((item, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: i === 0 ? "linear-gradient(135deg, #1e1e2e, #2d2d3d)" : "linear-gradient(135deg, #1a365d, #2a4a7f)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="play" size={24} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.primary, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.topic}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{item.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <ProgressBar pct={item.progress} />
                  <span style={{ fontSize: 12, color: T.textSec, whiteSpace: "nowrap" }}>{item.progress}%</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.textSec, fontSize: 13 }}>
                <Icon name="clock" size={14} color={T.textSec} /> {item.duration}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Үгсийн сан</span>
            <span style={{ color: T.primary, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Бүх карт →</span>
          </div>
          <div style={{ ...S.card, textAlign: "center", padding: 32 }}>
            <div style={S.tag(T.dangerLight, T.danger)}>LEVEL: ADVANCED</div>
            <div style={{ fontSize: 42, fontWeight: 700, marginTop: 20, fontFamily: "'Playfair Display', serif" }}>Ephemeral</div>
            <div style={{ color: T.textSec, marginTop: 8, fontStyle: "italic", fontSize: 16 }}>/ɪˈfɛm(ə)r(ə)l/</div>
            <div style={{ marginTop: 16, color: T.textSec, fontSize: 14 }}>Lasting for a very short time</div>
            <button style={{ ...S.btn("accent"), marginTop: 20, width: "100%" }}>
              <Icon name="refresh" size={16} color={T.text} /> Дараагийн үг
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* LESSONS PAGE */
const LessonsPage = () => {
  const [tab, setTab] = useState("math");
  const topics = tab === "math" ? mathTopics : rwTopics;

  return (
    <div>
      <div style={S.sectionTitle}>Хичээлүүд</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["math", "SAT Math"], ["rw", "SAT Reading & Writing"]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            ...S.btn(tab === k ? "primary" : "outline"),
            borderRadius: 24, fontSize: 14,
          }}>{label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {topics.map((t) => (
          <div key={t.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: t.progress > 0 ? `linear-gradient(135deg, ${T.primary}, #2451D4)` : T.border,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: t.progress > 0 ? "#fff" : T.textSec, fontSize: 24, fontWeight: 700,
            }}>
              {t.progress > 0 ? `${t.progress}%` : <Icon name="lock" size={24} color={T.textSec} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: T.textSec, marginTop: 4 }}>{t.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                <div style={{ flex: 1 }}><ProgressBar pct={t.progress} /></div>
                <span style={{ fontSize: 12, color: T.textSec }}>{t.lessons} хичээл</span>
              </div>
            </div>
            <button style={S.btn(t.progress > 0 ? "primary" : "outline")}>
              {t.progress > 0 ? "Үргэлжлүүлэх" : "Эхлэх"} <Icon name="chevron" size={16} color={t.progress > 0 ? "#fff" : T.primary} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* PRACTICE TEST PAGE */
const PracticeTestPage = () => {
  const [modal, setModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const startTest = (test) => {
    setSelectedTest(test);
    setModal(true);
  };

  return (
    <div>
      <div style={S.sectionTitle}>SAT Full Practice Test</div>
      <div style={{
        background: `linear-gradient(135deg, ${T.primary}, #1a3a8a)`, borderRadius: 20, padding: 32,
        color: "#fff", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Bluebook шиг бүрэн шалгалт</div>
          <div style={{ opacity: 0.8, marginTop: 8, maxWidth: 500, lineHeight: 1.6 }}>
            Бодит SAT шалгалтын бүтэц, хугацаатай адилхан бэлтгэлийн шалгалт. Reading & Writing болон Math хэсгүүдийг тусад нь эсвэл хоёуланг зэрэг хийх боломжтой.
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 800 }}>6</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>нийт тест</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {practiceTests.map((t) => (
          <div key={t.id} style={{ ...S.card, position: "relative", overflow: "hidden" }}>
            {t.completed && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <div style={{ ...S.tag(T.successLight, T.success) }}>✓ Дууссан</div>
              </div>
            )}
            <div style={{ fontSize: 13, fontWeight: 600, color: T.primary, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Practice Test
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{t.name}</div>
            {t.completed ? (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, color: T.textSec }}>Оноо</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: T.primary }}>{t.score} <span style={{ fontSize: 14, color: T.textSec, fontWeight: 400 }}>/ 1600</span></div>
                <div style={{ fontSize: 12, color: T.textSec, marginTop: 4 }}>{t.date}</div>
                <button style={{ ...S.btn("outline"), width: "100%", marginTop: 16 }}>Дахин өгөх</button>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 14, color: T.textSec, marginBottom: 16 }}>~3 цаг 15 минут</div>
                <button onClick={() => startTest(t)} style={{ ...S.btn(), width: "100%" }}>
                  Эхлэх <Icon name="arrow" size={16} color="#fff" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000,
        }} onClick={() => setModal(false)}>
          <div style={{
            background: T.card, borderRadius: 24, padding: 40, maxWidth: 480, width: "90%",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Шалгалт эхлүүлэх</div>
            <div style={{ color: T.textSec, marginBottom: 24 }}>{selectedTest?.name} - Ямар хэсгийг хийх вэ?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Reading & Writing", desc: "64 минут, 54 асуулт", icon: "book" },
                { label: "Mathematics", desc: "70 минут, 44 асуулт", icon: "target" },
                { label: "Бүтэн шалгалт", desc: "~3 цаг 15 мин, 98 асуулт", icon: "test" },
              ].map((opt, i) => (
                <button key={i} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  borderRadius: 14, border: `2px solid ${T.border}`, background: T.bg,
                  cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.2s",
                }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.background = T.primaryLight; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bg; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: T.primaryLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name={opt.icon} size={22} color={T.primary} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: T.textSec, marginTop: 2 }}>{opt.desc}</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}><Icon name="chevron" size={18} color={T.textSec} /></div>
                </button>
              ))}
            </div>
            <button onClick={() => setModal(false)} style={{
              marginTop: 20, width: "100%", padding: "12px", borderRadius: 12, border: "none",
              background: T.bg, color: T.textSec, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>Буцах</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* TOPIC TESTS PAGE */
const TopicTestsPage = () => {
  const [tab, setTab] = useState("math");
  const [diff, setDiff] = useState("All");
  const tests = topicTests[tab];
  const filtered = diff === "All" ? tests : tests.filter((t) => t.difficulty === diff);

  return (
    <div>
      <div style={S.sectionTitle}>Сэдэвчилсэн тестүүд</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[["math", "Математик"], ["english", "English"]].map(([k, label]) => (
            <button key={k} onClick={() => { setTab(k); setDiff("All"); }} style={{
              ...S.btn(tab === k ? "primary" : "outline"), borderRadius: 24,
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button key={d} onClick={() => setDiff(d)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              background: diff === d ? T.text : T.bg, color: diff === d ? "#fff" : T.textSec,
              fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            }}>{d === "All" ? "Бүгд" : d}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((t) => (
          <div key={t.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 32 }}>{t.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{t.name}</span>
                <span style={S.tag(diffBg(t.difficulty), diffColor(t.difficulty))}>{t.difficulty}</span>
              </div>
              <div style={{ fontSize: 13, color: T.textSec, marginTop: 4 }}>{t.questions} асуулт</div>
              {t.bestScore !== null && (
                <div style={{ fontSize: 13, color: T.success, fontWeight: 600, marginTop: 4 }}>
                  Шилдэг оноо: {t.bestScore}/{t.questions}
                </div>
              )}
            </div>
            <button style={S.btn(t.bestScore !== null ? "outline" : "primary")}>
              {t.bestScore !== null ? "Дахин" : "Эхлэх"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* FLASHCARDS PAGE */
const FlashcardsPage = () => {
  const [tab, setTab] = useState("english");
  const [diff, setDiff] = useState("All");
  const [practicing, setPracticing] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const decks = flashcardDecks[tab];
  const filtered = diff === "All" ? decks : decks.filter((d) => d.difficulty === diff);

  if (practicing) {
    const card = sampleFlashcards[cardIndex];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <button onClick={() => { setPracticing(false); setCardIndex(0); setFlipped(false); }} style={S.btn("outline")}>
            ← Буцах
          </button>
          <span style={{ fontSize: 15, fontWeight: 600, color: T.textSec }}>
            {cardIndex + 1} / {sampleFlashcards.length}
          </span>
        </div>
        <div style={{ marginBottom: 8 }}><ProgressBar pct={((cardIndex + 1) / sampleFlashcards.length) * 100} color={T.accent} height={4} /></div>
        <div style={{ marginTop: 40 }}>
          <div style={S.flashcardOuter} onClick={() => setFlipped(!flipped)}>
            <div style={S.flashcardInner(flipped)}>
              <div style={S.flashcardFace(false)}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.primary, marginBottom: 16 }}>TERM</div>
                <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{card.front}</div>
                <div style={{ fontSize: 14, color: T.textSec, marginTop: 24 }}>Карт дээр дарж утгыг харах</div>
              </div>
              <div style={S.flashcardFace(true)}>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.8, marginBottom: 12 }}>DEFINITION</div>
                <div style={{ fontSize: 26, fontWeight: 600 }}>{card.back}</div>
                <div style={{
                  marginTop: 24, padding: "12px 20px", borderRadius: 12,
                  background: "rgba(255,255,255,0.15)", fontSize: 14, lineHeight: 1.5, fontStyle: "italic",
                }}>"{card.example}"</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <button onClick={() => { setFlipped(false); setCardIndex(Math.max(0, cardIndex - 1)); }}
              disabled={cardIndex === 0}
              style={{ ...S.btn("outline"), opacity: cardIndex === 0 ? 0.4 : 1 }}>
              ← Өмнөх
            </button>
            <button style={{ ...S.btn("accent"), minWidth: 80 }}>Мэднэ ✓</button>
            <button style={{ ...S.btn(), background: T.danger, minWidth: 80 }}>Мэдэхгүй ✗</button>
            <button onClick={() => { setFlipped(false); setCardIndex(Math.min(sampleFlashcards.length - 1, cardIndex + 1)); }}
              disabled={cardIndex === sampleFlashcards.length - 1}
              style={{ ...S.btn("outline"), opacity: cardIndex === sampleFlashcards.length - 1 ? 0.4 : 1 }}>
              Дараах →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={S.sectionTitle}>Flashcards</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[["english", "English"], ["math", "Математик"]].map(([k, label]) => (
            <button key={k} onClick={() => { setTab(k); setDiff("All"); }} style={{
              ...S.btn(tab === k ? "primary" : "outline"), borderRadius: 24,
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button key={d} onClick={() => setDiff(d)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              background: diff === d ? T.text : T.bg, color: diff === d ? "#fff" : T.textSec,
              fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            }}>{d === "All" ? "Бүгд" : d}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((d) => (
          <div key={d.id} style={S.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 32 }}>{d.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{d.name}</span>
                  <span style={S.tag(diffBg(d.difficulty), diffColor(d.difficulty))}>{d.difficulty}</span>
                </div>
                <div style={{ fontSize: 13, color: T.textSec, marginTop: 4 }}>
                  {d.mastered}/{d.cards} цээжилсэн
                </div>
              </div>
            </div>
            <ProgressBar pct={(d.mastered / d.cards) * 100} color={diffColor(d.difficulty)} />
            <button onClick={() => setPracticing(true)} style={{ ...S.btn(), width: "100%", marginTop: 16 }}>
              Дадлага хийх <Icon name="arrow" size={16} color="#fff" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* PROFILE PAGE */
const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Бат", phone: "+976 9911 2233", email: "bat@example.com", plan: "Premium",
  });

  return (
    <div>
      <div style={S.sectionTitle}>Миний бүртгэл</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Personal Info */}
        <div style={{ ...S.card, gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 700, color: "#fff",
            }}>Б</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.name}</div>
              <div style={{ fontSize: 14, color: T.textSec }}>Premium гишүүн</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { label: "Нэр", value: profile.name, key: "name" },
              { label: "Утасны дугаар", value: profile.phone, key: "phone" },
              { label: "Имэйл хаяг", value: profile.email, key: "email" },
            ].map((f) => (
              <div key={f.key}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{f.label}</div>
                <input
                  value={f.value}
                  onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${T.border}`,
                    fontSize: 15, fontFamily: "inherit", background: T.bg, outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = T.primary}
                  onBlur={(e) => e.target.style.borderColor = T.border}
                />
              </div>
            ))}
          </div>
          <button style={{ ...S.btn(), marginTop: 24 }}>Хадгалах</button>
        </div>

        {/* Subscription */}
        <div style={S.card}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Subscription</div>
          <div style={{
            background: `linear-gradient(135deg, ${T.primary}, #1a3a8a)`, borderRadius: 16, padding: 24, color: "#fff",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8 }}>Одоогийн төлөвлөгөө</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>Premium</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>Бүх хичээл, тест, flashcard нээлттэй</div>
            <div style={{ fontSize: 13, marginTop: 12, opacity: 0.7 }}>Дуусах: 2026.12.31</div>
          </div>
          <button style={{ ...S.btn("outline"), width: "100%", marginTop: 16 }}>Төлөвлөгөө өөрчлөх</button>
        </div>

        {/* Statistics */}
        <div style={S.card}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Статистик</div>
          {[
            { label: "Нийт суралцсан цаг", value: "48 цаг" },
            { label: "Дууссан тест", value: "2 / 6" },
            { label: "Flashcard цээжилсэн", value: "158 / 340" },
            { label: "Дундаж оноо", value: "1400" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "12px 0",
              borderBottom: i < 3 ? `1px solid ${T.border}` : "none",
            }}>
              <span style={{ color: T.textSec, fontSize: 14 }}>{s.label}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ gridColumn: "1 / -1" }}>
          <button style={{
            ...S.btn("outline"), color: T.danger, borderColor: T.danger, width: "auto",
          }}>
            <Icon name="logout" size={18} color={T.danger} /> Гарах
          </button>
        </div>
      </div>
    </div>
  );
};

/* NEWS PAGE */
const NewsPage = () => {
  const [filter, setFilter] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const catColors = {
    tips: { bg: T.accentLight, color: "#B8860B", icon: "bulb" },
    news: { bg: T.primaryLight, color: T.primary, icon: "news" },
    strategy: { bg: T.orangeLight, color: T.orange, icon: "target" },
  };

  const filtered = filter === "all" ? newsArticles : newsArticles.filter((a) => a.category === filter);
  const pinned = newsArticles.filter((a) => a.pinned);

  if (selectedArticle) {
    const a = selectedArticle;
    const cc = catColors[a.category];
    return (
      <div>
        <button onClick={() => setSelectedArticle(null)} style={{ ...S.btn("outline"), marginBottom: 24 }}>
          ← Буцах
        </button>
        <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
          {/* Article header banner */}
          <div style={{
            background: `linear-gradient(135deg, ${cc.bg}, ${T.card})`, padding: "40px 40px 32px",
            borderBottom: `1px solid ${T.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={S.tag(cc.bg, cc.color)}>{a.emoji} {a.categoryLabel}</span>
              <span style={{ fontSize: 13, color: T.textSec }}>{a.date}</span>
              <span style={{ fontSize: 13, color: T.textSec, display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="clock" size={14} color={T.textSec} /> {a.readTime}
              </span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.5px" }}>{a.title}</h1>
            <p style={{ color: T.textSec, fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>{a.summary}</p>
          </div>
          {/* Article body */}
          <div style={{ padding: "32px 40px 40px" }}>
            {a.content.map((block, i) => (
              block.type === "heading" ? (
                <h2 key={i} style={{
                  fontSize: 19, fontWeight: 700, marginTop: i === 0 ? 0 : 28, marginBottom: 12,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 4, height: 20, borderRadius: 2, background: cc.color }} />
                  {block.text}
                </h2>
              ) : (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: T.textSec, marginBottom: 8 }}>
                  {block.text}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={S.sectionTitle}>Мэдээ & Зөвлөгөө</div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {[
          ["all", "Бүгд"],
          ["news", "📰 Мэдээ"],
          ["tips", "💡 Зөвлөгөө"],
          ["strategy", "🎯 Стратеги"],
        ].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer",
            background: filter === k ? T.text : T.card, color: filter === k ? "#fff" : T.textSec,
            fontSize: 14, fontWeight: 600, fontFamily: "inherit",
            border: filter === k ? "none" : `1px solid ${T.border}`,
            transition: "all 0.2s ease",
          }}>{label}</button>
        ))}
      </div>

      {/* Pinned articles (only show on "all") */}
      {filter === "all" && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Icon name="bookmark" size={18} color={T.primary} />
            <span style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>Онцлох</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {pinned.map((a) => {
              const cc = catColors[a.category];
              return (
                <div key={a.id} onClick={() => setSelectedArticle(a)} style={{
                  ...S.card, padding: 0, overflow: "hidden", cursor: "pointer",
                  border: `2px solid ${T.primary}20`,
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${cc.bg}, ${T.card})`,
                    padding: "24px 24px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={S.tag(cc.bg, cc.color)}>{a.emoji} {a.categoryLabel}</span>
                      <span style={{ ...S.tag(T.primaryLight, T.primary), fontSize: 11 }}>📌 Онцлох</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 12, lineHeight: 1.4 }}>{a.title}</div>
                    <p style={{ color: T.textSec, fontSize: 14, marginTop: 8, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {a.summary}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                      <span style={{ fontSize: 12, color: T.textSec }}>{a.date}</span>
                      <span style={{ fontSize: 12, color: T.textSec, display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="clock" size={12} color={T.textSec} /> {a.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All articles list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((a) => {
          const cc = catColors[a.category];
          return (
            <div key={a.id} onClick={() => setSelectedArticle(a)} style={{
              ...S.card, display: "flex", alignItems: "center", gap: 20, cursor: "pointer",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: cc.bg,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0,
              }}>{a.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={S.tag(cc.bg, cc.color)}>{a.categoryLabel}</span>
                  {a.pinned && <span style={{ fontSize: 12, color: T.primary }}>📌</span>}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                <p style={{ color: T.textSec, fontSize: 13, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.summary}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: T.textSec }}>{a.date}</div>
                <div style={{ fontSize: 12, color: T.textSec, marginTop: 4, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                  <Icon name="clock" size={12} color={T.textSec} /> {a.readTime}
                </div>
              </div>
              <Icon name="chevron" size={18} color={T.textSec} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── MAIN APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [animating, setAnimating] = useState(false);

  // ─── AUTH STATE ───
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login"); // "login" эсвэл "register"
  const [authChecked, setAuthChecked] = useState(false);

  // Хуудас ачаалахад token шалгах
  useEffect(() => {
    const token = localStorage.getItem("sat_token");
    const savedUser = localStorage.getItem("sat_user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("sat_token");
        localStorage.removeItem("sat_user");
      }
    }
    setAuthChecked(true);
  }, []);

  // Нэвтрэх
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Бүртгүүлэх
  const handleRegister = (userData) => {
    setUser(userData);
  };

  // Гарах
  const handleLogout = () => {
    localStorage.removeItem("sat_token");
    localStorage.removeItem("sat_user");
    setUser(null);
    setAuthPage("login");
  };

  const navigate = (p) => {
    setAnimating(true);
    setTimeout(() => { setPage(p); setAnimating(false); }, 200);
  };

  // Auth шалгаж дуусаагүй бол хүлээх
  if (!authChecked) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#F7F8FA", fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: "#3B6BF5",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 22, margin: "0 auto 16px",
          }}>S</div>
          <div style={{ color: "#6B7280", fontSize: 14 }}>Ачааллаж байна...</div>
        </div>
      </div>
    );
  }

  // Нэвтрээгүй бол Login/Register хуудас харуулах
  if (!user) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
        {authPage === "login" ? (
          <LoginPage onLogin={handleLogin} onSwitch={() => setAuthPage("register")} />
        ) : (
          <RegisterPage onRegister={handleRegister} onSwitch={() => setAuthPage("login")} />
        )}
      </>
    );
  }

  // ─── Нэвтэрсэн хэрэглэгчийн хуудас (хуучин кодтой ижил) ───
  const navItems = [
    { id: "home", label: "Нүүр хуудас", icon: "home" },
    { id: "lessons", label: "Хичээлүүд", icon: "book" },
    { id: "practice", label: "Practice Test", icon: "test" },
    { id: "topics", label: "Сэдэвчилсэн тест", icon: "topic" },
    { id: "flashcards", label: "Flashcards", icon: "flash" },
    { id: "news", label: "Мэдээ", icon: "news" },
    { id: "profile", label: "Миний бүртгэл", icon: "user" },
    { id: "admin", label: "Admin Panel", icon: "settings" },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "lessons": return <LessonsPage />;
      case "practice": return <PracticeTestPage />;
      case "topics": return <TopicTestsPage />;
      case "flashcards": return <FlashcardsPage />;
      case "news": return <NewsPage />;
      case "profile": return <ProfilePage />;
      case "admin": return <AdminPanel />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={S.app}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          <div style={S.logo}>
            <div style={S.logoIcon}>S</div>
            <div>
              <div style={S.logoText}>SATPrep</div>
              <div style={S.logoSub}>SAT DINO PREP</div>
            </div>
          </div>
          <nav style={{ flex: 1 }}>
            {navItems.map((item) => (
              <div key={item.id} onClick={() => navigate(item.id)} style={S.navItem(page === item.id)}>
                <Icon name={item.icon} size={20} color={page === item.id ? T.primary : T.textSec} />
                {item.label}
              </div>
            ))}
          </nav>
          <div style={{ padding: "0 16px", marginTop: "auto" }}>
            <button onClick={() => navigate("practice")} style={{
              ...S.btn("accent"), width: "100%", borderRadius: 14, padding: "14px 20px", fontSize: 15,
            }}>
              ⚡ Дадлага эхлэх
            </button>
          </div>
          <div style={{ padding: "16px 24px", marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.textSec, fontSize: 14, cursor: "pointer" }}>
              <Icon name="settings" size={16} color={T.textSec} /> Тусламж
            </div>
            <div onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, color: T.textSec, fontSize: 14, cursor: "pointer" }}>
              <Icon name="logout" size={16} color={T.textSec} /> Гарах
            </div>
          </div>
        </div>

        {/* Main */}
        <main style={{
          ...S.main,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          animation: "fadeIn 0.4s ease",
        }}>
          {renderPage()}
        </main>
      </div>
    </>
  );
}
