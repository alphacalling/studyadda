import React from "react"
import { Link } from "react-router-dom"
import { FooterLink2 } from "../../data/footer-links"

// Images
import Logo from "../../assets/Logo/studyadda_dark.png"

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]
const Plans = ["Paid memberships", "For students", "Business solutions"]
const Community = ["Forums", "Chapters", "Events"]

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-400 border-t border-richblack-700">
      <div className="w-11/12 max-w-maxContent mx-auto py-10 sm:py-14">
        {/* Main Sections Wrapper */}
        <div className="border-b border-richblack-700 pb-8 flex flex-col lg:flex-row gap-10 lg:gap-8">

          {/* Left Half (Section 1: Company, Resources, Plans, Community) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:pr-8 lg:border-r lg:border-richblack-700">
            {/* Column 1: Logo, Company & Socials */}
            <div className="flex flex-col gap-3">
              <Link to="/" className="self-start inline-block">
                <img
                  src={Logo}
                  alt="StudyAdda Logo"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-1">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div
                    key={i}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-lg text-richblack-300 mt-2">
                <FaFacebook className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaGoogle className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaTwitter className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaYoutube className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
              </div>
            </div>

            {/* Column 2: Resources & Support */}
            <div className="flex flex-col">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>
              <div className="flex flex-col gap-2 mt-3">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-6">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>

            {/* Column 3: Plans & Community */}
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>
              <div className="flex flex-col gap-2 mt-3">
                {Plans.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-6">
                Community
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Half (Section 2: Subjects, Languages, Career Building) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:pl-8">
            {FooterLink2.map((ele, i) => (
              <div
                key={i}
                className={`flex flex-col ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-3">
                  {ele.links.map((link, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar (Legal Links & Copyright) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-sm">
          <div className="flex flex-wrap items-center justify-center gap-y-2">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${BottomFooter.length - 1 === i
                  ? ""
                  : "border-r border-richblack-700"
                  } px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200 text-xs sm:text-sm`}
              >
                <Link to={ele.split(" ").join("-").toLowerCase()}>
                  {ele}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center text-xs sm:text-sm text-richblack-400">
            Made with ❤️ Vikas © 2024 StudyAdda
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
