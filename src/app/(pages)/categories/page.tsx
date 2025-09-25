import { CategoryI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';


export default async function Categories() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const {data:categories} : {data:CategoryI[]} = await response.json()
  console.log(categories);
  

  return<>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-15 mt-5 min-h-[75vh] ">
  {categories.map((category) => (
    <div key={category._id}>
      <Card className="text-[#A31D1D] border-[#E5D0AC] p-4 h-72 w-full flex flex-col overflow-hidden rounded-2xl transition-shadow duration-400 hover:shadow-[0_5px_10px_rgba(200,3,0,0.3)]">
  <Link href={`/products?category=${category._id}`}>
  <div className="w-full h-48 relative">
    <Image
      src={category.image}
      alt={category.name}
      fill
      className="rounded-md object-cover max-w-full transform scale-117"
    />
  </div>
</Link>


  <CardHeader className="text-center mt-3 flex-1 flex items-center justify-center">
    <CardTitle className="font-bold text-base">{category.name}</CardTitle>
  </CardHeader>
</Card>

    </div>
  ))}
</div>

  
  
  
  </>
}
