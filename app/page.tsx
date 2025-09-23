export default function HomePage() {

    return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Sora', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 300;
          background: radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #fff5f5 35%, #e10600 36%, #b30000 100%);
          background-attachment: fixed;
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }


        .main-content {
          position: relative;
          z-index: 10;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 5vw;
          max-width: 100vw;
          max-height: 100vh;
          overflow: hidden;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4vw;
          margin-bottom: 1vh;
        }


        .name {
          font-size: clamp(3.5rem, 11vw, 7.5rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 2vh;
          line-height: 0.9;
        }

        .subtitle {
          font-size: clamp(1rem, 2.2vw, 1.6rem);
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 4vh;
          max-width: 60ch;
          line-height: 1.4;
        }

        .social-links {
          /* stacked, centered buttons with consistent width */
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 6vh;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          max-width: 420px;
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
          padding: 0.9rem 1.2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 400;
          font-size: 1rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          min-height: 3.6rem;
          width: 100%;
        }

        .social-link span:not(.icon) {
          display: inline-flex;
          align-items: center;
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
          background: linear-gradient(135deg, #005885 0%, #0077B5 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(0, 119, 181, 0.3);
        }

        .linkedin:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 119, 181, 0.4);
        }

        .github {
          background: linear-gradient(135deg, #24292e 0%, #333 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(51, 51, 51, 0.3);
        }

        .github:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(51, 51, 51, 0.4);
        }

        .whatsapp {
          background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }

        .whatsapp:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
        }

        .email {
          background: linear-gradient(135deg, #b30000 0%, #EA4335 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(234, 67, 53, 0.3);
          cursor: pointer;
        }

        .email:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(234, 67, 53, 0.4);
        }

        .icon-wrapper {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255,255,255,0.06);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08) inset;
        }

        .icon {
          width: 1.1rem;
          height: 1.1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .icon svg {
          width: 100%;
          height: 100%;
          stroke-width: 1.5;
          color: white; /* ensure icons contrast on colored backgrounds */
        }

        .featured-projects {
          margin-top: 2vh;
          margin-bottom: 4vh;
          width: 100%;
          max-width: 420px;
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



        @media (max-width: 768px) {
          .social-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2vw;
            width: 90vw;
          }

          .social-links > * {
            min-height: 3.5rem;
          }

          /* LinkedIn & GitHub: smaller side-by-side, left-aligned icon + text */
          .social-links > :nth-child(1),
          .social-links > :nth-child(2) {
            justify-content: flex-start;
            padding: 0.6rem 0.8rem;
            font-size: 0.95rem;
            border-radius: 12px;
          }

          .social-links > :nth-child(1) .icon,
          .social-links > :nth-child(2) .icon {
            margin-left: 1rem;
            margin-right: 0.8rem;
          }

          /* WhatsApp & Email: keep side-by-side (matching LinkedIn/GitHub) */
          .social-links > :nth-child(3),
          .social-links > :nth-child(4) {
            justify-content: flex-start;
            padding: 0.9rem 0.95rem;
            font-size: 0.95rem;
            border-radius: 12px;
          }

          .social-links > :nth-child(3) .icon,
          .social-links > :nth-child(4) .icon {
            margin-left: 1rem;
            margin-right: 0.8rem;
          }

          /* Make background cup more visible on mobile */
          .background-cup {
            opacity: 0.28;
            width: 100vmin;
            height: 60vmin;
            top: 60%;
          }

          .featured-projects {
            width: 90vw;
            max-height: 25vh;
            margin-top: 1vh;
            margin-bottom: 2vh;
          }

          .main-content {
            padding: 0 8vw;
            justify-content: flex-start;
            padding-top: 8vh;
          }

          .modal-content {
            width: 95%;
            margin: 0 2.5%;
          }

          .modal-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .modal-btn {
            width: 100%;
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

      <div className="background-cup" aria-hidden="true">
        <div style={{ fontSize: '4.4rem', marginLeft: '2rem' }} aria-hidden>
          👋🏼
        </div>
      </div>

      <main className="main-content">
        <div className="hero">
          <h1 className="name">Daniel Santos</h1>
        </div>

        <p className="subtitle">Let's connect and chat about life, work, and everything in between</p>

        {/* <FlipCountdown /> */}

          <div className="social-links">
            <a href="https://www.linkedin.com/in/brasileiro" className="social-link linkedin" target="_blank" rel="noreferrer">
              <span className="icon-wrapper"><Linkedin className="icon" /></span>
              <span>LinkedIn</span>
            </a>

            <a href="https://github.com/w3b3" className="social-link github" target="_blank" rel="noreferrer">
              <span className="icon-wrapper"><Github className="icon" /></span>
              <span>GitHub</span>
            </a>

            <a href="https://wa.me/18199195996" className="social-link whatsapp" target="_blank" rel="noreferrer">
              <span className="icon-wrapper">📱</span>
              <span>WhatsApp</span>
            </a>

            <div className="social-link email" onClick={openEmailModal} role="button" tabIndex={0} aria-label="Email">
              <span className="icon-wrapper">✉️</span>
              <span>Email</span>
            </div>
          </div>

            <a href="https://tatame0.com" className="social-link tatame" target="_blank" rel="noreferrer">
              <span className="icon-wrapper">🥋</span>
              <span>
                <strong>Tatame0</strong>
                <div style={{ display: 'block', fontWeight: 200, fontSize: '0.95rem', marginTop: '0.25rem' }}>The best digital platform for Brazilian Jiu-Jitsu gyms!</div>
              </span>
            </a>

            <a href="https://willis-brown.com" className="social-link willis-brown" target="_blank" rel="noreferrer">
              <span className="icon-wrapper">🏢</span>
              <span>
                <strong>Willis Brown</strong>
              </span>
            </a>

      </main>

      

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
              onKeyDown={handleCaptchaKeyDown}
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
