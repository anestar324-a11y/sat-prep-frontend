import { useState, useEffect } from "react";
import { newsAPI, videosAPI, questionsAPI, flashcardsAPI } from "./api";

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

const testHistory = [
  { date: "04/01", avgScore: 1280 }, { date: "04/03", avgScore: 1310 }, { date: "04/05", avgScore: 1295 },
  { date: "04/07", avgScore: 1340 }, { date: "04/09", avgScore: 1360 }, { date: "04/11", avgScore: 1325 },
  { date: "04/13", avgScore: 1380 }, { date: "04/15", avgScore: 1395 },
];

const getYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]{11})/);
  return m ? m[1] : (url.length === 11 ? url : null);
};

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
  const m = {
    easy: { bg: C.successBg, c: C.success }, Easy: { bg: C.successBg, c: C.success },
    medium: { bg: C.warningBg, c: C.warning }, Medium: { bg: C.warningBg, c: C.warning },
    hard: { bg: C.dangerBg, c: C.danger }, Hard: { bg: C.dangerBg, c: C.danger },
    beginner: { bg: C.successBg, c: C.success }, Beginner: { bg: C.successBg, c: C.success },
    intermediate: { bg: C.warningBg, c: C.warning }, Intermediate: { bg: C.warningBg, c: C.warning },
    advanced: { bg: C.dangerBg, c: C.danger }, Advanced: { bg: C.dangerBg, c: C.danger },
  };
  const s = m[level] || { bg: C.border, c: C.textSec };
  return <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.c }}>{level}</span>;
};

const Btn = ({ children, onClick, primary, small, style: sx, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{ padding: small ? "6px 12px" : "9px 20px", borderRadius: 10, border: primary ? "none" : `1px solid ${C.border}`, cursor: disabled ? "not-allowed" : "pointer", background: primary ? `linear-gradient(135deg, ${C.accent}, ${C.accentLight})` : "transparent", color: primary ? "#fff" : C.textSec, fontSize: small ? 12 : 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s", opacity: disabled ? 0.6 : 1, ...sx }}>{children}</button>
);

const InputField = ({ label, value, onChange, type = "text", placeholder, textarea, select, options }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>
    {select ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }}>
        {options.map(o => <option key={o.value !== undefined ? o.value : o} value={o.value !== undefined ? o.value : o}>{o.label !== undefined ? o.label : o}</option>)}
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
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [videos, setVideos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({ videos: false, questions: false, flashcards: false, news: false });

  useEffect(() => { setMounted(true); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadVideos = () => {
    setLoading(l => ({ ...l, videos: true }));
    videosAPI.getAll()
      .then(d => setVideos(d.videos || []))
      .catch(err => showToast(err.message || "Видео ачааллахад алдаа", "error"))
      .finally(() => setLoading(l => ({ ...l, videos: false })));
  };

  useEffect(() => {
    if (tab === "lessons") {
      loadVideos();
    }
    if (tab === "questions" && questions.length === 0) {
      setLoading(l => ({ ...l, questions: true }));
      questionsAPI.getAll().then(d => setQuestions(d.questions || [])).catch(() => {}).finally(() => setLoading(l => ({ ...l, questions: false })));
    }
    if (tab === "flashcards" && flashcardDecks.length === 0) {
      setLoading(l => ({ ...l, flashcards: true }));
      flashcardsAPI.getDecks().then(d => setFlashcardDecks(d.decks || [])).catch(() => {}).finally(() => setLoading(l => ({ ...l, flashcards: false })));
    }
    if (tab === "news" && news.length === 0) {
      setLoading(l => ({ ...l, news: true }));
      newsAPI.getAll().then(d => setNews(d.articles || [])).catch(() => {}).finally(() => setLoading(l => ({ ...l, news: false })));
    }
  }, [tab]);

  const openModal = (type, data = null) => {
    if (type === "video") {
      setForm(data ? {
        ...data,
        youtubeUrl: data.youtubeId ? `https://youtu.be/${data.youtubeId}` : "",
      } : {
        title: "", youtubeUrl: "", section: "math", topic: "", topicName: "",
        order: 0, duration: 0, difficulty: "beginner", isFree: true, description: "", published: true,
      });
    } else if (type === "question") {
      setForm(data ? { ...data } : {
        section: "math", topic: "heart-of-algebra", topicName: "Heart of Algebra",
        difficulty: "medium", questionText: "", imageUrl: "", passage: "", explanation: "",
        correctAnswer: "A", practiceTestId: "",
        options: [{ label: "A", text: "" }, { label: "B", text: "" }, { label: "C", text: "" }, { label: "D", text: "" }],
      });
    } else if (type === "flashcard") {
      setForm({ deckId: "", deckName: "", section: "english", difficulty: "medium", emoji: "📚", front: "", back: "", example: "" });
    } else if (type === "news") {
      setForm(data ? {
        ...data,
        excerpt: data.summary || data.excerpt || "",
        status: (data.published || data.status === "published") ? "published" : "draft",
      } : { title: "", excerpt: "", category: "Мэдээ", status: "draft", pinned: false });
    }
    setModal({ type, editing: !!data, data });
  };

  const saveModal = async () => {
    setSaving(true);
    try {
      if (modal.type === "video") {
        if (!form.title?.trim()) throw new Error("Хичээлийн нэр оруулна уу");
        if (!form.youtubeUrl?.trim()) throw new Error("YouTube URL оруулна уу");
        const youtubeId = getYouTubeId(form.youtubeUrl) || (form.youtubeUrl.length === 11 ? form.youtubeUrl : null);
        if (!youtubeId) throw new Error("YouTube URL буруу байна. youtu.be/... эсвэл 11 тэмдэгт ID оруулна уу");
        const payload = {
          title: form.title,
          description: form.description || "",
          youtubeId,
          section: form.section,
          topic: form.topic || form.topicName || form.title,
          topicName: form.topicName || form.topic || form.title,
          order: Number(form.order) || 0,
          duration: Number(form.duration) || 0,
          difficulty: form.difficulty,
          isFree: form.isFree !== false,
          published: form.published !== false,
        };
        if (modal.editing) {
          const d = await videosAPI.update(modal.data._id, payload);
          setVideos(vs => vs.map(v => v._id === modal.data._id ? d.video : v));
        } else {
          const d = await videosAPI.create(payload);
          setVideos(vs => [d.video, ...vs]);
        }
        showToast("Видео хадгалагдлаа!");
      } else if (modal.type === "question") {
        const payload = {
          section: form.section, topic: form.topic, topicName: form.topicName,
          difficulty: form.difficulty, questionText: form.questionText,
          imageUrl: form.imageUrl || null, passage: form.passage || null, explanation: form.explanation,
          correctAnswer: form.correctAnswer, options: form.options,
          practiceTestId: form.practiceTestId ? Number(form.practiceTestId) : null,
          emoji: form.emoji || "📝",
        };
        if (modal.editing) {
          const d = await questionsAPI.update(modal.data._id, payload);
          setQuestions(qs => qs.map(q => q._id === modal.data._id ? d.question : q));
        } else {
          const d = await questionsAPI.create(payload);
          setQuestions(qs => [d.question, ...qs]);
        }
        showToast("Асуулт хадгалагдлаа!");
      } else if (modal.type === "flashcard") {
        const payload = {
          deckId: form.deckId || form.deckName.toLowerCase().replace(/\s+/g, "-"),
          deckName: form.deckName, section: form.section, difficulty: form.difficulty,
          emoji: form.emoji || "📝", front: form.front, back: form.back, example: form.example || null,
        };
        await flashcardsAPI.createCard(payload);
        const d = await flashcardsAPI.getDecks();
        setFlashcardDecks(d.decks || []);
        showToast("Карт нэмэгдлээ!");
      } else if (modal.type === "news") {
        const payload = {
          title: form.title, summary: form.excerpt || "",
          category: form.category, categoryLabel: form.category,
          published: form.status === "published", pinned: form.pinned || false, content: [],
        };
        if (modal.editing) {
          const d = await newsAPI.update(modal.data._id || modal.data.id, payload);
          setNews(ns => ns.map(n => (n._id || n.id) === (modal.data._id || modal.data.id) ? d.article : n));
        } else {
          const d = await newsAPI.create(payload);
          setNews(ns => [d.article, ...ns]);
        }
        showToast("Мэдээ хадгалагдлаа!");
      }
      setModal(null);
    } catch (err) {
      showToast(err.message || "Алдаа гарлаа", "error");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Устгах уу?")) return;
    try {
      if (type === "video") {
        await videosAPI.delete(id);
        setVideos(vs => vs.filter(v => v._id !== id));
        showToast("Видео устгагдлаа!");
      } else if (type === "question") {
        await questionsAPI.delete(id);
        setQuestions(qs => qs.filter(q => q._id !== id));
        showToast("Асуулт устгагдлаа!");
      } else if (type === "flashcardDeck") {
        await flashcardsAPI.deleteDeck(id);
        setFlashcardDecks(ds => ds.filter(d => d._id !== id));
        showToast("Deck устгагдлаа!");
      } else if (type === "news") {
        await newsAPI.delete(id);
        setNews(ns => ns.filter(n => (n._id || n.id) !== id));
        showToast("Мэдээ устгагдлаа!");
      }
    } catch (err) {
      showToast(err.message || "Устгах алдаа", "error");
    }
  };

  const navItems = [
    { id: "dashboard", label: "Хянах самбар", icon: ic.dashboard },
    { id: "students", label: "Сурагчид", icon: ic.students },
    { id: "lessons", label: "Видео хичээл", icon: ic.lessons },
    { id: "flashcards", label: "Flashcards", icon: ic.flashcards },
    { id: "questions", label: "Асуултууд", icon: ic.questions },
    { id: "tests", label: "Шалгалтууд", icon: ic.tests },
    { id: "news", label: "Мэдээ", icon: ic.news },
    { id: "analytics", label: "Аналитик", icon: ic.analytics },
    { id: "settings", label: "Тохиргоо", icon: ic.settings },
  ];
  const tabTitles = { dashboard: "Хянах самбар", students: "Сурагчид", lessons: "Видео хичээлүүд", flashcards: "Flashcards", questions: "Асуултууд", tests: "Шалгалтууд", news: "Мэдээ оруулах", analytics: "Аналитик", settings: "Тохиргоо" };
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
    </div>
  );

  // ── STUDENTS ──
  const fStudents = initStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const renderStudents = () => (
    <div>
      <div style={{ fontSize: 12, color: C.textSec, marginBottom: 20 }}>{fStudents.length} сурагч</div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Сурагч", "Оноо", "Явц", "Streak", "Төлөвлөгөө", "Төлөв"].map(h => <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.textMut, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>)}</tr></thead>
          <tbody>{fStudents.map(s => (
            <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.accent}88,${C.accentLight}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s.avatar}</div><div><div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: 11, color: C.textMut }}>{s.email}</div></div></div></td>
              <td style={{ padding: "12px 16px" }}><div style={{ fontSize: 15, fontWeight: 700 }}>{s.score}</div><div style={{ fontSize: 10, color: C.textMut }}>M:{s.math} V:{s.verbal}</div></td>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><ProgressRing percent={s.progress} size={32} stroke={3} color={s.progress > 80 ? C.success : s.progress > 50 ? C.warning : C.danger} /><span style={{ fontSize: 13, fontWeight: 600 }}>{s.progress}%</span></div></td>
              <td style={{ padding: "12px 16px" }}><span style={{ color: s.streak > 0 ? C.warning : C.textMut }}>🔥</span> <span style={{ fontSize: 13, fontWeight: 600 }}>{s.streak}</span></td>
              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.plan === "Premium" ? C.accentGlow : C.border + "66", color: s.plan === "Premium" ? C.accentLight : C.textSec }}>{s.plan}</span></td>
              <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: s.status === "active" ? C.success : C.textMut }} /><span style={{ fontSize: 12, color: s.status === "active" ? C.success : C.textMut }}>{s.status === "active" ? "Идэвхтэй" : "Идэвхгүй"}</span></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  // ── LESSONS (Videos) ──
  const fVideos = videos.filter(v => (v.title || "").toLowerCase().includes(search.toLowerCase()));
  const renderLessons = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, color: C.textSec }}>{fVideos.length} видео хичээл</div>
          <button onClick={loadVideos} disabled={loading.videos} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.textSec, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{loading.videos ? "..." : "↻ Refresh"}</button>
        </div>
        <Btn primary onClick={() => openModal("video")}><Icon d={ic.plus} size={14} color="#fff" /> Видео нэмэх</Btn>
      </div>
      {loading.videos && <div style={{ textAlign: "center", color: C.textSec, padding: 40 }}>Уншиж байна...</div>}
      {!loading.videos && fVideos.length === 0 && (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Icon d={ic.video} size={40} color={C.textMut} />
          <div style={{ marginTop: 16, fontSize: 16, color: C.textSec }}>Видео хичээл байхгүй байна</div>
          <div style={{ fontSize: 13, color: C.textMut, marginTop: 4 }}>Дээрх товчийг дарж нэмнэ үү</div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {fVideos.map(v => (
          <div key={v._id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, transition: "all 0.2s", overflow: "hidden" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
            {v.youtubeId && (
              <div style={{ width: "100%", height: 140, background: "#000", position: "relative", overflow: "hidden" }}>
                <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} />
                  </div>
                </div>
              </div>
            )}
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 600, flex: 1, paddingRight: 8 }}>{v.title}</div>
                <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, flexShrink: 0, background: v.published ? C.successBg : C.warningBg, color: v.published ? C.success : C.warning }}>{v.published ? "Нийтлэгдсэн" : "Ноорог"}</span>
              </div>
              <div style={{ fontSize: 12, color: C.textSec, marginBottom: 8 }}>{v.topicName || v.topic} · {v.section}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
                <DiffBadge level={v.difficulty} />
                {v.duration > 0 && <span style={{ fontSize: 11, color: C.textMut }}>{v.duration} мин</span>}
                {v.viewCount > 0 && <span style={{ fontSize: 11, color: C.textMut }}>{v.viewCount} үзэлт</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => openModal("video", v)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button>
                <button onClick={() => deleteItem("video", v._id)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── FLASHCARDS ──
  const fDecks = flashcardDecks.filter(d => (d.deckName || "").toLowerCase().includes(search.toLowerCase()));
  const renderFlashcards = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>{fDecks.length} deck · Шинэ карт нэмэхдээ Deck ID давтана уу</div>
        <Btn primary onClick={() => openModal("flashcard")}><Icon d={ic.plus} size={14} color="#fff" /> Карт нэмэх</Btn>
      </div>
      {loading.flashcards && <div style={{ textAlign: "center", color: C.textSec, padding: 40 }}>Уншиж байна...</div>}
      {!loading.flashcards && fDecks.length === 0 && (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 16, color: C.textSec }}>Flashcard deck байхгүй байна</div>
          <div style={{ fontSize: 13, color: C.textMut, marginTop: 4 }}>Карт нэмэхэд Deck автоматаар үүснэ</div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {fDecks.map(d => (
          <div key={d._id} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, transition: "all 0.2s" }} onMouseEnter={e => hoverCard(e, true)} onMouseLeave={e => hoverCard(e, false)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{d.emoji || "📚"}</span>
              <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.border + "66", color: C.textSec }}>{d.section}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{d.deckName}</div>
            <div style={{ fontSize: 12, color: C.textMut, marginBottom: 4 }}>ID: <code style={{ background: C.border, padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>{d._id}</code></div>
            <div style={{ fontSize: 12, color: C.textMut, marginBottom: 12 }}>{d.totalCards} карт · {d.difficulty}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              <Btn small onClick={() => openModal("flashcard")}><Icon d={ic.plus} size={13} color={C.textSec} /> Карт нэмэх</Btn>
              <button onClick={() => deleteItem("flashcardDeck", d._id)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── QUESTIONS ──
  const fQ = questions.filter(q => (q.questionText || "").toLowerCase().includes(search.toLowerCase()));
  const renderQuestions = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>{fQ.length} асуулт</div>
        <Btn primary onClick={() => openModal("question")}><Icon d={ic.plus} size={14} color="#fff" /> Асуулт нэмэх</Btn>
      </div>
      {loading.questions && <div style={{ textAlign: "center", color: C.textSec, padding: 40 }}>Уншиж байна...</div>}
      {!loading.questions && fQ.length === 0 && (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Icon d={ic.questions} size={40} color={C.textMut} />
          <div style={{ marginTop: 16, fontSize: 16, color: C.textSec }}>Асуулт байхгүй байна</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {fQ.map(q => (
          <div key={q._id} style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, transition: "all 0.15s" }} onMouseEnter={e => hoverRow(e, true)} onMouseLeave={e => hoverRow(e, false)}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: q.section === "math" ? C.accentGlow : C.successBg, fontSize: 16, flexShrink: 0 }}>{q.section === "math" ? "📐" : "📖"}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.questionText}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMut }}>
                <span>{q.section} · {q.topicName || q.topic}</span>
                {q.practiceTestId && <span style={{ color: C.accentLight }}>Practice #{q.practiceTestId}</span>}
              </div>
            </div>
            <DiffBadge level={q.difficulty} />
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => openModal("question", q)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button>
              <button onClick={() => deleteItem("question", q._id)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.trash} size={14} color={C.danger} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TESTS ──
  const renderTests = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 16, textAlign: "center" }}>
      <Icon d={ic.tests} size={48} color={C.textMut} />
      <div style={{ fontSize: 18, fontWeight: 600, color: C.textSec }}>Practice Test нэмэх</div>
      <div style={{ fontSize: 13, color: C.textMut, maxWidth: 400, lineHeight: 1.7 }}>
        "Асуултууд" цэсэнд асуулт нэмж,{" "}
        <code style={{ background: C.border, padding: "2px 8px", borderRadius: 6, fontSize: 12 }}>practiceTestId</code>{" "}
        талбарт Practice Test дугаарыг (1, 2, 3...) оруулна уу. Тухайн дугаартай тест автоматаар үүсч, сурагчдад харагдана.
      </div>
      <Btn primary onClick={() => setTab("questions")}><Icon d={ic.plus} size={14} color="#fff" /> Асуулт нэмэх рүү очих</Btn>
    </div>
  );

  // ── NEWS ──
  const fNews = news.filter(n => (n.title || "").toLowerCase().includes(search.toLowerCase()));
  const renderNews = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>{fNews.length} мэдээ</div>
        <Btn primary onClick={() => openModal("news")}><Icon d={ic.plus} size={14} color="#fff" /> Мэдээ нэмэх</Btn>
      </div>
      {loading.news && <div style={{ textAlign: "center", color: C.textSec, padding: 40 }}>Уншиж байна...</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fNews.map(n => {
          const nId = n._id || n.id;
          const isPublished = n.published || n.status === "published";
          return (
            <div key={nId} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, display: "flex", gap: 20, transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "44"} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{n.summary || n.excerpt}</div>
                  </div>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, flexShrink: 0, background: isPublished ? C.successBg : C.warningBg, color: isPublished ? C.success : C.warning }}>{isPublished ? "Нийтлэгдсэн" : "Ноорог"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: C.textMut, alignItems: "center" }}>
                    <span>{n.createdAt ? new Date(n.createdAt).toISOString().slice(0, 10) : n.date}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 6, background: C.border + "66" }}>{n.category}</span>
                    {n.pinned && <span style={{ color: C.warning }}>📌 Онцлох</span>}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openModal("news", n)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={ic.edit} size={14} color={C.textSec} /></button>
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
      <Icon d={icon} size={48} color={C.textMut} />
      <div style={{ fontSize: 18, fontWeight: 600, marginTop: 16, color: C.textSec }}>{title}</div>
      <div style={{ fontSize: 13, marginTop: 6 }}>{desc}</div>
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

  // ── MODALS ──
  const renderModal = () => {
    if (!modal) return null;

    if (modal.type === "video") return (
      <Modal open title={modal.editing ? "Видео засах" : "Шинэ видео хичээл нэмэх"} onClose={() => setModal(null)} wide>
        <InputField label="Хичээлийн нэр" value={form.title || ""} onChange={v => setForm({ ...form, title: v })} placeholder="Жнь: Heart of Algebra - Intro" />
        <InputField label="YouTube URL эсвэл Video ID" value={form.youtubeUrl || ""} onChange={v => setForm({ ...form, youtubeUrl: v })} placeholder="https://youtu.be/xxx эсвэл dQw4w9WgXcQ" />
        {(getYouTubeId(form.youtubeUrl) || (form.youtubeUrl && form.youtubeUrl.length === 11)) && (
          <div style={{ marginBottom: 16 }}>
            <img src={`https://img.youtube.com/vi/${getYouTubeId(form.youtubeUrl) || form.youtubeUrl}/mqdefault.jpg`} alt="" style={{ width: "100%", borderRadius: 10 }} />
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Хэсэг" value={form.section || "math"} onChange={v => setForm({ ...form, section: v })} select options={[{ value: "math", label: "Math" }, { value: "reading-writing", label: "Reading & Writing" }, { value: "general", label: "Ерөнхий" }]} />
          <InputField label="Түвшин" value={form.difficulty || "beginner"} onChange={v => setForm({ ...form, difficulty: v })} select options={[{ value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" }]} />
        </div>
        <InputField label="Сэдэв ID (URL-д харагдах)" value={form.topic || ""} onChange={v => setForm({ ...form, topic: v })} placeholder="Жнь: heart-of-algebra" />
        <InputField label="Сэдэвийн нэр (харагдах)" value={form.topicName || ""} onChange={v => setForm({ ...form, topicName: v })} placeholder="Жнь: Heart of Algebra" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Эрэмбэ (дотор эрэмбэ)" value={form.order ?? 0} onChange={v => setForm({ ...form, order: v })} type="number" />
          <InputField label="Хугацаа (минут)" value={form.duration ?? 0} onChange={v => setForm({ ...form, duration: v })} type="number" />
        </div>
        <InputField label="Тайлбар" value={form.description || ""} onChange={v => setForm({ ...form, description: v })} textarea placeholder="Видеоны товч тайлбар..." />
        <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.textSec }}>
            <input type="checkbox" checked={form.published !== false} onChange={e => setForm({ ...form, published: e.target.checked })} />
            Нийтлэх
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.textSec }}>
            <input type="checkbox" checked={form.isFree !== false} onChange={e => setForm({ ...form, isFree: e.target.checked })} />
            Үнэгүй
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal} disabled={saving}>{saving ? "Хадгалж байна..." : "Хадгалах"}</Btn>
        </div>
      </Modal>
    );

    if (modal.type === "question") return (
      <Modal open title={modal.editing ? "Асуулт засах" : "Шинэ асуулт нэмэх"} onClose={() => setModal(null)} wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Хэсэг" value={form.section || "math"} onChange={v => setForm({ ...form, section: v })} select options={[{ value: "math", label: "Math" }, { value: "reading-writing", label: "Reading & Writing" }]} />
          <InputField label="Бэрхшээл" value={form.difficulty || "medium"} onChange={v => setForm({ ...form, difficulty: v })} select options={[{ value: "easy", label: "Easy" }, { value: "medium", label: "Medium" }, { value: "hard", label: "Hard" }]} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Сэдэв ID" value={form.topic || ""} onChange={v => setForm({ ...form, topic: v })} placeholder="heart-of-algebra" />
          <InputField label="Сэдэвийн нэр" value={form.topicName || ""} onChange={v => setForm({ ...form, topicName: v })} placeholder="Heart of Algebra" />
        </div>
        <InputField label="Practice Test дугаар (сэдэвчилсэн бол хоосон)" value={form.practiceTestId || ""} onChange={v => setForm({ ...form, practiceTestId: v })} type="number" placeholder="1, 2, 3..." />
        <InputField label="Асуултын текст" value={form.questionText || ""} onChange={v => setForm({ ...form, questionText: v })} textarea placeholder="Асуултаа бичнэ үү..." />
        <InputField label="Зураг/График URL (заавал биш)" value={form.imageUrl || ""} onChange={v => setForm({ ...form, imageUrl: v })} placeholder="https://... зураг байвал URL-г оруулна уу" />
        {form.imageUrl && (
          <div style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <img src={form.imageUrl} alt="Preview" style={{ width: "100%", maxHeight: 200, objectFit: "contain", background: C.bg }} />
          </div>
        )}
        <InputField label="Passage (унших хэсэг, заавал биш)" value={form.passage || ""} onChange={v => setForm({ ...form, passage: v })} textarea placeholder="Унших хэсэг байвал бичнэ үү..." />
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Хариултын сонголтууд (зөв дээр товшино)</label>
          {(form.options || [{ label: "A", text: "" }, { label: "B", text: "" }, { label: "C", text: "" }, { label: "D", text: "" }]).map((opt, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
              <div
                style={{ width: 32, height: 32, borderRadius: 8, background: form.correctAnswer === opt.label ? C.accentGlow : C.border + "44", border: `2px solid ${form.correctAnswer === opt.label ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: form.correctAnswer === opt.label ? C.accentLight : C.textSec, cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}
                onClick={() => setForm({ ...form, correctAnswer: opt.label })}
              >{opt.label}</div>
              <input
                value={opt.text}
                onChange={e => {
                  const opts = [...(form.options || [])];
                  opts[i] = { ...opts[i], text: e.target.value };
                  setForm({ ...form, options: opts });
                }}
                placeholder={`${opt.label} сонголт...`}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${form.correctAnswer === opt.label ? C.accent : C.border}`, background: C.bg, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }}
              />
            </div>
          ))}
        </div>
        <InputField label="Тайлбар (explanation)" value={form.explanation || ""} onChange={v => setForm({ ...form, explanation: v })} textarea placeholder="Зөв хариултын тайлбар..." />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal} disabled={saving}>{saving ? "Хадгалж байна..." : "Хадгалах"}</Btn>
        </div>
      </Modal>
    );

    if (modal.type === "flashcard") return (
      <Modal open title="Шинэ карт нэмэх" onClose={() => setModal(null)}>
        <InputField label="Deck ID (давтан ашиглах боломжтой)" value={form.deckId || ""} onChange={v => setForm({ ...form, deckId: v })} placeholder="sat-vocab-1" />
        <InputField label="Deck нэр" value={form.deckName || ""} onChange={v => setForm({ ...form, deckName: v })} placeholder="SAT Vocabulary Set 1" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Хэсэг" value={form.section || "english"} onChange={v => setForm({ ...form, section: v })} select options={[{ value: "english", label: "English" }, { value: "math", label: "Math" }]} />
          <InputField label="Бэрхшээл" value={form.difficulty || "medium"} onChange={v => setForm({ ...form, difficulty: v })} select options={[{ value: "easy", label: "Easy" }, { value: "medium", label: "Medium" }, { value: "hard", label: "Hard" }]} />
        </div>
        <InputField label="Нүүр тал (үг, асуулт)" value={form.front || ""} onChange={v => setForm({ ...form, front: v })} placeholder="Жнь: Ubiquitous" />
        <InputField label="Ар тал (тайлбар, хариулт)" value={form.back || ""} onChange={v => setForm({ ...form, back: v })} placeholder="Жнь: Хаа сайгүй байдаг" />
        <InputField label="Жишээ өгүүлбэр (заавал биш)" value={form.example || ""} onChange={v => setForm({ ...form, example: v })} placeholder="Жнь: Technology is ubiquitous in modern life." />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal} disabled={saving}>{saving ? "Хадгалж байна..." : "Хадгалах"}</Btn>
        </div>
      </Modal>
    );

    if (modal.type === "news") return (
      <Modal open title={modal.editing ? "Мэдээ засах" : "Шинэ мэдээ нэмэх"} onClose={() => setModal(null)} wide>
        <InputField label="Гарчиг" value={form.title || ""} onChange={v => setForm({ ...form, title: v })} placeholder="Мэдээний гарчиг..." />
        <InputField label="Товч агуулга" value={form.excerpt || ""} onChange={v => setForm({ ...form, excerpt: v })} textarea placeholder="Мэдээний товч тайлбар..." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Ангилал" value={form.category || "Мэдээ"} onChange={v => setForm({ ...form, category: v })} select options={["Мэдээ", "Зөвлөгөө", "Амжилт", "Шинэчлэл"]} />
          <InputField label="Төлөв" value={form.status || "draft"} onChange={v => setForm({ ...form, status: v })} select options={[{ value: "draft", label: "Ноорог" }, { value: "published", label: "Нийтлэх" }]} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.textSec, marginBottom: 16 }}>
          <input type="checkbox" checked={form.pinned || false} onChange={e => setForm({ ...form, pinned: e.target.checked })} />
          Онцлох мэдээ болгох (📌)
        </label>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Btn onClick={() => setModal(null)}>Болих</Btn>
          <Btn primary onClick={saveModal} disabled={saving}>{saving ? "Хадгалж байна..." : modal.editing ? "Хадгалах" : "Нийтлэх"}</Btn>
        </div>
      </Modal>
    );

    return null;
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: C.bg, color: C.text, minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 2000, padding: "12px 20px", borderRadius: 12, background: toast.type === "error" ? C.dangerBg : C.successBg, border: `1px solid ${toast.type === "error" ? C.danger : C.success}`, color: toast.type === "error" ? C.danger : C.success, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", animation: "modalIn 0.25s ease" }}>
          {toast.type === "error" ? "❌ " : "✅ "}{toast.msg}
        </div>
      )}
      <div style={{ width: sideOpen ? 240 : 68, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ padding: sideOpen ? "20px 20px 16px" : "20px 12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", borderBottom: `1px solid ${C.border}` }} onClick={() => setSideOpen(!sideOpen)}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff" }}>S</div>
          {sideOpen && <div><div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>SAT Prep</div><div style={{ fontSize: 10, color: C.textMut }}>Admin Panel</div></div>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSearch(""); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: sideOpen ? "10px 12px" : "10px", justifyContent: sideOpen ? "flex-start" : "center", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2, fontSize: 13, fontWeight: 500, background: tab === item.id ? C.accentGlow : "transparent", color: tab === item.id ? C.accentLight : C.textSec, transition: "all 0.15s" }} onMouseEnter={e => { if (tab !== item.id) e.currentTarget.style.background = C.surfaceHover; }} onMouseLeave={e => { if (tab !== item.id) e.currentTarget.style.background = "transparent"; }}>
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
