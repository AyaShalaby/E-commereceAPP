import { getUserToken } from "@/helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: { token: token },
    });

    if (!response.ok) {
      const text = await response.text(); 
      return NextResponse.json({ error: "Failed to fetch cart", details: text }, { status: response.status });
    }

    const data: CartResponse = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
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

