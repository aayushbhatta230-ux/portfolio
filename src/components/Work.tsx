import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const basePath = import.meta.env.BASE_URL || "/";

const projects = [
  {
    title: "JARVIS AI Assistant",
    category: "Autonomous Systems & Voice",
    tools: "Python, Ollama, Llama 3.2, Nomic Embeddings, FastAPI, Web Speech",
    link: "https://github.com/aayushbhatta230-ux/jarvis-ai-agent",
    image: `${basePath}images/projects/jarvis.webp`,
  },
  {
    title: "AETHER Overlay",
    category: "Ambient Local AI Software",
    tools: "Python, Ollama, Tkinter, SQLite, PII Redaction, Pytest",
    link: "https://github.com/aayushbhatta230-ux/aether-overlay",
    image: `${basePath}images/projects/aether.webp`,
  },
  {
    title: "Trinity Teaching",
    category: "Classroom Presentation Platform",
    tools: "Android APK, Windows Installer, Electron, Offline-First",
    link: "https://github.com/aayushbhatta230-ux/trinity-teaching-app",
    image: `${basePath}images/projects/trinity.webp`,
  },
  {
    title: "HandChord",
    category: "Computer Vision & Music",
    tools: "JavaScript, MediaPipe Landmarks, Web Audio API, Vite",
    link: "https://github.com/aayushbhatta230-ux/handchord",
    image: `${basePath}images/projects/handchord.webp`,
  },
  {
    title: "KrishiTrust",
    category: "Agricultural IoT Telematics",
    tools: "React 19, ESP32, Leaflet GIS, MPU-6050, TailwindCSS",
    link: "https://github.com/aayushbhatta230-ux/krishitrust",
    image: `${basePath}images/projects/krishitrust.webp`,
  },
  {
    title: "Ullens Idea Lab",
    category: "Multi-Agent Research Swarm",
    tools: "Python, Multi-Agent Swarm, FreeLLMAPI Gateway, SSE Cockpit",
    link: "https://github.com/aayushbhatta230-ux/ullens-idea-lab",
    image: `${basePath}images/projects/ullens_lab.webp`,
  },
];

const Work = () => {
  useGSAP(() => {
    function getTranslateX(): number {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      if (!workFlex) return 0;
      return Math.max(0, workFlex.scrollWidth - window.innerWidth + 200);
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
