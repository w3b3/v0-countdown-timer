"use client"

import { useState, useEffect } from "react"
import { Clock, Calendar, Star } from "lucide-react"

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const targetDate = new Date("2025-08-16T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-yellow-400 mr-2" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">Algo Incrível</h1>
            <Star className="h-8 w-8 text-yellow-400 ml-2" />
          </div>
          <p className="text-xl md:text-2xl text-purple-200 mb-2">está chegando</p>
          <div className="flex items-center justify-center text-purple-300">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">Sábado, 16 de Agosto de 2025</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-8 border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-6 w-6 text-purple-300 mr-2" />
            <h2 className="text-2xl font-semibold text-white">Contagem Regressiva</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-purple-300 text-sm md:text-base uppercase tracking-wide">Dias</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-purple-300 text-sm md:text-base uppercase tracking-wide">Horas</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-purple-300 text-sm md:text-base uppercase tracking-wide">Minutos</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-purple-300 text-sm md:text-base uppercase tracking-wide">Segundos</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg md:text-xl text-purple-200 mb-6">
            Prepare-se para algo extraordinário. A espera valerá a pena.
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/5511974007727?text=Oi.%20Estou%20interessado%20em%20acompanhar%20o%20lan%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
