import Heading from '@/components/Heading';
import BookedRoomCard from '@/components/BookedRoomCard';

import getMyBookings from '../actions/getMyBookings';

const BookingsPage = async () => {
  const bookings = await getMyBookings( );
  
  console.log(bookings);

  return (
    <>
    <div>
      <Heading title='My Bookings' />
      {bookings.length === 0 ? (
        <p className='text-gray-600 mt-4'>You have no bookings</p>
      ) : (
       bookings.map((booking)=><BookedRoomCard key={booking.$id} booking={booking}/>)
)
      }
      </div>
    </>
  );
};

export default BookingsPage;
