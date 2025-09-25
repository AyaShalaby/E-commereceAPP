"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import  {signIn} from 'next-auth/react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string('invalid email').nonempty('Email is Required'),
  password: z.string('invalid password').nonempty('Password is Required')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 'invalid password')
})
 type FormFields = z.infer<typeof formSchema>
export function LoginForm() {
 const [isLoading , setIsLoading] = useState<boolean>(false)
    let searchParams = useSearchParams();
    console.log(searchParams.get('error'));
    console.log(searchParams.get('callback-url'));
    const callbackURL = searchParams.get('callback-url');

    // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    setIsLoading(true)
   const response = await signIn('credentials',{
    callbackUrl:callbackURL ?? '/',
    redirect:true,
    email:values.email,
   password:values.password
     
   });
   setIsLoading(false)
  
  }


  return (
   <Card className="p-6 w-sm text-[#A31D1D]">

     <Form {...form}>
        {searchParams.get('error')?
         <h1 className="text-destructive text-[18px] text-center py-3">{searchParams.get('error')}</h1> 
         : ''}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="ali@example.com" type="email" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Ali$123" type="password" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        {searchParams.get('error') && <>
        <p className="text-right text-sm mt-2">
  <Link href={"/forgetPassword"} className=" hover:underline font-medium">
    Forgot Password?
  </Link>
</p>

        </>}

        <Button type="submit" disabled = {isLoading} className="cursor-pointer w-full">
            {isLoading && <Loader2 className="animate-spin"/>}Submit</Button>
      </form>
    </Form>
   </Card>
  )
}