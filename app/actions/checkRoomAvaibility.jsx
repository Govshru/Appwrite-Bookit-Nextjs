'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

//Convert a date string to luxon dateTime object in UTC
function toUTCDateTime(dateString){
    return DateTime.fromISO(dateString,{zone:'utc'}).toUTC();

}

//check for overlapping date ranges 
function dateRangesOverlap(checkInA,checkOutA,checkInB,checkOutB){
    return checkInA <checkOutB && checkOutA>checkInB;


}



async function CheckRoomAvaibility(roomId,checkIn,checkOut) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const {  databases } = await createSessionClient(
      sessionCookie.value
    );


    const checkInDateTime=toUTCDateTime(checkIn);
    const checkOutDateTime=toUTCDateTime(checkOut)
    //fetch all booking for a given room
    const { documents: bookings } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        [Query.equal('room_id', roomId)]
      );

      //loop over bookingsand check for overlaps
      for(const booking of bookings){
        const bookingCheckInDateTime=toUTCDateTime(booking.check_in);
        const bookingCheckOutDateTime=toUTCDateTime(booking.check_out);
        if(dateRangesOverlap(
            checkInDateTime,
            checkOutDateTime,
            bookingCheckInDateTime,
            bookingCheckOutDateTime
        )){
           return false;//overlap found ,do not book 
        }

      }

    //no overlap found ,continue to book
    return true;
  } catch (error) {
    console.log('Failed to check avaibility', error);
    return{
        error:'Failed to check avaibility'
    }

  }
}

export default CheckRoomAvaibility;