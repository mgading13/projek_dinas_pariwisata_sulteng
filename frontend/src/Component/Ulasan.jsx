import React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Arya",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu mi, fermentum at nisl vel, lobortis facilisis sapien.",
    rating: 5,
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Gading",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu mi, fermentum at nisl vel, lobortis facilisis sapien.",
    rating: 2,
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Anonim",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu mi, fermentum at nisl vel, lobortis facilisis sapien.",
    rating: 4,
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Sinta",
    text: "Phasellus arcu mi, fermentum at nisl vel, lobortis facilisis sapien. Donec sagittis pretium erat, vel venenatis augue fermentum eget.",
    rating: 3,
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Bima",
    text: "Donec sagittis pretium erat, vel venenatis augue fermentum eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 5,
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Rina",
    text: "Sed a augue vel justo pharetra commodo. Morbi nec orci in augue vestibulum aliquam non nec tortor.",
    rating: 4,
    avatar: "https://via.placeholder.com/50",
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="w-full bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Ulasan</h2>
        <button className="text-blue-500 hover:underline">+ Tambah Ulasan</button>
      </div>

      <div className="flex justify-between items-start gap-6">
        {/* Gambar di kiri */}
        <div className="w-64 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Boat"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Carousel rapat ke kanan */}
        <div className="flex-1 flex justify-end">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between">
                    <p className="text-sm text-gray-700 mb-4">{item.text}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < item.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
