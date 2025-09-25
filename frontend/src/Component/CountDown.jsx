import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const CountDown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        menit: Math.floor((difference / (1000 * 60)) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const items = [
    { label: "Hari", value: timeLeft.hari || 0 },
    { label: "Jam", value: timeLeft.jam || 0 },
    { label: "Menit", value: timeLeft.menit || 0 },
  ]

  return (
    <div className="flex gap-5 justify-end items-center mt-6">
      {items.map((item, index) => (
        <Card
          key={index}
          className="w-20 h-20 flex flex-col items-center justify-center bg-black/50 text-white backdrop-blur-md border border-white/20 rounded-none"
        >
          <CardContent className="flex flex-col items-center justify-center p-2">
            <span className="text-xl font-bold">{item.value}</span>
            <span className="text-xs">{item.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CountDown
