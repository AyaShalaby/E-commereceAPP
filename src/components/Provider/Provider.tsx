"use client"
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import Footer from "@/components/footer/page";
import WishlistContextProvider from "@/components/Context/WishlistContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


export default function Provider({children}:{children:ReactNode}) {
  return<>
  
    <SessionProvider>
           <CartContextProvider>
           <WishlistContextProvider>
             <Navbar/>
          <div className="container mx-auto py-4">
                    <Toaster/>
                    {children}
                    <Footer/>
          </div>
           </WishlistContextProvider>
          </CartContextProvider>
         </SessionProvider>
  </>
}
