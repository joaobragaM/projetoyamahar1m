const TOTAL = 36;

let current = 0;
let startX = 0;
let accumulated = 0;
let isDragging = false;

const img = document.getElementById('moto-img');
const viewer = document.getElementById('viewer');
const hint = document.querySelector('.drag-label');

const frames = [];

/* =========================
   PRELOAD DAS IMAGENS
========================= */

for (let i = 0; i < TOTAL; i++) {
    const image = new Image();
    image.src = `./imager1m360/bike_${i}.jpg`;
    frames.push(image);
}

/* =========================
   DEFINE FRAME
========================= */

function setFrame(n) {
    current = ((n % TOTAL) + TOTAL) % TOTAL;
    img.src = frames[current].src;
}

/* =========================
   MOVIMENTO
========================= */

function onMove(dx) {
    const threshold = 8;

    accumulated += dx;

    while (Math.abs(accumulated) >= threshold) {
        setFrame(current + Math.sign(accumulated));

        accumulated -= threshold * Math.sign(accumulated);
    }
}

/* =========================
   MOUSE
========================= */

viewer.addEventListener('mousedown', (e) => {
    isDragging = true;

    startX = e.clientX;
    accumulated = 0;

    hint.style.opacity = '0';

    viewer.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;

    onMove(dx);

    startX = e.clientX;
});

window.addEventListener('mouseup', () => {
    isDragging = false;

    viewer.style.cursor = 'grab';
});

/* =========================
   TOUCH (CELULAR)
========================= */

viewer.addEventListener('touchstart', (e) => {
    isDragging = true;

    startX = e.touches[0].clientX;
    accumulated = 0;

    hint.style.opacity = '0';
}, { passive: true });

viewer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const dx = e.touches[0].clientX - startX;

    onMove(dx);

    startX = e.touches[0].clientX;
}, { passive: true });

viewer.addEventListener('touchend', () => {
    isDragging = false;
});

/* =========================
   ESCONDE DICA
========================= */

setTimeout(() => {
    hint.style.opacity = '0';
}, 3000);

/* =========================
   ESPERA CARREGAR IMAGENS
========================= */

Promise.all(
    frames.map(frame =>
        new Promise(resolve => {
            if (frame.complete) {
                resolve();
            } else {
                frame.onload = resolve;
            }
        })
    )
).then(() => {
    setFrame(0);
});
