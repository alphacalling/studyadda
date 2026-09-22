import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData?.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-sm sm:text-base font-medium text-richblack-300">
          Let's start something new today
        </p>
      </div>

      {loading ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          {/* Top Section: Chart + Statistics */}
          <div className="flex flex-col gap-6 lg:flex-row lg:h-[450px]">
            {/* Render chart / graph */}
            <div className="flex-1 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6 min-h-[300px] sm:min-h-[360px] flex flex-col">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex h-full flex-col justify-center text-center py-10">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-2 text-base font-medium text-richblack-300">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>

            {/* Total Statistics Cards */}
            <div className="flex flex-col justify-between rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6 lg:w-[260px] xl:w-[280px]">
              <div>
                <p className="text-base sm:text-lg font-bold text-richblack-5 border-b border-richblack-700/80 pb-3">
                  Quick Statistics
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4 lg:flex lg:flex-col lg:space-y-4">
                  <div className="rounded-lg bg-richblack-900/60 p-3 sm:p-4 lg:bg-transparent lg:p-0">
                    <p className="text-xs sm:text-sm text-richblack-400">Courses</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-richblack-50 mt-1">
                      {courses.length}
                    </p>
                  </div>
                  <div className="rounded-lg bg-richblack-900/60 p-3 sm:p-4 lg:bg-transparent lg:p-0">
                    <p className="text-xs sm:text-sm text-richblack-400">Students</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-richblack-50 mt-1">
                      {totalStudents}
                    </p>
                  </div>
                  <div className="rounded-lg bg-richblack-900/60 p-3 sm:p-4 lg:bg-transparent lg:p-0">
                    <p className="text-xs sm:text-sm text-richblack-400">Income</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-50 mt-1">
                      ₹{totalAmount}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/dashboard/add-course"
                className="mt-5 hidden lg:block w-full rounded-lg bg-yellow-50 py-2.5 text-center text-sm font-semibold text-richblack-900 hover:bg-yellow-100 transition-colors"
              >
                + Add New Course
              </Link>
            </div>
          </div>

          {/* Recent Courses List */}
          <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-richblack-700/80 pb-3">
              <p className="text-base sm:text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs sm:text-sm font-semibold text-yellow-50 hover:underline">
                  View All ({courses.length})
                </p>
              </Link>
            </div>

            <div className="my-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="group flex flex-col rounded-lg border border-richblack-700 bg-richblack-900/50 p-3 hover:border-richblack-600 transition-colors"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="aspect-video w-full rounded-md object-cover"
                  />
                  <div className="mt-3 flex flex-1 flex-col justify-between">
                    <p className="text-sm font-medium text-richblack-50 line-clamp-1 group-hover:text-yellow-50 transition-colors">
                      {course.courseName}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-richblack-400">
                      <span>{course.studentsEnrolled?.length || 0} students</span>
                      <span className="font-semibold text-yellow-50">₹{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-8 py-16 text-center">
          <p className="text-xl sm:text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <p className="mt-2 text-sm text-richblack-300 max-w-md mx-auto">
            Create your first course to start teaching and earning on StudyAdda.
          </p>
          <Link
            to="/dashboard/add-course"
            className="mt-6 inline-block rounded-lg bg-yellow-50 px-6 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-100 transition-colors"
          >
            Create a course
          </Link>
        </div>
      )}
    </div>
  )
}
