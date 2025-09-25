import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  const token = await getUserToken()
  
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${params.productId}`,
    {
      method: "DELETE",
      headers: {
        token: token + '',
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}