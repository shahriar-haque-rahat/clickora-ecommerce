"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

interface WishlistItem {
  id: number
  name: string
  price: number
  image_url: string
  category: string
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const WishlistContext = createContext<{
  state: WishlistState
  dispatch: React.Dispatch<WishlistAction>
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
} | null>(null)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "CLEAR_WISHLIST":
      return {
        ...state,
        items: [],
      }
    case "LOAD_WISHLIST":
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
  })

  useEffect(() => {
    // Load wishlist from localStorage on mount
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: items })
      } catch (error) {
        console.error("Error loading wishlist:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: item })
  }

  const removeFromWishlist = (id: number) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id })
  }

  const isInWishlist = (id: number) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ state, dispatch, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
