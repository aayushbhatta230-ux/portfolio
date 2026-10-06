import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Delegate representing Switzerland</h4>
                <h5>United Nations Nepal &amp; NYC MUN</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Participated as Delegate representing Switzerland (UNEP committee) at the National Youth
              Council Model United Nations; certified by Deputy Prime Minister Hon. Narayan Kaji Shrestha
              and UN Resident Coordinator Hanaa Singer-Hamdy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>National Hackathon Finalist &amp; System Architect</h4>
                <h5>Build Nepal · BNKS · Ullens Hackathon</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Architected core solutions across Nepal's premier hackathons: engineered decentralized
              transit telematics at the Build Nepal Hackathon (with ICES), hardware telemetry at the
              Budhanilkantha School (BNKS) National Hackathon, and autonomous multi-agent AI research swarms
              at the Ullens Hackathon.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Grade 12 Scholar &amp; Systems Developer</h4>
                <h5>Trinity International College &amp; Open Source</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Engineering local-first AI architectures on Windows (JARVIS, AETHER v0.2.0),
              classroom presentation tooling for Trinity smartboards, and agricultural IoT
              telematics on ESP32 microcontrollers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
