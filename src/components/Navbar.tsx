import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useToast } from "../context/ToastContext";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { showToast } = useToast();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText("aayushbhatta230@gmail.com").then(() => {
        showToast("Email copied: aayushbhatta230@gmail.com ✨");
      }).catch(() => {});
    }
  };

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.7,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let elem = e.currentTarget as HTMLAnchorElement;
        let section = elem.getAttribute("data-href");
        if (section) {
          try {
            if (smoother && typeof smoother.scrollTo === "function") {
              smoother.scrollTo(section, true, "top top");
            } else {
              document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
            }
          } catch {
            document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src={`${import.meta.env.BASE_URL || "/"}images/logo.png`} alt="Aayush Bhatta Logo" className="navbar-logo-img" />
          <span>AAYUSH</span>
        </a>
        <a
          href="mailto:aayushbhatta230@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          onClick={handleCopyEmail}
          title="Click to copy email address"
        >
          aayushbhatta230@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
