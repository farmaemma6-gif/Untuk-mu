const pesan = [
    "Sayang, maaf ya aku terlalu sibuk...",
    "Bukan ingin menjauh, tapi aku sedang membangun masa depan kita.",
    "Tolong jangan sedih, kamu adalah rumah tempatku pulang.",
    "Aku sayang kamu. Lebih dari apapun. 🌸"
];

const stage = document.getElementById('animation-stage');

// 1. Fungsi Munculin Ulat & Teks (Sequential)
function playMessage(index) {
    if (index >= pesan.length) return;

    const div = document.createElement('div');
    div.className = 'msg-box';
    div.innerHTML = `
        <div id="worm-${index}" class="lottie-worm"></div>
        <div class="silk-thread"></div>
        <div class="card-bloom"><h1>${pesan[index]}</h1></div>
    `;
    stage.appendChild(div);

    // Masukin Animasi Ulat Merayap Asli (Lottie)
    const wormAnim = lottie.loadAnimation({
        container: document.getElementById(`worm-${index}`),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets5.lottiefiles.com/packages/lf20_S9S9S9.json' // Ulat Merayap Realistis
    });

    const tl = gsap.timeline();

    // Turun dari atas
    tl.to(div, { top: '30%', duration: 2.5, ease: "power3.out" });
    
    // Teks Mekar (Bloom)
    tl.to(div.querySelector('.card-bloom'), { 
        opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" 
    }, "-=1");

    // Kupu-kupu muncul
    spawnButterfly();

    // Hilang dan ganti
    tl.to(div, { 
        opacity: 0, y: 100, duration: 2, delay: 5, 
        onComplete: () => { div.remove(); playMessage(index + 1); }
    });
}

// 2. Kupu-kupu Terbang Realistis
function spawnButterfly() {
    const bfContainer = document.getElementById('butterfly-container');
    const bf = document.createElement('div');
    bf.className = 'butterfly-real';
    const id = 'bf-' + Date.now();
    bf.id = id;
    bfContainer.appendChild(bf);

    lottie.loadAnimation({
        container: bf,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_oW6W9W.json' // Kupu-kupu Realistis
    });

    gsap.fromTo(bf, 
        { x: -200, y: Math.random() * window.innerHeight }, 
        { x: window.innerWidth + 200, y: '-=200', duration: 10, ease: "none", onComplete: () => bf.remove() }
    );
}

// 3. Efek Kelopak Bunga Berjatuhan (Canvas)
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let petals = Array.from({length: 40}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*5+2, d: Math.random()+1, a: Math.random()
}));

function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 182, 193, 0.8)";
    petals.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r/1.5, p.a, 0, Math.PI*2);
        ctx.fill();
        p.y += p.d; p.x += Math.sin(p.a += 0.01);
        if(p.y > canvas.height) p.y = -20;
    });
    requestAnimationFrame(drawPetals);
}

window.onload = () => {
    drawPetals();
    playMessage(0);
};
