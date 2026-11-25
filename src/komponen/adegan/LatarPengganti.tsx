import type { Adegan } from "../../konfigurasi/cerita";

interface PropertiLatarPengganti {
  adegan: Adegan;
}

const KELOPAK_PENGGANTI = [
  { kiri: "12%", durasi: "11s", tunda: "0s", ukuran: 14, warna: "#E9C9CC" },
  { kiri: "24%", durasi: "14s", tunda: "-3s", ukuran: 11, warna: "#F2DDE0" },
  { kiri: "38%", durasi: "12s", tunda: "-6s", ukuran: 15, warna: "#FFFEFB" },
  { kiri: "54%", durasi: "15s", tunda: "-2s", ukuran: 12, warna: "#E9C9CC" },
  { kiri: "68%", durasi: "10s", tunda: "-5s", ukuran: 13, warna: "#BD9293" },
  { kiri: "82%", durasi: "13s", tunda: "-1s", ukuran: 14, warna: "#F2DDE0" },
  { kiri: "91%", durasi: "16s", tunda: "-7s", ukuran: 10, warna: "#FFFEFB" },
];

const PARTIKEL_PENGGANTI = [
  { kiri: "18%", atas: "22%", ukuran: 7, tunda: "0s" },
  { kiri: "32%", atas: "34%", ukuran: 5, tunda: "1.2s" },
  { kiri: "48%", atas: "18%", ukuran: 8, tunda: "0.7s" },
  { kiri: "66%", atas: "28%", ukuran: 6, tunda: "2.1s" },
  { kiri: "78%", atas: "40%", ukuran: 9, tunda: "1.6s" },
  { kiri: "25%", atas: "48%", ukuran: 6, tunda: "2.8s" },
];

export function LatarPengganti({ adegan }: PropertiLatarPengganti) {
  const skalaSuasana =
    adegan === "pembuka"
      ? "scale-95 translate-y-2"
      : adegan === "ungkapan"
      ? "scale-100 lg:translate-x-44"
      : adegan === "pertanyaan"
      ? "scale-105 translate-y-2"
      : adegan === "jawaban_positif"
      ? "scale-110 lg:translate-x-44 -translate-y-4"
      : "scale-95 lg:translate-x-44 translate-y-3 opacity-85";

  const cahayaSenja =
    adegan === "jawaban_positif"
      ? "from-[#FFF1DB] via-[#F2DDE0] to-[#F8F3EF]"
      : adegan === "jawaban_alternatif"
      ? "from-[#EFE4E3] via-[#F4EAE7] to-[#F8F3EF]"
      : "from-[#F5DEC9]/75 via-[#F2DDE0]/85 to-[#F8F3EF]";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-0 overflow-hidden bg-gradient-to-b ${cahayaSenja} transition-colors duration-1000`}
    >
      {/* Untaian Cahaya Lampu Vine Dining */}
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#C8B28E]/25 blur-3xl" />
      <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-[#E9C9CC]/35 blur-3xl" />

      {PARTIKEL_PENGGANTI.map((p, idx) => (
        <span
          key={idx}
          className="animasi-pengganti absolute rounded-full bg-[#C8B28E]/60 blur-[1px]"
          style={{
            left: p.kiri,
            top: p.atas,
            width: `${p.ukuran}px`,
            height: `${p.ukuran}px`,
            animation: `pendarCahaya 5.5s ease-in-out ${p.tunda} infinite`,
          }}
        />
      ))}

      {KELOPAK_PENGGANTI.map((k, idx) => (
        <span
          key={idx}
          className="animasi-pengganti absolute top-0 rounded-tl-full rounded-br-full opacity-70"
          style={{
            left: k.kiri,
            width: `${k.ukuran}px`,
            height: `${Math.round(k.ukuran * 1.35)}px`,
            backgroundColor: k.warna,
            animation: `jatuhKelopak ${k.durasi} linear ${k.tunda} infinite`,
          }}
        />
      ))}

      {/* Ilustrasi Pergola Vine Dining & Karakter */}
      <div
        className={`absolute inset-x-0 top-[10%] sm:top-[14%] flex justify-center transition-all duration-1000 ease-out ${skalaSuasana}`}
      >
        <svg
          viewBox="0 0 320 260"
          className="h-56 w-72 sm:h-72 sm:w-96 drop-shadow-[0_14px_24px_rgba(121,102,94,0.16)]"
          fill="none"
        >
          {/* Pergola Kayu & Lampu */}
          <path d="M40 42H280" stroke="#685145" strokeWidth="5" strokeLinecap="round" />
          <path d="M56 42V228M264 42V228" stroke="#685145" strokeWidth="5" strokeLinecap="round" />
          <path d="M56 42Q160 88 264 42" stroke="#79665E" strokeWidth="1.5" />
          {[96, 138, 182, 224].map((x, i) => (
            <circle key={i} cx={x} cy={i === 1 || i === 2 ? 64 : 56} r="4.5" fill="#FFE3A8" />
          ))}

          {/* Meja Makan Kecil */}
          <rect x="68" y="164" width="66" height="8" rx="4" fill="#F7F4EE" stroke="#C8B28E" strokeWidth="1.2" />
          <path d="M101 172V228M84 228H118" stroke="#4A413C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="101" cy="156" r="4" fill="#FFD59A" />

          {/* Karakter Laki-Laki sesuai Adegan */}
          {adegan === "pertanyaan" ? (
            <g>
              {/* Berlutut sambil menyodorkan bunga */}
              <circle cx="188" cy="130" r="11" fill="#F0C8AA" />
              <path d="M178 126Q188 114 198 126" stroke="#4B3529" strokeWidth="6" strokeLinecap="round" />
              <path d="M188 144V192" stroke="#B49B87" strokeWidth="16" strokeLinecap="round" />
              <path d="M188 192L166 206L160 226M188 192L204 224" stroke="#6C5B52" strokeWidth="10" strokeLinecap="round" />
              <path d="M192 158L226 164" stroke="#B49B87" strokeWidth="8" strokeLinecap="round" />
              <path d="M226 168L234 150" stroke="#677757" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="235" cy="146" r="7" fill="#E9C9CC" />
            </g>
          ) : (
            <g>
              {/* Berdiri / lesu / girang */}
              <circle cx="192" cy={adegan === "jawaban_positif" ? 90 : 108} r="11" fill="#F0C8AA" />
              <path
                d={
                  adegan === "jawaban_positif"
                    ? "M182 86Q192 74 202 86"
                    : "M182 104Q192 92 202 104"
                }
                stroke="#4B3529"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d={
                  adegan === "jawaban_positif"
                    ? "M192 104V158"
                    : "M192 122V176"
                }
                stroke="#B49B87"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <path
                d={
                  adegan === "jawaban_positif"
                    ? "M192 158L178 210M192 158L206 210"
                    : "M192 176L180 228M192 176L204 228"
                }
                stroke="#6C5B52"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {adegan === "jawaban_alternatif" ? (
                <>
                  {/* Bunga jatuh di lantai */}
                  <path d="M214 224L236 226" stroke="#677757" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="238" cy="226" r="6" fill="#BD9293" />
                </>
              ) : (
                <>
                  <path d="M196 136L218 118" stroke="#B49B87" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="222" cy="112" r="6" fill="#E9C9CC" />
                </>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
