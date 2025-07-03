import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* --------- Header Left --------- */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center text-center md:text-left">
        <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold leading-snug sm:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-white text-sm font-light">
          <img className="w-24 sm:w-28" src={assets.group_profiles} alt="group" />
          <p className="max-w-xs sm:max-w-md">
            Simply browse through our extensive list of trusted doctors,{' '}
            <br className="hidden sm:inline" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center justify-center md:justify-start gap-2 bg-white px-6 py-3 rounded-full text-[#595959] text-sm font-medium hover:scale-105 transition-all duration-300 w-fit mx-auto md:mx-0"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 relative flex items-end justify-center">
        <img
          className="w-full max-w-md md:max-w-none md:w-full h-auto object-contain rounded-lg"
          src={assets.header_img}
          alt="doctor"
        />
      </div>
    </div>
  )
}

export default Header
