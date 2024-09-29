'use client'
/*
* [references]
*   - https://www.youtube.com/watch?v=Cm6-3pVCPEI
*/


import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as yup from "yup"
import { FieldValues, SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/hooks/use-toast"
import Input from "@/components/Input";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

const SignForm = () => {

    const router = useRouter()

    const {toast} = useToast()
    /*
    useEffect(() => {

        if (session?.status === "authenticated") {
            router.push("/configure/upload")
        }

    }, [session?.status, router])
    */

    const {
        control,
        handleSubmit,
        register,
        formState: {
            errors
        },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
            .then((callback) => {
                if (callback?.error) {
                    console.log('Invalid credentials')
                    toast({
                        title: "Something went wrong",
                        description: "There was an error on our end. Please try again.",
                        variant: "destructive"
                    })
                }

                if (callback?.ok && !callback?.error) {
                    console.log("Logged in!")
                    toast({
                        title: "Logged in!",
                        description: "Wait a minute.",
                        variant: "default"
                    })
                    router.push('/dashboard')
                }
            })
    }


    return (
        <div
            className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md"
        >
            <div 
                className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10"
            >

                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >

                <Input 
                 id="email" 
                 label="email" 
                 register={register}
                 errors={errors}
                />   

                <Input 
                 id="password" 
                 label="password" 
                 register={register}
                 errors={errors}
                />  

                <button 
                    type="submit"
                    className="
                    bg-gray-900
                    w-full
                    flex
                    text-white
                    justify-center
                    rounded-md
                    px-3
                    py-2
                    font-semibold
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    text-sm
                    "   
                   >
                   Entrar
                </button>
        
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div className="
                                w-full 
                                border-t 
                                border-gray-300" 
                            />
                        </div>
                        <div 
                            className="
                                relative
                                flex
                                justify-center
                                text-sm
                            "
                        >
                            <span
                                className="
                                    bg-white
                                    px-2
                                    text-gray-500
                                "
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>
                  
                </div>
                <div
                    className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >
                  
                </div>
            </div>
        </div>
    )

}


export default SignForm