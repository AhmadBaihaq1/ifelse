import { useEffect, useRef, useState } from "react";
import type { Jawaban } from "../konfigurasi/cerita";
import {
  PengelolaAdegan,
  type ParameterAdegan3D,
  type StatusCerita,
} from "../pengelola/PengelolaAdegan";
import {
  cekDukunganWebGL,
  PanggungTigaDimensi,
} from "../komponen/adegan/PanggungTigaDimensi";
import { LatarPengganti } from "../komponen/adegan/LatarPengganti";
import { TampilanPesan } from "../komponen/tulisan/TampilanPesan";

function periksaModePonsel(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
}

const STATUS_AWAL: StatusCerita = {
  adegan: "pembuka",
  jawaban: null,
  sedangTransisi: false,
  urutanTeks: 0,
  siapTampilAwal: false,
};

export function HalamanUtama() {
  const [modePonsel, aturModePonsel] = useState<boolean>(periksaModePonsel);
  const [webGLTersedia, aturWebGLTersedia] = useState<boolean>(() =>
    cekDukunganWebGL()
  );

  const refPengelola = useRef<PengelolaAdegan | null>(null);
  const refParam3D = useRef<ParameterAdegan3D>(
    new PengelolaAdegan(periksaModePonsel()).param3D
  );

  const [status, aturStatus] = useState<StatusCerita>(STATUS_AWAL);

  useEffect(() => {
    const ponselSaatIni = periksaModePonsel();
    aturModePonsel(ponselSaatIni);

    const pengelola = new PengelolaAdegan(ponselSaatIni);
    refPengelola.current = pengelola;
    refParam3D.current = pengelola.param3D;

    const berhenti = pengelola.langganan(aturStatus);
    pengelola.mulaiPengalaman();

    const saatUbahUkuran = () => {
      const ponselBaru = periksaModePonsel();
      aturModePonsel(ponselBaru);
      pengelola.aturModePonsel(ponselBaru);
    };

    window.addEventListener("resize", saatUbahUkuran, { passive: true });
    return () => {
      window.removeEventListener("resize", saatUbahUkuran);
      berhenti();
      pengelola.dispose();
      if (refPengelola.current === pengelola) {
        refPengelola.current = null;
      }
    };
  }, []);

  const tanganiLanjutUngkapan = () => {
    refPengelola.current?.lanjutKeUngkapan();
  };

  const tanganiLanjutPertanyaan = () => {
    refPengelola.current?.lanjutKePertanyaan();
  };

  const tanganiPilihJawaban = (pilihan: Jawaban) => {
    refPengelola.current?.pilihJawaban(pilihan);
  };

  const tanganiUlangi = () => {
    refPengelola.current?.ulangiDariAwal();
  };

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#F8F3EF] select-none">
      {webGLTersedia ? (
        <PanggungTigaDimensi
          param3DRef={refParam3D}
          modePonsel={modePonsel}
          onGagalWebGL={() => aturWebGLTersedia(false)}
        />
      ) : (
        <LatarPengganti adegan={status.adegan} />
      )}

      <TampilanPesan
        status={status}
        onLanjutUngkapan={tanganiLanjutUngkapan}
        onLanjutPertanyaan={tanganiLanjutPertanyaan}
        onPilihJawaban={tanganiPilihJawaban}
        onUlangi={tanganiUlangi}
      />
    </main>
  );
}
