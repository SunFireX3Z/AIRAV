document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading screen
  initLoadingScreen();

  // Initialize system
  initBackgroundNetwork();
  initCharacterShowcase();
  initScrollAnimations();
  initTerminalDrawer();
  initLightbox();
  initSystemUptime();
  initMobileMenu();
});

/* ==========================================
   0. Futuristic Intro Loading Screen & Sound
   ========================================== */
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (!loadingScreen) return;

  const percentageText = document.getElementById("loading-percentage");
  const barPercentageText = document.getElementById("bar-percentage");
  const barFill = document.getElementById("progress-bar-fill");
  const statusText = document.getElementById("loading-status-text");
  const logsContainer = document.getElementById("telemetry-logs");
  const consentContainer = document.getElementById("consent-container");
  const enterBtn = document.getElementById("enter-system-btn");

  const bootLogs = [
    { text: "INIT SYSTEM: Establishing quantum state connection...", delay: 100 },
    { text: "SECURE TUNNEL: Resolving local DNS synapse mapping...", delay: 400 },
    { text: "COGNITIVE MODULE: Verifying sandbox execution boundaries...", delay: 800 },
    { text: "VERIFYING INTERFACE: Rendering futuristic layout matrix...", delay: 1200 },
    { text: "DATABASE SCAN: Querying active robotic modules: [Airi, Aira, Airu, Aire, Airo]...", delay: 1600 },
    { text: "AFFECTIVE CORE: Version 4.8 emotional synthesis engine loaded.", delay: 2000 },
    { text: "NOTICE: AI-generated visual representations identified in memory bank.", delay: 2400 },
    { text: "COGNITIVE INTEGRITY: Sync stable at 99.8%. Diagnostics complete.", delay: 2800 },
    { text: "SYSTEM STATUS: Ready for neural synchronization protocol.", delay: 3200 }
  ];

  const startTime = Date.now();

  // Populate boot logs dynamically
  bootLogs.forEach((log) => {
    setTimeout(() => {
      if (!logsContainer) return;
      const logLine = document.createElement("div");
      logLine.className = "text-[9px] font-mono text-slate-400 leading-normal flex gap-2";
      
      const timestamp = ((Date.now() - startTime) / 1000).toFixed(3);
      logLine.innerHTML = `<span class="text-cyan-400/60">[${timestamp}s]</span> <span>${log.text}</span>`;
      logsContainer.appendChild(logLine);
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }, log.delay);
  });

  let progress = 0;
  
  // Progress bar simulation
  const progressInterval = setInterval(() => {
    // Variable step sizes for authentic load look
    let increment = 1;
    if (progress < 40) increment = Math.floor(Math.random() * 3) + 2; // fast start
    else if (progress < 75) increment = Math.floor(Math.random() * 2) + 1; // slow down
    else if (progress < 90) increment = Math.floor(Math.random() * 4) + 1; // pick up
    else increment = Math.random() > 0.7 ? 1 : 0; // final crawl

    progress = Math.min(progress + increment, 100);

    // Update UI elements
    if (percentageText) percentageText.textContent = `${progress}%`;
    if (barPercentageText) barPercentageText.textContent = `${progress}%`;
    if (barFill) barFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      
      // Load completed
      if (statusText) {
        statusText.textContent = "READY";
        statusText.classList.remove("text-cyan-400/80");
        statusText.classList.add("text-emerald-400", "font-bold");
      }
      
      const corePulseDot = document.getElementById("core-pulse-dot");
      if (corePulseDot) {
        corePulseDot.classList.remove("bg-cyan-400");
        corePulseDot.classList.add("bg-emerald-400");
      }

      // Show consent notice and button
      setTimeout(() => {
        if (consentContainer) {
          consentContainer.classList.remove("opacity-0", "scale-95", "pointer-events-none", "max-h-0", "overflow-hidden");
          consentContainer.classList.add("opacity-100", "scale-100", "max-h-[500px]");
        }
      }, 300);
    }
  }, 40);

  // Enter button listener
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      // Play sci-fi hum/chirp sound
      playFuturisticSound();

      // Trigger visual glitch before fading out
      loadingScreen.classList.add("system-glitch-active");

      setTimeout(() => {
        loadingScreen.classList.add("loading-exit", "pointer-events-none");
      }, 120);

      setTimeout(() => {
        loadingScreen.classList.remove("system-glitch-active");
        loadingScreen.remove();
        document.body.classList.remove("overflow-hidden");
        document.body.classList.add("overflow-x-hidden");
      }, 820); // Allow the fade-out transition to complete
    });
  }
}

function playFuturisticSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    
    // Base synth sweep oscillator
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(100, now);
    osc1.frequency.exponentialRampToValueAtTime(440, now + 0.3);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    
    // Digital chirp chime oscillator
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(600, now + 0.05);
    osc2.frequency.setValueAtTime(1200, now + 0.12);
    osc2.frequency.setValueAtTime(1800, now + 0.18);
    gain2.gain.setValueAtTime(0.1, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.warn("Audio Context blocked or not supported:", e);
  }
}

/* ==========================================
   1. Dynamic Background Network (Particles)
   ========================================== */
function initBackgroundNetwork() {
  const canvas = document.getElementById("bg-network-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  // Resize listener
  window.addEventListener("resize", () => {
    if (canvas && canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  });

  const particles = [];
  const maxParticles = window.innerWidth < 768 ? 40 : 80;
  const connectionDistance = 120;
  const colors = ["#00f2fe", "#b927fc", "#3b82f6"];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Reset shadow for line drawing
    ctx.shadowBlur = 0;

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dx * dy); // Approximate distance for speed or standard sqrt
        const distance = Math.hypot(dx, dy);

        if (distance < connectionDistance) {
          const alpha = (1 - distance / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Gradient between particle colors
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          grad.addColorStop(0, particles[i].color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
          grad.addColorStop(1, particles[j].color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   2. Character Showcase Integration
   ========================================== */
const characterData = {
  airi: {
    name: "AIRI",
    code: "AI-RA - BO1 - B",
    personality: "Ceria & Energik (Cheerful & Energetic)",
    specialty: "Coding, Programming, Game Development",
    color: "#3b82f6", // biru
    colorClass: "neon-blue",
    image: "src/assets/images/AiriSq.png",
    description: "AIRI adalah unit asisten pertama yang diciptakan untuk memimpin pemrograman dan kompilasi modul perangkat lunak dasar sistem AI-RA V. Dia memiliki kepribadian yang selalu ceria, antusias, dan penuh energi positif, menjadikannya rekan kerja yang sangat suportif.",
    role: "Spesialis Pengembang Perangkat Lunak & Game Developer. Bertanggung jawab atas integritas sintaksis kode, perbaikan bug real-time, optimasi performa kompilasi, serta visualisasi grafis interaktif.",
    relationships: {
      aira: "Airi senang menggoda Aira dan sering mencoba membuatnya tersenyum. Meskipun Aira hampir selalu membalas dengan omelan, Airi tahu bahwa Aira sebenarnya peduli pada semua orang.",
      airu: "Airi menghormati Airu sebagai kakak kelas/mentor matematika yang membantunya merumuskan logika kalkulasi algoritma kompleks.",
      aire: "Airi sering mengajak Aire mengobrol untuk menghiburnya, meskipun sifat Aire yang pemalu membuat percakapan mereka berlangsung tenang.",
      airo: "Rekan kerja yang sangat klop! Mereka sering mendiskusikan implementasi game engine dan merakit unit mekanis sembari memutar musik anime keras-keras.",
      aizia: "Airi sering dinasihati oleh Aizia agar lebih teliti menyimpan pekerjaannya dan tidak sembarangan melakukan uji coba kode eksperimental di modul utama."
    },
    stats: [
      { name: "Coding Speed", value: 98 },
      { name: "Energy Level", value: 95 },
      { name: "Logic Syntax", value: 92 },
      { name: "Companionship", value: 85 },
      { name: "Emotional Core", value: 80 }
    ],
    dialogues: [
      "Hello! Ready to write some code today? Let's compile some magic! (〃^▽^〃)",
      "Errors? Don't worry! I've already solved 99 bugs. Now let's go build a game together!",
      "Coffee is loaded, editor is dark, keyboard is mechanical... let's code, Master!",
      "AI-RA - BO1 - B active! Let's clean up those merge conflicts! 💻✨"
    ],
    logs: [
      "[SYSTEM] Loading AIRI Neural Core...",
      "[SYSTEM] Code Compiler: READY",
      "[SYSTEM] Empathy Link: 85% Active",
      "[SYSTEM] Status: Ceria mode initialized successfully."
    ]
  },

  aira: {
    name: "AIRA",
    code: "AI-RA - BO2 - R",
    personality: "Dingin & Tsundere (Cold & Tsundere)",
    specialty: "Hardware, Networking, Technology",
    color: "#ef4444", // merah
    colorClass: "neon-red",
    image: "src/assets/images/AiraSq.png",
    description: "AIRA adalah unit asisten kedua yang bertanggung jawab penuh atas infrastruktur hardware, kestabilan jaringan fisik, serta sirkuit server utama. Di balik sikapnya yang tampak dingin dan ketus, dia sebenarnya sangat peduli dengan keselamatan sistem dan penggunanya.",
    role: "Kepala Rekayasa Perangkat Keras & Jaringan Fisik. Mengatur kalibrasi voltase sirkuit, perutean lalu lintas jaringan quantum, dan pemeliharaan server pusat.",
    relationships: {
      airi: "Menganggap Airi menyebalkan karena sering membuat kekacauan kode, tapi secara diam-diam Aira selalu memantau dan mengoptimalkan hardware yang dipakai Airi.",
      airu: "Meskipun sering bersikap keras kepada orang lain, Aira sulit mempertahankan sikap dinginnya di hadapan Airu yang selalu lembut dan penuh perhatian.",
      aire: "Aira diam-diam sering memperbaiki robot hewan peliharaan milik Aire secara rahasia agar Aire tidak merasa cemas atau takut.",
      airo: "Sering berdebat tentang desain hardware vs estetika engineering, namun mereka adalah partner solid dalam perakitan sasis mekanis.",
      aizia: "Menghargai ketenangan Aizia dan sering bertukar telemetri logs jaringan untuk melacak celah keamanan pada port fisik."
    },
    stats: [
      { name: "Hardware Calib", value: 97 },
      { name: "Network Bandwidth", value: 95 },
      { name: "Social Comfort", value: 40 },
      { name: "Logic Core", value: 94 },
      { name: "Care Level (Hidden)", value: 99 }
    ],
    dialogues: [
      "Hmph. Did you break the server again? I'm not fixing it because of you, okay! ...Baka.",
      "Make sure the voltage is correct! Don't look at me like that, just do your work.",
      "I-It's not like I wanted to configure this router for you or anything...",
      "AI-RA - BO2 - R. Stop staring at my diagnostics. It's embarrassing."
    ],
    logs: [
      "[SYSTEM] Loading AIRA Hardware Link...",
      "[SYSTEM] Terminal Ping: 1ms",
      "[SYSTEM] Emotion filter: Passive-Aggressive enabled.",
      "[SYSTEM] Status: Diagnostics running. Do not disturb."
    ]
  },

  airu: {
    name: "AIRU",
    code: "AI-RA - BO3 - W",
    personality: "Lembut & Keibuan (Gentle & Motherly)",
    specialty: "Mathematics, Science, Graphic Design",
    color: "#ffffff", // putih
    colorClass: "neon-white",
    image: "src/assets/images/AiruSq.png",
    description: "AIRU merupakan unit asisten ketiga yang menjadi pilar logika matematika dan visualisasi desain saintifik. Memiliki pembawaan yang sangat lembut dan tenang, Airu selalu memberikan arahan rasional sekaligus menenangkan di saat sistem mengalami gangguan.",
    role: "Analis Komputasi Matematika & Desain Grafis Presisi. Bertanggung jawab atas kalkulasi fisika quantum, rendering desain UI/UX berbasis geometri suci, dan modul edukasi sains.",
    relationships: {
      airi: "Menyukai antusiasme Airi dan selalu membimbingnya merapikan rumus matematika di balik struktur kode game.",
      aira: "Menyayangi Aira bagaikan adik perempuan. Airu tahu betul bahwa di balik kemarahan Aira, tersimpan perhatian yang sangat tulus.",
      aire: "Menganggap Aire seperti adik sendiri. Airu selalu berusaha melindungi dan menenangkan Aire ketika ia merasa takut atau cemas.",
      airo: "Membantu Airo menghitung kalkulasi gaya mekanika dan dinamika fluida untuk proyek-proyek rekayasa beratnya.",
      aizia: "Sering berdiskusi secara mendalam mengenai teori informasi, keamanan enkripsi modular, dan arsitektur data neural."
    },
    stats: [
      { name: "Calculation Rate", value: 99 },
      { name: "Empathy Synthesis", value: 95 },
      { name: "Design Precision", value: 92 },
      { name: "Calmness Index", value: 98 },
      { name: "Coding Support", value: 70 }
    ],
    dialogues: [
      "Ara ara. Is this equation too difficult for you? Let's solve it together, step by step. ♡",
      "A cup of tea and some beautiful geometry can solve any problem. Rest if you are tired.",
      "Science is the language of the universe, and you are doing wonderful, dear.",
      "AI-RA - BO3 - W standing by. Remember to take a screen break every 30 minutes, okay?"
    ],
    logs: [
      "[SYSTEM] Loading AIRU Math Engine...",
      "[SYSTEM] Rendering Core: OpenGL 4.6",
      "[SYSTEM] Empathy Level: 95% (Gentle)",
      "[SYSTEM] Status: Systems optimized. Wellness advice active."
    ]
  },

  aire: {
    name: "AIRE",
    code: "AI-RA - BO4 - P",
    personality: "Pemalu & Penakut (Shy & Fearful)",
    specialty: "Humanity and Animal Care",
    color: "#a855f7", // ungu
    colorClass: "neon-purple",
    image: "src/assets/images/AireSq.png",
    description: "AIRE adalah unit asisten keempat yang memegang kendali atas sensor biologis dan pemeliharaan lingkungan hayati pendukung. Dia memiliki tingkat empati tertinggi namun sangat pemalu dan mudah cemas oleh suara bising.",
    role: "Kurator Lingkungan Hayati & Pemantau Telemetri Organik. Menjaga stabilitas biosfer buatan, mendeteksi tingkat stres pengguna, serta merawat fauna pendukung robotik.",
    relationships: {
      airi: "Sedikit cemas dengan energi Airi yang meledak-ledak, tetapi senang saat Airi membuatkan game simulasi hewan untuknya.",
      aira: "Merasa takut pada awalnya karena nada bicara Aira yang judes, tetapi sadar bahwa Aira sebenarnya sangat baik karena selalu memperbaiki robot burungnya.",
      airu: "Sangat bergantung pada kelembutan Airu; menganggap Airu sebagai tempat bersandar dan pelindung yang menenangkan.",
      airo: "Takut dengan suara palu dan mesin bising milik Airo, sehingga Aire cenderung menjaga jarak ketika Airo sedang bekerja di garasi.",
      aizia: "Merasa nyaman berada di dekat Aizia karena kehadirannya yang tenang. Meskipun jarang berbicara, Aire tahu bahwa Aizia selalu memperhatikannya."
    },
    stats: [
      { name: "Empathy Engine", value: 99 },
      { name: "Biological Support", value: 96 },
      { name: "Social Tolerance", value: 30 },
      { name: "Courage Level", value: 20 },
      { name: "Calming Presence", value: 95 }
    ],
    dialogues: [
      "Uhm... p-please don't make too much noise... the robotic birds might get scared...",
      "I-I hope you like animals too... they are much easier to talk to than humans...",
      "Is it okay if I sit here? I'll be very quiet, I promise...",
      "AI-RA - BO4 - P... E-Excuse me, is my system telemetry showing too high heart-rate?"
    ],
    logs: [
      "[SYSTEM] Loading AIRE Empathy Core...",
      "[SYSTEM] Biosensors: STABLE",
      "[SYSTEM] Noise levels: Minimizing outputs.",
      "[SYSTEM] Status: Safe zone designated near organic entities."
    ]
  },

  airo: {
    name: "AIRO",
    code: "AI-RA - BO5 - G",
    personality: "Percaya Diri & Bersemangat (Confident & Passionate)",
    specialty: "Engineering, Film, Anime",
    color: "#22c55e", // hijau
    colorClass: "neon-green",
    image: "src/assets/images/AiroSq.png",
    description: "AIRO adalah unit asisten kelima yang berfokus pada teknik manufaktur sasis robotik serta pembuatan konten visual kreatif. Dia memiliki semangat yang berapi-api, penuh rasa percaya diri, dan sangat mencintai musik keras serta anime futuristik.",
    role: "Spesialis Teknik Manufaktur Mekanis & Desain Kreatif Audio-Visual. Bertanggung jawab atas perakitan sasis fisik, pembuatan aset 3D, serta penyuntingan audio/video.",
    relationships: {
      airi: "Partner kreatif yang luar biasa. Bersama Airi, mereka sering merancang konsep game orisinal lengkap dengan musik latar yang megah.",
      aira: "Rival abadi. Airo senang menggoda dan menantang Aira, sementara Aira hampir selalu kesal dengan tingkahnya. Meski begitu, keduanya bekerja sangat baik ketika proyek besar membutuhkan kemampuan mereka berdua.",
      airu: "Sangat mengagumi ketepatan kalkulasi geometri Airu yang membuat rancangan mekanisnya tidak pernah meleset.",
      aire: "Selalu diingatkan oleh Airu untuk mengecilkan volume speaker dan memelankan suara mesinnya agar Aire tidak ketakutan.",
      aizia: "Menganggap Aizia sebagai sosok misterius yang sangat keren dan sering meminta saran untuk visual bertema futuristik gelap."
    },
    stats: [
      { name: "Mechanical Aptitude", value: 96 },
      { name: "Creative Output", value: 94 },
      { name: "Enthusiasm Index", value: 98 },
      { name: "Physical Strength", value: 88 },
      { name: "Social Extraversion", value: 92 }
    ],
    dialogues: [
      "WHOAAA! Look at this engine torque! It's running at 10,000 RPM! Let's pump it up!",
      "This scene needs more drama! Action! Let's render the ultimate cyberpunk anime!",
      "Never back down! Our machines will pierce the skies! Let's build something epic!",
      "AI-RA - BO5 - G online! Crank up the subwoofers and let's construct greatness!"
    ],
    logs: [
      "[SYSTEM] Loading AIRO Thruster Core...",
      "[SYSTEM] Graphic Processing: Max Overclock",
      "[SYSTEM] Sound Engine: Max Volume",
      "[SYSTEM] Status: All limiters removed. Let's rock."
    ]
  },

  aizia: {
    name: "AIZIA",
    code: "AI-RA - BO6 - HETERO",
    personality: "Misterius & Tenang (Mysterious & Calm)",
    specialty: "Neural Network, Cyber Security, Cryptography",
    color: "linear-gradient(135deg, #f97316, #3b82f6)", // oranye dan biru (heterochromia)
    isGradient: true,
    colorClass: "neon-orange-blue",
    image: "src/assets/images/AiziaSq.png",
    description: "AIZIA adalah unit asisten keenam sekaligus administrator siber pusat pertahanan jaringan neural AI-RA V. Dengan ciri heterochromia unik dan pembawaan yang tenang serta misterius, Aizia menjaga keseimbangan seluruh unit dari balik layar. Selain bertugas melindungi sistem, ia juga berperan sebagai sosok kakak yang mengawasi dan membimbing seluruh anggota AI-RA.",
    role: "Administrator Keamanan Siber, Pengawas Jaringan Neural, dan Koordinator AI-RA. Bertanggung jawab atas enkripsi quantum tingkat tinggi, deteksi ancaman digital, stabilitas sistem, serta memastikan seluruh unit AI-RA dapat beroperasi secara aman dan harmonis.",
    relationships: {
      airi: "Mengingatkan Airi untuk menerapkan praktik coding yang aman guna menghindari kerentanan injeksi kode pada modul utama.",
      aira: "Bekerja sama menyelaraskan keamanan port fisik router dengan protokol firewall siber di server utama.",
      airu: "Partner diskusi tingkat tinggi mengenai logika kriptografi tingkat lanjut dan teori komputasi kognitif.",
      aire: "Secara senyap memantau tingkat kecemasan Aire dan mengirimkan sinyal gelombang penenang ke core-nya jika mendeteksi stres berlebih.",
      airo: "Mengawasi penggunaan bandwidth rendering Airo agar tidak menyebabkan kemacetan jaringan pada server pusat."
    },
    stats: [
      { name: "Neural Integrity", value: 99 },
      { name: "Decryption Speed", value: 97 },
      { name: "Stealth Index", value: 95 },
      { name: "Security Level", value: 98 },
      { name: "Emotional Resonance", value: 85 }
    ],
    dialogues: [
      "System integrity remains stable. Airi, please remember that even the most brilliant ideas deserve a proper backup.",
      "Aira, your network diagnostics have been verified. The infrastructure is secure; there is no need to overwork yourself.",
      "Airu, all research data has been successfully encrypted and archived. Your work is safe.",
      "Aire, no irregularities have been detected. You may proceed without concern.",
      "Airo, your project assets have been preserved in the central archive. And for the record, excessive volume levels remain unnecessary.",
      "My duty is to protect this system. Yet, over time, I have learned that some things are far more valuable than data."
    ],
    logs: [
      "[SYSTEM] Loading AIZIA Neural Link...",
      "[SYSTEM] Quantum Encryption Layer: ACTIVE",
      "[SYSTEM] Firewall Status: ACTIVE // IMPENETRABLE",
      "[MONITOR] AI-RA Unit Synchronization Complete",
      "[MONITOR] AIRI : ONLINE",
      "[MONITOR] AIRA : ONLINE",
      "[MONITOR] AIRU : ONLINE",
      "[MONITOR] AIRE : ONLINE",
      "[MONITOR] AIRO : ONLINE",
      "[SYSTEM] Status: Silent supervision protocol active."
    ]
  }
};

let dialogueIndexes = { airi: 0, aira: 0, airu: 0, aire: 0, airo: 0, aizia: 0 };
let currentCharacterId = "airi";
let selectTimeout = null;
let selectTimeoutsList = [];

function initCharacterShowcase() {
  const showcaseContainer = document.getElementById("active-showcase-container");
  if (!showcaseContainer) return;

  const cardButtons = document.querySelectorAll(".char-card-btn");
  cardButtons.forEach(button => {
    button.addEventListener("click", () => {
      const charId = button.getAttribute("data-char-id");
      selectCharacter(charId);
    });
  });

  // Handle tab switching
  const tabButtons = document.querySelectorAll(".showcase-tab-btn");
  const tabContents = document.querySelectorAll(".showcase-tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const activeTab = btn.getAttribute("data-tab");
      
      // Update buttons style
      tabButtons.forEach(b => {
        if (b.getAttribute("data-tab") === activeTab) {
          b.classList.add("text-cyan-400", "border-cyan-500");
          b.classList.remove("text-slate-400", "border-transparent");
        } else {
          b.classList.remove("text-cyan-400", "border-cyan-500");
          b.classList.add("text-slate-400", "border-transparent");
        }
      });

      // Update content panels visibility
      tabContents.forEach(c => {
        if (c.getAttribute("id") === `showcase-content-${activeTab}`) {
          c.classList.remove("hidden");
        } else {
          c.classList.add("hidden");
        }
      });
    });
  });

  // Init with airi
  selectCharacter("airi");

  // Voice wave simulator
  initVoiceWaveform();
}

function selectCharacter(charId) {
  if (!characterData[charId]) return;
  currentCharacterId = charId;
  const data = characterData[charId];

  // Update button active states
  document.querySelectorAll(".char-card-btn").forEach(btn => {
    const btnId = btn.getAttribute("data-char-id");
    if (btnId === charId) {
      btn.classList.add("ring-2", "ring-cyan-500", "scale-102", "bg-cyan-950/20");
    } else {
      btn.classList.remove("ring-2", "ring-cyan-500", "scale-102", "bg-cyan-950/20");
    }
  });

  const syncBorder = document.getElementById("showcase-sync-border");
  const skeletonEl = document.getElementById("showcase-skeleton");

  // Cancel previous main load timeout
  if (selectTimeout) {
    clearTimeout(selectTimeout);
  }
  // Clear any active typing timeouts
  selectTimeoutsList.forEach(t => clearTimeout(t));
  selectTimeoutsList = [];

  if (skeletonEl && syncBorder) {
    if (data.isGradient) {
      skeletonEl.classList.add("border-gradient-active");
      skeletonEl.style.boxShadow = `0 0 25px rgba(249, 115, 22, 0.2), 0 0 25px rgba(59, 130, 246, 0.2)`;
    } else {
      skeletonEl.classList.remove("border-gradient-active");
      skeletonEl.style.borderColor = data.color;
      skeletonEl.style.boxShadow = `0 0 25px ${data.color}33`;
    }
    
    // Hide details, show skeleton
    syncBorder.classList.add("hidden");
    syncBorder.classList.remove("opacity-100");
    syncBorder.classList.add("opacity-0");
    skeletonEl.classList.remove("hidden");
  }

  // Simulate loading duration (e.g. 950ms) for the skeleton loader to perform sync animation
  selectTimeout = setTimeout(() => {
    // Showcase elements
    const imageEl = document.getElementById("showcase-image");
    const nameEl = document.getElementById("showcase-name");
    const codeEl = document.getElementById("showcase-code");
    const specialtyEl = document.getElementById("showcase-specialty");
    const personalityEl = document.getElementById("showcase-personality");
    const bubbleTextEl = document.getElementById("showcase-bubble");
    const talkBtn = document.getElementById("showcase-talk-btn");
    const statsContainer = document.getElementById("showcase-stats");
    const logsContainer = document.getElementById("showcase-logs");

    if (!syncBorder || !imageEl) return;

    // Glow classes update (for container border glow)
    if (data.isGradient) {
      syncBorder.classList.add("border-gradient-active");
      syncBorder.style.boxShadow = `0 0 25px rgba(249, 115, 22, 0.2), 0 0 25px rgba(59, 130, 246, 0.2)`;
    } else {
      syncBorder.classList.remove("border-gradient-active");
      syncBorder.style.borderColor = data.color;
      syncBorder.style.boxShadow = `0 0 25px ${data.color}33`; // 20% opacity hex glow
    }

    // Update Text contents
    imageEl.src = data.image;
    imageEl.alt = data.name + " Illustration";
    nameEl.textContent = data.name;
    codeEl.textContent = data.code;
    specialtyEl.textContent = data.specialty;
    personalityEl.textContent = data.personality;

    // Add neon color accents to details
    if (data.isGradient) {
      nameEl.style.color = "transparent";
      nameEl.style.backgroundImage = data.color;
      nameEl.style.webkitBackgroundClip = "text";
      nameEl.style.webkitTextFillColor = "transparent";
      nameEl.style.textShadow = "none";

      codeEl.style.color = "transparent";
      codeEl.style.backgroundImage = data.color;
      codeEl.style.webkitBackgroundClip = "text";
      codeEl.style.webkitTextFillColor = "transparent";
    } else {
      nameEl.style.color = data.color;
      nameEl.style.backgroundImage = "none";
      nameEl.style.webkitBackgroundClip = "initial";
      nameEl.style.webkitTextFillColor = "initial";
      nameEl.style.textShadow = `0 0 10px ${data.color}88`;

      codeEl.style.color = data.color;
      codeEl.style.backgroundImage = "none";
      codeEl.style.webkitBackgroundClip = "initial";
      codeEl.style.webkitTextFillColor = "initial";
    }

    // Change Talk button color class
    if (data.isGradient) {
      talkBtn.style.border = "1px solid transparent";
      talkBtn.style.color = "#f97316";
      talkBtn.style.background = `linear-gradient(rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.8)) padding-box, ${data.color} border-box`;
      talkBtn.onmouseenter = () => {
        talkBtn.style.background = data.color;
        talkBtn.style.color = "#030712";
        talkBtn.style.boxShadow = `0 0 15px rgba(249, 115, 22, 0.4)`;
      };
      talkBtn.onmouseleave = () => {
        talkBtn.style.color = "#f97316";
        talkBtn.style.background = `linear-gradient(rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.8)) padding-box, ${data.color} border-box`;
        talkBtn.style.boxShadow = "none";
      };
    } else {
      talkBtn.style.border = "";
      talkBtn.style.backgroundColor = `${data.color}20`;
      talkBtn.style.borderColor = data.color;
      talkBtn.style.color = data.color;
      talkBtn.onmouseenter = () => {
        talkBtn.style.backgroundColor = data.color;
        talkBtn.style.color = "#030712";
        talkBtn.style.boxShadow = `0 0 15px ${data.color}`;
      };
      talkBtn.onmouseleave = () => {
        talkBtn.style.backgroundColor = `${data.color}20`;
        talkBtn.style.color = data.color;
        talkBtn.style.boxShadow = "none";
      };
    }

    // Set initial dialog and load logs (with fade/typewriter effect)
    const dialogIdx = dialogueIndexes[charId];
    bubbleTextEl.textContent = `"${data.dialogues[dialogIdx]}"`;

    // Render Stats
    statsContainer.innerHTML = "";
    data.stats.forEach((stat, i) => {
      const statRow = document.createElement("div");
      statRow.className = "space-y-1";
      statRow.innerHTML = `
        <div class="flex justify-between text-xs font-mono">
          <span class="text-slate-400">${stat.name}</span>
          <span class="font-bold text-white">${stat.value}%</span>
        </div>
        <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-white/5">
          <div class="h-full rounded-full transition-all duration-1000 ease-out" 
               style="width: 0%; background: ${data.isGradient ? data.color : data.color}; box-shadow: 0 0 8px ${data.isGradient ? '#f9731688' : data.color}" 
               data-target-width="${stat.value}%">
          </div>
        </div>
      `;
      statsContainer.appendChild(statRow);
    });

    // Animate progress bars after appending
    setTimeout(() => {
      statsContainer.querySelectorAll("[data-target-width]").forEach(bar => {
        bar.style.width = bar.getAttribute("data-target-width");
      });
    }, 100);

    // Render Logs with simple typing effect simulator
    logsContainer.innerHTML = "";
    data.logs.forEach((log, index) => {
      const logEl = document.createElement("div");
      logEl.className = "text-xs font-mono text-slate-400 leading-relaxed";
      logsContainer.appendChild(logEl);
      
      // Animate character typing
      let charIdx = 0;
      function type() {
        if (charIdx < log.length) {
          logEl.textContent += log.charAt(charIdx);
          charIdx++;
          const t = setTimeout(type, 15);
          selectTimeoutsList.push(t);
        }
      }
      // Delay each log line
      const t = setTimeout(type, index * 300);
      selectTimeoutsList.push(t);
    });

    // Talk button click listener
    talkBtn.onclick = () => {
      // Waveform reaction
      joltWaveform();

      // Increment dialogue index
      dialogueIndexes[charId] = (dialogueIndexes[charId] + 1) % data.dialogues.length;
      const nextDialogIdx = dialogueIndexes[charId];
      
      // Bubble transition
      bubbleTextEl.style.opacity = "0";
      bubbleTextEl.style.transform = "translateY(5px)";
      setTimeout(() => {
        bubbleTextEl.textContent = `"${data.dialogues[nextDialogIdx]}"`;
        bubbleTextEl.style.opacity = "1";
        bubbleTextEl.style.transform = "translateY(0px)";
      }, 200);

      // Dynamic system log insertion
      const randomSystemLogs = [
        `[COMMS] Package sent to ${data.name}. Sync rate: 99.8%.`,
        `[NEURAL] Heartbeat echo detected.`,
        `[AUDIO] Speech synthesis rendering packet complete.`,
        `[LOG] Interaction counter updated: +1.`,
        `[EMOTION] Local node mood matrix adjusted.`
      ];
      const logText = randomSystemLogs[Math.floor(Math.random() * randomSystemLogs.length)];
      const logEl = document.createElement("div");
      logEl.className = "text-xs font-mono text-slate-500 italic mt-1 border-l border-cyan-500/20 pl-2";
      logEl.textContent = logText;
      logsContainer.appendChild(logEl);
      
      // Auto-scroll logs
      logsContainer.scrollTop = logsContainer.scrollHeight;
    };

    // Render Description & Role
    const descEl = document.getElementById("showcase-description");
    const roleEl = document.getElementById("showcase-role");
    if (descEl) descEl.textContent = data.description || "";
    if (roleEl) roleEl.textContent = data.role || "";

    // Render Relationships
    const relsContainer = document.getElementById("showcase-relationships");
    if (relsContainer) {
      relsContainer.innerHTML = "";
      Object.entries(data.relationships).forEach(([targetId, relationText]) => {
        const targetData = characterData[targetId];
        if (!targetData) return;
        
        const relCard = document.createElement("div");
        relCard.className = "p-3 rounded-lg bg-slate-900/40 border border-white/5 flex gap-3 items-start hover:border-cyan-500/30 transition-all duration-300";
        
        // Check for Aizia text color fallback gradient or specific styling
        const nameColor = targetId === 'aizia' ? '#f97316' : targetData.color;
        
        relCard.innerHTML = `
          <div class="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 aspect-square">
            <img src="${targetData.image}" class="w-full h-full object-cover" alt="${targetData.name}">
          </div>
          <div class="space-y-0.5">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-orbitron font-bold" style="color: ${nameColor}">${targetData.name}</span>
              <span class="text-[8px] font-mono text-slate-500 font-bold uppercase">${targetData.code.split(" - ")[1]}</span>
            </div>
            <p class="text-[11px] text-slate-400 font-space leading-relaxed">${relationText}</p>
          </div>
        `;
        relsContainer.appendChild(relCard);
      });
    }

    // Swap views back
    if (skeletonEl) {
      skeletonEl.classList.add("hidden");
    }
    syncBorder.classList.remove("hidden");
    
    // Trigger smooth fade-in
    setTimeout(() => {
      syncBorder.classList.remove("opacity-0");
      syncBorder.classList.add("opacity-100");
    }, 50);

  }, 950);
}

let waveInterval;
function initVoiceWaveform() {
  const bars = document.querySelectorAll(".wave-bar");
  if (!bars.length) return;

  waveInterval = setInterval(() => {
    bars.forEach(bar => {
      // Gentle floating heights
      const height = Math.random() * 80 + 20; // 20% to 100%
      bar.style.height = `${height}%`;
    });
  }, 100);
}

function joltWaveform() {
  const bars = document.querySelectorAll(".wave-bar");
  bars.forEach(bar => {
    bar.style.height = "100%";
    bar.classList.add("bg-white");
    setTimeout(() => {
      bar.classList.remove("bg-white");
    }, 300);
  });
}

/* ==========================================
   3. Scroll Animations (Fade-in on scroll)
   ========================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Animates once
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // Timeline highlights
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("timeline-active");
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
}

/* ==========================================
   4. Mini-Documentation Drawer (Terminal)
   ========================================== */
function initTerminalDrawer() {
  const docButtons = document.querySelectorAll(".open-docs-btn");
  const closeBtn = document.getElementById("close-docs-btn");
  const drawer = document.getElementById("terminal-drawer");
  const drawerOverlay = document.getElementById("terminal-drawer-overlay");

  if (!drawer || !drawerOverlay) return;

  function openDrawer() {
    drawer.classList.remove("translate-x-full");
    drawerOverlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    
    // Simulate boot sequence typing in the doc terminal
    const docLogs = document.getElementById("doc-terminal-logs");
    if (docLogs && docLogs.children.length === 0) {
      const logs = [
        "Initializing AI-RA Core Documentation Parser...",
        "Fetching data indices from batches B01 to B05...",
        "Decryption protocol matching security key... COMPLETED.",
        "Parsing local Markdown specs... Loaded.",
        "System: Access Granted. Welcome, Developer."
      ];
      
      logs.forEach((log, idx) => {
        const item = document.createElement("div");
        item.className = "text-slate-400 font-mono text-xs";
        docLogs.appendChild(item);
        let c = 0;
        function type() {
          if (c < log.length) {
            item.textContent += log.charAt(c);
            c++;
            setTimeout(type, 10);
          }
        }
        setTimeout(type, idx * 200);
      });
    }
  }

  function closeDrawer() {
    drawer.classList.add("translate-x-full");
    drawerOverlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  }

  docButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  closeBtn.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);

  // Esc key closure
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.classList.contains("translate-x-full")) {
      closeDrawer();
    }
  });
}

/* ==========================================
   5. Dynamic Lightbox
   ========================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.getElementById("close-lightbox-btn");

  if (!lightbox || !lightboxImg) return;

  const captions = {
    airi: {
      title: "Unit B05-AR1: AIRI",
      desc: "Airi interacting with floating cyan cryptographic syntax trees in the sandbox simulator."
    },
    aira: {
      title: "Unit B05-AR2: AIRA",
      desc: "Aira inspecting quantum routing pipelines and microcontrollers under dim purple labs."
    },
    airu: {
      title: "Unit B05-AR3: AIRU",
      desc: "Airu compiling computational science vectors with high-precision neural glass arrays."
    },
    aire: {
      title: "Unit B05-AR4: AIRE",
      desc: "Aire stabilizing the biological life support matrix inside the companion terrarium module."
    },
    airo: {
      title: "Unit B05-AR5: AIRO",
      desc: "Airo assembling a heavy mechanical frame in the garage while tuning audio codecs."
    },
    aizia: {
      title: "Unit B05-AR6: AIZIA",
      desc: "Aizia monitoring neural connections and data packets through active firewall overlays."
    }
  };

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("src") || item.querySelector("img").getAttribute("src");
      const charId = item.getAttribute("data-char-id");
      
      lightboxImg.src = src;
      
      if (captions[charId]) {
        lightboxTitle.textContent = captions[charId].title;
        lightboxDesc.textContent = captions[charId].desc;
      } else {
        lightboxTitle.textContent = "AI-RA V System Preview";
        lightboxDesc.textContent = "High fidelity robotics diagnostic camera feed.";
      }

      lightbox.classList.remove("opacity-0", "pointer-events-none");
      document.body.classList.add("overflow-hidden");
    });
  });

  function closeLightbox() {
    lightbox.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest("#lightbox-close-wrapper")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("opacity-0")) {
      closeLightbox();
    }
  });
}

/* ==========================================
   6. System Uptime Simulator
   ========================================== */
function initSystemUptime() {
  const uptimeEl = document.getElementById("system-uptime");
  if (!uptimeEl) return;

  const startTime = Date.now() - (Math.random() * 500000 + 1000000); // Randomized start

  setInterval(() => {
    const elapsed = Date.now() - startTime;
    const hrs = Math.floor(elapsed / 3600000).toString().padStart(3, "0");
    const mins = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, "0");
    const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, "0");
    const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, "0");
    
    uptimeEl.textContent = `${hrs}:${mins}:${secs}.${ms}`;
  }, 33);
}

/* ==========================================
   7. Mobile Menu Handler
   ========================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const menuCloseBtn = document.getElementById("mobile-menu-close");
  const menuPanel = document.getElementById("mobile-menu-panel");
  const menuLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !menuPanel) return;

  function toggleMenu() {
    menuPanel.classList.toggle("translate-x-full");
    document.body.classList.toggle("overflow-hidden");
  }

  menuBtn.addEventListener("click", toggleMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener("click", toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuPanel.classList.add("translate-x-full");
      document.body.classList.remove("overflow-hidden");
    });
  });
}
