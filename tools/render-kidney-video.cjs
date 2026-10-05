// Renders public/kidney/index.html to an MP4 frame by frame.
// Usage: NODE_PATH=$(npm root -g) node tools/render-kidney-video.cjs [fps] [--stills t1,t2,... outDir] [--dump-script out.json]
// Muxes public/kidney/narration.mp3 into the video when it exists (see make-kidney-narration.py).
// Needs Playwright (Chromium) and ffmpeg with libx264.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..', 'public', 'kidney');
const args = process.argv.slice(2);
const stillsIdx = args.indexOf('--stills');
const fps = Number(args.find((a) => /^\d+$/.test(a)) || 30);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('file://' + path.join(root, 'index.html') + '?record=1');
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  const grab = (t) =>
    page.evaluate((t) => {
      window.renderAt(t);
      return document.getElementById('c').toDataURL('image/jpeg', 0.95).split(',')[1];
    }, t);

  const dumpIdx = args.indexOf('--dump-script');
  if (dumpIdx >= 0) {
    fs.writeFileSync(args[dumpIdx + 1], JSON.stringify(await page.evaluate(() => window.SCRIPT), null, 1));
    await browser.close();
    return;
  }

  if (stillsIdx >= 0) {
    const outDir = args[stillsIdx + 2] || '.';
    for (const t of args[stillsIdx + 1].split(',').map(Number)) {
      fs.writeFileSync(path.join(outDir, `still-${t}.jpg`), Buffer.from(await grab(t), 'base64'));
    }
    await browser.close();
    return;
  }

  const out = path.join(root, 'kidney-for-kids.mp4');
  const audio = path.join(root, 'narration.mp3');
  const audioArgs = fs.existsSync(audio) ? ['-i', audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '128k'] : [];
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    ...audioArgs, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const frames = Math.round(total * fps);
  for (let f = 0; f < frames; f++) {
    const buf = Buffer.from(await grab(f / fps), 'base64');
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % (fps * 10) === 0) process.stdout.write(`\r${Math.round((f / frames) * 100)}%`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log(`\nwrote ${out} (${total.toFixed(1)}s @ ${fps}fps)`);
})();
