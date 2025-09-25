import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return  <>



 

     <div className=" flex flex-col justify-center items-center min-h-[95vh] text-center px-4">
       <h1 className="text-4xl font-bold p-3 text-[#A31D1D]">Welcome to ShopMart</h1>
       <p className="text-[#6D2323] p-5 text-[18px] max-w-2xl">
         Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with <br />
         fast shipping and excellent customer service.
       </p>
       <div className="flex gap-3 justify-center items-center mt-5 flex-wrap">
         <Link href={'/products'}>
           <Button className="w-35 h-12">Shop Now</Button>
         </Link>
         <Link href={'/categories'}>
           <Button variant="outline" className="w-35 h-12">Browse Categories</Button>
         </Link>
       </div>
     </div>








    </>
    
  
}
