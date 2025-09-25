import { ProductI } from '@/interfaces/product';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import {  StarIcon } from 'lucide-react';
import Star from '@/components/ui/star';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { Button } from '@/components/ui/button';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

export default async function Products({ searchParams }: { searchParams: { category?: string , brand?: string } }) {

  const url = searchParams.category
  ? `https://ecommerce.routemisr.com/api/v1/products?category=${searchParams.category}`
  : searchParams.brand
    ? `https://ecommerce.routemisr.com/api/v1/products?brand=${searchParams.brand}`
    : `https://ecommerce.routemisr.com/api/v1/products`;

  const response = await fetch(url, {
    next: { revalidate: 10 * 60 }
  });
  const { data: products }: { data: ProductI[] } = await response.json();
  console.log(products);
 
    if (!products || products.length === 0) {
  const message = searchParams.category
    ? "Products of this category will be available soon"
    : searchParams.brand
      ? "Products of this brand will be available soon"
      : "No products available at the moment";
      const back = searchParams.category
    ? '/categories'
    : '/brands'
      
    return (
      <div className="min-h-[70vh] flex justify-center items-center flex-col">
        <h1 className="text-[#A31D1D] text-lg mb-4">{message} </h1>
         <Link href={back}>
                      <Button className=' cursor-pointer'>Go Back</Button>
                      </Link>   
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-15 ">
      {products.map((product) =>
        <div key={product.id}>
          <Card className='text-[#6D2323]  bg-white p-4 transition-shadow duration-400 hover:shadow-[0_5px_10px_rgba(200,3,0,0.3)] '>
            <AddToWishlist productId={product._id}/>
            
            <Link href={'/products/' + product.id}>

              <Image src={product.imageCover} alt={product.title} className='rounded-md mx-auto max-w-fit ' width={150} height={150} />
            </Link>

            <CardHeader>
              <CardAction></CardAction>
              <CardDescription>{product.brand.name}</CardDescription>
              <CardTitle className='font-bold'>{product.title.split(' ', 2).join(' ')}</CardTitle>
              <CardDescription>{product.category.name}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between">
                <div className="stars flex p-0">
                  {[1, 2, 3, 4, 5].map((i) =>
                    product.ratingsAverage >= i ? (
                      <Star key={i} />
                    ) : (
                      <StarIcon key={i} className="text-yellow-500 size-5" />
                    )
                  )}
                </div>
                <p>{product.ratingsAverage}</p>
              </div>
              <p className='pt-3'> Price : <span className="font-bold">{product.price} EGP</span></p>
            </CardContent>

            <AddToCart productId={product.id} />
          </Card>
        </div>
      )}
    </div>
  );
}
