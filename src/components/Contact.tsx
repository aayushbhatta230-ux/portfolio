import { MdArrowOutward, MdCopyright, MdContentCopy } from "react-icons/md";
import { useToast } from "../context/ToastContext";
import "./styles/Contact.css";

const Contact = () => {
  const { showToast } = useToast();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText("aayushbhatta230@gmail.com").then(() => {
        showToast("Email copied: aayushbhatta230@gmail.com ✨");
      }).catch(() => {
        window.location.href = "mailto:aayushbhatta230@gmail.com";
      });
    } else {
      window.location.href = "mailto:aayushbhatta230@gmail.com";
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:aayushbhatta230@gmail.com"
                data-cursor="disable"
                onClick={handleCopyEmail}
                title="Click to copy email address"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                aayushbhatta230@gmail.com <MdContentCopy size={16} opacity={0.7} />
              </a>
            </p>
            <h4>Location</h4>
            <p>Kathmandu, Nepal</p>
          </div>
          <div className="contact-box">
            <h4>Social &amp; Profiles</h4>
            <a
              href="https://github.com/aayushbhatta230-ux"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://aayushbhatta230-ux.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Live Portfolio <MdArrowOutward />
            </a>
            <a
              href="https://www.tiktok.com/@aayushifty"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              TikTok (@aayushifty) <MdArrowOutward />
            </a>
            <a
              href="https://instagram.com/aayushifty"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed &amp; Built <br /> by <span>Aayush Bhatta</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
