import * as THREE from "three";

/**
 * Generates a high-resolution procedural Spider-Man compression suit texture
 * matching the red & blue athletic rashguard from the photo.
 */
export function createSpiderManTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallbackCanvas = document.createElement("canvas");
    return new THREE.CanvasTexture(fallbackCanvas);
  }

  // 1. Base deep comic blue for side torso and underarms
  const blueGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  blueGrad.addColorStop(0, "#12203e");
  blueGrad.addColorStop(0.2, "#182b52");
  blueGrad.addColorStop(0.5, "#1e3565");
  blueGrad.addColorStop(0.8, "#182b52");
  blueGrad.addColorStop(1, "#12203e");
  ctx.fillStyle = blueGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Central Athletic Red Spider Panel (chest, spine, shoulders)
  ctx.save();
  ctx.beginPath();
  // Draw an athletic tapered vest/chest shape
  ctx.moveTo(180, 0);
  ctx.lineTo(844, 0);
  ctx.quadraticCurveTo(800, 300, 760, 500);
  ctx.quadraticCurveTo(720, 750, 750, 1024);
  ctx.lineTo(274, 1024);
  ctx.quadraticCurveTo(304, 750, 264, 500);
  ctx.quadraticCurveTo(224, 300, 180, 0);
  ctx.closePath();

  const redGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  redGrad.addColorStop(0, "#c41226");
  redGrad.addColorStop(0.3, "#d9162c");
  redGrad.addColorStop(0.7, "#b80f22");
  redGrad.addColorStop(1, "#9e0a1b");
  ctx.fillStyle = redGrad;
  ctx.fill();

  // Subtle dark suit seam edge
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#0d1629";
  ctx.stroke();
  ctx.restore();

  // 3. Spider-Man Webbing Lines across the red panel
  ctx.save();
  ctx.strokeStyle = "rgba(20, 20, 25, 0.75)";
  ctx.lineWidth = 2.5;

  // Vertical/curved longitudinal web lines
  const center = 512;
  const webCols = [-260, -180, -110, -50, 0, 50, 110, 180, 260];
  webCols.forEach((offset) => {
    ctx.beginPath();
    const x = center + offset;
    ctx.moveTo(x, 0);
    ctx.quadraticCurveTo(center + offset * 0.85, 512, center + offset * 0.95, 1024);
    ctx.stroke();
  });

  // Concentric curved web arcs
  for (let r = 80; r <= 800; r += 55) {
    ctx.beginPath();
    ctx.arc(center, 380, r, 0.15 * Math.PI, 0.85 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, 380, r, 1.15 * Math.PI, 1.85 * Math.PI, false);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Iconic Center Spider Emblem
  ctx.save();
  ctx.fillStyle = "#111116";
  ctx.strokeStyle = "#111116";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const cx = 512;
  const cy = 380;

  // Spider Body (abdomen & thorax)
  ctx.beginPath();
  ctx.ellipse(cx, cy + 18, 14, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(cx, cy - 14, 11, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spider Legs (8 iconic stylized legs extending outward & downward)
  // Top 4 legs (reach up & outward)
  const drawLeg = (points: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
  };

  // Right top legs
  drawLeg([[cx + 8, cy - 14], [cx + 45, cy - 50], [cx + 80, cy - 35]]);
  drawLeg([[cx + 10, cy - 6], [cx + 55, cy - 20], [cx + 90, cy + 5]]);
  // Left top legs
  drawLeg([[cx - 8, cy - 14], [cx - 45, cy - 50], [cx - 80, cy - 35]]);
  drawLeg([[cx - 10, cy - 6], [cx - 55, cy - 20], [cx - 90, cy + 5]]);

  // Bottom 4 legs (reach down & outward)
  // Right bottom legs
  drawLeg([[cx + 10, cy + 10], [cx + 50, cy + 40], [cx + 70, cy + 90]]);
  drawLeg([[cx + 8, cy + 24], [cx + 38, cy + 60], [cx + 52, cy + 120]]);
  // Left bottom legs
  drawLeg([[cx - 10, cy + 10], [cx - 50, cy + 40], [cx - 70, cy + 90]]);
  drawLeg([[cx - 8, cy + 24], [cx - 38, cy + 60], [cx - 52, cy + 120]]);

  ctx.restore();

  // Create Three.js Texture with sRGB color space
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Traverses the loaded character model and updates materials to match
 * Aayush Bhatta's traits:
 * - Spider-Man compression rashguard suit
 * - Warm golden-tan skin tone
 * - Natural textured dark hair
 * - Dark olive athletic shorts
 * - Athletic sneakers
 */
export function applyAayushTraits(character: THREE.Object3D) {
  const spiderTexture = createSpiderManTexture();

  // Bright, radiant natural warm wheatish/peach skin tone matching Aayush's face traits
  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f2cdb2"),
    roughness: 0.52,
    metalness: 0.0,
    clearcoat: 0.04,
    clearcoatRoughness: 0.35,
    sheen: 0.45,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#fff2e8"),
  });

  // Natural deep dark textured hair matching Aayush's modern crop
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#101012"),
    roughness: 0.58,
    metalness: 0.08,
  });

  // Distinct dark defined eyebrows matching Aayush's brow traits
  const eyebrowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#121214"),
    roughness: 0.75,
  });

  // Dark olive / khaki athletic cargo shorts matching the photo
  const pantMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2d3226"),
    roughness: 0.85,
    metalness: 0.02,
  });

  // Spider-Man compression rashguard material
  const spidermanMaterial = new THREE.MeshStandardMaterial({
    map: spiderTexture,
    roughness: 0.42,
    metalness: 0.08,
  });

  // Athletic sneakers & sole
  const shoeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1c1c1f"),
    roughness: 0.6,
  });
  const soleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ececec"),
    roughness: 0.5,
  });

  character.traverse((child: any) => {
    if (child.isMesh) {
      const name = (child.name || "").toLowerCase();
      const parentName = (child.parent?.name || "").toLowerCase();
      const matName = (child.material?.name || "").toLowerCase();

      // Shirt / Upper Body -> Spider-Man compression rashguard
      if (
        name === "body.shirt" ||
        name.includes("shirt") ||
        parentName.includes("shirt") ||
        matName.includes("shirt")
      ) {
        child.material = spidermanMaterial;
        child.material.needsUpdate = true;
      }
      // Defined Eyebrows matching Aayush's traits
      else if (
        name.includes("eyebrow") ||
        parentName.includes("eyebrow")
      ) {
        child.material = eyebrowMaterial;
        child.material.needsUpdate = true;
      }
      // Hair -> Natural dark crop
      else if (
        name.includes("hair") ||
        parentName.includes("hair") ||
        name.includes("pcube3")
      ) {
        child.material = hairMaterial;
        child.material.needsUpdate = true;
      }
      // Skin nodes -> Face (Plane.007 / Face.002), Hands (Mesh.002 / Hand), Neck (Plane.005 / Neck), Ears (Plane.003 / Ear.001)
      else if (
        name.includes("hand") ||
        parentName.includes("hand") ||
        name.includes("mesh.002") ||
        name.includes("neck") ||
        parentName.includes("neck") ||
        name.includes("plane.005") ||
        name.includes("ear") ||
        parentName.includes("ear") ||
        name.includes("plane.003") ||
        name.includes("plane.007") ||
        parentName.includes("plane.007") ||
        name.includes("face") ||
        parentName.includes("face") ||
        matName.includes("skin")
      ) {
        child.material = skinMaterial;
        child.material.needsUpdate = true;
      }
      // Pants / Shorts -> Dark olive athletic shorts
      else if (
        name.includes("pant") ||
        parentName.includes("pant") ||
        name.includes("cube.004") ||
        matName.includes("olive")
      ) {
        child.material = pantMaterial;
        child.material.needsUpdate = true;
      }
      // Shoes -> Sneakers & clean sole
      else if (
        name.includes("shoe") ||
        parentName.includes("shoe") ||
        name.includes("cylinder.005") ||
        matName.includes("sneaker")
      ) {
        child.material = shoeMaterial;
        child.material.needsUpdate = true;
      } else if (
        name.includes("sole") ||
        parentName.includes("sole") ||
        name.includes("cylinder.008") ||
        matName.includes("sole")
      ) {
        child.material = soleMaterial;
        child.material.needsUpdate = true;
      }
    }
  });
}
