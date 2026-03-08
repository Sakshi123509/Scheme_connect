// import axios from "axios";

// // Backend ka URL
// const API_BASE_URL = "http://localhost:3000/api";

// // Axios instance banao (default settings ke saath)
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Har request mein token automatically add karo
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Agar 401 error aaye (unauthorized) to login page pe bhejo
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// // ========== AUTH APIs ==========
// export const authAPI = {
//   // Register
//   register: (data) => api.post("/auth/register", data),
  
//   // Login
//   login: (data) => api.post("/auth/login", data),
  
//   // Get current user
//   getProfile: () => api.get("/auth/profile"),
// };

// // ========== PROFILE APIs ==========
// export const profileAPI = {
//   create: (data) => api.post("/profile", data),
//   get: () => api.get("/profile"),
//   update: (data) => api.put("/profile", data),
// };

// // ========== APPLICATION APIs ==========
// export const applicationAPI = {
//   apply: (schemeId) => api.post("/applications", { schemeId }),
//   getMyApplications: () => api.get("/applications/my"),
//   getById: (id) => api.get(`/applications/${id}`),
//   updateStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
// };

// // ========== SCHEME APIs ==========
// export const schemeAPI = {
//   getAll: () => api.get("/schemes"),
//   getById: (id) => api.get(`/schemes/${id}`),
//   create: (data) => api.post("/schemes", data),
//   update: (id, data) => api.put(`/schemes/${id}`, data),
//   delete: (id) => api.delete(`/schemes/${id}`),
// };

// export default api;
import axios from "axios";

// Backend ka URL (rendered)
const API_BASE_URL = "https://scheme-connect-w48p.onrender.com/api";

// Axios instance banao (default settings ke saath)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Har request mein token automatically add karo
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Agar 401 error aaye (unauthorized) to login page pe bhejo
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========== AUTH APIs ==========
export const authAPI = {
  // Register
  register: (data) => api.post("/auth/register", data),
  
  // Login
  login: (data) => api.post("/auth/login", data),
  
  // Get current user
  getProfile: () => api.get("/auth/profile"),
};

// ========== PROFILE APIs ==========
export const profileAPI = {
  create: (data) => api.post("/profile", data),
  get: () => api.get("/profile"),
  update: (data) => api.put("/profile", data),
};

// ========== APPLICATION APIs - ✅ FIXED ==========
export const applicationAPI = {
  // Apply for a scheme
  apply: (schemeId) => api.post("/applications", { schemeId }),
  
  // Get my applications - ✅ FIXED: Returns array with scheme details populated
  getMyApplications: () => api.get("/applications/my"),
  
  // Get application by ID
  getById: (id) => api.get(`/applications/${id}`),
  
  // Update application status (admin only)
  updateStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
  
  // ✅ NEW: Get all applications (admin only)
  getAllApplications: () => api.get("/applications"),
};

// ========== SCHEME APIs ==========
export const schemeAPI = {
  getAll: () => api.get("/schemes"),
  getById: (id) => api.get(`/schemes/${id}`),
  create: (data) => api.post("/schemes", data),
  update: (id, data) => api.put(`/schemes/${id}`, data),
  delete: (id) => api.delete(`/schemes/${id}`),
  
  // ✅ NEW: Search schemes
 search: (query) => api.get(`/schemes/search?query=${query}`),
  
  // ✅ NEW: Filter schemes
  filter: (params) => api.get("/schemes/filter", { params }),
};

export default api;