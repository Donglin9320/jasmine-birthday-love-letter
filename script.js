const experience = document.getElementById("experience");
const openButton = document.getElementById("openLetter");
const letterWorld = document.getElementById("letterWorld");
const musicToggle = document.getElementById("musicToggle");
const birthdayMusic = document.getElementById("birthdayMusic");
const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const carousel = document.getElementById("carousel");

const memories = [
  {
    label: "Chapter 01",
    title: "我们初次约会",
    text: "第一次见面的时候，我就觉得 Jasmine 漂亮得让人移不开眼。那天有樱花，有微风，也有在 Social Corner 餐桌前慢慢熟悉彼此的温柔时刻；后来她喜欢的提拉米苏，像是把那一天的甜意悄悄留了下来。",
    images: [
      {
        src: "assets/images/chapter-01-first-date/IMG_20260403_141902.jpg",
        fallback: "初次约会 01",
      },
      {
        src: "assets/images/chapter-01-first-date/IMG_20260403_180827.jpg",
        fallback: "Social Corner 晚餐",
      },
    ],
  },
  {
    label: "Chapter 02",
    title: "我们的第一次踏青",
    text: "那一次 trail 走得很慢，却聊得很深。我们分享价值观，也聊起人生里真正重要的东西；我把一束玫瑰送到你手里时，好像也把我想认真靠近你的心意，一起交给了那天的风。",
    images: [
      {
        src: "assets/images/chapter-02-spring-outing/IMG_20260405_215114.jpg",
        fallback: "森林 trail",
      },
      {
        src: "assets/images/chapter-02-spring-outing/微信图片_20260405235208_1596_2642.jpg",
        fallback: "送给你的玫瑰",
      },
    ],
  },
  {
    label: "Chapter 03",
    title: "Granville Island 的回忆",
    text: "Granville Island 的阳光、海风和桥下的水面，都把那一天照得很明亮。站在城市和海之间拍下合照的时候，我记住的不只是风景，还有你在我身边的踏实感。",
    images: [
      {
        src: "assets/images/chapter-03-granville-island/IMG_20260502_161840.jpg",
        fallback: "Granville Island 01",
      },
      {
        src: "assets/images/chapter-03-granville-island/mmexport1777795928239.jpg",
        fallback: "Granville Island 02",
      },
    ],
  },
  {
    label: "Chapter 04",
    title: "一起看 Charlie Puth 演唱会",
    text: "在正式在一起之前，我们已经一起收藏了那一晚的旋律。演唱会的灯光、人声和你坐在我身边的样子，都让我更清楚地听见了自己的心动。",
    images: [
      {
        src: "assets/images/chapter-04-charlie-puth/mmexport1778054574406.jpg",
        fallback: "Charlie Puth 演唱会 01",
      },
      {
        src: "assets/images/chapter-04-charlie-puth/mmexport1778054580804.jpg",
        fallback: "Charlie Puth 演唱会 02",
      },
    ],
  },
  {
    label: "Chapter 05",
    title: "5.20 当天的回忆",
    text: "5.20 不再只是一个浪漫的日期，而是我们认真把彼此放进心里的证明。那天的合照、靠近和亲吻，都像在告诉我：有些喜欢，终于可以被温柔又确定地说出口。",
    images: [
      {
        src: "assets/images/chapter-05-520/mmexport1779337240245.jpg",
        fallback: "5.20 回忆 01",
      },
      {
        src: "assets/images/chapter-05-520/mmexport1779337263909.jpg",
        fallback: "5.20 回忆 02",
      },
    ],
  },
];

let currentSlide = 0;
let slideTimer = null;
let audioContext = null;
let ambientNodes = [];
let usingGeneratedMusic = false;
let musicPlaying = false;

birthdayMusic.volume = 0.42;

function openLetter() {
  if (experience.classList.contains("is-open")) return;

  experience.classList.add("is-opening");
  burstHearts();
  startMusic();

  window.setTimeout(() => {
    experience.classList.add("is-open");
    letterWorld.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 980);
}

function burstHearts() {
  const rect = openButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 34; i += 1) {
    const heart = document.createElement("span");
    const size = 10 + Math.random() * 16;
    heart.className = "heart";
    heart.style.left = `${centerX + (Math.random() - 0.5) * rect.width * 0.66}px`;
    heart.style.top = `${centerY + (Math.random() - 0.2) * rect.height * 0.35}px`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.background = Math.random() > 0.45 ? "#c86678" : "#f1b2a2";
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
    heart.style.animationDelay = `${Math.random() * 0.32}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2200);
  }
}

async function startMusic() {
  if (musicPlaying) return;

  try {
    birthdayMusic.load();
    await birthdayMusic.play();
    musicPlaying = true;
    usingGeneratedMusic = false;
    updateMusicButton();
    return;
  } catch {
    startGeneratedAmbience();
  }
}

function startGeneratedAmbience() {
  if (musicPlaying) return;

  audioContext = audioContext || new AudioContext();
  const master = audioContext.createGain();
  master.gain.value = 0.055;
  master.connect(audioContext.destination);

  const notes = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25];

  const intervalId = window.setInterval(() => {
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const note = notes[Math.floor(Math.random() * notes.length)];

    osc.type = "sine";
    osc.frequency.setValueAtTime(note, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + 2.9);
  }, 1450);

  ambientNodes = [master, intervalId];
  usingGeneratedMusic = true;
  musicPlaying = true;
  updateMusicButton();
}

function stopMusic() {
  birthdayMusic.pause();

  if (usingGeneratedMusic) {
    const [master, intervalId] = ambientNodes;
    window.clearInterval(intervalId);
    if (master) {
      master.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
      window.setTimeout(() => master.disconnect(), 300);
    }
    ambientNodes = [];
  }

  musicPlaying = false;
  updateMusicButton();
}

function updateMusicButton() {
  musicToggle.classList.toggle("is-playing", musicPlaying);
  musicToggle.querySelector(".music-label").textContent = musicPlaying ? "播放中" : "音乐";
}

function showPhotoPlaceholder(frame, photo) {
  const mark = document.createElement("div");
  mark.className = "placeholder-mark";
  mark.textContent = photo.fallback;
  frame.appendChild(mark);
}

function attachPhoto(frame, memory, photo) {
  const img = document.createElement("img");

  frame.style.setProperty("--photo-src", `url("${photo.src}")`);
  img.src = photo.src;
  img.alt = `${memory.title} - ${photo.fallback}`;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => {
    img.remove();
    showPhotoPlaceholder(frame, photo);
  }, { once: true });

  frame.appendChild(img);
}

function buildCarousel() {
  slidesEl.innerHTML = "";
  dotsEl.innerHTML = "";

  memories.forEach((memory, index) => {
    const slide = document.createElement("article");
    slide.className = "slide";

    const photoGrid = document.createElement("div");
    photoGrid.className = "memory-photos";

    memory.images.forEach((photo) => {
      const frame = document.createElement("div");
      frame.className = "photo-frame";
      attachPhoto(frame, memory, photo);
      photoGrid.appendChild(frame);
    });

    const note = document.createElement("div");
    note.className = "slide-note";
    note.innerHTML = `
      <span>${memory.label}</span>
      <h3>${memory.title}</h3>
      <p>${memory.text}</p>
    `;

    slide.append(photoGrid, note);
    slidesEl.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `查看第 ${index + 1} 个回忆`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsEl.appendChild(dot);
  });

  updateCarousel();
  startSlideTimer();
}

function goToSlide(index) {
  currentSlide = (index + memories.length) % memories.length;
  updateCarousel();
  startSlideTimer();
}

function updateCarousel() {
  slidesEl.style.transform = `translateX(${-currentSlide * 100}%)`;
  [...dotsEl.children].forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

function startSlideTimer() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5200);
}

openButton.addEventListener("click", openLetter);

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

carousel.querySelector(".prev").addEventListener("click", () => goToSlide(currentSlide - 1));
carousel.querySelector(".next").addEventListener("click", () => goToSlide(currentSlide + 1));

buildCarousel();
