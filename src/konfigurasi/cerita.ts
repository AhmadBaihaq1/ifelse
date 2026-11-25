export type Adegan =
  | "pembuka"
  | "ungkapan"
  | "pertanyaan"
  | "jawaban_positif"
  | "jawaban_alternatif";

export type Jawaban = "iya" | "belum" | null;

export const PALET = {
  latarUtama: "#F8F3EF",
  gadingLembut: "#F7F4EE",
  putihHangat: "#FFFEFB",
  merahMudaLembut: "#E9C9CC",
  mawarPudar: "#BD9293",
  merahMudaPucat: "#F2DDE0",
  keemasanLembut: "#C8B28E",
  cokelatHangat: "#79665E",
  teksUtama: "#292824",
} as const;

export const NASKAH_CERITA = {
  pembuka: {
    judul: "Hai, kamu...",
    paragraf: [
      "Ada sesuatu yang telah lama ingin kusampaikan. Barangkali bukan perkara besar, tetapi cukup berarti bagiku untuk menemukan cara yang istimewa dalam mengatakannya.",
    ],
    tombol: "Mari Dengarkan",
  },
  ungkapan: {
    paragraf: [
      "Sejak kehadiranmu, ada banyak hal sederhana yang terasa berbeda.",
      "Percakapan yang biasa saja terkadang menjadi sesuatu yang ingin kuulang. Hari yang sederhana terasa lebih menyenangkan, hanya karena aku dapat berbagi cerita denganmu.",
      "Dan tanpa kusadari, namamu mulai memiliki tempat tersendiri dalam setiap doa dan harapanku.",
    ],
    tombol: "Ada Satu Hal Lagi",
  },
  pertanyaan: {
    pengantar:
      "Aku tidak ingin membiarkan perasaan ini hanya tinggal sebagai sesuatu yang kusimpan sendiri.",
    pertanyaan: "Maukah kamu menjadi kekasihku?",
    pilihanIya: "Iya, aku mau.",
    pilihanBelum: "Maaf, aku belum bisa.",
  },
  jawaban_positif: {
    judul: "Betapa Bahagianya Aku Hari Ini.",
    paragraf: [
      "Terima kasih telah menerima ajakanku.",
      "Barangkali mulai hari ini, kita akan memiliki lebih banyak cerita untuk dibagikan. Ada tawa yang ingin kita simpan, ada hari-hari yang ingin kita lewati, dan ada perjalanan yang semoga dapat kita tempuh bersama.",
      "Aku tidak menjanjikan segalanya akan selalu mudah. Namun, aku ingin belajar menjaga apa yang telah kita mulai, dengan perhatian, kesabaran, dan ketulusan.",
    ],
    penutup:
      "Semoga pertemuan ini menjadi awal dari cerita yang baik untuk kita.",
    tombol: "Ingin Mengulang Momen Ini",
  },
  jawaban_alternatif: {
    judul: "Tak Mengapa, Aku Mengerti.",
    paragraf: [
      "Terima kasih telah menjawab dengan jujur.",
      "Aku menghargai keputusanmu, sebagaimana aku menghargai perasaan yang telah kusampaikan. Tidak semua harapan harus berakhir sebagaimana yang kita bayangkan, dan tidak setiap perasaan harus dijawab dengan cara yang sama.",
      "Bagiku, keberanian untuk mengungkapkan perasaan sudah menjadi sebuah pengalaman yang akan kuingat.",
    ],
    penutup: "Semoga hari-harimu selalu dipenuhi hal-hal baik.",
  },
} as const;
