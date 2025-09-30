"use client"
import { CartResponse } from "@/interfaces";
import { toastSuccess } from "@/lib/toast";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";



export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    isClearing: boolean,
    setIsClearing: (value: boolean) => void,
    getCart: () => void,
    clearCart: () => void,
    removeCartItem: (productId: string) => void,
    removingId: string | null,
    updateCartItemCount: (productId: string, count: number) => void, 
  updateId: string | null

}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    isClearing: false,
    setIsClearing: () => { },
    getCart: () => { },
    clearCart: () => { },
    removeCartItem: () => { },
    removingId: null,
     updateCartItemCount: () => {},
  updateId: null,

});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    let [isClearing, setIsClearing] = useState<boolean>(false)
    let [removingId, setRemovingId] = useState<null | string>(null)
    let [updateId, setUpdateId]= useState<null|string>(null)
    


    const session = useSession()

    async function getCart() {
  if (session.status == "authenticated") {
    try {
      const response = await fetch("/api/get-cart");
      if (!response.ok) {
        console.error("Failed to fetch cart:", response.status);
        setCartData(null);
        return;
      }
      const data: CartResponse = await response.json();
      setCartData(data);
      if (data?.data?.cartOwner) {
        localStorage.setItem("userId", data.data.cartOwner);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartData(null);
    } finally {
      setIsLoading(false);
    }
  }
}

    async function clearCart() {
        setIsClearing(true);

        const response = await fetch("/api/get-cart", {
            method: 'DELETE'
        })

        const data: CartResponse = await response.json();
        console.log(data);
        if (data.message == 'success') {
            setCartData(null)
        }

        setIsClearing(false)
    }

    async function removeCartItem(productId: string) {
  setRemovingId(productId);

  const response = await fetch(`/api/remove-cart-item/${productId}`, {
    method: "DELETE",
  });

  const data: CartResponse = await response.json();
  console.log("removeCartItem response:", data);

  if (data.status === "success" || data.message === "success") {
    toastSuccess("Product removed successfully");
    await getCart(); 
  }

  setRemovingId(null);
}



      async function updateCartItemCount(productId:string , count:number) {
      if (count === 0) {
    removeCartItem(productId);
  } else {
    setUpdateId(productId);

    const response = await fetch("/api/get-cart", {
      method: "PUT",
      body: JSON.stringify({ productId, count }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      
      const data : CartResponse = await response.json();
      console.log(data);
      if(data.status == 'success'){
         toastSuccess('Product Quantity Updated successfully');
         setCartData(data)
      }
      
      setUpdateId(null)
     }
    }


    //to work when run 
    useEffect(() => {

        getCart();


    }, [session.status])

    return <CartContext.Provider value={{ 
        cartData,
         setCartData,
          isLoading, 
          setIsLoading,
           getCart,
            isClearing, 
            setIsClearing, 
            clearCart,
             removeCartItem,
             updateCartItemCount,
             updateId,
              removingId }}>
        {children}
    </CartContext.Provider>
}