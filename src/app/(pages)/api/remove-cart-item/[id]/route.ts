
import { getUserToken } from "@/helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = await getUserToken();
  const { id } = params;

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: { token: token + "" },
  });

  const data: CartResponse = await response.json();
  return NextResponse.json(data);
}
