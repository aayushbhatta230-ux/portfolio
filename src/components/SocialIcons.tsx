import {
  FaGithub,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/aayushbhatta230-ux" target="_blank" title="GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.tiktok.com/@aayushifty" target="_blank" title="TikTok">
            <FaTiktok />
          </a>
        </span>
        <span>
          <a href="https://instagram.com/aayushifty" target="_blank" title="Instagram">
            <FaInstagram />
          </a>
        </span>
        <span>
          <a href="mailto:aayushbhatta230@gmail.com" title="Email">
            <MdEmail />
          </a>
        </span>
      </div>
      <a className="resume-button" href="https://aayushbhatta230-ux.github.io/aayushbhatta230-ux/" target="_blank">
        <HoverLinks text="PORTFOLIO" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
