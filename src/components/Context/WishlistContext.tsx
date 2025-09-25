"use client"
import { WishlistResponse } from "@/interfaces";
import { toastSuccess } from "@/lib/toast";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
  wishlistData: WishlistResponse | null,
  setWishlistData: (value: WishlistResponse | null) => void,
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
  getWishlist: () => void,
  removeProduct:(value: string)=>void,
}>({
  wishlistData: null,
  setWishlistData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getWishlist: () => {},
  removeProduct:()=>{},

});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 const session = useSession()

  async function getWishlist() {
   if (session.status == 'authenticated') {
     try {
      const response = await fetch("/api/get-wishlist")

      const data: WishlistResponse = await response.json();
      console.log("Wishlist:", data);

      setWishlistData(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
   }
  }
async function removeProduct(productId: string) {
    const response = await fetch(`/api/get-wishlist/${productId}`,{
      method:'DELETE'
    })

    const data = await response.json();
    if (data.status === "success") {
      toastSuccess("Removed from wishlist ");
      await getWishlist(); // refresh
    }
  }
  useEffect(() => {
    getWishlist();
  }, [session.status]);

  return (
    <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist ,removeProduct}}>
      {children}
    </WishlistContext.Provider>
  );
}
