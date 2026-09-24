import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  console.log("user", user)

  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-2xl sm:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs sm:text-sm text-richblack-300 break-all">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base sm:text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${user?.additionalDetails?.about
            ? "text-richblack-5"
            : "text-richblack-400"
            } text-xs sm:text-sm font-medium leading-relaxed`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="flex flex-col gap-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base sm:text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 max-w-[600px]">
          <div>
            <p className="mb-1 text-xs text-richblack-500">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName || "-"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-500">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName || "-"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-500">Email</p>
            <p className="text-sm font-medium text-richblack-5 break-all">
              {user?.email || "-"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-500">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-500">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-richblack-500">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
