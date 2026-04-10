import { useState, useEffect, useRef } from "react";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./AuthPages";
import AdminPanel from "./AdminPanel";
const API_URL = "https://sat-prep-backend.onrender.com/api"
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
  main: { flex: 1, marginLeft: 260, padding: "32px 40px", minWidth: 0, overflow: "hidden" },
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
const MONTHS_MN = ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"];
const DAYS_MN = ["Ня","Да","Мя","Лх","Пү","Ба","Бя"];

const HomeModal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: T.card, borderRadius: 24, padding: 32, width: "90%", maxWidth: 520, maxHeight: "82vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} style={{ background: T.bg, border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 20, color: T.textSec, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const HomePage = ({ navigate }) => {
  const today = new Date();
  const satDate = new Date(2026, 4, 2);
  const daysLeft = Math.ceil((satDate - today) / (1000 * 60 * 60 * 24));

  const [stats, setStats] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [studyDays, setStudyDays] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [scoresOpen, setScoresOpen] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(() => new Date());

  const token = localStorage.getItem("sat_token");

  useEffect(() => {
    fetch(`${API_URL}/progress/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setStats).catch(() => {});
    fetch(`${API_URL}/tests/history?testType=practice&limit=1`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { if (d.results?.[0]?.satScore) setLastScore(d.results[0].satScore); })
      .catch(() => {});
  }, []);

  const openCalendar = () => {
    fetch(`${API_URL}/progress`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setStudyDays(d.progress?.studyDays || [])).catch(() => {});
    setCalendarOpen(true);
  };

  const openScores = () => {
    fetch(`${API_URL}/tests/history?testType=practice&limit=20`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setTestHistory(d.results || [])).catch(() => {});
    setScoresOpen(true);
  };

  const allTopics = [...mathTopics, ...rwTopics];

  const recentLessons = stats?.lessonsProgress?.length > 0
    ? [...stats.lessonsProgress]
        .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
        .slice(0, 2)
        .map(lp => ({
          title: lp.topicName || allTopics.find(t => t.id === lp.topicId)?.name || "Хичээл",
          topic: lp.section === "math" ? "SAT MATH" : "SAT READING",
          progress: lp.progress || 0,
          duration: `${lp.totalLessons || 10} хичээл`,
          gradient: lp.section === "math" ? "linear-gradient(135deg, #1e1e2e, #2d2d3d)" : "linear-gradient(135deg, #1a365d, #2a4a7f)",
        }))
    : [
        { title: "Heart of Algebra - Linear Equations", topic: "SAT MATH", progress: 75, duration: "12 мин", gradient: "linear-gradient(135deg, #1e1e2e, #2d2d3d)" },
        { title: "Vocabulary in Context - Lesson 6", topic: "SAT READING", progress: 45, duration: "8 мин", gradient: "linear-gradient(135deg, #1a365d, #2a4a7f)" },
      ];

  // Calendar
  const studyDaySet = new Set(studyDays.map(d => {
    const dt = new Date(d.date);
    return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
  }));
  const calYear = calMonth.getFullYear();
  const calMonthIdx = calMonth.getMonth();
  const firstDayOfWeek = new Date(calYear, calMonthIdx, 1).getDay();
  const daysInCalMonth = new Date(calYear, calMonthIdx + 1, 0).getDate();

  const hoverCard = { transition: "all 0.2s ease" };
  const onEnter = e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,107,245,0.12)"; };
  const onLeave = e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; };

  return (
    <div>
      <div style={S.topBar}>
        <div>
          <div style={S.badge}>⊕ ШИНЭ АМЖИЛТ!</div>
          <div style={S.greeting}>Сайн байна уу, {(() => { try { return JSON.parse(localStorage.getItem("sat_user"))?.name } catch { return "" } })() || "Сурагч"}! <Icon name="wave" size={32} /></div>
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
        {/* Score */}
        <div style={{ ...S.statCard, ...hoverCard, cursor: "pointer" }} onClick={openScores} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="target" size={22} color={T.primary} />
            </div>
            <div style={S.growthBadge}>+12% өсөлт</div>
          </div>
          <div style={S.statLabel}>Сүүлийн оноо</div>
          <div style={S.statValue}>{lastScore ?? 1420} <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>/ 1600</span></div>
          <div style={{ fontSize: 12, color: T.primary, marginTop: 6, fontWeight: 500 }}>Түүхийг харах →</div>
        </div>

        {/* Streak */}
        <div style={{ ...S.statCard, ...hoverCard, cursor: "pointer" }} onClick={openCalendar} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.orangeLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="fire" size={22} />
            </div>
            <div style={{ width: 44, height: 24, borderRadius: 12, background: T.primary, position: "relative" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", right: 3, top: 3 }} />
            </div>
          </div>
          <div style={S.statLabel}>Суралцсан хоног</div>
          <div style={S.statValue}>{stats?.streak ?? 14} <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>өдөр дараалан</span> <Icon name="fire" size={20} /></div>
          <div style={{ fontSize: 12, color: T.primary, marginTop: 6, fontWeight: 500 }}>Календарь харах →</div>
        </div>

        {/* Lessons */}
        <div style={{ ...S.statCard, ...hoverCard, cursor: "pointer" }} onClick={() => setLessonsOpen(true)} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: T.successLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="check" size={22} color={T.success} />
          </div>
          <div style={S.statLabel}>Үзсэн хичээл</div>
          <div style={S.statValue}>{stats?.totalLessonsCompleted ?? 42} <span style={{ fontSize: 16, color: T.textSec, fontWeight: 400 }}>нийт 120-оос</span></div>
          <div style={{ marginTop: 8 }}><ProgressBar pct={Math.round(((stats?.totalLessonsCompleted ?? 42) / 120) * 100)} /></div>
          <div style={{ fontSize: 12, color: T.primary, marginTop: 6, fontWeight: 500 }}>Дэлгэрэнгүй харах →</div>
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
            <span onClick={() => navigate?.("lessons")} style={{ color: T.primary, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Бүгдийг үзэх →</span>
          </div>
          {recentLessons.map((item, i) => (
            <div key={i} onClick={() => navigate?.("lessons")} style={{ ...S.card, marginBottom: 12, display: "flex", alignItems: "center", gap: 16, cursor: "pointer", ...hoverCard }}
              onMouseEnter={e => { onEnter(e); e.currentTarget.style.borderColor = T.primary; }}
              onMouseLeave={e => { onLeave(e); e.currentTarget.style.borderColor = T.border; }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="play" size={24} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.primary, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.topic}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <ProgressBar pct={item.progress} />
                  <span style={{ fontSize: 12, color: T.textSec, whiteSpace: "nowrap" }}>{item.progress}%</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.textSec, fontSize: 13, flexShrink: 0 }}>
                <Icon name="clock" size={14} color={T.textSec} /> {item.duration}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Үгсийн сан</span>
            <span onClick={() => navigate?.("flashcards")} style={{ color: T.primary, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Бүх карт →</span>
          </div>
          <div style={{ ...S.card, textAlign: "center", padding: 32 }}>
            <div style={S.tag(T.dangerLight, T.danger)}>LEVEL: ADVANCED</div>
            <div style={{ fontSize: 42, fontWeight: 700, marginTop: 20, fontFamily: "'Playfair Display', serif" }}>Ephemeral</div>
            <div style={{ color: T.textSec, marginTop: 8, fontStyle: "italic", fontSize: 16 }}>/ɪˈfɛm(ə)r(ə)l/</div>
            <div style={{ marginTop: 16, color: T.textSec, fontSize: 14 }}>Lasting for a very short time</div>
            <button onClick={() => navigate?.("flashcards")} style={{ ...S.btn("accent"), marginTop: 20, width: "100%" }}>
              <Icon name="refresh" size={16} color={T.text} /> Дараагийн үг
            </button>
          </div>
        </div>
      </div>

      {/* ── CALENDAR MODAL ── */}
      <HomeModal open={calendarOpen} onClose={() => setCalendarOpen(false)} title="📅 Суралцсан өдрүүд">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            style={{ background: T.bg, border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 18, fontFamily: "inherit", color: T.text }}>‹</button>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{calYear} · {MONTHS_MN[calMonthIdx]}</div>
          <button onClick={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            style={{ background: T.bg, border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 18, fontFamily: "inherit", color: T.text }}>›</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
          {DAYS_MN.map(d => <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: T.textSec, padding: "4px 0" }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInCalMonth }).map((_, i) => {
            const day = i + 1;
            const studied = studyDaySet.has(`${calYear}-${calMonthIdx}-${day}`);
            const isToday = today.getFullYear() === calYear && today.getMonth() === calMonthIdx && today.getDate() === day;
            return (
              <div key={day} style={{
                textAlign: "center", padding: "8px 4px", borderRadius: 10, fontSize: 14,
                fontWeight: studied || isToday ? 700 : 400,
                background: studied ? T.successLight : isToday ? T.primaryLight : "transparent",
                color: studied ? T.success : isToday ? T.primary : T.text,
                border: isToday ? `2px solid ${T.primary}` : studied ? `2px solid ${T.success}30` : "2px solid transparent",
              }}>
                {day}
                {studied && <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.success, margin: "2px auto 0" }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 20, fontSize: 13, color: T.textSec }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: T.successLight, border: `1px solid ${T.success}50` }} /> Суралцсан
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: T.primaryLight, border: `1px solid ${T.primary}60` }} /> Өнөөдөр
          </div>
        </div>
      </HomeModal>

      {/* ── SCORE HISTORY MODAL ── */}
      <HomeModal open={scoresOpen} onClose={() => setScoresOpen(false)} title="📊 Оноогийн түүх">
        {testHistory.length === 0 ? (
          <div style={{ textAlign: "center", color: T.textSec, padding: "32px 0", fontSize: 15 }}>
            Одоогоор оноо байхгүй байна.<br />
            <span onClick={() => { setScoresOpen(false); navigate?.("practice"); }} style={{ color: T.primary, fontWeight: 600, cursor: "pointer" }}>Practice Test өгч эхлэх →</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {testHistory.map((t, i) => {
              const prev = testHistory[i + 1];
              const diff = prev?.satScore != null ? (t.satScore - prev.satScore) : null;
              return (
                <div key={t._id || i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 14, background: i === 0 ? T.primaryLight : T.bg, border: `1px solid ${i === 0 ? T.primary + "30" : T.border}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primary + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.primary, flexShrink: 0 }}>
                    #{t.practiceTestNumber || "T"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Practice Test {t.practiceTestNumber}</div>
                    <div style={{ fontSize: 12, color: T.textSec, marginTop: 2 }}>
                      {t.completedAt ? new Date(t.completedAt).toLocaleDateString("mn-MN") : ""}
                      {t.mathScore && t.rwScore ? ` · Math: ${t.mathScore} / RW: ${t.rwScore}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: T.primary }}>{t.satScore ?? t.score}</div>
                    <div style={{ fontSize: 11, color: T.textSec }}>/1600</div>
                  </div>
                  {diff !== null && (
                    <div style={{ fontSize: 13, fontWeight: 700, color: diff >= 0 ? T.success : T.danger, minWidth: 36, textAlign: "center" }}>
                      {diff >= 0 ? "+" : ""}{diff}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </HomeModal>

      {/* ── LESSONS MODAL ── */}
      <HomeModal open={lessonsOpen} onClose={() => setLessonsOpen(false)} title="📚 Үзсэн хичээлүүд">
        {(!stats?.lessonsProgress || stats.lessonsProgress.length === 0) ? (
          <div style={{ textAlign: "center", color: T.textSec, padding: "32px 0", fontSize: 15 }}>
            Одоогоор үзсэн хичээл байхгүй байна.<br />
            <span onClick={() => { setLessonsOpen(false); navigate?.("lessons"); }} style={{ color: T.primary, fontWeight: 600, cursor: "pointer" }}>Хичээл үзэж эхлэх →</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...stats.lessonsProgress]
              .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
              .map((lp, i) => {
                const topic = allTopics.find(t => t.id === lp.topicId);
                return (
                  <div key={i} onClick={() => { setLessonsOpen(false); navigate?.("lessons"); }}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: T.bg, cursor: "pointer", border: `1px solid ${T.border}`, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.primaryLight; e.currentTarget.style.borderColor = T.primary + "40"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.bg; e.currentTarget.style.borderColor = T.border; }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: lp.section === "math" ? T.primaryLight : T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {lp.section === "math" ? "📐" : "📖"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lp.topicName || topic?.name}</div>
                      <div style={{ fontSize: 12, color: T.textSec, marginTop: 2 }}>{lp.section === "math" ? "SAT Math" : "SAT Reading & Writing"} · {lp.completedLessons}/{lp.totalLessons} хичээл</div>
                      <div style={{ marginTop: 6 }}><ProgressBar pct={lp.progress} /></div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.primary, flexShrink: 0 }}>{lp.progress}%</div>
                  </div>
                );
              })}
          </div>
        )}
      </HomeModal>
    </div>
  );
};

/* VIDEOS PAGE — Khan Academy style */
const VideosPage = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("math");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watched, setWatched] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sat_watched") || "{}"); } catch { return {}; }
  });

  const token = localStorage.getItem("sat_token");

  useEffect(() => {
    fetch(`${API_URL}/videos`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setAllVideos(d.videos || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const markWatched = (id) => {
    const updated = { ...watched, [id]: true };
    setWatched(updated);
    localStorage.setItem("sat_watched", JSON.stringify(updated));
  };

  const sectionMeta = {
    math: { label: "SAT Math", color: T.primary, emoji: "📐" },
    "reading-writing": { label: "SAT Reading & Writing", color: T.orange, emoji: "📖" },
    general: { label: "Ерөнхий", color: T.success, emoji: "🎯" },
  };

  const diffLabel = (d) => d === "beginner" ? "Easy" : d === "intermediate" ? "Medium" : "Hard";

  // Group: section → topicName → [videos sorted by order]
  const grouped = allVideos.reduce((acc, v) => {
    const sec = v.section || "general";
    const topic = v.topicName || v.topic || "Ерөнхий";
    if (!acc[sec]) acc[sec] = {};
    if (!acc[sec][topic]) acc[sec][topic] = [];
    acc[sec][topic].push(v);
    return acc;
  }, {});
  Object.values(grouped).forEach(sec =>
    Object.values(sec).forEach(vids => vids.sort((a, b) => (a.order || 0) - (b.order || 0)))
  );

  const availableSections = Object.keys(sectionMeta).filter(k => grouped[k]);
  const topicsInSection = Object.entries(grouped[selectedSection] || {});
  const activeTopic = selectedTopic && grouped[selectedSection]?.[selectedTopic] ? selectedTopic : topicsInSection[0]?.[0];
  const videosInTopic = grouped[selectedSection]?.[activeTopic] || [];

  // ── VIDEO PLAYER VIEW ──
  if (selectedVideo) {
    const idx = videosInTopic.findIndex(v => v._id === selectedVideo._id);
    const prevV = videosInTopic[idx - 1];
    const nextV = videosInTopic[idx + 1];
    return (
      <div>
        <button onClick={() => setSelectedVideo(null)} style={{ ...S.btn("outline"), marginBottom: 20 }}>← Буцах</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          <div>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 16, background: "#000", marginBottom: 20 }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{activeTopic}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{selectedVideo.title}</h2>
            {selectedVideo.description && <p style={{ color: T.textSec, lineHeight: 1.7, marginBottom: 16 }}>{selectedVideo.description}</p>}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {watched[selectedVideo._id] ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: T.success, fontWeight: 600, fontSize: 14 }}>
                  <Icon name="check" size={16} color={T.success} /> Үзсэн
                </span>
              ) : (
                <button onClick={() => markWatched(selectedVideo._id)} style={S.btn("accent")}>
                  <Icon name="check" size={16} color={T.text} /> Үзсэн гэж тэмдэглэх
                </button>
              )}
              {prevV && <button onClick={() => setSelectedVideo(prevV)} style={S.btn("outline")}>← Өмнөх</button>}
              {nextV && (
                <button onClick={() => { markWatched(selectedVideo._id); setSelectedVideo(nextV); }} style={S.btn()}>
                  Дараах хичээл →
                </button>
              )}
            </div>
          </div>

          {/* Sidebar playlist */}
          <div style={{ ...S.card, padding: 0, overflow: "hidden", position: "sticky", top: 16 }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 14, fontWeight: 700 }}>
              {activeTopic} · {videosInTopic.length} хичээл
            </div>
            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {videosInTopic.map((v, i) => {
                const isW = watched[v._id];
                const isCur = v._id === selectedVideo._id;
                return (
                  <div key={v._id} onClick={() => setSelectedVideo(v)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", background: isCur ? T.primaryLight : "transparent", borderBottom: `1px solid ${T.border}`, transition: "background 0.15s" }}
                    onMouseEnter={e => { if (!isCur) e.currentTarget.style.background = T.bg; }}
                    onMouseLeave={e => { if (!isCur) e.currentTarget.style.background = "transparent"; }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isW ? T.success : isCur ? T.primary : T.border, color: isW || isCur ? "#fff" : T.textSec, fontSize: 11, fontWeight: 700 }}>
                      {isW ? <Icon name="check" size={11} color="#fff" /> : i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: isCur ? 600 : 400, color: isCur ? T.primary : T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.3 }}>{v.title}</div>
                      {v.duration && <div style={{ fontSize: 11, color: T.textSec, marginTop: 2 }}>{v.duration} мин</div>}
                    </div>
                    {isCur && <Icon name="play" size={13} color={T.primary} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN LAYOUT (sidebar + content) ──
  return (
    <div>
      <div style={S.sectionTitle}>Видео хичээлүүд</div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: T.textSec }}>
          <div style={{ width: 36, height: 36, border: `3px solid ${T.border}`, borderTopColor: T.primary, borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
          Ачааллаж байна...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "270px 1fr", background: T.card, borderRadius: 20, border: `1px solid ${T.border}`, overflow: "hidden", minHeight: 560 }}>
          {/* Left sidebar */}
          <div style={{ borderRight: `1px solid ${T.border}`, overflowY: "auto", maxHeight: 700 }}>
            {availableSections.map(secKey => {
              const meta = sectionMeta[secKey];
              return (
                <div key={secKey}>
                  <div style={{ padding: "14px 18px 8px", fontSize: 11, fontWeight: 700, color: T.textSec, textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{meta.emoji}</span> {meta.label}
                  </div>
                  {Object.entries(grouped[secKey] || {}).map(([topicName, vids]) => {
                    const wCount = vids.filter(v => watched[v._id]).length;
                    const isActive = selectedSection === secKey && activeTopic === topicName;
                    const pct = Math.round((wCount / vids.length) * 100);
                    return (
                      <div key={topicName}
                        onClick={() => { setSelectedSection(secKey); setSelectedTopic(topicName); }}
                        style={{ padding: "11px 18px", cursor: "pointer", background: isActive ? T.primaryLight : "transparent", borderRight: isActive ? `3px solid ${T.primary}` : "3px solid transparent", transition: "all 0.15s" }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.bg; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                        <div style={{ fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? T.primary : T.text, lineHeight: 1.3 }}>{topicName}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                          <div style={{ flex: 1, height: 3, borderRadius: 2, background: T.border, overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 2, background: meta.color, width: `${pct}%`, transition: "width 0.3s" }} />
                          </div>
                          <span style={{ fontSize: 11, color: pct === 100 ? T.success : T.textSec, fontWeight: 600, whiteSpace: "nowrap" }}>{wCount}/{vids.length}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ height: 1, background: T.border, margin: "6px 0" }} />
                </div>
              );
            })}
            {availableSections.length === 0 && (
              <div style={{ padding: 24, color: T.textSec, fontSize: 14 }}>Видео байхгүй</div>
            )}
          </div>

          {/* Right: video list */}
          <div style={{ padding: 32 }}>
            {videosInTopic.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Одоогоор видео байхгүй байна</div>
                <div style={{ fontSize: 14, color: T.textSec, marginTop: 8 }}>Удахгүй нэмэгдэх болно.</div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{activeTopic}</div>
                    <div style={{ fontSize: 14, color: T.textSec, marginTop: 4 }}>{videosInTopic.filter(v => watched[v._id]).length}/{videosInTopic.length} хичээл үзсэн</div>
                    <div style={{ marginTop: 8, maxWidth: 280 }}><ProgressBar pct={(videosInTopic.filter(v => watched[v._id]).length / videosInTopic.length) * 100} height={5} /></div>
                  </div>
                  <button onClick={() => setSelectedVideo(videosInTopic.find(v => !watched[v._id]) || videosInTopic[0])} style={S.btn()}>
                    <Icon name="play" size={16} color="#fff" />
                    {videosInTopic.some(v => !watched[v._id]) ? "Үргэлжлүүлэх" : "Дахин үзэх"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {videosInTopic.map((v, i) => {
                    const isW = watched[v._id];
                    const dL = v.difficulty ? diffLabel(v.difficulty) : null;
                    return (
                      <div key={v._id} onClick={() => setSelectedVideo(v)}
                        style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = T.bg; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isW ? T.success : T.primaryLight, color: isW ? "#fff" : T.primary, fontSize: 14, fontWeight: 700 }}>
                          {isW ? <Icon name="check" size={16} color="#fff" /> : i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 500, color: isW ? T.textSec : T.text, lineHeight: 1.3 }}>{v.title}</div>
                          <div style={{ display: "flex", gap: 10, marginTop: 5, alignItems: "center" }}>
                            {v.duration && <span style={{ fontSize: 12, color: T.textSec, display: "flex", alignItems: "center", gap: 3 }}><Icon name="clock" size={12} color={T.textSec} /> {v.duration} мин</span>}
                            {dL && <span style={S.tag(diffBg(dL), diffColor(dL))}>{v.difficulty}</span>}
                          </div>
                        </div>
                        <div style={{ width: 80, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                          <img src={v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <Icon name="play" size={18} color={T.textSec} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* PRACTICE TEST PAGE */
const PracticeTestPage = ({ onStartTest }) => {
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
                <button onClick={() => startTest(t)} style={{ ...S.btn("outline"), width: "100%", marginTop: 16 }}>Дахин өгөх</button>
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
                { label: "Reading & Writing", desc: "64 минут, 54 асуулт", icon: "book", section: "reading-writing" },
                { label: "Mathematics", desc: "70 минут, 44 асуулт", icon: "target", section: "math" },
                { label: "Бүтэн шалгалт", desc: "~3 цаг 15 мин, 98 асуулт", icon: "test", section: "full" },
              ].map((opt, i) => (
                <button key={i}
                  onClick={() => { setModal(false); onStartTest({ type: "practice", testNumber: selectedTest.id, section: opt.section, title: `${selectedTest.name} — ${opt.label}` }); }}
                  style={{
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
const TopicTestsPage = ({ onStartTest }) => {
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
            <button onClick={() => onStartTest({ type: "topic", topicId: t.id, title: t.name })} style={S.btn(t.bestScore !== null ? "outline" : "primary")}>
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
  // localStorage-оос хэрэглэгчийн мэдээлэл унших
  const savedUser = (() => {
    try {
      const raw = localStorage.getItem("sat_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();

  const [profile, setProfile] = useState({
    name: savedUser?.name || "",
    phone: savedUser?.phone || "",
    email: savedUser?.email || "",
    plan: savedUser?.plan || "Premium",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text: "..." }

  // Профайл хадгалах — PUT /api/auth/me
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("sat_token");
      if (!token) throw new Error("Нэвтрэх шаардлагатай");

      const res = await fetch(`${API_URL}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          email: profile.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Хадгалахад алдаа гарлаа");

      // localStorage дээрх хэрэглэгчийн мэдээллийг шинэчлэх
      const updatedUser = { ...savedUser, ...data.user, name: profile.name, phone: profile.phone, email: profile.email };
      localStorage.setItem("sat_user", JSON.stringify(updatedUser));

      setMessage({ type: "success", text: "Амжилттай хадгалагдлаа!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Хадгалахад алдаа гарлаа" });
      setTimeout(() => setMessage(null), 4000);
    }
    setSaving(false);
  };

  // Нэрний эхний үсэг (аватар)
  const initial = profile.name ? profile.name.charAt(0).toUpperCase() : "?";

  return (
    <div>
      <div style={S.sectionTitle}>Миний бүртгэл</div>

      {/* Амжилт / Алдааны мэдэгдэл */}
      {message && (
        <div style={{
          padding: "12px 20px", borderRadius: 12, marginBottom: 20,
          background: message.type === "success" ? T.successLight : T.dangerLight,
          color: message.type === "success" ? T.success : T.danger,
          fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 8,
          animation: "fadeIn 0.3s ease",
        }}>
          <Icon name={message.type === "success" ? "check" : "info"} size={18}
            color={message.type === "success" ? T.success : T.danger} />
          {message.text}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Personal Info */}
        <div style={{ ...S.card, gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 700, color: "#fff",
            }}>{initial}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.name || "Нэр оруулна уу"}</div>
              <div style={{ fontSize: 14, color: T.textSec }}>{profile.plan} гишүүн</div>
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
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              ...S.btn(),
              marginTop: 24,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            {saving ? (
              <>
                <span style={{
                  width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.6s linear infinite",
                }} />
                Хадгалж байна...
              </>
            ) : (
              <>
                <Icon name="check" size={16} color="#fff" />
                Хадгалах
              </>
            )}
          </button>
        </div>

        {/* Subscription */}
        <div style={{ ...S.card, gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Гишүүнчлэл & Төлбөр</div>

          {/* Current plan banner */}
          <div style={{ background: `linear-gradient(135deg, ${T.primary}, #1a3a8a)`, borderRadius: 16, padding: 24, color: "#fff", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.75 }}>Одоогийн төлөвлөгөө</div>
              <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{profile.plan} гишүүн</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Бүх хичээл, тест, flashcard нээлттэй</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Дуусах огноо</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>2026.12.31</div>
              <div style={{ marginTop: 8, background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>22 хоног үлдсэн</div>
            </div>
          </div>

          {/* Plans */}
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Гишүүнчлэл сунгах</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { period: "1 сар", price: "35,000₮", perDay: "~1,167₮/өдөр", popular: false, save: null },
              { period: "3 сар", price: "90,000₮", perDay: "~1,000₮/өдөр", popular: true, save: "14% хэмнэлт" },
              { period: "6 сар", price: "160,000₮", perDay: "~889₮/өдөр", popular: false, save: "24% хэмнэлт" },
            ].map((plan, i) => {
              return (
                <div key={i} style={{ position: "relative", borderRadius: 16, border: `2px solid ${plan.popular ? T.primary : T.border}`, padding: "20px 16px", textAlign: "center", background: plan.popular ? T.primaryLight : T.bg, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.background = T.primaryLight; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = plan.popular ? T.primary : T.border; e.currentTarget.style.background = plan.popular ? T.primaryLight : T.bg; }}>
                  {plan.popular && (
                    <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: T.primary, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
                      ХАМГИЙН АЛДАРТАЙ
                    </div>
                  )}
                  {plan.save && (
                    <div style={{ ...S.tag(T.successLight, T.success), marginBottom: 8, fontSize: 11 }}>{plan.save}</div>
                  )}
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{plan.period}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: T.primary }}>{plan.price}</div>
                  <div style={{ fontSize: 11, color: T.textSec, marginTop: 4 }}>{plan.perDay}</div>
                </div>
              );
            })}
          </div>

          {/* Payment methods */}
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Төлбөрийн хэлбэр</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {["QPay", "Хаан банк", "Голомт банк", "TDB", "Khan Bank Card"].map(m => (
              <div key={m} style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg, fontSize: 13, fontWeight: 500 }}>{m}</div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...S.btn(), flex: 1 }}>
              <Icon name="star" size={16} color="#fff" /> Сунгах — Төлбөр төлөх
            </button>
            <button style={{ ...S.btn("outline") }}>Асуух</button>
          </div>
          <div style={{ fontSize: 12, color: T.textSec, marginTop: 10 }}>Төлбөр хийсний дараа 24 цагийн дотор гишүүнчлэл идэвхжинэ. Асуудал гарвал холбоо барина уу.</div>
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

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

/* SETTINGS PAGE */
const SettingsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "SAT шалгалт хэзээ болдог вэ?", a: "SAT шалгалт жилд 7 удаа зохион байгуулагддаг. 2026 оны хуваарь: 5/2, 6/6, 8/22, 10/3, 11/7, 12/5. Бүртгэл нь шалгалтаас ~5 долоо хоногийн өмнө хаагддаг." },
    { q: "Practice Test-үүд яг бодит SAT-тай адил мөн үү?", a: "Манай practice test-үүд College Board-ын official SAT adaptive format-д суурилсан. Асуултын хүндийн зэрэг, хугацаа нь бодит шалгалттай адил." },
    { q: "Нэг сарын бэлтгэлтэйгээр хэдэн оноо нэмэх вэ?", a: "Суурь мэдлэг, хичээл зүтгэлээс хамаарна. Дунджаар 50–150 оноо нэмэгдэж болно. Өдөрт 1–2 цаг тогтмол суралцах нь хамгийн үр дүнтэй." },
    { q: "Flashcard-ыг хэрхэн хамгийн үр дүнтэй ашиглах вэ?", a: "Өдөрт 20–30 минут зарцуулж, 'Мэднэ' / 'Мэдэхгүй' гэж ангилан давт. Мэдэхгүй картуудаа дараагийн өдөр дахин хий. Spaced repetition хамгийн үр дүнтэй арга." },
    { q: "Гишүүнчлэлийн төлбөрийг хэрхэн төлөх вэ?", a: "QPay болон банкны интернет банкингаар төлбөр хийнэ. Төлсний дараа 24 цагт таны бүртгэл идэвхжинэ. Асуудал гарвал info@lingosat.mn хаягт бичнэ үү." },
    { q: "Нууц үгээ мартсан бол яах вэ?", a: "Нэвтрэх хуудасны 'Нууц үг мартсан' товч дарж, бүртгэлтэй имэйлээрээ баталгаажуулалтын код авна уу. Код 10 минутын хугацаатай." },
    { q: "Хичээлийн явц хадгалагдаж байдаг уу?", a: "Тийм, нэвтэрсэн хэрэглэгчийн бүх явц (видео, flashcard, тест) автоматаар хадгалагдана. Олон төхөөрөмжийн хооронд синхрончлогдоно." },
    { q: "Видео хичээлүүдийг offline үзэж болох уу?", a: "Одоогоор offline горим байхгүй. Видеонуудыг YouTube-ийн эрхтэй холбоотой учир интернэт шаардлагатай." },
  ];

  return (
    <div style={{ maxWidth: 740 }}>
      <div style={S.sectionTitle}>Тусламж & Мэдээлэл</div>

      {/* FAQ */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bulb" size={20} color="#B8860B" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Түгээмэл асуулт хариулт</div>
        </div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderTop: `1px solid ${T.border}` }}>
            <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", cursor: "pointer", gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{f.q}</div>
              <div style={{ transform: openFaq === i ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>
                <Icon name="chevron" size={18} color={T.textSec} />
              </div>
            </div>
            {openFaq === i && (
              <div style={{ padding: "0 0 16px", fontSize: 14, color: T.textSec, lineHeight: 1.7, borderTop: `1px dashed ${T.border}`, paddingTop: 12 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Terms */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T.successLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="shield" size={20} color={T.success} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Үйлчилгээний нөхцөл & Төлбөр</div>
        </div>
        {[
          { title: "Төлбөрийн хэлбэр", text: "QPay, Хаан банк, Голомт банк, TDB, Монголбанк болон бусад банкны интернет банкинг, дебит/кредит карт." },
          { title: "Гишүүнчлэл идэвхжих", text: "Төлбөр баталгаажсанаас хойш 24 цагийн дотор автоматаар идэвхжинэ. Хүсэлтийн дагуу хурдасгаж болно." },
          { title: "Буцаалтын нөхцөл", text: "Худалдан авалт хийснээс хойш 3 хоногийн дотор, хичээл үзэж эхлээгүй тохиолдолд бүрэн буцаалт хийнэ. 3 хоног өнгөрсөн буюу хэрэглэж эхэлсэн тохиолдолд буцаалт хийхгүй." },
          { title: "Гишүүнчлэл дуусах", text: "Хугацаа дуусахаас 3 хоногийн өмнө имэйлээр мэдэгдэнэ. Сунгаагүй тохиолдолд хандалт хязгаарлагдана, гэхдээ өгөгдөл хадгалагдана." },
          { title: "Үнийн өөрчлөлт", text: "Үнэ өөрчлөгдөх тохиолдолд 30 хоногийн өмнө мэдэгдэнэ. Идэвхтэй гишүүдэд хугацаа дуустал хуучин үнэ хамаарна." },
          { title: "Хувийн мэдээлэл", text: "Таны мэдээлэл гуравдагч этгээдэд дамжуулахгүй. Зөвхөн үйлчилгээ сайжруулах зорилгоор нэрийн үсгийн статистик цуглуулна." },
        ].map((item, i, arr) => (
          <div key={i} style={{ padding: "14px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7 }}>{item.text}</div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="info" size={20} color={T.primary} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Холбоо барих</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Имэйл", value: "info@lingosat.mn", icon: "info" },
            { label: "Утас", value: "+976 9900-0000", icon: "user" },
            { label: "Facebook", value: "fb.com/lingosat", icon: "bookmark" },
            { label: "Ажлын цаг", value: "Даваа–Баасан 09:00–18:00", icon: "clock" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, background: T.bg }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={c.icon} size={18} color={T.primary} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.textSec, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: T.accentLight, fontSize: 13, color: "#8B6914", lineHeight: 1.6 }}>
          Хурдан хариу авахын тулд имэйлд өөрийн нэр, бүртгэлтэй имэйл хаяг болон асуудлаа дэлгэрэнгүй бичнэ үү.
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

/* TEST RUNNER PAGE */
const TestRunnerPage = ({ config, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [startedAt] = useState(new Date());
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("sat_token");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url;
        if (config.type === "practice") {
          url = `${API_URL}/questions/practice-test/${config.testNumber}`;
        } else {
          url = `${API_URL}/questions/topic/${config.topicId}`;
        }
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        let qs = [];
        if (config.type === "practice") {
          if (config.section === "math") qs = data.math || [];
          else if (config.section === "reading-writing") qs = data.readingWriting || [];
          else qs = [...(data.readingWriting || []), ...(data.math || [])];
        } else {
          qs = data.questions || [];
        }
        setQuestions(qs);
        setLoading(false);
      } catch {
        setError("Асуулт ачааллахад алдаа гарлаа");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (submitted || loading) return;
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, [submitted, loading]);

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, "0")}`;

  const handleSubmit = async () => {
    setSubmitting(true);
    const perQ = Math.floor(elapsed / Math.max(questions.length, 1));
    const answersArr = questions.map(q => ({
      question: q._id,
      selectedAnswer: answers[q._id] || null,
      timeSpent: perQ,
    }));
    try {
      const body = {
        testType: config.type,
        answers: answersArr,
        totalTime: elapsed,
        startedAt: startedAt.toISOString(),
      };
      if (config.type === "practice") body.practiceTestNumber = config.testNumber;
      else body.topicId = config.topicId;
      const res = await fetch(`${API_URL}/tests/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setResult(data);
      setSubmitted(true);
    } catch {
      alert("Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
    setSubmitting(false);
  };

  const diffLabel = (d) => d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard";

  if (loading) return (
    <div style={{ textAlign: "center", padding: "100px 0", color: T.textSec }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${T.border}`, borderTopColor: T.primary, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
      Асуултуудыг ачааллаж байна...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error || questions.length === 0) return (
    <div style={{ textAlign: "center", padding: "100px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>😔</div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{error || "Асуулт олдсонгүй"}</div>
      <div style={{ fontSize: 14, color: T.textSec, marginTop: 8 }}>Энэ тест дээр одоогоор асуулт бэлэн болоогүй байна.</div>
      <button onClick={onBack} style={{ ...S.btn("outline"), marginTop: 24 }}>← Буцах</button>
    </div>
  );

  if (submitted && result) {
    const res = result.result || result;
    const correct = res.correctCount ?? 0;
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    const satScore = res.satScore;
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ ...S.card, textAlign: "center", padding: "48px 40px", marginBottom: 32, background: `linear-gradient(135deg, ${T.primaryLight}, ${T.card})` }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "📚"}</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>Тест дууслаа!</div>
          {satScore ? (
            <>
              <div style={{ fontSize: 52, fontWeight: 800, color: T.primary, marginTop: 16, letterSpacing: "-2px" }}>{satScore}</div>
              <div style={{ fontSize: 14, color: T.textSec, marginTop: 4 }}>SAT оноо / 1600</div>
              {res.mathScore && res.rwScore && (
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: T.primary }}>{res.mathScore}</div>
                    <div style={{ fontSize: 12, color: T.textSec }}>Math</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: T.primary }}>{res.rwScore}</div>
                    <div style={{ fontSize: 12, color: T.textSec }}>Reading & Writing</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: 40, fontWeight: 800, color: T.primary, marginTop: 16 }}>{correct}/{total}</div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{pct}%</div>
              <div style={{ fontSize: 12, color: T.textSec }}>Оноо</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{formatTime(elapsed)}</div>
              <div style={{ fontSize: 12, color: T.textSec }}>Хугацаа</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{correct}</div>
              <div style={{ fontSize: 12, color: T.textSec }}>Зөв хариулт</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Хариулт шалгах</div>
        {questions.map((q, i) => {
          const sel = answers[q._id];
          const isCorrect = sel === q.correctAnswer;
          return (
            <div key={q._id} style={{ ...S.card, marginBottom: 12, borderColor: isCorrect ? T.success : sel ? T.danger : T.border, borderWidth: 2 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: isCorrect ? T.successLight : sel ? T.dangerLight : T.bg, color: isCorrect ? T.success : sel ? T.danger : T.textSec }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{q.questionText}</div>
              </div>
              {q.passage && (
                <div style={{ marginLeft: 40, marginBottom: 10, fontSize: 13, color: T.textSec, background: T.bg, padding: "10px 14px", borderRadius: 8, lineHeight: 1.7, borderLeft: `3px solid ${T.border}`, maxHeight: 120, overflowY: "auto" }}>{q.passage}</div>
              )}
              <div style={{ display: "flex", gap: 10, fontSize: 13, marginLeft: 40, marginBottom: sel ? 8 : 0 }}>
                {sel && <span style={{ color: isCorrect ? T.success : T.danger, fontWeight: 700 }}>Таны хариулт: {sel}</span>}
                {!isCorrect && <span style={{ color: T.success, fontWeight: 700 }}>Зөв хариулт: {q.correctAnswer}</span>}
              </div>
              {q.explanation && (
                <div style={{ marginLeft: 40, fontSize: 13, color: T.textSec, background: T.bg, padding: "8px 12px", borderRadius: 8, lineHeight: 1.6 }}>{q.explanation}</div>
              )}
            </div>
          );
        })}

        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center", paddingBottom: 40 }}>
          <button onClick={onBack} style={S.btn("outline")}>← Буцах</button>
          <button onClick={() => { setSubmitted(false); setResult(null); setAnswers({}); setCurrentIdx(0); setElapsed(0); }} style={S.btn()}>Дахин өгөх</button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const answered = Object.keys(answers).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, position: "sticky", top: 0, background: T.bg, padding: "12px 0", zIndex: 10, borderBottom: `1px solid ${T.border}` }}>
        <button onClick={() => { if (window.confirm("Тестийг орхих уу? Явц хадгалагдахгүй.")) onBack(); }} style={S.btn("outline")}>← Гарах</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{config.title || "Тест"}</div>
          <div style={{ fontSize: 12, color: T.textSec }}>{answered}/{questions.length} хариулсан</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "8px 16px" }}>
          <Icon name="clock" size={16} color={T.primary} />
          <span style={{ fontWeight: 700, fontSize: 16, color: T.primary, fontFamily: "monospace" }}>{formatTime(elapsed)}</span>
        </div>
      </div>

      <ProgressBar pct={(answered / questions.length) * 100} height={4} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 24, marginTop: 24, alignItems: "start" }}>
        {/* Question card */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.primary, textTransform: "uppercase", letterSpacing: "0.5px" }}>Асуулт {currentIdx + 1} / {questions.length}</span>
            {q.difficulty && <span style={S.tag(diffBg(diffLabel(q.difficulty)), diffColor(diffLabel(q.difficulty)))}>{q.difficulty}</span>}
          </div>
          {q.passage && (
            <div style={{ background: T.bg, borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 14, lineHeight: 1.8, maxHeight: 200, overflowY: "auto", borderLeft: `3px solid ${T.primary}` }}>
              {q.passage}
            </div>
          )}
          <div style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>{q.questionText}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt) => {
              const selected = answers[q._id] === opt.label;
              return (
                <button key={opt.label} onClick={() => setAnswers(prev => ({ ...prev, [q._id]: opt.label }))}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderRadius: 12, border: `2px solid ${selected ? T.primary : T.border}`, background: selected ? T.primaryLight : T.bg, cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s", width: "100%" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: selected ? T.primary : T.card, border: `2px solid ${selected ? T.primary : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: selected ? "#fff" : T.textSec, flexShrink: 0 }}>
                    {opt.label}
                  </div>
                  <span style={{ fontSize: 15, lineHeight: 1.5, color: T.text, paddingTop: 3 }}>{opt.text}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0} style={{ ...S.btn("outline"), opacity: currentIdx === 0 ? 0.4 : 1 }}>← Өмнөх</button>
            <button onClick={() => setCurrentIdx(i => Math.min(questions.length - 1, i + 1))} disabled={currentIdx === questions.length - 1} style={{ ...S.btn(), opacity: currentIdx === questions.length - 1 ? 0.4 : 1 }}>Дараах →</button>
          </div>
        </div>

        {/* Sidebar navigator */}
        <div style={{ ...S.card, position: "sticky", top: 80 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textSec, letterSpacing: "0.5px", marginBottom: 12 }}>АСУУЛТУУД</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
            {questions.map((qq, i) => {
              const isAnswered = !!answers[qq._id];
              const isCurrent = i === currentIdx;
              return (
                <button key={i} onClick={() => setCurrentIdx(i)} style={{ aspectRatio: "1", borderRadius: 8, border: `2px solid ${isCurrent ? T.primary : isAnswered ? T.success : T.border}`, background: isCurrent ? T.primary : isAnswered ? T.successLight : T.bg, color: isCurrent ? "#fff" : isAnswered ? T.success : T.textSec, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: T.textSec }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: T.successLight, border: `1.5px solid ${T.success}` }} /> Хариулсан</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: T.primary }} /> Одоогийн</div>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {answered === questions.length ? (
              <button onClick={() => { if (window.confirm(`${answered}/${questions.length} асуулт хариуллаа. Илгээх үү?`)) handleSubmit(); }} disabled={submitting} style={{ ...S.btn("accent"), width: "100%", opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Илгээж байна..." : "Илгээх ✓"}
              </button>
            ) : (
              <button onClick={() => { if (window.confirm(`${questions.length - answered} асуулт хариулаагүй байна. Гэсэн ч илгээх үү?`)) handleSubmit(); }} disabled={submitting} style={{ ...S.btn("outline"), width: "100%", fontSize: 13, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Илгээж байна..." : `Илгээх (${answered}/${questions.length})`}
              </button>
            )}
          </div>
        </div>
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
  const [authPage, setAuthPage] = useState("login"); // "login", "register", "forgot"
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

  const [testConfig, setTestConfig] = useState(null);

  const navigate = (p) => {
    setAnimating(true);
    setTimeout(() => { setPage(p); setAnimating(false); }, 200);
  };

  const startTest = (config) => {
    setTestConfig(config);
    navigate("testRunner");
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
          <LoginPage onLogin={handleLogin} onSwitch={() => setAuthPage("register")} onForgot={() => setAuthPage("forgot")} />
        ) : authPage === "register" ? (
          <RegisterPage onRegister={handleRegister} onSwitch={() => setAuthPage("login")} />
        ) : (
          <ForgotPasswordPage onBack={() => setAuthPage("login")} />
        )}
      </>
    );
  }

  // ─── Нэвтэрсэн хэрэглэгчийн хуудас (хуучин кодтой ижил) ───
  const navItems = [
    { id: "home", label: "Нүүр хуудас", icon: "home" },
    { id: "lessons", label: "Видео хичээл", icon: "book" },
    { id: "practice", label: "Practice Test", icon: "test" },
    { id: "topics", label: "Сэдэвчилсэн тест", icon: "topic" },
    { id: "flashcards", label: "Flashcards", icon: "flash" },
    { id: "news", label: "Мэдээ", icon: "news" },
    { id: "settings", label: "Тусламж", icon: "info" },
    { id: "profile", label: "Миний бүртгэл", icon: "user" },
    ...(user && user.role === "admin" ? [{ id: "admin", label: "Admin Panel", icon: "settings" }] : []),
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "lessons": return <VideosPage />;
      case "practice": return <PracticeTestPage onStartTest={startTest} />;
      case "topics": return <TopicTestsPage onStartTest={startTest} />;
      case "flashcards": return <FlashcardsPage />;
      case "news": return <NewsPage />;
      case "settings": return <SettingsPage />;
      case "profile": return <ProfilePage />;
      case "admin": return <AdminPanel />;
      case "testRunner": return <TestRunnerPage config={testConfig} onBack={() => navigate(testConfig?.type === "practice" ? "practice" : "topics")} />;
      default: return <HomePage navigate={navigate} />;
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
