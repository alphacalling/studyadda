import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"
import { setSidebarOpen } from "../../../slices/sidebarSlice"

export default function SidebarLink({ link, iconName, onClick }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleClick = () => {
    dispatch(resetCourseState())
    dispatch(setSidebarOpen(false))
    if (onClick) onClick()
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      title={link.name}
      className={`group relative flex items-center ${
        isCollapsed ? "justify-center px-3 py-3" : "px-8 py-2.5 gap-x-2"
      } text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800/70 text-yellow-50"
          : "bg-opacity-0 text-richblack-300 hover:bg-richblack-700/50 hover:text-richblack-100"
      } transition-all duration-150`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 transition-opacity duration-150 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-x-2.5"} min-w-0`}>
        {Icon && <Icon className="text-lg shrink-0" />}
        {!isCollapsed && <span className="truncate">{link.name}</span>}
      </div>
    </NavLink>
  )
}
