import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {


  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* AI Symptom Checker Button */}
      <Link
        to='/ai-symptom-checker'>
      <button
       onClick={() => setTimeout(() => scrollTo(0, 0), 10)}
        className='mt-2 px-6 py-2 cursor-pointer rounded-full bg-primary text-white text-sm hover:opacity-90 transition-all duration-300'
      >
        Try AI Symptom Checker
      </button>
        </Link>

      {/* Speciality scroll list */}
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto'>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => setTimeout(() => scrollTo(0, 0), 10)}
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
