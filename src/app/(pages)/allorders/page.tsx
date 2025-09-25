"use client";

import { useEffect, useState } from "react";
import { OrdersResponse, Order } from "@/interfaces";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Loading from "@/app/loading";
import Link from "next/link";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
      );
      const data: OrdersResponse = await response.json();
      console.log("Orders API response:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) return <Loading />;

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center flex-col">
        <h2 className='text-2xl mb-5 text-[#A31D1D]'>No orders Found</h2>
        <Link href={'/cart'}>
          <Button className=' cursor-pointer'>Make An Order</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-[60vh] mb-8 space-y-6">
      <Button
        variant="outline"
        className="flex ms-auto text-[#d70f0f]"
        onClick={() => setOrders([])}
      >
        Clear Orders
      </Button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order._id} className="border border-gray-200 shadow-md hover:shadow-[rgba(200,3,0,0.3)] rounded-3xl p-4 text-[#A31D1D]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold ">
                Order #{order._id.slice(-6)}
              </CardTitle>
              <CardDescription className="text-gray-600">
                Date : {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <h3 className=" text-[#d70f0f] font-semibold">Shipping Details : </h3>
                <div>
                  {order.shippingAddress ? (
                    <>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.details}
                      </p>
                      <p>Phone : {order.shippingAddress.phone}</p>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No shipping details</p>
                  )}
                </div>
              </div>


              <div className="space-y-2">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between  "
                  >
                    <span>
                     - {item.product.title.split(' ', 3).join(' ')} × {item.count}
                    </span>
                    <span className="text-[#d70f0f] font-semibold">{item.price} EGP</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-3">
              <span className="font-semibold text-[#d70f0f]">
                Total : {order.totalOrderPrice} EGP
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-[#d70f0f]"
                  }`}
              >
                {order.isPaid ? "Paid" : "Cash"}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 