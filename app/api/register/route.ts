
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import * as z from "zod"
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/configs/db"
import { Users } from "@/configs/schema"
import { eq } from "drizzle-orm"

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string()
    .min(1, "Password confirmation is required")
})

export async function POST(
    request: Request
  ){
    try {
        const body = await request.json()
        const {
            email,
            username,
            password
        } = userSchema.parse(body);
    
        const existingUserByEmail: any = await db.select().from(Users)
        .where(eq(Users.email, email))

        if(existingUserByEmail[0]){
          return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409})
        }
  
        const hashedPassword = await bcrypt.hash(password, 12)
  
    
        const newUser = await db.insert(Users).values({
          name: username,
          email: email,
          password: hashedPassword
        })
  
        console.log(newUser)
        return NextResponse.json({ user: null , message: "User created successfully"}, {status: 201})
        
  
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internet Error', {status: 500})
    }
  }