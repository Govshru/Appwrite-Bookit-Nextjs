import { createAdminClient } from "@/config/appwrite";

const getSliderImages = async () => {
  const { storage } = await createAdminClient();

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  try {
    const response = await storage.listFiles(bucketId);

    const images = response.files.map((file) => {
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file.$id}/view?project=${projectId}`;
      return {
        id: file.$id,
        url: imageUrl,
      };
    });

    return images;
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return [];
  }
};

export default getSliderImages;
