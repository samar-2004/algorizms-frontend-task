export default function ConfirmDialog({ open, onConfirm, onCancel, title, message }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-white max-w-sm w-full text-center space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-300">{message}</p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg text-sm font-medium"
          >
            ✅ Yes, Book
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white rounded-lg text-sm font-medium"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
