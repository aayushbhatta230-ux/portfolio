import * as THREE from "three";

/**
 * Generates an ultra-detailed, high-resolution procedural Iron Man Mark 85
 * nanotech armor texture featuring:
 * - Hot-rod crimson red metallic lacquer
 * - Polished gold titanium clavicle, shoulder & rib plates
 * - The iconic glowing Stark Arc Reactor (Unibeam) with copper induction coils
 * - Carbon-fiber composite flex joint paneling
 */
export function createIronManChestTexture(): {
  diffuse: THREE.CanvasTexture;
  emissive: THREE.CanvasTexture;
} {
  const size = 2048;

  // --- 1. DIFFUSE TEXTURE CANVAS ---
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Fallback if 2D context unavailable
  if (!ctx) {
    const fallback = new THREE.CanvasTexture(document.createElement("canvas"));
    return { diffuse: fallback, emissive: fallback };
  }

  // --- 2. EMISSIVE TEXTURE CANVAS (for glowing Arc Reactor & conduits) ---
  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = size;
  emissiveCanvas.height = size;
  const eCtx = emissiveCanvas.getContext("2d")!;
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, size, size);

  // Background: Deep metallic hot-rod crimson with titanium gradient
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, "#740815");
  bgGrad.addColorStop(0.25, "#8d0b1a");
  bgGrad.addColorStop(0.5, "#a60f21");
  bgGrad.addColorStop(0.75, "#8d0b1a");
  bgGrad.addColorStop(1, "#5e0510");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Subtle metallic horizontal micro-grain
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let y = 0; y < size; y += 4) {
    ctx.fillRect(0, y, size, 2);
  }
  ctx.restore();

  // Dark ballistic carbon-fiber side flanks (underarms & lats)
  ctx.save();
  ctx.fillStyle = "#15171d";
  // Left flank
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(360, 0);
  ctx.quadraticCurveTo(450, 700, 320, size);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.fill();
  // Right flank
  ctx.beginPath();
  ctx.moveTo(size, 0);
  ctx.lineTo(size - 360, 0);
  ctx.quadraticCurveTo(size - 450, 700, size - 320, size);
  ctx.lineTo(size, size);
  ctx.closePath();
  ctx.fill();

  // Carbon weave texture on flanks
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 2;
  for (let i = -size; i < size; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }
  ctx.restore();

  // Pectoral Armor Main Plates (Crimson lacquer with bevels)
  const cx = size / 2; // 1024
  const cy = 760;     // Chest center

  ctx.save();
  // Left Pectoral Plate
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 260);
  ctx.lineTo(cx - 480, cy - 240);
  ctx.lineTo(cx - 520, cy + 80);
  ctx.lineTo(cx - 240, cy + 180);
  ctx.lineTo(cx - 30, cy + 60);
  ctx.closePath();
  const pecGradL = ctx.createLinearGradient(cx - 480, cy - 240, cx - 30, cy + 180);
  pecGradL.addColorStop(0, "#b01224");
  pecGradL.addColorStop(0.5, "#d31a30");
  pecGradL.addColorStop(1, "#800816");
  ctx.fillStyle = pecGradL;
  ctx.fill();
  ctx.strokeStyle = "#40040a";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Right Pectoral Plate
  ctx.beginPath();
  ctx.moveTo(cx + 30, cy - 260);
  ctx.lineTo(cx + 480, cy - 240);
  ctx.lineTo(cx + 520, cy + 80);
  ctx.lineTo(cx + 240, cy + 180);
  ctx.lineTo(cx + 30, cy + 60);
  ctx.closePath();
  const pecGradR = ctx.createLinearGradient(cx + 480, cy - 240, cx + 30, cy + 180);
  pecGradR.addColorStop(0, "#b01224");
  pecGradR.addColorStop(0.5, "#d31a30");
  pecGradR.addColorStop(1, "#800816");
  ctx.fillStyle = pecGradR;
  ctx.fill();
  ctx.strokeStyle = "#40040a";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.restore();

  // Polished Gold Titanium Clavicle & Shoulder Pauldrons (Top chest)
  ctx.save();
  const goldGrad = ctx.createLinearGradient(0, 0, size, 400);
  goldGrad.addColorStop(0, "#c69214");
  goldGrad.addColorStop(0.25, "#e5b80b");
  goldGrad.addColorStop(0.5, "#ffd700");
  goldGrad.addColorStop(0.75, "#e5b80b");
  goldGrad.addColorStop(1, "#a8740d");

  // Left Gold Shoulder/Clavicle Plate
  ctx.beginPath();
  ctx.moveTo(cx - 80, 0);
  ctx.lineTo(cx - 560, 0);
  ctx.lineTo(cx - 580, 360);
  ctx.lineTo(cx - 420, 380);
  ctx.lineTo(cx - 160, 160);
  ctx.closePath();
  ctx.fillStyle = goldGrad;
  ctx.fill();
  ctx.strokeStyle = "#634505";
  ctx.lineWidth = 8;
  ctx.stroke();

  // Right Gold Shoulder/Clavicle Plate
  ctx.beginPath();
  ctx.moveTo(cx + 80, 0);
  ctx.lineTo(cx + 560, 0);
  ctx.lineTo(cx + 580, 360);
  ctx.lineTo(cx + 420, 380);
  ctx.lineTo(cx + 160, 160);
  ctx.closePath();
  ctx.fillStyle = goldGrad;
  ctx.fill();
  ctx.strokeStyle = "#634505";
  ctx.lineWidth = 8;
  ctx.stroke();

  // High-Tech Gold Nanotech Collar Rim (Connecting naturally to neck)
  ctx.beginPath();
  ctx.ellipse(cx, 100, 220, 70, 0, 0, Math.PI * 2);
  ctx.lineWidth = 22;
  ctx.strokeStyle = goldGrad;
  ctx.stroke();
  ctx.restore();

  // Abdominal Segmented Nanotech Plating (Below Arc Reactor)
  ctx.save();
  const abYStarts = [cy + 220, cy + 420, cy + 620, cy + 820];
  abYStarts.forEach((abY, idx) => {
    const width = 580 - idx * 55;
    // Main red plate
    ctx.beginPath();
    ctx.roundRect(cx - width / 2, abY, width, 140, 18);
    const abGrad = ctx.createLinearGradient(cx - width / 2, abY, cx + width / 2, abY + 140);
    abGrad.addColorStop(0, "#880917");
    abGrad.addColorStop(0.5, "#af1224");
    abGrad.addColorStop(1, "#690611");
    ctx.fillStyle = abGrad;
    ctx.fill();
    ctx.strokeStyle = "#2b0207";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Gold lateral accent tabs on abs
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - width / 2 + 15, abY + 30, 45, 80);
    ctx.fillRect(cx + width / 2 - 60, abY + 30, 45, 80);

    // Glowing micro-seam in center of abs
    eCtx.fillStyle = "rgba(0, 245, 255, 0.25)";
    eCtx.fillRect(cx - 3, abY + 20, 6, 100);
  });
  ctx.restore();

  // ==============================================================
  // THE ICONIC STARK MARK-85 ARC REACTOR (UNIBEAM)
  // ==============================================================
  const reactorRadius = 150;

  // 1. Titanium Chrome Inverted Triangle / Hexagonal Housing
  ctx.save();
  ctx.beginPath();
  const housingPoints = [
    [cx, cy - reactorRadius * 1.35],
    [cx + reactorRadius * 1.3, cy - reactorRadius * 0.55],
    [cx + reactorRadius * 0.95, cy + reactorRadius * 1.15],
    [cx, cy + reactorRadius * 1.38],
    [cx - reactorRadius * 0.95, cy + reactorRadius * 1.15],
    [cx - reactorRadius * 1.3, cy - reactorRadius * 0.55],
  ];
  ctx.moveTo(housingPoints[0][0], housingPoints[0][1]);
  for (let i = 1; i < housingPoints.length; i++) {
    ctx.lineTo(housingPoints[i][0], housingPoints[i][1]);
  }
  ctx.closePath();
  const housingGrad = ctx.createLinearGradient(cx - reactorRadius, cy - reactorRadius, cx + reactorRadius, cy + reactorRadius);
  housingGrad.addColorStop(0, "#e2e8f0");
  housingGrad.addColorStop(0.5, "#64748b");
  housingGrad.addColorStop(1, "#1e293b");
  ctx.fillStyle = housingGrad;
  ctx.fill();
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 14;
  ctx.stroke();

  // Gold Inner Bezel
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();
  ctx.restore();

  // 2. Outer Magnetic Containment Ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, reactorRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#090d16";
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#38bdf8";
  ctx.stroke();

  // 3. 10 Segmented Copper Induction Coils around the reactor
  const numCoils = 10;
  for (let i = 0; i < numCoils; i++) {
    const angle = (i * 2 * Math.PI) / numCoils;
    const coilX = cx + Math.cos(angle) * (reactorRadius - 26);
    const coilY = cy + Math.sin(angle) * (reactorRadius - 26);
    ctx.save();
    ctx.translate(coilX, coilY);
    ctx.rotate(angle);
    ctx.fillStyle = "#d97706"; // Polished copper
    ctx.fillRect(-12, -22, 24, 44);
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 3;
    ctx.strokeRect(-12, -22, 24, 44);
    ctx.restore();
  }

  // 4. Inner Radiant Plasma Fusion Core (Diffuse Canvas)
  const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, reactorRadius - 40);
  coreGrad.addColorStop(0, "#ffffff");
  coreGrad.addColorStop(0.2, "#e0f2fe");
  coreGrad.addColorStop(0.5, "#38bdf8");
  coreGrad.addColorStop(0.8, "#0284c7");
  coreGrad.addColorStop(1, "#082f49");
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, reactorRadius - 38, 0, Math.PI * 2);
  ctx.fill();

  // Unibeam Tri-Core Geometric Laser Aperture
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const tx = cx + Math.cos(angle) * 48;
    const ty = cy + Math.sin(angle) * 48;
    if (i === 0) ctx.moveTo(tx, ty);
    else ctx.lineTo(tx, ty);
  }
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f5ff";
  ctx.shadowBlur = 35;
  ctx.fill();
  ctx.restore();

  // 5. STARK INDUSTRIES Laser-etched Serial
  ctx.save();
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
  ctx.textAlign = "center";
  ctx.fillText("STARK IND. // MARK 85", cx, cy - reactorRadius * 1.55);
  ctx.restore();

  // ==============================================================
  // EMISSIVE MAP: Intense Arc Reactor Glow & Energy Conduits
  // ==============================================================
  eCtx.save();
  // Radial energy flare from the Arc Reactor
  const eCoreGrad = eCtx.createRadialGradient(cx, cy, 5, cx, cy, reactorRadius + 20);
  eCoreGrad.addColorStop(0, "#ffffff");
  eCoreGrad.addColorStop(0.35, "#00f5ff");
  eCoreGrad.addColorStop(0.7, "#0284c7");
  eCoreGrad.addColorStop(1, "#000000");
  eCtx.fillStyle = eCoreGrad;
  eCtx.beginPath();
  eCtx.arc(cx, cy, reactorRadius + 20, 0, Math.PI * 2);
  eCtx.fill();

  // Glowing nanotech energy conduits leading to shoulders & clavicle
  eCtx.strokeStyle = "#00f5ff";
  eCtx.lineWidth = 14;
  eCtx.shadowColor = "#00f5ff";
  eCtx.shadowBlur = 30;

  // Left conduit
  eCtx.beginPath();
  eCtx.moveTo(cx - reactorRadius * 0.8, cy - reactorRadius * 0.8);
  eCtx.lineTo(cx - 380, cy - 320);
  eCtx.lineTo(cx - 520, 180);
  eCtx.stroke();

  // Right conduit
  eCtx.beginPath();
  eCtx.moveTo(cx + reactorRadius * 0.8, cy - reactorRadius * 0.8);
  eCtx.lineTo(cx + 380, cy - 320);
  eCtx.lineTo(cx + 520, 180);
  eCtx.stroke();

  // Downward abdominal power bus
  eCtx.beginPath();
  eCtx.moveTo(cx, cy + reactorRadius * 1.1);
  eCtx.lineTo(cx, cy + 980);
  eCtx.stroke();
  eCtx.restore();

  // --- THREE.JS TEXTURES ---
  const diffuseTexture = new THREE.CanvasTexture(canvas);
  diffuseTexture.colorSpace = THREE.SRGBColorSpace;
  diffuseTexture.wrapS = THREE.RepeatWrapping;
  diffuseTexture.wrapT = THREE.RepeatWrapping;
  diffuseTexture.needsUpdate = true;

  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  emissiveTexture.colorSpace = THREE.SRGBColorSpace;
  emissiveTexture.wrapS = THREE.RepeatWrapping;
  emissiveTexture.wrapT = THREE.RepeatWrapping;
  emissiveTexture.needsUpdate = true;

  return { diffuse: diffuseTexture, emissive: emissiveTexture };
}

/**
 * Generates an Iron Man Gauntlet Texture for the hands with:
 * - Crimson and gold armored plates
 * - Center palm glowing circular Repulsor Node
 */
export function createIronManGauntletTexture(): {
  diffuse: THREE.CanvasTexture;
  emissive: THREE.CanvasTexture;
} {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = size;
  emissiveCanvas.height = size;
  const eCtx = emissiveCanvas.getContext("2d")!;
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, size, size);

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(document.createElement("canvas"));
    return { diffuse: fallback, emissive: fallback };
  }

  // Base metallic hot-rod crimson
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#8d0b1a");
  grad.addColorStop(0.5, "#b51428");
  grad.addColorStop(1, "#660612");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Gold Knuckle and gauntlet cuff armor
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(80, 40, size - 160, 160);
  ctx.fillRect(80, size - 200, size - 160, 160);

  // Palm Repulsor Node (Center palm)
  const rx = size / 2;
  const ry = size / 2;
  const rRadius = 140;

  // Titanium Repulsor Bezel
  ctx.beginPath();
  ctx.arc(rx, ry, rRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#334155";
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#cbd5e1";
  ctx.stroke();

  // Glowing Plasma Repulsor Lens
  const repGrad = ctx.createRadialGradient(rx, ry, 5, rx, ry, rRadius - 20);
  repGrad.addColorStop(0, "#ffffff");
  repGrad.addColorStop(0.3, "#a5f3fc");
  repGrad.addColorStop(0.7, "#00f5ff");
  repGrad.addColorStop(1, "#0284c7");
  ctx.fillStyle = repGrad;
  ctx.beginPath();
  ctx.arc(rx, ry, rRadius - 16, 0, Math.PI * 2);
  ctx.fill();

  // Emissive Gauntlet Repulsor Core
  const eRepGrad = eCtx.createRadialGradient(rx, ry, 5, rx, ry, rRadius + 30);
  eRepGrad.addColorStop(0, "#ffffff");
  eRepGrad.addColorStop(0.4, "#00f5ff");
  eRepGrad.addColorStop(0.8, "#0284c7");
  eRepGrad.addColorStop(1, "#000000");
  eCtx.fillStyle = eRepGrad;
  eCtx.beginPath();
  eCtx.arc(rx, ry, rRadius + 30, 0, Math.PI * 2);
  eCtx.fill();

  const diffuse = new THREE.CanvasTexture(canvas);
  diffuse.colorSpace = THREE.SRGBColorSpace;
  diffuse.needsUpdate = true;

  const emissive = new THREE.CanvasTexture(emissiveCanvas);
  emissive.colorSpace = THREE.SRGBColorSpace;
  emissive.needsUpdate = true;

  return { diffuse, emissive };
}

/**
 * Traverses the loaded character model and dresses it as Iron Man Mark 85
 * while holding Aayush Bhatta's authentic facial identity, skin tone, brows, and hair.
 */
export function applyAayushIronMan(character: THREE.Object3D) {
  const { diffuse: chestDiffuse, emissive: chestEmissive } = createIronManChestTexture();
  const { diffuse: gauntletDiffuse, emissive: gauntletEmissive } = createIronManGauntletTexture();

  // 1. AAYUSH'S AUTHENTIC APPEARANCE (Preserved faithfully)
  // Warm golden-wheatish skin tone matching Aayush's photo
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d59e78"),
    roughness: 0.68,
    metalness: 0.0,
  });

  // Natural deep dark textured hair matching Aayush's modern crop
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#101012"),
    roughness: 0.58,
    metalness: 0.08,
  });

  // Defined dark natural eyebrows
  const eyebrowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#121214"),
    roughness: 0.75,
  });

  // 2. IRON MAN MARK-85 TORSO ARMOR (High-tech metallic crimson & gold with glowing Arc Reactor)
  const ironManChestMaterial = new THREE.MeshStandardMaterial({
    map: chestDiffuse,
    emissiveMap: chestEmissive,
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 2.4,
    roughness: 0.22,
    metalness: 0.88,
  });

  // 3. IRON MAN GAUNTLETS & PALM REPULSORS
  const ironManGauntletMaterial = new THREE.MeshStandardMaterial({
    map: gauntletDiffuse,
    emissiveMap: gauntletEmissive,
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 2.2,
    roughness: 0.25,
    metalness: 0.85,
  });

  // 4. IRON MAN GREAVES & LEG ARMOR (Metallic crimson with gold titanium knee caps)
  const ironManLegMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8f0c1c"),
    roughness: 0.26,
    metalness: 0.86,
  });

  // 5. IRON MAN FLIGHT THRUSTER BOOTS
  const ironManBootsMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7b0917"),
    roughness: 0.24,
    metalness: 0.9,
  });

  // Glowing cyan flight thruster sole stabilizers
  const ironManThrusterSoleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e0f2fe"),
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 3.0,
    roughness: 0.2,
    metalness: 0.5,
  });

  // Apply materials across the character hierarchy
  character.traverse((child: any) => {
    if (child.isMesh) {
      const name = (child.name || "").toLowerCase();
      const parentName = (child.parent?.name || "").toLowerCase();
      const matName = (child.material?.name || "").toLowerCase();

      // --- TORSO / UPPER BODY: IRON MAN SUIT WITH ARC REACTOR ---
      if (
        name === "body.shirt" ||
        name.includes("shirt") ||
        parentName.includes("shirt") ||
        matName.includes("shirt")
      ) {
        child.material = ironManChestMaterial;
        child.material.needsUpdate = true;
      }
      // --- HANDS: IRON MAN REPULSOR GAUNTLETS ---
      else if (
        name.includes("hand") ||
        parentName.includes("hand") ||
        name.includes("mesh.002")
      ) {
        child.material = ironManGauntletMaterial;
        child.material.needsUpdate = true;
      }
      // --- EYEBROWS: AAYUSH'S DEFINED BROWS ---
      else if (
        name.includes("eyebrow") ||
        parentName.includes("eyebrow")
      ) {
        child.material = eyebrowMaterial;
        child.material.needsUpdate = true;
      }
      // --- HAIR: AAYUSH'S NATURAL DARK TEXTURED CROP ---
      else if (
        name.includes("hair") ||
        parentName.includes("hair") ||
        name.includes("pcube3")
      ) {
        child.material = hairMaterial;
        child.material.needsUpdate = true;
      }
      // --- FACE, EARS & NECK: AAYUSH'S AUTHENTIC IDENTITY ---
      else if (
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
      // --- LEGS / PANTS: IRON MAN ARMOR GREAVES ---
      else if (
        name.includes("pant") ||
        parentName.includes("pant") ||
        name.includes("cube.004") ||
        matName.includes("olive")
      ) {
        child.material = ironManLegMaterial;
        child.material.needsUpdate = true;
      }
      // --- BOOTS: IRON MAN FLIGHT BOOTS ---
      else if (
        name.includes("shoe") ||
        parentName.includes("shoe") ||
        name.includes("cylinder.005") ||
        matName.includes("sneaker")
      ) {
        child.material = ironManBootsMaterial;
        child.material.needsUpdate = true;
      }
      // --- SOLES: GLOWING CYAN FLIGHT THRUSTER PADS ---
      else if (
        name.includes("sole") ||
        parentName.includes("sole") ||
        name.includes("cylinder.008") ||
        matName.includes("sole")
      ) {
        child.material = ironManThrusterSoleMaterial;
        child.material.needsUpdate = true;
      }
    }
  });

  // --- 3D CHEST ARC REACTOR GLOWING LIGHT ---
  // Attach an active cyan PointLight to the upper spine/chest bone
  // so the Arc Reactor genuinely illuminates the chest armor, collar & hands!
  const chestBone = character.getObjectByName("spine005") || character.getObjectByName("spine004");
  const existingReactorLight = character.getObjectByName("arcReactorLight");
  if (!existingReactorLight) {
    const arcReactorLight = new THREE.PointLight(0x00f5ff, 2.2, 8.5, 2);
    arcReactorLight.name = "arcReactorLight";
    // Position slightly in front of the chest
    arcReactorLight.position.set(0, 0.4, 0.85);
    if (chestBone) {
      chestBone.add(arcReactorLight);
    } else {
      arcReactorLight.position.set(0, 9.2, 1.2);
      character.add(arcReactorLight);
    }
  }
}
