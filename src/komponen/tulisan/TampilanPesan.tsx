import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NASKAH_CERITA, type Jawaban } from "../../konfigurasi/cerita";
import type { StatusCerita } from "../../pengelola/PengelolaAdegan";
import { TombolPilihan } from "../tombol/TombolPilihan";

interface PropertiTampilanPesan {
  status: StatusCerita;
  onLanjutUngkapan: () => void;
  onLanjutPertanyaan: () => void;
  onPilihJawaban: (pilihan: Jawaban) => void;
  onUlangi: () => void;
}

function kelasMuncul(terlihat: boolean): string {
  return `transition-all duration-1000 ease-out ${
    terlihat
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-3 pointer-events-none"
  }`;
}

export function TampilanPesan({
  status,
  onLanjutUngkapan,
  onLanjutPertanyaan,
  onPilihJawaban,
  onUlangi,
}: PropertiTampilanPesan) {
  const { adegan, sedangTransisi, urutanTeks, siapTampilAwal, jawaban } =
    status;
  const refKontainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = refKontainer.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (sedangTransisi) {
      gsap.to(el, {
        opacity: 0,
        y: 8,
        duration: 0.55,
        ease: "power2.inOut",
      });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
      );
    }
  }, [adegan, sedangTransisi]);

  const adalahAdeganSampingDesktop =
    adegan === "ungkapan" ||
    adegan === "jawaban_positif" ||
    adegan === "jawaban_alternatif";

  const posisiKontainer = adalahAdeganSampingDesktop
    ? "items-end justify-center pb-6 px-4 sm:pb-10 lg:items-center lg:justify-start lg:pl-14 xl:pl-24 lg:pb-0"
    : "items-end justify-center pb-7 px-4 sm:pb-12";

  const gayaLatar = adalahAdeganSampingDesktop
    ? "kabut-baca rounded-3xl px-6 py-6 sm:px-8 sm:py-8 max-w-xl w-full border border-[#FFFEFB]/65 max-h-[60vh] lg:max-h-[82vh] overflow-y-auto"
    : "max-w-2xl w-full text-center px-4 py-4 sm:px-8 sm:py-6 rounded-3xl bg-[#F8F3EF]/72 backdrop-blur-[10px] border border-[#FFFEFB]/55 shadow-[0_18px_48px_-24px_rgba(121,102,94,0.22)]";

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
      {/* Kabut lembut bagian bawah agar teks terbaca jelas di atas taman */}
      <div
        aria-hidden="true"
        className={`kabut-bawah pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-1000 ${
          adalahAdeganSampingDesktop
            ? "h-[52vh] lg:h-[26vh] lg:opacity-45"
            : "h-[46vh] sm:h-[42vh]"
        }`}
      />

      <div
        className={`relative z-10 flex h-full w-full ${posisiKontainer}`}
      >
        <div
          ref={refKontainer}
          className={`pointer-events-auto ${gayaLatar} ${
            sedangTransisi ? "pointer-events-none" : ""
          }`}
        >
          {/* ADEGAN 1: PEMBUKA */}
          {adegan === "pembuka" && (
            <div className="space-y-4 sm:space-y-5">
              <h1
                className={`font-judul text-3xl sm:text-4xl md:text-[44px] font-medium tracking-tight text-[#292824] ${kelasMuncul(
                  siapTampilAwal && urutanTeks >= 1
                )}`}
              >
                <span className="font-aksen text-[1.18em] font-normal text-[#79665E] pr-1">
                  {NASKAH_CERITA.pembuka.judul.slice(0, 4)}
                </span>
                {NASKAH_CERITA.pembuka.judul.slice(4)}
              </h1>

              <p
                className={`mx-auto max-w-lg text-[14.5px] sm:text-[16px] leading-relaxed text-[#292824]/90 ${kelasMuncul(
                  siapTampilAwal && urutanTeks >= 2
                )}`}
              >
                {NASKAH_CERITA.pembuka.paragraf[0]}
              </p>

              <div
                className={`pt-2 ${kelasMuncul(
                  siapTampilAwal && urutanTeks >= 2
                )}`}
              >
                <TombolPilihan
                  teks={NASKAH_CERITA.pembuka.tombol}
                  nonaktif={sedangTransisi || !siapTampilAwal || urutanTeks < 2}
                  onKlik={onLanjutUngkapan}
                />
              </div>
            </div>
          )}

          {/* ADEGAN 2: UNGKAPAN YANG TERSIMPAN */}
          {adegan === "ungkapan" && (
            <div className="space-y-4 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                {NASKAH_CERITA.ungkapan.paragraf.map((kalimat, indeks) => (
                  <p
                    key={indeks}
                    className={`${
                      indeks === 0
                        ? "font-sastra text-xl sm:text-2xl font-medium italic text-[#292824]"
                        : "text-[14px] sm:text-[15.5px] leading-relaxed text-[#292824]/90"
                    } ${kelasMuncul(urutanTeks >= indeks + 1)}`}
                  >
                    {kalimat}
                  </p>
                ))}
              </div>

              <div
                className={`pt-3 flex justify-center lg:justify-start ${kelasMuncul(
                  urutanTeks >= 4
                )}`}
              >
                <TombolPilihan
                  teks={NASKAH_CERITA.ungkapan.tombol}
                  nonaktif={sedangTransisi || urutanTeks < 4}
                  onKlik={onLanjutPertanyaan}
                />
              </div>
            </div>
          )}

          {/* ADEGAN 3: PERTANYAAN UTAMA */}
          {adegan === "pertanyaan" && (
            <div className="space-y-4 sm:space-y-5">
              <p
                className={`mx-auto max-w-lg font-sastra text-lg sm:text-xl italic leading-relaxed text-[#79665E] ${kelasMuncul(
                  urutanTeks >= 1
                )}`}
              >
                {NASKAH_CERITA.pertanyaan.pengantar}
              </p>

              <h2
                className={`font-judul text-2xl sm:text-4xl font-medium leading-snug text-[#292824] ${kelasMuncul(
                  urutanTeks >= 2
                )}`}
              >
                {NASKAH_CERITA.pertanyaan.pertanyaan}
              </h2>

              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 ${kelasMuncul(
                  urutanTeks >= 3
                )}`}
              >
                <TombolPilihan
                  teks={NASKAH_CERITA.pertanyaan.pilihanIya}
                  varian="utama"
                  nonaktif={
                    sedangTransisi || urutanTeks < 3 || jawaban !== null
                  }
                  onKlik={() => onPilihJawaban("iya")}
                />
                <TombolPilihan
                  teks={NASKAH_CERITA.pertanyaan.pilihanBelum}
                  varian="lembut"
                  nonaktif={
                    sedangTransisi || urutanTeks < 3 || jawaban !== null
                  }
                  onKlik={() => onPilihJawaban("belum")}
                />
              </div>
            </div>
          )}

          {/* ADEGAN 4A: KONDISI IF — JAWABAN IYA */}
          {adegan === "jawaban_positif" && (
            <div className="space-y-3.5 sm:space-y-4 text-center lg:text-left">
              <h2
                className={`font-judul text-2xl sm:text-3xl md:text-[34px] font-medium leading-tight text-[#292824] ${kelasMuncul(
                  urutanTeks >= 1
                )}`}
              >
                {NASKAH_CERITA.jawaban_positif.judul}
              </h2>

              <div className="space-y-2.5 sm:space-y-3">
                {NASKAH_CERITA.jawaban_positif.paragraf.map((teks, idx) => (
                  <p
                    key={idx}
                    className={`text-[13.5px] sm:text-[15px] leading-relaxed text-[#292824]/90 ${kelasMuncul(
                      urutanTeks >= idx + 2
                    )}`}
                  >
                    {teks}
                  </p>
                ))}
              </div>

              <p
                className={`font-sastra text-lg sm:text-xl italic text-[#79665E] pt-1 ${kelasMuncul(
                  urutanTeks >= 4
                )}`}
              >
                {NASKAH_CERITA.jawaban_positif.penutup}
              </p>

              <div
                className={`pt-2 flex justify-center lg:justify-start ${kelasMuncul(
                  urutanTeks >= 5
                )}`}
              >
                <TombolPilihan
                  teks={NASKAH_CERITA.jawaban_positif.tombol}
                  varian="utama"
                  nonaktif={sedangTransisi || urutanTeks < 5}
                  onKlik={onUlangi}
                />
              </div>
            </div>
          )}

          {/* ADEGAN 4B: KONDISI ELSE — JAWABAN BELUM BISA */}
          {adegan === "jawaban_alternatif" && (
            <div className="space-y-3.5 sm:space-y-4 text-center lg:text-left">
              <h2
                className={`font-judul text-2xl sm:text-3xl md:text-[34px] font-medium leading-tight text-[#292824] ${kelasMuncul(
                  urutanTeks >= 1
                )}`}
              >
                {NASKAH_CERITA.jawaban_alternatif.judul}
              </h2>

              <div className="space-y-2.5 sm:space-y-3">
                {NASKAH_CERITA.jawaban_alternatif.paragraf.map((teks, idx) => (
                  <p
                    key={idx}
                    className={`text-[13.5px] sm:text-[15px] leading-relaxed text-[#292824]/90 ${kelasMuncul(
                      urutanTeks >= idx + 2
                    )}`}
                  >
                    {teks}
                  </p>
                ))}
              </div>

              <p
                className={`font-sastra text-lg sm:text-xl italic text-[#79665E] pt-1 ${kelasMuncul(
                  urutanTeks >= 5
                )}`}
              >
                {NASKAH_CERITA.jawaban_alternatif.penutup}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
