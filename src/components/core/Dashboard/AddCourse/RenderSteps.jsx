import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      shortTitle: "Info",
      title: "Course Information",
    },
    {
      id: 2,
      shortTitle: "Builder",
      title: "Course Builder",
    },
    {
      id: 3,
      shortTitle: "Publish",
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Mobile Step Status indicator */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-richblack-700 bg-richblack-800/80 px-4 py-2 sm:hidden">
        <span className="text-xs font-semibold text-yellow-50">
          Step {step} of 3
        </span>
        <span className="text-xs font-medium text-richblack-200">
          {steps[step - 1]?.title}
        </span>
      </div>

      {/* Steps Visual Indicator */}
      <div className="relative mb-8 sm:mb-12 w-full px-2 sm:px-6">
        <div className="flex w-full items-center justify-between">
          {steps.map((item) => (
            <React.Fragment key={item.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  aria-label={`Step ${item.id}: ${item.title}`}
                  className={`grid cursor-default aspect-square w-8 sm:w-10 place-items-center rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50 shadow-[0_0_12px_rgba(255,214,10,0.3)]"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } ${step > item.id ? "!bg-yellow-50 !text-richblack-900" : ""}`}
                >
                  {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-900 text-[10px] sm:text-xs" />
                  ) : (
                    item.id
                  )}
                </button>
              </div>

              {/* Connecting Dashed Line */}
              {item.id !== steps.length && (
                <div
                  className={`flex-1 mx-2 sm:mx-4 border-b-2 border-dashed transition-all duration-300 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-600"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Labels */}
        <div className="mt-3 flex w-full items-start justify-between">
          {steps.map((item) => (
            <div
              key={item.id}
              className="flex w-24 sm:w-32 flex-col items-center text-center"
            >
              <p
                className={`text-[11px] sm:text-sm font-medium transition-colors duration-200 ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-400"
                }`}
              >
                <span className="sm:hidden">{item.shortTitle}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
