import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";
import {
  buatGeometriKelopak,
  buatTeksturSeratKelopak,
} from "./geometriOrganik";

interface PropertiKelopak {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  modePonsel: boolean;
}

interface DataKelopakJatuh {
  x: number;
  y: number;
  z: number;
  kecepatanJatuh: number;
  kecepatanAngin: number;
  amplitudoAyun: number;
  frekuensiAyun: number;
  fase: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  velRotX: number;
  velRotY: number;
  velRotZ: number;
  skalaX: number;
  skalaY: number;
  sudutOrbit: number;
  radiusOrbit: number;
  kecepatanOrbit: number;
}

export function Kelopak({ param3DRef, modePonsel }: PropertiKelopak) {
  const jumlah = modePonsel ? 42 : 90;
  const refInstans = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const geometri = useMemo(
    () =>
      buatGeometriKelopak({
        lebar: 0.14,
        panjang: 0.19,
        cekungan: 0.042,
        lengkungUjung: 0.032,
        gelombangTepi: 0.008,
        segmenU: 7,
        segmenV: 9,
      }),
    []
  );

  const tekstur = useMemo(() => buatTeksturSeratKelopak(), []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF",
        roughness: 0.5,
        metalness: 0.0,
        sheen: 0.6,
        sheenColor: new THREE.Color("#FFEFE3"),
        bumpMap: tekstur,
        bumpScale: 0.003,
        side: THREE.DoubleSide,
      }),
    [tekstur]
  );

  const daftarKelopak = useMemo<DataKelopakJatuh[]>(() => {
    let benih = 7531;
    const acak = () => {
      benih = (benih * 16807) % 2147483647;
      return (benih - 1) / 2147483646;
    };

    const hasil: DataKelopakJatuh[] = [];
    for (let i = 0; i < jumlah; i++) {
      hasil.push({
        x: (acak() - 0.5) * 11.5,
        y: 0.2 + acak() * 5.2,
        z: -5.5 + acak() * 10.5,
        kecepatanJatuh: 0.14 + acak() * 0.22,
        kecepatanAngin: 0.12 + acak() * 0.24,
        amplitudoAyun: 0.25 + acak() * 0.45,
        frekuensiAyun: 0.65 + acak() * 0.9,
        fase: acak() * Math.PI * 2,
        rotX: acak() * Math.PI * 2,
        rotY: acak() * Math.PI * 2,
        rotZ: acak() * Math.PI * 2,
        velRotX: (acak() - 0.5) * 0.85,
        velRotY: (acak() - 0.5) * 1.1,
        velRotZ: (acak() - 0.5) * 0.75,
        skalaX: 0.72 + acak() * 0.65,
        skalaY: 0.75 + acak() * 0.6,
        sudutOrbit: acak() * Math.PI * 2,
        radiusOrbit: 0.85 + acak() * 2.55,
        kecepatanOrbit: (0.28 + acak() * 0.35) * (acak() > 0.25 ? 1 : -1),
      });
    }
    return hasil;
  }, [jumlah]);

  useEffect(() => {
    const inst = refInstans.current;
    if (!inst) return;
    const palet = ["#FFFEFB", "#F2DDE0", "#E9C9CC", "#E3B8BC", "#D9A9AD"];
    const warna = new THREE.Color();

    for (let i = 0; i < jumlah; i++) {
      warna.set(palet[i % palet.length]);
      inst.setColorAt(i, warna);
    }
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, [jumlah]);

  useEffect(() => {
    return () => {
      geometri.dispose();
      tekstur.dispose();
      material.dispose();
    };
  }, [geometri, tekstur, material]);

  useFrame((state, delta) => {
    const inst = refInstans.current;
    if (!inst) return;

    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = param3DRef.current;

    const pusaran = p.pusaranKelopak;
    const laju = p.kecepatanKelopak;
    const doronganKamera = p.doronganKameraKelopak;

    for (let i = 0; i < jumlah; i++) {
      const k = daftarKelopak[i];

      // Gerakan jatuh alami dengan angin lembut
      k.y -= k.kecepatanJatuh * laju * dt * (1 - pusaran * 0.35);
      k.x +=
        (k.kecepatanAngin * 0.45 +
          Math.sin(t * k.frekuensiAyun + k.fase) * k.amplitudoAyun * 0.55) *
        dt;
      k.z +=
        (Math.cos(t * k.frekuensiAyun * 0.8 + k.fase) * 0.18 +
          doronganKamera * 1.85) *
        dt;

      // Pada adegan jawaban positif, kelopak menari mengelilingi bunga & kamera
      if (pusaran > 0.02) {
        k.sudutOrbit += k.kecepatanOrbit * pusaran * dt;
        const targetOrbitX = Math.cos(k.sudutOrbit) * k.radiusOrbit;
        const targetOrbitZ = Math.sin(k.sudutOrbit) * k.radiusOrbit + 0.35;
        k.x = THREE.MathUtils.lerp(k.x, targetOrbitX, pusaran * dt * 0.65);
        k.z = THREE.MathUtils.lerp(k.z, targetOrbitZ, pusaran * dt * 0.65);
      }

      // Rotasi melayang alami kelopak
      k.rotX += k.velRotX * dt * (0.7 + laju * 0.4);
      k.rotY += k.velRotY * dt * (0.7 + pusaran * 0.6);
      k.rotZ += k.velRotZ * dt;

      // Kembalikan ke atas secara mulus jika menyentuh tanah atau keluar batas
      if (k.y < -0.05) {
        k.y = 4.5 + (i % 5) * 0.25;
        k.x = ((i * 1.37) % 10) - 5;
      }
      if (k.x > 6.5) k.x = -6.2;
      if (k.x < -6.5) k.x = 6.2;
      if (k.z > 6.2) k.z = -5.5;
      if (k.z < -6.2) k.z = 5.5;

      dummy.position.set(k.x, k.y, k.z);
      dummy.rotation.set(
        k.rotX + Math.sin(t * 1.4 + k.fase) * 0.25,
        k.rotY,
        k.rotZ + Math.cos(t * 1.1 + k.fase) * 0.2
      );
      dummy.scale.set(k.skalaX, k.skalaY, 1);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }

    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={refInstans}
      args={[geometri, material, jumlah]}
      castShadow={!modePonsel}
    />
  );
}
