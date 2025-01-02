"use client";

import React, { useState, useEffect } from "react";
import getSliderImages from "@/app/actions/getSliderImage";
import Image from "next/image";

const AutoImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Appwrite on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const sliderImages = await getSliderImages();
      setImages(sliderImages);
    };
    fetchImages();
  }, []);

  // Automatically change the image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images]);

  if (images.length === 0) {
    return <p>Loading slider...</p>; // Show loading state if no images
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Image Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Slide images one by one
      >
        {images.map((image) => (
          <div key={image.id} className="flex-shrink-0 w-full h-[400px]">
            <Image
              src={image.url}
              alt={`Slide ${image.id}`}
              width={1000} 
              height={1500} 
              className="w-full h-full object-cover" // Ensure the image covers the container
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoImageSlider;
