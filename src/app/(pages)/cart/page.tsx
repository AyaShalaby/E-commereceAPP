"use client"
import Loading from '@/app/loading'
import { CartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/formatPrice'
import { Loader2, ShoppingBag, Trash2, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, } from 'react'
import Checkout from '@/components/checkout/checkout'

export default function Cart() {

let { isLoading, cartData ,getCart ,isClearing,clearCart,removeCartItem,removingId,updateCartItemCount,updateId} = useContext(CartContext)

if(typeof cartData?.data.products[0]?.product == 'string' || cartData?.numOfCartItems == 0) { getCart()} ;
   
console.log(cartData?.cartId);

    
  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading />   : cartData?.numOfCartItems! > 0 ? 
        <div className="container  px-4 py-6 text-[#A31D1D]">
       <h1 className="text-xl font-bold mb-3 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-[#A31D1D]" />
       Shopping Cart
      </h1>          <p className="text-gray-600 mt-1">
            {cartData?.data?.products?.length || 0} item(s) in your cart
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            {/* items */}
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data?.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card border-[#E5D0AC]"
                >
                 <Link href={'/products/'+item.product._id}>
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                  />
                 </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title.split(' ',3).join(' ')}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          {item.product.brand.name}. {item.product.category.name}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                      <button
                        aria-label="decrease"
                        className="rounded-lg size-8 border hover:bg-accent cursor-pointer"
                        onClick={()=>{item.count < 1 ? removeCartItem(item.product._id):updateCartItemCount(item.product._id , item.count - 1)} }
                       
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-medium">
                        {updateId == item.product._id ?<Loader2 className='animate-spin'/>:item.count}
                      </span>
                      <button
                        aria-label="increase"
                        className="rounded-lg size-8 border hover:bg-accent cursor-pointer"
                         onClick={()=> updateCartItemCount(item.product._id , item.count + 1)}
                      >
                        +
                      </button>
                    </div>
                      </div>
                      <div className="text-right shrink-0 mt-2">
                        <span className="font-semibold text-red-900">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    
                    <button
                    onClick={()=>removeCartItem(item.product._id)}
                      aria-label="remove"
                      className="text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center"
                    >
                      {removingId == item.product._id ?<Loader2 className='animate-spin size-5'/>: <Trash2Icon className='size-5'/>} 
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* summary */}
            <div className="lg:col-span-1 sticky top-19 ">
              <div className="rounded-xl border shadow-sm p-5 border-[#E5D0AC] bg-card">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Subtotal ({cartData?.data?.products?.length || 0} items)
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(cartData?.data.totalCartPrice!)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Shipping
                    </span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>
                <div className="my-4 border-t">

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-semibold">
                    Total
                    </span>
                    <span className="text-base font-bold">{formatCurrency(cartData?.data.totalCartPrice!)}</span>
                  </div>
                       
                       
                  <Checkout cartId={cartData?.cartId!}/>
                    <Link href={'/products'}>
                      <button className='w-full mt-3  h-11 rounded-xl border font-semibold border-[#A31D1D] text-[#A31D1D] hover:bg-accent hover:text-[#d70f0f] cursor-pointer'>Continue Shopping</button>
                      </Link>             
                         </div>
              </div>

              <Button className='ms-auto mt-4 flex text-[#d70f0f]' variant={'outline'} onClick={()=> clearCart()}>{isClearing? <Loader2 className='animate-spin'/> : <Trash2/>} Clear Cart</Button>
            </div>
     
          </div>
          {/* Empty cart */}
        </div>: <div className="min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className='text-2xl mb-4 text-[#A31D1D]'>Your Cart Is Empty</h2>
          <Link href={'/products'}>
                      <Button className=' cursor-pointer'>Add ones</Button>
                      </Link>   
        </div>
     }
    </>
  )
}
