"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import { CartContext } from '../Context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toastSuccess } from '@/lib/toast'

export default function AddToCart({ productId }: { productId: string }) {
    
  const {getCart ,setCartData} =  useContext(CartContext);
         const [isLoading,setIsLoading]  = useState(false)

             const session = useSession()
             let router = useRouter()

    async function addProductToCart() {
       if (session.status == 'authenticated') {
         setIsLoading(true)
        const data = await addToCartAction(productId)
        // await getCart();//2 requests  always
         setCartData (data)
        data.status === 'success' && toastSuccess(data.message)
                setIsLoading(false)

        console.log(data);
       }else{
         router.push('/login')
       }
        
    }

    return <>
        <CardFooter className='gap-4 mt-5 mb-1' >
            <Button variant={'outline'}  disabled={isLoading} onClick={addProductToCart} className='grow md:grow-0 mx-auto w-full md:w-auto hover:text-accent hover:bg-[#A31D1D] border-[#d70f0f] text-[#d70f0f] '>
                {isLoading? <Loader2 className='animate-spin'/>:<ShoppingCartIcon />}Add To Cart</Button>
        </CardFooter>


 
    </>
}
