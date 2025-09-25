import { NextResponse } from "next/server";
import { getUserToken } from "@/helpers/getUserToken";

export async function POST(req: Request) {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cartId, shippingAddress } = await req.json();

     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{
        method:'POST',
        body:JSON.stringify({shippingAddress}),
         headers: {
                token: token,
              'Content-Type':'application/json'
            }

      });
      const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
