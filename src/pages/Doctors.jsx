import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContextCreator';
import { useNavigate, useParams } from 'react-router-dom';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const { doctors, loadingDoctors } = useContext(AppContext);

  const applyFilter = () => {
    if (!speciality || speciality === 'All') {
      setFilterDoc(doctors);
    } else {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'All',
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className='px-4 sm:px-8 md:px-12 lg:px-20 py-6'>
      <p className='text-gray-600 mb-4'>Browse through the doctors specialist.</p>

      {/* Filters Section */}
      <div className='flex flex-col gap-3'>
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden w-fit ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
        >
          Filters
        </button>

        {/* Filter List */}
        <div
          className={`w-full flex gap-3 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          } overflow-x-auto flex-nowrap whitespace-nowrap px-1 py-2`}
        >
          {specialities.map((item, i) => (
            <p
              key={i}
              onClick={() =>
                item === 'All' ? navigate('/doctors') : navigate(`/doctors/${item}`)
              }
              className={`flex-shrink-0 px-4 py-2 border border-gray-300 rounded cursor-pointer transition-all ${
                (!speciality && item === 'All') || speciality === item
                  ? 'bg-[#E2E5FF] text-black font-medium'
                  : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 mt-6'>
        {loadingDoctors
          ? Array(6).fill(null).map((_, index) => (
              <div
                key={index}
                className='animate-pulse border border-[#C9D8FF] rounded-xl overflow-hidden bg-white'
              >
                <div className='bg-gray-200 w-full h-60'></div>
                <div className='p-4 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-gray-300'></div>
                    <div className='h-3 bg-gray-300 rounded w-20'></div>
                  </div>
                  <div className='h-4 bg-gray-300 rounded w-32'></div>
                  <div className='h-3 bg-gray-200 rounded w-24'></div>
                </div>
              </div>
            ))
          : filterDoc.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item.id}`);
                  scrollTo(0, 0);
                }}
                className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}
              >
                <img className='bg-[#EAEFFF] w-full h-60 object-cover' src={item.image} alt="" />
                <div className='p-4'>
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
                  <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                  <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Doctors;
