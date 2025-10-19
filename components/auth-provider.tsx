"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: { email: string; password: string; first_name: string; last_name: string }) => Promise<boolean>
  logout: () => void
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let mockUser: User

    if (email === "demo@clickora.com" && password === "demo123") {
      mockUser = {
        id: 1,
        email: "demo@clickora.com",
        first_name: "Demo",
        last_name: "User",
        phone: "+1 (555) 123-4567",
      }
    } else {
      // Default mock user for any other credentials
      mockUser = {
        id: Date.now(),
        email,
        first_name: "John",
        last_name: "Doe",
        phone: "+1 (555) 123-4567",
      }
    }

    localStorage.setItem("user", JSON.stringify(mockUser))
    dispatch({ type: "LOGIN_SUCCESS", payload: mockUser })
    return true
  }

  const signup = async (userData: {
    email: string
    password: string
    first_name: string
    last_name: string
  }): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call - replace with actual registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful signup
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
    }

    localStorage.setItem("user", JSON.stringify(newUser))
    dispatch({ type: "LOGIN_SUCCESS", payload: newUser })
    return true
  }

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  return <AuthContext.Provider value={{ state, dispatch, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
