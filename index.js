const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    opacity: Math.random(),
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    pulse: Math.random() * Math.PI * 2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.x += star.speedX;
    star.y += star.speedY;
    star.pulse += 0.02;

    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    const glow = 0.3 + 0.7 * Math.sin(star.pulse) * star.opacity;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${glow})`;
    ctx.fill();

    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8 * star.radius;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(drawStars);
}

drawStars();
