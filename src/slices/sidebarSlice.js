import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false, // For mobile off-canvas drawer (< lg screens)
  isCollapsed: false, // For desktop collapsible mini-mode (>= lg screens)
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    setSidebarOpen: (state, action) => {
      state.isOpen = action.payload
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
    setCollapsed: (state, action) => {
      state.isCollapsed = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, toggleCollapse, setCollapsed } =
  sidebarSlice.actions

export default sidebarSlice.reducer
