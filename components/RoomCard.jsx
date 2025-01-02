import React from 'react'
import Link from 'next/link'
import { Card } from '@mui/material'
import Image from 'next/image'


const RoomCard = ({room}) => {
  const bucketId=process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId=process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl=`https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc=room.image ? imageUrl:'/image/no-image.jpg';


  return (
   <>
  
   
      <Card
        className=" shadow rounded-lg p-6 mt-4  flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg hover:scale-100  "
      >
        <div className=" max-w-[550px] max-h-[550px] justify-between  flex flex-col sm:flex-row sm:space-x-4">
          <Image
            src={imageSrc}
            width={400}
            height={100}
            alt={room.name}
            className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
          />
          <div className="space-y-2  truncate w-48 py-2 ">
            <h4 className="text-lg font-semibold">{room.name}</h4>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800"> Address:</span> {room.address}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800"> Availability:</span>
              {room.availability}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800"> Price:</span>
              ${room.price_per_hour}/hour
            </p>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
        >
          <Link
            href={`/rooms/${room.$id}`}
            className="bg-custom-darkpink text-custom-lightpink px-4 py-2  mt-4 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:scale-105"
            >View Room </Link>
        </div>
      </Card>

   </>
  )
}

export default RoomCard
