import React, { useEffect, useRef } from 'react';
import { WebGL1Renderer, PerspectiveCamera } from 'three';
import { ball } from '@src/three/ball';

const Component: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;

    if (!div) return;

    const { ballScene, ballMesh } = ball();

    const renderer = new WebGL1Renderer();

    div.appendChild(renderer.domElement);

    renderer.setPixelRatio(1);
    renderer.setSize(800, 800);

    const camera = new PerspectiveCamera(100, 1, 1, 10000);
    camera.position.set(0, 0, 2000);

    const trick = () => {
      ballMesh.rotation.y = ballMesh.rotation.y + 0.01;
      renderer.render(ballScene, camera);
      requestAnimationFrame(trick);
    };

    trick();

    return () => {
      div.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} />;
};

export const ThreeRenderer = React.memo(Component);
