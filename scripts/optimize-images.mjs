// One-time image optimizer. Run with: node scripts/optimize-images.mjs
// Resizes source art to display size and emits WebP, slashing page weight.
import sharp from 'sharp'
import { readdir, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assets = path.join(root, 'src', 'assets')
const optDir = path.join(assets, 'optimized')
const publicDir = path.join(root, 'public')

// Experience cards render at 400x520 (desktop). 2x for retina = 800x1040.
const CARD = { width: 800, height: 1040 }

const experiencePngs = [
  'Rooftop Dining.PNG', 'Yacht Experiences.PNG', 'Luxury Hotels.PNG',
  'Spa & Recovery.PNG', 'Weekend Getaways.PNG', 'Coffee Experiences.PNG',
  'Cultural Events.PNG',
]

const kb = (n) => (n / 1024).toFixed(1) + ' KB'

async function run() {
  await mkdir(optDir, { recursive: true })
  let before = 0, after = 0

  // 1. Experience cards -> cover-cropped WebP at retina card size
  for (const name of experiencePngs) {
    const src = path.join(assets, name)
    const out = path.join(optDir, name.replace(/\.png$/i, '.webp'))
    const srcSize = (await stat(src)).size
    await sharp(src)
      .resize({ ...CARD, fit: 'cover', position: 'centre' })
      .webp({ quality: 80, effort: 6 })
      .toFile(out)
    const outSize = (await stat(out)).size
    before += srcSize; after += outSize
    console.log(`  ${name}: ${kb(srcSize)} -> ${kb(outSize)}`)
  }

  // 2. Navbar logo -> displayed at 70px tall; emit at 2x = 140px, keep alpha
  {
    const src = path.join(assets, 'logo.PNG')
    const out = path.join(optDir, 'logo.webp')
    const srcSize = (await stat(src)).size
    await sharp(src)
      .resize({ height: 280, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(out)
    const outSize = (await stat(out)).size
    before += srcSize; after += outSize
    console.log(`  logo.PNG: ${kb(srcSize)} -> ${kb(outSize)}`)
  }

  // 3. Favicon: the 769KB traced SVG -> tiny rasterized PNGs
  {
    const src = path.join(publicDir, 'favicon.svg')
    const srcSize = (await stat(src)).size
    await sharp(src, { density: 200 })
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'favicon.png'))
    await sharp(src, { density: 200 })
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    const f = (await stat(path.join(publicDir, 'favicon.png'))).size
    const a = (await stat(path.join(publicDir, 'apple-touch-icon.png'))).size
    before += srcSize; after += f + a
    console.log(`  favicon.svg: ${kb(srcSize)} -> favicon.png ${kb(f)} + apple-touch-icon.png ${kb(a)}`)
  }

  console.log(`\nTotal: ${kb(before)} -> ${kb(after)}  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`)
}

run().catch((e) => { console.error(e); process.exit(1) })
