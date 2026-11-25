# DOKUMEN KEBUTUHAN PRODUK
# SEBUAH PERTANYAAN UNTUKMU
## Website Interaktif untuk Mengungkapkan Perasaan dengan Animasi Tiga Dimensi

**Versi:** 1.0  
**Jenis Aplikasi:** Website Interaktif Personal  
**Bahasa:** Bahasa Indonesia  
**Gaya Penulisan:** Sastra Indonesia Modern  
**Teknologi Animasi:** Three.js  
**Kerangka Pengembangan:** React dan TypeScript

---

# 1. GAMBARAN UMUM

## 1.1 Deskripsi Produk

**Sebuah Pertanyaan untukmu** merupakan website personal yang dirancang untuk menyampaikan perasaan kepada seseorang dan mengajaknya memulai sebuah hubungan.

Website ini bukan sekadar halaman yang menampilkan pertanyaan dan dua tombol jawaban. Website harus menjadi sebuah pengalaman visual yang membawa pengunjung melewati rangkaian adegan romantis, seolah-olah sedang menyaksikan sebuah kisah pendek yang dibuat khusus untuk dirinya.

Pengalaman dimulai dengan suasana taman yang diselimuti cahaya senja. Kelopak bunga bergerak mengikuti angin, partikel cahaya berpendar lembut, dan kamera perlahan memperlihatkan sebuah pesan yang telah lama ingin disampaikan.

Cerita kemudian bergerak menuju satu pertanyaan sederhana:

**"Maukah kamu menjadi kekasihku?"**

Pengunjung dapat memilih salah satu dari dua jawaban. Setiap jawaban akan membawa mereka menuju pengalaman akhir yang berbeda melalui logika percabangan IF–ELSE.

Seluruh pengalaman visual utama dibangun menggunakan animasi tiga dimensi Three.js.

## 1.2 Tujuan Aplikasi

1. Menyampaikan perasaan dengan cara yang personal dan berkesan.
2. Menghadirkan pengalaman romantis melalui animasi tiga dimensi.
3. Menyusun pesan seperti sebuah ungkapan dalam karya sastra Indonesia.
4. Memberikan kebebasan kepada pengunjung untuk menentukan jawabannya.
5. Menjaga aplikasi tetap sederhana dan tidak dipenuhi fitur yang tidak diperlukan.

## 1.3 Prinsip Pengembangan

Aplikasi harus berpegang pada tiga prinsip utama:

**Kesederhanaan:** hanya memiliki satu alur cerita, satu pertanyaan, dan dua kemungkinan jawaban.

**Keindahan:** mengutamakan komposisi visual, pencahayaan, gerakan kamera, dan animasi yang terencana.

**Kejujuran:** menyampaikan perasaan dengan hangat tanpa memaksa pengunjung menerima ajakan tersebut.

---

# 2. KONSEP CERITA DAN PENGALAMAN

Website harus terasa seperti sebuah kisah pendek yang disampaikan secara perlahan.

Jangan membuat pengunjung langsung disambut dengan pertanyaan utama. Berikan sedikit pengantar agar suasana emosional terbentuk secara alami.

Urutan pengalaman:

1. Pengunjung memasuki sebuah suasana romantis tiga dimensi.
2. Sebuah kalimat pembuka muncul.
3. Pengunjung diajak melanjutkan cerita.
4. Beberapa ungkapan perasaan ditampilkan.
5. Kamera mengarahkan perhatian menuju bagian utama.
6. Pertanyaan disampaikan.
7. Pengunjung memilih jawaban.
8. Sistem menampilkan akhir cerita berdasarkan jawaban tersebut.

Tidak perlu halaman utama tambahan, daftar menu, atau bagian-bagian lain yang tidak berhubungan dengan alur cerita.

Seluruh perjalanan harus terasa sebagai satu rangkaian yang utuh.

---

# 3. ARAH DESAIN DAN SUASANA VISUAL

## 3.1 Gaya Visual

Gunakan perpaduan gaya:

- Elegan.
- Romantis.
- Minimalis.
- Sinematik.
- Puitis.
- Hangat.
- Modern.

Bayangkan sebuah taman pada penghujung senja, ketika cahaya matahari menyentuh kelopak bunga dengan warna keemasan. Udara terasa tenang, beberapa kelopak perlahan jatuh, dan seluruh suasana memberikan ruang bagi sebuah ungkapan untuk disampaikan.

Jangan menciptakan suasana seperti permainan anak-anak atau animasi kartun.

Hindari dekorasi berbentuk hati yang terlalu banyak, warna mencolok, dan gerakan yang tidak memiliki tujuan.

## 3.2 Palet Warna

| Elemen | Warna |
|---|---|
| Latar utama | #F8F3EF |
| Gading lembut | #F7F4EE |
| Putih hangat | #FFFEFB |
| Merah muda lembut | #E9C9CC |
| Mawar pudar | #BD9293 |
| Merah muda pucat | #F2DDE0 |
| Keemasan lembut | #C8B28E |
| Cokelat hangat | #79665E |
| Teks utama | #292824 |

Gunakan perpaduan warna yang lembut dan memiliki keselarasan.

Warna keemasan digunakan sebagai pantulan cahaya, bukan sebagai warna yang mendominasi seluruh tampilan.

## 3.3 Tipografi

Gunakan:
- Playfair Display atau Cormorant Garamond untuk judul.
- Inter atau Manrope untuk teks pendukung.
- Jenis huruf tulisan tangan sebagai aksen pada ungkapan tertentu.

Judul harus terlihat anggun, sedangkan isi pesan harus mudah dibaca.

Gunakan ruang kosong yang cukup agar setiap kalimat memiliki kesan dan tidak terlihat sesak.

## 3.4 Gaya Bahasa

Seluruh kalimat yang muncul pada website wajib menggunakan Bahasa Indonesia.

Gunakan gaya sastra Indonesia modern dengan ciri-ciri:

- Puitis tetapi tetap mudah dimengerti.
- Romantis tanpa terdengar berlebihan.
- Memiliki pilihan kata yang indah dan alami.
- Tidak menggunakan ungkapan yang terasa seperti hasil terjemahan bahasa asing.
- Tidak menggunakan bahasa gaul yang berlebihan.
- Tidak menggunakan kalimat yang kaku seperti formulir.
- Tidak menggunakan kata-kata yang terlalu rumit hanya demi terlihat puitis.

Gunakan metafora yang dekat dengan kehidupan sehari-hari, seperti senja, hujan, waktu, langkah, perjalanan, bunga, dan pertemuan.

Contoh gaya penulisan:

"Di antara begitu banyak pertemuan yang mungkin terjadi dalam hidup, aku bersyukur semesta mempertemukan langkah kita."

Jangan memenuhi seluruh halaman dengan puisi panjang. Setiap kalimat harus memiliki tujuan dan memberikan ruang bagi pengunjung untuk menikmati suasana.

---

# 4. KONSEP ANIMASI TIGA DIMENSI

## 4.1 Ketentuan Utama

**Seluruh pengalaman visual harus dibangun dengan animasi tiga dimensi menggunakan Three.js.**

Animasi bukan sekadar hiasan pada latar belakang. Seluruh adegan, pergerakan kamera, pencahayaan, partikel, dan objek dekoratif harus menjadi bagian dari satu lingkungan tiga dimensi yang saling terhubung.

Gunakan:
- Three.js sebagai mesin utama tampilan tiga dimensi.
- React Three Fiber untuk menghubungkan Three.js dengan React.
- Drei untuk membantu pengelolaan objek dan lingkungan tiga dimensi.
- GSAP untuk mengatur urutan dan waktu animasi.
- Shader khusus apabila diperlukan untuk menghasilkan efek visual yang lebih halus.

Teks dan tombol boleh menggunakan unsur antarmuka HTML agar tetap tajam, mudah dibaca, dan mudah digunakan. Namun, keduanya harus menyatu dengan lingkungan tiga dimensi.

Jangan membuat seluruh aplikasi hanya berupa tulisan HTML dengan gambar tiga dimensi sebagai latar belakang.

## 4.2 Lingkungan Tiga Dimensi

Bangun satu lingkungan utama berupa taman romantis pada penghujung senja.

Elemen lingkungan:

- Hamparan taman dengan rumput lembut.
- Bunga-bunga dengan warna merah muda dan putih.
- Pohon atau ranting sebagai elemen latar.
- Kelopak bunga yang terbawa angin.
- Partikel cahaya kecil.
- Cahaya matahari keemasan.
- Bayangan pepohonan yang jatuh ke permukaan taman.
- Kabut tipis di kejauhan jika diperlukan.

Lingkungan harus terasa luas dan memiliki kedalaman.

Jangan membuat taman terlalu penuh. Ruang kosong merupakan bagian penting dari komposisi visual.

## 4.3 Pencahayaan

Gunakan sistem pencahayaan yang mendukung suasana senja.

Atur agar:
- Cahaya utama datang dari arah samping atau belakang objek.
- Bunga memiliki pantulan cahaya lembut.
- Bayangan terlihat alami.
- Partikel cahaya tampak halus.
- Warna lingkungan memiliki nuansa hangat.
- Kedalaman ruang terlihat jelas.

Gunakan pencahayaan dan bayangan secara terukur agar hasilnya tetap indah tanpa membebani perangkat.

---

# 5. RANGKAIAN ADEGAN

## 5.1 Adegan Pertama — Sebuah Pertemuan

Ketika pengunjung membuka website, tampilkan lingkungan tiga dimensi berupa taman pada waktu senja.

Kamera berada agak jauh dari objek utama.

Terlihat beberapa bunga bergerak perlahan tertiup angin. Kelopak bunga jatuh satu per satu. Cahaya matahari menembus sela-sela pepohonan.

Gerakan lingkungan harus terasa alami, bukan seperti sebuah gambar yang diberi efek bergerak.

Setelah beberapa saat, munculkan tulisan:

**"Hai, kamu..."**

Kemudian tampilkan kalimat:

"Ada sesuatu yang telah lama ingin kusampaikan. Barangkali bukan perkara besar, tetapi cukup berarti bagiku untuk menemukan cara yang istimewa dalam mengatakannya."

Tombol:

**"Mari Dengarkan"**

Ketika tombol ditekan:
- Kamera bergerak perlahan mendekati bagian tengah taman.
- Kelopak bunga bergerak mengikuti arah kamera.
- Cahaya berubah secara lembut.
- Tulisan menghilang melalui animasi.
- Adegan berikutnya mulai terbentuk.

Jangan sekadar mengganti tampilan secara tiba-tiba.

## 5.2 Adegan Kedua — Ungkapan yang Tersimpan

Kamera menampilkan bunga yang tumbuh di tengah taman.

Satu bunga menjadi pusat perhatian. Kelopaknya membuka perlahan.

Kemudian munculkan kalimat pertama:

"Sejak kehadiranmu, ada banyak hal sederhana yang terasa berbeda."

Setelah beberapa saat, kalimat berikutnya muncul:

"Percakapan yang biasa saja terkadang menjadi sesuatu yang ingin kuulang. Hari yang sederhana terasa lebih menyenangkan, hanya karena aku dapat berbagi cerita denganmu."

Kemudian:

"Dan tanpa kusadari, namamu mulai memiliki tempat tersendiri dalam setiap doa dan harapanku."

Gunakan animasi kemunculan teks secara bertahap.

Setiap kalimat harus mendapat waktu yang cukup untuk dibaca.

Jangan membuat tulisan muncul dan menghilang terlalu cepat.

Tombol:

**"Ada Satu Hal Lagi"**

Ketika diklik:
- Kamera bergerak lebih dekat.
- Bunga utama menjadi fokus.
- Cahaya keemasan perlahan menguat.
- Adegan menuju pertanyaan utama.

## 5.3 Adegan Ketiga — Pertanyaan untukmu

Inilah bagian terpenting dari keseluruhan pengalaman.

Buat komposisi yang paling indah dan berkesan.

Objek utama berupa rangkaian bunga yang mekar perlahan. Kelopak-kelopak bergerak di sekelilingnya. Partikel cahaya kecil terlihat di antara bunga.

Kamera bergerak mendekati pusat adegan, kemudian berhenti pada sudut yang menampilkan pertanyaan dengan jelas.

Tampilkan kalimat pengantar:

"Aku tidak ingin membiarkan perasaan ini hanya tinggal sebagai sesuatu yang kusimpan sendiri."

Kemudian tampilkan pertanyaan utama:

# "Maukah kamu menjadi kekasihku?"

Di bawah pertanyaan tampilkan dua pilihan:

**"Iya, aku mau."**

**"Maaf, aku belum bisa."**

Desain tombol harus elegan dan menjadi bagian dari keseluruhan komposisi.

Gunakan warna gading dan merah muda lembut. Tambahkan gerakan kecil ketika tombol diarahkan dengan kursor atau disentuh.

Kedua tombol wajib dapat digunakan. Jangan membuat salah satu pilihan menghindar atau menghilang.

---

# 6. LOGIKA PERCABANGAN JAWABAN

## 6.1 Struktur Logika

Gunakan logika percabangan IF–ELSE untuk menentukan adegan akhir.

Contoh penerapan:

```typescript
type Jawaban = "iya" | "belum" | null;

const [jawaban, aturJawaban] = useState<Jawaban>(null);

function pilihJawaban(pilihan: Jawaban) {
  if (jawaban !== null) return;

  aturJawaban(pilihan);

  if (pilihan === "iya") {
    // Jalankan adegan penerimaan.
  } else {
    // Jalankan adegan alternatif.
  }
}
```

Logika harus sederhana dan tidak membutuhkan penyimpanan ke server atau basis data.

Jawaban hanya digunakan untuk menentukan adegan akhir.

## 6.2 Kondisi IF — Jawaban Iya

Ketika pengunjung memilih:

**"Iya, aku mau."**

Jalankan adegan akhir yang bahagia dan romantis.

Urutan animasi:

1. Tombol memberikan respons visual.
2. Kamera bergerak perlahan mendekati objek utama.
3. Bunga-bunga mulai bermekaran.
4. Kelopak bunga bergerak mengelilingi kamera.
5. Cahaya keemasan memenuhi sebagian lingkungan.
6. Partikel cahaya muncul secara lembut.
7. Tulisan utama muncul secara bertahap.
8. Pesan penutup ditampilkan.

Judul:

**"Betapa Bahagianya Aku Hari Ini."**

Pesan:

"Terima kasih telah menerima ajakanku.

Barangkali mulai hari ini, kita akan memiliki lebih banyak cerita untuk dibagikan. Ada tawa yang ingin kita simpan, ada hari-hari yang ingin kita lewati, dan ada perjalanan yang semoga dapat kita tempuh bersama.

Aku tidak menjanjikan segalanya akan selalu mudah. Namun, aku ingin belajar menjaga apa yang telah kita mulai, dengan perhatian, kesabaran, dan ketulusan."

Kalimat terakhir:

**"Semoga pertemuan ini menjadi awal dari cerita yang baik untuk kita."**

Tombol:

**"Ingin Mengulang Momen Ini"**

Ketika ditekan, kembalikan seluruh pengalaman menuju adegan pertama.

Seluruh adegan harus diatur kembali ke kondisi awal, termasuk kamera, pencahayaan, partikel, teks, dan pilihan jawaban.

## 6.3 Kondisi ELSE — Jawaban Belum Bisa

Ketika pengunjung memilih:

**"Maaf, aku belum bisa."**

Tampilkan adegan yang tenang, lembut, dan menghargai keputusan pengunjung.

Jangan membuat suasana menjadi muram secara berlebihan.

Urutan animasi:

1. Tombol memberikan respons visual.
2. Kamera bergerak perlahan menjauh dari bunga.
3. Kelopak bunga tetap bergerak, tetapi dengan suasana yang lebih tenang.
4. Cahaya berangsur lembut.
5. Tulisan muncul perlahan.
6. Adegan berakhir dengan komposisi taman yang damai.

Judul:

**"Tak Mengapa, Aku Mengerti."**

Pesan:

"Terima kasih telah menjawab dengan jujur.

Aku menghargai keputusanmu, sebagaimana aku menghargai perasaan yang telah kusampaikan. Tidak semua harapan harus berakhir sebagaimana yang kita bayangkan, dan tidak setiap perasaan harus dijawab dengan cara yang sama.

Bagiku, keberanian untuk mengungkapkan perasaan sudah menjadi sebuah pengalaman yang akan kuingat."

Kalimat terakhir:

**"Semoga hari-harimu selalu dipenuhi hal-hal baik."**

Tombol:

**"Kembali ke Permulaan"**

Ketika ditekan, kembalikan pengalaman menuju adegan pertama.

Penting: jangan membuat pengunjung merasa bersalah karena memilih jawaban ini.

---

# 7. SPESIFIKASI OBJEK DAN ANIMASI

## 7.1 Bunga

Bunga merupakan objek utama dalam lingkungan.

Buat bunga menggunakan geometri tiga dimensi yang memiliki:
- Kelopak individual.
- Bagian tengah bunga.
- Batang.
- Daun.
- Material dengan tekstur lembut.

Animasi:
- Kelopak membuka secara bertahap.
- Batang bergerak sedikit mengikuti angin.
- Daun bergerak secara halus.
- Bunga dapat mekar pada adegan jawaban positif.

Bentuk bunga harus terlihat anggun dan tidak seperti ilustrasi kartun.

## 7.2 Kelopak Bunga

Kelopak harus memiliki:
- Bentuk yang bervariasi.
- Rotasi berbeda.
- Kecepatan jatuh yang tidak seragam.
- Gerakan melayang.
- Kedalaman ruang.

Gunakan teknik penggandaan objek yang efisien untuk menghasilkan banyak kelopak.

## 7.3 Partikel Cahaya

Tambahkan partikel kecil yang menyerupai debu cahaya pada sore hari.

Gerakan:
- Melayang perlahan.
- Memiliki tingkat kecerahan berbeda.
- Tidak bergerak terlalu cepat.
- Tidak menutupi tulisan.

Partikel harus memberikan kesan udara yang hangat dan hidup.

## 7.4 Animasi Kamera

Buat beberapa posisi kamera untuk mendukung cerita:

1. Kamera pembuka yang menampilkan lingkungan luas.
2. Kamera pendekatan menuju taman.
3. Kamera yang berfokus pada bunga utama.
4. Kamera yang mengarahkan perhatian kepada pertanyaan.
5. Kamera untuk adegan akhir positif.
6. Kamera untuk adegan akhir alternatif.

Seluruh perpindahan harus memiliki gerakan yang lembut, terarah, dan tidak mendadak.

## 7.5 Animasi Tulisan

Tulisan merupakan bagian utama pengalaman.

Gunakan animasi:
- Tulisan muncul perlahan.
- Perubahan tingkat keterlihatan.
- Gerakan vertikal yang sangat halus.
- Kemunculan huruf atau kalimat secara bertahap.
- Transisi antarkalimat yang terkoordinasi.

Jangan membuat seluruh kalimat bergerak terlalu banyak.

Fokuskan perhatian pengunjung pada isi pesan.

---

# 8. INTERAKSI PENGUNJUNG

Seluruh interaksi dilakukan melalui klik atau sentuhan.

Tombol yang digunakan hanya:

1. "Mari Dengarkan"
2. "Ada Satu Hal Lagi"
3. "Iya, aku mau."
4. "Maaf, aku belum bisa."
5. "Ingin Mengulang Momen Ini"
6. "Kembali ke Permulaan"

Ketentuan:
- Setiap tombol memiliki fungsi yang jelas.
- Setiap tombol memiliki respons ketika ditekan.
- Tombol tidak boleh menutupi objek utama.
- Selama perpindahan adegan, cegah klik yang dapat merusak urutan animasi.
- Tidak diperlukan gerakan menyeret atau menggeser.
- Pengunjung tidak perlu menggunakan kamera secara manual.

---

# 9. TEKNOLOGI DAN STRUKTUR APLIKASI

Gunakan teknologi berikut:

| Kebutuhan | Teknologi |
|---|---|
| Antarmuka | React |
| Bahasa pemrograman | TypeScript |
| Pengaturan tampilan | Tailwind CSS |
| Mesin tiga dimensi | Three.js |
| Integrasi tiga dimensi | React Three Fiber |
| Perlengkapan tiga dimensi | Drei |
| Pengatur animasi | GSAP |
| Publikasi website | Vercel |

Tidak diperlukan:
- Server belakang.
- Basis data.
- Sistem masuk.
- Akun pengguna.
- Dasbor pengelola.
- Penyimpanan jawaban.
- Layanan pengiriman pesan.

Seluruh tulisan dapat disimpan di dalam konfigurasi aplikasi.

## 9.1 Struktur Komponen

Gunakan struktur yang sederhana dan mudah dipelihara.

```text
sebuah-pertanyaan-untukmu/
│
├── public/
│   ├── gambar/
│   ├── tekstur/
│   ├── huruf/
│   └── model/
│
├── src/
│   ├── komponen/
│   │   ├── adegan/
│   │   │   ├── Lingkungan.tsx
│   │   │   ├── Kamera.tsx
│   │   │   ├── Bunga.tsx
│   │   │   ├── Kelopak.tsx
│   │   │   └── PartikelCahaya.tsx
│   │   │
│   │   ├── tulisan/
│   │   │   └── TampilanPesan.tsx
│   │   │
│   │   └── tombol/
│   │       └── TombolPilihan.tsx
│   │
│   ├── halaman/
│   │   └── HalamanUtama.tsx
│   │
│   ├── pengelola/
│   │   └── PengelolaAdegan.ts
│   │
│   ├── gaya/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
└── README.md
```

Nama berkas dapat disesuaikan selama struktur tetap jelas.

---

# 10. PENGELOLAAN ADEGAN

Gunakan satu pengelola adegan untuk memastikan seluruh animasi berjalan secara teratur.

Gunakan jenis adegan berikut:

```typescript
type Adegan =
  | "pembuka"
  | "ungkapan"
  | "pertanyaan"
  | "jawaban_positif"
  | "jawaban_alternatif";
```

Setiap adegan memiliki:
- Kondisi awal.
- Objek yang ditampilkan.
- Posisi kamera.
- Pencahayaan.
- Animasi masuk.
- Animasi keluar.
- Peristiwa yang memicu perpindahan.

Pastikan tidak ada dua rangkaian animasi utama yang berjalan bersamaan secara tidak sengaja.

Gunakan GSAP Timeline untuk mengatur rangkaian animasi yang saling bergantung.

Simpan dan hentikan animasi dengan benar ketika adegan berganti.

---

# 11. RESPONSIVITAS DAN KINERJA

Website harus dapat digunakan pada komputer, tablet, dan telepon pintar.

## 11.1 Komputer

- Kualitas gambar tiga dimensi tinggi.
- Bayangan lembut.
- Partikel terlihat jelas.
- Gerakan kamera sinematik.
- Tulisan memiliki ukuran yang nyaman.

## 11.2 Telepon Pintar

- Ukuran objek menyesuaikan layar.
- Jumlah partikel dapat dikurangi.
- Bayangan disesuaikan kemampuan perangkat.
- Tombol memiliki ukuran yang nyaman untuk disentuh.
- Tulisan tidak terlalu kecil.
- Adegan tetap mempertahankan komposisi utama.

## 11.3 Optimasi

Terapkan:
- InstancedMesh untuk objek berulang.
- Pengelolaan tekstur.
- Pengelolaan geometri.
- Pembatasan kepadatan partikel.
- Pembatasan pixel ratio.
- Pembersihan sumber daya ketika tidak digunakan.
- Pengurangan efek berat pada perangkat dengan kemampuan terbatas.

Usahakan animasi mencapai 60 bingkai per detik pada perangkat yang mendukung.

Jika WebGL tidak tersedia, tampilkan tampilan pengganti yang tetap memungkinkan pengunjung membaca pesan dan memilih jawaban.

Jangan membiarkan website kosong karena kegagalan tampilan tiga dimensi.

---

# 12. TAHAPAN PENGEMBANGAN

## Tahap 1 — Pembuatan Lingkungan

- Siapkan proyek React dan TypeScript.
- Pasang Three.js.
- Buat lingkungan taman.
- Buat bunga dan pepohonan.
- Buat pencahayaan senja.
- Buat kamera tiga dimensi.

**Hasil:** lingkungan tiga dimensi dapat ditampilkan dengan baik.

## Tahap 2 — Pembuatan Animasi

- Buat gerakan bunga.
- Buat gerakan kelopak.
- Buat partikel cahaya.
- Buat animasi kamera.
- Buat animasi kemunculan tulisan.

**Hasil:** seluruh objek dapat bergerak secara alami.

## Tahap 3 — Pembuatan Alur Cerita

- Buat adegan pembuka.
- Buat adegan ungkapan perasaan.
- Buat adegan pertanyaan.
- Hubungkan seluruh adegan.

**Hasil:** cerita dapat berjalan secara berurutan.

## Tahap 4 — Penerapan IF–ELSE

- Buat dua pilihan jawaban.
- Implementasikan kondisi IF.
- Implementasikan kondisi ELSE.
- Buat animasi kedua hasil.
- Buat fungsi pengulangan.

**Hasil:** setiap pilihan menghasilkan adegan akhir yang benar.

## Tahap 5 — Pengujian dan Publikasi

- Uji seluruh adegan.
- Uji seluruh tombol.
- Uji respons kedua jawaban.
- Uji tampilan pada komputer dan telepon pintar.
- Uji kinerja animasi.
- Lakukan publikasi website.

**Hasil:** website siap dibagikan melalui sebuah tautan.

---

# 13. KRITERIA KEBERHASILAN

Aplikasi dinyatakan selesai apabila:

- [ ] Website menggunakan Three.js sebagai mesin utama visual tiga dimensi.
- [ ] Lingkungan taman tiga dimensi dapat ditampilkan.
- [ ] Bunga mempunyai animasi.
- [ ] Kelopak bunga bergerak secara alami.
- [ ] Partikel cahaya ditampilkan.
- [ ] Kamera mempunyai perpindahan sinematik.
- [ ] Tulisan muncul mengikuti alur cerita.
- [ ] Adegan pembuka berfungsi.
- [ ] Adegan ungkapan perasaan berfungsi.
- [ ] Adegan pertanyaan berfungsi.
- [ ] Jawaban "Iya, aku mau" menjalankan kondisi IF.
- [ ] Jawaban "Maaf, aku belum bisa" menjalankan kondisi ELSE.
- [ ] Kedua jawaban mempunyai adegan akhir yang berbeda.
- [ ] Tombol pengulangan berfungsi.
- [ ] Seluruh teks menggunakan Bahasa Indonesia.
- [ ] Tidak terdapat fitur yang tidak diperlukan.
- [ ] Website dapat digunakan pada komputer dan telepon pintar.
- [ ] Tidak terdapat kesalahan yang menghambat jalannya aplikasi.

---

# 14. INSTRUKSI WAJIB UNTUK AGEN AI

Bangun aplikasi sesuai dengan seluruh ketentuan dalam dokumen ini.

Jangan hanya menghasilkan rancangan antarmuka, gambar statis, atau halaman yang sekadar memiliki latar belakang tiga dimensi.

Aplikasi harus benar-benar memiliki:
- Lingkungan tiga dimensi.
- Objek bunga yang dapat dianimasikan.
- Kelopak yang bergerak.
- Partikel cahaya.
- Perpindahan kamera.
- Kemunculan tulisan.
- Perpindahan adegan.
- Logika IF–ELSE.
- Dua adegan akhir yang berbeda.

Semua tulisan yang dilihat pengunjung wajib menggunakan Bahasa Indonesia.

Gunakan ragam bahasa sastra Indonesia modern. Hindari ungkapan yang terdengar seperti terjemahan langsung dari bahasa asing.

Jangan menampilkan istilah teknis kepada pengunjung.

Jangan menambahkan fitur lain di luar dokumen ini.

Prioritaskan kualitas animasi, keindahan komposisi, ketepatan gerak, dan suasana emosional.

Pastikan seluruh proyek dapat dijalankan, diuji, dan dipublikasikan.

---

# 15. HASIL AKHIR YANG DIHARAPKAN

Hasil akhir harus menjadi sebuah pengalaman romantis yang terasa seperti potongan cerita dalam sebuah karya sastra visual.

Pengunjung memasuki sebuah taman pada waktu senja. Bunga-bunga bergerak perlahan, cahaya keemasan menyentuh setiap kelopak, dan beberapa kalimat hadir untuk menyampaikan perasaan yang selama ini tersimpan.

Kemudian, sebuah pertanyaan disampaikan dengan sederhana:

**"Maukah kamu menjadi kekasihku?"**

Apa pun jawabannya, pengalaman harus tetap indah dan menghargai perasaan pengunjung.

Produk tidak memerlukan banyak fitur. Keindahannya justru terletak pada bagaimana sebuah perasaan sederhana disampaikan melalui kata-kata yang tulus dan pengalaman visual yang mengesankan.

**Satu kisah, satu pertanyaan, dua kemungkinan jawaban, dan sebuah kenangan yang akan selalu diingat.**