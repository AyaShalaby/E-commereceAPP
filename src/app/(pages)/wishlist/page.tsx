"use client"
import React, { useContext } from "react";
import { HeartOff, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { Button } from "@/components/ui/button";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";

export default function Wishlist() {
  const { wishlistData, isLoading ,setWishlistData} = useContext(WishlistContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading wishlist...</p>
      </div>
    );
  }

  // Empty wishlist
  if (!wishlistData?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <HeartOff className="w-16 h-16 text-[#6D2323] mb-4" />
        <h2 className="text-2xl font-semibold text-[#A31D1D] mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-[#6D2323] mb-6">
          Looks like you haven’t added any products yet.
        </p>
        <Link href={'/products'}>
                      <Button className=' cursor-pointer'>Add ones</Button>
                      </Link>
      </div>
    );
  }

  // if has products
  return (
    <div className="container mx-auto px-4 py-10 text-[#A31D1D]">
            <Button variant={ "outline"} className=" flex ms-auto text-[#d70f0f]" onClick={()=>setWishlistData(null)}> Clear Wishlist</Button>

      <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-[#A31D1D]" />
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {wishlistData.data.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md hover:shadow-[rgba(200,3,0,0.3)] rounded-2xl p-4 flex flex-col hover:shadow-lg transition"
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="max-w-full object-cover size-35 mx-auto rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {product.title.split(' ',3).join(' ')}            </h2>
            <p className="text-gray-600 font-medium mb-3">
             {product.price} EGP
            </p>
              <div className="flex justify-between">
              <Link href={`/products/${product._id}`}><span className="text-[#d70f0f] font-semibold">Details</span></Link>
               <AddToWishlist productId={product._id}/>
                          
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
