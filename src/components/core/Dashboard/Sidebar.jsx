import { useState } from "react"
import { VscSignOut, VscChevronLeft, VscChevronRight } from "react-icons/vsc"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import { setSidebarOpen, toggleCollapse } from "../../../slices/sidebarSlice"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { isOpen, isCollapsed } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="hidden lg:grid h-full w-[240px] items-center justify-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Backdrop Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container (Slide-over drawer on mobile, collapsible sticky column on desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col justify-between border-r border-richblack-700 bg-richblack-800 shadow-2xl transition-all duration-300 ease-in-out lg:static lg:z-auto lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-[260px] lg:w-[72px]" : "w-[260px] lg:w-[240px]"}`}
      >
        <div className="flex flex-col overflow-y-auto">
          {/* Mobile Drawer Header with Close Button */}
          <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4 lg:hidden">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-richblack-400">
                Menu
              </span>
              <span className="text-xs font-medium text-yellow-50">
                {user?.accountType} Portal
              </span>
            </div>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="rounded-lg p-1.5 text-richblack-300 hover:bg-richblack-700 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <RxCross2 className="text-xl" />
            </button>
          </div>

          {/* Desktop Collapse / Expand Header */}
          <div className="hidden lg:flex items-center justify-between px-4 py-3 border-b border-richblack-700/60">
            {!isCollapsed && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-richblack-400">
                Navigation
              </span>
            )}
            <button
              onClick={() => dispatch(toggleCollapse())}
              className={`rounded-md p-1.5 text-richblack-400 hover:bg-richblack-700 hover:text-yellow-50 transition-colors ${
                isCollapsed ? "mx-auto" : "ml-auto"
              }`}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <VscChevronRight className="text-base" />
              ) : (
                <VscChevronLeft className="text-base" />
              )}
            </button>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex flex-col py-4">
            {sidebarLinks.map((link) => {
              if (link.type) {
                if (Array.isArray(link.type)) {
                  if (!link.type.includes(user?.accountType)) return null
                } else if (user?.accountType !== link.type) {
                  return null
                }
              }
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div className="mx-auto my-2 h-[1px] w-10/12 bg-richblack-700" />

          {/* Settings and Actions */}
          <div className="flex flex-col py-2">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    dispatch(setSidebarOpen(false))
                    dispatch(logout(navigate))
                  },
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              title="Logout"
              className={`group relative flex items-center ${
                isCollapsed ? "justify-center px-3 py-3" : "px-8 py-2.5 gap-x-2.5"
              } text-sm font-medium text-richblack-300 hover:bg-richblack-700/50 hover:text-pink-200 transition-all duration-150`}
            >
              <VscSignOut className="text-base shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* User Mini Profile Tag at Bottom (When expanded) */}
        {!isCollapsed && user && (
          <div className="hidden lg:flex items-center gap-3 border-t border-richblack-700/60 p-4 bg-richblack-900/40">
            <img
              src={user?.image}
              alt={user?.firstName}
              className="h-8 w-8 rounded-full object-cover border border-richblack-700 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-semibold text-richblack-50 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] text-richblack-400 capitalize">
                {user?.accountType}
              </p>
            </div>
          </div>
        )}
      </aside>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
