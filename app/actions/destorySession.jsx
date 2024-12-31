

'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destorySession(){
    //Retrive the session cookies

    const  sessionCookies=cookies().get('appwrite-session');


    if(!sessionCookies){
        return{
            error:'No session cookies found'
        }
    }
    
        try{

            const {account}=await createSessionClient(sessionCookies.value);
            //Delete session
            await account.deleteSession('current');

            //clear session cookies 
            cookies().delete('appwrite-session');
            return{
                success:true,
            }

        }catch(error){

        
        return {
            error:"Error deleting session",
        }

    }

    return{
        success:true,
    };
    
    

}

export default destorySession;
