import { Component, type MutableRefObject, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";
import { Lingkungan } from "./Lingkungan";
import { Bunga } from "./Bunga";
import { KarakterLakiLaki } from "./KarakterLakiLaki";
import { Kelopak } from "./Kelopak";
import { PartikelCahaya } from "./PartikelCahaya";
import { Kamera } from "./Kamera";

interface PropertiPanggung {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  modePonsel: boolean;
  onGagalWebGL: () => void;
}

interface StateBatasKesalahan {
  gagal: boolean;
}

class BatasKesalahanCanvas extends Component<
  { children: ReactNode; onGagal: () => void },
  StateBatasKesalahan
> {
  state: StateBatasKesalahan = { gagal: false };

  static getDerivedStateFromError(): StateBatasKesalahan {
    return { gagal: true };
  }

  componentDidCatch(): void {
    this.props.onGagal();
  }

  render() {
    if (this.state.gagal) return null;
    return this.props.children;
  }
}

export function cekDukunganWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const kanvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (kanvas.getContext("webgl2") ||
          kanvas.getContext("webgl") ||
          kanvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function PanggungTigaDimensi({
  param3DRef,
  modePonsel,
  onGagalWebGL,
}: PropertiPanggung) {
  return (
    <BatasKesalahanCanvas onGagal={onGagalWebGL}>
      <div className="fixed inset-0 z-0 h-full w-full">
        <Canvas
          shadows
          dpr={modePonsel ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.02,
          }}
          camera={{
            position: [0.55, 1.56, 5.45],
            fov: modePonsel ? 46 : 40,
            near: 0.1,
            far: 90,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              onGagalWebGL();
            });
          }}
        >
          <Kamera param3DRef={param3DRef} modePonsel={modePonsel} />
          <Lingkungan param3DRef={param3DRef} modePonsel={modePonsel} />
          <Bunga param3DRef={param3DRef} />
          <KarakterLakiLaki param3DRef={param3DRef} />
          <Kelopak param3DRef={param3DRef} modePonsel={modePonsel} />
          <PartikelCahaya param3DRef={param3DRef} modePonsel={modePonsel} />
        </Canvas>
      </div>
    </BatasKesalahanCanvas>
  );
}
