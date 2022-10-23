import {
  Scene,
  SphereGeometry,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight
} from 'three';
import textureImage from '@src/assets/texture.png';

export const ball = () => {
  const ballScene = new Scene();

  const geometry = new SphereGeometry(600, 200, 200);

  const loader = new TextureLoader();

  const texture = loader.load(textureImage);

  const material = new MeshStandardMaterial({ map: texture });

  const ballMesh = new Mesh(geometry, material);

  ballScene.add(ballMesh);

  const directionalLight = new DirectionalLight(0xffffff);

  directionalLight.position.set(1, 1, 1);

  ballScene.add(directionalLight);

  return { ballScene, ballMesh };
};
