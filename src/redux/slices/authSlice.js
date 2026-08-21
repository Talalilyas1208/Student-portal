import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultStudentProfile, defaultLecturerProfile } from "../data/defaultData";

const loadStoredAuth = () => {
  try {
    const isLogin = localStorage.getItem("sp_isLogin") === "true";
    const role = localStorage.getItem("sp_role") || "student";
    const userStr = localStorage.getItem("sp_user");
    const user = userStr ? JSON.parse(userStr) : (role === "lecturer" ? defaultLecturerProfile : defaultStudentProfile);
    const token = localStorage.getItem("sp_token") || "";
    return {
      isAuthenticated: isLogin,
      role,
      user,
      token,
      loading: false,
      error: null
    };
  } catch {
    return {
      isAuthenticated: false,
      role: "student",
      user: defaultStudentProfile,
      token: "",
      loading: false,
      error: null
    };
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, role = "student" }, { rejectWithValue }) => {
    try {
      // Try fetching from dummyjson or mock server if reachable
      try {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, expiresInMins: 60 })
        });
        if (res.ok) {
          const data = await res.json();
          return {
            token: data.accessToken || data.token || "mock-auth-jwt-token",
            user: {
              ...(role === "lecturer" ? defaultLecturerProfile : defaultStudentProfile),
              name: data.firstName ? `${data.firstName} ${data.lastName}` : username,
              username,
              avatarUrl: data.image || ""
            },
            role
          };
        }
      } catch {
        // network or server unavailable, fallback smoothly
      }

      // If credentials provided or offline fallback demo credentials
      if (username) {
        return {
          token: "portal-jwt-session-" + Date.now(),
          user: {
            ...(role === "lecturer" ? defaultLecturerProfile : defaultStudentProfile),
            name: username === "kminchelle" || username === "admin" ? "Prof. Dr. Maryam Bilal" : (role === "student" ? "Talal Ilyas" : "Prof. Dr. Maryam Bilal"),
            username
          },
          role
        };
      }
      return rejectWithValue("Please provide a valid username and password");
    } catch (err) {
      return rejectWithValue(err.message || "Failed to log in");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: loadStoredAuth(),
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = state.role === "lecturer" ? defaultLecturerProfile : defaultStudentProfile;
      state.error = null;
      localStorage.removeItem("sp_isLogin");
      localStorage.removeItem("sp_role");
      localStorage.removeItem("sp_user");
      localStorage.removeItem("sp_token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("isLogins");
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("sp_role", action.payload);
      if (!state.isAuthenticated) {
        state.user = action.payload === "lecturer" ? defaultLecturerProfile : defaultStudentProfile;
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.error = null;
        localStorage.setItem("sp_isLogin", "true");
        localStorage.setItem("sp_role", action.payload.role);
        localStorage.setItem("sp_user", JSON.stringify(action.payload.user));
        localStorage.setItem("sp_token", action.payload.token);
        // Compatibility with legacy keys if needed
        localStorage.setItem(action.payload.role === "lecturer" ? "isLogins" : "isLogin", "true");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  }
});

export const { logout, setRole, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
