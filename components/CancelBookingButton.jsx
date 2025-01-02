
'use client';
import { toast } from "react-toastify";
import cancelBooking from "@/app/actions/CancelBooking";

const CancelBookingButton=({bookingId})=>{
const handleCancelClick=async()=>{
    if(!confirm('Are you sure to want to cancel this booking')){
        return;
    }

    try {
        const result=await cancelBooking(bookingId);
        if(result.success){
            toast.success('Booking cancel successfully')
        }
    } catch (error) {
        console.log('failed to cancel booking')
        return{
            error:'failed to cancel booking'
        }
    }
}
    return(<button
        href onClick={handleCancelClick}
        className="bg-custom-darkpink text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:scale-105"
      >
        Cancel Booking
      </button>);
}
export default CancelBookingButton