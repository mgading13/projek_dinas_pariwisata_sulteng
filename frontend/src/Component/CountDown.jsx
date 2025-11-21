import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const CountDown = ({ event }) => {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
  });

  // Update targetDate ketika event diterima
  useEffect(() => {
    if (event?.startdate) {
      const date = new Date(event.startdate);
      setTargetDate(date);
    }
  }, [event]);

  const calculateTimeLeft = (date) => {
    if (!date) return { hari: 0, jam: 0, menit: 0 };

    const now = new Date();
    const diff = date - now;

    if (diff <= 0) return { hari: 0, jam: 0, menit: 0 };

    return {
      hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
      jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
      menit: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  // Timer update setiap detik
  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center items-center mt-6 w-full">
      {items.map((item, index) => (
        <Card
          key={index}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-black/50 text-white backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-md"
        >
          <CardContent className="flex flex-col items-center justify-center p-0">
            <span className="text-lg sm:text-xl font-bold">{item.value}</span>
            <span className="text-[10px] sm:text-xs">{item.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CountDown;
