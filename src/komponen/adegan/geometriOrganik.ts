import * as THREE from "three";

export interface OpsiGeometriKelopak {
  lebar?: number;
  panjang?: number;
  cekungan?: number;
  lengkungUjung?: number;
  gelombangTepi?: number;
  segmenU?: number;
  segmenV?: number;
}

/**
 * Membangun geometri kelopak bunga organik yang melengkung lembut,
 * menyempit pada pangkal, melebar pada bagian tengah, dan melentik pada ujung.
 */
export function buatGeometriKelopak(
  opsi: OpsiGeometriKelopak = {}
): THREE.BufferGeometry {
  const {
    lebar = 0.28,
    panjang = 0.42,
    cekungan = 0.085,
    lengkungUjung = 0.07,
    gelombangTepi = 0.012,
    segmenU = 14,
    segmenV = 18,
  } = opsi;

  const posisi: number[] = [];
  const uv: number[] = [];
  const indeks: number[] = [];

  for (let iv = 0; iv <= segmenV; iv++) {
    const v = iv / segmenV;
    // Bentuk tepi kelopak: ramping di pangkal, penuh di atas tengah, membulat halus di ujung
    const profilLebar =
      Math.pow(Math.sin(Math.min(1, v * 0.92 + 0.08) * Math.PI), 0.72) *
      (0.32 + 0.85 * Math.pow(v, 0.45));
    const lengkungBelakang =
      Math.pow(Math.max(0, v - 0.62) / 0.38, 2.0) * lengkungUjung;
    const busurVertikal = Math.sin(v * Math.PI * 0.85) * 0.045;

    for (let iu = 0; iu <= segmenU; iu++) {
      const uNorm = iu / segmenU;
      const u = uNorm * 2 - 1; // -1 hingga 1

      // Sedikit lekuk lembut di tengah bibir kelopak atas
      const lekukUjung =
        Math.pow(v, 3.0) * (1 - Math.abs(u)) * 0.022;

      const x = u * (lebar * 0.5) * profilLebar;
      const y = v * panjang - lekukUjung;

      // Cekungan mangkuk kelopak + lentik ujung + riak tepi halus
      const faktorTepi = u * u;
      const mangkuk = (1 - faktorTepi) * Math.sin(v * Math.PI) * cekungan;
      const riak =
        Math.sin(u * Math.PI * 2.5 + v * 2.0) *
        gelombangTepi *
        Math.pow(v, 1.3) *
        Math.abs(u);

      const z = mangkuk + busurVertikal + lengkungBelakang + riak;

      posisi.push(x, y, z);
      uv.push(uNorm, v);
    }
  }

  const kolom = segmenU + 1;
  for (let iv = 0; iv < segmenV; iv++) {
    for (let iu = 0; iu < segmenU; iu++) {
      const a = iv * kolom + iu;
      const b = a + 1;
      const c = a + kolom;
      const d = c + 1;

      indeks.push(a, b, d);
      indeks.push(a, d, c);
    }
  }

  const geometri = new THREE.BufferGeometry();
  geometri.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(posisi, 3)
  );
  geometri.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometri.setIndex(indeks);
  geometri.computeVertexNormals();
  return geometri;
}

/**
 * Membangun geometri daun mawar runcing yang melengkung lembut dengan tulang tengah.
 */
export function buatGeometriDaun(
  lebar = 0.19,
  panjang = 0.38
): THREE.BufferGeometry {
  const segU = 10;
  const segV = 14;
  const posisi: number[] = [];
  const uv: number[] = [];
  const indeks: number[] = [];

  for (let iv = 0; iv <= segV; iv++) {
    const v = iv / segV;
    const lebarDaun = Math.sin(Math.pow(v, 0.72) * Math.PI) * (lebar * 0.5);
    const lengkung = Math.pow(v, 1.6) * 0.085;

    for (let iu = 0; iu <= segU; iu++) {
      const uNorm = iu / segU;
      const u = uNorm * 2 - 1;
      const tulangTengah = Math.abs(u) * 0.018 * Math.sin(v * Math.PI);

      const x = u * lebarDaun;
      const y = v * panjang;
      const z = -lengkung + tulangTengah;

      posisi.push(x, y, z);
      uv.push(uNorm, v);
    }
  }

  const kolom = segU + 1;
  for (let iv = 0; iv < segV; iv++) {
    for (let iu = 0; iu < segU; iu++) {
      const a = iv * kolom + iu;
      const b = a + 1;
      const c = a + kolom;
      const d = c + 1;
      indeks.push(a, b, d);
      indeks.push(a, d, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(posisi, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geom.setIndex(indeks);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Membuat tekstur serat halus kelopak bunga secara prosedural agar tampak lembut bak beludru.
 */
export function buatTeksturSeratKelopak(): THREE.CanvasTexture {
  const ukuran = 256;
  const kanvas = document.createElement("canvas");
  kanvas.width = ukuran;
  kanvas.height = ukuran;
  const ctx = kanvas.getContext("2d");

  if (ctx) {
    const grd = ctx.createLinearGradient(0, ukuran, 0, 0);
    grd.addColorStop(0, "rgb(208, 198, 198)");
    grd.addColorStop(0.45, "rgb(236, 232, 232)");
    grd.addColorStop(1, "rgb(255, 252, 250)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, ukuran, ukuran);

    // Serat halus memancar dari pangkal ke ujung kelopak
    ctx.lineWidth = 1.1;
    for (let i = 0; i < 42; i++) {
      const rasio = i / 41;
      const xAwal = ukuran * (0.35 + rasio * 0.3);
      const xAkhir = ukuran * (0.04 + rasio * 0.92);
      ctx.strokeStyle =
        i % 2 === 0 ? "rgba(255, 255, 255, 0.22)" : "rgba(189, 146, 147, 0.14)";
      ctx.beginPath();
      ctx.moveTo(xAwal, ukuran);
      ctx.quadraticCurveTo(
        (xAwal + xAkhir) * 0.5,
        ukuran * 0.55,
        xAkhir,
        ukuran * 0.03
      );
      ctx.stroke();
    }
  }

  const tekstur = new THREE.CanvasTexture(kanvas);
  tekstur.wrapS = THREE.ClampToEdgeWrapping;
  tekstur.wrapT = THREE.ClampToEdgeWrapping;
  tekstur.needsUpdate = true;
  return tekstur;
}
