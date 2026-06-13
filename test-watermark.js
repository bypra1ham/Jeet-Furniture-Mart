const sharp = require('sharp');

async function main() {
  const width = 1000;
  const height = 1000;

  const scale = Math.max(0.5, width / 1000);
  const titleSize = Math.floor(48 * scale);
  const subtitleSize = Math.floor(24 * scale);
  const patternSize = Math.floor(400 * scale);

  const diag = Math.sqrt(width * width + height * height);
  const cols = Math.ceil(diag / patternSize) + 1;
  const rows = Math.ceil(diag / patternSize) + 1;
  
  let textNodes = '';
  const startX = -diag / 2;
  const startY = -diag / 2;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cx = startX + (i * patternSize);
      const cy = startY + (j * patternSize);
      
      textNodes += `<text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#000000" fill-opacity="0.3" text-anchor="middle">JEET FURNITURE</text>`;
      textNodes += `<text x="${cx}" y="${cy + subtitleSize}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="#000000" fill-opacity="0.3" text-anchor="middle">www.jeetfurniture.com</text>`;
      
      textNodes += `<text x="${cx - 2}" y="${cy - 2}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#ffffff" fill-opacity="0.35" text-anchor="middle">JEET FURNITURE</text>`;
      textNodes += `<text x="${cx - 2}" y="${cy - 2 + subtitleSize}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="#ffffff" fill-opacity="0.35" text-anchor="middle">www.jeetfurniture.com</text>`;
    }
  }

  const svgWatermark = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(${width / 2}, ${height / 2}) rotate(-35)">
        ${textNodes}
      </g>
    </svg>
  `;

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 1 } // Red background
    }
  })
    .composite([
      {
        input: Buffer.from(svgWatermark),
        blend: 'over',
      },
    ])
    .toFile('test-output.png');
    console.log('Done SVG Grid');
}

main().catch(console.error);
