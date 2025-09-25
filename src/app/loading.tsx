
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center text-[#A31D1D] gap-2'>
       <div className="logo size-7 bg-[#A31D1D] flex items-center justify-center   rounded text-accent">
                <span className="text-2xl text-accent p-2 font-semibold">S</span>
              </div>
      <h1>
       Loading 
      </h1>
    <Loader2 className='animate-spin size-6 mt-1'/>
    </div>
  )
}
