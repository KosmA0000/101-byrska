import React, { useEffect, useRef } from "react";

export default function CinematicCameraCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup = null;

    // three.js dociagany asynchronicznie, zeby ~600KB tej biblioteki nie
    // blokowalo pierwszego renderu strony - efekt jest czysto dekoracyjny.
    import("three").then((THREE) => {
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 8;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);

      // Sparse golden particle field
      const count = 220;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xb89d62,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let raf = null;
      // Pauzowana zarowno poza viewportem (IO) jak i na niewidocznej karcie
      // (visibilitychange) - petla WebGL nie ma po co zuzywac GPU/baterii w tle.
      let inViewport = true;
      let tabVisible = document.visibilityState !== "hidden";
      const clock = new THREE.Clock();

      function shouldRun() {
        return inViewport && tabVisible;
      }

      function animate() {
        if (!shouldRun()) {
          raf = null;
          return;
        }
        const t = clock.getElapsedTime();
        points.rotation.y = t * 0.02;
        points.rotation.x = t * 0.01;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      }
      animate();

      const io = new IntersectionObserver(([entry]) => {
        inViewport = entry.isIntersecting;
        if (shouldRun() && !raf) animate();
      });
      io.observe(mount);

      function onVisibilityChange() {
        tabVisible = document.visibilityState !== "hidden";
        if (shouldRun() && !raf) animate();
      }
      document.addEventListener("visibilitychange", onVisibilityChange);

      function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener("resize", onResize);

      cleanup = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("resize", onResize);
        if (raf) cancelAnimationFrame(raf);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
