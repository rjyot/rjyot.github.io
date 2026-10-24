"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aAccent;
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vAccent;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;
    float drift = sin(uTime * 0.35 + position.y * 2.2 + position.x) * 0.045;
    pos.z += drift;

    float dist = distance(pos.xy, uMouse);
    float falloff = smoothstep(1.85, 0.0, dist);
    vec2 dir = normalize(pos.xy - uMouse + vec2(0.0001));
    pos.xy += dir * falloff * 0.48;
    pos.z += falloff * 0.32;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = 1.6 + aScale * 1.4 + falloff * 2.2;
    gl_PointSize = clamp(size, 1.0, 6.5);
    vAccent = aAccent;
    vTwinkle = 0.45 + 0.55 * aScale / 2.2;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAccent;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float circle = smoothstep(0.5, 0.16, dist);
    if (circle < 0.02) discard;
    vec3 blue = vec3(0.48, 0.68, 1.0);
    vec3 amber = vec3(0.94, 0.71, 0.42);
    vec3 color = mix(blue, amber, vAccent);
    gl_FragColor = vec4(color, circle * vTwinkle);
  }
`;

function Field({ mouse }: { mouse: React.RefObject<THREE.Vector2> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const count = window.innerWidth < 768 ? 120 : 320;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const accents = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * index;
      const shell = 2.35;
      positions[index * 3] = Math.cos(theta) * radius * shell;
      positions[index * 3 + 1] = y * shell * 0.78;
      positions[index * 3 + 2] = Math.sin(theta) * radius * shell;
      const noise = Math.abs(Math.sin(index * 12.9898) * 43758.5453);
      scales[index] = 0.55 + (noise - Math.floor(noise)) * 1.65;
      accents[index] = index % 19 === 0 ? 1 : 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aAccent", new THREE.BufferAttribute(accents, 1));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    const points = pointsRef.current;
    if (!material || !points) return;
    material.uniforms.uTime.value += delta;
    const target = mouse.current;
    const current = material.uniforms.uMouse.value as THREE.Vector2;
    current.x = THREE.MathUtils.damp(current.x, target.x * 1.7, 3.2, delta);
    current.y = THREE.MathUtils.damp(current.y, target.y * 1.15, 3.2, delta);
    points.rotation.y += delta * 0.07;
    points.rotation.x = THREE.MathUtils.damp(points.rotation.x, state.pointer.y * 0.08, 2, delta);
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry?.isIntersecting ?? false);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        className={`h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        dpr={1}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          setReady(true);
        }}
      >
        <Field mouse={mouse} />
      </Canvas>
    </div>
  );
}
