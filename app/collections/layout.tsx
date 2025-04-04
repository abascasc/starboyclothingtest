import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collections | Starboy",
  description: "Browse our curated collections of streetwear",
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

