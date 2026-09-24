import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  if (!course) return null

  return (
    <Link to={`/courses/${course?._id}`} className="block h-full group">
      <div className="flex flex-col h-full bg-richblack-800 border border-richblack-700/70 rounded-2xl overflow-hidden hover:border-richblack-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail Container */}
        <div className={`relative w-full ${Height ? Height : "h-[200px]"} aspect-video overflow-hidden bg-richblack-900 border-b border-richblack-700/60 flex items-center justify-center`}>
          <img
            src={course?.thumbnail}
            alt={course?.courseName || "Course thumbnail"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-richblack-5 group-hover:text-yellow-50 transition-colors line-clamp-2 min-h-[3rem] leading-snug">
              {course?.courseName}
            </h3>
            <p className="text-xs sm:text-sm text-richblack-300 mt-1 font-medium">
              By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-richblack-700/60">
            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-yellow-50 font-bold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={15} />
              <span className="text-richblack-400 text-xs">
                ({course?.ratingAndReviews?.length || 0} Ratings)
              </span>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg sm:text-xl font-bold text-richblack-5">
                ₹{Number(course?.price || 0).toLocaleString("en-IN")}
              </p>
              <span className="text-xs text-yellow-50 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Course →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
