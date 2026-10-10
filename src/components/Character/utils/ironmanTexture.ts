import * as THREE from "three";

/**
 * Creates the high-tech 3D "AAYUSHIFTY" Armored Insignia Plate
 * that attaches directly to the character's upper chest armor.
 */
export function create3DAayushiftyInsignia(): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const eCanvas = document.createElement("canvas");
  eCanvas.width = 1024;
  eCanvas.height = 256;
  const eCtx = eCanvas.getContext("2d")!;
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, 1024, 256);

  // Carbon-titanium dark brushed backing
  const grad = ctx.createLinearGradient(0, 0, 1024, 256);
  grad.addColorStop(0, "#161922");
  grad.addColorStop(0.5, "#252a36");
  grad.addColorStop(1, "#161922");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(16, 16, 992, 224, 24);
  ctx.fill();

  // Polished Gold Titanium Bevel Border
  ctx.lineWidth = 10;
  const goldBorder = ctx.createLinearGradient(0, 0, 1024, 0);
  goldBorder.addColorStop(0, "#c69214");
  goldBorder.addColorStop(0.3, "#ffd700");
  goldBorder.addColorStop(0.7, "#e5b80b");
  goldBorder.addColorStop(1, "#a8740d");
  ctx.strokeStyle = goldBorder;
  ctx.stroke();

  // Corner titanium mounting bolts
  ctx.fillStyle = "#cbd5e1";
  [[48, 48], [976, 48], [48, 208], [976, 208]].forEach(([bx, by]) => {
    ctx.beginPath();
    ctx.arc(bx, by, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top cyan micro-HUD power rail
  ctx.fillStyle = "#00f5ff";
  ctx.fillRect(180, 36, 664, 4);

  // Bold Futuristic "AAYUSHIFTY" Typography
  ctx.font = "900 86px 'Outfit', 'Montserrat', 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Drop shadow
  ctx.fillStyle = "#000000";
  ctx.fillText("AAYUSHIFTY", 514, 134);

  // Radiant Gold Letters
  const textGrad = ctx.createLinearGradient(0, 80, 0, 180);
  textGrad.addColorStop(0, "#ffffff");
  textGrad.addColorStop(0.25, "#fff0a0");
  textGrad.addColorStop(0.65, "#ffd700");
  textGrad.addColorStop(1, "#d4af37");
  ctx.fillStyle = textGrad;
  ctx.fillText("AAYUSHIFTY", 512, 130);

  // Subtitle: STARK INDUSTRIES // MARK 85
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = "rgba(226, 232, 240, 0.75)";
  ctx.fillText("// MARK 85 NANOTECH //", 512, 202);

  // Emissive Map for glowing cyan laser outline
  eCtx.font = "900 86px 'Outfit', 'Montserrat', 'Arial Black', sans-serif";
  eCtx.textAlign = "center";
  eCtx.textBaseline = "middle";
  eCtx.strokeStyle = "#00f5ff";
  eCtx.lineWidth = 8;
  eCtx.shadowColor = "#00f5ff";
  eCtx.shadowBlur = 24;
  eCtx.strokeText("AAYUSHIFTY", 512, 130);
  eCtx.fillStyle = "#00f5ff";
  eCtx.fillRect(180, 36, 664, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const eTexture = new THREE.CanvasTexture(eCanvas);
  eTexture.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    emissiveMap: eTexture,
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 1.8,
    roughness: 0.25,
    metalness: 0.85,
    transparent: true,
  });

  const geo = new THREE.PlaneGeometry(0.78, 0.20);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = "aayushiftyInsigniaPlate";
  return mesh;
}

/**
 * Creates the physical 3D Stark Arc Reactor (Unibeam)
 * that mounts directly onto the character's sternum.
 */
export function create3DArcReactor(): THREE.Group {
  const group = new THREE.Group();
  group.name = "starkArcReactor3D";

  // 1. Chrome Hexagonal Housing Rim
  const hexShape = new THREE.Shape();
  const hexRadius = 0.22;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    const x = Math.cos(angle) * hexRadius;
    const y = Math.sin(angle) * hexRadius;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  // Hole for inner ring
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, 0.16, 0, Math.PI * 2, true);
  hexShape.holes.push(holePath);

  const housingGeo = new THREE.ShapeGeometry(hexShape);
  const housingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#cbd5e1"),
    roughness: 0.18,
    metalness: 0.95,
    side: THREE.DoubleSide,
  });
  const housingMesh = new THREE.Mesh(housingGeo, housingMat);
  housingMesh.position.z = 0.01;
  group.add(housingMesh);

  // 2. Polished Gold Containment Bezel
  const goldRingGeo = new THREE.RingGeometry(0.125, 0.16, 32);
  const goldRingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"),
    roughness: 0.22,
    metalness: 0.88,
    side: THREE.DoubleSide,
  });
  const goldRingMesh = new THREE.Mesh(goldRingGeo, goldRingMat);
  goldRingMesh.position.z = 0.015;
  group.add(goldRingMesh);

  // 3. 8 Copper Magnetic Induction Coils
  const coilGeo = new THREE.BoxGeometry(0.022, 0.038, 0.018);
  const coilMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d97706"),
    roughness: 0.3,
    metalness: 0.85,
  });
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.x = Math.cos(angle) * 0.142;
    coil.position.y = Math.sin(angle) * 0.142;
    coil.position.z = 0.022;
    coil.rotation.z = angle + Math.PI / 2;
    group.add(coil);
  }

  // 4. Glowing Cyan Plasma Reaction Core (Unibeam)
  const coreGeo = new THREE.CircleGeometry(0.125, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#00f5ff"),
    side: THREE.DoubleSide,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.z = 0.025;
  group.add(coreMesh);

  // 5. White Hot Plasma Center Tri-Aperture
  const triShape = new THREE.Shape();
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const tx = Math.cos(angle) * 0.055;
    const ty = Math.sin(angle) * 0.055;
    if (i === 0) triShape.moveTo(tx, ty);
    else triShape.lineTo(tx, ty);
  }
  triShape.closePath();
  const triGeo = new THREE.ShapeGeometry(triShape);
  const triMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffffff"),
    side: THREE.DoubleSide,
  });
  const triMesh = new THREE.Mesh(triGeo, triMat);
  triMesh.position.z = 0.03;
  group.add(triMesh);

  // 6. Point Light illuminating armor & hands
  const light = new THREE.PointLight(0x00f5ff, 1.3, 4.5, 2);
  light.position.set(0, 0, 0.12);
  group.add(light);

  return group;
}

/**
 * Sculpts the hair mesh vertices at runtime to create a true,
 * physical middle-part curtain bangs hairstyle matching Aayush's selfie.
 */
export function sculptMiddlePartHair(hairMesh: THREE.Mesh) {
  if (!hairMesh.geometry || !hairMesh.geometry.attributes.position) return;
  const pos = hairMesh.geometry.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Front forehead and bangs region
    if (z > 0.03 && y > 0.02) {
      if (Math.abs(x) < 0.022) {
        // Center part scalp valley: indent inward and slightly upward
        pos.setZ(i, z - 0.02);
        pos.setY(i, y + 0.008);
      } else if (x >= 0.022) {
        // Right curtain lock: fan outward and curve forward with volume
        pos.setX(i, 0.022 + (x - 0.022) * 1.25);
        pos.setZ(i, z + 0.007);
      } else if (x <= -0.022) {
        // Left curtain lock: fan outward and curve forward with volume
        pos.setX(i, -0.022 + (x + 0.022) * 1.25);
        pos.setZ(i, z + 0.007);
      }
    }
  }

  pos.needsUpdate = true;
  hairMesh.geometry.computeVertexNormals();
}

/**
 * Transforms the character model into Iron Man Mark 85
 * while ensuring authentic identity:
 * 1. Face: Natural Nepali golden-wheatish skin tone (fixes the chalk-white bug by removing vertex colors)
 * 2. Hair: Sculpted middle-part curtain hairstyle
 * 3. Armor: Hot-rod crimson & gold with 3D glowing Arc Reactor and "AAYUSHIFTY" insignia plate
 */
export function applyAayushIronMan(character: THREE.Object3D) {
  // 1. AAYUSH'S AUTHENTIC SKIN TONE
  // Natural warm South Asian / Nepali golden-wheatish complexion (sampled from selfie)
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#9b6642"), // Natural warm golden-tan wheatish tone
    roughness: 0.84,                  // Soft matte human skin texture without synthetic shine
    metalness: 0.0,
  });

  // Natural dark espresso hair
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#161412"),
    roughness: 0.72,
    metalness: 0.05,
  });

  // Defined dark eyebrows
  const eyebrowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#12100e"),
    roughness: 0.78,
  });

  // 2. IRON MAN MARK-85 SUIT MATERIALS
  // Metallic Hot-Rod Crimson Lacquer
  const ironManArmorMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8f0c1a"),
    roughness: 0.22,
    metalness: 0.88,
  });

  // Armored Repulsor Gauntlets
  const ironManGauntletMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#820a16"),
    roughness: 0.24,
    metalness: 0.86,
  });

  // Leg Greaves
  const ironManLegMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#880b18"),
    roughness: 0.26,
    metalness: 0.85,
  });

  // Flight Boots & Thruster Soles
  const ironManBootsMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#740814"),
    roughness: 0.24,
    metalness: 0.90,
  });
  const ironManThrusterSoleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e0f2fe"),
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 3.0,
    roughness: 0.2,
    metalness: 0.5,
  });

  // Traverse and apply materials
  character.traverse((child: any) => {
    if (child.isMesh) {
      const name = (child.name || "").toLowerCase();
      const parentName = (child.parent?.name || "").toLowerCase();
      const matName = (child.material?.name || "").toLowerCase();

      // Check if mesh is the Hair
      if (
        name.includes("hair") ||
        name.includes("pcube3") ||
        parentName.includes("hair")
      ) {
        child.material = hairMaterial;
        child.material.needsUpdate = true;
        sculptMiddlePartHair(child as THREE.Mesh);
      }
      // Check if mesh is Eyebrows
      else if (
        name.includes("eyebrow") ||
        parentName.includes("eyebrow") ||
        name.includes("plane.004") ||
        name.includes("plane004")
      ) {
        child.material = eyebrowMaterial;
        child.material.needsUpdate = true;
      }
      // Check if mesh is the Shirt / Torso -> Iron Man Armor
      else if (
        name.includes("shirt") ||
        parentName.includes("shirt") ||
        name.includes("cube.002") ||
        name.includes("cube002") ||
        matName.includes("shirt")
      ) {
        child.material = ironManArmorMaterial;
        child.material.needsUpdate = true;
      }
      // Check if mesh is Hands -> Gauntlets
      else if (
        name.includes("hand") ||
        parentName.includes("hand") ||
        name.includes("mesh.002") ||
        name.includes("mesh002")
      ) {
        child.material = ironManGauntletMaterial;
        child.material.needsUpdate = true;
      }
      // Check if mesh is Pants -> Greaves
      else if (
        name.includes("pant") ||
        parentName.includes("pant") ||
        name.includes("cube.004") ||
        name.includes("cube004")
      ) {
        child.material = ironManLegMaterial;
        child.material.needsUpdate = true;
      }
      // Check if mesh is Shoes -> Flight Boots
      else if (
        name.includes("shoe") ||
        parentName.includes("shoe") ||
        name.includes("cylinder.005") ||
        name.includes("cylinder005")
      ) {
        child.material = ironManBootsMaterial;
        child.material.needsUpdate = true;
      }
      // Check if mesh is Soles -> Thruster Soles
      else if (
        name.includes("sole") ||
        parentName.includes("sole") ||
        name.includes("cylinder.008") ||
        name.includes("cylinder008")
      ) {
        child.material = ironManThrusterSoleMaterial;
        child.material.needsUpdate = true;
      }
      // Eye mesh -> Preserve eyes
      else if (name.includes("eye") || parentName.includes("eye") || matName.includes("eye")) {
        // keep original eye texture/material
      }
      // Check if mesh is Face, Neck, or Ears -> AUTHENTIC SKIN!
      // This catches Plane.007, Plane007, Neck, Ear.001, etc.
      else if (
        name.includes("007") ||
        parentName.includes("007") ||
        name.includes("face") ||
        parentName.includes("face") ||
        name.includes("neck") ||
        parentName.includes("neck") ||
        name.includes("005") ||
        name.includes("ear") ||
        parentName.includes("ear") ||
        name.includes("003") ||
        matName.includes("default") ||
        matName.includes("skin") ||
        (child.morphTargetInfluences && child.morphTargetInfluences.length > 0)
      ) {
        // CRITICAL BUG FIX: Plane.007 has vertex colors attribute 'color' with all 1.0 (white).
        // Removing the 'color' attribute ensures Three.js renders the genuine skinMaterial color!
        if (child.geometry && child.geometry.attributes && child.geometry.attributes.color) {
          child.geometry.deleteAttribute("color");
        }
        child.material = skinMaterial;
        child.material.needsUpdate = true;
      }
    }
  });

  // 3. ATTACH PHYSICAL 3D ARC REACTOR & "AAYUSHIFTY" INSIGNIA PLATE
  // Attach to upper torso bone (spine003 or spine004 or character root)
  const chestBone =
    character.getObjectByName("spine003") ||
    character.getObjectByName("spine004") ||
    character.getObjectByName("spine005") ||
    character;

  const existingReactor = character.getObjectByName("starkArcReactor3D");
  if (!existingReactor) {
    const arcReactor = create3DArcReactor();
    const insigniaPlate = create3DAayushiftyInsignia();

    if (chestBone && chestBone.name.includes("spine003")) {
      // Position on spine003 (sternum center)
      arcReactor.position.set(0, 0.72, 0.74);
      arcReactor.rotation.x = -0.08;

      insigniaPlate.position.set(0, 1.04, 0.76);
      insigniaPlate.rotation.x = -0.14;

      chestBone.add(arcReactor);
      chestBone.add(insigniaPlate);
    } else {
      // Fallback global positioning on character
      arcReactor.position.set(0, 8.4, 0.85);
      insigniaPlate.position.set(0, 9.4, 0.88);
      insigniaPlate.rotation.x = -0.12;

      character.add(arcReactor);
      character.add(insigniaPlate);
    }
  }
}
