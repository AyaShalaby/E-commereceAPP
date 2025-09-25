import { UserResponse } from "@/interfaces"
import NextAuth from "next-auth"
import { User } from "next-auth"
//declare before anything you can import this thing without from...
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  //decoding
  interface Session {
    user :UserResponse
  }
  //encoding
  interface User {
    user:UserResponse,
    token:string
  }
}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT  extends User{}
}