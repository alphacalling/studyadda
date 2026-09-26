import { useEffect } from "react"
import { HiMenuAlt2 } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"
import ForceChangePasswordModal from "../components/core/Dashboard/ForceChangePasswordModal"
import { setSidebarOpen, toggleSidebar } from "../slices/sidebarSlice"

function Dashboard() {
  const { loading: profileLoading, user } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  // Auto-close mobile sidebar drawer on route change
  useEffect(() => {
    dispatch(setSidebarOpen(false))
  }, [location.pathname, dispatch])

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  // Format current active tab title from URL
  const pathSegments = location.pathname.split("/").filter(Boolean)
  const currentTab = pathSegments[pathSegments.length - 1] || "dashboard"
  const formattedTitle = currentTab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] overflow-hidden bg-richblack-900">
      {/* Sidebar (Desktop collapsible + Mobile off-canvas drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex h-full flex-1 flex-col overflow-y-auto bg-richblack-900">
        {/* Mobile / Tablet Sub-Header Bar with Hamburger Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-richblack-800 bg-richblack-900/90 px-4 py-2.5 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex items-center justify-center rounded-lg border border-richblack-700 bg-richblack-800 p-2 text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors"
              aria-label="Open sidebar menu"
            >
              <HiMenuAlt2 className="text-xl" />
            </button>
            <div className="flex items-center text-xs font-medium text-richblack-400">
              <span className="hidden sm:inline">Dashboard</span>
              <span className="hidden sm:inline mx-1.5">/</span>
              <span className="font-semibold text-yellow-50">{formattedTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-richblack-800 border border-richblack-700 px-2.5 py-0.5 text-[11px] font-medium text-richblack-300">
              {user?.accountType}
            </span>
          </div>
        </div>

        {/* Page Content Container */}
        <main className="mx-auto w-11/12 max-w-[1000px] py-6 sm:py-10 pb-24">
          <Outlet />
        </main>
      </div>

      {/* Force Change Password Modal (Locks dashboard when logged in with temporary password) */}
      {user?.mustChangePassword && <ForceChangePasswordModal />}
    </div>
  )
}

export default Dashboard
