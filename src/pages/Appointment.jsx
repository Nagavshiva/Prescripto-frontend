import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContextCreator'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  console.log("docId", docId)
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
console.log("docInfo", docInfo)
  const navigate = useNavigate()

  console.log("chekc",doctors)
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc.id === Number(docId))
    console.log("info", info)
    setDocInfo(info)
  }

  const getAvailableSolts = () => {
    setDocSlots([])
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`

        const isSlotAvailable =
          !(docInfo.slots_booked[slotDate] || []).includes(formattedTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctosData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSolts()
  }, [docInfo])

  return docInfo ? (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20">

      {/* Doctor Info Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={docInfo.image}
            alt=""
            className="bg-primary rounded-lg w-full max-w-xs md:max-w-sm object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-6 sm:p-8 bg-white">
          <p className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-700">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600 text-sm">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-1 px-3 border rounded-full text-xs">{docInfo.experience}</button>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <p className="font-medium flex items-center gap-1">About
              <img className="w-3" src={assets.info_icon} alt="info" />
            </p>
            <p className="mt-1">{docInfo.about}</p>
          </div>
          <p className="text-sm mt-4 font-medium text-gray-700">
            Appointment fee: <span className="text-gray-900">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-10 text-gray-700">
        <p className="font-medium text-base sm:text-lg">Booking slots</p>

        {/* Dates */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-[60px] text-center py-4 rounded-full cursor-pointer text-sm ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD] text-gray-700'
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlots[slotIndex]?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light px-5 py-2 rounded-full flex-shrink-0 ${
                slotTime === item.time ? 'bg-primary text-white' : 'text-gray-500 border border-[#B4B4B4]'
              }`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 bg-primary cursor-pointer text-white px-8 sm:px-10 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-14">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  ) : null
}

export default Appointment
