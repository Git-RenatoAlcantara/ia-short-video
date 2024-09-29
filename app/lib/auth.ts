import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider  from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { getUserFromDb } from "../actions/user.action";


export const authOptions : NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.SECRET_JWT,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/signin'
    },
    providers: [
    
          CredentialsProvider({
            name: 'credentials',
            credentials: {
              email: { label: 'email', type: 'text' },
              password: { label: 'password', type: 'password' }
            },
            
            async authorize(credentials) {
                console.log("credentials", credentials)
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Email and password are empty')
                }
             
               const user = await getUserFromDb(credentials.email as string, credentials.password as string)
                if(!user){
                    throw new Error("User not found.")
                }
               
                if(!user.success){
                    throw new Error(user.message)
                }
                return user.data as any
            }
          })      
    ],
    
}