# Aayush Bhatta — Interactive 3D Portfolio 🚀

> **Live Custom Domain:** [https://aayushifty.com.np/](https://aayushifty.com.np/)  
> **GitHub Pages Mirror:** [https://aayushbhatta230-ux.github.io/portfolio/](https://aayushbhatta230-ux.github.io/portfolio/)  
> **Profile & System Showcase:** [https://github.com/aayushbhatta230-ux](https://github.com/aayushbhatta230-ux)

An interactive, high-performance 3D developer portfolio for **Aayush Bhatta** (@aayushifty) — Grade 12 Systems & AI developer, athlete, and musician based in Kathmandu, Nepal.

Built with **React**, **Three.js**, **GSAP 3.15 ScrollTrigger & ScrollSmoother**, and **Rapier physics**, featuring a custom-rigged 3D avatar in a signature Spider-Man compression rashguard, dynamic interactive physics balls, and optimized WebGL rendering for low-end hardware.

---

## ⚡ Key Highlights & Architecture

- **Custom Rigged 3D Avatar:** Interactive 3D workspace scene with head-tracking mouse physics, keyboard typing bone animations, screen emission glow, and camera-guided timeline transitions.
- **Physics-Driven Tech Stack:** Real-time rigid-body collisions powered by `@react-three/rapier` and `@react-three/fiber`, responding to cursor gravitational impulses.
- **Buttery-Smooth GSAP Scrolling:** Built using official **GSAP 3.15** `ScrollSmoother` and `ScrollTrigger` with tuned sub-second inertia for zero input latency.
- **Low-End Hardware & GPU Optimizations:**
  - **Offscreen Visibility Culling:** Suspends Three.js `requestAnimationFrame` loops and mixer evaluations via `IntersectionObserver` when sections scroll out of view, reducing GPU load to 0% off-screen.
  - **DPR Clamping:** Clamped WebGL canvas pixel ratio to `min(window.devicePixelRatio, 1.25)` to prevent rasterization bottlenecks on high-DPI Windows displays.
  - **Zero-Allocation Cursor Loop:** Direct GPU matrix setters (`gsap.quickSetter`) preventing continuous garbage collection stutters.
  - **Optimized Physics Geometry:** Lightweight collision spheres without heavy screen-space ambient occlusion passes.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|:---|:---|
| **Core Framework** | React 18, TypeScript, Vite 5 |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, WebGL |
| **Physics Engine** | `@react-three/rapier` (Wasm-accelerated rigid-body physics) |
| **Animation & Motion** | GSAP 3.15 (ScrollTrigger, ScrollSmoother, SplitText) |
| **Styling & Effects** | Vanilla CSS3, 3D Transforms, Hardware-accelerated GPU layers |
| **Deployment** | GitHub Pages (`gh-pages` automated static build) |

---

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/aayushbhatta230-ux/portfolio.git
cd portfolio
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Build production distribution bundle:

```bash
npm run build
```

---

## 👤 About Aayush Bhatta

- **Location:** Kathmandu, Nepal
- **Disciplines:** Systems & Local AI (Python, Ollama, Llama 3.2, Nomic-Embed), Embedded IoT (ESP32, C++), Computer Vision (MediaPipe, Web Audio)
- **Extracurriculars:** Basketball athlete, performing guitarist/vocalist, 13× Model United Nations delegate
- **Email:** [aayushbhatta230@gmail.com](mailto:aayushbhatta230@gmail.com)
- **GitHub:** [@aayushbhatta230-ux](https://github.com/aayushbhatta230-ux)
- **TikTok:** [@aayushifty](https://www.tiktok.com/@aayushifty)
- **Instagram:** [@aayushifty](https://instagram.com/aayushifty)

---

## 📄 License & Attribution

Portfolio design inspired by [MoncyDev/Portfolio-Website](https://github.com/MoncyDev/Portfolio-Website). Customized and tailored by Aayush Bhatta. Released under the [MIT License](LICENSE).
