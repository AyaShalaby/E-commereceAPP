"use client"
import { MailIcon, PhoneIcon } from "lucide-react"
import React from "react"

export default function Footer() {
  return (
    <div className=" w-full border-t-2 pt-10 bg-[#fffdf3]">
      <div className=" mx-auto px-6 lg:px-12">
        {/* grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-8 text-[#6D2323]">
          
          {/* Logo & Info */}
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <div className="logo size-6 bg-[#A31D1D] flex items-center justify-center rounded">
                <span className="text-xl text-accent font-semibold">T</span>
              </div>
              <h2 className="text-[#A31D1D] font-semibold">ShopMart</h2>
            </div>
            <p className="text-sm leading-relaxed ">
              Your one-stop destination <br /> for anything you need 
            </p>
            <div className="flex gap-2 items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p className="text-sm">
                123 Shop Street, Octoper City, <br />
              
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <PhoneIcon className="size-5" />
              <span className="text-sm">(+20) 01093333333</span>
            </div>
            <div className="flex gap-2 items-center">
              <MailIcon className="size-5" />
              <span className="text-sm">support@shopmart.com</span>
            </div>
          </div>

          {/* SHOP */}
          <div className="space-y-2">
            <h2 className="text-[#A31D1D] font-semibold">SHOP</h2>
            <ul className="space-y-2 text-sm">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Garden</li>
              <li>Sports</li>
              <li>Deals</li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="space-y-2">
            <h2 className="text-[#A31D1D] font-semibold">CUSTOMER SERVICE</h2>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Track Your Order</li>
              <li>Returns & Exchanges</li>
              <li>Size Guide</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-2">
            <h2 className="text-[#A31D1D] font-semibold">ABOUT</h2>
            <ul className="space-y-2 text-sm">
              <li>About ShopMart</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Investor Relations</li>
              <li>Sustainability</li>
            </ul>
          </div>

          {/* POLICIES */}
          <div className="space-y-2">
            <h2 className="text-[#A31D1D] font-semibold">POLICIES</h2>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* bottom copyright */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopMart. All rights reserved.
        </div>
      </div>
    </div>
  )
}
