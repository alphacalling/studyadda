import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { adminEndpoints } from "../apis"

const { ADMIN_SEARCH_USER_API, ADMIN_SET_TEMP_PASSWORD_API } = adminEndpoints

// Search User by Email for Admin
export async function searchUserByEmail(email, token) {
  const toastId = toast.loading("Searching user...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      ADMIN_SEARCH_USER_API,
      { email },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
    toast.success("User found")
  } catch (error) {
    console.error("ADMIN_SEARCH_USER_API ERROR............", error)
    toast.error(error.response?.data?.message || error.message || "User not found")
  }
  toast.dismiss(toastId)
  return result
}

// Generate / Set Temporary Password for User by Admin
export async function setTemporaryPassword(email, customPassword, token) {
  const toastId = toast.loading("Generating temporary password...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      ADMIN_SET_TEMP_PASSWORD_API,
      { email, customPassword },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data
    toast.success(response.data.message || "Temporary password generated!")
  } catch (error) {
    console.error("ADMIN_SET_TEMP_PASSWORD_API ERROR............", error)
    toast.error(error.response?.data?.message || error.message || "Failed to set temporary password")
  }
  toast.dismiss(toastId)
  return result
}
