import { useState } from "react"
import {
  FiAlertTriangle,
  FiCheck,
  FiCopy,
  FiKey,
  FiLock,
  FiMail,
  FiSearch,
  FiUser,
} from "react-icons/fi"
import { useSelector } from "react-redux"

import {
  searchUserByEmail,
  setTemporaryPassword,
} from "../../../../services/operations/adminAPI"

export default function AdminPasswordReset() {
  const { token } = useSelector((state) => state.auth)

  const [searchEmail, setSearchEmail] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)

  const [customPasswordMode, setCustomPasswordMode] = useState(false)
  const [customPassword, setCustomPassword] = useState("")
  const [generating, setGenerating] = useState(false)

  const [generatedResult, setGeneratedResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleSearch = async (e) => {
    if (e) e.preventDefault()
    if (!searchEmail.trim()) return

    setSearching(true)
    setGeneratedResult(null)
    const user = await searchUserByEmail(searchEmail.trim(), token)
    setSearchedUser(user)
    setSearching(false)
  }

  const handleGenerateTempPassword = async () => {
    if (!searchedUser) return

    setGenerating(true)
    const result = await setTemporaryPassword(
      searchedUser.email,
      customPasswordMode ? customPassword : "",
      token
    )

    if (result) {
      setGeneratedResult(result)
      // Update searchedUser status
      setSearchedUser((prev) => ({
        ...prev,
        mustChangePassword: true,
      }))
    }
    setGenerating(false)
  }

  const handleCopy = () => {
    if (!generatedResult?.tempPassword) return
    navigator.clipboard.writeText(generatedResult.tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleResetSearch = () => {
    setSearchEmail("")
    setSearchedUser(null)
    setGeneratedResult(null)
    setCustomPassword("")
    setCustomPasswordMode(false)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 text-richblack-5">
      {/* Page Header */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-richblack-5 sm:text-3xl">
          <FiKey className="text-yellow-50" />
          Admin Password Reset
        </h1>
        <p className="mt-2 text-sm text-richblack-300 sm:text-base">
          Reset password for students or instructors who cannot access their
          account. A temporary password will be assigned and the user will be
          forced to choose a new permanent password on their next login.
        </p>
      </div>

      {/* Step 1: Search Form */}
      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-richblack-5">
          <FiSearch className="text-yellow-50" />
          Step 1: Look Up User Account
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-richblack-400" />
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter student or instructor email..."
              className="w-full rounded-lg border border-richblack-600 bg-richblack-900 py-3 pl-11 pr-4 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={searching || !searchEmail.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100 disabled:opacity-50"
          >
            {searching ? "Searching..." : "Find User"}
          </button>
        </form>
      </div>

      {/* Step 2: User Details & Password Action */}
      {searchedUser && (
        <div className="space-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-richblack-700 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img
                src={
                  searchedUser.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${searchedUser.firstName} ${searchedUser.lastName}`
                }
                alt={searchedUser.firstName}
                className="h-14 w-14 rounded-full border-2 border-yellow-50 object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-richblack-5">
                  {searchedUser.firstName} {searchedUser.lastName}
                </h3>
                <p className="text-sm text-richblack-300">
                  {searchedUser.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  searchedUser.accountType === "Instructor"
                    ? "border border-yellow-50/30 bg-yellow-50/10 text-yellow-50"
                    : searchedUser.accountType === "Admin"
                    ? "border border-pink-500/30 bg-pink-500/10 text-pink-300"
                    : "border border-blue-500/30 bg-blue-500/10 text-blue-300"
                }`}
              >
                {searchedUser.accountType}
              </span>

              {searchedUser.mustChangePassword && (
                <span className="bg-red-500/10 text-red-300 border-red-500/30 rounded-full border px-3 py-1 text-xs font-semibold">
                  Temp Password Active
                </span>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-richblack-300">
              Temporary Password Settings
            </h4>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="customPasswordToggle"
                checked={customPasswordMode}
                onChange={(e) => setCustomPasswordMode(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded accent-yellow-50"
              />
              <label
                htmlFor="customPasswordToggle"
                className="cursor-pointer select-none text-sm text-richblack-200"
              >
                Specify custom temporary password (otherwise a secure random one
                will be generated)
              </label>
            </div>

            {customPasswordMode && (
              <div className="relative max-w-md">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-richblack-400" />
                <input
                  type="text"
                  value={customPassword}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  placeholder="Enter custom temp password (min 6 chars)..."
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-900 py-2.5 pl-11 pr-4 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="flex gap-3 rounded-lg border border-yellow-50/20 bg-yellow-50/5 p-4 text-xs text-richblack-200 sm:text-sm">
            <FiAlertTriangle className="mt-0.5 shrink-0 text-xl text-yellow-50" />
            <div>
              <p className="font-semibold text-yellow-50">
                Force-Change Policy
              </p>
              <p className="mt-1 text-richblack-300">
                {/* Setting a temporary password will flag this account with{" "}
                <code className="text-yellow-50">mustChangePassword: true</code> */}
                Upon signing in with this temporary password, the user will be
                instantly locked to a "Set Permanent Password" screen before
                they can access any courses or dashboard features.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleGenerateTempPassword}
              disabled={
                generating ||
                (customPasswordMode && customPassword.trim().length < 6)
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100 disabled:opacity-50"
            >
              <FiKey />
              {generating
                ? "Setting Temporary Password..."
                : "Set Temporary Password & Email User"}
            </button>

            <button
              type="button"
              onClick={handleResetSearch}
              className="rounded-lg border border-richblack-600 px-5 py-3 text-sm font-medium text-richblack-300 transition-colors hover:bg-richblack-700"
            >
              Clear / Look Up Another
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success Card */}
      {generatedResult && (
        <div className="animate-fadeIn space-y-6 rounded-xl border border-caribbeangreen-400/40 bg-richblack-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-caribbeangreen-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-caribbeangreen-500/20 text-xl">
              <FiCheck />
            </div>
            <div>
              <h3 className="text-lg font-bold text-richblack-5">
                Temporary Password Successfully Created!
              </h3>
              <p className="text-xs text-richblack-300 sm:text-sm">
                {generatedResult.emailSent
                  ? `An email with instructions was delivered to ${searchedUser?.email}.`
                  : "Email delivery was skipped/failed. Please communicate the password below directly to the user."}
              </p>
            </div>
          </div>

          {/* Password Copy Box */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-richblack-700 bg-richblack-900 p-4 sm:flex-row sm:items-center sm:p-6">
            <div>
              <span className="mb-1 block text-xs uppercase tracking-wider text-richblack-400">
                Temporary Password:
              </span>
              <span className="select-all font-mono text-xl font-bold tracking-wider text-yellow-50 sm:text-2xl">
                {generatedResult.tempPassword}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-yellow-50/40 bg-yellow-50/10 px-5 py-2.5 text-sm font-semibold text-yellow-50 transition-colors hover:bg-yellow-50 hover:text-black"
            >
              {copied ? (
                <>
                  <FiCheck className="text-caribbeangreen-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>Copy Password</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1 text-xs text-richblack-400">
            <p>
              • You can share this temporary password with the
              student/instructor via WhatsApp, SMS, or Support Chat.
            </p>
            <p>
              • When they sign in, StudyAdda will immediately prompt them to
              change it to their own private password.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
