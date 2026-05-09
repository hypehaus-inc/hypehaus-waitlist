import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// iOS home screen icon (Add to Home Screen)
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const glyph = await readFile(join(process.cwd(), 'public/glyph.png'));
  const glyphSrc = `data:image/png;base64,${glyph.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020202',
        }}
      >
        <img
          src={glyphSrc}
          width={180}
          height={180}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
