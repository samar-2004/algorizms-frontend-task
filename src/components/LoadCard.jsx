import { useState } from 'react'
import { MapPin, Truck, CalendarDays, Weight, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ConfirmDialog from './ConfirmDialog' 

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}

export default function LoadCard({ load }) {
  const [booked, setBooked] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleConfirm = () => {
    toast.success(`Load from ${load.origin} ➜ ${load.destination} booked!`)
    setBooked(true)
    setShowConfirm(false)
  }

  return (
    <div className="relative bg-gray-900 dark:bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-2xl shadow-lg px-6 py-7 transition-all duration-300 group overflow-hidden space-y-4">

      {booked && (
        <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 z-10 shadow">
          <CheckCircle className="w-4 h-4" />
        </div>
      )}

      <div className="flex flex-wrap items-center text-blue-400 text-lg md:text-xl font-semibold gap-2 relative z-10">
        <MapPin className="w-5 h-5" />
        {load.origin}
        <span className="text-gray-400">➜</span>
        {load.destination}
      </div>

      <hr className="border-gray-700" />

      <div className="grid grid-cols-1 gap-3 text-sm md:text-base text-gray-300 relative z-10">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400">Cargo:</span>
          <span className="text-white font-medium">{load.cargoType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Weight className="w-4 h-4 text-green-400" />
          <span className="text-gray-400">Weight:</span>
          <span className="text-white font-medium">{load.weight}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-400">Pickup:</span>
          <span className="text-white">{formatDate(load.date)}</span>
        </div>
      </div>

      <div className="relative z-10">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={booked}
          className={`w-full mt-4 py-2.5 px-4 font-semibold rounded-xl shadow-md transition-all ${
            booked
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
        >
          {booked ? 'Load Booked' : 'Book Load'}
        </button>
      </div>

      {/* ✅ Reusable Confirmation Modal */}
      <ConfirmDialog
        open={showConfirm && !booked}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        title="Confirm Booking"
        message={`Are you sure you want to book the load from ${load.origin} to ${load.destination}?`}
      />
    </div>
  )
}
