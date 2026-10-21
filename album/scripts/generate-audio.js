/* eslint-disable @typescript-eslint/no-require-imports */
// Script to generate a soothing romantic acoustic piano chord loop (WAV format)
const fs = require("fs");
const path = require("path");

const sampleRate = 44100;
const bpm = 68;
const beatDuration = 60 / bpm; // ~0.882 sec per beat
const totalBars = 4;
const beatsPerBar = 4;
const duration = totalBars * beatsPerBar * beatDuration; // ~14.1 sec loop
const numSamples = Math.floor(sampleRate * duration);

// Chord progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4/add9
// Frequencies in Hz:
// Cmaj9: C3 (130.81), G3 (196.00), B3 (246.94), D4 (293.66), E4 (329.63), G4 (392.00)
// Am9: A2 (110.00), E3 (164.81), G3 (196.00), C4 (261.63), B4 (493.88)
// Fmaj7: F2 (87.31), C3 (130.81), A3 (220.00), E4 (329.63), C5 (523.25)
// Gsus4: G2 (98.00), D3 (146.83), C4 (261.63), D4 (293.66), G4 (392.00)

const chords = [
  // Bar 1: Cmaj9
  { notes: [130.81, 196.00, 246.94, 293.66, 329.63, 392.00], startBeat: 0 },
  { notes: [293.66, 329.63], startBeat: 2 },
  // Bar 2: Am9
  { notes: [110.00, 164.81, 196.00, 261.63, 329.63, 493.88], startBeat: 4 },
  { notes: [261.63, 329.63], startBeat: 6 },
  // Bar 3: Fmaj7
  { notes: [87.31, 130.81, 220.00, 329.63, 392.00, 523.25], startBeat: 8 },
  { notes: [329.63, 392.00], startBeat: 10 },
  // Bar 4: Gsus4 -> G
  { notes: [98.00, 146.83, 261.63, 293.66, 392.00], startBeat: 12 },
  { notes: [246.94, 392.00], startBeat: 14 },
];

const leftChannel = new Float32Array(numSamples);
const rightChannel = new Float32Array(numSamples);

chords.forEach(({ notes, startBeat }) => {
  const startTime = startBeat * beatDuration;
  const startSample = Math.floor(startTime * sampleRate);

  notes.forEach((freq, noteIdx) => {
    // Generate soft bell-like piano timbre with harmonics and warm envelope
    const noteDuration = 4.5; // long gentle ring
    const noteSamples = Math.floor(noteDuration * sampleRate);

    // Subtle stereo panning for warmth
    const pan = 0.3 + 0.4 * (noteIdx / notes.length); // 0.3 to 0.7

    for (let i = 0; i < noteSamples; i++) {
      const idx = startSample + i;
      if (idx >= numSamples) break;

      const t = i / sampleRate;
      // Exponential decay envelope
      const env = Math.exp(-t * 1.8) * (1 - Math.exp(-t * 60));

      // Harmonics for soft acoustic piano tone
      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const h2 = 0.35 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 3);
      const h3 = 0.15 * Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 5);
      const h4 = 0.08 * Math.sin(2 * Math.PI * freq * 4 * t) * Math.exp(-t * 8);

      const val = (fundamental + h2 + h3 + h4) * env * 0.12;

      leftChannel[idx] += val * (1 - pan);
      rightChannel[idx] += val * pan;
    }
  });
});

// Soft master limiter & normalize
let maxAmp = 0;
for (let i = 0; i < numSamples; i++) {
  maxAmp = Math.max(maxAmp, Math.abs(leftChannel[i]), Math.abs(rightChannel[i]));
}
const gain = maxAmp > 0 ? 0.85 / maxAmp : 1;

// Write 16-bit PCM WAV
const byteRate = sampleRate * 4;
const dataSize = numSamples * 4;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(2, 22); // Stereo
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(4, 32); // block align
buffer.writeUInt16LE(16, 34); // bits per sample
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const left = Math.max(-1, Math.min(1, leftChannel[i] * gain));
  const right = Math.max(-1, Math.min(1, rightChannel[i] * gain));

  buffer.writeInt16LE(Math.floor(left * 32767), offset);
  buffer.writeInt16LE(Math.floor(right * 32767), offset + 2);
  offset += 4;
}

const outputPath = path.join(process.cwd(), "public", "music", "romantic-melody.mp3");
fs.writeFileSync(outputPath, buffer);
console.log("Generated romantic audio file successfully at:", outputPath);
