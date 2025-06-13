import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shyply - AI-Powered E-commerce Platform",
  description: "A modern e-commerce platform that combines a friction-free shopping experience with an AI copilot.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  )
} 