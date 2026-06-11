import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ThinkSpace Technologies — AI · Data · Simulation · Digital Engineering'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#171717',
          padding: '96px',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* subtle top accent rule */}
        <div
          style={{
            display: 'flex',
            width: '72px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: '#22C55E',
            marginBottom: '40px',
          }}
        />

        {/* wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: '88px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            lineHeight: 1.05,
          }}
        >
          ThinkSpace
          <span style={{ color: '#22C55E' }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '40px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: '#A3A3A3',
            marginTop: '8px',
          }}
        >
          Technologies
        </div>

        {/* tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: '34px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#22C55E',
            marginTop: '56px',
          }}
        >
          AI · Data · Simulation · Digital Engineering
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
