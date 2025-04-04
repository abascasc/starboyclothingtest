// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import ClientComponent from "./client"
import type React from "react"

export const metadata: Metadata = {
  title: "Starboy - Stellar Streetwear Brand",
  description: "Premium cosmic-inspired streetwear clothing and accessories",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  )
}
