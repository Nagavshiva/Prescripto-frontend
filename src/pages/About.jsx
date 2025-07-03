import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-20">

      {/* Title */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>ABOUT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      {/* About section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 items-center">
        <img
          className="w-full md:w-1/2 max-w-md object-cover rounded"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-1/2">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl my-6 text-center md:text-left">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <div className="border px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 rounded cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 rounded cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-8 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 rounded cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About;
