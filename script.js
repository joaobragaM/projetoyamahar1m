    const TOTAL = 36;
    let current = 0;
    let startX = 0;
    let accumulated = 0;
    let isDragging = false;

    const img = document.getElementById('moto-img');
    const viewer = document.getElementById('viewer');
    const hint = document.querySelector('.drag-label'); 

    const frames = [];
    for (let i = 0; i < TOTAL; i++) {
        const image = new Image();
        image.src = `imager1m360/bike_${i}.jpg`; 
        frames.push(image);
    }

    function setFrame(n) {
        current = ((n % TOTAL) + TOTAL) % TOTAL;
        img.src = frames[current].src;
    }

    function onMove(dx) {
        const threshold = 8;
        accumulated += dx;
        if (Math.abs(accumulated) >= threshold) {
            setFrame(current + Math.sign(accumulated));
            accumulated = 0;
        }
    }

    viewer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        accumulated = 0;
        hint.style.opacity = '0';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        onMove(e.clientX - startX);
        startX = e.clientX;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    viewer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        accumulated = 0;
        hint.style.opacity = '0'; 
    }, { passive: true });

    viewer.addEventListener('touchmove', (e) => {
        onMove(e.touches[0].clientX - startX);
        startX = e.touches[0].clientX;
    }, { passive: true });

    setTimeout(() => { hint.style.opacity = '0'; }, 3000);
