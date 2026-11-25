import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";
import {
  buatGeometriDaun,
  buatGeometriKelopak,
  buatTeksturSeratKelopak,
} from "./geometriOrganik";

interface PropertiBungaPergola {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
}

interface PropertiBungaDiTangan {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  skala?: number;
}

interface DataKelopakMawar {
  lapis: number;
  sudut: number;
  skala: number;
  kemiringanTutup: number;
  kemiringanMekar: number;
  putarZ: number;
  tinggiDasar: number;
  warna: string;
}

function buatDaftarKelopakMawar(): DataKelopakMawar[] {
  const hasil: DataKelopakMawar[] = [];
  const konfigurasiLapis = [
    { jumlah: 5, tutup: 0.14, mekar: 0.42, skala: 0.62, y: 0.018, warna: "#BD9293" },
    { jumlah: 6, tutup: 0.24, mekar: 0.7, skala: 0.8, y: 0.012, warna: "#E2B9BD" },
    { jumlah: 7, tutup: 0.34, mekar: 1.0, skala: 0.98, y: 0.005, warna: "#E9C9CC" },
    { jumlah: 8, tutup: 0.46, mekar: 1.26, skala: 1.12, y: 0.0, warna: "#F2DDE0" },
  ];

  const sudutEmas = 2.3999632;
  let idxGlobal = 0;

  konfigurasiLapis.forEach((cfg, lapis) => {
    for (let i = 0; i < cfg.jumlah; i++) {
      const sudut =
        (i / cfg.jumlah) * Math.PI * 2 + lapis * 0.52 + (idxGlobal % 2) * 0.08;
      hasil.push({
        lapis,
        sudut: sudut + sudutEmas * 0.12 * lapis,
        skala: cfg.skala * (0.95 + ((i * 37) % 10) * 0.01),
        kemiringanTutup: cfg.tutup,
        kemiringanMekar: cfg.mekar,
        putarZ: ((i % 3) - 1) * 0.06,
        tinggiDasar: cfg.y,
        warna: i % 3 === 0 && lapis === 3 ? "#FFFEFB" : cfg.warna,
      });
      idxGlobal++;
    }
  });

  return hasil;
}

/**
 * Setangkai mawar tiga dimensi terperinci yang dapat mekar maupun terkulai layu
 * di tangan karakter atau ketika jatuh ke lantai teras.
 */
export function BungaMawarDiTangan({
  param3DRef,
  skala = 1,
}: PropertiBungaDiTangan) {
  const refKelopak = useRef<(THREE.Group | null)[]>([]);
  const refKepala = useRef<THREE.Group>(null);
  const refBatangAtas = useRef<THREE.Group>(null);
  const refBenangSari = useRef<THREE.Group>(null);

  const daftarKelopak = useMemo(() => buatDaftarKelopakMawar(), []);

  const geomKelopak = useMemo(
    () =>
      buatGeometriKelopak({
        lebar: 0.145,
        panjang: 0.2,
        cekungan: 0.044,
        lengkungUjung: 0.036,
        gelombangTepi: 0.007,
        segmenU: 10,
        segmenV: 12,
      }),
    []
  );

  const geomSepals = useMemo(
    () =>
      buatGeometriKelopak({
        lebar: 0.05,
        panjang: 0.11,
        cekungan: 0.015,
        lengkungUjung: 0.02,
        gelombangTepi: 0.002,
        segmenU: 6,
        segmenV: 8,
      }),
    []
  );

  const geomDaun = useMemo(() => buatGeometriDaun(0.095, 0.18), []);
  const geomBatangBawah = useMemo(
    () => new THREE.CylinderGeometry(0.009, 0.01, 0.24, 8),
    []
  );
  const geomBatangAtas = useMemo(
    () => new THREE.CylinderGeometry(0.008, 0.009, 0.16, 8),
    []
  );

  const tekstur = useMemo(() => buatTeksturSeratKelopak(), []);

  const matKelopak = useMemo(() => {
    const map = new Map<string, THREE.MeshPhysicalMaterial>();
    for (const w of ["#BD9293", "#E2B9BD", "#E9C9CC", "#F2DDE0", "#FFFEFB"]) {
      map.set(
        w,
        new THREE.MeshPhysicalMaterial({
          color: w,
          roughness: 0.5,
          sheen: 0.55,
          sheenColor: new THREE.Color("#FFF4EA"),
          bumpMap: tekstur,
          bumpScale: 0.003,
          emissive: new THREE.Color("#C8B28E"),
          emissiveIntensity: 0.03,
          side: THREE.DoubleSide,
        })
      );
    }
    return map;
  }, [tekstur]);

  const matBatang = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#677757",
        roughness: 0.74,
        side: THREE.DoubleSide,
      }),
    []
  );

  const matSari = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8B28E",
        emissive: new THREE.Color("#E8C98F"),
        emissiveIntensity: 0.35,
        roughness: 0.45,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geomKelopak.dispose();
      geomSepals.dispose();
      geomDaun.dispose();
      geomBatangBawah.dispose();
      geomBatangAtas.dispose();
      tekstur.dispose();
      matKelopak.forEach((m) => m.dispose());
      matBatang.dispose();
      matSari.dispose();
    };
  }, [
    geomKelopak,
    geomSepals,
    geomDaun,
    geomBatangBawah,
    geomBatangAtas,
    tekstur,
    matKelopak,
    matBatang,
    matSari,
  ]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = param3DRef.current;
    const layu = THREE.MathUtils.clamp(p.layuBunga, 0, 1);
    const layuHalus = layu * layu * (3 - 2 * layu);

    if (refBatangAtas.current) {
      refBatangAtas.current.rotation.x = layuHalus * 0.65;
      refBatangAtas.current.rotation.z = layuHalus * 0.25;
    }

    if (refKepala.current) {
      refKepala.current.rotation.x = 0.14 + layuHalus * 0.36;
    }

    daftarKelopak.forEach((data, idx) => {
      const grup = refKelopak.current[idx];
      if (!grup) return;

      const offsetLapis = (3 - data.lapis) * 0.1;
      const progresLokal = THREE.MathUtils.clamp(
        (p.mekarUtama - offsetLapis * 0.5) / (1 - offsetLapis * 0.5),
        0,
        1
      );
      const halus = progresLokal * progresLokal * (3 - 2 * progresLokal);
      const napas = Math.sin(t * 1.2 + idx * 0.45) * 0.015 * (1 - layuHalus * 0.7);
      const sudutBuka = THREE.MathUtils.lerp(
        data.kemiringanTutup,
        data.kemiringanMekar,
        halus
      );

      grup.rotation.x = sudutBuka + napas + layuHalus * (0.38 + data.lapis * 0.12);
      grup.rotation.z = layuHalus * (idx % 2 === 0 ? 0.12 : -0.12);
      grup.scale.set(1 - layuHalus * 0.06, 1 - layuHalus * 0.08, 1);
    });

    if (refBenangSari.current) {
      refBenangSari.current.scale.setScalar(
        THREE.MathUtils.lerp(0.65, 1.05, p.mekarUtama) * (1 - layuHalus * 0.18)
      );
    }

    matSari.emissiveIntensity =
      (0.25 + p.intensitasEmas * 0.38) * (1 - layuHalus * 0.85);
    const pancaran =
      (0.02 + Math.max(0, p.faktorSuasana) * 0.055) * (1 - layuHalus);
    matKelopak.forEach((m) => {
      m.emissiveIntensity = pancaran;
      m.sheen = 0.55 * (1 - layuHalus * 0.72);
    });
  });

  return (
    <group scale={skala}>
      {/* Pangkal tangkai di genggaman */}
      <mesh
        geometry={geomBatangBawah}
        material={matBatang}
        position={[0, 0.02, 0]}
        castShadow
      />
      <mesh
        geometry={geomDaun}
        material={matBatang}
        position={[0, 0.09, 0]}
        rotation={[1.05, 0.5, 0.7]}
        castShadow
      />

      {/* Bagian atas tangkai yang dapat melengkung saat layu */}
      <group ref={refBatangAtas} position={[0, 0.14, 0]}>
        <mesh
          geometry={geomBatangAtas}
          material={matBatang}
          position={[0, 0.08, 0]}
          castShadow
        />
        <mesh
          geometry={geomDaun}
          material={matBatang}
          position={[0, 0.06, 0]}
          rotation={[1.1, -0.7, -0.7]}
          scale={0.85}
          castShadow
        />

        <group ref={refKepala} position={[0, 0.16, 0]} rotation={[0.14, 0, 0]}>
          {[0, 1, 2, 3, 4].map((s) => (
            <group key={s} rotation={[0, (s / 5) * Math.PI * 2, 0]}>
              <mesh
                geometry={geomSepals}
                material={matBatang}
                rotation={[1.7, 0, 0]}
              />
            </group>
          ))}

          <group ref={refBenangSari}>
            <mesh position={[0, 0.018, 0]} material={matSari}>
              <sphereGeometry args={[0.022, 10, 8]} />
            </mesh>
          </group>

          {daftarKelopak.map((data, idx) => {
            const radius = 0.01 + data.lapis * 0.007;
            const px = Math.sin(data.sudut) * radius;
            const pz = Math.cos(data.sudut) * radius;
            const bahan =
              matKelopak.get(data.warna) ?? matKelopak.get("#E9C9CC")!;
            return (
              <group
                key={idx}
                position={[px, data.tinggiDasar, pz]}
                rotation={[0, data.sudut, data.putarZ]}
              >
                <group
                  ref={(el) => {
                    refKelopak.current[idx] = el;
                  }}
                  rotation={[data.kemiringanTutup, 0, 0]}
                >
                  <mesh
                    geometry={geomKelopak}
                    material={bahan}
                    scale={data.skala}
                    castShadow
                  />
                </group>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
}

/**
 * Bunga-bunga pengiring di pergola sulur anggur dan vas kecil di meja makan
 * untuk menyatukan suasana taman senja romantis.
 */
export function Bunga({ param3DRef }: PropertiBungaPergola) {
  const refVasBunga = useRef<THREE.Group>(null);
  const refBungaPergola = useRef<THREE.Group>(null);

  const geomKelopak = useMemo(
    () =>
      buatGeometriKelopak({
        lebar: 0.12,
        panjang: 0.16,
        cekungan: 0.036,
        lengkungUjung: 0.026,
        segmenU: 7,
        segmenV: 9,
      }),
    []
  );
  const geomVas = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.036, 0),
      new THREE.Vector2(0.044, 0.06),
      new THREE.Vector2(0.022, 0.13),
      new THREE.Vector2(0.028, 0.15),
    ];
    return new THREE.LatheGeometry(pts, 16);
  }, []);
  const geomTangkaiKecil = useMemo(
    () => new THREE.CylinderGeometry(0.006, 0.006, 0.18, 6),
    []
  );

  const matVas = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#F7F4EE",
        roughness: 0.25,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );
  const matTangkai = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#687658", roughness: 0.8 }),
    []
  );
  const matKelopakMeja = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#E9C9CC",
        roughness: 0.52,
        sheen: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );
  const matKelopakPutih = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#FFFEFB",
        roughness: 0.52,
        sheen: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geomKelopak.dispose();
      geomVas.dispose();
      geomTangkaiKecil.dispose();
      matVas.dispose();
      matTangkai.dispose();
      matKelopakMeja.dispose();
      matKelopakPutih.dispose();
    };
  }, [
    geomKelopak,
    geomVas,
    geomTangkaiKecil,
    matVas,
    matTangkai,
    matKelopakMeja,
    matKelopakPutih,
  ]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = param3DRef.current;

    if (refVasBunga.current) {
      refVasBunga.current.rotation.z = Math.sin(t * 0.9) * 0.018;
    }
    if (refBungaPergola.current) {
      refBungaPergola.current.children.forEach((b, idx) => {
        b.rotation.z = Math.sin(t * 1.1 + idx * 1.3) * 0.04;
      });
    }

    matKelopakMeja.emissiveIntensity = Math.max(0, p.faktorSuasana) * 0.04;
  });

  const posisiMawarPergola: [number, number, number][] = [
    [-2.05, 1.45, -1.88],
    [-2.08, 2.25, -1.86],
    [2.05, 1.65, -1.85],
    [2.05, 2.38, 1.85],
    [-2.04, 1.9, 1.88],
    [0.85, 2.86, -1.1],
    [-0.95, 2.86, 1.15],
  ];

  return (
    <group>
      {/* Vas bunga kecil di sudut meja makan */}
      <group position={[-1.2, 0.77, -0.68]}>
        <mesh geometry={geomVas} material={matVas} castShadow />
        <group ref={refVasBunga} position={[0, 0.14, 0]}>
          <mesh geometry={geomTangkaiKecil} material={matTangkai} position={[0, 0.05, 0]} />
          <group position={[0, 0.13, 0]} scale={0.62}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <group key={i} rotation={[0, (i / 6) * Math.PI * 2, 0]}>
                <mesh
                  geometry={geomKelopak}
                  material={i % 2 === 0 ? matKelopakMeja : matKelopakPutih}
                  rotation={[0.68, 0, 0]}
                />
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* Mawar-mawar rambat kecil di sulur pergola */}
      <group ref={refBungaPergola}>
        {posisiMawarPergola.map((pos, idx) => (
          <group key={idx} position={pos} rotation={[0.45, idx * 0.8, 0]} scale={0.72}>
            {[0, 1, 2, 3, 4].map((k) => (
              <group key={k} rotation={[0, (k / 5) * Math.PI * 2, 0]}>
                <mesh
                  geometry={geomKelopak}
                  material={idx % 2 === 0 ? matKelopakMeja : matKelopakPutih}
                  rotation={[0.75, 0, 0]}
                />
              </group>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}
