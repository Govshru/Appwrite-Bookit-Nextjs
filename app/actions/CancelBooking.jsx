'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

async function cancelBooking(bookingId) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get user's ID
    const {user} = await checkAuth();
    if(!user){
        return{
            error:'You must be login to cancel the booking'
        }
    }
    //get booking
    const booking=await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        bookingId
    );

    //check if booking belongs to current user
    if(booking.user_id!==user.id){
        return{
            error:'you are not authorized to cancel this booking'
        }
    }

    //delete booking
    await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        bookingId
    );
    return{
        success:true,
    }



    
  } catch (error) {
    console.log('Failed to cancel booking', error);
    return{
        error:'failed to cancel booking'
    }

  }
}

export default cancelBooking;