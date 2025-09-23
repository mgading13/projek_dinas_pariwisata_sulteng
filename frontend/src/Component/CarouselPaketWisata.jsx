import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import LukPanenteng from "../assets/SiDewi/LukPanenteng.png"

export default function DestinasiCarousel() {
  const destinasi = [
    {
      id: 1,
      title: "LUK PANENTENG",
      img: LukPanenteng,
      durasi: "3 Hari",
      harga: "Rp. 400.000/pax",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis magna a tempus porta.",
    },
    {
      id: 2,
      title: "Destinasi Lain",
      img: "https://picsum.photos/400/300?random=2",
      durasi: "2 Hari",
      harga: "Rp. 250.000/pax",
      deskripsi:
        "Curabitur pretium viverra dolor et lobortis odio faucibus ac. Pellentesque ut dui mauris.",
    },
  ]

  return (
    <div className="p-10 flex items-center justify-center">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {destinasi.map((item) => (
            <CarouselItem key={item.id}>
              <Card className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg p-0 h-[400px]">
                {/* Gambar kiri */}
                <div className="md:w-1/3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Konten kanan */}
                <CardContent className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p className="mt-2 text-gray-600">{item.durasi}</p>
                    <p className="mt-4 text-sm text-gray-500">
                      {item.deskripsi}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm">
                      Mulai dari: <span className="font-bold">{item.harga}</span>
                    </p>
                    <button className="text-sm font-thin mt-3 bg-green-500 text-white px-5 py-3 rounded-sm hover:bg-green-600">
                      LEBIH LANJUT
                    </button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
