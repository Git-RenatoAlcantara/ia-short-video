"use server"

import { db } from "@/configs/db"
import { Users } from "@/configs/schema"
import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt'


export async function getUserFromDb(email: string, password: string){
try {
    const existedUser = await db.query.Users.findFirst({
    where: eq(Users.email, email)
    })

   
    if(!existedUser){
        return {
            success: false,
            message: "User not found."
        }
    }

    //const hashedPassword = await bcrypt.hash(password, 12)


    
    /*
    const passwordMatch = await bcrypt.compare(
        existedUser.password, 
        password
    );
    */

    const passwordMatch = existedUser.password === password

    if(!passwordMatch){    
        return {
            success: false,
            message: "Password incorrect"
        }
    }

 

    return {
        success: true,
        data: existedUser
    }


} catch (err: any) {
    return {
        success: false,
        message: err.message
    }
}
}