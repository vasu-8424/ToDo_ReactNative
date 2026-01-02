const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create SVG icon with checkmark in a rounded square
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background rounded rectangle with teal color -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#4FC0B9"/>
  
  <!-- White checkmark -->
  <path d="M ${size * 0.28} ${size * 0.52} L ${size * 0.44} ${size * 0.7} L ${size * 0.72} ${size * 0.35}" 
        stroke="white" 
        stroke-width="${size * 0.1}" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none"/>
</svg>
`;

// Icon sizes for Android
const androidSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

const baseDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

async function generateIcons() {
  console.log('🎨 Generating app icons...\n');

  for (const [folder, size] of Object.entries(androidSizes)) {
    const folderPath = path.join(baseDir, folder);
    const iconPath = path.join(folderPath, 'ic_launcher.png');
    const roundIconPath = path.join(folderPath, 'ic_launcher_round.png');
    
    // Ensure directory exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    const svgBuffer = Buffer.from(createIconSVG(size));
    
    // Generate regular icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(iconPath);
    
    // Generate round icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(roundIconPath);
    
    console.log(`✅ Created ${folder}/ic_launcher.png (${size}x${size})`);
    console.log(`✅ Created ${folder}/ic_launcher_round.png (${size}x${size})`);
  }

  console.log('\n🎉 All icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
