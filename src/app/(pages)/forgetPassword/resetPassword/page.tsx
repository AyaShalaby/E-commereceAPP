// pages/forgetPassword/resetPassword.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toastError, toastNormal, toastSuccess } from "@/lib/toast"

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) router.push("/forgetPassword")
  }, [email, router])

  function validatePassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return regex.test(password)
  }

  async function handleReset() {
    if (!newPassword) return toastNormal("Please enter a new password")
    if (!validatePassword(newPassword))
      return toastError("Password must be 8-15 chars, include upper, lower, number & special char")
    if (!email) return toastError("Email missing, cannot reset password")

    setIsLoading(true)
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await res.json()
      console.log("Reset response:", data)

      if (!res.ok) throw new Error(data.message || "Failed to reset password")

     toastSuccess("Password reset successfully! You can now login.")
      router.push("/login")
    } catch (error: any) {
    toastError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) return null

  return (
   <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8 mb-10">
     <Card className="p-6 w-sm text-[#A31D1D]">
      <h2 className="text-center text-xl mb-4">Reset Password</h2>
      <Input value={email} readOnly className="mb-4" />
      <Input
        placeholder="Enter new password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleReset} disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="animate-spin mr-2" />}Reset Password
      </Button>
    </Card>
   </div>
  )
}
