

'use server';
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function createSession(previousState, formData){
    const email= formData.get ('email');
    const password = formData.get ('password');

    if(!email||!password){
        return{
            error:'Please Fill out  fields',
        }
        
    }
    //Get account instance 

    const {account}=await createAdminClient();

    try{
        //generate a session 
        const session=await account.createEmailPasswordSession(email,password);

        //Create Cookies
         cookies().set('appwrite-session',session.secret,{
            httpOnly:true,

            secure:true,
            samesite:'strict',
            expires:new Date(session.expire),
            path:'/'


         })

         return{
            success:true
         }
       



    }catch(error){

        console.log('Authentication Error:',error)
        return {
            error:"Invaild Credentials"
        }

    }

    return{
        success:true,
    };
    
    

}

export default createSession;
