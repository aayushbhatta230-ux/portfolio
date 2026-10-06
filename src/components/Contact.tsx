import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:aayushbhatta230@gmail.com" data-cursor="disable">
                aayushbhatta230@gmail.com
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
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://aayushbhatta230-ux.github.io/aayushbhatta230-ux/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Live 3D Portfolio <MdArrowOutward />
            </a>
            <a
              href="https://www.tiktok.com/@aayushifty"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              TikTok (@aayushifty) <MdArrowOutward />
            </a>
            <a
              href="https://instagram.com/aayushifty"
              target="_blank"
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
