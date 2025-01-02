

"use server";
import { createAdminClient } from "@/config/appwrite";
import { Query } from "node-appwrite";

async function getRooms(offset = 0, limit = 2) {
  try {
    const { databases } = await createAdminClient();
    // Fetch rooms with pagination
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [
        Query.limit(limit), // Limit the number of rooms fetched
        Query.offset(offset), // Set the offset for pagination
      ]
    );

    return rooms;
  } catch (error) {
    console.log("failed to get rooms", error);
    throw error;
  }
}
export default getRooms;
