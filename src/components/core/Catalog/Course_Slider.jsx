import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { FreeMode, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  const swiperRef = useRef(null)

  return (
    <>
      {Courses?.length ? (
        <div className="relative group/slider w-full">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="pb-14 pt-2"
          >
            {Courses?.map((course, i) => (
              <SwiperSlide key={course?._id || i} className="h-auto">
                <Course_Card course={course} Height={"h-[200px]"} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {Courses.length > 2 && (
            <>
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute -left-3 top-[44%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-richblack-800/90 border border-richblack-600 text-richblack-50 flex items-center justify-center hover:bg-yellow-50 hover:text-richblack-900 transition-all shadow-xl hover:scale-110 focus:outline-none backdrop-blur-sm cursor-pointer"
                aria-label="Previous Course"
              >
                <MdChevronLeft size={28} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute -right-3 top-[44%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-richblack-800/90 border border-richblack-600 text-richblack-50 flex items-center justify-center hover:bg-yellow-50 hover:text-richblack-900 transition-all shadow-xl hover:scale-110 focus:outline-none backdrop-blur-sm cursor-pointer"
                aria-label="Next Course"
              >
                <MdChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-richblack-800/50 border border-richblack-700/60 rounded-xl my-4 text-center">
          <p className="text-lg font-semibold text-richblack-200">No Courses Found in this Category</p>
          <p className="text-sm text-richblack-400 mt-1">Check back later or explore our other learning paths.</p>
        </div>
      )}
    </>
  )
}

export default Course_Slider
