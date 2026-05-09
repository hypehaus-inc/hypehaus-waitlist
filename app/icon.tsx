import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Browser tab favicon
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          width={32}
          height={32}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
