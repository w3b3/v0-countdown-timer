export default function HomePage() {

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Daniel Santos
      </h1>

      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Let's connect and chat about life, work, and everything in between
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '360px',
        width: '100%'
      }}>
        <a href="https://www.linkedin.com/in/brasileiro"
           target="_blank"
           rel="noreferrer"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#0077B5',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🔗</span>
          LinkedIn
        </a>

        <a href="https://github.com/w3b3"
           target="_blank"
           rel="noreferrer"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#333',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>📁</span>
          GitHub
        </a>

        <a href="https://wa.me/18199195996"
           target="_blank"
           rel="noreferrer"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#25D366',
             color: '#012b18',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>📱</span>
          WhatsApp
        </a>

        <a href="mailto:iam@w-b.dev"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#b30000',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>✉️</span>
          Email
        </a>

        <a href="https://tatame0.com"
           target="_blank"
           rel="noreferrer"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#111827',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🥋</span>
          Tatame0
        </a>

        <a href="https://willis-brown.com"
           target="_blank"
           rel="noreferrer"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#222',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🏢</span>
          Willis Brown
        </a>
      </div>
    </main>
  )
}
