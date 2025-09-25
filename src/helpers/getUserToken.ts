
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies()
  const rawToken = cookieStore.get('next-auth.session-token')?.value 
    || cookieStore.get('__Secure-next-auth.session-token')?.value

  if (!rawToken) return null

  const decoded = await decode({
    token: rawToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return decoded?.token
}
