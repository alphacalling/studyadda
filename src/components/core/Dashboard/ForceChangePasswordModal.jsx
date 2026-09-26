import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FiLock, FiAlertTriangle, FiLogOut, FiCheckCircle } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { forceChangePassword, logout } from "../../../services/operations/authAPI"

export default function ForceChangePasswordModal() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const { newPassword, confirmNewPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError("")
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmNewPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match")
      return
    }

    setSubmitting(true)
    await dispatch(forceChangePassword(newPassword, confirmNewPassword, token, navigate))
    setSubmitting(false)
  }

  const handleLogout = () => {
    dispatch(logout(navigate))
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl border border-yellow-50/30 bg-richblack-800 p-6 sm:p-8 shadow-2xl animate-scaleIn">
        {/* Header Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50/10 border border-yellow-50/30 text-yellow-50 text-2xl mb-5">
          <FiAlertTriangle />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-richblack-5">
            Action Required
          </h2>
          <p className="mt-1 text-sm font-semibold text-yellow-50">
            Set Your Permanent Password
          </p>
          <p className="mt-2 text-xs sm:text-sm text-richblack-300 leading-relaxed">
            Hello <span className="font-semibold text-richblack-100">{user?.firstName}</span>, you are signed in with a temporary password provided by an administrator. For your security, please choose a new private password before accessing your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="text-xs font-medium text-richblack-200 block mb-1.5">
              New Permanent Password <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleOnChange}
                placeholder="Enter new password (min 6 characters)"
                className="w-full rounded-lg border border-richblack-600 bg-richblack-900 py-3 pl-4 pr-11 text-sm text-richblack-5 placeholder-richblack-500 focus:border-yellow-50 focus:outline-none"
                required
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-400 text-lg hover:text-richblack-200"
              >
                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-medium text-richblack-200 block mb-1.5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleOnChange}
                placeholder="Re-enter your new password"
                className="w-full rounded-lg border border-richblack-600 bg-richblack-900 py-3 pl-4 pr-11 text-sm text-richblack-5 placeholder-richblack-500 focus:border-yellow-50 focus:outline-none"
                required
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-400 text-lg hover:text-richblack-200"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-pink-500/10 border border-pink-500/30 p-2.5 text-xs text-pink-300">
              {error}
            </div>
          )}

          {/* Requirements checklist */}
          <div className="text-xs text-richblack-400 space-y-1 pt-1">
            <div className={`flex items-center gap-1.5 ${newPassword.length >= 6 ? "text-caribbeangreen-300" : ""}`}>
              <FiCheckCircle className="text-xs" />
              <span>At least 6 characters long</span>
            </div>
            <div className={`flex items-center gap-1.5 ${newPassword && newPassword === confirmNewPassword ? "text-caribbeangreen-300" : ""}`}>
              <FiCheckCircle className="text-xs" />
              <span>Passwords match</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 rounded-lg bg-yellow-50 py-3 text-sm font-bold text-black hover:bg-yellow-100 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiLock />
            {submitting ? "Updating Password..." : "Save Password & Unlock Dashboard"}
          </button>
        </form>

        {/* Logout Option */}
        <div className="mt-6 pt-4 border-t border-richblack-700 text-center">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs text-richblack-400 hover:text-richblack-200 transition-colors"
          >
            <FiLogOut />
            <span>Not ready? Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
