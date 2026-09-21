import React from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size }) {
  const rating = Math.max(0, Math.min(5, Number(Review_Count) || 0))
  const wholeStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = Math.max(0, 5 - wholeStars - hasHalf)

  const size = Star_Size || 14

  return (
    <div className="flex items-center gap-0.5 text-yellow-100 shrink-0">
      {[...Array(wholeStars)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={size} className="shrink-0 text-yellow-100" />
      ))}
      {hasHalf === 1 && (
        <TiStarHalfOutline key="half" size={size} className="shrink-0 text-yellow-100" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={size} className="shrink-0 text-yellow-100" />
      ))}
    </div>
  )
}

export default RatingStars
