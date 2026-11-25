import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";
import { BungaMawarDiTangan } from "./Bunga";

interface PropertiKarakter {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
}

/**
 * Karakter laki-laki tiga dimensi berbusana makan malam senja yang hangat & rapi:
 * kemeja gading, dasi mawar pudar, jas pasir hangat, dan rambut cokelat tersisir rapi.
 * Mendukung animasi berlutut menyodorkan bunga, wajah lesu menjatuhkan bunga,
 * serta lompat kegirangan saat diterima.
 */
export function KarakterLakiLaki({ param3DRef }: PropertiKarakter) {
  const refRoot = useRef<THREE.Group>(null);
  const refPinggul = useRef<THREE.Group>(null);
  const refTorso = useRef<THREE.Group>(null);
  const refKepala = useRef<THREE.Group>(null);

  const refPahaKiri = useRef<THREE.Group>(null);
  const refLututKiri = useRef<THREE.Group>(null);
  const refEngkelKiri = useRef<THREE.Group>(null);

  const refPahaKanan = useRef<THREE.Group>(null);
  const refLututKanan = useRef<THREE.Group>(null);
  const refEngkelKanan = useRef<THREE.Group>(null);

  const refBahuKiri = useRef<THREE.Group>(null);
  const refSikuKiri = useRef<THREE.Group>(null);

  const refBahuKanan = useRef<THREE.Group>(null);
  const refSikuKanan = useRef<THREE.Group>(null);
  const refTanganKanan = useRef<THREE.Group>(null);

  const refAlisKiri = useRef<THREE.Mesh>(null);
  const refAlisKanan = useRef<THREE.Mesh>(null);
  const refKelopakMataKiri = useRef<THREE.Mesh>(null);
  const refKelopakMataKanan = useRef<THREE.Mesh>(null);
  const refMulut = useRef<THREE.Mesh>(null);

  const refBungaTangan = useRef<THREE.Group>(null);
  const refBungaJatuh = useRef<THREE.Group>(null);

  const posisiLepas = useRef(new THREE.Vector3(0.45, 0.72, 0.76));
  const sudahRekamLepas = useRef(false);

  const geom = useMemo(() => {
    // Pinggul & sabuk kulit hangat
    const pinggul = new THREE.CylinderGeometry(0.142, 0.148, 0.13, 18);
    const sabuk = new THREE.CylinderGeometry(0.145, 0.145, 0.028, 18);
    const gesper = new THREE.BoxGeometry(0.038, 0.032, 0.014);

    // Kemeja & jas hangat berprofil organik (LatheGeometry, y naik agar normal mengarah keluar)
    const torsoKemeja = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(0.132, 0.01),
        new THREE.Vector2(0.128, 0.14),
        new THREE.Vector2(0.162, 0.34),
        new THREE.Vector2(0.15, 0.42),
        new THREE.Vector2(0.056, 0.455),
        new THREE.Vector2(0.0, 0.46),
      ],
      22
    );

    // Jas terbuka simetris di depan (celah tepat di +Z) memperlihatkan kemeja gading dan dasi
    const jasPanel = new THREE.CylinderGeometry(
      0.167,
      0.149,
      0.435,
      18,
      1,
      true,
      0.38,
      Math.PI * 2 - 0.76
    );
    const kerahLipat = new THREE.BoxGeometry(0.044, 0.24, 0.024);
    const kerahKemeja = new THREE.TorusGeometry(0.054, 0.015, 8, 18);
    const simpulDasi = new THREE.ConeGeometry(0.018, 0.034, 6);
    const badanDasi = new THREE.BoxGeometry(0.034, 0.21, 0.012);
    const kancingJas = new THREE.CylinderGeometry(0.011, 0.011, 0.01, 10);

    const leher = new THREE.CylinderGeometry(0.043, 0.048, 0.1, 14);

    // Kepala berbentuk rahang & pipi yang ramah (bukan bola polos)
    const kepala = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.118),
        new THREE.Vector2(0.054, -0.1),
        new THREE.Vector2(0.094, -0.052),
        new THREE.Vector2(0.108, 0.008),
        new THREE.Vector2(0.104, 0.062),
        new THREE.Vector2(0.074, 0.104),
        new THREE.Vector2(0.0, 0.118),
      ],
      24
    );
    const telinga = new THREE.SphereGeometry(0.022, 10, 8);
    const hidung = new THREE.CapsuleGeometry(0.011, 0.022, 4, 8);
    const ronaPipi = new THREE.CircleGeometry(0.02, 12);

    // Rambut cokelat kastanye tersisir rapi (terbuka di dahi agar wajah bersih & ramah)
    const mahkotaRambut = new THREE.SphereGeometry(
      0.112,
      20,
      14,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.43
    );
    const rambutBelakang = new THREE.SphereGeometry(
      0.108,
      16,
      12,
      Math.PI * 0.84,
      Math.PI * 1.32,
      Math.PI * 0.18,
      Math.PI * 0.44
    );
    const jambulUtama = new THREE.CapsuleGeometry(0.034, 0.075, 6, 10);
    jambulUtama.rotateZ(Math.PI * 0.44);
    const jambulSamping = new THREE.CapsuleGeometry(0.026, 0.055, 6, 10);
    jambulSamping.rotateZ(-Math.PI * 0.38);

    // Mata ekspresif hangat
    const mataPutih = new THREE.SphereGeometry(0.02, 14, 10);
    const iris = new THREE.SphereGeometry(0.013, 14, 10);
    const kilauMata = new THREE.SphereGeometry(0.0045, 8, 8);
    const kelopakMata = new THREE.SphereGeometry(
      0.0215,
      12,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.52
    );
    const alis = new THREE.CapsuleGeometry(0.0048, 0.026, 4, 8);
    alis.rotateZ(Math.PI / 2);

    const kurvaMulut = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.027, 0.009, 0),
      new THREE.Vector3(-0.013, 0.002, 0.004),
      new THREE.Vector3(0, 0, 0.006),
      new THREE.Vector3(0.013, 0.002, 0.004),
      new THREE.Vector3(0.027, 0.009, 0),
    ]);
    const mulut = new THREE.TubeGeometry(kurvaMulut, 14, 0.0042, 6, false);

    // Lengan & manset kemeja
    const bahuSendi = new THREE.SphereGeometry(0.051, 12, 10);
    const lenganAtas = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.27),
        new THREE.Vector2(0.037, -0.265),
        new THREE.Vector2(0.045, -0.13),
        new THREE.Vector2(0.051, -0.015),
        new THREE.Vector2(0.0, 0.0),
      ],
      14
    );
    const sikuSendi = new THREE.SphereGeometry(0.037, 10, 8);
    const lenganBawah = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.235),
        new THREE.Vector2(0.03, -0.23),
        new THREE.Vector2(0.036, -0.11),
        new THREE.Vector2(0.038, 0.0),
        new THREE.Vector2(0.0, 0.005),
      ],
      14
    );
    const manset = new THREE.CylinderGeometry(0.031, 0.03, 0.026, 12);
    const telapak = new THREE.CapsuleGeometry(0.024, 0.032, 6, 10);
    const jempol = new THREE.CapsuleGeometry(0.009, 0.02, 4, 6);

    // Kaki & sepatu pantofel
    const paha = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.43),
        new THREE.Vector2(0.055, -0.425),
        new THREE.Vector2(0.068, -0.22),
        new THREE.Vector2(0.076, -0.015),
        new THREE.Vector2(0.0, 0.0),
      ],
      16
    );
    const lututSendi = new THREE.SphereGeometry(0.054, 12, 10);
    const betis = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.38),
        new THREE.Vector2(0.043, -0.375),
        new THREE.Vector2(0.053, -0.18),
        new THREE.Vector2(0.055, 0.0),
        new THREE.Vector2(0.0, 0.005),
      ],
      16
    );
    const sepatu = new THREE.CapsuleGeometry(0.038, 0.115, 6, 12);
    const solSepatu = new THREE.BoxGeometry(0.074, 0.014, 0.18);

    return {
      pinggul,
      sabuk,
      gesper,
      torsoKemeja,
      jasPanel,
      kerahLipat,
      kerahKemeja,
      simpulDasi,
      badanDasi,
      kancingJas,
      leher,
      kepala,
      telinga,
      hidung,
      ronaPipi,
      mahkotaRambut,
      rambutBelakang,
      jambulUtama,
      jambulSamping,
      mataPutih,
      iris,
      kilauMata,
      kelopakMata,
      alis,
      mulut,
      bahuSendi,
      lenganAtas,
      sikuSendi,
      lenganBawah,
      manset,
      telapak,
      jempol,
      paha,
      lututSendi,
      betis,
      sepatu,
      solSepatu,
    };
  }, []);

  // Palet busana makan malam romantis (hangat, lembut, berkelas — jauh dari kesan gelap)
  const mat = useMemo(() => {
    const kulit = new THREE.MeshStandardMaterial({
      color: "#F0C8AA",
      roughness: 0.58,
    });
    const rona = new THREE.MeshBasicMaterial({
      color: "#E8A29C",
      transparent: true,
      opacity: 0.28,
    });
    const rambut = new THREE.MeshStandardMaterial({
      color: "#4B3529",
      roughness: 0.65,
    });
    const jas = new THREE.MeshStandardMaterial({
      color: "#B49B87", // Pasir hangat / krem taupe elegan
      roughness: 0.78,
      side: THREE.DoubleSide,
    });
    const kemeja = new THREE.MeshStandardMaterial({
      color: "#FFFEFB", // Putih gading bersih
      roughness: 0.7,
    });
    const dasi = new THREE.MeshStandardMaterial({
      color: "#BD9293", // Mawar pudar selaras palet
      roughness: 0.55,
    });
    const celana = new THREE.MeshStandardMaterial({
      color: "#6C5B52", // Cokelat hangat lembut
      roughness: 0.82,
    });
    const kulitSabuk = new THREE.MeshStandardMaterial({
      color: "#5B4134",
      roughness: 0.5,
    });
    const emasKancing = new THREE.MeshStandardMaterial({
      color: "#C8B28E",
      roughness: 0.35,
      metalness: 0.45,
    });
    const putihMata = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      roughness: 0.2,
    });
    const irisMata = new THREE.MeshStandardMaterial({
      color: "#432C20",
      roughness: 0.18,
    });
    const kilau = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    const bibir = new THREE.MeshStandardMaterial({
      color: "#BD7E75",
      roughness: 0.52,
    });
    const korsase = new THREE.MeshStandardMaterial({
      color: "#E9C9CC",
      roughness: 0.5,
    });

    return {
      kulit,
      rona,
      rambut,
      jas,
      kemeja,
      dasi,
      celana,
      kulitSabuk,
      emasKancing,
      putihMata,
      irisMata,
      kilau,
      bibir,
      korsase,
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geom).forEach((g) => g.dispose());
      Object.values(mat).forEach((m) => m.dispose());
    };
  }, [geom, mat]);

  const vTmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = param3DRef.current;

    const berlutut = THREE.MathUtils.clamp(p.progresBerlutut, 0, 1);
    const berlututHalus = berlutut * berlutut * (3 - 2 * berlutut);
    const sodor = THREE.MathUtils.clamp(p.progresMenyodorkan, 0, 1);
    const sodorHalus = sodor * sodor * (3 - 2 * sodor);
    const tolak = THREE.MathUtils.clamp(p.reaksiTolak, 0, 1);
    const tolakHalus = tolak * tolak * (3 - 2 * tolak);
    const bahagia = THREE.MathUtils.clamp(p.reaksiBahagia, 0, 1);
    const jatuh = THREE.MathUtils.clamp(p.progresJatuhBunga, 0, 1);

    // 1. Animasi lompat kegirangan saat jawaban positif
    const bobotLompat = THREE.MathUtils.smoothstep(bahagia, 0.28, 0.85);
    const fase = (t * 1.18) % 1;
    let lompatY = 0;
    let tekukLututLompat = 0;
    let ayunLenganLompat = 0;
    let condongLompat = 0;

    if (bobotLompat > 0.001) {
      if (fase < 0.22) {
        const u = fase / 0.22;
        const tekuk = Math.sin(u * Math.PI);
        lompatY = -0.08 * tekuk;
        tekukLututLompat = 0.55 * tekuk;
        condongLompat = 0.14 * tekuk;
        ayunLenganLompat = 0.25 * tekuk;
      } else if (fase < 0.78) {
        const u = (fase - 0.22) / 0.56;
        const busur = 4 * u * (1 - u);
        lompatY = 0.36 * busur;
        tekukLututLompat = 0.48 * Math.sin(u * Math.PI);
        condongLompat = -0.08 * Math.sin(u * Math.PI);
        ayunLenganLompat = Math.sin(u * Math.PI) * 0.28;
      } else {
        const u = (fase - 0.78) / 0.22;
        const redam = Math.sin(u * Math.PI);
        lompatY = -0.05 * redam;
        tekukLututLompat = 0.38 * redam;
        condongLompat = 0.08 * redam;
      }
      lompatY *= bobotLompat;
      tekukLututLompat *= bobotLompat;
      ayunLenganLompat *= bobotLompat;
      condongLompat *= bobotLompat;
    }

    // 2. Kinematika pinggul & kaki
    const pahaKiriKneel = THREE.MathUtils.lerp(0, -1.42, berlututHalus);
    const napasPinggul = Math.sin(t * 1.4) * 0.005 * (1 - bobotLompat);
    const pelvisDasar = 0.04 + 0.38 + 0.43 * Math.cos(pahaKiriKneel);
    const pelvisY = pelvisDasar + lompatY + napasPinggul;

    if (refPinggul.current) {
      refPinggul.current.position.y = pelvisY;
      refPinggul.current.rotation.y =
        Math.sin(t * 0.7) * 0.03 * (1 - tolakHalus * 0.6) +
        (bobotLompat > 0.1 ? Math.sin(t * 2.4) * 0.07 * bobotLompat : 0);
    }

    const pahaKiriX = pahaKiriKneel - tekukLututLompat * 0.52;
    const lututKiriX = -pahaKiriKneel + tekukLututLompat;
    const engkelKiriX = -tekukLututLompat * 0.45;

    if (refPahaKiri.current) refPahaKiri.current.rotation.x = pahaKiriX;
    if (refLututKiri.current) refLututKiri.current.rotation.x = lututKiriX;
    if (refEngkelKiri.current) refEngkelKiri.current.rotation.x = engkelKiriX;

    const pahaKananX =
      THREE.MathUtils.lerp(0, 0.16, berlututHalus) - tekukLututLompat * 0.52;
    const lututKananX =
      THREE.MathUtils.lerp(0, 1.4, berlututHalus) + tekukLututLompat;
    const engkelKananX =
      THREE.MathUtils.lerp(0, 0.45, berlututHalus) - tekukLututLompat * 0.45;

    if (refPahaKanan.current) refPahaKanan.current.rotation.x = pahaKananX;
    if (refLututKanan.current) refLututKanan.current.rotation.x = lututKananX;
    if (refEngkelKanan.current) refEngkelKanan.current.rotation.x = engkelKananX;

    // 3. Torso & Kepala
    if (refTorso.current) {
      const condongBerlutut = berlututHalus * 0.14;
      const bungkukLesu = tolakHalus * 0.28;
      refTorso.current.rotation.x =
        condongBerlutut + bungkukLesu + condongLompat + Math.sin(t * 1.4) * 0.012;
      refTorso.current.rotation.z =
        tolakHalus * 0.04 + Math.sin(t * 0.85) * 0.015;
    }

    if (refKepala.current) {
      const tatapKeAtas = -berlututHalus * 0.15;
      const tundukLesu = tolakHalus * 0.34;
      const tengadahGirang = -bobotLompat * 0.12;
      refKepala.current.rotation.x =
        tatapKeAtas + tundukLesu + tengadahGirang + Math.sin(t * 1.1) * 0.018;
      refKepala.current.rotation.y =
        Math.sin(t * 0.65) * 0.05 * (1 - tolakHalus * 0.5) - tolakHalus * 0.08;
      refKepala.current.rotation.z =
        tolakHalus * 0.1 + Math.sin(t * 2.1) * 0.04 * bobotLompat;
    }

    // 4. Ekspresi Wajah
    const siklusKedip = (t * 0.28) % 1;
    const kedip =
      siklusKedip > 0.96 ? Math.sin(((siklusKedip - 0.96) / 0.04) * Math.PI) : 0;
    const sayuMata = tolakHalus * 0.44;
    const tutupKelopak = Math.min(1, kedip + sayuMata);

    if (refKelopakMataKiri.current && refKelopakMataKanan.current) {
      const rotTutup = THREE.MathUtils.lerp(-1.42, 0.35, tutupKelopak);
      refKelopakMataKiri.current.rotation.x = rotTutup;
      refKelopakMataKanan.current.rotation.x = rotTutup;
    }

    if (refAlisKiri.current && refAlisKanan.current) {
      const sudutSedih = tolakHalus * 0.28;
      const sudutGirang = bahagia * 0.13;
      const tinggiAlis = 0.042 + bahagia * 0.008 - tolakHalus * 0.005;

      refAlisKiri.current.position.y = tinggiAlis;
      refAlisKanan.current.position.y = tinggiAlis;
      refAlisKiri.current.rotation.z = sudutSedih - sudutGirang;
      refAlisKanan.current.rotation.z = -sudutSedih + sudutGirang;
    }

    if (refMulut.current) {
      const senyumDasar = 0.58 + sodorHalus * 0.32 + bahagia * 0.72;
      const skalaMulutY = THREE.MathUtils.lerp(senyumDasar, -0.95, tolakHalus);
      const skalaMulutX = 1 + bahagia * 0.18 - tolakHalus * 0.12;
      refMulut.current.scale.set(skalaMulutX, skalaMulutY, 1);
    }

    // 5. Gerakan Lengan
    if (refBahuKiri.current && refSikuKiri.current) {
      const bahuKiriDiamX = 0.08 + Math.sin(t * 1.1) * 0.025;
      const bahuKiriBerlututX = -0.32;
      const bahuKiriLesuX = 0.18;
      const bahuKiriGirangX = -2.35 + ayunLenganLompat;

      let bx = THREE.MathUtils.lerp(bahuKiriDiamX, bahuKiriBerlututX, berlututHalus);
      bx = THREE.MathUtils.lerp(bx, bahuKiriLesuX, tolakHalus);
      bx = THREE.MathUtils.lerp(bx, bahuKiriGirangX, bobotLompat);

      const bz =
        0.12 +
        tolakHalus * 0.06 +
        bobotLompat * (0.42 + Math.sin(t * 3.5) * 0.12);

      refBahuKiri.current.rotation.set(bx, 0, bz);
      refSikuKiri.current.rotation.x =
        THREE.MathUtils.lerp(-0.28, -0.58, berlututHalus) * (1 - tolakHalus * 0.65) -
        bobotLompat * 0.25;
    }

    if (refBahuKanan.current && refSikuKanan.current && refTanganKanan.current) {
      const bahuDiamX = -0.22 + Math.sin(t * 1.1 + 0.5) * 0.025;
      const bahuSodorX = -1.06;
      const bahuLesuX = 0.16;
      const bahuGirangX = -2.42 - ayunLenganLompat * 0.8;

      let bx = THREE.MathUtils.lerp(bahuDiamX, bahuSodorX, sodorHalus);
      bx = THREE.MathUtils.lerp(bx, bahuLesuX, tolakHalus);
      bx = THREE.MathUtils.lerp(bx, bahuGirangX, bobotLompat);

      const bz =
        -0.1 -
        sodorHalus * 0.08 -
        tolakHalus * 0.08 -
        bobotLompat * (0.36 + Math.cos(t * 3.5) * 0.1);

      const sikuX = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(-0.55, -0.34, sodorHalus),
        -0.12,
        tolakHalus
      );

      refBahuKanan.current.rotation.set(bx, sodorHalus * -0.14, bz);
      refSikuKanan.current.rotation.x = sikuX - bobotLompat * 0.18;
      refTanganKanan.current.rotation.x =
        THREE.MathUtils.lerp(0.25, 0.72, sodorHalus) * (1 - tolakHalus);
    }

    // 6. Pelepasan & Jatuhnya Bunga ke Lantai Teras
    if (refBungaTangan.current && refBungaJatuh.current) {
      if (jatuh < 0.12) {
        sudahRekamLepas.current = false;
        refBungaTangan.current.visible = true;
        refBungaJatuh.current.visible = false;
      } else {
        if (!sudahRekamLepas.current) {
          refTanganKanan.current?.getWorldPosition(vTmp);
          if (vTmp.lengthSq() > 0.001) {
            posisiLepas.current.copy(vTmp);
          }
          sudahRekamLepas.current = true;
        }
        refBungaTangan.current.visible = false;
        refBungaJatuh.current.visible = true;

        const u = THREE.MathUtils.clamp((jatuh - 0.12) / 0.88, 0, 1);
        const startPos = posisiLepas.current;
        const targetX = startPos.x + 0.06;
        const targetZ = startPos.z + 0.14;
        const lantaiY = 0.032;

        let ySekarang: number;
        if (u < 0.68) {
          const g = u / 0.68;
          ySekarang = THREE.MathUtils.lerp(startPos.y, lantaiY, g * g);
        } else {
          const b = (u - 0.68) / 0.32;
          const pantul = Math.sin(b * Math.PI) * 0.055 * (1 - b * 0.35);
          ySekarang = lantaiY + pantul;
        }

        const geserHorizontal = Math.min(1, u * 1.15);
        refBungaJatuh.current.position.set(
          THREE.MathUtils.lerp(startPos.x, targetX, geserHorizontal),
          ySekarang,
          THREE.MathUtils.lerp(startPos.z, targetZ, geserHorizontal)
        );
        refBungaJatuh.current.rotation.set(
          THREE.MathUtils.lerp(0.6, 1.52, Math.min(1, u * 1.3)),
          0.35 + u * 0.45,
          THREE.MathUtils.lerp(0, 1.38, Math.min(1, u * 1.25))
        );
      }
    }
  });

  return (
    <>
      <group ref={refRoot} position={[0.38, 0, 0.24]} rotation={[0, -0.18, 0]}>
        <group ref={refPinggul} position={[0, 0.85, 0]}>
          {/* Pinggul & Sabuk */}
          <mesh geometry={geom.pinggul} material={mat.celana} castShadow />
          <mesh
            geometry={geom.sabuk}
            material={mat.kulitSabuk}
            position={[0, 0.052, 0]}
            scale={[1.05, 1, 0.78]}
          />
          <mesh
            geometry={geom.gesper}
            material={mat.emasKancing}
            position={[0, 0.052, 0.114]}
          />

          {/* TORSO: KEMEJA GADING, DASI MAWAR PUDAR, & JAS KREM HANGAT */}
          <group ref={refTorso} position={[0, 0.06, 0]}>
            <mesh
              geometry={geom.torsoKemeja}
              material={mat.kemeja}
              scale={[1.08, 1, 0.72]}
              castShadow
              receiveShadow
            />
            <mesh
              geometry={geom.jasPanel}
              material={mat.jas}
              position={[0, 0.215, 0]}
              scale={[1.1, 1, 0.75]}
              castShadow
              receiveShadow
            />
            {/* Kerah jas kiri & kanan */}
            <mesh
              geometry={geom.kerahLipat}
              material={mat.jas}
              position={[-0.065, 0.31, 0.108]}
              rotation={[0.08, 0.25, -0.22]}
              castShadow
            />
            <mesh
              geometry={geom.kerahLipat}
              material={mat.jas}
              position={[0.065, 0.31, 0.108]}
              rotation={[0.08, -0.25, 0.22]}
              castShadow
            />
            {/* Korsase bunga kecil di dada kiri jas */}
            <mesh
              material={mat.korsase}
              position={[-0.082, 0.345, 0.124]}
            >
              <sphereGeometry args={[0.016, 10, 8]} />
            </mesh>
            {/* Kancing jas keemasan */}
            <mesh
              geometry={geom.kancingJas}
              material={mat.emasKancing}
              position={[0.02, 0.16, 0.118]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            {/* Kerah kemeja & dasi */}
            <mesh
              geometry={geom.kerahKemeja}
              material={mat.kemeja}
              position={[0, 0.432, 0.005]}
              rotation={[Math.PI * 0.52, 0, 0]}
            />
            <mesh
              geometry={geom.simpulDasi}
              material={mat.dasi}
              position={[0, 0.41, 0.098]}
              rotation={[Math.PI, 0, 0]}
            />
            <mesh
              geometry={geom.badanDasi}
              material={mat.dasi}
              position={[0, 0.295, 0.112]}
              rotation={[-0.06, 0, 0]}
            />

            {/* Leher & Kepala */}
            <mesh
              geometry={geom.leher}
              material={mat.kulit}
              position={[0, 0.47, 0]}
              castShadow
            />

            <group ref={refKepala} position={[0, 0.57, 0]}>
              <mesh
                geometry={geom.kepala}
                material={mat.kulit}
                scale={[0.96, 1.04, 1.02]}
                castShadow
              />
              {/* Rona Pipi Hangat */}
              <mesh
                geometry={geom.ronaPipi}
                material={mat.rona}
                position={[-0.058, -0.015, 0.092]}
                rotation={[0, -0.35, 0]}
              />
              <mesh
                geometry={geom.ronaPipi}
                material={mat.rona}
                position={[0.058, -0.015, 0.092]}
                rotation={[0, 0.35, 0]}
              />
              {/* Telinga */}
              <mesh
                geometry={geom.telinga}
                material={mat.kulit}
                position={[-0.104, -0.004, -0.005]}
                scale={[0.65, 1.15, 0.8]}
              />
              <mesh
                geometry={geom.telinga}
                material={mat.kulit}
                position={[0.104, -0.004, -0.005]}
                scale={[0.65, 1.15, 0.8]}
              />
              {/* Hidung */}
              <mesh
                geometry={geom.hidung}
                material={mat.kulit}
                position={[0, -0.012, 0.109]}
                rotation={[0.42, 0, 0]}
              />

              {/* Rambut Rapi di Puncak & Belakang Kepala (Dahi Terbuka Bersih) */}
              <mesh
                geometry={geom.mahkotaRambut}
                material={mat.rambut}
                position={[0, 0.016, -0.016]}
                rotation={[-0.28, 0, 0]}
                scale={[0.98, 1.05, 1.02]}
                castShadow
              />
              <mesh
                geometry={geom.rambutBelakang}
                material={mat.rambut}
                position={[0, 0.01, -0.018]}
                castShadow
              />
              <mesh
                geometry={geom.jambulUtama}
                material={mat.rambut}
                position={[0.018, 0.095, 0.036]}
                castShadow
              />
              <mesh
                geometry={geom.jambulSamping}
                material={mat.rambut}
                position={[-0.042, 0.088, 0.032]}
                castShadow
              />

              {/* Mata Kiri */}
              <group position={[-0.036, 0.014, 0.094]}>
                <mesh
                  geometry={geom.mataPutih}
                  material={mat.putihMata}
                  scale={[1, 0.9, 0.65]}
                />
                <mesh
                  geometry={geom.iris}
                  material={mat.irisMata}
                  position={[0, 0, 0.007]}
                />
                <mesh
                  geometry={geom.kilauMata}
                  material={mat.kilau}
                  position={[0.0045, 0.0045, 0.018]}
                />
                <mesh
                  ref={refKelopakMataKiri}
                  geometry={geom.kelopakMata}
                  material={mat.kulit}
                  rotation={[-1.42, 0, 0]}
                />
              </group>

              {/* Mata Kanan */}
              <group position={[0.036, 0.014, 0.094]}>
                <mesh
                  geometry={geom.mataPutih}
                  material={mat.putihMata}
                  scale={[1, 0.9, 0.65]}
                />
                <mesh
                  geometry={geom.iris}
                  material={mat.irisMata}
                  position={[0, 0, 0.007]}
                />
                <mesh
                  geometry={geom.kilauMata}
                  material={mat.kilau}
                  position={[0.0045, 0.0045, 0.018]}
                />
                <mesh
                  ref={refKelopakMataKanan}
                  geometry={geom.kelopakMata}
                  material={mat.kulit}
                  rotation={[-1.42, 0, 0]}
                />
              </group>

              {/* Alis */}
              <mesh
                ref={refAlisKiri}
                geometry={geom.alis}
                material={mat.rambut}
                position={[-0.037, 0.042, 0.1]}
              />
              <mesh
                ref={refAlisKanan}
                geometry={geom.alis}
                material={mat.rambut}
                position={[0.037, 0.042, 0.1]}
              />

              {/* Mulut */}
              <mesh
                ref={refMulut}
                geometry={geom.mulut}
                material={mat.bibir}
                position={[0, -0.048, 0.098]}
              />
            </group>

            {/* LENGAN KIRI */}
            <group ref={refBahuKiri} position={[-0.205, 0.39, 0]}>
              <mesh geometry={geom.bahuSendi} material={mat.jas} castShadow />
              <mesh geometry={geom.lenganAtas} material={mat.jas} castShadow />
              <group ref={refSikuKiri} position={[0, -0.27, 0]}>
                <mesh geometry={geom.sikuSendi} material={mat.jas} />
                <mesh geometry={geom.lenganBawah} material={mat.jas} castShadow />
                <mesh
                  geometry={geom.manset}
                  material={mat.kemeja}
                  position={[0, -0.238, 0]}
                />
                <group position={[0, -0.268, 0]}>
                  <mesh
                    geometry={geom.telapak}
                    material={mat.kulit}
                    scale={[0.88, 1.05, 0.72]}
                    castShadow
                  />
                  <mesh
                    geometry={geom.jempol}
                    material={mat.kulit}
                    position={[0.018, 0.006, 0.016]}
                    rotation={[0.4, 0, -0.5]}
                  />
                </group>
              </group>
            </group>

            {/* LENGAN KANAN + BUNGA DI TANGAN */}
            <group ref={refBahuKanan} position={[0.205, 0.39, 0]}>
              <mesh geometry={geom.bahuSendi} material={mat.jas} castShadow />
              <mesh geometry={geom.lenganAtas} material={mat.jas} castShadow />
              <group ref={refSikuKanan} position={[0, -0.27, 0]}>
                <mesh geometry={geom.sikuSendi} material={mat.jas} />
                <mesh geometry={geom.lenganBawah} material={mat.jas} castShadow />
                <mesh
                  geometry={geom.manset}
                  material={mat.kemeja}
                  position={[0, -0.238, 0]}
                />
                <group ref={refTanganKanan} position={[0, -0.268, 0]}>
                  <mesh
                    geometry={geom.telapak}
                    material={mat.kulit}
                    scale={[0.88, 1.05, 0.72]}
                    castShadow
                  />
                  <mesh
                    geometry={geom.jempol}
                    material={mat.kulit}
                    position={[-0.018, 0.006, 0.016]}
                    rotation={[0.4, 0, 0.5]}
                  />
                  <group
                    ref={refBungaTangan}
                    position={[0, -0.018, 0.022]}
                    rotation={[0.55, 0, -0.1]}
                  >
                    <BungaMawarDiTangan param3DRef={param3DRef} skala={1.08} />
                  </group>
                </group>
              </group>
            </group>
          </group>

          {/* KAKI KIRI */}
          <group ref={refPahaKiri} position={[-0.088, -0.01, 0]}>
            <mesh geometry={geom.paha} material={mat.celana} castShadow />
            <group ref={refLututKiri} position={[0, -0.43, 0]}>
              <mesh geometry={geom.lututSendi} material={mat.celana} />
              <mesh geometry={geom.betis} material={mat.celana} castShadow />
              <group ref={refEngkelKiri} position={[0, -0.38, 0]}>
                <mesh
                  geometry={geom.sepatu}
                  material={mat.kulitSabuk}
                  position={[0, -0.006, 0.045]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                />
                <mesh
                  geometry={geom.solSepatu}
                  material={mat.kulitSabuk}
                  position={[0, -0.032, 0.045]}
                />
              </group>
            </group>
          </group>

          {/* KAKI KANAN */}
          <group ref={refPahaKanan} position={[0.088, -0.01, 0]}>
            <mesh geometry={geom.paha} material={mat.celana} castShadow />
            <group ref={refLututKanan} position={[0, -0.43, 0]}>
              <mesh geometry={geom.lututSendi} material={mat.celana} />
              <mesh geometry={geom.betis} material={mat.celana} castShadow />
              <group ref={refEngkelKanan} position={[0, -0.38, 0]}>
                <mesh
                  geometry={geom.sepatu}
                  material={mat.kulitSabuk}
                  position={[0, -0.006, 0.045]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                />
                <mesh
                  geometry={geom.solSepatu}
                  material={mat.kulitSabuk}
                  position={[0, -0.032, 0.045]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Bunga yang terjatuh di lantai saat ditolak */}
      <group ref={refBungaJatuh} visible={false}>
        <BungaMawarDiTangan param3DRef={param3DRef} skala={1.08} />
      </group>
    </>
  );
}
