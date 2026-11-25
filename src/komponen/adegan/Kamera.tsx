import { useEffect, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ParameterAdegan3D } from "../../pengelola/PengelolaAdegan";

interface PropertiKamera {
  param3DRef: MutableRefObject<ParameterAdegan3D>;
  modePonsel: boolean;
}

export function Kamera({ param3DRef, modePonsel }: PropertiKamera) {
  const { camera } = useThree();
  const targetLihat = useRef(new THREE.Vector3(0, 1.05, 0));
  const kursor = useRef({ x: 0, y: 0 });
  const kursorHalus = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (modePonsel) return;
    const saatGerak = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      kursor.current.x = nx;
      kursor.current.y = ny;
    };
    window.addEventListener("pointermove", saatGerak, { passive: true });
    return () => window.removeEventListener("pointermove", saatGerak);
  }, [modePonsel]);

  useFrame((state, delta) => {
    const p = param3DRef.current;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Paralaks sangat halus tanpa mengganggu arah utama kamera
    kursorHalus.current.x = THREE.MathUtils.lerp(
      kursorHalus.current.x,
      kursor.current.x,
      dt * 2.2
    );
    kursorHalus.current.y = THREE.MathUtils.lerp(
      kursorHalus.current.y,
      kursor.current.y,
      dt * 2.2
    );

    const napasX = Math.sin(t * 0.35) * 0.04;
    const napasY = Math.cos(t * 0.42) * 0.025;
    const geserKursorX = modePonsel ? 0 : kursorHalus.current.x * 0.08;
    const geserKursorY = modePonsel ? 0 : -kursorHalus.current.y * 0.045;

    camera.position.set(
      p.kameraPosX + napasX + geserKursorX,
      p.kameraPosY + napasY + geserKursorY,
      p.kameraPosZ
    );

    targetLihat.current.set(
      p.kameraTargetX,
      p.kameraTargetY,
      p.kameraTargetZ
    );
    camera.lookAt(targetLihat.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - p.kameraFov) > 0.01) {
        camera.fov = p.kameraFov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
