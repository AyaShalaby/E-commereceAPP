"use client"
import { useContext, useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";
import { WishlistContext } from "../Context/WishlistContext";
import Heart from "../ui/heart";
import { addToWishlistAction } from "@/app/(pages)/products/_action/addToWishlist.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/lib/toast";

export default function AddToWishlist({ productId }: { productId: string }) {
  const { wishlistData,  getWishlist , removeProduct} = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  //  check if product already in wishlist
  useEffect(() => {
    if (wishlistData?.data?.some((item: any) => item._id === productId)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlistData, productId]);
  //authentication
  const session = useSession()
   let router = useRouter()

  //  Add product
  async function addProduct() {
    if (session.status == 'authenticated') {
      const data = await addToWishlistAction(productId)
    if (data.status === "success") {
     toastSuccess("Added to wishlist ");
      await getWishlist(); // refresh
    }
      
    }else {
      router.push('/login')
    }
  }

  //  Remove product
  

  //  toggle handler
  async function toggleWishlist() {
    if (isInWishlist) {
      await removeProduct(productId);
    } else {
      await addProduct();
    }
  }

  return (
    <button onClick={toggleWishlist} className="cursor-pointer">
      {isInWishlist ? (
        <Heart />
      ) : (
        <HeartIcon className="text-[#A31D1D] ms-auto size-6" /> 
      )}
    </button>
  );
}
