import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Main front key light to illuminate face and skin naturally with flattering warmth
  const keyLight = new THREE.DirectionalLight(0xfff6ee, 0);
  keyLight.intensity = 0;
  keyLight.position.set(1.5, 14, 18);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  // Soft ambient fill light for natural skin tone warmth and soft shadows
  const ambientLight = new THREE.AmbientLight(0xfff0e4, 0);
  scene.add(ambientLight);

  // Rim back light for subtle silhouette separation
  const rimLight = new THREE.DirectionalLight(0xdde8ff, 0);
  rimLight.intensity = 0;
  rimLight.position.set(-2, 10, -4);
  scene.add(rimLight);

  // Screen/keyboard point light
  const pointLight = new THREE.PointLight(0xa5c4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  scene.add(pointLight);

  const basePath = import.meta.env.BASE_URL || "/";
  new RGBELoader()
    .setPath(`${basePath}models/`)
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.72,
      duration: duration,
      ease: ease,
    });
    gsap.to(keyLight, {
      intensity: 1.35,
      duration: duration,
      ease: ease,
    });
    gsap.to(ambientLight, {
      intensity: 0.65,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 0.75,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
