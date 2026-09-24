import { useEffect, useState, useMemo } from "react"
import { FiSearch, FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { VscLayers, VscAdd, VscArrowRight } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  fetchCourseCategories,
  deleteCategory,
} from "../../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../../Common/ConfirmationModal"
import IconBtn from "../../../Common/IconBtn"
import CreateCategoryModal from "./CreateCategoryModal"
import EditCategoryModal from "./EditCategoryModal"

export default function Categories() {
  const { token } = useSelector((state) => state.auth)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editModalCategory, setEditModalCategory] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const loadCategories = async () => {
    setLoading(true)
    const result = await fetchCourseCategories()
    if (result) {
      setCategories(result)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories
    const q = searchQuery.toLowerCase()
    return categories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(q) ||
        cat.description?.toLowerCase().includes(q)
    )
  }, [categories, searchQuery])

  const handleCategoryCreated = () => {
    loadCategories()
  }

  const handleDeleteCategory = async (categoryId) => {
    const result = await deleteCategory({ categoryId }, token)
    if (result) {
      loadCategories()
    }
    setConfirmationModal(null)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-richblack-5 text-center sm:text-left">
            Course Categories
          </h1>
          <p className="text-sm text-richblack-300 text-center sm:text-left mt-1">
            Browse, manage, or create course categories on StudyAdda
          </p>
        </div>
        <div className="flex justify-center sm:justify-end">
          <IconBtn
            text="Create Category"
            onclick={() => setIsModalOpen(true)}
          >
            <VscAdd />
          </IconBtn>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-richblack-800 bg-richblack-800/40 p-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-richblack-400 text-base" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or keyword..."
            className="w-full rounded-lg border border-richblack-700 bg-richblack-900 py-2 pl-10 pr-4 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none transition-colors"
          />
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-richblack-400">
          <span>Showing</span>
          <span className="font-semibold text-yellow-50">
            {filteredCategories.length}
          </span>
          <span>of {categories.length} categories</span>
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl border border-richblack-800 bg-richblack-800/30 animate-pulse p-6"
            />
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-700 bg-richblack-800/20 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-richblack-800 text-richblack-400 mb-4">
            <VscLayers className="text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-richblack-5 mb-1">
            {searchQuery ? "No matching categories found" : "No categories yet"}
          </h3>
          <p className="text-sm text-richblack-400 max-w-md mb-6">
            {searchQuery
              ? `We couldn't find any category matching "${searchQuery}". Try a different keyword or create a new category.`
              : "Get started by creating the first course category for your platform."}
          </p>
          <IconBtn
            text="Create Category"
            onclick={() => setIsModalOpen(true)}
          >
            <VscAdd />
          </IconBtn>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const courseCount = category?.courses?.length || 0
            const catalogPath = `/catalog/${category.name
              .split(" ")
              .join("-")
              .toLowerCase()}`

            return (
              <div
                key={category._id}
                className="group relative flex flex-col justify-between rounded-2xl border border-richblack-800 bg-gradient-to-b from-richblack-800/80 to-richblack-900/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-richblack-700 hover:shadow-xl hover:shadow-black/30"
              >
                <div>
                  {/* Top Bar with Icon, Course Count Badge, and Action Buttons */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50/10 text-yellow-50 border border-yellow-50/20 group-hover:scale-105 transition-transform">
                        <VscLayers className="text-lg" />
                      </div>
                      <span className="rounded-full bg-richblack-800 px-3 py-1 text-[11px] font-medium text-richblack-300 border border-richblack-700">
                        {courseCount} {courseCount === 1 ? "Course" : "Courses"}
                      </span>
                    </div>

                    {/* Edit and Delete Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditModalCategory(category)}
                        title="Edit Category"
                        className="rounded-lg p-2 text-richblack-300 hover:bg-richblack-700 hover:text-yellow-50 transition-colors"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmationModal({
                            text1: `Delete "${category.name}"?`,
                            text2:
                              courseCount > 0
                                ? `Warning: This category currently has ${courseCount} course(s) linked to it. You must reassign or remove them first.`
                                : "This category will be permanently removed.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteCategory(category._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        title="Delete Category"
                        className="rounded-lg p-2 text-richblack-300 hover:bg-pink-800/40 hover:text-pink-200 transition-colors"
                      >
                        <RiDeleteBin6Line className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-lg font-semibold text-richblack-5 group-hover:text-yellow-50 transition-colors mb-2">
                    {category.name}
                  </h3>

                  {/* Category Description */}
                  <p className="text-xs sm:text-sm text-richblack-300 leading-relaxed line-clamp-3">
                    {category.description || "No description provided for this category."}
                  </p>
                </div>

                {/* Footer link to Catalog */}
                <div className="mt-6 pt-4 border-t border-richblack-800/80 flex items-center justify-between text-xs">
                  <span className="text-richblack-400 font-mono text-[10px]">
                    ID: {category._id.slice(-6)}
                  </span>
                  <Link
                    to={catalogPath}
                    className="inline-flex items-center gap-1.5 font-medium text-yellow-50 hover:text-yellow-100 hover:underline transition-colors"
                  >
                    <span>Browse Courses</span>
                    <VscArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create Modal */}
      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />

      {/* Edit Modal */}
      {editModalCategory && (
        <EditCategoryModal
          category={editModalCategory}
          isOpen={!!editModalCategory}
          onClose={() => setEditModalCategory(null)}
          onCategoryUpdated={() => {
            loadCategories()
            setEditModalCategory(null)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
