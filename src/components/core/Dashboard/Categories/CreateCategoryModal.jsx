import { useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { VscLayers } from "react-icons/vsc"
import { useSelector } from "react-redux"

import { createCategory } from "../../../../services/operations/courseDetailsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function CreateCategoryModal({ isOpen, onClose, onCategoryCreated }) {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  if (!isOpen) return null

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await createCategory(
      {
        name: data.categoryName.trim(),
        description: data.categoryDescription.trim(),
      },
      token
    )
    setLoading(false)

    if (result) {
      reset()
      if (onCategoryCreated) {
        onCategoryCreated(result)
      }
      onClose()
    }
  }

  const handleClose = () => {
    if (!loading) {
      reset()
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[500px] rounded-2xl border border-richblack-700 bg-richblack-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4 bg-richblack-900/60">
          <div className="flex items-center gap-2.5 text-richblack-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50/10 text-yellow-50">
              <VscLayers className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-richblack-5">
                Create New Category
              </h2>
              <p className="text-xs text-richblack-300">
                Add a new topic for instructors to publish courses under
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-1.5 text-richblack-400 hover:bg-richblack-700 hover:text-richblack-50 transition-colors"
            aria-label="Close modal"
          >
            <RxCross2 className="text-lg" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {/* Category Name */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm font-medium text-richblack-5"
              htmlFor="categoryName"
            >
              Category Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="categoryName"
              placeholder="e.g. Generative AI, Cloud Computing"
              {...register("categoryName", {
                required: "Category name is required",
                minLength: {
                  value: 2,
                  message: "Category name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Category name cannot exceed 50 characters",
                },
              })}
              disabled={loading}
              className="form-style w-full"
            />
            {errors.categoryName && (
              <span className="text-xs tracking-wide text-pink-200">
                {errors.categoryName.message}
              </span>
            )}
          </div>

          {/* Category Description */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm font-medium text-richblack-5"
              htmlFor="categoryDescription"
            >
              Category Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="categoryDescription"
              rows={4}
              placeholder="Describe what students will learn in courses grouped under this category..."
              {...register("categoryDescription", {
                required: "Category description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              disabled={loading}
              className="form-style w-full resize-none"
            />
            {errors.categoryDescription && (
              <span className="text-xs tracking-wide text-pink-200">
                {errors.categoryDescription.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-x-3 pt-3 border-t border-richblack-700/60">
            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              className="rounded-md bg-richblack-700 px-4 py-2 text-sm font-semibold text-richblack-50 hover:bg-richblack-600 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <IconBtn
              disabled={loading}
              text={loading ? "Creating..." : "Create Category"}
              type="submit"
            >
              <VscLayers />
            </IconBtn>
          </div>
        </form>
      </div>
    </div>
  )
}
