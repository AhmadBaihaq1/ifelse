import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";
import { buatGeometriDaun } from "./geometriOrganik";

interface PropertiLingkungan {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  modePonsel: boolean;
}

const LANGIT_VERTEX = /* glsl */ `
  varying vec3 vArahDunia;
  void main() {
    vec4 posisiDunia = modelMatrix * vec4(position, 1.0);
    vArahDunia = normalize(posisiDunia.xyz);
    gl_Position = projectionMatrix * viewMatrix * posisiDunia;
  }
`;

const LANGIT_FRAGMENT = /* glsl */ `
  uniform float uWaktu;
  uniform float uFaktorSuasana;
  uniform vec3 uArahMatahari;
  varying vec3 vArahDunia;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.04 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vArahDunia);
    float tinggi = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    float horizon = smoothstep(0.45, 0.72, tinggi);
    float puncak = smoothstep(0.60, 0.96, tinggi);

    vec3 warnaHorizon = vec3(0.973, 0.953, 0.937); // #F8F3EF
    vec3 warnaTengah = vec3(0.949, 0.867, 0.878);  // #F2DDE0
    vec3 warnaAtas = vec3(0.835, 0.706, 0.718);

    float hangat = clamp(uFaktorSuasana, 0.0, 1.0);
    float tenang = clamp(-uFaktorSuasana * 2.0, 0.0, 1.0);

    warnaHorizon = mix(warnaHorizon, vec3(0.992, 0.953, 0.894), hangat * 0.55);
    warnaTengah = mix(warnaTengah, vec3(0.953, 0.831, 0.761), hangat * 0.45);
    warnaAtas = mix(warnaAtas, vec3(0.882, 0.788, 0.784), tenang * 0.35);

    vec3 warnaLangit = mix(warnaHorizon, warnaTengah, horizon);
    warnaLangit = mix(warnaLangit, warnaAtas, puncak);

    float sudutMatahari = max(dot(dir, normalize(uArahMatahari)), 0.0);
    float haloLuas = pow(sudutMatahari, 4.0) * (0.28 + hangat * 0.22 - tenang * 0.12);
    float intiMatahari = smoothstep(0.9935, 0.9988, sudutMatahari) * (0.65 - tenang * 0.25);
    vec3 warnaEmas = vec3(0.965, 0.867, 0.722);
    warnaLangit += warnaEmas * haloLuas;
    warnaLangit = mix(warnaLangit, vec3(1.0, 0.976, 0.922), intiMatahari);

    if (dir.y > 0.02) {
      vec2 uvAwan = dir.xz / (dir.y + 0.32) * 1.45 + vec2(uWaktu * 0.008, uWaktu * 0.004);
      float bentukAwan = smoothstep(0.46, 0.82, fbm(uvAwan));
      float pudarHorizon = smoothstep(0.02, 0.24, dir.y) * (1.0 - smoothstep(0.45, 0.92, dir.y));
      vec3 warnaAwan = mix(vec3(0.992, 0.965, 0.945), vec3(0.973, 0.875, 0.773), haloLuas * 1.5);
      warnaLangit = mix(warnaLangit, warnaAwan, bentukAwan * pudarHorizon * 0.36);
    }

    gl_FragColor = vec4(warnaLangit, 1.0);
  }
`;

function nilaiTinggiTanah(x: number, z: number): number {
  const jarakPusat = Math.hypot(x, z);
  const perataanTeras = THREE.MathUtils.smoothstep(jarakPusat, 3.6, 7.2);
  const gelombang =
    Math.sin(x * 0.28 + 0.4) * Math.cos(z * 0.24 - 0.3) * 0.48 +
    Math.sin(x * 0.62 - z * 0.45) * 0.16;
  const gundukanJauh = Math.max(0, -z - 5.2) * 0.085;
  return (gelombang + gundukanJauh) * perataanTeras;
}

function buatKursiBistro(): {
  dudukan: THREE.CylinderGeometry;
  sandaran: THREE.TubeGeometry;
  kaki: THREE.CylinderGeometry;
} {
  const dudukan = new THREE.CylinderGeometry(0.21, 0.2, 0.032, 18);
  const kurvaSandaran = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.44, -0.14),
    new THREE.Vector3(-0.15, 0.78, -0.19),
    new THREE.Vector3(0.0, 0.88, -0.21),
    new THREE.Vector3(0.15, 0.78, -0.19),
    new THREE.Vector3(0.18, 0.44, -0.14),
  ]);
  const sandaran = new THREE.TubeGeometry(kurvaSandaran, 18, 0.016, 8, false);
  const kaki = new THREE.CylinderGeometry(0.014, 0.011, 0.45, 8);
  return { dudukan, sandaran, kaki };
}

export function Lingkungan({ param3DRef, modePonsel }: PropertiLingkungan) {
  const { scene } = useThree();

  const refMatahari = useRef<THREE.DirectionalLight>(null);
  const refLembayung = useRef<THREE.DirectionalLight>(null);
  const refHemisphere = useRef<THREE.HemisphereLight>(null);
  const refCahayaPergola = useRef<THREE.PointLight>(null);
  const refCahayaLilin = useRef<THREE.PointLight>(null);
  const refApiLilin = useRef<THREE.Mesh>(null);
  const refRumput = useRef<THREE.InstancedMesh>(null);
  const refDaunSulur = useRef<THREE.InstancedMesh>(null);
  const refBuahAnggur = useRef<THREE.InstancedMesh>(null);
  const refKabut = useRef<THREE.Fog>(null);

  const uniformLangit = useMemo(
    () => ({
      uWaktu: { value: 0 },
      uFaktorSuasana: { value: 0 },
      uArahMatahari: { value: new THREE.Vector3(-0.52, 0.22, -0.82) },
    }),
    []
  );

  const uniformRumput = useMemo(() => ({ uWaktu: { value: 0 } }), []);

  // Hamparan taman lembut di sekitar teras vine dining
  const geometriTanah = useMemo(() => {
    const geom = new THREE.PlaneGeometry(46, 46, 68, 68);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const warna: number[] = [];
    const colRumput = new THREE.Color("#868E70");
    const colKebun = new THREE.Color("#9BA184");
    const colTeduh = new THREE.Color("#736F5E");
    const colTmp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, nilaiTinggiTanah(x, z) - 0.025);

      const jarak = Math.hypot(x, z);
      const tKebun = 1 - THREE.MathUtils.smoothstep(jarak, 2.5, 8.5);
      const tTeduh = THREE.MathUtils.smoothstep(jarak, 6.0, 17.0);
      colTmp.copy(colRumput).lerp(colKebun, tKebun * 0.6).lerp(colTeduh, tTeduh * 0.45);
      warna.push(colTmp.r, colTmp.g, colTmp.b);
    }

    geom.setAttribute("color", new THREE.Float32BufferAttribute(warna, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Teras batu hangat di bawah pergola vine dining
  const geomTeras = useMemo(() => {
    const g = new THREE.CylinderGeometry(3.45, 3.65, 0.055, 48);
    return g;
  }, []);
  const geomBatuTepi = useMemo(() => new THREE.TorusGeometry(3.5, 0.055, 8, 48), []);

  // Rumput lembut di luar teras
  const jumlahRumput = modePonsel ? 520 : 1200;
  const geometriRumput = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.055, 0.42, 1, 5);
    geom.translate(0, 0.21, 0);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = y / 0.42;
      pos.setX(i, pos.getX(i) * (1 - Math.pow(t, 1.3) * 0.88));
      pos.setZ(i, Math.pow(t, 1.8) * 0.08);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const materialRumput = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#8D9676",
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    mat.customProgramCacheKey = () => "rumput-angin-v1";
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uWaktu = uniformRumput.uWaktu;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\nuniform float uWaktu;`)
        .replace(
          "#include <begin_vertex>",
          `
          #include <begin_vertex>
          float tinggiNorm = clamp(position.y / 0.42, 0.0, 1.0);
          #ifdef USE_INSTANCING
          vec4 posisiInstans = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          #else
          vec4 posisiInstans = vec4(0.0);
          #endif
          float faseAngin = posisiInstans.x * 0.55 + posisiInstans.z * 0.42 + uWaktu * 1.45;
          float ayun = (sin(faseAngin) * 0.08 + sin(faseAngin * 1.9) * 0.03) * (tinggiNorm * tinggiNorm);
          transformed.x += ayun;
          transformed.z += ayun * 0.45;
          `
        );
    };
    return mat;
  }, [uniformRumput]);

  // Pergola & sulur tanaman anggur (vine dining canopy)
  const geomPilar = useMemo(() => new THREE.CylinderGeometry(0.075, 0.085, 3.05, 10), []);
  const geomBalokUtama = useMemo(() => new THREE.BoxGeometry(0.11, 0.14, 4.7), []);
  const geomKasoAtas = useMemo(() => new THREE.BoxGeometry(4.9, 0.085, 0.085), []);

  const geomSulur = useMemo(() => {
    const kurva1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.15, 0.0, -1.95),
      new THREE.Vector3(-2.25, 1.15, -1.78),
      new THREE.Vector3(-2.08, 2.35, -1.92),
      new THREE.Vector3(-1.85, 3.05, -1.55),
      new THREE.Vector3(-0.3, 3.02, -0.85),
      new THREE.Vector3(1.4, 3.04, -1.2),
      new THREE.Vector3(2.15, 2.88, -1.9),
    ]);
    const kurva2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.15, 0.0, 1.95),
      new THREE.Vector3(2.26, 1.1, 1.78),
      new THREE.Vector3(2.05, 2.4, 1.85),
      new THREE.Vector3(1.5, 3.06, 1.1),
      new THREE.Vector3(-0.4, 3.0, 0.55),
      new THREE.Vector3(-2.0, 3.05, 1.3),
    ]);
    return {
      sulur1: new THREE.TubeGeometry(kurva1, 36, 0.028, 7, false),
      sulur2: new THREE.TubeGeometry(kurva2, 32, 0.025, 7, false),
    };
  }, []);

  // Untaian kabel lampu gantung
  const geomKabelLampu = useMemo(() => {
    const k1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 2.95, -1.4),
      new THREE.Vector3(-0.8, 2.66, -0.85),
      new THREE.Vector3(0.6, 2.62, -0.55),
      new THREE.Vector3(2.1, 2.95, -0.95),
    ]);
    const k2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 2.95, 0.75),
      new THREE.Vector3(-0.5, 2.64, 0.45),
      new THREE.Vector3(0.9, 2.66, 0.65),
      new THREE.Vector3(2.1, 2.95, 1.15),
    ]);
    return {
      kabel1: new THREE.TubeGeometry(k1, 24, 0.008, 6, false),
      kabel2: new THREE.TubeGeometry(k2, 24, 0.008, 6, false),
      titikLampu: [
        ...k1.getPoints(7).slice(1, 7),
        ...k2.getPoints(7).slice(1, 7),
      ],
    };
  }, []);

  const geomBohlam = useMemo(() => new THREE.SphereGeometry(0.042, 10, 8), []);
  const geomDaunAnggur = useMemo(() => buatGeometriDaun(0.24, 0.34), []);
  const geomBuahAnggur = useMemo(() => new THREE.SphereGeometry(0.032, 8, 6), []);

  // Geometri meja & perlengkapan dining
  const geomKakiMeja = useMemo(() => new THREE.CylinderGeometry(0.032, 0.045, 0.74, 12), []);
  const geomAlasMeja = useMemo(() => new THREE.CylinderGeometry(0.26, 0.3, 0.035, 20), []);
  const geomDaunMeja = useMemo(() => new THREE.CylinderGeometry(0.56, 0.54, 0.04, 32), []);
  const geomKainMeja = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.57, 0.69, 0.34, 32, 1, true);
    return g;
  }, []);
  const geomPiring = useMemo(() => new THREE.CylinderGeometry(0.14, 0.11, 0.018, 24), []);
  const geomGelas = useMemo(() => {
    const titik = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.036, 0.0),
      new THREE.Vector2(0.007, 0.01),
      new THREE.Vector2(0.006, 0.075),
      new THREE.Vector2(0.04, 0.115),
      new THREE.Vector2(0.044, 0.155),
      new THREE.Vector2(0.038, 0.18),
    ];
    return new THREE.LatheGeometry(titik, 16);
  }, []);
  const geomIsiAnggur = useMemo(() => new THREE.CylinderGeometry(0.036, 0.025, 0.042, 14), []);
  const geomLilin = useMemo(() => new THREE.CylinderGeometry(0.026, 0.028, 0.11, 12), []);
  const geomKacaLentera = useMemo(
    () => new THREE.CylinderGeometry(0.056, 0.052, 0.16, 16, 1, true),
    []
  );
  const geomApiLilin = useMemo(() => new THREE.SphereGeometry(0.015, 8, 8), []);
  const geomKursi = useMemo(() => buatKursiBistro(), []);

  // Material
  const matTeras = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#DFD3C6", roughness: 0.9 }),
    []
  );
  const matBatuTepi = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#C6B7A7", roughness: 0.92 }),
    []
  );
  const matKayu = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#685145", roughness: 0.86 }),
    []
  );
  const matSulur = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5E4C3E", roughness: 0.9 }),
    []
  );
  const matKabel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3A322E", roughness: 0.7 }),
    []
  );
  const matBohlam = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFF6DE",
        emissive: new THREE.Color("#FFD79A"),
        emissiveIntensity: 1.5,
        roughness: 0.25,
      }),
    []
  );
  const matDaunAnggur = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#72815E",
        roughness: 0.72,
        side: THREE.DoubleSide,
      }),
    []
  );
  const matBuahAnggur = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7D5764",
        roughness: 0.42,
      }),
    []
  );
  const matBesi = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4A413C", roughness: 0.6, metalness: 0.35 }),
    []
  );
  const matKainMeja = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F7F4EE",
        roughness: 0.88,
        side: THREE.DoubleSide,
      }),
    []
  );
  const matPiring = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#FFFEFB", roughness: 0.25 }),
    []
  );
  const matKaca = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#FFFEFB",
        roughness: 0.08,
        metalness: 0.05,
        transparent: true,
        opacity: 0.48,
        side: THREE.DoubleSide,
      }),
    []
  );
  const matAnggurGelas = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#BD7A7F",
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );
  const matLilin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#FAF4E8", roughness: 0.65 }),
    []
  );
  const matApi = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FFE3A8",
      }),
    []
  );

  // Sebar rumput di luar teras
  useEffect(() => {
    const mesh = refRumput.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const warna = new THREE.Color();
    const c1 = new THREE.Color("#8B9474");
    const c2 = new THREE.Color("#A3A685");
    const c3 = new THREE.Color("#737C61");
    let benih = 4219;
    const acak = () => {
      benih = (benih * 16807) % 2147483647;
      return (benih - 1) / 2147483646;
    };

    for (let i = 0; i < jumlahRumput; i++) {
      const sudut = acak() * Math.PI * 2;
      const radius = 3.65 + Math.pow(acak(), 0.78) * 9.5;
      const x = Math.cos(sudut) * radius;
      const z = Math.sin(sudut) * radius - 0.8;
      const y = nilaiTinggiTanah(x, z);
      dummy.position.set(x, y - 0.03, z);
      dummy.rotation.set((acak() - 0.5) * 0.18, acak() * Math.PI * 2, (acak() - 0.5) * 0.18);
      dummy.scale.set(0.85 + acak() * 0.5, 0.7 + acak() * 0.9, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const pilih = acak();
      warna.copy(pilih < 0.4 ? c1 : pilih < 0.78 ? c2 : c3);
      mesh.setColorAt(i, warna);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [jumlahRumput]);

  // Sebar daun sulur anggur & buah anggur di pilar dan atap pergola
  const jumlahDaunSulur = modePonsel ? 95 : 165;
  const jumlahBuahAnggur = modePonsel ? 60 : 108;

  useEffect(() => {
    const daunInst = refDaunSulur.current;
    const buahInst = refBuahAnggur.current;
    if (!daunInst || !buahInst) return;

    const dummy = new THREE.Object3D();
    const warna = new THREE.Color();
    const paletDaun = ["#6D7E58", "#7E8E68", "#5E6E4D", "#8A966E"];

    let benih = 6173;
    const acak = () => {
      benih = (benih * 16807) % 2147483647;
      return (benih - 1) / 2147483646;
    };

    for (let i = 0; i < jumlahDaunSulur; i++) {
      if (i < jumlahDaunSulur * 0.32) {
        // Daun merambat di pilar
        const pilarIdx = i % 4;
        const px = pilarIdx < 2 ? -2.15 : 2.15;
        const pz = pilarIdx % 2 === 0 ? -1.95 : 1.95;
        dummy.position.set(
          px + (acak() - 0.5) * 0.34,
          0.55 + acak() * 2.45,
          pz + (acak() - 0.5) * 0.34
        );
      } else {
        // Kanopi daun di atas pergola
        dummy.position.set(
          (acak() - 0.5) * 4.4,
          2.88 + (acak() - 0.5) * 0.28,
          (acak() - 0.5) * 4.0
        );
      }
      dummy.rotation.set(
        0.5 + acak() * 1.4,
        acak() * Math.PI * 2,
        (acak() - 0.5) * 0.8
      );
      const s = 0.72 + acak() * 0.62;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      daunInst.setMatrixAt(i, dummy.matrix);
      warna.set(paletDaun[i % paletDaun.length]);
      daunInst.setColorAt(i, warna);
    }
    daunInst.instanceMatrix.needsUpdate = true;
    if (daunInst.instanceColor) daunInst.instanceColor.needsUpdate = true;

    // 9 tandan anggur menggantung dari pergola
    const posisiTandan: [number, number, number][] = [
      [-1.55, 2.92, -1.25],
      [-0.85, 2.94, -1.55],
      [0.45, 2.95, -1.35],
      [1.45, 2.92, -1.1],
      [-1.65, 2.9, 0.45],
      [1.65, 2.92, 0.6],
      [-0.55, 2.96, 1.35],
      [0.85, 2.94, 1.25],
      [1.82, 2.92, -0.25],
    ];
    for (let i = 0; i < jumlahBuahAnggur; i++) {
      const tandan = posisiTandan[i % posisiTandan.length];
      const urutan = Math.floor(i / posisiTandan.length);
      const tTinggi = urutan / (jumlahBuahAnggur / posisiTandan.length);
      const radiusTandan = (1 - tTinggi * 0.75) * 0.058;
      const sudut = urutan * 2.2;
      dummy.position.set(
        tandan[0] + Math.cos(sudut) * radiusTandan,
        tandan[1] - tTinggi * 0.19,
        tandan[2] + Math.sin(sudut) * radiusTandan
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.85 + (1 - tTinggi) * 0.35);
      dummy.updateMatrix();
      buahInst.setMatrixAt(i, dummy.matrix);
    }
    buahInst.instanceMatrix.needsUpdate = true;
  }, [jumlahDaunSulur, jumlahBuahAnggur]);

  useEffect(() => {
    return () => {
      geometriTanah.dispose();
      geomTeras.dispose();
      geomBatuTepi.dispose();
      geometriRumput.dispose();
      materialRumput.dispose();
      geomPilar.dispose();
      geomBalokUtama.dispose();
      geomKasoAtas.dispose();
      geomSulur.sulur1.dispose();
      geomSulur.sulur2.dispose();
      geomKabelLampu.kabel1.dispose();
      geomKabelLampu.kabel2.dispose();
      geomBohlam.dispose();
      geomDaunAnggur.dispose();
      geomBuahAnggur.dispose();
      geomKakiMeja.dispose();
      geomAlasMeja.dispose();
      geomDaunMeja.dispose();
      geomKainMeja.dispose();
      geomPiring.dispose();
      geomGelas.dispose();
      geomIsiAnggur.dispose();
      geomLilin.dispose();
      geomKacaLentera.dispose();
      geomApiLilin.dispose();
      geomKursi.dudukan.dispose();
      geomKursi.sandaran.dispose();
      geomKursi.kaki.dispose();
      matTeras.dispose();
      matBatuTepi.dispose();
      matKayu.dispose();
      matSulur.dispose();
      matKabel.dispose();
      matBohlam.dispose();
      matDaunAnggur.dispose();
      matBuahAnggur.dispose();
      matBesi.dispose();
      matKainMeja.dispose();
      matPiring.dispose();
      matKaca.dispose();
      matAnggurGelas.dispose();
      matLilin.dispose();
      matApi.dispose();
    };
  }, [
    geometriTanah,
    geomTeras,
    geomBatuTepi,
    geometriRumput,
    materialRumput,
    geomPilar,
    geomBalokUtama,
    geomKasoAtas,
    geomSulur,
    geomKabelLampu,
    geomBohlam,
    geomDaunAnggur,
    geomBuahAnggur,
    geomKakiMeja,
    geomAlasMeja,
    geomDaunMeja,
    geomKainMeja,
    geomPiring,
    geomGelas,
    geomIsiAnggur,
    geomLilin,
    geomKacaLentera,
    geomApiLilin,
    geomKursi,
    matTeras,
    matBatuTepi,
    matKayu,
    matSulur,
    matKabel,
    matBohlam,
    matDaunAnggur,
    matBuahAnggur,
    matBesi,
    matKainMeja,
    matPiring,
    matKaca,
    matAnggurGelas,
    matLilin,
    matApi,
  ]);

  const warnaKabutDasar = useMemo(() => new THREE.Color("#F5EAE4"), []);
  const warnaKabutEmas = useMemo(() => new THREE.Color("#FBF0E2"), []);
  const warnaKabutTenang = useMemo(() => new THREE.Color("#EFE7E4"), []);
  const warnaMatahariDasar = useMemo(() => new THREE.Color("#FFD7A6"), []);
  const warnaMatahariEmas = useMemo(() => new THREE.Color("#FFE5BA"), []);
  const warnaMatahariTenang = useMemo(() => new THREE.Color("#EED4C5"), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = param3DRef.current;

    uniformLangit.uWaktu.value = t;
    uniformLangit.uFaktorSuasana.value = p.faktorSuasana;
    uniformRumput.uWaktu.value = t;

    const hangat = THREE.MathUtils.clamp(p.faktorSuasana, 0, 1);
    const tenang = THREE.MathUtils.clamp(-p.faktorSuasana * 2, 0, 1);

    if (refMatahari.current) {
      refMatahari.current.intensity = p.intensitasMatahari;
      refMatahari.current.color
        .copy(warnaMatahariDasar)
        .lerp(warnaMatahariEmas, hangat)
        .lerp(warnaMatahariTenang, tenang);
    }
    if (refLembayung.current) {
      refLembayung.current.intensity = p.intensitasLembayung * 0.72;
    }
    if (refHemisphere.current) {
      refHemisphere.current.intensity = p.intensitasLembayung * 0.92;
    }
    if (refCahayaPergola.current) {
      refCahayaPergola.current.intensity = 0.85 + p.intensitasEmas * 0.85;
    }

    // Kedip lembut api lilin meja makan
    const kedip = 1 + Math.sin(t * 7.2) * 0.08 + Math.cos(t * 11.3) * 0.05;
    if (refCahayaLilin.current) {
      refCahayaLilin.current.intensity = (0.72 + hangat * 0.3 - tenang * 0.15) * kedip;
    }
    if (refApiLilin.current) {
      refApiLilin.current.scale.set(1, 1.35 * kedip, 1);
    }

    matBohlam.emissiveIntensity = 1.25 + hangat * 0.75 - tenang * 0.35;

    if (refKabut.current) {
      refKabut.current.near = p.jarakKabutDekat;
      refKabut.current.far = p.jarakKabutJauh;
      refKabut.current.color
        .copy(warnaKabutDasar)
        .lerp(warnaKabutEmas, hangat * 0.5)
        .lerp(warnaKabutTenang, tenang * 0.6);
      scene.background = refKabut.current.color;
    }
  });

  const posisiPilar: [number, number, number][] = [
    [-2.15, 1.52, -1.95],
    [2.15, 1.52, -1.95],
    [-2.15, 1.52, 1.95],
    [2.15, 1.52, 1.95],
  ];

  return (
    <>
      <fog ref={refKabut} attach="fog" args={["#F5EAE4", 8.5, 26]} />

      {/* Kubah Langit Senja */}
      <mesh frustumCulled={false}>
        <sphereGeometry args={[42, 32, 24]} />
        <shaderMaterial
          vertexShader={LANGIT_VERTEX}
          fragmentShader={LANGIT_FRAGMENT}
          uniforms={uniformLangit}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Sistem Pencahayaan Senja & Pergola */}
      <hemisphereLight ref={refHemisphere} args={["#FAF0EB", "#79665E", 0.92]} />
      <directionalLight
        ref={refMatahari}
        position={[-7.5, 4.8, -8.5]}
        intensity={1.65}
        color="#FFD7A6"
        castShadow
        shadow-mapSize={[modePonsel ? 512 : 1024, modePonsel ? 512 : 1024]}
        shadow-camera-near={1}
        shadow-camera-far={26}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={6}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      <directionalLight
        ref={refLembayung}
        position={[5.0, 3.0, 6.2]}
        intensity={0.7}
        color="#E9C9CC"
      />
      <pointLight
        ref={refCahayaPergola}
        position={[0.1, 2.55, 0.2]}
        intensity={1.2}
        distance={8.5}
        decay={2}
        color="#FFDDA8"
      />

      {/* Hamparan Taman & Teras Vine Dining */}
      <mesh geometry={geometriTanah} receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.94} />
      </mesh>
      <mesh geometry={geomTeras} material={matTeras} position={[0, -0.028, 0]} receiveShadow />
      <mesh
        geometry={geomBatuTepi}
        material={matBatuTepi}
        position={[0, -0.02, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      />

      {/* Rumput Lembut di Sekeliling Teras */}
      <instancedMesh
        ref={refRumput}
        args={[geometriRumput, materialRumput, jumlahRumput]}
        receiveShadow
      />

      {/* PERGOLA ANGGUR & LAMPU GANTUNG */}
      <group>
        {posisiPilar.map((pos, i) => (
          <mesh key={i} geometry={geomPilar} material={matKayu} position={pos} castShadow receiveShadow />
        ))}
        <mesh geometry={geomBalokUtama} material={matKayu} position={[-2.15, 3.05, 0]} castShadow />
        <mesh geometry={geomBalokUtama} material={matKayu} position={[2.15, 3.05, 0]} castShadow />
        {[-1.7, -0.85, 0, 0.85, 1.7].map((zPos, i) => (
          <mesh
            key={i}
            geometry={geomKasoAtas}
            material={matKayu}
            position={[0, 3.13, zPos]}
            castShadow
          />
        ))}
        <mesh geometry={geomSulur.sulur1} material={matSulur} castShadow />
        <mesh geometry={geomSulur.sulur2} material={matSulur} castShadow />
        <instancedMesh
          ref={refDaunSulur}
          args={[geomDaunAnggur, matDaunAnggur, jumlahDaunSulur]}
          castShadow={!modePonsel}
        />
        <instancedMesh
          ref={refBuahAnggur}
          args={[geomBuahAnggur, matBuahAnggur, jumlahBuahAnggur]}
        />

        {/* Untaian Lampu Hangat */}
        <mesh geometry={geomKabelLampu.kabel1} material={matKabel} />
        <mesh geometry={geomKabelLampu.kabel2} material={matKabel} />
        {geomKabelLampu.titikLampu.map((pt, idx) => (
          <mesh key={idx} geometry={geomBohlam} material={matBohlam} position={pt} />
        ))}
      </group>

      {/* MEJA MAKAN MALAM ROMANTIS */}
      <group position={[-1.08, 0, -0.52]}>
        <mesh geometry={geomAlasMeja} material={matBesi} position={[0, 0.018, 0]} receiveShadow />
        <mesh geometry={geomKakiMeja} material={matBesi} position={[0, 0.38, 0]} castShadow />
        <mesh geometry={geomDaunMeja} material={matKainMeja} position={[0, 0.75, 0]} castShadow receiveShadow />
        <mesh geometry={geomKainMeja} material={matKainMeja} position={[0, 0.59, 0]} castShadow />

        {/* Piring & Gelas Anggur */}
        <mesh geometry={geomPiring} material={matPiring} position={[-0.25, 0.778, 0.14]} castShadow />
        <mesh geometry={geomPiring} material={matPiring} position={[0.25, 0.778, -0.14]} castShadow />

        <group position={[-0.14, 0.77, 0.25]}>
          <mesh geometry={geomGelas} material={matKaca} />
          <mesh geometry={geomIsiAnggur} material={matAnggurGelas} position={[0, 0.125, 0]} />
        </group>
        <group position={[0.14, 0.77, -0.25]}>
          <mesh geometry={geomGelas} material={matKaca} />
          <mesh geometry={geomIsiAnggur} material={matAnggurGelas} position={[0, 0.125, 0]} />
        </group>

        {/* Lentera Lilin Meja */}
        <group position={[0, 0.77, 0]}>
          <mesh geometry={geomLilin} material={matLilin} position={[0, 0.055, 0]} />
          <mesh geometry={geomKacaLentera} material={matKaca} position={[0, 0.08, 0]} />
          <mesh ref={refApiLilin} geometry={geomApiLilin} material={matApi} position={[0, 0.125, 0]} />
          <pointLight
            ref={refCahayaLilin}
            position={[0, 0.24, 0]}
            intensity={0.75}
            distance={3.6}
            decay={2}
            color="#FFD59A"
          />
        </group>

        {/* Dua Kursi Bistro */}
        {[
          { pos: [-0.68, 0, 0.34] as [number, number, number], rotY: 1.1 },
          { pos: [0.68, 0, -0.34] as [number, number, number], rotY: -2.04 },
        ].map((k, idx) => (
          <group key={idx} position={k.pos} rotation={[0, k.rotY, 0]}>
            <mesh geometry={geomKursi.dudukan} material={matKayu} position={[0, 0.44, 0]} castShadow />
            <mesh geometry={geomKursi.sandaran} material={matBesi} castShadow />
            {[
              [-0.14, 0.22, -0.14],
              [0.14, 0.22, -0.14],
              [-0.14, 0.22, 0.14],
              [0.14, 0.22, 0.14],
            ].map((kp, j) => (
              <mesh
                key={j}
                geometry={geomKursi.kaki}
                material={matBesi}
                position={kp as [number, number, number]}
                castShadow
              />
            ))}
          </group>
        ))}
      </group>
    </>
  );
}
