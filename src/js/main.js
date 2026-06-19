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
    image: "src/assets/images/Airi.png",
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
    image: "src/assets/images/Aira.png",
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
    image: "src/assets/images/Airu.png",
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
    image: "src/assets/images/Aire.png",
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
    image: "src/assets/images/Airo.png",
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
  }
};

let dialogueIndexes = { airi: 0, aira: 0, airu: 0, aire: 0, airo: 0 };
let currentCharacterId = "airi";

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

  // Glow classes update (for container border glow)
  const syncBorder = document.getElementById("showcase-sync-border");
  syncBorder.style.borderColor = data.color;
  syncBorder.style.boxShadow = `0 0 25px ${data.color}33`; // 20% opacity hex glow

  // Update Text contents
  imageEl.src = data.image;
  imageEl.alt = data.name + " Illustration";
  nameEl.textContent = data.name;
  codeEl.textContent = data.code;
  specialtyEl.textContent = data.specialty;
  personalityEl.textContent = data.personality;

  // Add neon color accents to details
  nameEl.style.color = data.color;
  nameEl.style.textShadow = `0 0 10px ${data.color}88`;
  codeEl.style.color = data.color;

  // Change Talk button color class
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
             style="width: 0%; background: ${data.color}; box-shadow: 0 0 8px ${data.color}" 
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
        setTimeout(type, 15);
      }
    }
    // Delay each log line
    setTimeout(type, index * 300);
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
