# Sebuah Pertanyaan untukmu

Website interaktif personal untuk mengungkapkan perasaan melalui pengalaman visual tiga dimensi menggunakan **Three.js**, **React Three Fiber**, **Drei**, **GSAP**, dan **Tailwind CSS**.

## Struktur Utama

- `src/konfigurasi/cerita.ts` — Seluruh naskah cerita berbahasa Indonesia dan palet visual.
- `src/pengelola/PengelolaAdegan.ts` — Pengelola state adegan, logika percabangan IF–ELSE, dan timeline GSAP.
- `src/komponen/adegan/` — Lingkungan taman senja 3D, kamera sinematik, bunga utama & pengiring, kelopak melayang (`InstancedMesh`), dan partikel cahaya shader.
- `src/komponen/tulisan/TampilanPesan.tsx` — Kemunculan teks puitis bertahap yang selaras dengan adegan.
- `src/komponen/tombol/TombolPilihan.tsx` — Tombol interaksi yang elegan untuk alur cerita dan dua pilihan jawaban.
- `src/halaman/HalamanUtama.tsx` — Integrasi kanvas 3D, antarmuka pesan, serta tampilan pengganti apabila WebGL tidak tersedia.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

## Build Produksi

```bash
npm run build
npm run preview
```
