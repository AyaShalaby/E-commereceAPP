
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

export default function NotFound() {


  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white border border-gray-200 shadow-md rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-[#A31D1D] mb-3">404 - Page Not Found</h1>
        <p className="text-[#6D2323] mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
         
         <Link href={'/'}> <Button
            className="px-5 py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            Go Home
          </Button></Link>
        </div>
      </div>
    </main>
  )
}
