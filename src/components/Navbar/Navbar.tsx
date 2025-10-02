"use client"
import React, { useContext, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {
  HeartIcon,
  Loader2,
  MenuIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react"
import { Badge } from "../ui/badge"
import { CartContext } from "../Context/CartContext"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {

  const session = useSession()
  console.log('session', session);
  

  const { cartData, isLoading } = useContext(CartContext)
  const [open, setOpen] = useState(false) 

  
  const handleClose = () => setOpen(false)

  return (
    <>
      <nav className="py-3 bg-[#FEF9E1] text-[#A31D1D] text-3xl font-semibold shadow sticky top-0 z-50 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h1>
              <Link href={"/"} className="outline-0">
                ShopMart
              </Link>
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/products">Products</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/categories">Categories</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/brands">Brands</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {session.status == 'authenticated' && <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/allorders">Orders</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  </>}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side: User + Cart */}
            <div className="flex items-center gap-2">
            {session.status == 'authenticated' &&  <h2 className="text-sm">Hi  {session.data?.user.name} </h2>}
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0">
                  <UserIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {
                    session.status == 'authenticated' ? <>
                   
                     <DropdownMenuItem onClick={()=> signOut({
                      callbackUrl:'/',
                     })}>LogOut</DropdownMenuItem>
                    </>: <>
                    
                      <Link href={"/login"}>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                 
                    </>

                  }
                 
                 
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
             {
              session.status == 'authenticated' && <Link href={"/cart"} className="p-2.5 relative">
                <ShoppingCartIcon className="cursor-pointer" />
                <Badge className=" size-4 rounded-full px-1.5 pb-1.5 pt-1 absolute top-0 end-0 bg-[#A31D1D]">
                  <span>
                    {isLoading ? 
                      <Loader2 className="animate-spin size-4" />
                    : cartData?.numOfCartItems! > 0 ? 
                    cartData?.numOfCartItems
                    :0  }
                  </span>
                </Badge>
              </Link>
             }

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen} >
                  <SheetTrigger>
                    <MenuIcon className="cursor-pointer outline-none" />
                  </SheetTrigger>
                  <SheetContent  side="right" className="bg-[#FEF9E1] h-fit max-h-[400px] max-w-[200px] text-center pb-5 rounded-2xl outline-0 " >
                    <div className="flex flex-col gap-4 mt-6  text-[#A31D1D] ">
                      <Link href="/products" onClick={handleClose} className="border-b-[#8d5c5c2d] border-b pb-3 ">
                        Products
                      </Link>
                      <Link href="/categories" onClick={handleClose} className="border-b-[#8d5c5c2d] border-b pb-3">
                        Categories
                      </Link>
                      <Link href="/brands" onClick={handleClose} >
                        Brands
                      </Link>
                    {session.status == 'authenticated'&& <>
                      <Link href="/wishlist" className="flex items-center justify-center border-b-[#8d5c5c2d] border-t-[#8d5c5c2d] border-t border-b pb-3 pt-5" onClick={handleClose} >
                        Wishlist <HeartIcon className="size-4 ms-2 mt-1 "/>
                      </Link>
                      <Link href="/allorders" onClick={handleClose} >
                        Orders
                      </Link>
                    </>}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
