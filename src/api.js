// ─── API Helper ───
// Backend сервертэй холбогдох бүх функцууд

const API_URL = "https://sat-prep-backend.onrender.com/api";

// Token хадгалах / авах
const getToken = () => localStorage.getItem("sat_token");
const setToken = (token) => localStorage.setItem("sat_token", token);
const removeToken = () => localStorage.removeItem("sat_token");

// Хэрэглэгчийн мэдээлэл хадгалах
const getUser = () => {
  const user = localStorage.getItem("sat_user");
  return user ? JSON.parse(user) : null;
};
const setUser = (user) => localStorage.setItem("sat_user", JSON.stringify(user));
const removeUser = () => localStorage.removeItem("sat_user");

// ─── Fetch helper ───
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Render free tier returns HTML when sleeping — handle non-JSON gracefully
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      if (!response.ok) {
        throw new Error(`Сервер унтаж байна уу? (${response.status}). Хэдэн секунд хүлээгээд дахин оролдоно уу.`);
      }
      throw new Error(`Буруу хариу: ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Алдаа гарлаа");
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      const friendlyErr = new Error("Сервертэй холбогдож чадсангүй. Интернет эсвэл backend шалгана уу.");
      console.error(`API алдаа [${endpoint}]:`, error);
      throw friendlyErr;
    }
    console.error(`API алдаа [${endpoint}]:`, error);
    throw error;
  }
};

// ─── AUTH API ───
export const authAPI = {
  // Бүртгүүлэх
  register: async (name, email, phone, password) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  // Нэвтрэх
  login: async (email, password) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  // Гарах
  logout: () => {
    removeToken();
    removeUser();
  },

  // Профайл авах
  getProfile: async () => {
    return await apiFetch("/auth/me");
  },

  // Профайл шинэчлэх
  updateProfile: async (updates) => {
    const data = await apiFetch("/auth/me", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    setUser(data.user);
    return data;
  },

  // Нууц үг солих
  changePassword: async (currentPassword, newPassword) => {
    return await apiFetch("/auth/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Нэвтэрсэн эсэх
  isLoggedIn: () => !!getToken(),

  // Хадгалсан хэрэглэгч
  getStoredUser: getUser,
};

// ─── QUESTIONS API ───
export const questionsAPI = {
  getTopics: async (section) => {
    const query = section ? `?section=${section}` : "";
    return await apiFetch(`/questions/topics${query}`);
  },
  getByTopic: async (topicId, difficulty, limit = 15) => {
    const params = new URLSearchParams({ limit });
    if (difficulty && difficulty !== "all") params.append("difficulty", difficulty);
    return await apiFetch(`/questions/topic/${topicId}?${params}`);
  },
  getPracticeTest: async (testNumber) => {
    return await apiFetch(`/questions/practice-test/${testNumber}`);
  },
  checkAnswer: async (questionId, selectedAnswer) => {
    return await apiFetch("/questions/check", {
      method: "POST",
      body: JSON.stringify({ questionId, selectedAnswer }),
    });
  },
  // Admin
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return await apiFetch(`/questions/admin/all?${params}`);
  },
  create: async (data) => {
    return await apiFetch("/questions", { method: "POST", body: JSON.stringify(data) });
  },
  update: async (id, data) => {
    return await apiFetch(`/questions/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: async (id) => {
    return await apiFetch(`/questions/${id}`, { method: "DELETE" });
  },
};

// ─── TESTS API ───
export const testsAPI = {
  // Тест хадгалах
  submit: async (testData) => {
    return await apiFetch("/tests/submit", {
      method: "POST",
      body: JSON.stringify(testData),
    });
  },

  // Тестийн түүх
  getHistory: async (testType, limit = 20) => {
    const params = new URLSearchParams({ limit });
    if (testType) params.append("testType", testType);
    return await apiFetch(`/tests/history?${params}`);
  },

  // Нэг тестийн дэлгэрэнгүй
  getById: async (id) => {
    return await apiFetch(`/tests/${id}`);
  },

  // Шилдэг оноонууд
  getBestScores: async () => {
    return await apiFetch("/tests/best/scores");
  },
};

// ─── PROGRESS API ───
export const progressAPI = {
  // Миний progress
  get: async () => {
    return await apiFetch("/progress");
  },

  // Dashboard статистик
  getStats: async () => {
    return await apiFetch("/progress/stats");
  },

  // Хичээл шинэчлэх
  updateLesson: async (lessonData) => {
    return await apiFetch("/progress/lesson", {
      method: "PUT",
      body: JSON.stringify(lessonData),
    });
  },

  // Flashcard шинэчлэх
  updateFlashcard: async (flashcardData) => {
    return await apiFetch("/progress/flashcard", {
      method: "PUT",
      body: JSON.stringify(flashcardData),
    });
  },
};

// ─── FLASHCARDS API ───
export const flashcardsAPI = {
  getDecks: async (section, difficulty) => {
    const params = new URLSearchParams();
    if (section) params.append("section", section);
    if (difficulty && difficulty !== "all") params.append("difficulty", difficulty);
    return await apiFetch(`/flashcards/decks?${params}`);
  },
  getDeck: async (deckId) => {
    return await apiFetch(`/flashcards/deck/${deckId}`);
  },
  getRandom: async () => {
    return await apiFetch("/flashcards/random");
  },
  // Admin
  createCard: async (data) => {
    return await apiFetch("/flashcards", { method: "POST", body: JSON.stringify(data) });
  },
  deleteDeck: async (deckId) => {
    return await apiFetch(`/flashcards/deck/${deckId}`, { method: "DELETE" });
  },
  deleteCard: async (id) => {
    return await apiFetch(`/flashcards/${id}`, { method: "DELETE" });
  },
};

// ─── VIDEOS API ───
export const videosAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return await apiFetch(`/videos/admin/all?${params}`);
  },
  create: async (data) => {
    return await apiFetch("/videos", { method: "POST", body: JSON.stringify(data) });
  },
  update: async (id, data) => {
    return await apiFetch(`/videos/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: async (id) => {
    return await apiFetch(`/videos/${id}`, { method: "DELETE" });
  },
};

// ─── NEWS API ───
export const newsAPI = {
  // Бүх мэдээ
  getAll: async (category) => {
    const query = category && category !== "all" ? `?category=${category}` : "";
    return await apiFetch(`/news${query}`);
  },

  // Онцлох мэдээ
  getPinned: async () => {
    return await apiFetch("/news/pinned");
  },

  // Нэг мэдээ
  getById: async (id) => {
    return await apiFetch(`/news/${id}`);
  },

  // Мэдээ нэмэх
  create: async (data) => {
    return await apiFetch("/news", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Мэдээ шинэчлэх
  update: async (id, data) => {
    return await apiFetch(`/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Мэдээ устгах
  delete: async (id) => {
    return await apiFetch(`/news/${id}`, {
      method: "DELETE",
    });
  },
};
