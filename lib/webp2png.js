import { tmpdir } from 'os'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

export async function webp2png(buffer) {
  const inputPath = path.join(tmpdir(), `input_${Date.now()}.webp`)
  const outputPath = path.join(tmpdir(), `output_${Date.now()}.png`)
  fs.writeFileSync(inputPath, buffer)

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-y', '-i', inputPath, outputPath])
    ffmpeg.stderr.on('data', data => { }) // silenzioso
    ffmpeg.on('close', code => {
      fs.existsSync(outputPath) ? resolve() : reject(new Error('Conversione fallita'))
    })
  })

  const out = fs.readFileSync(outputPath)
  fs.unlinkSync(inputPath)
  fs.unlinkSync(outputPath)
  return out
}