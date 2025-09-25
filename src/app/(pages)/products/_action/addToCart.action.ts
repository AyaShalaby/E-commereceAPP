"use server"

import { getUserToken } from "@/helpers/getUserToken";


export async function addToCartAction(productId:string) {

   const token = await getUserToken()

const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token:token + '',
                "Content-Type":"application/json"
            }
        });
        const data = await response.json()
     
        return data
    


}