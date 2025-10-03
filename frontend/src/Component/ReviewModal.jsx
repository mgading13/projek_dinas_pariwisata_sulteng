import React, { useState } from "react";
import { Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Ulasan</h2>
        {/* Input Nama */}
        <input
          type="text"
          placeholder="Nama"
          className="w-full font-semibold border-2 rounded px-3 py-2 mb-4 text-sm"
        />

        {/* Input Ulasan */}
        <textarea
          placeholder="Ulasan"
          className="w-full font-semibold border rounded px-3 py-2 mb-4 text-sm h-35 resize-none"
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
          className="border-3 font-semibold px-4 py-1 rounded text-sm border-blue-600 text-black hover:bg-blue-600 hover:text-white ml-2 ease-in-out duration-300"
          onClick={onClose}
        >
          Kirim
        </button>
        <button
          className="border-3 font-semibold px-4 py-1 rounded text-sm border-red-600 text-black hover:bg-red-600 hover:text-white ml-2 ease-in-out duration-300"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
