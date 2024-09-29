import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";


export const authOptions : NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.SECRET_JWT,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: 'sign-in'
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
             
                /*
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email}
                });
                */

                const existingUser: any = db.select().from(Users)
                .where(eq(Users.email, credentials?.email))


                console.log(existingUser)
                if(!existingUser[0]){
                    throw new Error('User not exists')
                }

               
                return existingUser
            }
          })      
    ],
    
}