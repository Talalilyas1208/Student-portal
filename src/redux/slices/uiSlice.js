import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarCollapsed: false,
    searchQuery: "",
    themeMode: "light",
    selectedModalItem: null
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setSelectedModalItem: (state, action) => {
      state.selectedModalItem = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setSearchQuery,
  setThemeMode,
  setSelectedModalItem
} = uiSlice.actions;

export default uiSlice.reducer;
