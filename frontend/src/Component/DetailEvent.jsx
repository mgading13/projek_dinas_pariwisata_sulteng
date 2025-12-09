"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";

import CountDown from "./CountDown";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailEvent() {
  const { id } = useParams(); // Ambil ID dari URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data event dari backend
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/atraksi/${id}`)
      .then((res) => {
        setEvent(res.data.event);
        console.log("EVENT DATA:", res.data.event);
        // console.log("Startdate dari API:", res.data.event.startdate);
        // console.log(
        //   "Parsed date:",
        //   new Date(Date.parse(res.data.event.startdate))
        // );

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading event:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-col gap-6 p-10">
          <Skeleton className="w-full h-[350px]" />
          <Skeleton className="w-full h-[200px]" />
        </div>
      </div>
    );
  }

  const bgImage = `http://localhost:3000${event.foto}`;

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center text-white px-4">
          {/* <Badge className="bg-blue-600 mb-3">Atraksi Wisata</Badge> */}

          <h1 className="text-4xl md:text-5xl font-bold">{event.nameEvent}</h1>

          <p className="mt-3 text-lg">{event.location}</p>

          {event && <CountDown event={event} />}
        </div>
      </section>

      {/* DESKRIPSI SECTION */}
      <section
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center py-16"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <Card className="relative z-10 max-w-3xl bg-white/10 backdrop-blur-lg border-white/20 text-white mx-6">
          <CardContent className="p-8">
            <h2 className="text-3xl font-semibold mb-4">Tentang Atraksi</h2>

            <p className="text-lg leading-relaxed text-justify">
              {event.description}
            </p>

            {/* Tanggal Event */}
            <div className="mt-6">
              <p className="text-gray-300">
                📅{" "}
                {new Date(event.startdate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(event.enddate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
