import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RiShieldUserLine } from "react-icons/ri"
import { FaChalkboardTeacher } from "react-icons/fa"

import { ACCOUNT_TYPE } from "../../../../utils/constants"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { user } = useSelector((state) => state.profile)
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  // If user is Admin
  if (user?.accountType === ACCOUNT_TYPE.ADMIN) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center rounded-2xl border border-richblack-700 bg-richblack-800 p-8 text-center shadow-2xl">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50/10 border border-yellow-50/20 text-3xl text-yellow-50">
            <RiShieldUserLine />
          </div>
          <h1 className="text-2xl font-bold text-richblack-5">
            Administrator Account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-richblack-300">
            You are logged in as an <span className="font-semibold text-yellow-50">Administrator</span>. The shopping cart and course purchasing features are reserved for student accounts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard/my-profile"
              className="rounded-lg bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-100 transition-colors shadow-md"
            >
              Go to Profile
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-richblack-700 bg-richblack-900 px-5 py-2.5 text-sm font-semibold text-richblack-100 hover:bg-richblack-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If user is Instructor
  if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center rounded-2xl border border-richblack-700 bg-richblack-800 p-8 text-center shadow-2xl">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50/10 border border-yellow-50/20 text-3xl text-yellow-50">
            <FaChalkboardTeacher />
          </div>
          <h1 className="text-2xl font-bold text-richblack-5">
            Instructor Account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-richblack-300">
            You are logged in as an <span className="font-semibold text-yellow-50">Instructor</span>. Course purchasing and cart features are reserved for student accounts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard/my-courses"
              className="rounded-lg bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-100 transition-colors shadow-md"
            >
              My Courses
            </Link>
            <Link
              to="/dashboard/my-profile"
              className="rounded-lg border border-richblack-700 bg-richblack-900 px-5 py-2.5 text-sm font-semibold text-richblack-100 hover:bg-richblack-700 transition-colors"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </>
  )
}
