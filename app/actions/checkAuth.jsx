'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function checkAuth(){

    const sessionCookies=  cookies().get ('appwrite-session');

    if (!sessionCookies){
        return {
            isAuthenticated:false
        }
    }
    try{
        const {account}=await createSessionClient(sessionCookies.value);
        const user= await account.get();
        return{
            isAuthenticated:true,
            user:{
                id:user.$id,
                name:user.name,
                email:user.email
            }
        }

    }catch(error){

    return{
        isAuthenticated:false,
    }
    }

}

export default checkAuth;