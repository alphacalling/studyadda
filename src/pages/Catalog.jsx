import React, { useEffect, useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import Footer from "../components/Common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentData"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const matchingCategory = res?.data?.data?.find(
          (ct) =>
            ct?.name?.trim()?.split(" ")?.join("-")?.toLowerCase() ===
            catalogName?.toLowerCase()
        )
        if (matchingCategory?._id) {
          setCategoryId(matchingCategory._id)
        } else {
          setCatalogPageData({ success: false })
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  const selectedCourses = useMemo(() => {
    const courses = catalogPageData?.data?.selectedCategory?.courses || []
    if (active === 2) {
      return [...courses].reverse()
    }
    return courses
  }, [catalogPageData, active])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-900 border-b border-richblack-700/60 px-4 py-10 md:py-14">
        <div className="mx-auto flex min-h-[180px] max-w-maxContentTab flex-col justify-center gap-3.5 lg:max-w-maxContent">
          <nav className="flex items-center gap-2 text-sm text-richblack-300">
            <Link to="/" className="hover:text-richblack-100 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Catalog</span>
            <span>/</span>
            <span className="text-yellow-50 font-medium">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-richblack-5 tracking-tight">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-[870px] text-sm md:text-base text-richblack-200 leading-relaxed">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1: Selected Category Courses */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 md:py-14 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        
        {/* Tabs */}
        <div className="my-6 flex border-b border-b-richblack-700 text-sm gap-2">
          <button
            type="button"
            className={`px-5 py-2.5 font-medium transition-all cursor-pointer ${
              active === 1
                ? "border-b-2 border-yellow-50 text-yellow-50 font-semibold"
                : "text-richblack-300 hover:text-richblack-50"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular Courses
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 font-medium transition-all cursor-pointer ${
              active === 2
                ? "border-b-2 border-yellow-50 text-yellow-50 font-semibold"
                : "text-richblack-300 hover:text-richblack-50"
            }`}
            onClick={() => setActive(2)}
          >
            New Courses
          </button>
        </div>

        <div className="pt-2">
          <Course_Slider Courses={selectedCourses} />
        </div>
      </div>

      {/* Section 2: Different Category Courses (if available) */}
      {catalogPageData?.data?.differentCategory?.courses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 md:py-14 lg:max-w-maxContent border-t border-richblack-800">
          <div className="section_heading">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
          </div>
          <div className="pt-6">
            <Course_Slider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>
      )}

      {/* Section 3: Frequently Bought Courses (if available) */}
      {catalogPageData?.data?.mostSellingCourses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 md:py-14 lg:max-w-maxContent border-t border-richblack-800">
          <div className="section_heading">Frequently Bought Courses</div>
          <div className="pt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <Course_Card
                    course={course}
                    key={course?._id || i}
                    Height={"h-[200px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Catalog
