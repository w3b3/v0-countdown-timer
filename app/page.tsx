"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Linkedin, Github, MessageCircle, Mail } from "lucide-react"

export default function CountdownPage() {
  const [mounted, setMounted] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [captchaQuestion, setCaptchaQuestion] = useState("")
  const [captchaAnswer, setCaptchaAnswer] = useState(0)
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState("")
  const [emailResult, setEmailResult] = useState("")
  const [liquidHeight, setLiquidHeight] = useState(0)
  const [overflowActive, setOverflowActive] = useState(false)
  const [countdownText, setCountdownText] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Visual Countdown Timer
  useEffect(() => {
    if (!mounted) return

    const updateVisualCountdown = () => {
      const now = new Date()
      const nextSunday = new Date()

      // Find next Sunday
      const daysUntilSunday = (7 - now.getDay()) % 7
      if (daysUntilSunday === 0 && now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        nextSunday.setDate(now.getDate() + 7)
      } else if (daysUntilSunday === 0) {
        nextSunday.setDate(now.getDate() + 7)
      } else {
        nextSunday.setDate(now.getDate() + daysUntilSunday)
      }

      nextSunday.setHours(0, 0, 0, 0)

      const timeLeft = nextSunday.getTime() - now.getTime()
      const totalWeekTime = 7 * 24 * 60 * 60 * 1000
      const timeElapsed = totalWeekTime - timeLeft
      const progress = Math.min(timeElapsed / totalWeekTime, 1)

      // Update background liquid height
      const newLiquidHeight = Math.max(0, Math.min(100, progress * 100))
      setLiquidHeight(newLiquidHeight)

      // Update countdown info
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      // Handle overflow when Sunday arrives
      if (timeLeft <= 0) {
        setOverflowActive(true)
        setCountdownText("🎉 Sunday overflow!")
        setLiquidHeight(100)
      } else if (progress > 0.95) {
        setCountdownText(`Almost overflowing... ${hours}h remaining`)
      } else if (days > 0) {
        setCountdownText(`${Math.round(progress * 100)}% filled • ${days} day${days !== 1 ? 's' : ''} until Sunday`)
      } else {
        setCountdownText(`${Math.round(progress * 100)}% filled • ${hours}h until Sunday`)
      }
    }

    updateVisualCountdown()
    const interval = setInterval(updateVisualCountdown, 1000)

    return () => clearInterval(interval)
  }, [mounted])

  // Email Modal Functions
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const answer = num1 + num2
    setCaptchaAnswer(answer)
    setCaptchaQuestion(`${num1} + ${num2} =`)
    setUserCaptchaAnswer("")
    setEmailResult("")
  }

  const openEmailModal = () => {
    generateCaptcha()
    setShowEmailModal(true)
  }

  const closeEmailModal = () => {
    setShowEmailModal(false)
    setUserCaptchaAnswer("")
    setEmailResult("")
  }

  const verifyCaptcha = () => {
    const userAnswer = parseInt(userCaptchaAnswer)
    if (userAnswer === captchaAnswer) {
      setEmailResult(`
        <div style="background: rgba(76, 175, 80, 0.1); border: 2px solid #4CAF50; padding: 1rem; border-radius: 10px; margin-top: 1rem; font-weight: 400; color: #2E7D32;">
          ✅ Email verified: <strong>iam@w-b.dev</strong>
          <br><small>Click to copy to clipboard</small>
        </div>
      `)
    } else {
      setEmailResult(`
        <div style="color: #d32f2f; margin-top: 1rem;">
          ❌ Incorrect answer. Please try again.
        </div>
      `)
      generateCaptcha()
    }
  }

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('iam@w-b.dev').then(() => {
        setEmailResult(emailResult + '<br><small style="color: green;">📋 Copied to clipboard!</small>')
      })
    }
  }

  // Handle Enter key for captcha
  const handleCaptchaKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      verifyCaptcha()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 200;
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #c3ec52 75%, #4facfe 100%);
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }

        .background-cup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vmin;
          height: 80vmin;
          z-index: 1;
          opacity: 0.15;
        }

        .cup {
          position: relative;
          width: 100%;
          height: 70%;
          border: 8px solid rgba(255, 255, 255, 0.6);
          border-bottom: 12px solid rgba(255, 255, 255, 0.7);
          border-radius: 0 0 30% 30%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(40px);
          overflow: hidden;
          margin: 0 auto;
        }

        .cup::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          height: 5%;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 20px 20px 0 0;
        }

        .cup-handle {
          position: absolute;
          right: -15%;
          top: 25%;
          width: 12%;
          height: 35%;
          border: 8px solid rgba(255, 255, 255, 0.6);
          border-left: none;
          border-radius: 0 40px 40px 0;
          background: transparent;
        }

        .liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%);
          background-size: 300% 300%;
          animation: liquidShimmer 4s ease-in-out infinite;
          transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 0 25% 25%;
          height: ${liquidHeight}%;
        }

        .liquid::before {
          content: '';
          position: absolute;
          top: -3%;
          left: 0;
          right: 0;
          height: 6%;
          background: radial-gradient(ellipse 100% 50% at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: wave 3s ease-in-out infinite;
        }

        .overflow {
          position: absolute;
          top: -3%;
          left: -5%;
          right: -5%;
          height: 8%;
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%);
          background-size: 300% 300%;
          animation: liquidShimmer 4s ease-in-out infinite;
          border-radius: 50px;
          opacity: 0;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .overflow.active {
          opacity: 0.8;
          transform: scaleY(1);
          animation: liquidShimmer 4s ease-in-out infinite, overflow 1.5s ease-in-out infinite;
        }

        .main-content {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 5vw;
        }

        .name {
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 100;
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 2vh;
          letter-spacing: -0.02em;
          line-height: 0.9;
        }

        .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.8rem);
          font-weight: 200;
          color: rgba(0, 0, 0, 0.6);
          margin-bottom: 4vh;
          max-width: 60ch;
          line-height: 1.4;
        }

        .social-links {
          display: flex;
          gap: 1.5vw;
          margin-bottom: 6vh;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .social-links {
            flex-direction: column;
            gap: 2vw;
            width: 90vw;
          }

          .social-link {
            width: 100%;
            justify-content: center;
          }
        }

        .social-link {
          position: relative;
          padding: 1.2rem 2.5rem;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 400;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }

        .social-link:hover::before {
          left: 100%;
        }

        .linkedin {
          background: linear-gradient(135deg, #0077B5 0%, #005885 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(0, 119, 181, 0.3);
        }

        .linkedin:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 119, 181, 0.4);
        }

        .github {
          background: linear-gradient(135deg, #333 0%, #24292e 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(51, 51, 51, 0.3);
        }

        .github:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(51, 51, 51, 0.4);
        }

        .whatsapp {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }

        .whatsapp:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
        }

        .email {
          background: linear-gradient(135deg, #EA4335 0%, #D33B2C 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(234, 67, 53, 0.3);
          cursor: pointer;
        }

        .email:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(234, 67, 53, 0.4);
        }

        .icon {
          width: 1.2em;
          height: 1.2em;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }


        /* Email Modal */
        .email-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: ${showEmailModal ? 'flex' : 'none'};
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 300;
          color: #333;
          margin-bottom: 1rem;
        }

        .modal-text {
          color: #666;
          margin-bottom: 2rem;
          font-weight: 200;
        }

        .captcha-container {
          margin: 1.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 1.2rem;
          font-weight: 400;
        }

        .captcha-input {
          padding: 0.8rem;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 1.1rem;
          text-align: center;
          width: 80px;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .modal-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .modal-btn {
            width: 100%;
          }
        }

        .modal-btn {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #4285f4;
          color: white;
        }

        .btn-primary:hover {
          background: #3367d6;
        }

        .btn-secondary {
          background: #f8f9fa;
          color: #333;
          border: 1px solid #ddd;
        }

        .btn-secondary:hover {
          background: #e8eaed;
        }

        .countdown-info {
          position: absolute;
          bottom: 3vh;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          font-weight: 200;
          color: rgba(0, 0, 0, 0.5);
          text-align: center;
          z-index: 10;
        }

        @keyframes liquidShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes wave {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          50% { transform: scaleX(1.05) scaleY(0.9); }
        }

        @keyframes overflow {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(0.9) scaleX(1.1); }
        }

        @media (max-width: 768px) {
          .social-links {
            gap: 3vw;
            width: 90vw;
          }

          .social-link {
            width: 100%;
            justify-content: center;
          }

          .main-content {
            padding: 0 8vw;
          }

          .modal-content {
            width: 95%;
            margin: 0 2.5%;
          }
        }

        @media (max-height: 600px) {
          .name {
            margin-bottom: 1vh;
          }

          .subtitle {
            margin-bottom: 2vh;
          }

          .social-links {
            margin-bottom: 3vh;
          }
        }
      `}</style>

      <div className="background-cup">
        <div className="cup">
          <div className="cup-handle"></div>
          <div className="liquid" id="background-liquid"></div>
          <div className={`overflow ${overflowActive ? 'active' : ''}`} id="background-overflow"></div>
        </div>
      </div>

      <main className="main-content">
        <h1 className="name">Daniel Santos</h1>

        <p className="subtitle">Let's connect and chat about life, work, and everything in between</p>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/brasileiro" className="social-link linkedin" target="_blank">
            <Linkedin className="icon" />
            LinkedIn
          </a>
          <a href="https://github.com/w3b3" className="social-link github" target="_blank">
            <Github className="icon" />
            GitHub
          </a>
          <a href="https://wa.me/18199195996" className="social-link whatsapp" target="_blank">
            <MessageCircle className="icon" />
            WhatsApp
          </a>
          <div className="social-link email" onClick={openEmailModal}>
            <Mail className="icon" />
            Email
          </div>
        </div>

      </main>

      <div className="countdown-info" id="countdown-info">
        {countdownText || "Cup filling until Sunday..."}
      </div>

      {/* Email Modal */}
      <div className="email-modal" id="emailModal">
        <div className="modal-content">
          <h3 className="modal-title">Verify you're human</h3>
          <p className="modal-text">Please solve this simple math problem to reveal my email address:</p>

          <div className="captcha-container">
            <span id="captcha-question">{captchaQuestion}</span>
            <input
              type="number"
              className="captcha-input"
              id="captcha-answer"
              value={userCaptchaAnswer}
              onChange={(e) => setUserCaptchaAnswer(e.target.value)}
              onKeyPress={handleCaptchaKeyPress}
              placeholder="?"
            />
          </div>

          <div className="modal-buttons">
            <button className="modal-btn btn-primary" onClick={verifyCaptcha}>Verify</button>
            <button className="modal-btn btn-secondary" onClick={closeEmailModal}>Cancel</button>
          </div>

          <div
            id="email-result"
            dangerouslySetInnerHTML={{ __html: emailResult }}
            onClick={emailResult.includes('iam@w-b.dev') ? copyToClipboard : undefined}
            style={{ cursor: emailResult.includes('iam@w-b.dev') ? 'pointer' : 'default' }}
          />
        </div>
      </div>
    </>
  )
}
