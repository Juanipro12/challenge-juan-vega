'use client'
import { Arrow } from '@/utils/Arrow';
import Image from 'next/image';
import { useState } from 'react';

interface Slide {
  key: string;
  url: string
}

const Slider: React.FC<{ slides: Slide[] }> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prevActiveSlide) => (prevActiveSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prevActiveSlide) => (prevActiveSlide - 1 + slides.length) % slides.length);
  };

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl h-[504px] w-full">
      {slides.map((slide, index) => (
        <div
          key={slide.key}
          className={`absolute top-0 left-0 transition-transform duration-500 w-full h-[90%] ${activeSlide === index ? 'translate-x-0 z-10' : 'translate-x-full'
            }`}
        >
          <Image
            src={slide.url}
            alt={`Image ${index}`}
            className="object-cover w-full h-full rounded-2xl"
            width={34}
            height={24}
          />
        </div>
      ))}
      <div className="absolute -bottom-2 left-0 w-full flex justify-center items-center mb-4">
        <div className='bg-[#4b4b4b66] flex items-center px-[5.5px] py-[8px] rounded-3xl'>

          {slides.length > 1 && (
            <button
              onClick={handlePrevSlide}
            >
              <Arrow />
            </button>
          )}
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`bg-[#9396A5] hover:bg-gray-400 w-1 h-1 rounded-full mx-2 ${activeSlide === index ? 'bg-[#FFFFFF] ' : ''
                }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
          {slides.length > 1 && (
            <button
              className="rotate-180"
              onClick={handleNextSlide}
            >
              <Arrow />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;