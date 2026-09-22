import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-6 sm:my-10 flex flex-col sm:flex-row gap-4 sm:gap-x-5 rounded-xl border border-pink-700 bg-pink-900/60 p-4 sm:p-8 sm:px-12 backdrop-blur-sm">
        <div className="flex aspect-square h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-full bg-pink-700/80 border border-pink-500 shadow-sm">
          <FiTrash2 className="text-2xl sm:text-3xl text-pink-100" />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-full sm:w-4/5 text-xs sm:text-sm text-pink-100/90 leading-relaxed">
            <p>Would you like to delete your account?</p>
            <p className="mt-1 text-pink-200">
              This account may contain paid courses and profile data. Deleting your account is{" "}
              <strong>permanent</strong> and will remove all associated content and enrollments.
            </p>
          </div>

          {/* Tick box confirmation */}
          <label className="flex items-start gap-3 cursor-pointer pt-2 group select-none">
            <input
              type="checkbox"
              id="confirmDelete"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-pink-500 bg-richblack-800 text-pink-600 focus:ring-2 focus:ring-pink-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-pink-100 font-medium group-hover:text-white transition-colors">
              I understand that deleting my account is permanent and cannot be undone.
            </span>
          </label>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!isChecked}
              onClick={() =>
                setConfirmationModal({
                  text1: "Delete Account Permanently?",
                  text2:
                    "All your courses, certificates, progress, and personal data will be completely deleted. Are you sure you want to proceed?",
                  btn1Text: "Delete Account",
                  btn2Text: "Cancel",
                  btn1CustomClasses: "!bg-pink-600 hover:!bg-pink-700 !text-white shadow-md shadow-pink-900/40",
                  btn1Handler: () => {
                    handleDeleteAccount()
                    setConfirmationModal(null)
                  },
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isChecked
                  ? "bg-pink-600 hover:bg-pink-700 text-white shadow-md shadow-pink-900/50 cursor-pointer active:scale-95"
                  : "bg-pink-900/40 text-pink-300/50 border border-pink-800/40 cursor-not-allowed opacity-60"
              }`}
            >
              <FiTrash2 size={16} />
              <span>Delete My Account</span>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
