import { useEffect, useState } from "react";
{/*import heroo from "../assets/heroo.mp4";
import hero from "../assets/hero-optimized.mp4";*/}
import logo1 from "../assets/logo1.png";
import PanoramaModal from "../components/PanoramaModal";
import hero360 from "../assets/hero360.png";
import { useNavigate } from "react-router-dom";

import heroDesktop from "../assets/hero-desktop-1080p.mp4";
import heroMobile from "../assets/hero-mobile-720p.mp4";
import heroPoster from "../assets/hero-poster.webp";


export default function Hero() {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [open360, setOpen360] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative h-[100vh] md:h-[110vh] w-full overflow-hidden">

      
      <div className="relative h-[100vh] md:h-[115vh] w-full overflow-hidden">

  {/* VIDEO 
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={heroo} type="video/mp4" />
  </video>
  */}
 {/* HERO POSTER - loads immediately */}
<img
  src={heroPoster}
  alt=""
  fetchPriority="high"
  className="absolute inset-0 w-full h-full object-cover"
/>

{/* HERO VIDEO */}
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  onCanPlay={() => setVideoReady(true)}
  className={`
    absolute inset-0 w-full h-full object-cover
    transition-opacity duration-500
    ${videoReady ? "opacity-100" : "opacity-0"}
  `}
>
  <source
    src={heroDesktop}
    media="(min-width: 768px)"
    type="video/mp4"
  />

  <source
    src={heroMobile}
    media="(max-width: 767px)"
    type="video/mp4"
  />
</video>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/15"></div>
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

  {/* CONTENT */}
  {/* CONTENT */}
<div
  className="
    relative z-10
    flex flex-col
    items-center
    justify-center
    h-full
    -translate-y-6
    text-center
    px-5 sm:px-6 md:px-8
  "
>

  {/* 
    <div className="flex justify-center items-center mb-4">
    <div className="logo-3d-wrapper w-[240px] sm:w-[300px] md:w-[380px] lg:w-[460px]">
  <div className="logo-card">

    FRONT 
    <img
      src={logo1}
      alt="logo"
      className="logo-face front w-full
      mx-auto mb-6 
      brightness-130 contrast-110 
      drop-shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
    />

    
    <img
      src={logo1}
      alt="logo"
      className="logo-face back w-full
      mx-auto mb-6 
      brightness-130 contrast-110 
      drop-shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
    />

  </div>
  */}


  {/* LOGO */}
  <div
    className="
      flex justify-center items-center

      mb-1 sm:mb-2
      w-full
    "
  >

    <img
      src={logo1}
      alt="logo"

      className="
        w-[260px]
        sm:w-[340px]
        md:w-[440px]
        lg:w-[500px]

        brightness-130
        contrast-110

        drop-shadow-[0_15px_40px_rgba(0,0,0,0.7)]

        object-contain
      "
    />

  </div>

  {/* TAGLINE */}
  <p
    className="font-bold
      text-[10px]
      sm:text-xs
      md:text-sm

      tracking-[0.22em]
      sm:tracking-[0.3em]

      text-[#B08D57]

      mb-2

      px-4
    "
  >
    CRAFTED FOR LUXURY LIVING
  </p>

  {/* LINE */}
  <div className="mt-2 mb-3">
    <div
      className="
        w-10 sm:w-12 md:w-16
        h-[2px]
        bg-[#B08D57]
        opacity-80
      "
    />
  </div>

  {/* BUTTONS */}
  <div
    className="
      mt-1
      flex flex-col
      sm:flex-row

      gap-3 sm:gap-5

      items-center
      w-full
      sm:w-auto
    "
  >

    {/* PRIMARY */}
    <button
      onClick={() => navigate("/services")}
      className="
        group

        bg-[#C89B3C]
        text-white

        w-full sm:w-auto

        px-6 md:px-8
        py-3 md:py-3

        rounded-full

        text-[11px]
        sm:text-xs
        md:text-sm

        tracking-[0.18em]

        relative overflow-hidden

        transition-all duration-300 ease-out
        hover:-translate-y-[4px]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        active:scale-[0.96]
      "
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        Explore Services

        <span
          className="
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </span>

      <span
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent

          translate-x-[-100%]
          group-hover:translate-x-[100%]

          transition-transform duration-700
        "
      />
    </button>

    {/* SECONDARY */}
    <button
      onClick={() => navigate("/portfolio")}
      className="
        border border-white
        text-white

        w-full sm:w-auto

        px-6 md:px-8
        py-3 md:py-3

        rounded-full

        text-[11px]
        sm:text-xs
        md:text-sm

        tracking-[0.15em]

        transition-all duration-300 ease-out

        hover:-translate-y-[3px]
        hover:bg-white
        hover:text-black
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]

        active:translate-y-0
      "
    >
      VIEW PORTFOLIO
    </button>

  </div>

  {/* LIGHT STREAK */}
  <div
    className="
      absolute
      top-[58%] sm:top-[56%]

      left-1/2
      -translate-x-1/2

      w-[180px]
      sm:w-[260px]
      md:w-[400px]

      h-[2px]

      overflow-hidden
      pointer-events-none
    "
  >
    <div
      className="
        w-full h-full
        bg-gradient-to-r
        from-transparent
        via-[#C89B3C]/60
        to-transparent

        animate-streak
      "
    />
  </div>

  {/* BOTTOM GRADIENT */}
  <div
    className="
      absolute bottom-0 left-0
      w-full h-32 sm:h-40

      bg-gradient-to-b
      from-transparent
      to-[#2D2D2D]

      pointer-events-none
      z-10
    "
  />

</div>
      </div>

      <PanoramaModal 
        isOpen={open360}
        onClose={() => setOpen360(false)}
        image={hero360}
      />

    </section>
  );
}