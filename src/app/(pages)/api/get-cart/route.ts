import { getUserToken } from "@/helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";



export async function GET() {
        const token = await getUserToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'GET',
            headers: {
                token: token + ''
            }
        });
        const data:CartResponse  = await response.json();
        return NextResponse.json(data)
}
export async function DELETE() {
        const token = await getUserToken()

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' ,{
        method:'DELETE',
         headers: {
                token:token + '',
             
            }

      });
        const data:CartResponse  = await response.json();
        return NextResponse.json(data)
}
export async function PUT(req: Request) {

  const { productId, count } = await req.json(); 

  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: {
        token: token + "",
        "Content-Type": "application/json",
      },
    }
  );

  const data: CartResponse = await response.json();
  return NextResponse.json(data);
}

