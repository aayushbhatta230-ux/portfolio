import * as THREE from "three";

/**
 * Creates the high-tech 3D "AAYUSHIFTY" Armored Insignia Plate
 * scaled to full chest proportions (width: 3.6 units, height: 0.95 units).
 */
export function create3DAayushiftyInsignia(): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const eCanvas = document.createElement("canvas");
  eCanvas.width = 2048;
  eCanvas.height = 512;
  const eCtx = eCanvas.getContext("2d")!;
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, 2048, 512);

  // Carbon-titanium dark brushed backing
  const grad = ctx.createLinearGradient(0, 0, 2048, 512);
  grad.addColorStop(0, "#12151e");
  grad.addColorStop(0.5, "#222736");
  grad.addColorStop(1, "#12151e");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(32, 32, 1984, 448, 48);
  ctx.fill();

  // Polished Gold Titanium Bevel Border
  ctx.lineWidth = 18;
  const goldBorder = ctx.createLinearGradient(0, 0, 2048, 0);
  goldBorder.addColorStop(0, "#c69214");
  goldBorder.addColorStop(0.25, "#ffd700");
  goldBorder.addColorStop(0.5, "#fff0a0");
  goldBorder.addColorStop(0.75, "#ffd700");
  goldBorder.addColorStop(1, "#a8740d");
  ctx.strokeStyle = goldBorder;
  ctx.stroke();

  // Corner titanium mounting rivets
  ctx.fillStyle = "#cbd5e1";
  [[96, 96], [1952, 96], [96, 416], [1952, 416]].forEach(([bx, by]) => {
    ctx.beginPath();
    ctx.arc(bx, by, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  // Top cyan micro-HUD power rail
  ctx.fillStyle = "#00f5ff";
  ctx.fillRect(360, 68, 1328, 8);

  // Bold Giant "AAYUSHIFTY" Typography
  ctx.font = "900 170px 'Outfit', 'Montserrat', 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Deep Drop Shadow
  ctx.fillStyle = "#000000";
  ctx.fillText("AAYUSHIFTY", 1028, 268);

  // Radiant Gold Gradient Fill
  const textGrad = ctx.createLinearGradient(0, 160, 0, 360);
  textGrad.addColorStop(0, "#ffffff");
  textGrad.addColorStop(0.2, "#fff8c0");
  textGrad.addColorStop(0.55, "#ffd700");
  textGrad.addColorStop(0.85, "#e5b80b");
  textGrad.addColorStop(1, "#b8860b");
  ctx.fillStyle = textGrad;
  ctx.fillText("AAYUSHIFTY", 1024, 260);

  // Subtitle: STARK INDUSTRIES // MARK 85 NANOTECH
  ctx.font = "bold 38px monospace";
  ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
  ctx.fillText("// MARK 85 NANOTECH //", 1024, 404);

  // Emissive Map for glowing cyan laser outline
  eCtx.font = "900 170px 'Outfit', 'Montserrat', 'Arial Black', sans-serif";
  eCtx.textAlign = "center";
  eCtx.textBaseline = "middle";
  eCtx.strokeStyle = "#00f5ff";
  eCtx.lineWidth = 14;
  eCtx.shadowColor = "#00f5ff";
  eCtx.shadowBlur = 35;
  eCtx.strokeText("AAYUSHIFTY", 1024, 260);

  // Glowing cyan rail in emissive
  eCtx.fillStyle = "#00f5ff";
  eCtx.fillRect(360, 68, 1328, 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const eTexture = new THREE.CanvasTexture(eCanvas);
  eTexture.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    emissiveMap: eTexture,
    emissive: new THREE.Color("#00f5ff"),
    emissiveIntensity: 2.2,
    roughness: 0.22,
    metalness: 0.88,
    transparent: true,
  });

  const geo = new THREE.PlaneGeometry(3.6, 0.95);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = "aayushiftyInsigniaPlate";
  return mesh;
}

/**
 * Creates the large, prominent physical 3D Stark Arc Reactor (Unibeam)
 * scaled to chest proportions (radius: 0.85 units, diameter: 1.7 units).
 */
export function create3DArcReactor(): THREE.Group {
  const group = new THREE.Group();
  group.name = "starkArcReactor3D";

  const hexRadius = 0.85;

  // 1. Chrome Hexagonal Housing Rim
  const hexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    const x = Math.cos(angle) * hexRadius;
    const y = Math.sin(angle) * hexRadius;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  // Hole for inner reactor ring
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, 0.62, 0, Math.PI * 2, true);
  hexShape.holes.push(holePath);

  const housingGeo = new THREE.ShapeGeometry(hexShape);
  const housingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#cbd5e1"),
    roughness: 0.18,
    metalness: 0.95,
    side: THREE.DoubleSide,
  });
  const housingMesh = new THREE.Mesh(housingGeo, housingMat);
  housingMesh.position.z = 0.02;
  group.add(housingMesh);

  // 2. Polished Gold Containment Bezel
  const goldRingGeo = new THREE.RingGeometry(0.48, 0.62, 32);
  const goldRingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"),
    roughness: 0.22,
    metalness: 0.88,
    side: THREE.DoubleSide,
  });
  const goldRingMesh = new THREE.Mesh(goldRingGeo, goldRingMat);
  goldRingMesh.position.z = 0.035;
  group.add(goldRingMesh);

  // 3. 10 Copper Magnetic Induction Coils around the ring
  const coilGeo = new THREE.BoxGeometry(0.08, 0.15, 0.08);
  const coilMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d97706"),
    roughness: 0.28,
    metalness: 0.85,
  });
  for (let i = 0; i < 10; i++) {
    const angle = (i * 2 * Math.PI) / 10;
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.x = Math.cos(angle) * 0.55;
    coil.position.y = Math.sin(angle) * 0.55;
    coil.position.z = 0.055;
    coil.rotation.z = angle + Math.PI / 2;
    group.add(coil);
  }

  // 4. Glowing Cyan Plasma Reaction Core (Unibeam)
  const coreGeo = new THREE.CircleGeometry(0.48, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#00f5ff"),
    side: THREE.DoubleSide,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.z = 0.06;
  group.add(coreMesh);

  // 5. White-Hot Plasma Center Tri-Aperture
  const triShape = new THREE.Shape();
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const tx = Math.cos(angle) * 0.22;
    const ty = Math.sin(angle) * 0.22;
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
  triMesh.position.z = 0.075;
  group.add(triMesh);

  // 6. Point Light illuminating the armor and hands
  const light = new THREE.PointLight(0x00f5ff, 2.5, 9.0, 2);
  light.position.set(0, 0, 0.25);
  group.add(light);

  return group;
}

/**
 * Creates 3D stylized Middle-Part Curtain Bangs lock meshes
 * attached to the head bone (spine006) to frame the forehead naturally.
 */
export function create3DCurtainBangs(): THREE.Group {
  const group = new THREE.Group();
  group.name = "curtainBangs3D";

  const hairMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#141210"),
    roughness: 0.72,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  // Left Curtain Lock (curves down and outward to the left)
  const leftLockCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.06, 1.74, 1.05),
    new THREE.Vector3(-0.25, 1.68, 1.12),
    new THREE.Vector3(-0.45, 1.48, 1.08),
    new THREE.Vector3(-0.55, 1.32, 0.95)
  );
  const leftLockGeo = new THREE.TubeGeometry(leftLockCurve, 16, 0.11, 8, false);
  const leftMesh = new THREE.Mesh(leftLockGeo, hairMat);
  group.add(leftMesh);

  // Right Curtain Lock (curves down and outward to the right)
  const rightLockCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.06, 1.74, 1.05),
    new THREE.Vector3(0.25, 1.68, 1.12),
    new THREE.Vector3(0.45, 1.48, 1.08),
    new THREE.Vector3(0.55, 1.32, 0.95)
  );
  const rightLockGeo = new THREE.TubeGeometry(rightLockCurve, 16, 0.11, 8, false);
  const rightMesh = new THREE.Mesh(rightLockGeo, hairMat);
  group.add(rightMesh);

  return group;
}

/**
 * Sculpts the hair mesh vertices at runtime to create a dramatic,
 * true inverted-V middle-part curtain bangs opening matching Aayush's selfie.
 */
export function sculptMiddlePartHair(hairMesh: THREE.Mesh) {
  if (!hairMesh.geometry || !hairMesh.geometry.attributes.position) return;
  const pos = hairMesh.geometry.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Front forehead and bangs region
    if (z > 0.05) {
      const absX = Math.abs(x);
      if (absX < 0.038) {
        // Inverted-V center parting: lift upward and push back into scalp
        const factor = 1 - absX / 0.038;
        pos.setY(i, y + 0.038 * factor);
        pos.setZ(i, z - 0.035 * factor);
      } else if (absX >= 0.038 && absX < 0.095) {
        // Curtain locks on sides: drape down and forward with volume
        const sideFactor = Math.sin(((absX - 0.038) / 0.057) * Math.PI);
        pos.setY(i, y - 0.024 * sideFactor);
        pos.setZ(i, z + 0.020 * sideFactor);
        if (x > 0) pos.setX(i, x + 0.008 * sideFactor);
        else pos.setX(i, x - 0.008 * sideFactor);
      }
    }
  }

  pos.needsUpdate = true;
  hairMesh.geometry.computeVertexNormals();
}

/**
 * Transforms the character model into Iron Man Mark 85:
 * 1. Face: Natural Nepali golden-wheatish skin tone (removed white vertex colors)
 * 2. Hair: Sculpted middle-part curtain hairstyle with 3D curtain bang locks
 * 3. Armor: Hot-rod crimson & gold with large 3D Arc Reactor and prominent "AAYUSHIFTY" plate
 */
export function applyAayushIronMan(character: THREE.Object3D) {
  // 1. AAYUSH'S AUTHENTIC SKIN TONE
  // Natural warm South Asian / Nepali golden-wheatish complexion (sampled from selfie)
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#9b6642"),
    roughness: 0.84,
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
        if (child.geometry && child.geometry.attributes && child.geometry.attributes.color) {
          child.geometry.deleteAttribute("color");
        }
        child.material = skinMaterial;
        child.material.needsUpdate = true;
      }
    }
  });

  // 3. ATTACH PHYSICAL 3D ARC REACTOR & PROMINENT "AAYUSHIFTY" INSIGNIA PLATE
  const spine003 = character.getObjectByName("spine003");
  const headBone = character.getObjectByName("spine006");

  // Attach 3D Curtain Bang Locks to Head Bone
  if (headBone && !headBone.getObjectByName("curtainBangs3D")) {
    const curtainBangs = create3DCurtainBangs();
    headBone.add(curtainBangs);
  }

  // Attach Arc Reactor & Insignia Plate to Chest Bone (spine003)
  if (spine003 && !spine003.getObjectByName("starkArcReactor3D")) {
    const arcReactor = create3DArcReactor();
    const insigniaPlate = create3DAayushiftyInsignia();

    // Position "AAYUSHIFTY" prominently across upper chest
    insigniaPlate.position.set(0, 0.92, 0.82);
    insigniaPlate.rotation.x = -0.16;

    // Position Arc Reactor directly below insignia on sternum center
    arcReactor.position.set(0, -0.05, 0.78);
    arcReactor.rotation.x = -0.10;

    spine003.add(insigniaPlate);
    spine003.add(arcReactor);
  }
}
