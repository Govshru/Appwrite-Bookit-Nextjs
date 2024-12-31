"use server";
import { createSessionClient } from "@/config/appwrite";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

async function deleteRoom(roomId) {
  const sessionCookies = cookies().get("appwrite-session");
  if (!sessionCookies) {
    redirect("/");
  }
  try {
    const { account, databases } = await createSessionClient(
      sessionCookies.value
    );

    //Get user ID

    const user = await account.get();
    const userId = user.$id;

    //fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS[
        Query.equal("user_id", userId)
      ]
    );
    //Find room to delete
    const roomToDelete=rooms.find((room)=>room.$id===roomId);

    //delete room
    if(roomToDelete){
        await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,

      roomToDelete.$id
        );
        return{
            success:true
        }

    }else{
        return{
            error:'Rooms Not found'
        }
    }

    

  
  } catch (error) {
    console.log("failed to delete Rooms", error);
    return{
        error:"Failed to delete"
    }
    
  }
}
export default deleteRoom;
