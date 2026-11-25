import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";

interface PropertiPartikel {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  modePonsel: boolean;
}

const PARTIKEL_VERTEX = /* glsl */ `
  uniform float uWaktu;
  uniform float uKecepatan;
  uniform float uUkuranDasar;
  uniform float uRasioPiksel;

  attribute float aUkuran;
  attribute float aFase;
  attribute float aKecepatan;

  varying float vKilau;
  varying float vFase;

  void main() {
    vec3 pos = position;
    float t = uWaktu * uKecepatan * aKecepatan;

    // Gerakan melayang perlahan dan naik lembut
    pos.x += sin(t * 0.55 + aFase) * 0.26;
    pos.y = mod(pos.y + t * 0.12 + aFase, 4.4) + 0.18;
    pos.z += cos(t * 0.48 + aFase * 1.3) * 0.22;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aUkuran * uUkuranDasar * uRasioPiksel * (22.0 / max(-mvPos.z, 1.2));
    gl_Position = projectionMatrix * mvPos;

    // Kecerahan berbeda tiap partikel
    vKilau = 0.42 + 0.58 * (0.5 + 0.5 * sin(uWaktu * 1.6 * aKecepatan + aFase * 3.1));
    vFase = aFase;
  }
`;

const PARTIKEL_FRAGMENT = /* glsl */ `
  uniform float uKecerahan;
  uniform float uFaktorSuasana;

  varying float vKilau;
  varying float vFase;

  void main() {
    vec2 tengah = gl_PointCoord - vec2(0.5);
    float jarak = length(tengah);
    if (jarak > 0.5) discard;

    // Pancaran lembut debu cahaya senja yang tetap tampak di atas langit terang maupun dedaunan
    float lingkaran = smoothstep(0.5, 0.03, jarak);
    float inti = smoothstep(0.24, 0.0, jarak);

    vec3 emasHangat = vec3(0.784, 0.659, 0.486); // #C8B28E
    vec3 putihHangat = vec3(1.0, 0.965, 0.875);
    vec3 mawarLembut = vec3(0.894, 0.745, 0.757);

    float hangat = clamp(uFaktorSuasana, 0.0, 1.0);
    vec3 warna = mix(emasHangat, mawarLembut, fract(vFase) * 0.28 * (1.0 - hangat * 0.65));
    warna = mix(warna, putihHangat, inti * (0.55 + hangat * 0.30));

    float alfa = lingkaran * vKilau * clamp(uKecerahan, 0.35, 1.5) * 0.78;
    gl_FragColor = vec4(warna, alfa);
  }
`;

export function PartikelCahaya({ param3DRef, modePonsel }: PropertiPartikel) {
  const jumlah = modePonsel ? 64 : 145;
  const refMaterial = useRef<THREE.ShaderMaterial>(null);

  const geometri = useMemo(() => {
    const posisi = new Float32Array(jumlah * 3);
    const ukuran = new Float32Array(jumlah);
    const fase = new Float32Array(jumlah);
    const kecepatan = new Float32Array(jumlah);

    let benih = 3197;
    const acak = () => {
      benih = (benih * 16807) % 2147483647;
      return (benih - 1) / 2147483646;
    };

    for (let i = 0; i < jumlah; i++) {
      // Sebar di sekitar taman dan di antara bunga tanpa memenuhi area depan teks
      const sudut = acak() * Math.PI * 2;
      const radius = 0.65 + Math.pow(acak(), 0.75) * 6.8;
      posisi[i * 3] = Math.cos(sudut) * radius;
      posisi[i * 3 + 1] = acak() * 4.2;
      posisi[i * 3 + 2] = Math.sin(sudut) * radius - 0.8;

      ukuran[i] = 0.7 + acak() * 1.45;
      fase[i] = acak() * Math.PI * 2;
      kecepatan[i] = 0.55 + acak() * 0.75;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(posisi, 3));
    geom.setAttribute("aUkuran", new THREE.BufferAttribute(ukuran, 1));
    geom.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
    geom.setAttribute("aKecepatan", new THREE.BufferAttribute(kecepatan, 1));
    return geom;
  }, [jumlah]);

  const uniforms = useMemo(
    () => ({
      uWaktu: { value: 0 },
      uKecepatan: { value: 0.8 },
      uKecerahan: { value: 0.75 },
      uFaktorSuasana: { value: 0.0 },
      uUkuranDasar: { value: modePonsel ? 1.55 : 1.75 },
      uRasioPiksel: { value: 1.0 },
    }),
    [modePonsel]
  );

  useEffect(() => {
    return () => {
      geometri.dispose();
    };
  }, [geometri]);

  useFrame((state) => {
    if (!refMaterial.current) return;
    const p = param3DRef.current;
    refMaterial.current.uniforms.uWaktu.value = state.clock.elapsedTime;
    refMaterial.current.uniforms.uKecepatan.value = p.kecepatanPartikel;
    refMaterial.current.uniforms.uKecerahan.value = p.kecerahanPartikel;
    refMaterial.current.uniforms.uFaktorSuasana.value = p.faktorSuasana;
    refMaterial.current.uniforms.uRasioPiksel.value = state.gl.getPixelRatio();
  });

  return (
    <points geometry={geometri} frustumCulled={false}>
      <shaderMaterial
        ref={refMaterial}
        vertexShader={PARTIKEL_VERTEX}
        fragmentShader={PARTIKEL_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
