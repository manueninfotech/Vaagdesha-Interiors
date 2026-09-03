import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import p1 from "../assets/projects/p1.webp";
import p2 from "../assets/projects/p2.webp";
import p3 from "../assets/projects/p3.webp";
import p6 from "../assets/projects/p6.webp";
import p7 from "../assets/projects/p7.webp";
import p9 from "../assets/projects/p9.png";

const projects = [
  {
    image: p1,
    title: "Modern Living",
    location: "VILLA — DUBAI",
  },
  {
    image: p2,
    title: "Lumina Kitchen",
    location: "PENTHOUSE — LONDON",
  },
  {
    image: p3,
    title: "Serene Bedroom",
    location: "RESIDENCE — HYDERABAD",
  },
  {
    image: p6,
    title: "Private Pool",
    location: "PENTHOUSE — BANGALORE",
  },
  {
    image: p7,
    title: "Luxury Bedroom",
    location: "RESIDENCE — BANGALORE",
  },
  {
    image: p9,
    title: "Kitchen Elegance",
    location: "BUNGALOW — KOCHI",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (isHovered) return prev;
        return (prev + 1) % projects.length;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative max-w-6xl mx-auto mb-16 md:mb-22 px-4 sm:px-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CAROUSEL */}
      <div
  id="catalog"
  className="relative h-[420px] flex items-center justify-center overflow-hidden"
>

  {projects.map((project, i) => {

    let position = "hidden";

if (i === current) {
  position = "center";
} else if (
  i === (current - 1 + projects.length) % projects.length
) {
  position = "left";
} else if (
  i === (current + 1) % projects.length
) {
  position = "right";
}

    return (
      <div
        key={i}
        className={`
          absolute transition-all duration-[1400ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${position === "center" && `
            z-20
            scale-100
            opacity-100
            translate-x-0
          `}

          ${position === "left" && `
            z-10
            scale-[0.82]
            opacity-50
            -translate-x-[380px]
          `}

          ${position === "right" && `
            z-10
            scale-[0.82]
            opacity-50
            translate-x-[380px]
          `}
          ${position === "hidden" && `
  opacity-0
  scale-50
  pointer-events-none
`}
        `}
      >

        <div className="relative">

          {position !== "hidden" && (
            <img
              src={project.image}
              alt={`${project.title} - ${project.location}`}
              loading={position === "center" ? "eager" : "lazy"}
              fetchPriority={position === "center" ? "high" : "auto"}
              decoding="async"
              width={position === "center" ? 440 : 280}
              height={position === "center" ? 300 : 190}
              className={`
                object-cover rounded-[32px]
                transition-all duration-[1000ms]

                ${
                  position === "center"
                    ? "w-[440px] h-[300px]"
                    : "w-[280px] h-[190px]"
                }
              `}
            />
          )}

          {/* OVERLAY */}
          <div className="
            absolute bottom-0 left-0
            w-full h-[35%]
            bg-gradient-to-t
            from-black/50 to-transparent
            rounded-b-[32px]
          " />

          {/* TEXT */}
          {position === "center" && (
            <div className="absolute bottom-6 left-6 text-white z-10">

              <p className="
                text-xs tracking-[0.25em]
                text-[#B08D57] mb-2
              ">
                {project.location}
              </p>

              <h3 className="
                text-3xl font-cormorant
                text-[#F5F1EA]
              ">
                {project.title}
              </h3>

            </div>
          )}

        </div>
      </div>
    );
  })}
</div>

      {/* ARROWS */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + projects.length) % projects.length)
        }
        className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 
        bg-white backdrop-blur-md border border-white/30 
        text-[#6B0F1A] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
        hover:bg-[#6B0F1A]/50 transition "
      >
        <ChevronLeft size={20}  />
      </button>

      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % projects.length)
        }
        className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 
        bg-white backdrop-blur-md border border-white/30 
        text-[#6B0F1A] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
        hover:bg-[#6B0F1A]/30 transition"
      >
        <ChevronRight size={20} />
      </button>

      {/* DOTS */}
      <div className="flex justify-center mt-4 md:mt-6 gap-2 md:gap-3">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              current === i
                ? "w-6 md:w-8 h-[3px] md:h-[4px] bg-[#C89B3C]"
                : "w-3 md:w-4 h-[3px] md:h-[4px] bg-[#CBBFB2]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}