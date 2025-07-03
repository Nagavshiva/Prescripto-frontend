import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-10 mx-4 md:mx-10">
      {/* ------- Left Side ------- */}
      <div className="flex-1 py-10 md:py-16 lg:py-24 text-center md:text-left">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
          setTimeout(() => scrollTo(0, 0), 10)
          }}
          className="bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>

      {/* ------- Right Side ------- */}
      <div className="flex justify-center md:justify-end mt-10 md:mt-0 md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-60 sm:w-72 md:w-80 lg:w-[370px] object-contain"
          src={assets.appointment_img}
          alt="appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
