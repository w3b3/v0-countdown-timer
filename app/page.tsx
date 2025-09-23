"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock, Calendar, Star, Heart, Zap, Sparkles, Sun, Moon, Coffee, Home, Utensils } from "lucide-react"

interface TimeOfDay {
  period: string
  colors: string
  icon: React.ReactNode
  emoji: string
  message: string
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [mounted, setMounted] = useState(false)
  const [isSunday, setIsSunday] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>(
    [],
  )

  // Fun URL parameter check
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check for secret URL parameters
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const secretParams = [
        "domingo",
        "party",
        "unlock",
        "sunday",
        "festa",
        "diversao",
        "magic",
        "secret",
        "tatame",
        "especial",
        "vip",
      ]

      const hasSecret = secretParams.some(
        (param) =>
          urlParams.has(param) ||
          urlParams.get(param) === "true" ||
          urlParams.get(param) === "sunday" ||
          urlParams.get(param) === "domingo",
      )

      setSecretUnlocked(hasSecret)
    }

    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"][
        Math.floor(Math.random() * 7)
      ],
      delay: Math.random() * 3,
    }))
    setConfetti(particles)
  }, [])

  useEffect(() => {
    const updateTimeAndCountdown = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.

      // Determine time of day
      let currentTimeOfDay: TimeOfDay

      if (currentHour >= 0 && currentHour < 5) {
        // Late night / Very early morning
        currentTimeOfDay = {
          period: "madrugada",
          colors: "from-indigo-900 via-purple-900 to-slate-900",
          icon: <Moon className="h-6 w-6 text-blue-200" />,
          emoji: "🌙",
          message: "Noite silenciosa",
        }
      } else if (currentHour >= 5 && currentHour < 8) {
        // Dawn / Early morning
        currentTimeOfDay = {
          period: "amanhecer",
          colors: "from-orange-300 via-pink-400 to-purple-500",
          icon: <Sun className="h-6 w-6 text-orange-300" />,
          emoji: "🌅",
          message: "Novo dia nascendo",
        }
      } else if (currentHour >= 8 && currentHour < 11) {
        // Morning / Breakfast
        currentTimeOfDay = {
          period: "manhã",
          colors: "from-yellow-300 via-orange-400 to-red-400",
          icon: <Coffee className="h-6 w-6 text-amber-600" />,
          emoji: "☕",
          message: "Hora do café",
        }
      } else if (currentHour >= 11 && currentHour < 14) {
        // Lunch time
        currentTimeOfDay = {
          period: "almoço",
          colors: "from-blue-400 via-cyan-400 to-teal-400",
          icon: <Utensils className="h-6 w-6 text-orange-500" />,
          emoji: "🍽️",
          message: "Hora do almoço",
        }
      } else if (currentHour >= 14 && currentHour < 17) {
        // Afternoon
        currentTimeOfDay = {
          period: "tarde",
          colors: "from-amber-400 via-orange-500 to-red-500",
          icon: <Sun className="h-6 w-6 text-yellow-500" />,
          emoji: "☀️",
          message: "Tarde ensolarada",
        }
      } else if (currentHour >= 17 && currentHour < 20) {
        // Evening / Going home
        currentTimeOfDay = {
          period: "entardecer",
          colors: "from-orange-500 via-red-500 to-purple-600",
          icon: <Home className="h-6 w-6 text-orange-400" />,
          emoji: "🏠",
          message: "Voltando pra casa",
        }
      } else if (currentHour >= 20 && currentHour < 23) {
        // Night / Dinner
        currentTimeOfDay = {
          period: "noite",
          colors: "from-purple-600 via-indigo-700 to-slate-800",
          icon: <Utensils className="h-6 w-6 text-purple-300" />,
          emoji: "🌆",
          message: "Noite aconchegante",
        }
      } else {
        // Late night / Bedtime
        currentTimeOfDay = {
          period: "hora de dormir",
          colors: "from-slate-800 via-gray-900 to-black",
          icon: <Moon className="h-6 w-6 text-gray-300" />,
          emoji: "😴",
          message: "Hora de descansar",
        }
      }

      setTimeOfDay(currentTimeOfDay)

      // Check if it's Sunday OR secret is unlocked
      if (currentDay === 0 || secretUnlocked) {
        setIsSunday(true)
        return
      }

      setIsSunday(false)

      // Calculate next Sunday at 00:00
      const daysUntilSunday = 7 - currentDay
      const nextSunday = new Date(now)
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(0, 0, 0, 0)

      const difference = nextSunday.getTime() - now.getTime()

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

    updateTimeAndCountdown()
    const interval = setInterval(updateTimeAndCountdown, 1000)

    return () => clearInterval(interval)
  }, [secretUnlocked])

  if (!mounted) {
    return null
  }

  // Sunday Special Page (or Secret Unlocked)
  if (isSunday) {
    const sundayColors = timeOfDay
      ? `from-cyan-300 via-pink-300 to-yellow-300`
      : "from-cyan-300 via-pink-300 to-yellow-300"

    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${sundayColors} relative overflow-hidden`}
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        {/* Time of Day Indicator - Floating */}
        {timeOfDay && (
          <div className="fixed top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-800">
            <span className="text-lg">{timeOfDay.emoji}</span>
            <span>{timeOfDay.message}</span>
          </div>
        )}

        {/* Secret Unlock Indicator */}
        {secretUnlocked && (
          <div className="fixed top-4 left-4 z-10 bg-yellow-400/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-800 animate-pulse">
            <span className="text-lg">🔓</span>
            <span>Modo Secreto Ativado!</span>
          </div>
        )}

        {/* Confetti Animation */}
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full animate-bounce"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: "2s",
            }}
          />
        ))}

        {/* Windows 95 Style Container */}
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-300 border-4 border-t-white border-l-white border-r-gray-600 border-b-gray-600 p-8 max-w-4xl mx-auto shadow-2xl">
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 mb-6 flex items-center justify-between border-2 border-t-blue-400 border-l-blue-400 border-r-blue-900 border-b-blue-900">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 border border-red-700"></div>
                <span className="font-bold text-sm">
                  DOMINGO.EXE - A vida é curta! {secretUnlocked && "🔓 MODO SECRETO"}
                </span>
              </div>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">
                  _
                </div>
                <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">
                  □
                </div>
                <div className="w-4 h-4 bg-red-500 border border-red-700 flex items-center justify-center text-xs text-white">
                  ×
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="h-12 w-12 text-red-500 animate-pulse" />
                <h1 className="text-6xl font-bold text-purple-800 drop-shadow-lg">
                  {secretUnlocked ? "MODO SECRETO!" : "É DOMINGO!"}
                </h1>
                <Sparkles className="h-12 w-12 text-yellow-500 animate-spin" />
              </div>

              <div className="bg-yellow-200 border-4 border-t-yellow-100 border-l-yellow-100 border-r-yellow-400 border-b-yellow-400 p-6 text-left">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  {secretUnlocked ? "VOCÊ DESCOBRIU O SEGREDO!" : "ALERTA IMPORTANTE!"}
                </h2>
                <div className="space-y-3 text-lg text-gray-800">
                  {secretUnlocked ? (
                    <>
                      <p>
                        🎉 <strong>PARABÉNS!</strong> Você encontrou o código secreto!
                      </p>
                      <p>🔍 Pessoas curiosas como você merecem recompensas especiais!</p>
                      <p>🎯 Você pode acessar este modo a qualquer hora com: ?domingo=true</p>
                      <p>🤫 Compartilhe o segredo apenas com pessoas especiais!</p>
                    </>
                  ) : (
                    <>
                      <p>
                        🎉 <strong>PARABÉNS!</strong> Você sobreviveu a mais uma semana!
                      </p>
                      <p>⏰ A vida é MUITO curta para desperdiçar tempo esperando...</p>
                      <p>🔄 As coisas mudam TODOS OS DIAS (inclusive este site!)</p>
                      <p>💫 Aproveite este domingo como se fosse o último!</p>
                      <p>🚀 Amanhã tudo recomeça... mas hoje é SEU!</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-100 border-4 border-t-blue-50 border-l-blue-50 border-r-blue-300 border-b-blue-300 p-4">
                <p className="text-xl text-blue-800 font-bold">
                  🎯 MISSÃO: {secretUnlocked ? "Espalhar a magia!" : "Fazer algo que te faça sorrir!"}
                </p>
              </div>

              {/* Retro Button */}
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/5511974007727?text=${encodeURIComponent(
                    secretUnlocked
                      ? "Oi! Descobri o modo secreto do site! 🔓✨ Como faço para saber mais?"
                      : "Oi! Adorei o domingo especial do site! 🎉",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-300 border-4 border-t-white border-l-white border-r-gray-600 border-b-gray-600 px-8 py-4 text-black font-bold text-lg hover:bg-gray-200 active:border-t-gray-600 active:border-l-gray-600 active:border-r-white active:border-b-white transition-all duration-100 flex items-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  {secretUnlocked ? "CONTAR O SEGREDO!" : "COMPARTILHAR A ALEGRIA!"}
                </a>
              </div>

              <div className="text-sm text-gray-600 mt-8">
                <p>
                  💡 Este site muda toda semana...{" "}
                  {secretUnlocked ? "Mas você já sabe o truque! 😉" : "Volte segunda-feira para uma nova surpresa!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular Countdown Page (Monday-Saturday)
  const backgroundGradient = timeOfDay ? timeOfDay.colors : "from-slate-900 via-purple-900 to-slate-900"

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${backgroundGradient} flex items-center justify-center p-4 transition-all duration-1000`}
    >
      {/* Time of Day Indicator - Floating */}
      {timeOfDay && (
        <div className="fixed top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/80">
          {timeOfDay.icon}
          <span>{timeOfDay.message}</span>
        </div>
      )}

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
            <span className="text-lg">Próximo Domingo</span>
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
