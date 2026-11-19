const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const TEXT = "I love you";
const COLOR = "#ffb6c1";

// Kira koordinat bentuk love berlapis
const points = [];
const baseUnit = Math.min(canvas.width, canvas.height) / 560;

for (let scale = 11; scale <= 16; scale++) {
  for (let i = 0; i < 120; i++) {
    const t = (i * Math.PI * 2) / 120;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    points.push({
      x: x * scale * baseUnit,
      y: y * scale * baseUnit
    });
  }
}

let index = 0;

function drawStep() {
  if (index >= points.length) return;

  ctx.fillStyle = COLOR;
  ctx.font = `${Math.max(8, Math.round(10 * baseUnit))}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 - 15;

  const pt = points[index];
  ctx.fillText(TEXT, centerX + pt.x, centerY + pt.y);
  index++;

  // Kelajuan perlahan & tenang (48ms setiap perkataan)
  setTimeout(drawStep, 48);
}

// Mula muzik & lukisan bila butang ditekan
startBtn.addEventListener('click', () => {
  startOverlay.classList.add('hidden');
  musicToggle.style.display = 'flex';

  bgMusic.play().catch(() => {
    musicToggle.textContent = '🔇';
  });

  drawStep();
});

// Kawalan mute / unmute
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
  }
});