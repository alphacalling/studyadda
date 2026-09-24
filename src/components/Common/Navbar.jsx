import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"

import logo from "../../assets/Logo/studyadda_dark.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { logout } from "../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data || [])
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false)
    setIsCatalogOpen(false)
  }, [location.pathname])

  // Prevent background scroll when mobile nav is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isNavOpen])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
        } transition-all duration-200 sticky top-0 z-40`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="StudyAdda Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1.5 ${matchRoute("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                      }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />

                    {/* Dropdown Menu Container (pt-3 directly bridges hover gap to top-full) */}
                    <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[1000] w-[260px] lg:w-[290px]">
                      {/* Dropdown Card */}
                      <div className="relative rounded-xl border border-richblack-700 bg-richblack-800 p-3 shadow-2xl shadow-black/80 backdrop-blur-md">
                        {/* Top Indicator Triangle */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-richblack-700 bg-richblack-800" />

                        {/* Dropdown Header */}
                        <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-richblack-700/60">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-richblack-400">
                            Course Categories
                          </span>
                          <span className="text-[11px] font-semibold text-yellow-50 bg-yellow-50/10 px-2 py-0.5 rounded-full">
                            {subLinks?.length || 0}
                          </span>
                        </div>

                        {/* Categories List */}
                        <div className="max-h-[300px] overflow-y-auto flex flex-col gap-1 pr-1">
                          {loading ? (
                            <p className="text-center py-4 text-xs text-richblack-300">
                              Loading categories...
                            </p>
                          ) : subLinks?.length ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="group/item flex items-center justify-between rounded-lg px-3 py-2 text-sm text-richblack-100 hover:text-yellow-50 hover:bg-richblack-700/60 transition-all duration-150"
                                key={i}
                              >
                                <span className="font-medium truncate">
                                  {subLink.name}
                                </span>
                                <span className="text-xs text-richblack-400 group-hover/item:text-yellow-50 group-hover/item:translate-x-0.5 transition-all">
                                  →
                                </span>
                              </Link>
                            ))
                          ) : (
                            <p className="text-center py-4 text-xs text-richblack-400">
                              No Categories Found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        } hover:text-yellow-25 transition-colors duration-200`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/dashboard/cart" className="relative p-1">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-yellow-50 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-xs font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Header Icons (Cart, Profile, Hamburger) */}
        <div className="flex items-center gap-x-3 md:hidden">
          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/dashboard/cart" className="relative p-1">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-[10px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token !== null && <ProfileDropdown />}

          <button
            onClick={() => setIsNavOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-1 text-richblack-100 hover:text-white transition-colors"
          >
            <AiOutlineMenu fontSize={26} />
          </button>
        </div>

        {/* Mobile Slide-Over Drawer */}
        {isNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Dark Backdrop */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setIsNavOpen(false)}
            />

            {/* Drawer Content */}
            <div className="fixed inset-y-0 right-0 w-[82%] max-w-[340px] bg-richblack-900 border-l border-richblack-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
              <div>
                {/* Drawer Header with Close Button */}
                <div className="flex items-center justify-between pb-5 border-b border-richblack-800">
                  <Link to="/" onClick={() => setIsNavOpen(false)} className="flex items-center">
                    <img src={logo} alt="StudyAdda Logo" className="h-8 w-auto object-contain" />
                  </Link>
                  <button
                    onClick={() => setIsNavOpen(false)}
                    aria-label="Close Navigation Menu"
                    className="p-2 text-richblack-300 hover:text-white hover:bg-richblack-800 rounded-full transition-colors"
                  >
                    <RxCross2 fontSize={22} />
                  </button>
                </div>

                {/* User Info (if logged in) */}
                {token !== null && user && (
                  <div className="flex items-center gap-3 py-4 border-b border-richblack-800">
                    <img
                      src={user?.image}
                      alt={user?.firstName}
                      className="h-10 w-10 rounded-full object-cover border border-richblack-700"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="font-semibold text-richblack-5 text-sm truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <span className="text-[11px] font-medium text-richblack-400">
                        {user?.accountType}
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <ul className="flex flex-col gap-1 py-4 text-richblack-100 font-medium">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsNavOpen(false)}
                      className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${matchRoute("/")
                        ? "bg-richblack-800 text-yellow-50 font-semibold"
                        : "hover:bg-richblack-800/60 hover:text-richblack-25"
                        }`}
                    >
                      Home
                    </Link>
                  </li>

                  {/* Catalog with Accordion */}
                  <li>
                    <button
                      onClick={() => setIsCatalogOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-2.5 px-3 rounded-lg text-sm hover:bg-richblack-800/60 hover:text-richblack-25 transition-colors"
                    >
                      <span>Catalog</span>
                      <BsChevronDown
                        className={`text-xs transition-transform duration-200 ${isCatalogOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isCatalogOpen && (
                      <div className="pl-3 py-1.5 flex flex-col gap-1 border-l-2 border-richblack-700 ml-3 my-1 max-h-[220px] overflow-y-auto">
                        {loading ? (
                          <p className="text-xs text-richblack-400 py-1 pl-2">
                            Loading categories...
                          </p>
                        ) : subLinks?.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              onClick={() => setIsNavOpen(false)}
                              className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-richblack-200 hover:text-yellow-50 hover:bg-richblack-800/80 transition-all duration-150"
                            >
                              <span className="truncate">{subLink.name}</span>
                              <span className="text-[11px] text-richblack-400">→</span>
                            </Link>
                          ))
                        ) : (
                          <p className="text-xs text-richblack-400 py-1 pl-2">
                            No Categories Found
                          </p>
                        )}
                      </div>
                    )}
                  </li>

                  <li>
                    <Link
                      to="/about"
                      onClick={() => setIsNavOpen(false)}
                      className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${matchRoute("/about")
                        ? "bg-richblack-800 text-yellow-50 font-semibold"
                        : "hover:bg-richblack-800/60 hover:text-richblack-25"
                        }`}
                    >
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      onClick={() => setIsNavOpen(false)}
                      className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${matchRoute("/contact")
                        ? "bg-richblack-800 text-yellow-50 font-semibold"
                        : "hover:bg-richblack-800/60 hover:text-richblack-25"
                        }`}
                    >
                      Contact Us
                    </Link>
                  </li>

                  {/* Dashboard link in drawer for logged in users */}
                  {token !== null && (
                    <li>
                      <Link
                        to="/dashboard/my-profile"
                        onClick={() => setIsNavOpen(false)}
                        className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm hover:bg-richblack-800/60 hover:text-richblack-25 transition-colors"
                      >
                        <VscDashboard className="text-base" />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Drawer Footer (Auth Buttons / Logout) */}
              <div className="pt-4 border-t border-richblack-800 mt-auto">
                {token === null ? (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setIsNavOpen(false)}>
                      <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 text-center text-sm font-semibold text-richblack-100 hover:bg-richblack-700 transition-colors">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsNavOpen(false)}>
                      <button className="w-full rounded-lg bg-yellow-50 py-2.5 text-center text-sm font-semibold text-richblack-900 hover:bg-yellow-100 transition-colors">
                        Sign up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(logout(navigate))
                      setIsNavOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-pink-700/50 bg-pink-900/20 py-2.5 text-center text-sm font-semibold text-pink-200 hover:bg-pink-900/40 transition-colors"
                  >
                    <VscSignOut className="text-base" />
                    <span>Log out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
