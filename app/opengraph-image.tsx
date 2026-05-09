import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// OG image for link previews (WhatsApp, iMessage, Twitter, etc.)
// Option B: glyph-forward marketing card.
// Layout (top to bottom): glyph, HYPEHAUS wordmark, TONIGHT IS YOURS tagline, cities + URL
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const glyph = await readFile(join(process.cwd(), 'public/glyph.png'));
  const glyphSrc = `data:image/png;base64,${glyph.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020202',
          padding: '60px 80px',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        {/* Subtle radial vignette mimic — top-center brighter, edges darker */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at center, rgba(40,40,42,0.6) 0%, rgba(20,20,22,0.4) 30%, rgba(0,0,0,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Glyph */}
        <div
          style={{
            display: 'flex',
            marginBottom: 40,
          }}
        >
          <img
            src={glyphSrc}
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* HYPEHAUS wordmark */}
        <div
          style={{
            display: 'flex',
            color: '#F4F4F4',
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          HYPEHAUS
        </div>

        {/* Tagline — Tonight is yours */}
        <div
          style={{
            display: 'flex',
            color: 'rgba(255,255,255,0.70)',
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 60,
          }}
        >
          TONIGHT IS YOURS
        </div>

        {/* Footer — cities + URL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.40)',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '0.40em',
              textTransform: 'uppercase',
            }}
          >
            MUMBAI · NAGPUR · PUNE
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            JOIN.HYPEHAUS.ORG
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
