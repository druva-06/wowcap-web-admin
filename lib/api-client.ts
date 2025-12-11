/**
 * API Client utility for making authenticated requests to the backend
 */

import { secureStorage } from "./crypto-utils"

/**
 * Get the access token from storage (localStorage or sessionStorage)
 */
export const getAccessToken = (): string | null => {
  // Try localStorage first (for remembered sessions)
  let token = secureStorage.getItem("access_token", localStorage)
  if (!token) {
    // Try sessionStorage (for non-remembered sessions)
    token = secureStorage.getItem("access_token", sessionStorage)
  }
  return token
}

/**
 * Get the ID token from storage
 */
export const getIdToken = (): string | null => {
  let token = secureStorage.getItem("id_token", localStorage)
  if (!token) {
    token = secureStorage.getItem("id_token", sessionStorage)
  }
  return token
}

/**
 * Get the refresh token from storage
 */
export const getRefreshToken = (): string | null => {
  let token = secureStorage.getItem("refresh_token", localStorage)
  if (!token) {
    token = secureStorage.getItem("refresh_token", sessionStorage)
  }
  return token
}

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: Record<string, string>
  useAuth?: boolean
}

/**
 * Make an authenticated API request
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<{ success: boolean; data?: T; message?: string; statusCode?: number }> => {
  const { method = "GET", body, headers = {}, useAuth = true } = options

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const url = `${baseUrl}${endpoint}`

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  // Add authorization header if useAuth is true
  if (useAuth) {
    const accessToken = getAccessToken()
    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    return {
      success: data.success || response.ok,
      data: data.response || data.data || data,
      message: data.message,
      statusCode: data.statusCode || response.status,
    }
  } catch (error) {
    console.error("API Request Error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      statusCode: 500,
    }
  }
}

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T = any>(endpoint: string, options: Omit<ApiRequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = any>(endpoint: string, body: any, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = any>(endpoint: string, body: any, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = any>(endpoint: string, options: Omit<ApiRequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
}
