import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"
import RatingStars from "./RatingStars"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data || [])
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    })()
  }, [])

  return (
    <div className="w-full text-white">
      <div className="my-6 w-full max-w-maxContent mx-auto px-2 sm:px-4">
        {reviews?.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            loop={reviews.length > 4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full py-4"
          >
            {reviews.map((review, i) => {
              const userName = `${review?.user?.firstName || "User"} ${review?.user?.lastName || ""}`
              const avatar =
                review?.user?.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(userName)}`

              return (
                <SwiperSlide key={review?._id || i} className="h-auto">
                  <div className="flex flex-col justify-between gap-3 bg-richblack-800 p-4 sm:p-5 text-[14px] min-h-[190px] h-full text-richblack-25 rounded-xl border border-richblack-700/60 shadow-sm transition-all duration-200 hover:border-richblack-600">
                    {/* User Info Header */}
                    <div className="flex items-center gap-3">
                      <img
                        src={avatar}
                        alt={userName}
                        className="h-10 w-10 rounded-full object-cover shrink-0 border border-richblack-600"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <h1 className="font-semibold text-richblack-5 text-sm truncate">
                          {userName}
                        </h1>
                        <h2 className="text-[12px] font-medium text-richblack-400 truncate">
                          {review?.course?.courseName || "Course"}
                        </h2>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="font-medium text-richblack-100 text-sm leading-relaxed line-clamp-3">
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                        : review?.review}
                    </p>

                    {/* Rating Footer */}
                    <div className="flex items-center justify-between gap-2 mt-auto pt-2.5 border-t border-richblack-700/60">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-100 text-sm shrink-0">
                          {Number(review?.rating || 0).toFixed(1)}
                        </span>
                        <RatingStars Review_Count={review?.rating} Star_Size={14} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <p className="text-center text-richblack-300 py-8 text-base">
            No reviews yet
          </p>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider
