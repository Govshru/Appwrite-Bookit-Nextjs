"use client";

import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";  
import Heading from "@/components/Heading";    
import getRooms from "../actions/getAllRooms";

export default function rooms() {
  const [rooms, setRooms] = useState([]);  // State to store rooms
  const [loading, setLoading] = useState(false);  // State to track loading status
  const [offset, setOffset] = useState(0);  // Offset for pagination
  const [hasMore, setHasMore] = useState(true);  // To check if more rooms are available

  // Fetch initial rooms
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const initialRooms = await getRooms(offset, 2); // Initially load 5 rooms
        setRooms(initialRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);  // Empty dependency array means it runs once when the component mounts

  // Handle Load More functionality
  const loadMoreRooms = async () => {
    if (loading) return;  // Prevent multiple clicks if loading is in progress
    setLoading(true);
    try {
      const newRooms = await getRooms(offset, 2);  // Load more rooms (next 5)
      if (newRooms.length === 0) {
        setHasMore(false);  // No more rooms available
      } else {
        setRooms((prevRooms) => [...prevRooms, ...newRooms]);  // Append new rooms to the list
        setOffset((prevOffset) => prevOffset + 2);  // Update offset for next fetch
      }
    } catch (error) {
      console.error("Error loading more rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Heading title="Available Rooms" className="bg-red-200"/>
      <div className="flex flex-wrap space-x-4 space-y-4 justify-start">
      {rooms.length > 0 ? (
        rooms.map((room,index) => <RoomCard room={room} key={`${room.$id}-${index}`} />)  // Display the rooms
      ) : (
        <p>No rooms available at the moment</p>
      )}
      </div>

      {hasMore && !loading && (
        <button onClick={loadMoreRooms} disabled={loading} className="hover:scale-105 mt-4 px-4 py-2 rounded mb-4 bg-custom-darkpink text-custom-lightpink">  {/* Disable button while loading */}
          Load More
        </button>
      )}
      
      {loading && <p>Loading...</p>}
    </div>
  );
}
