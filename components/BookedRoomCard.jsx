import Link from 'next/link';
 import CancelBookingButton from './CancelBookingButton';

const BookedRoomCard = ({ booking }) => {
  const{room_id:room}=booking;
 
const formatDate=(dateString)=>{
  const date =new Date (dateString);
  //month
  const option={month:'short'};
  const month=date.toLocaleString('en-US',option,{timeZone:'UTC'})
  //get day
  const day=date.getUTCDate();


  //format time in UTC 12-hour
  const timeOption={
    hour:'numeric',
    minute:'numeric',
    hour12:true,
    timeZone:'UTC'
  }
  const time=date.toLocaleString('en-US',timeOption)

  //final formated string
  return`${month} ${day} at ${time}`;
}

  return (
    <div
        className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600">
            <strong>Check In:</strong> {formatDate(booking.check_in)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Check Out:</strong> {formatDate(booking.check_out)}
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
        >
          <Link
            href={`/rooms/${room.$id}`}
            className="bg-custom-darkpink text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover  hover:scale-105"
          >
            View Room
          </Link>
          
          <CancelBookingButton bookingId={booking.$id} />
        </div>
        </div>
  );
};

export default BookedRoomCard;