// pages/forgetPassword/verifyCode.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toastError, toastNormal } from "@/lib/toast"

export default function VerifyCode() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) router.push("/forgetPassword")
  }, [email, router])

  async function handleVerify() {
    if (!code.trim()) return toastNormal("Please enter the verification code")

    setIsLoading(true)
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }),
        }
      )

      const data = await res.json()
      console.log("Verify response:", data)

      if (!res.ok) throw new Error(data.message || "Invalid code")

      router.push(`/forgetPassword/resetPassword?email=${email}`)
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
      <h2 className="text-center text-xl mb-4">Enter Verification Code</h2>
      <Input
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleVerify} disabled={isLoading} className="w-full mt-4">
        {isLoading && <Loader2 className="animate-spin mr-2" />}Verify
      </Button>
    </Card>
    </div>
  )
}
