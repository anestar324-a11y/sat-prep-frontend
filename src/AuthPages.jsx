// ─── AUTH PAGES ───
// Энэ файлыг src/AuthPages.jsx нэрээр хадгална
// App.jsx дотроос import хийж ашиглана

import { useState } from "react";

const T = {
  bg: "#F7F8FA", card: "#FFFFFF", primary: "#3B6BF5", primaryLight: "#EBF0FF",
  accent: "#FFCC00", accentLight: "#FFF8DC", text: "#1A1D26", textSec: "#6B7280",
  border: "#E5E7EB", success: "#22C55E", danger: "#EF4444",
};

const API_URL = "https://sat-prep-backend.onrender.com/api";

// ─── LOGIN PAGE ───
export const LoginPage = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Имэйл болон нууц үг оруулна уу"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("sat_token", data.token);
      localStorage.setItem("sat_user", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Нэвтрэхэд алдаа гарлаа");
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Left - Branding */}
        <div style={styles.brandSide}>
          <div style={styles.brandContent}>
            <div style={styles.logoBox}>S</div>
            <h1 style={styles.brandTitle}>SATPrep</h1>
            <p style={styles.brandSub}>SAT DINO PREP</p>
            <div style={styles.brandDesc}>
              SAT шалгалтад бэлдэх хамгийн шилдэг платформ. Хичээл, тест, flashcard бүгд нэг дор.
            </div>
            <div style={styles.stats}>
              <div style={styles.statItem}>
                <div style={styles.statNum}>1600</div>
                <div style={styles.statLabel}>Зорилтот оноо</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNum}>500+</div>
                <div style={styles.statLabel}>Асуултууд</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNum}>100%</div>
                <div style={styles.statLabel}>Үнэгүй</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div style={styles.formSide}>
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>Нэвтрэх</h2>
            <p style={styles.formSubtitle}>Тавтай морил! Имэйл, нууц үгээ оруулна уу.</p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Имэйл хаяг</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Нууц үг</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button onClick={handleLogin} disabled={loading} style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>

            <div style={styles.switchText}>
              Бүртгэлгүй юу?{" "}
              <span onClick={onSwitch} style={styles.switchLink}>Бүртгүүлэх</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── REGISTER PAGE ───
export const RegisterPage = ({ onRegister, onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!name || !email || !password) { setError("Бүх талбарыг бөглөнө үү"); return; }
    if (password.length < 6) { setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"); return; }
    if (password !== confirmPassword) { setError("Нууц үг таарахгүй байна"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("sat_token", data.token);
      localStorage.setItem("sat_user", JSON.stringify(data.user));
      onRegister(data.user);
    } catch (err) {
      setError(err.message || "Бүртгүүлэхэд алдаа гарлаа");
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Left - Branding */}
        <div style={styles.brandSide}>
          <div style={styles.brandContent}>
            <div style={styles.logoBox}>S</div>
            <h1 style={styles.brandTitle}>SATPrep</h1>
            <p style={styles.brandSub}>SAT DINO PREP</p>
            <div style={styles.brandDesc}>
              Бүртгүүлээд SAT-д бэлдэж эхлээрэй. Бүх хичээл, тест, flashcard үнэгүй!
            </div>
            <div style={styles.features}>
              {["Бодит SAT шалгалттай адил тестүүд", "500+ дасгал асуулт", "Flashcard & Үгсийн сан", "Явцын хяналт & Статистик"].map((f, i) => (
                <div key={i} style={styles.featureItem}>
                  <div style={styles.checkIcon}>✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div style={styles.formSide}>
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>Бүртгүүлэх</h2>
            <p style={styles.formSubtitle}>Шинэ хаяг үүсгэж, суралцаж эхлээрэй!</p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Нэр</label>
              <input
                type="text"
                placeholder="Таны нэр"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Имэйл хаяг</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Утасны дугаар (заавал биш)</label>
              <input
                type="tel"
                placeholder="+976 9911 2233"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Нууц үг</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Нууц үг давтах</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
              </div>
            </div>

            <button onClick={handleRegister} disabled={loading} style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
            </button>

            <div style={styles.switchText}>
              Бүртгэлтэй юу?{" "}
              <span onClick={onSwitch} style={styles.switchLink}>Нэвтрэх</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── STYLES ───
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, #1a1e3a 0%, #2d1b69 50%, #1a1e3a 100%)`,
    fontFamily: "'DM Sans', sans-serif",
    padding: 20,
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: 960,
    minHeight: 600,
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
  },
  brandSide: {
    flex: 1,
    background: `linear-gradient(135deg, ${T.primary}, #1a3a8a)`,
    padding: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  brandContent: {
    maxWidth: 360,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: T.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: T.text,
    fontWeight: 800,
    fontSize: 24,
    fontFamily: "'Space Grotesk', monospace",
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    margin: 0,
  },
  brandSub: {
    fontSize: 11,
    fontWeight: 600,
    color: T.accent,
    letterSpacing: "2px",
    marginTop: 4,
  },
  brandDesc: {
    fontSize: 15,
    lineHeight: 1.7,
    opacity: 0.85,
    marginTop: 24,
  },
  stats: {
    display: "flex",
    gap: 24,
    marginTop: 32,
  },
  statItem: {
    textAlign: "center",
  },
  statNum: {
    fontSize: 24,
    fontWeight: 700,
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 32,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    opacity: 0.9,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
  formSide: {
    flex: 1,
    background: T.card,
    padding: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContent: {
    width: "100%",
    maxWidth: 380,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: T.text,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  formSubtitle: {
    fontSize: 14,
    color: T.textSec,
    marginTop: 8,
    marginBottom: 28,
  },
  errorBox: {
    background: "#FEF2F2",
    color: T.danger,
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 14,
    marginBottom: 20,
    border: "1px solid #FECACA",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: T.textSec,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: `1.5px solid ${T.border}`,
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    background: T.bg,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px 24px",
    borderRadius: 14,
    border: "none",
    background: T.primary,
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    marginTop: 8,
    transition: "all 0.2s",
  },
  switchText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
    color: T.textSec,
  },
  switchLink: {
    color: T.primary,
    fontWeight: 600,
    cursor: "pointer",
  },
};
