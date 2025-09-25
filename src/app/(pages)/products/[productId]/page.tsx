import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Star from '@/components/ui/star';
import {  ShoppingBag, StarIcon } from 'lucide-react';
import ProductSlider from '@/components/productSlider/productSlider';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

export default async function ProductDetails({params}:{params: Params}) {
    let {productId} = await params;
    console.log(productId);
    

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId);
    const {data : product}:{ data :ProductI} = await response.json();
    console.log(product);
    
  return <>
  
  <div className="container mx-auto min-h-[80vh] mt-8 mb-20">
     <h1 className="text-xl  text-[#A31D1D] font-bold mb-8 flex justify-center items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-[#A31D1D]" />
       Product Details
      </h1>

    <Card className='grid rounded-4xl md:grid-cols-3 items-center space-y-6 text-[#A31D1D] border-[#E5D0AC] p-5 '>
<div className=" col-span-1">
  <ProductSlider images={product.images} altContent={product.title}/>
</div>
 <div className="md:col-span-2">
   <CardHeader>
     <CardDescription className='text-gray-700'>{product.brand.name}</CardDescription>
    <CardTitle className='text-2xl'>{product.title}</CardTitle>
    <CardDescription className='text-base text-gray-700'>{product.description}</CardDescription>
    <CardAction>  
      <AddToWishlist productId={product._id}/> 
   </CardAction>
  </CardHeader>
  <CardContent>
     <CardDescription className='py-2'>{product.category.name}</CardDescription>
     <div className="flex gap-6">
   <div className="flex justify-between">
                   <div className="stars flex p-0 ">
                     {[1, 2, 3, 4, 5].map((i) =>
                       product.ratingsAverage >= i ? (
                         <Star key={i} />
                       ) : (
                         <StarIcon key={i} className="text-yellow-500 size-5" />
                       )
                     )}
                   </div>
                 </div>
                 <p>{product.ratingsAverage}</p>

     <p className='flex gap-1'>Reviews <span>{product.ratingsQuantity}</span></p>

     </div>
     <div className="flex gap-6 mt-3 justify-between">
     <p className=''>sold : <span>({product.quantity})</span></p>
           <p className='text-xl font-semibold'> <span className='text-[#d70f0f]'>{product.price} EGP</span></p>


     </div>
  </CardContent>
   <AddToCart productId={product.id} />
 </div>
</Card>
  
  </div>
  </>
}
