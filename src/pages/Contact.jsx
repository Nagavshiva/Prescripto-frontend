import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20">

      {/* Title */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16 mb-20 text-sm">
        
        {/* Left - Image */}
        <div className="w-full md:w-1/2 max-w-[500px]">
          <img
            src={assets.contact_image}
            alt="contact"
            className="w-full object-cover rounded-md"
          />
        </div>

        {/* Right - Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-600">

          <div>
            <p className="text-lg font-semibold text-gray-800">OUR OFFICE</p>
            <p className="mt-1 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="leading-relaxed">
              Tel: (415) 555-0132 <br />
              Email: nagavdev@gmail.com
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800">CAREERS AT PRESCRIPTO</p>
            <p className="mt-1 leading-relaxed">
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className="border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 w-fit">
            Explore Jobs
          </button>

        </div>
      </div>
    </div>
  )
}

export default Contact;
