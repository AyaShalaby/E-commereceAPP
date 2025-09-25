"use client"
import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toastSuccess } from '@/lib/toast'
export default function Checkout( {cartId}: {cartId : string}) {
    let detailsInput = useRef <HTMLInputElement | null>(null);
    let phoneInput = useRef <HTMLInputElement | null>(null);
    let cityInput = useRef <HTMLInputElement | null>(null);
    let [checkoutVisa ,setCheckoutVisa] = useState <boolean>(false);
    let [checkoutCash ,setCheckoutCash] = useState <boolean>(false);



 async function checkoutSession() {
   setCheckoutVisa(true)
    const shippingAddress = {
      details: detailsInput.current?.value ,
      phone : phoneInput.current?.value ,
      city : cityInput.current?.value
    }
    const response = await fetch("/api/checkout-visa", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cartId, shippingAddress }),
});

      const data = await response.json();
      console.log(data);
      if(data.status == 'success'){
        location.href = data.session.url
      }
      
     setCheckoutVisa(false)
     }

   async function createCashOrder() {
   setCheckoutCash(true)
    const shippingAddress = {
      details: detailsInput.current?.value ,
      phone : phoneInput.current?.value ,
      city : cityInput.current?.value
    }
    
   const response = await fetch("/api/checkout-cash", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cartId, shippingAddress }),
});
      const data = await response.json();
      console.log(data);
     if (data.status === "success") {
         toastSuccess("Your order has been placed successfully!");
         location.href = "/allorders";
 
}

      
     setCheckoutCash(false)
     }



  return<>
  <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full mt-5 h-11 rounded-xl bg-[#A31D1D] text-primary-foreground font-medium hover:bg-[#d70f0f] cursor-pointer'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-[#6D2323]'>Shipping Details</DialogTitle>
            <DialogDescription className='text-gray-800'>
             Enter your address and contact details so we can deliver your items smoothly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 text-[#6D2323]">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city"  />
            </div>
            <div className="grid gap-3 text-[#6D2323]">
              <Label htmlFor="details">Address details</Label>
              <Input ref={detailsInput} id="details"  />
            </div>
            <div className="grid gap-3 text-[#6D2323]">
              <Label htmlFor="phone">Phone number</Label>
              <Input ref={phoneInput} id="phone"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='text-gray-800'>Cancel</Button>
            </DialogClose>
            <Button type="submit"onClick={createCashOrder}>{checkoutCash? <Loader2 className='animate-spin'/> : 'Cash'}</Button>
            <Button type="submit" onClick={checkoutSession}>{checkoutVisa? <Loader2 className='animate-spin'/> : 'Visa'}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
