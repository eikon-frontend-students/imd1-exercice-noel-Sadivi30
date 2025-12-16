const section = document.getElementById("section");
const result = document.getElementById("result");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const moods = [
  "/images/img1).jpeg",
  "/images/img2.jpeg",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img5.jpeg",
  "/images/img6.jpeg",
  "/images/img7.jpeg",
  "/images/img8.jpeg",
  "/images/img9.jpeg",
  "/images/img10.jpeg",
  "/images/img11.jpeg",
];

let clicked = false;

section.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;

    section.style.transform = "translateY(20px) scale(1.05)";

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * moods.length);
      result.innerHTML = `<img src="${moods[randomIndex]}" alt="Mood">`;

      const img = result.querySelector("img");
      setTimeout(() => {
        img.style.opacity = 1;
        img.style.transform = "translateX(-50%) scale(1)";
      }, 50);

      startFireworks();
    }, 500);
  } else {
    section.style.transform = "translateY(0) scale(1)";
    const img = result.querySelector("img");
    if (img) {
      img.style.opacity = 0;
      img.style.transform = "translateX(-50%) scale(0)";
      setTimeout(() => (result.innerHTML = ""), 500);
    }
    clicked = false;
  }
});

let particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function startFireworks() {
  setInterval(() => {
    const x = random(0, canvas.width);
    const y = random(0, canvas.height / 2);
    for (let i = 0; i < 30; i++) {
      const angle = ((Math.PI * 2) / 30) * i;
      const speed = random(2, 5);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        color: `hsl(${random(0, 360)},100%,70%)`,
      });
    }
  }, 800);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
    if (p.life <= 0) particles.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

animate();
