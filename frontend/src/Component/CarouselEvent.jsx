'use client'

import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CarouselEvent () {
  const [slides, setSlides] = useState([])
  const [expanded, setExpanded] = useState({})
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 }
  })

  // ✅ Ambil data dari backend (sekali)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/atraksi/get')
        console.log('📦 Data dari backend:', res.data)
        // Jika backend return { data: [...] }
        setSlides(res.data.data || res.data)
      } catch (err) {
        console.error('Gagal fetch data event:', err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!slider) return
    const interval = setInterval(() => {
      slider.current?.next()
    }, 7000)
    return () => clearInterval(interval)
  }, [slider])

  const truncateText = (text, maxWords = 15) => {
    if (!text) return ''
    const words = text.split(' ')
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : text
  }

  const handleImageError = e => {
    e.target.src = '/fallback.jpg'
    console.warn('Gambar gagal dimuat, pakai fallback.')
  }

  return (
    <div className='relative w-full h-[100vh] overflow-hidden'>
      {slides.length > 0 ? (
        <div ref={sliderRef} className='keen-slider w-full h-full'>
          {slides.map(slide => {
            const isExpanded = expanded[slide.id] || false
            return (
              <div
                key={slide.id}
                className='keen-slider__slide relative flex items-center justify-end px-25'
              >
                <img
                  src={
                    slide.foto
                      ? `http://localhost:3000${slide.foto}`
                      : '/fallback.jpg'
                  }
                  onError={handleImageError}
                  alt={slide.nameEvent}
                  className='absolute inset-0 w-full h-full object-cover'
                />

                {/* Overlay */}
                <div className='absolute inset-0 bg-black/40'></div>

                {/* Konten */}
                <div className='relative z-10 max-w-2xl text-white p-6'>
                  <h1 className='text-sm uppercase tracking-wider text-blue-200'>
                    Wisata Unggulan
                  </h1>
                  <h2 className='text-4xl font-bold mb-2'>{slide.nameEvent}</h2>
                  {slide.location && (
                    <h3 className='text-lg text-blue-200 mb-4'>
                      {slide.location}
                    </h3>
                  )}
                  {slide.startdate && slide.enddate && (
                    <p className='text-sm text-gray-300 mb-2'>
                      📅{' '}
                      {new Date(slide.startdate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}{' '}
                      -{' '}
                      {new Date(slide.enddate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  )}

                  <p className='mb-4 text-justify'>
                    {isExpanded
                      ? slide.description
                      : truncateText(slide.description)}
                  </p>

                  <button
                    className='text-blue-300 hover:underline mb-6'
                    onClick={() =>
                      setExpanded(prev => ({
                        ...prev,
                        [slide.id]: !isExpanded
                      }))
                    }
                  >
                    {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
                  </button>

                  <div>
                    <Link to={`/event/${slide.id}`}>
                      <Button
                        variant='outline'
                        className='bg-gray-50/20 hover:bg-gray-50/30'
                      >
                        Info Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='flex items-center justify-center h-full text-gray-400'>
          Memuat data wisata...
        </div>
      )}

      {/* Tombol navigasi */}
      <button
        onClick={() => slider.current?.prev()}
        className='absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>
      <button
        onClick={() => slider.current?.next()}
        className='absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white'
      >
        <ChevronRight className='w-6 h-6' />
      </button>
    </div>
  )
}
