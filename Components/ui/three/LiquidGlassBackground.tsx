import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidGlassBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x7c3aed, 0.5);
    pointLight1.position.set(-10, -10, -5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 0.5);
    pointLight2.position.set(10, -10, 5);
    scene.add(pointLight2);

    // Create liquid spheres
    const spheres = [];
    const sphereConfigs = [
      { pos: [-4, 2, -3], scale: 2, color: 0x3b82f6, speed: 0.5 },
      { pos: [4, -1, -5], scale: 3, color: 0x7c3aed, speed: 0.3 },
      { pos: [0, 3, -4], scale: 1.5, color: 0x8b5cf6, speed: 0.7 },
      { pos: [-3, -2, -2], scale: 1, color: 0x6366f1, speed: 0.6 },
      { pos: [5, 2, -6], scale: 2.5, color: 0xa78bfa, speed: 0.4 },
    ];

    sphereConfigs.forEach((config) => {
      const geometry = new THREE.IcosahedronGeometry(config.scale, 4);
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...config.pos);
      mesh.userData = { 
        originalPos: [...config.pos], 
        speed: config.speed 
      };
      scene.add(mesh);
      spheres.push(mesh);
    });

    // Create particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      spheres.forEach((sphere) => {
        const { originalPos, speed } = sphere.userData;
        const t = time * speed;
        sphere.position.x = originalPos[0] + Math.sin(t) * 0.5;
        sphere.position.y = originalPos[1] + Math.cos(t * 0.8) * 0.3;
        sphere.position.z = originalPos[2] + Math.sin(t * 0.5) * 0.2;
        sphere.rotation.x = t * 0.2;
        sphere.rotation.y = t * 0.3;
      });

      particles.rotation.y = time * 0.02;
      particles.rotation.x = time * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      spheres.forEach((sphere) => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950" />
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
    </div>
  );
}