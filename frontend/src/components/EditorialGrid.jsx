import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import p4 from "../assets/projects/p4.webp";
import p5 from "../assets/projects/p5.webp";

export default function EditorialGrid() {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  {/* PARALLAX 
  // PARALLAX
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); */}

  // SCROLL REVEAL
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
  ref={sectionRef}
  className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-20 md:pb-28 px-4 md:px-0"
>

  <div className="
absolute top-1/2 left-1/2
-translate-x-1/2 -translate-y-1/2
w-[900px] h-[400px]
bg-[#B08D57]/[0.05]
blur-[160px]
pointer-events-none
" />


  {/* LEFT COLUMN */}
  <div className="flex flex-col gap-6 md:gap-8">

    {/* MATERIAL */}
    <div
      className={`bg-[#1A1A1C] border border-white/[0.05] p-6 md:p-12 rounded-2xl min-h-[220px] md:min-h-[280px] flex flex-col justify-center
      transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h3 className="text-2xl md:text-[34px] font-serif text-[#F5F1EA] mb-3 md:mb-5 leading-[1.15]">
        Material Integrity
      </h3>
      <p className="text-sm md:text-[15px] leading-loose text-[#A8A29E] tracking-wide">
        We source rare stones and reclaimed woods, treating every surface as
        a canvas for natural textures.
      </p>
    </div>

    {/* QUOTE */}
    <div
      className={`bg-gradient-to-br from-[#1A1A1C] to-[#111112] backdrop-blur-md
        border border-[#B08D57]/10 text-[#B08D57] p-6 md:p-10 rounded-2xl
      transition-all duration-700 delay-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <p className="italic text-base md:text-lg leading-relaxed">
        "The details are not the details. They make the design."
      </p>
      <p className="text-[10px] md:text-xs mt-4 md:mt-5 text-[#B08D57] tracking-[0.2em]">
        — CHARLES EAMES
      </p>
    </div>

  </div>

  {/* IMAGES */}
  
<div className="md:col-span-2">

  {/*  MOBILE SWIPE */}
  <div className="block md:hidden">
    <Swiper spaceBetween={16} slidesPerView={1.2} centeredSlides={true}>
      {[ p4, p5 ].map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative overflow-hidden rounded-2xl group">
            <img 
              src={img}
              alt="Vaagdesha Interiors luxury interior"
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              className="h-[250px] w-full object-cover rounded-2xl"
            />

            {/* SHADOW */}
            <div className="absolute inset-0 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* 💻 DESKTOP GRID (UNCHANGED LOOK) */}
  <div className="hidden md:grid grid-cols-2 gap-8 items-start">

  {/* IMAGE CARD */}
  <div
    className={`mt-10
      relative overflow-hidden rounded-2xl group cursor-pointer
      bg-[#151517]
      transition-all duration-700
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }
    `}
  >
    <img
      src={p4}
      alt="Vaagdesha Interiors luxury interior design"
      loading="lazy"
      decoding="async"
      width="800"
      height="600"
      className="
        h-[420px]
        w-full object-cover
        rounded-[32px]
        transition-all duration-[900ms]
        group-hover:scale-[1.03]
      "
    />

    <div className="
      absolute inset-0
      bg-black/20
      group-hover:bg-black/10
      transition-all duration-700
    " />

    <div className="
      absolute inset-0 rounded-2xl
      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
      transition-all duration-700
    " />
  </div>

  {/* EDITORIAL TEXT PANEL */}
  <div
    className={`
      mt-20
      h-[420px]
      rounded-[32px]
      border border-white/[0.05]
      bg-gradient-to-br from-[#171719] to-[#111112]
      p-7 md:p-8
      flex flex-col justify-between
      transition-all duration-700 delay-200

      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }
    `}
  >

    <div>

      <p className="
        text-[#B08D57]
        text-[11px]
        tracking-[0.35em]
        mb-5
      ">
        DESIGN PHILOSOPHY
      </p>

      <h3 className="
        text-3xl md:text-[36px]
        font-serif
        text-[#F5F1EA]
        leading-[1.05]
        mb-6
      ">
        Spaces shaped by light, texture, and restraint.
      </h3>

      <p className="
        text-[#A8A29E]
        leading-[1.7]
        text-[14px]
      ">
        Every project balances emotional warmth with
        architectural precision — creating interiors
        that feel timeless rather than trend-driven.
      </p>

    </div>

    <div className="
      flex gap-10 pt-8
      border-t border-white/[0.06]
    ">

      <div>
        <p className="
          text-[#B08D57]
          text-3xl
          font-serif
        ">
          48+
        </p>

        <span className="
          text-[#7E7E81]
          text-sm
        ">
          Luxury Projects
        </span>
      </div>

      <div>
        <p className="
          text-[#B08D57]
          text-3xl
          font-serif
        ">
          12
        </p>

        <span className="
          text-[#7E7E81]
          text-sm
        ">
          Design Awards
        </span>
      </div>

    </div>

  </div>

</div>
</div>

</div>
  );
}