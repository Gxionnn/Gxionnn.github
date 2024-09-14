const canvas = document.getElementById("heartCanvas");
const stage = new createjs.Stage(canvas);

// Sesuaikan ukuran canvas sesuai dengan ukuran layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
let maxHearts = 0; // Awalnya tidak ada hati

// Fungsi untuk membuat bentuk hati
function createHeart() {
  const heart = new createjs.Shape();
  heart.graphics.beginFill("#FF69B4");

  // Gambar bentuk hati menggunakan bezierCurveTo untuk membuat kurva hati
  heart.graphics.moveTo(0, 0);
  heart.graphics.bezierCurveTo(-12, -12, -24, 0, 0, 12); // Kurva kiri hati
  heart.graphics.bezierCurveTo(24, 0, 12, -12, 0, 0);    // Kurva kanan hati

  heart.regX = 0;
  heart.regY = 6; // Menyesuaikan titik pusat hati agar posisi jatuh tepat

  // Set posisi acak untuk setiap hati, dimulai dari bawah layar
  heart.x = Math.random() * canvas.width;
  heart.y = canvas.height + heart.regY; // Mulai dari bawah layar

  // Perbesar ukuran hati
  heart.scaleX = heart.scaleY = Math.random() * 1 + 1; // Skala lebih besar: 1 hingga 2 kali ukuran
  heart.alpha = Math.random() * 0.8 + 0.2;

  // Tambahkan variabel tambahan untuk gerakan ubur-ubur
  heart.speedY = Math.random() * 1 + 0.5; // Kecepatan vertikal (lambat)
  heart.oscillationSpeed = Math.random() * 0.05 + 0.02; // Kecepatan osilasi
  heart.oscillationRange = Math.random() * 30 + 10; // Amplitudo osilasi (pergerakan kiri-kanan)
  heart.initialX = heart.x; // Simpan posisi awal di sumbu X

  // Tambahkan hati ke stage dan simpan dalam array
  stage.addChild(heart);
  hearts.push(heart);
}

// Fungsi untuk menambah jumlah hati secara bertahap
function increaseHeartsOverTime() {
  setInterval(() => {
    if (maxHearts < 100) { // Atur batas maksimum hati, misalnya 50 hati
      maxHearts += 10; // Tambah dua hati setiap kali
      for (let i = 0; i < 10; i++) { // Tambah hati sebanyak 2 setiap kali interval
        createHeart();
      }
    }
  }, 1000); // Tambah hati setiap detik
}

// Tambahkan event listener untuk animasi
createjs.Ticker.framerate = 60;  // Set frame rate
createjs.Ticker.addEventListener("tick", tick);

// Fungsi untuk membuat animasi hati bergerak seperti ubur-ubur
function tick() {
  hearts.forEach((heart) => {
    // Gerakan vertikal yang lambat
    heart.y -= heart.speedY;  // Geser hati perlahan ke atas

    // Gerakan horizontal osilasi (bergerak ke kanan-kiri secara sinusoidal)
    heart.x = heart.initialX + Math.sin(createjs.Ticker.getTicks() * heart.oscillationSpeed) * heart.oscillationRange;

    // Jika hati keluar dari layar (di atas), kembali ke bawah
    if (heart.y < -heart.regY) {
      heart.y = canvas.height + heart.regY;  // Mulai lagi dari bawah
      heart.x = Math.random() * canvas.width;  // Posisi acak untuk X
      heart.initialX = heart.x;  // Reset posisi awal osilasi
    }
  });

  stage.update();  // Perbarui stage agar animasi terlihat
}

// Mulai menambah hati secara bertahap
increaseHeartsOverTime();
