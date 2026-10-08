const CONFIG = {

  music: {
    src: "music/romanticMusic.mp3",
    volume: 0.5
  },

  landing: {
    kicker: "for the one who has my heart",
    title: "Hey My Love ❤️",
    subtitle: "I made something special just for you...",
    button: "Open Your Surprise 💌"
  },

  message: {
    text: "To the most special person in my life ❤️\nI don't know if words can ever explain how much you mean to me.\nBut I wanted to create this little corner of the internet just for you.\nBecause you deserve something as beautiful and special as you are."
  },

  gallery: {
    title: "Our Little Memories 📸",
    photos: [
      { src: "images/image1.jpg", caption: "Our first beautiful memory ❤️" },
      { src: "images/image2.jpg", caption: "The smile I can never forget" },
      { src: "images/image3.jpg", caption: "One of my favorite moments" },
      { src: "images/image4.jpg", caption: "Just you being you ❤️" },
      { src: "images/image5.jpg", caption: "Every moment with you is special" },
      { src: "images/image6.jpg", caption: "More memories waiting to be made..." }
    ]
  },

  timeline: {
    title: "Our Story ❤️",
    items: [
      "That first conversation",
      "The moment you became special",
      "All those little moments",
      "The memories we created",
      "And everything that's still waiting for us..."
    ]
  },

  reasons: {
    title: "Reasons I Love You",
    items: [
      "Your Smile 😊",
      "Your Kind Heart ❤️",
      "The Way You Understand Me",
      "Your Beautiful Personality",
      "The Little Things You Do",
      "Simply Because You're You ❤️"
    ]
  },

  question: {
    text: "Do you know how much I love you? ❤️",
    yesLabel: "Yes 😌",
    noLabel: "No 🥺",
    yesResponse: "Good... because I'm going to keep loving you even more ❤️",
    noResponse: "Then I guess I'll have to remind you every single day ❤️"
  },

  final: {
    intro: "And finally...",
    love: "I LOVE YOU ❤️",
    sub: "Today, tomorrow, and all the beautiful days waiting for us.",
    ask: "Will you keep making beautiful memories with me? 💕"
  }

};

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("landing-kicker").textContent = CONFIG.landing.kicker;
  document.getElementById("landing-title").textContent = CONFIG.landing.title;
  document.getElementById("landing-subtitle").textContent = CONFIG.landing.subtitle;
  document.getElementById("open-btn-label").textContent = CONFIG.landing.button;
  document.getElementById("message-text").textContent = CONFIG.message.text;
  document.getElementById("gallery-title").textContent = CONFIG.gallery.title;
  document.getElementById("timeline-title").textContent = CONFIG.timeline.title;
  document.getElementById("reasons-title").textContent = CONFIG.reasons.title;
  document.getElementById("question-text").textContent = CONFIG.question.text;
  document.getElementById("btn-yes").textContent = CONFIG.question.yesLabel;
  document.getElementById("btn-no").textContent = CONFIG.question.noLabel;
  document.getElementById("final-intro").textContent = CONFIG.final.intro;
  document.getElementById("final-sub").textContent = CONFIG.final.sub;
  document.getElementById("final-ask").textContent = CONFIG.final.ask;

  const galleryGrid = document.getElementById("gallery-grid");
  CONFIG.gallery.photos.forEach((photo, i) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <div class="photo-placeholder">❤</div>
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy" onerror="this.style.display='none'">
      <div class="photo-caption">${photo.caption}</div>
    `;
    galleryGrid.appendChild(card);
  });

  const timelineList = document.getElementById("timeline-list");
  CONFIG.timeline.items.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.innerHTML = `
      <span class="timeline-index">Chapter ${i + 1}</span>
      <span class="timeline-text">${item}</span>
    `;
    timelineList.appendChild(el);
  });

  const reasonsGrid = document.getElementById("reasons-grid");
  CONFIG.reasons.items.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "reason-card";
    el.style.transitionDelay = `${i * 0.1}s`;
    el.textContent = item;
    reasonsGrid.appendChild(el);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".section-title, .photo-card, .timeline-item, .reason-card")
    .forEach(el => revealObserver.observe(el));

  const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.getElementById("message-text").classList.add("revealed");
      }
    });
  }, { threshold: 0.4 });
  messageObserver.observe(document.getElementById("screen-message"));

  const openBtn = document.getElementById("open-btn");
  openBtn.addEventListener("click", () => {
    document.getElementById("screen-message").scrollIntoView({ behavior: "smooth" });
    playMusic();
  });

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const responseEl = document.getElementById("question-response");

  btnYes.addEventListener("click", () => {
    btnYes.classList.add("chosen");
    btnNo.classList.remove("chosen");
    responseEl.textContent = CONFIG.question.yesResponse;
    responseEl.classList.remove("show");
    void responseEl.offsetWidth;
    responseEl.classList.add("show");
    burstHearts(24);
  });

  btnNo.addEventListener("click", () => {
    btnNo.classList.add("chosen");
    btnYes.classList.remove("chosen");
    responseEl.textContent = CONFIG.question.noResponse;
    responseEl.classList.remove("show");
    void responseEl.offsetWidth;
    responseEl.classList.add("show");
  });

  let finalPlayed = false;
  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !finalPlayed) {
        finalPlayed = true;
        runFinalSequence();
      }
    });
  }, { threshold: 0.5 });
  finalObserver.observe(document.getElementById("screen-final"));

  function runFinalSequence() {
    const intro = document.getElementById("final-intro");
    const love = document.getElementById("final-love");
    const sub = document.getElementById("final-sub");
    const ask = document.getElementById("final-ask");
    const heart = document.getElementById("final-heart");

    setTimeout(() => intro.classList.add("show"), 200);

    setTimeout(() => {
      love.classList.add("show");
      typewriter(love, CONFIG.final.love, 70);
    }, 1600);

    const subDelay = 1600 + CONFIG.final.love.length * 70 + 500;
    setTimeout(() => sub.classList.add("show"), subDelay);
    setTimeout(() => ask.classList.add("show"), subDelay + 900);
    setTimeout(() => {
      heart.classList.add("show");
      confettiHearts(36);
    }, subDelay + 1600);
  }

  function typewriter(el, text, speed) {
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  const scrollCue = document.getElementById("scroll-cue");
  const appEl = document.getElementById("app");
  appEl.addEventListener("scroll", () => {
    scrollCue.classList.toggle("hide", appEl.scrollTop > 40);
  }, { passive: true });

  const audio = document.getElementById("bg-audio");
  audio.src = CONFIG.music.src;
  audio.volume = CONFIG.music.volume;

  const musicToggle = document.getElementById("music-toggle");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  let isPlaying = false;

  function playMusic() {
    audio.play().then(() => {
      isPlaying = true;
      iconPlay.style.display = "none";
      iconPause.style.display = "block";
    }).catch(() => {
      isPlaying = false;
    });
  }

  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
  }

  musicToggle.addEventListener("click", () => {
    if (isPlaying) pauseMusic();
    else playMusic();
  });

  const muteToggle = document.getElementById("mute-toggle");
  const iconUnmuted = document.getElementById("icon-unmuted");
  const iconMuted = document.getElementById("icon-muted");
  muteToggle.addEventListener("click", () => {
    audio.muted = !audio.muted;
    iconUnmuted.style.display = audio.muted ? "none" : "block";
    iconMuted.style.display = audio.muted ? "block" : "none";
  });

  initParticles();
  initFloatingHearts();

});

function burstHearts(count) {
  const layer = document.getElementById("floating-hearts");
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤";
    const size = 12 + Math.random() * 18;
    heart.style.fontSize = size + "px";
    heart.style.left = (10 + Math.random() * 80) + "%";
    heart.style.bottom = "40%";
    heart.style.animation = `riseFade ${3 + Math.random() * 2}s ease-out forwards`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 5500);
  }
}

function confettiHearts(count) {
  const layer = document.getElementById("confetti-layer");
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "confetti-heart";
    heart.textContent = "❤";
    const size = 10 + Math.random() * 20;
    heart.style.fontSize = size + "px";
    heart.style.left = Math.random() * 100 + "%";
    const duration = 4 + Math.random() * 3;
    heart.style.animationDuration = duration + "s";
    heart.style.animationDelay = (Math.random() * 1.2) + "s";
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + 1.5) * 1000);
  }
}

function initFloatingHearts() {
  const layer = document.getElementById("floating-hearts");
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.5; }
      100% { transform: translateY(-110vh) translateX(var(--drift)) rotate(20deg); opacity: 0; }
    }
    @keyframes riseFade {
      0% { transform: translateY(0) scale(0.8); opacity: 0; }
      15% { opacity: 1; }
      100% { transform: translateY(-60vh) scale(1.1); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤";
    const size = 10 + Math.random() * 16;
    heart.style.fontSize = size + "px";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    const duration = 10 + Math.random() * 8;
    heart.style.animation = `floatUp ${duration}s linear forwards`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 900);
  setInterval(spawnHeart, 1800);
}

function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let width, height, particles;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.6 + Math.random() * 1.8,
    baseAlpha: 0.15 + Math.random() * 0.35,
    speedY: 0.05 + Math.random() * 0.15,
    speedX: (Math.random() - 0.5) * 0.15,
    twinkleSpeed: 0.005 + Math.random() * 0.015,
    twinklePhase: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.twinklePhase += p.twinkleSpeed;
      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.twinklePhase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,190,180,${alpha})`;
      ctx.fill();
      p.y -= p.speedY;
      p.x += p.speedX;
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
