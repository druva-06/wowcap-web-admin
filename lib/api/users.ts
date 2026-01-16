/**
 * API Client for User Management
 */

import { api } from "../api-client"

export interface UserRequestDto {
  name: string
  email: string
  phoneNumber: string
  profilePicture?: string
  roleName: string
}

export interface UserResponseDto {
  userId: number
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  profilePicture?: string
  role: string
}

export interface PagedUserResponseDto {
  users: UserResponseDto[]
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  first: boolean
  last: boolean
}

// Backend API response structure with snake_case
interface UserApiResponse {
  user_id: number
  first_name: string
  last_name: string
  username: string
  email: string
  phone_number: string
  profile_picture?: string
  role: string
}

interface PagedUserApiResponse {
  users: UserApiResponse[]
  current_page: number
  total_pages: number
  total_elements: number
  page_size: number
  first: boolean
  last: boolean
}

// Helper function to map snake_case API response to camelCase DTO
function mapUserApiResponseToDto(apiUser: UserApiResponse): UserResponseDto {
  return {
    userId: apiUser.user_id,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    username: apiUser.username,
    email: apiUser.email,
    phoneNumber: apiUser.phone_number,
    profilePicture: apiUser.profile_picture,
    role: apiUser.role
  }
}

function mapPagedUserApiResponseToDto(apiResponse: PagedUserApiResponse): PagedUserResponseDto {
  return {
    users: apiResponse.users.map(mapUserApiResponseToDto),
    currentPage: apiResponse.current_page,
    totalPages: apiResponse.total_pages,
    totalElements: apiResponse.total_elements,
    pageSize: apiResponse.page_size,
    first: apiResponse.first,
    last: apiResponse.last
  }
}

/**
 * Fetch all users with pagination and optional search
 */
export async function getAllUsers(
  page: number = 0,
  size: number = 10,
  search?: string
): Promise<PagedUserResponseDto> {
  let url = `/api/user/all?page=${page}&size=${size}`
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`
  }

  const response = await api.get<any>(url)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch users")
  }

  // Handle both direct response and nested response structure
  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.users) {
    throw new Error("Invalid response structure from API")
  }

  return mapPagedUserApiResponseToDto(apiData)
}

/**
 * Fetch users by role
 */
export async function getUsersByRole(
  role: string,
  page: number = 0,
  size: number = 10
): Promise<PagedUserResponseDto> {
  const response = await api.get<any>(
    `/api/user/by-role?role=${role}&page=${page}&size=${size}`
  )

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch users by role")
  }

  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.users) {
    throw new Error("Invalid response structure from API")
  }

  return mapPagedUserApiResponseToDto(apiData)
}

/**
 * Fetch a single user by ID
 */
export async function getUserById(userId: number): Promise<UserResponseDto> {
  const response = await api.get<any>(`/api/user/get?userId=${userId}`)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch user")
  }

  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.user_id) {
    throw new Error("Invalid response structure from API")
  }

  return mapUserApiResponseToDto(apiData)
}

/**
 * Create a new user
 */
export async function createUser(userData: UserRequestDto): Promise<UserResponseDto> {
  const response = await api.post<any>("/api/user/add", userData)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to create user")
  }

  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.user_id) {
    throw new Error("Invalid response structure from API")
  }

  return mapUserApiResponseToDto(apiData)
}

/**
 * Update an existing user
 */
export async function updateUser(
  userId: number,
  userData: UserRequestDto
): Promise<UserResponseDto> {
  const response = await api.put<any>(
    `/api/user/update?userId=${userId}`,
    userData
  )

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to update user")
  }

  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.user_id) {
    throw new Error("Invalid response structure from API")
  }

  return mapUserApiResponseToDto(apiData)
}

/**
 * Update user role only
 */
export async function updateUserRole(
  userId: number,
  roleName: string
): Promise<UserResponseDto> {
  const response = await api.patch<any>(
    `/api/user/update-role?userId=${userId}&roleName=${roleName}`
  )

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to update user role")
  }

  const apiData = response.data.response || response.data
  
  if (!apiData || !apiData.user_id) {
    throw new Error("Invalid response structure from API")
  }

  return mapUserApiResponseToDto(apiData)
}

/**
 * Delete a user
 */
export async function deleteUser(userId: number): Promise<void> {
  const response = await api.delete<void>(`/api/user/delete/${userId}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to delete user")
  }
}

/**
 * Get all counselors
 */
export async function getAllCounselors(): Promise<any[]> {
  const response = await api.get<any[]>("/api/user/counselors")

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch counselors")
  }

  return response.data || []
}
