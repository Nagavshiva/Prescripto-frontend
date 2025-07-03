import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContextCreator';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelatedDoctors(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl sm:text-3xl font-medium">Related Doctors</h2>
      <p className="sm:w-1/3 text-center text-sm text-[#4a4a4a]">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Horizontal scrollable doctor cards */}
      <div className="w-full overflow-x-auto pt-5">
        <div className="flex gap-4 px-1 sm:px-0" style={{ minWidth: 'max-content' }}>
          {relatedDoctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              className="min-w-[250px] max-w-[250px] border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 bg-white shadow-sm"
            >
              <img
                className="bg-[#EAEFFF] w-full h-44 object-cover"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    doctor.available ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      doctor.available ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  ></span>
                  <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-lg font-medium">{doctor.name}</p>
                <p className="text-sm text-[#5C5C5C]">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedDoctors;
