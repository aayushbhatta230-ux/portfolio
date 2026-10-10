import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const basePath = import.meta.env.BASE_URL || "/";

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
      const url = props.video.startsWith("http") || props.video.startsWith("/")
        ? props.video
        : `${basePath}videos/${props.video}`;
      setVideo(url);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img
          src={props.image}
          alt={props.alt}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            const fallback = `${import.meta.env.BASE_URL || "/"}images/placeholder.webp`;
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
