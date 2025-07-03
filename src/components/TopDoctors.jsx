import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContextCreator'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="marquee-container mt-6">
        <div className="marquee-content gap-6 px-3">
          {[...doctors, ...doctors].slice(0, 20).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item.id}`)
                scrollTo(0, 0)
              }}
              className="w-60 flex-shrink-0 border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 bg-white"
            >
              <img
                className="bg-[#EAEFFF] w-full h-52 object-cover"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  ></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">{item.name}</p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          navigate('/doctors')
           setTimeout(() => scrollTo(0, 0), 10)
        }}
        className="bg-[#EAEFFF] cursor-pointer text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  )
}

export default TopDoctors
