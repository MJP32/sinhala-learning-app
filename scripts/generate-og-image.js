const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;

// Create SVG with the design
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8d153a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00534e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffbe29;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#eb7400;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="150" fill="rgba(255,255,255,0.05)"/>
  <circle cx="1100" cy="530" r="200" fill="rgba(255,255,255,0.05)"/>
  <circle cx="900" cy="100" r="100" fill="rgba(255,255,255,0.03)"/>
  
  <!-- Main content area -->
  <rect x="60" y="60" width="1080" height="510" rx="20" fill="rgba(255,255,255,0.1)"/>
  
  <!-- Sinhala Title -->
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
    සිංහල ඉගෙන ගන්න
  </text>
  
  <!-- English Title -->
  <text x="600" y="290" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="url(#goldGradient)" text-anchor="middle">
    Learn Sinhala
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="370" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">
    Free Interactive Language Learning for All Ages
  </text>
  
  <!-- Features -->
  <text x="600" y="450" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">
    Alphabet • Vocabulary • Grammar • Pronunciation • Grades 1-6
  </text>
  
  <!-- Bottom accent line -->
  <rect x="400" y="500" width="400" height="4" rx="2" fill="url(#goldGradient)"/>
  
  <!-- Sri Lanka flag colors accent -->
  <rect x="60" y="570" width="60" height="8" rx="4" fill="#FFBE29"/>
  <rect x="130" y="570" width="60" height="8" rx="4" fill="#00534e"/>
  <rect x="200" y="570" width="60" height="8" rx="4" fill="#8d153a"/>
</svg>
`;

async function generateOgImage() {
  try {
    const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log('OG image generated successfully at:', outputPath);
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOgImage();
