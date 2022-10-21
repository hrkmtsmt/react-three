import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import textureImage from '@src/assets/texture.png'

const Component: React.FC = () => {
  
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const div = ref.current;
    
    if (!div) return;

    const renderer = new THREE.WebGL1Renderer();
    
    div.appendChild(renderer.domElement);
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(400, 400);
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    camera.position.set(0, 0, +1000);
    
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    
    const loader = new THREE.TextureLoader();
    
    const texture = loader.load(textureImage);
    
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    scene.add(mesh);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    
    scene.add(directionalLight);
    
    const trick = () => {
      mesh.rotation.y = mesh.rotation.y + 0.01
      renderer.render(scene, camera);
      requestAnimationFrame(trick);
    }
    
    trick();
    
    return () => {
      div.removeChild(renderer.domElement);
    }

  }, [])

  return <div ref={ref} />
};

export const ThreeRenderer = React.memo(Component)