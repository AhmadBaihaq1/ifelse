import gsap from "gsap";
import type { Adegan, Jawaban } from "../konfigurasi/cerita";

export interface ParameterAdegan3D {
  kameraPosX: number;
  kameraPosY: number;
  kameraPosZ: number;
  kameraTargetX: number;
  kameraTargetY: number;
  kameraTargetZ: number;
  kameraFov: number;
  mekarUtama: number;
  mekarPendamping: number;
  layuBunga: number;
  progresBerlutut: number;
  progresMenyodorkan: number;
  progresJatuhBunga: number;
  reaksiTolak: number;
  reaksiBahagia: number;
  intensitasMatahari: number;
  intensitasEmas: number;
  intensitasLembayung: number;
  jarakKabutDekat: number;
  jarakKabutJauh: number;
  pusaranKelopak: number;
  kecepatanKelopak: number;
  doronganKameraKelopak: number;
  kecerahanPartikel: number;
  kecepatanPartikel: number;
  faktorSuasana: number;
}

interface PresetAdegan {
  desktop: Pick<
    ParameterAdegan3D,
    | "kameraPosX"
    | "kameraPosY"
    | "kameraPosZ"
    | "kameraTargetX"
    | "kameraTargetY"
    | "kameraTargetZ"
    | "kameraFov"
  >;
  ponsel: Pick<
    ParameterAdegan3D,
    | "kameraPosX"
    | "kameraPosY"
    | "kameraPosZ"
    | "kameraTargetX"
    | "kameraTargetY"
    | "kameraTargetZ"
    | "kameraFov"
  >;
  suasana: Omit<
    ParameterAdegan3D,
    | "kameraPosX"
    | "kameraPosY"
    | "kameraPosZ"
    | "kameraTargetX"
    | "kameraTargetY"
    | "kameraTargetZ"
    | "kameraFov"
    | "doronganKameraKelopak"
  >;
}

const PRESET_ADEGAN: Record<Adegan, PresetAdegan> = {
  pembuka: {
    desktop: {
      kameraPosX: 0.55,
      kameraPosY: 1.56,
      kameraPosZ: 5.45,
      kameraTargetX: -0.2,
      kameraTargetY: 0.96,
      kameraTargetZ: -0.1,
      kameraFov: 40,
    },
    ponsel: {
      kameraPosX: 0.28,
      kameraPosY: 1.62,
      kameraPosZ: 6.45,
      kameraTargetX: -0.1,
      kameraTargetY: 0.56,
      kameraTargetZ: -0.1,
      kameraFov: 46,
    },
    suasana: {
      mekarUtama: 0.28,
      mekarPendamping: 0.35,
      layuBunga: 0,
      progresBerlutut: 0,
      progresMenyodorkan: 0,
      progresJatuhBunga: 0,
      reaksiTolak: 0,
      reaksiBahagia: 0,
      intensitasMatahari: 1.65,
      intensitasEmas: 0.72,
      intensitasLembayung: 0.96,
      jarakKabutDekat: 8.5,
      jarakKabutJauh: 26.0,
      pusaranKelopak: 0.08,
      kecepatanKelopak: 0.85,
      kecerahanPartikel: 0.74,
      kecepatanPartikel: 0.75,
      faktorSuasana: 0.0,
    },
  },
  ungkapan: {
    desktop: {
      kameraPosX: -0.82,
      kameraPosY: 1.48,
      kameraPosZ: 3.65,
      kameraTargetX: -0.34,
      kameraTargetY: 1.15,
      kameraTargetZ: 0.12,
      kameraFov: 38,
    },
    ponsel: {
      kameraPosX: 0.14,
      kameraPosY: 1.5,
      kameraPosZ: 4.18,
      kameraTargetX: 0.16,
      kameraTargetY: 0.54,
      kameraTargetZ: 0.15,
      kameraFov: 44,
    },
    suasana: {
      mekarUtama: 0.56,
      mekarPendamping: 0.58,
      layuBunga: 0,
      progresBerlutut: 0,
      progresMenyodorkan: 0.18,
      progresJatuhBunga: 0,
      reaksiTolak: 0,
      reaksiBahagia: 0,
      intensitasMatahari: 1.85,
      intensitasEmas: 0.95,
      intensitasLembayung: 1.02,
      jarakKabutDekat: 7.5,
      jarakKabutJauh: 24.0,
      pusaranKelopak: 0.16,
      kecepatanKelopak: 0.92,
      kecerahanPartikel: 0.9,
      kecepatanPartikel: 0.85,
      faktorSuasana: 0.25,
    },
  },
  pertanyaan: {
    desktop: {
      kameraPosX: 0.16,
      kameraPosY: 1.16,
      kameraPosZ: 2.82,
      kameraTargetX: 0.36,
      kameraTargetY: 0.52,
      kameraTargetZ: 0.42,
      kameraFov: 38,
    },
    ponsel: {
      kameraPosX: 0.16,
      kameraPosY: 1.18,
      kameraPosZ: 3.4,
      kameraTargetX: 0.36,
      kameraTargetY: 0.32,
      kameraTargetZ: 0.42,
      kameraFov: 44,
    },
    suasana: {
      mekarUtama: 0.82,
      mekarPendamping: 0.8,
      layuBunga: 0,
      progresBerlutut: 1,
      progresMenyodorkan: 1,
      progresJatuhBunga: 0,
      reaksiTolak: 0,
      reaksiBahagia: 0,
      intensitasMatahari: 2.15,
      intensitasEmas: 1.25,
      intensitasLembayung: 1.08,
      jarakKabutDekat: 6.5,
      jarakKabutJauh: 22.0,
      pusaranKelopak: 0.28,
      kecepatanKelopak: 0.98,
      kecerahanPartikel: 1.08,
      kecepatanPartikel: 0.95,
      faktorSuasana: 0.5,
    },
  },
  jawaban_positif: {
    desktop: {
      kameraPosX: -0.86,
      kameraPosY: 1.44,
      kameraPosZ: 3.55,
      kameraTargetX: -0.34,
      kameraTargetY: 1.15,
      kameraTargetZ: 0.18,
      kameraFov: 39,
    },
    ponsel: {
      kameraPosX: 0.15,
      kameraPosY: 1.46,
      kameraPosZ: 4.25,
      kameraTargetX: 0.28,
      kameraTargetY: 0.65,
      kameraTargetZ: 0.2,
      kameraFov: 45,
    },
    suasana: {
      mekarUtama: 1.0,
      mekarPendamping: 1.0,
      layuBunga: 0,
      progresBerlutut: 0,
      progresMenyodorkan: 0.45,
      progresJatuhBunga: 0,
      reaksiTolak: 0,
      reaksiBahagia: 1,
      intensitasMatahari: 2.55,
      intensitasEmas: 1.65,
      intensitasLembayung: 1.18,
      jarakKabutDekat: 7.5,
      jarakKabutJauh: 25.0,
      pusaranKelopak: 1.0,
      kecepatanKelopak: 1.12,
      kecerahanPartikel: 1.48,
      kecepatanPartikel: 1.25,
      faktorSuasana: 1.0,
    },
  },
  jawaban_alternatif: {
    desktop: {
      kameraPosX: -0.68,
      kameraPosY: 1.24,
      kameraPosZ: 3.35,
      kameraTargetX: -0.22,
      kameraTargetY: 0.68,
      kameraTargetZ: 0.34,
      kameraFov: 38,
    },
    ponsel: {
      kameraPosX: 0.16,
      kameraPosY: 1.26,
      kameraPosZ: 3.85,
      kameraTargetX: 0.36,
      kameraTargetY: 0.38,
      kameraTargetZ: 0.36,
      kameraFov: 44,
    },
    suasana: {
      mekarUtama: 0.68,
      mekarPendamping: 0.65,
      layuBunga: 1,
      progresBerlutut: 0,
      progresMenyodorkan: 0,
      progresJatuhBunga: 1,
      reaksiTolak: 1,
      reaksiBahagia: 0,
      intensitasMatahari: 1.35,
      intensitasEmas: 0.38,
      intensitasLembayung: 0.88,
      jarakKabutDekat: 8.0,
      jarakKabutJauh: 25.0,
      pusaranKelopak: 0.04,
      kecepatanKelopak: 0.58,
      kecerahanPartikel: 0.5,
      kecepatanPartikel: 0.52,
      faktorSuasana: -0.5,
    },
  },
};

export interface StatusCerita {
  adegan: Adegan;
  jawaban: Jawaban;
  sedangTransisi: boolean;
  urutanTeks: number;
  siapTampilAwal: boolean;
}

type PendengarStatus = (status: StatusCerita) => void;

export class PengelolaAdegan {
  public readonly param3D: ParameterAdegan3D;

  private status: StatusCerita = {
    adegan: "pembuka",
    jawaban: null,
    sedangTransisi: false,
    urutanTeks: 0,
    siapTampilAwal: false,
  };

  private modePonsel: boolean;
  private timelineAktif: gsap.core.Timeline | null = null;
  private timerTeks: number[] = [];
  private pendengar = new Set<PendengarStatus>();
  private didispose = false;

  constructor(modePonsel: boolean) {
    this.modePonsel = modePonsel;
    this.param3D = this.buatParameterAwal("pembuka", modePonsel);
  }

  private buatParameterAwal(
    adegan: Adegan,
    ponsel: boolean
  ): ParameterAdegan3D {
    const preset = PRESET_ADEGAN[adegan];
    const kamera = ponsel ? preset.ponsel : preset.desktop;
    return {
      ...kamera,
      ...preset.suasana,
      doronganKameraKelopak: 0,
    };
  }

  public dapatkanStatus(): StatusCerita {
    return this.status;
  }

  public langganan(cb: PendengarStatus): () => void {
    this.pendengar.add(cb);
    cb(this.status);
    return () => {
      this.pendengar.delete(cb);
    };
  }

  private perbaruiStatus(bagian: Partial<StatusCerita>): void {
    if (this.didispose) return;
    this.status = { ...this.status, ...bagian };
    this.pendengar.forEach((cb) => cb(this.status));
  }

  private bersihkanTimer(): void {
    for (const id of this.timerTeks) {
      window.clearTimeout(id);
    }
    this.timerTeks = [];
  }

  private hentikanTimeline(): void {
    if (this.timelineAktif) {
      this.timelineAktif.kill();
      this.timelineAktif = null;
    }
  }

  private jadwalkan(delayMs: number, aksi: () => void): void {
    const id = window.setTimeout(() => {
      if (!this.didispose) {
        aksi();
      }
    }, delayMs);
    this.timerTeks.push(id);
  }

  public mulaiPengalaman(): void {
    this.bersihkanTimer();
    this.jadwalkan(850, () => {
      this.perbaruiStatus({ siapTampilAwal: true, urutanTeks: 1 });
    });
    this.jadwalkan(1850, () => {
      this.perbaruiStatus({ urutanTeks: 2 });
    });
  }

  public aturModePonsel(ponsel: boolean): void {
    if (this.modePonsel === ponsel) return;
    this.modePonsel = ponsel;
    if (this.status.sedangTransisi) return;

    const preset = PRESET_ADEGAN[this.status.adegan];
    const targetKamera = ponsel ? preset.ponsel : preset.desktop;
    gsap.to(this.param3D, {
      ...targetKamera,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  public lanjutKeUngkapan(): void {
    if (this.status.sedangTransisi || this.status.adegan !== "pembuka") return;
    this.transisiKe("ungkapan", 2.35, () => {
      this.perbaruiStatus({ urutanTeks: 1 });
      this.jadwalkan(2800, () => this.perbaruiStatus({ urutanTeks: 2 }));
      this.jadwalkan(5800, () => this.perbaruiStatus({ urutanTeks: 3 }));
      this.jadwalkan(7400, () => this.perbaruiStatus({ urutanTeks: 4 }));
    });
  }

  public lanjutKePertanyaan(): void {
    if (this.status.sedangTransisi || this.status.adegan !== "ungkapan") return;
    this.transisiKe("pertanyaan", 2.25, () => {
      this.perbaruiStatus({ urutanTeks: 1 });
      this.jadwalkan(1350, () => this.perbaruiStatus({ urutanTeks: 2 }));
      this.jadwalkan(2300, () => this.perbaruiStatus({ urutanTeks: 3 }));
    });
  }

  public pilihJawaban(pilihan: Jawaban): void {
    if (
      pilihan === null ||
      this.status.jawaban !== null ||
      this.status.sedangTransisi ||
      this.status.adegan !== "pertanyaan"
    ) {
      return;
    }

    this.perbaruiStatus({ jawaban: pilihan });

    // Logika percabangan IF-ELSE sesuai alur cerita
    if (pilihan === "iya") {
      this.transisiKe("jawaban_positif", 2.4, () => {
        this.perbaruiStatus({ urutanTeks: 1 });
        this.jadwalkan(1500, () => this.perbaruiStatus({ urutanTeks: 2 }));
        this.jadwalkan(3200, () => this.perbaruiStatus({ urutanTeks: 3 }));
        this.jadwalkan(5100, () => this.perbaruiStatus({ urutanTeks: 4 }));
        this.jadwalkan(6600, () => this.perbaruiStatus({ urutanTeks: 5 }));
      });
    } else {
      this.transisiKe("jawaban_alternatif", 2.65, () => {
        this.perbaruiStatus({ urutanTeks: 1 });
        this.jadwalkan(1400, () => this.perbaruiStatus({ urutanTeks: 2 }));
        this.jadwalkan(3100, () => this.perbaruiStatus({ urutanTeks: 3 }));
        this.jadwalkan(4900, () => this.perbaruiStatus({ urutanTeks: 4 }));
        this.jadwalkan(6500, () => this.perbaruiStatus({ urutanTeks: 5 }));
        this.jadwalkan(12000, () => this.kembaliKePertanyaan());
      });
    }
  }

  public kembaliKePertanyaan(): void {
    if (
      this.status.sedangTransisi ||
      this.status.adegan !== "jawaban_alternatif"
    ) {
      return;
    }

    this.transisiKe(
      "pertanyaan",
      2.25,
      () => {
        this.perbaruiStatus({ jawaban: null, urutanTeks: 1 });
        this.jadwalkan(950, () => this.perbaruiStatus({ urutanTeks: 2 }));
        this.jadwalkan(1750, () => this.perbaruiStatus({ urutanTeks: 3 }));
      },
      { jawaban: null }
    );
  }

  public ulangiDariAwal(): void {
    if (this.status.sedangTransisi) return;

    this.bersihkanTimer();
    this.hentikanTimeline();

    const presetAwal = PRESET_ADEGAN.pembuka;
    const kameraAwal = this.modePonsel ? presetAwal.ponsel : presetAwal.desktop;

    this.perbaruiStatus({
      sedangTransisi: true,
      urutanTeks: 0,
      siapTampilAwal: false,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        this.timelineAktif = null;
        this.perbaruiStatus({
          adegan: "pembuka",
          jawaban: null,
          sedangTransisi: false,
          siapTampilAwal: true,
          urutanTeks: 1,
        });
        this.jadwalkan(850, () => {
          this.perbaruiStatus({ urutanTeks: 2 });
        });
      },
    });

    tl.to(this.param3D, {
      ...kameraAwal,
      ...presetAwal.suasana,
      doronganKameraKelopak: -0.35,
      duration: 2.3,
      ease: "power2.inOut",
    }).to(
      this.param3D,
      {
        doronganKameraKelopak: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.7"
    );

    this.timelineAktif = tl;
  }

  private transisiKe(
    adeganTujuan: Adegan,
    durasiDetik: number,
    saatMasuk: () => void,
    statusTambahan: Partial<StatusCerita> = {}
  ): void {
    this.bersihkanTimer();
    this.hentikanTimeline();

    const preset = PRESET_ADEGAN[adeganTujuan];
    const targetKamera = this.modePonsel ? preset.ponsel : preset.desktop;
    const arahDorongan =
      adeganTujuan === "jawaban_alternatif" ? -0.45 : 0.75;

    this.perbaruiStatus({
      sedangTransisi: true,
      urutanTeks: 0,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        this.timelineAktif = null;
        this.perbaruiStatus({
          ...statusTambahan,
          adegan: adeganTujuan,
          sedangTransisi: false,
        });
        saatMasuk();
      },
    });

    tl.to(
      this.param3D,
      {
        doronganKameraKelopak: arahDorongan,
        duration: durasiDetik * 0.45,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        this.param3D,
        {
          ...targetKamera,
          ...preset.suasana,
          duration: durasiDetik,
          ease: "power3.inOut",
        },
        0.15
      )
      .to(
        this.param3D,
        {
          doronganKameraKelopak: 0,
          duration: 1.0,
          ease: "power2.out",
        },
        durasiDetik * 0.65
      );

    this.timelineAktif = tl;
  }

  public dispose(): void {
    this.didispose = true;
    this.bersihkanTimer();
    this.hentikanTimeline();
    this.pendengar.clear();
  }
}
