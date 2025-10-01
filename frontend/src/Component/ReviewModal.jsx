import React, { useState } from "react";
import { Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-sm font-semibold mb-4">Popup</h2>

        {/* Input Nama */}
        <input
          type="text"
          placeholder="Nama"
          className="w-full border rounded px-3 py-2 mb-4 text-sm"
        />

        {/* Input Ulasan */}
        <textarea
          placeholder="Ulasan"
          className="w-full border rounded px-3 py-2 mb-4 text-sm h-28 resize-none"
        />

        {/* Rating Bintang */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={24}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Tombol Kirim */}
        <button
          className="border px-4 py-1 rounded text-sm hover:bg-gray-100"
          onClick={onClose}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
