import { useState, useEffect } from "react";
import { newsAPI } from "./api";

const C = {
  bg: "#0B0E14", surface: "#111620", surfaceHover: "#161C28", card: "#141924",
  border: "#1E2636", borderLight: "#2A3548", accent: "#6C5CE7", accentLight: "#A29BFE",
  accentGlow: "rgba(108,92,231,0.15)", success: "#00D2A0", successBg: "rgba(0,210,160,0.1)",
  warning: "#FDCB6E", warningBg: "rgba(253,203,110,0.1)", danger: "#FF6B6B",
  dangerBg: "rgba(255,107,107,0.1)", text: "#E8ECF4", textSec: "#7B8BA8", textMut: "#4A5670",
  pink: "#FF6B9D", cyan: "#00B4D8",
};

const Icon = ({ d, size = 18, color = C.textSec }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ic = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  students: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  questions: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  tests: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  lessons: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  flashcards: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  news: "M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z M7 8h5 M7 12h8 M7 16h3",
  analytics: "M18 20V10 M12 20V4 M6 20v-6",
  settings: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4l3 3",
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16 16l4.5 4.5",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  plus: "M12 5v14 M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  fire: "M12 22c4.97 0 8-3.58 8-8 0-3.07-2-6.64-4-9l-2 3c-.62.93-2 .62-2-.5V2s-4 4.5-4 8.5c0 1.5.5 3 1.5 4-1 1-2 2.5-2 4 0 2 1 3.5 2.5 4.5",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  target: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  close: "M18 6L6 18 M6 6l12 12",
  image: "M21 15l-5-5L5 21 M8.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M21 3H3v18h18V3z",
  video: "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};

const initStudents = [
  { id: 1, name: "Болд Батбаяр", email: "bold@ex.com", score: 1480, math: 760, verbal: 720, progress: 92, streak: 14, avatar: "ББ", status: "active", plan: "Premium" },
  { id: 2, name: "Сарнай Ганбат", email: "sarnai@ex.com", score: 1350, math: 680, verbal: 670, progress: 78, streak: 7, avatar: "СГ", status: "active", plan: "Premium" },
  { id: 3, name: "Тэмүүлэн Дорж", email: "temuulen@ex.com", score: 1220, math: 620, verbal: 600, progress: 55, streak: 3, avatar: "ТД", status: "active", plan: "Basic" },
  { id: 4, name: "Анужин Баяр", email: "anujin@ex.com", score: 1560, math: 790, verbal: 770, progress: 98, streak: 21, avatar: "АБ", status: "active", plan: "Premium" },
  { id: 5, name: "Хүслэн Эрдэнэ", email: "khuslen@ex.com", score: 1100, math: 550, verbal: 550, progress: 35, streak: 0, avatar: "ХЭ", status: "inactive", plan: "Basic" },
  { id: 6, name: "Номин Цэцэг", email: "nomin@ex.com", score: 1410, math: 720, verbal: 690, progress: 85, streak: 10, avatar: "НЦ", status: "active", plan: "Premium" },
];
const initLessons = [
  { id: 1, title: "Algebra Basics", section: "Math", level: "Beginner", videoCount: 5, duration: "45 мин", students: 120, status: "published", desc: "Алгебрийн үндсэн ойлголтууд", youtubeUrls: ["https://youtu.be/dQw4w9WgXcQ", "https://youtu.be/abc123", "https://youtu.be/def456", "https://youtu.be/ghi789", "https://youtu.be/jkl012"] },
  { id: 2, title: "Advanced Geometry", section: "Math", level: "Advanced", videoCount: 8, duration: "1.5 цаг", students: 78, status: "published", desc: "Геометрийн хүнд даалгаврууд", youtubeUrls: ["https://youtu.be/geo001", "https://youtu.be/geo002"] },
  { id: 3, title: "Reading Comprehension", section: "Verbal", level: "Intermediate", videoCount: 6, duration: "1 цаг", students: 95, status: "published", desc: "Уншиж ойлгох чадвар", youtubeUrls: ["https://youtu.be/read01"] },
  { id: 4, title: "Vocabulary Builder", section: "Verbal", level: "Beginner", videoCount: 10, duration: "2 цаг", students: 145, status: "published", desc: "Үгийн сангаа баяжуулах", youtubeUrls: [] },
  { id: 5, title: "Data Analysis & Statistics", section: "Math", level: "Advanced", videoCount: 4, duration: "50 мин", students: 62, status: "draft", desc: "Статистик, өгөгдлийн шинжилгээ", youtubeUrls: [] },
];

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);
  return m ? m[1] : null;
};
const initFlashcards = [
  { id: 1, deck: "SAT Vocabulary Set 1", category: "Verbal", cardCount: 50, mastered: 35, color: C.accent, emoji: "📚" },
  { id: 2, deck: "Math Formulas", category: "Math", cardCount: 40, mastered: 28, color: C.success, emoji: "📐" },
  { id: 3, deck: "Grammar Rules", category: "Verbal", cardCount: 30, mastered: 22, color: C.pink, emoji: "✏️" },
  { id: 4, deck: "Geometry Theorems", category: "Math", cardCount: 25, mastered: 10, color: C.cyan, emoji: "📏" },
  { id: 5, deck: "SAT Vocabulary Set 2", category: "Verbal", cardCount: 50, mastered: 12, color: C.warning, emoji: "🔤" },
  { id: 6, deck: "Problem Solving Tips", category: "Strategy", cardCount: 20, mastered: 18, color: "#9B59B6", emoji: "💡" },
];
const initNews = [
  { id: 1, title: "SAT 2026 шинэ формат зарлагдлаа", excerpt: "College Board SAT шалгалтын шинэ бүтцийг танилцуулав.", date: "2026-04-09", category: "Мэдээ", status: "published", views: 342, image: true },
  { id: 2, title: "Math хэсгийн шинэ стратеги", excerpt: "Математикийн хэсэгт хурдан бодох 5 арга.", date: "2026-04-07", category: "Зөвлөгөө", status: "published", views: 218, image: false },
  { id: 3, title: "Амжилтын түүх: 1580 оноо", excerpt: "Манай сурагч Анужин хэрхэн 1580 оноо авсан тухай.", date: "2026-04-05", category: "Амжилт", status: "published", views: 567, image: true },
  { id: 4, title: "Шинэ Practice Test #10 нэмэгдлээ", excerpt: "Бүрэн хэмжээний шинэ дадлага шалгалт бэлэн боллоо.", date: "2026-04-03", category: "Шинэчлэл", status: "draft", views: 0, image: false },
];
const initQuestions = [
  { id: 1, type: "Math", section: "Algebra", difficulty: "Hard", text: "If 3x + 7 = 22, what is x?", usageCount: 342, correctRate: 67 },
  { id: 2, type: "Math", section: "Geometry", difficulty: "Medium", text: "Find the area of a circle with radius 5.", usageCount: 521, correctRate: 74 },
  { id: 3, type: "Verbal", section: "Reading", difficulty: "Hard", text: "What is the main idea of the passage?", usageCount: 289, correctRate: 58 },
  { id: 4, type: "Verbal", section: "Writing", difficulty: "Easy", text: "Choose the correct punctuation.", usageCount: 612, correctRate: 82 },
  { id: 5, type: "Math", section: "Statistics", difficulty: "Medium", text: "Calculate the standard deviation.", usageCount: 198, correctRate: 61 },
  { id: 6, type: "Verbal", section: "Vocabulary", difficulty: "Hard", text: "Select the synonym of 'ubiquitous'.", usageCount: 445, correctRate: 52 },
];
const testHistory = [
  { date: "04/01", avgScore: 1280 }, { date: "04/03", avgScore: 1310 }, { date: "04/05", avgScore: 1295 },
  { date: "04/07", avgScore: 1340 }, { date: "04/09", avgScore: 1360 }, { date: "04/11", avgScore: 1325 },
  { date: "04/13", avgScore: 1380 }, { date: "04/15", avgScore: 1395 },
];

const MiniChart = ({ data, color, height = 40 }) => {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1, w = 120;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={height} style={{ display: "block" }}>
      <defs><linearGradient id={`g${color.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${height} ${pts} ${w},${height}`} fill={`url(#g${color.replace(/[^a-zA-Z0-9]/g, "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
const ScoreChart = ({ data }) => {
  const max = 1600, H = 180, W = 500, pL = 40, pB = 24, uH = H - pB, uW = W - pL;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {[1200, 1300, 1400, 1500].map((v, i) => { const y = uH - ((v - 1100) / (max - 1100)) * uH; return (<g key={i}><line x1={pL} y1={y} x2={W} y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="4 4" /><text x={pL - 6} y={y + 4} textAnchor="end" fill={C.textMut} fontSize="10">{v}</text></g>); })}
      {data.map((d, i) => <text key={i} x={pL + (i / (data.length - 1)) * uW} y={H - 4} textAnchor="middle" fill={C.textMut} fontSize="9">{d.date}</text>)}
      <defs><linearGradient id="sG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.accent} stopOpacity="0.25" /><stop offset="100%" stopColor={C.accent} stopOpacity="0" /></linearGradient></defs>
      <polygon points={data.map((d, i) => `${pL + (i / (data.length - 1)) * uW},${uH - ((d.avgScore - 1100) / (max - 1100)) * uH}`).join(" ") + ` ${pL + uW},${uH} ${pL},${uH}`} fill="url(#sG)" />
      <polyline points={data.map((d, i) => `${pL + (i / (data.length - 1)) * uW},${uH - ((d.avgScore - 1100) / (max - 1100)) * uH}`).join(" ")} fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => <circle key={i} cx={pL + (i / (data.length - 1)) * uW} cy={uH - ((d.avgScore - 1100) / (max - 1100)) * uH} r="3.5" fill={C.bg} stroke={C.accent} strokeWidth="2" />)}
    </svg>
  );
};
const ProgressRing = ({ percent, size = 44, stroke = 4, color = C.accent }) => {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r, off = circ - (percent / 100) * circ;
  return (<svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} /></svg>);
};
const DiffBadge = ({ level }) => {
  const m = { Easy: { bg: C.successBg, c: C.success }, Medium: { bg: C.warningBg, c: C.warning }, Hard: { bg: C.dangerBg, c: C.danger }, Beginner: { bg: C.successBg, c: C.success }, Intermediate: { bg: C.warningBg, c: C.warning }, Advanced: { bg: C.dangerBg, c: C.danger } };
  const s = m[level] || m.Medium;
  return <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.c }}>{level}</span>;
};
const Btn = ({ children, onClick, primary, small, style: sx }) => (
  <button onClick={onClick} style={{ padding: small ? "6px 12px" : "9px 20px", borderRadius: 10, border: primary ? "none" : `1px solid ${C.border}`, cursor: "pointer", background: primary ? `linear-gradient(135deg, ${C.accent}, ${C.accentLight})` : "transparent", color: primary ? "#fff" : C.textSec, fontSize: small ? 12 : 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s", ...sx }}>{children}</button>
);
const InputField = ({ label, value, onChange, type = "text", placeholder, textarea, select, options }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>
    {select ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : textarea ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
    )}
  </div>
);
const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`, width: wide ? 640 : 480, maxHeight: "85vh", overflow: "auto", animation: "modalIn 0.25s ease" }}>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}><Icon d={ic.close} size={18} color={C.textSec} /></button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

const hoverCard = (e, enter) => { e.currentTarget.style.borderColor = enter ? C.accent + "44" : C.border; e.currentTarget.style.transform = enter ? "translateY(-2px)" : "translateY(0)"; };
const hoverRow = (e, enter) => { e.currentTarget.style.borderColor = enter ? C.accent + "44" : C.border; e.currentTarget.style.transform = enter ? "translateX(4px)" : "translateX(0)"; };

export default function SATAdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [sideOpen, setSideOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(null);
  const [lessons, setLessons] = useState(initLessons);
  const [flashcards, setFlashcards] = useState(initFlashcards);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setNewsLoading(true);
    newsAPI.getAll()
      .then(data => setNews(data.articles || []))
      .catch(() => setNews(initNews))
      .finally(() => setNewsLoading(false));
  }, []);

  const openModal = (type, data = null) => {
    if (type === "lesson") setForm(data ? { ...data, newUrl: "" } : { title: "", section: "Math", level: "Beginner", duration: "", desc: "", videoCount: 0, youtubeUrls: [], newUrl: "" });
    else if (type === "flashcard") setForm(data ? { ...data } : { deck: "", category: "Verbal", cardCount: 0, emoji: "📚" });
    else if (type === "news") setForm(data ? { ...data } : { title: "", excerpt: "", category: "Мэдээ", status: "draft" });
    setModal({ type, editing: !!data, data });
  };
  const saveModal = () => {
    if (modal.type === "lesson") {
      if (modal.editing) setLessons(ls => ls.map(l => l.id === modal.data.id ? { ...l, ...form } : l));
      else setLessons(ls => [...ls, { ...form, id: Date.now(), students: 0, status: "draft" }]);
    } else if (modal.type === "flashcard") {
      if (modal.editing) setFlashcards(fs => fs.map(f => f.id === modal.data.id ? { ...f, ...form } : f));
      else setFlashcards(fs => [...fs, { ...form, id: Date.now(), mastered: 0, color: [C.accent, C.success, C.pink, C.cyan, C.warning, "#9B59B6"][Math.floor(Math.random() * 6)] }]);
    } else if (modal.type === "news") {
      const payload = {
        title: form.title,
        summary: form.excerpt || form.summary || "",
        category: form.category,
        categoryLabel: form.category,
        published: form.status === "published",
        pinned: form.pinned || false,
        content: form.content || [],
      };
      if (modal.editing) {
        newsAPI.update(modal.data._id || modal.data.id, payload)
          .then(data => setNews(ns => ns.map(n => (n._id || n.id) === (modal.data._id || modal.data.id) ? data.article : n)))
          .catch(err => console.error("Мэдээ засах алдаа:", err));
      } else {
        newsAPI.create(payload)
          .then(data => setNews(ns => [data.article, ...ns]))
          .catch(err => console.error("Мэдээ нэмэх алдаа:", err));
      }
    }
    setModal(null);
  };
  const deleteItem = (type, id) => {
    if (type === "lesson") setLessons(ls => ls.filter(l => l.id !== id));
    else if (type === "flashcard") setFlashcards(fs => fs.filter(f => f.id !== id));
    else if (type === "news") {
      newsAPI.delete(id)
        .then(() => setNews(ns => ns.filter(n => (n._id || n.id) !== id)))
        .catch(err => console.error("Мэдээ устгах алдаа:", err));
    }
  };

  const navItems = [
    { id: "dashboard", label: "Хянах самбар", icon: ic.dashboard },
    { id: "students", label: "Сурагчид", icon: ic.students },
    { id: "lessons", label: "Хичээлүүд", icon: ic.lessons },
    { id: "flashcards", label: "Flashcards", icon: ic.flashcards },
    { id: "questions", label: "Асуултууд", icon: ic.questions },
    { id: "tests", label: "Шалгалтууд", icon: ic.tests },
    { id: "news", label: "Мэдээ", icon: ic.news },
    { id: "analytics", label: "Аналитик", icon: ic.analytics },
    { id: "settings", label: "Тохиргоо", icon: ic.settings },
  ];
  const tabTitles = { dashboard: "Хянах самбар", students: "Сурагчид", lessons: "Хичээлүүд", flashcards: "Flashcards", questions: "Асуултууд", tests: "Шалгалтууд", news: "Мэдээ оруулах", analytics: "Аналитик", settings: "Тохиргоо" };
  const statCards = [
    { label: "Нийт сурагчид", value: "1,284", change: "+12%", icon: ic.students, color: C.accent, data: [40, 42, 38, 45, 50, 48, 52, 55] },
    { label: "Дундаж оноо", value: "1,342", change: "+28", icon: ic.target, color: C.success, data: [1280, 1310, 1295, 1340, 1360, 1325, 1380, 1342] },
    { label: "Идэвхтэй streak", value: "8.4", change: "+1.2", icon: ic.fire, color: C.warning, data: [5, 6, 5.5, 7, 7.2, 8, 8.1, 8.4] },
    { label: "Шалгалт бөглөлт", value: "87%", change: "+5%", icon: ic.trophy, color: C.pink, data: [72, 75, 78, 80, 82, 84, 85, 87] },
  ];

  // ── DASHBOARD ──
  const renderDashboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {statCards.map((c, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 14, padding: "20px 20px 12px", border: `1px solid ${C.border}`, transition: "all 0.2s" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div><div style={{ fontSize: 12, color: C.textSec, marginBottom: 6 }}>{c.label}</div><div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>{c.value}</div></div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={c.icon} size={18} color={c.color} /></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span style={{ fontSize: 12, color: C.success, fontWeight: 600 }}>↑ {c.change}</span>
              <MiniChart data={c.data} color={c.color} height={32} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
        <div style={{ background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div><div style={{ fontSize: 16, fontWeight: 600 }}>Оноо ахиц</div><div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Сүүлийн 2 долоо хоног</div></div>
            <div style={{ padding: "6px 14px", borderRadius: 8, background: C.accentGlow, color: C.accentLight, fontSize: 12, fontWeight: 600 }}>+8.9%</div>
          </div>
          <ScoreChart data={testHistory} />
        </div>
        <div style={{ background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Шилдэг сурагчид</div>
          {[...initStudents].sort((a, b) => b.score - a.score).slice(0, 5).map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: i === 0 ? "linear-gradient(135deg,#FFD700,#FFA500)" : i === 1 ? "linear-gradient(135deg,#C0C0C0,#A0A0A0)" : i === 2 ? "linear-gradient(135deg,#CD7F32,#B8860B)" : C.border, color: i < 3 ? "#000" : C.textSec }}>{i + 1}</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{s.avatar}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: 11, color: C.textSec }}>M:{s.math} · V:{s.verbal}</div></div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.accentLight }}>{s.score}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Хэсгийн гүйцэтгэл</div>
          {[{ label: "Algebra", pct: 74, color: C.accent }, { label: "Geometry", pct: 68, color: C.success }, { label: "Reading", pct: 62, color: C.warning }, { label: "Writing", pct: 81, color: C.pink }, { label: "Statistics", pct: 58, color: C.cyan }].map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, color: C.textSec }}>{s.label}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{s.pct}%</span></div>
              <div style={{ height: 6, borderRadius: 3, background: C.border }}><div style={{ height: "100%", borderRadius: 3, background: s.color, width: `${s.pct}%`, transition: "width 1s" }} /></div>
            </div>
          ))}
        </div>
        <div style={{ background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Сүүлийн үйлдлүүд</div>
          {[{ a: "Болд шалгалт дуусгав", t: "2 цагийн өмнө", c: C.accent }, { a: "Шинэ хичээл нэмэгдэв", t: "3 цагийн өмнө", c: C.success }, { a: "Анужин 1560 оноо авлаа", t: "5 цагийн өмнө", c: C.warning }, { a: "Flashcard deck шинэчлэгдэв", t: "1 өдрийн өмнө", c: C.pink }, { a: "Шинэ мэдээ нийтлэгдэв", t: "1 өдрийн өмнө", c: C.cyan }].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.c }} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{x.a}</div><div style={{ fontSize: 11, color: C.textMut }}>{x.t}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── STUDENTS ──
  const fStudents = initStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const renderStudents = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>{fStudents.length} сурагч</div>
        <Btn primary><Icon d={ic.plus} size={14} color="#fff" /> Сурагч нэмэх</Btn>
      </div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Сурагч", "Оноо", "Явц", "Streak", "Төлөвлөгөө", "Төлөв", ""].map(h => <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.textMut, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>)}</tr></thead>
          <tbody>{fStudents.map(s => (
            <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.accent}88,${C.accentLight}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s.avatar}</div><div><div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: 11, color: C.textMut }}>{s.email}</div></div></div></td>
              <td style={{ padding: "12px 16px" }}><div style={{ fontSize: 15, fontWeight: 700 }}>{s.score}</div><div style={{ fontSize: 10, color: C.textMut }}>M:{s.math} V:{s.verbal}</div></td>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><ProgressRing percent={s.progress} size={32} stroke={3} color={s.progress > 80 ? C.success : s.progress > 50 ? C.warning : C.danger} /><span style={{ fontSize: 13, fontWeight: 600 }}>{s.progress}%</span></div></td>
              <td style={{ padding: "12px 16px" }}><span style={{ color: s.streak > 0 ? C.warning : C.textMut }}>🔥</span> <span style={{ fontSize: 13, fontWeight: 600 }}>{s.streak}</span></td>
              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.plan === "Premium" ? C.accentGlow : C.border + "66", color: s.plan === "Premium" ? C.accentLight : C.textSec }}>{s.plan}</span></td>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: s.status === "active" ? C.success : C.textMut }} /><span style={{ fontSize: 12, color: s.status === "active" ? C.success : C.textMut }}>{s.status === "active" ? "Идэвхтэй" : "Идэвхгүй"}</span></div></td>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", gap: 6 }}><button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button><button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  // ── LESSONS ──
  const fLessons = lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase()) || l.desc.toLowerCase().includes(search.toLowerCase()));
  const renderLessons = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>{["Бүгд", "Math", "Verbal"].map(f => <button key={f} style={{ padding: "6px 16px", borderRadius: 8, border: `1px solid ${C.border}`, cursor: "pointer", background: f === "Бүгд" ? C.accent + "22" : "transparent", color: f === "Бүгд" ? C.accentLight : C.textSec, fontSize: 12, fontWeight: 500 }}>{f}</button>)}</div>
        <Btn primary onClick={() => openModal("lesson")}><Icon d={ic.plus} size={14} color="#fff" /> Хичээл нэмэх</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {fLessons.map(l => {
          const firstVid = (l.youtubeUrls || []).length > 0 ? getYouTubeId(l.youtubeUrls[0]) : null;
          const urlCount = (l.youtubeUrls || []).length;
          return (
          <div key={l.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, transition: "all 0.2s", overflow: "hidden" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
            {/* YouTube Thumbnail */}
            {firstVid && (
              <div style={{ width: "100%", height: 140, background: "#000", position: "relative", overflow: "hidden" }}>
                <img src={`https://img.youtube.com/vi/${firstVid}/hqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                    <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} />
                  </div>
                </div>
                {urlCount > 1 && (
                  <div style={{ position: "absolute", top: 8, right: 8, padding: "3px 10px", borderRadius: 6, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: 11, fontWeight: 600, backdropFilter: "blur(4px)" }}>
                    {urlCount} видео
                  </div>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }} />
              </div>
            )}
            <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: l.section === "Math" ? C.accentGlow : C.successBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{l.section === "Math" ? "📐" : "📖"}</div>
              <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: l.status === "published" ? C.successBg : C.warningBg, color: l.status === "published" ? C.success : C.warning }}>{l.status === "published" ? "Нийтлэгдсэн" : "Ноорог"}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{l.title}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 12 }}>{l.desc}</div>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMut, marginBottom: 14, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: urlCount > 0 ? C.danger : C.textMut }}>
                {urlCount > 0 ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" fill="#FF0000"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg> : <Icon d={ic.video} size={12} color={C.textMut} />}
                {urlCount > 0 ? `${urlCount} YouTube` : `${l.videoCount} видео`}
              </span>
              <span>{l.duration}</span>
              <DiffBadge level={l.level} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon d={ic.students} size={14} color={C.textSec} /><span style={{ fontSize: 13, fontWeight: 600 }}>{l.students}</span><span style={{ fontSize: 11, color: C.textMut }}>сурагч</span></div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => openModal("lesson", l)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button>
                <button onClick={() => deleteItem("lesson", l.id)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
              </div>
            </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  // ── FLASHCARDS ──
  const fFlash = flashcards.filter(f => f.deck.toLowerCase().includes(search.toLowerCase()));
  const renderFlashcards = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: C.card, borderRadius: 10, padding: "10px 18px", border: `1px solid ${C.border}` }}><div style={{ fontSize: 11, color: C.textMut }}>Нийт карт</div><div style={{ fontSize: 20, fontWeight: 700 }}>{flashcards.reduce((a, f) => a + f.cardCount, 0)}</div></div>
          <div style={{ background: C.card, borderRadius: 10, padding: "10px 18px", border: `1px solid ${C.border}` }}><div style={{ fontSize: 11, color: C.textMut }}>Эзэмшсэн</div><div style={{ fontSize: 20, fontWeight: 700, color: C.success }}>{flashcards.reduce((a, f) => a + f.mastered, 0)}</div></div>
          <div style={{ background: C.card, borderRadius: 10, padding: "10px 18px", border: `1px solid ${C.border}` }}><div style={{ fontSize: 11, color: C.textMut }}>Deck тоо</div><div style={{ fontSize: 20, fontWeight: 700, color: C.accentLight }}>{flashcards.length}</div></div>
        </div>
        <Btn primary onClick={() => openModal("flashcard")}><Icon d={ic.plus} size={14} color="#fff" /> Deck нэмэх</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {fFlash.map(f => {
          const pct = f.cardCount > 0 ? Math.round((f.mastered / f.cardCount) * 100) : 0;
          return (
            <div key={f.id} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, transition: "all 0.2s", position: "relative", overflow: "hidden" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${f.color}, ${f.color}66)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, marginTop: 4 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{f.emoji}</div>
                <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.border + "66", color: C.textSec }}>{f.category}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{f.deck}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: C.textSec }}>{f.mastered}/{f.cardCount} эзэмшсэн</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: pct > 70 ? C.success : pct > 40 ? C.warning : C.textSec }}>{pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: C.border, marginBottom: 16 }}>
                <div style={{ height: "100%", borderRadius: 3, background: f.color, width: `${pct}%`, transition: "width 0.8s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                <Btn small onClick={() => openModal("flashcard", f)}><Icon d={ic.edit} size={13} color={C.textSec} /> Засах</Btn>
                <button onClick={() => deleteItem("flashcard", f.id)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── QUESTIONS ──
  const fQ = initQuestions.filter(q => q.text.toLowerCase().includes(search.toLowerCase()));
  const renderQuestions = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>{["Бүгд", "Math", "Verbal"].map(f => <button key={f} style={{ padding: "6px 16px", borderRadius: 8, border: `1px solid ${C.border}`, cursor: "pointer", background: f === "Бүгд" ? C.accent + "22" : "transparent", color: f === "Бүгд" ? C.accentLight : C.textSec, fontSize: 12, fontWeight: 500 }}>{f}</button>)}</div>
        <Btn primary><Icon d={ic.plus} size={14} color="#fff" /> Асуулт нэмэх</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {fQ.map(q => (
          <div key={q.id} style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, transition: "all 0.15s" }} onMouseEnter={e => hoverRow(e, true)} onMouseLeave={e => hoverRow(e, false)}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: q.type === "Math" ? C.accentGlow : C.successBg, fontSize: 16 }}>{q.type === "Math" ? "📐" : "📖"}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{q.text}</div><div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMut }}><span>{q.type} · {q.section}</span><span>Хэрэглэсэн: {q.usageCount}</span></div></div>
            <div style={{ textAlign: "center", marginRight: 12 }}><div style={{ fontSize: 18, fontWeight: 700, color: q.correctRate > 70 ? C.success : q.correctRate > 55 ? C.warning : C.danger }}>{q.correctRate}%</div><div style={{ fontSize: 10, color: C.textMut }}>Зөв</div></div>
            <DiffBadge level={q.difficulty} />
            <div style={{ display: "flex", gap: 6, marginLeft: 8 }}><button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button><button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TESTS ──
  const renderTests = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>5 шалгалт</div>
        <Btn primary><Icon d={ic.plus} size={14} color="#fff" /> Шалгалт үүсгэх</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {[{ n: "Practice Test #1", q: 154, d: "3 цаг", t: 42, a: 1280, s: "active" }, { n: "Practice Test #2", q: 154, d: "3 цаг", t: 38, a: 1310, s: "active" }, { n: "Math Focus", q: 58, d: "1 цаг", t: 65, a: 680, s: "active" }, { n: "Verbal Focus", q: 66, d: "1.5 цаг", t: 51, a: 650, s: "draft" }, { n: "Mini Diagnostic", q: 40, d: "45 мин", t: 89, a: 1250, s: "active" }].map((t, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, transition: "all 0.2s" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📝</div>
              <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: t.s === "active" ? C.successBg : C.warningBg, color: t.s === "active" ? C.success : C.warning }}>{t.s === "active" ? "Идэвхтэй" : "Ноорог"}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{t.n}</div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.textSec, marginBottom: 14 }}><span>{t.q} асуулт</span><span>{t.d}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>{t.t}</div><div style={{ fontSize: 10, color: C.textMut }}>Бөглөсөн</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 700, color: C.accentLight }}>{t.a}</div><div style={{ fontSize: 10, color: C.textMut }}>Дундаж</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── NEWS ──
  const fNews = news.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  const renderNews = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>{["Бүгд", "Мэдээ", "Зөвлөгөө", "Амжилт", "Шинэчлэл"].map(f => <button key={f} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, cursor: "pointer", background: f === "Бүгд" ? C.accent + "22" : "transparent", color: f === "Бүгд" ? C.accentLight : C.textSec, fontSize: 12, fontWeight: 500 }}>{f}</button>)}</div>
        <Btn primary onClick={() => openModal("news")}><Icon d={ic.plus} size={14} color="#fff" /> Мэдээ нэмэх</Btn>
      </div>
      {newsLoading && <div style={{ textAlign: "center", color: C.textSec, padding: 40 }}>Уншиж байна...</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fNews.map(n => {
          const nId = n._id || n.id;
          const isPublished = n.published || n.status === "published";
          return (
          <div key={nId} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, display: "flex", gap: 20, transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "44"} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div><div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{n.title}</div><div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{n.summary || n.excerpt}</div></div>
                <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: isPublished ? C.successBg : C.warningBg, color: isPublished ? C.success : C.warning, flexShrink: 0, marginLeft: 12 }}>{isPublished ? "Нийтлэгдсэн" : "Ноорог"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.textMut, alignItems: "center" }}>
                  <span>{n.createdAt ? new Date(n.createdAt).toISOString().slice(0, 10) : n.date}</span>
                  <span style={{ padding: "2px 8px", borderRadius: 6, background: C.border + "66" }}>{n.category}</span>
                  {n.pinned && <span style={{ color: C.warning }}>📌 Онцлох</span>}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => openModal("news", { ...n, excerpt: n.summary || n.excerpt, status: isPublished ? "published" : "draft" })} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button>
                  <button onClick={() => deleteItem("news", nId)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  const renderPlaceholder = (icon, title, desc) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, color: C.textMut }}>
      <Icon d={icon} size={48} color={C.textMut} /><div style={{ fontSize: 18, fontWeight: 600, marginTop: 16, color: C.textSec }}>{title}</div><div style={{ fontSize: 13, marginTop: 6 }}>{desc}</div>
    </div>
  );

  const renderContent = () => {
    switch (tab) {
      case "dashboard": return renderDashboard();
      case "students": return renderStudents();
      case "lessons": return renderLessons();
      case "flashcards": return renderFlashcards();
      case "questions": return renderQuestions();
      case "tests": return renderTests();
      case "news": return renderNews();
      case "analytics": return renderPlaceholder(ic.analytics, "Аналитик удахгүй...", "Нарийвчилсан тайлан боловсруулагдаж байна");
      case "settings": return renderPlaceholder(ic.settings, "Тохиргоо", "Системийн тохиргоо удахгүй нэмэгдэнэ");
      default: return renderDashboard();
    }
  };

  const renderModal = () => {
    if (!modal) return null;
    if (modal.type === "lesson") return (
      <Modal open title={modal.editing ? "Хичээл засах" : "Шинэ хичээл нэмэх"} onClose={() => setModal(null)} wide>
        <InputField label="Хичээлийн нэр" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Жнь: Advanced Algebra" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Хэсэг" value={form.section} onChange={v => setForm({ ...form, section: v })} select options={["Math", "Verbal"]} />
          <InputField label="Түвшин" value={form.level} onChange={v => setForm({ ...form, level: v })} select options={["Beginner", "Intermediate", "Advanced"]} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Хугацаа" value={form.duration || ""} onChange={v => setForm({ ...form, duration: v })} placeholder="Жнь: 1.5 цаг" />
          <InputField label="Видео тоо" value={form.videoCount || ""} onChange={v => setForm({ ...form, videoCount: Number(v) })} type="number" />
        </div>
        <InputField label="Тайлбар" value={form.desc || ""} onChange={v => setForm({ ...form, desc: v })} textarea placeholder="Хичээлийн товч тайлбар..." />
        
        {/* YouTube Unlisted Videos Section */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>YouTube Unlisted бичлэгүүд</label>
          <div style={{ background: C.bg, borderRadius: 12, border: `1px solid ${C.border}`, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={form.newUrl || ""} onChange={e => setForm({ ...form, newUrl: e.target.value })} placeholder="https://youtu.be/... эсвэл https://youtube.com/watch?v=..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button onClick={() => {
                if (form.newUrl && form.newUrl.trim()) {
                  const urls = form.youtubeUrls || [];
                  setForm({ ...form, youtubeUrls: [...urls, form.newUrl.trim()], newUrl: "", videoCount: urls.length + 1 });
                }
              }} style={{ padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, color: "#fff", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>+ Нэмэх</button>
            </div>
            <div style={{ fontSize: 11, color: C.textMut, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: C.warning }}>💡</span> YouTube дээр Unlisted горимоор upload хийсэн бичлэгийн линкийг оруулна
            </div>
          </div>
          
          {/* Video list */}
          {(form.youtubeUrls || []).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(form.youtubeUrls || []).map((url, idx) => {
                const vid = getYouTubeId(url);
                return (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 10, padding: "8px 12px", border: `1px solid ${C.border}` }}>
                    {vid ? (
                      <div style={{ width: 80, height: 45, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#000", position: "relative" }}>
                        <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #fff", marginLeft: 2 }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: 80, height: 45, borderRadius: 6, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon d={ic.video} size={18} color={C.textMut} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>Видео #{idx + 1}</div>
                      <div style={{ fontSize: 11, color: C.textMut, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</div>
                    </div>
                    <button onClick={() => {
                      const urls = [...(form.youtubeUrls || [])];
                      urls.splice(idx, 1);
                      setForm({ ...form, youtubeUrls: urls, videoCount: urls.length });
                    }} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon d={ic.trash} size={13} color={C.danger} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal}>Хадгалах</Btn>
        </div>
      </Modal>
    );
    if (modal.type === "flashcard") return (
      <Modal open title={modal.editing ? "Deck засах" : "Шинэ Flashcard Deck"} onClose={() => setModal(null)}>
        <InputField label="Deck нэр" value={form.deck} onChange={v => setForm({ ...form, deck: v })} placeholder="Жнь: SAT Vocabulary Set 3" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Ангилал" value={form.category} onChange={v => setForm({ ...form, category: v })} select options={["Verbal", "Math", "Strategy"]} />
          <InputField label="Карт тоо" value={form.cardCount || ""} onChange={v => setForm({ ...form, cardCount: Number(v) })} type="number" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Emoji</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["📚", "📐", "✏️", "📏", "🔤", "💡", "🧠", "🎯", "📊", "🔢"].map(e => (
              <button key={e} onClick={() => setForm({ ...form, emoji: e })} style={{ width: 40, height: 40, borderRadius: 10, fontSize: 20, cursor: "pointer", border: form.emoji === e ? `2px solid ${C.accent}` : `1px solid ${C.border}`, background: form.emoji === e ? C.accentGlow : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</button>
            ))}
          </div>
        </div>
        <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Картын жишээ</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: C.bg, borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, color: C.textMut, marginBottom: 6 }}>НҮҮР ТАЛ</div>
              <div style={{ fontSize: 13, color: C.text }}>Ubiquitous</div>
            </div>
            <div style={{ background: C.bg, borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, color: C.textMut, marginBottom: 6 }}>АР ТАЛ</div>
              <div style={{ fontSize: 13, color: C.text }}>Хаа сайгүй байдаг</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal}>Хадгалах</Btn>
        </div>
      </Modal>
    );
    if (modal.type === "news") return (
      <Modal open title={modal.editing ? "Мэдээ засах" : "Шинэ мэдээ нэмэх"} onClose={() => setModal(null)} wide>
        <InputField label="Гарчиг" value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Мэдээний гарчиг..." />
        <InputField label="Товч агуулга" value={form.excerpt} onChange={v => setForm({ ...form, excerpt: v })} textarea placeholder="Мэдээний товч тайлбар..." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Ангилал" value={form.category} onChange={v => setForm({ ...form, category: v })} select options={["Мэдээ", "Зөвлөгөө", "Амжилт", "Шинэчлэл"]} />
          <InputField label="Төлөв" value={form.status} onChange={v => setForm({ ...form, status: v })} select options={["draft", "published"]} />
        </div>
        <div style={{ padding: "16px", borderRadius: 12, border: `2px dashed ${C.border}`, textAlign: "center", marginBottom: 8, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "66"} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
          <Icon d={ic.image} size={28} color={C.textMut} />
          <div style={{ fontSize: 13, color: C.textSec, marginTop: 8 }}>Нүүр зураг оруулах</div>
          <div style={{ fontSize: 11, color: C.textMut, marginTop: 4 }}>PNG, JPG · 1200x630 санал болгоно</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal}>{modal.editing ? "Хадгалах" : "Нийтлэх"}</Btn>
        </div>
      </Modal>
    );
    return null;
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: C.bg, color: C.text, minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <div style={{ width: sideOpen ? 240 : 68, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ padding: sideOpen ? "20px 20px 16px" : "20px 12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", borderBottom: `1px solid ${C.border}` }} onClick={() => setSideOpen(!sideOpen)}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff" }}>S</div>
          {sideOpen && <div><div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>SAT Prep</div><div style={{ fontSize: 10, color: C.textMut }}>Admin Panel</div></div>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSearch(""); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: sideOpen ? "10px 12px" : "10px", justifyContent: sideOpen ? "flex-start" : "center",
              borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2, fontSize: 13, fontWeight: 500,
              background: tab === item.id ? C.accentGlow : "transparent",
              color: tab === item.id ? C.accentLight : C.textSec, transition: "all 0.15s",
            }} onMouseEnter={e => { if (tab !== item.id) e.currentTarget.style.background = C.surfaceHover; }} onMouseLeave={e => { if (tab !== item.id) e.currentTarget.style.background = "transparent"; }}>
              <Icon d={item.icon} size={18} color={tab === item.id ? C.accentLight : C.textSec} />
              {sideOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        {sideOpen && (
          <div style={{ padding: "16px 16px 20px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${C.success}88,${C.success})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>А</div>
              <div><div style={{ fontSize: 13, fontWeight: 500 }}>Админ</div><div style={{ fontSize: 10, color: C.textMut }}>admin@satprep.mn</div></div>
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ height: 60, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, background: C.surface, flexShrink: 0 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{tabTitles[tab]}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 10, background: C.card, border: `1px solid ${C.border}`, width: 240 }}>
              <Icon d={ic.search} size={15} color={C.textMut} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Хайх..." style={{ border: "none", background: "transparent", color: C.text, fontSize: 13, outline: "none", width: "100%", fontFamily: "inherit" }} />
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}><Icon d={ic.bell} size={18} color={C.textSec} /><div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: C.danger, border: `2px solid ${C.surface}` }} /></div>
          </div>
        </header>
        <main style={{ flex: 1, overflow: "auto", padding: 28, opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}>
          {renderContent()}
        </main>
      </div>
      {renderModal()}
    </div>
  );
}
