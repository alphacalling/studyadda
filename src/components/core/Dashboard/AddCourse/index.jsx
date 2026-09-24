import { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  const [showMobileTips, setShowMobileTips] = useState(false)

  const tipsList = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important notes to enrolled students.",
  ]

  return (
    <div className="flex w-full flex-col xl:flex-row items-start gap-6">
      <div className="flex flex-1 flex-col w-full">
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-medium text-richblack-5">
            Add Course
          </h1>

          {/* Collapsible Tips Toggle for screens < xl */}
          <button
            type="button"
            onClick={() => setShowMobileTips((prev) => !prev)}
            className="flex xl:hidden items-center gap-2 rounded-lg border border-richblack-700 bg-richblack-800 px-3.5 py-2 text-xs font-semibold text-yellow-50 hover:bg-richblack-700 transition-colors w-fit"
          >
            <span>⚡ Course Upload Tips</span>
            {showMobileTips ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>
        </div>

        {/* Mobile Accordion Tips Dropdown */}
        {showMobileTips && (
          <div className="mb-6 xl:hidden rounded-xl border border-richblack-700 bg-richblack-800/90 p-5 backdrop-blur-sm animate-fadeIn">
            <p className="mb-3 text-sm font-semibold text-yellow-50">
              ⚡ Important Upload Tips
            </p>
            <ul className="ml-5 list-disc space-y-2 text-xs text-richblack-100">
              {tipsList.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-1 w-full">
          <RenderSteps />
        </div>
      </div>

      {/* Desktop Sticky Tips Sidebar (xl:block) */}
      <div className="sticky top-10 hidden w-[380px] rounded-xl border border-richblack-700 bg-richblack-800 p-6 xl:block shadow-lg">
        <p className="mb-6 text-lg font-semibold text-richblack-5">⚡ Course Upload Tips</p>
        <ul className="ml-5 list-disc space-y-3.5 text-xs text-richblack-100">
          {tipsList.map((tip, idx) => (
            <li key={idx} className="leading-relaxed">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
