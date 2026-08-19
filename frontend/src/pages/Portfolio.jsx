import SEO from "../components/SEO";
import FeaturedCarousel from "../components/FeaturedCarousel";
import React, { useState, useEffect, useRef } from "react";
import EditorialGrid from "../components/EditorialGrid";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import portfoliobg from "../assets/portfolio/portfolio-bg.png";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import living1 from "../assets/collections/living1.png"
import living2 from "../assets/collections/living2.png"
import kitchen1 from "../assets/collections/kitchen1.png"
import kitchen2 from "../assets/collections/kitchen2.png"
import bedroom1 from "../assets/collections/bedroom1.png"
import bedroom2 from "../assets/collections/bedroom2.png"
import dining1 from "../assets/collections/dining2.png"
import dining2 from "../assets/collections/dining2.png"
import office1 from "../assets/collections/office1.png"
import office2 from "../assets/collections/office2.png"


export default function Portfolio() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);
  

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const CARD_WIDTH = 344;

const scrollLeft = () => {
  scrollRef.current?.scrollBy({
    left: -CARD_WIDTH,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  scrollRef.current?.scrollBy({
    left: CARD_WIDTH,
    behavior: "smooth",
  });
};

  const collections = [
    {
      title: "Living Rooms",
      description:
        "Layered lighting, sculptural furniture, and intimate atmospheres designed for modern luxury living.",
      cover: living1,
      projects: [
        {
          name: "Midnight Residence",
          location: "Hyderabad",
          year: "2025",
          area: "4200 sq.ft",
          image: living1,
          narrative:
      "Designed with layered lighting, smoked oak finishes, textured marble, and sculptural silhouettes to create an intimate luxury atmosphere.",

    approach:
      "Every corner was curated to create emotional depth through contrast and restrained luxury aesthetics.",

  materials: [
    "Travertine Marble",
    "Smoked Oak",
    "Brass Accents"
  ],
        },
        {
          name: "Skyline Villa",
          location: "Bangalore",
          year: "2024",
          area: "5100 sq.ft",
          image: living2,
          narrative:
    "Skyline Villa was envisioned as a contemporary retreat suspended between urban sophistication and natural calm. Expansive glazing, layered ambient lighting, and rich material contrasts create interiors that feel immersive yet deeply comforting.",

  approach:
    "The design language embraces restraint through clean architectural lines while introducing warmth through tactile textures, soft furnishings, and curated lighting compositions. Each zone was intentionally framed to maximize openness without losing intimacy.",

  materials: [
    "Travertine Stone",
    "Dark Walnut Veneer",
    "Textured Concrete",
    "Warm Ambient LEDs",
    "Bronze Metal Accents",
  ],
        },
      ],
    },

    {
      title: "Kitchens",
      description:
        "Minimal compositions crafted with warm stone, ambient lighting, and architectural restraint.",
      cover: kitchen1,
      projects: [
        {
          name: "Lumina Kitchen",
          location: "London",
          year: "2025",
          area: "1800 sq.ft",
          image: kitchen1,
          narrative:
    "Lumina Kitchen blends sculptural minimalism with refined luxury, creating a space where functionality feels effortlessly elegant. Soft lighting, seamless cabinetry, and natural stone surfaces establish a calm and sophisticated atmosphere.",

  approach:
    "The layout was designed to encourage fluid movement while maintaining visual purity through concealed storage and uninterrupted material continuity. Warm undertones and subtle illumination enhance the kitchen’s inviting character.",

  materials: [
    "Italian Marble",
    "Champagne Metal Finish",
    "Matte Oak Veneer",
    "Integrated Warm Lighting",
    "Quartz Countertops",
  ],
        },
        {
          name: "Terra Marble Kitchen",
          location: "Dubai",
          year: "2024",
          area: "2200 sq.ft",
          image: kitchen2,
          narrative:
    "Terra Marble Kitchen was crafted as a bold contemporary statement where dramatic stone textures meet understated elegance. The interplay of dark finishes and ambient lighting creates depth, warmth, and architectural presence.",

  approach:
    "The design focuses on material richness and spatial balance, combining monolithic marble surfaces with minimalist detailing to achieve a timeless luxury aesthetic. Every element was curated to feel sculptural yet highly functional.",

  materials: [
    "Dark Emperador Marble",
    "Smoked Glass Panels",
    "Walnut Wood Finish",
    "Textured Stone Backsplash",
    "Ambient Pendant Lighting",
  ],
        },
      ],
    },

    {
      title: "Bedrooms",
      description:
        "Quiet luxury bedrooms shaped around softness, comfort, and timeless material palettes.",
      cover: bedroom1,
      projects: [
        {
          name: "Serene Suite",
          location: "Mumbai",
          year: "2025",
          area: "1400 sq.ft",
          image: bedroom1,
          narrative:
    "Serene Suite was designed as a sanctuary of softness and calm, where muted tones, layered textures, and ambient illumination create a deeply restful atmosphere. The space balances minimal elegance with emotional warmth.",

  approach:
    "Every element was curated to reduce visual noise while enhancing comfort through tactile materials, concealed lighting, and fluid spatial transitions. The bedroom feels intimate, timeless, and quietly luxurious.",

  materials: [
    "Soft Linen Panels",
    "Warm Oak Veneer",
    "Textured Fabric Headboard",
    "Ambient Cove Lighting",
    "Natural Stone Accents",
  ],
        },
        {
          name: "Ivory Retreat",
          location: "Hyderabad",
          year: "2024",
          area: "1600 sq.ft",
          image: bedroom2,
          narrative:
    "Ivory Retreat embraces understated luxury through a palette of warm neutrals, sculptural furniture, and soft atmospheric lighting. The interiors were crafted to evoke tranquility while maintaining architectural sophistication.",

  approach:
    "The design language focuses on spatial harmony and material restraint, allowing subtle textures and refined detailing to define the experience. Every layer was thoughtfully composed to create serenity and timelessness.",

  materials: [
    "Ivory Marble",
    "Walnut Wood Finish",
    "Bouclé Upholstery",
    "Brushed Brass Details",
    "Layered Mood Lighting",
  ],
        },
      ],
    },

    {
      title: "Dining Spaces",
      description:
        "Elegant dining environments where atmosphere and materiality become part of the experience.",
      cover: dining1,
      projects: [
        {
          name: "Obsidian Dining",
          location: "Chennai",
          year: "2025",
          area: "1200 sq.ft",
          image: dining1,
          narrative:
    "Obsidian Dining was envisioned as an intimate social space where dramatic contrasts, warm lighting, and sculptural furniture create a refined dining experience. The dark material palette enhances depth while maintaining elegance and comfort.",

  approach:
    "The design emphasizes mood and spatial intimacy through restrained detailing, focused lighting compositions, and tactile finishes. Every element was curated to create a cinematic atmosphere suited for luxury entertaining.",

  materials: [
    "Black Marble",
    "Smoked Oak Finish",
    "Bronze Pendant Lighting",
    "Textured Wall Panels",
    "Matte Stone Flooring",
  ],
        },
        {
          name: "Noir Table House",
          location: "Pune",
          year: "2024",
          area: "1500 sq.ft",
          image: dining2,
          narrative:
    "Noir Table House blends contemporary sophistication with quiet warmth, creating a dining environment that feels immersive and timeless. Layered lighting and minimal architectural lines allow the material palette to become the focal experience.",

  approach:
    "The interiors were designed around balance — combining dark finishes with soft illumination and organic textures to create a welcoming yet luxurious atmosphere. The space encourages connection while preserving visual serenity.",

  materials: [
    "Dark Walnut Veneer",
    "Travertine Stone",
    "Ambient Pendant Lights",
    "Leather Upholstery",
    "Textured Concrete Finish",
  ],
        },
      ],
    },

    {
      title: "Office Interiors",
      description:
        "Workspaces designed with sophistication, calm palettes, and modern executive character.",
      cover: office1,
      projects: [
        {
          name: "Atelier Workspace",
          location: "Bangalore",
          year: "2025",
          area: "6000 sq.ft",
          image: office1,
          narrative:
    "Atelier Workspace was designed as a refined creative environment where contemporary minimalism meets executive sophistication. The interiors balance openness with intimacy, encouraging focus, collaboration, and calm productivity.",

  approach:
    "The design language emphasizes clean architectural geometry, layered lighting, and restrained material palettes to create a workspace that feels modern yet timeless. Every detail was curated to elevate both functionality and atmosphere.",

  materials: [
    "Smoked Oak Panels",
    "Textured Glass Partitions",
    "Matte Stone Flooring",
    "Ambient Linear Lighting",
    "Bronze Metal Accents",
  ],
        },
        {
          name: "Axis Corporate",
          location: "Hyderabad",
          year: "2024",
          area: "7200 sq.ft",
          image: office2,
          narrative:
    "Axis Corporate redefines the modern executive workspace through a balance of architectural precision and understated luxury. Dark tones, warm lighting, and layered textures create an atmosphere that feels both powerful and welcoming.",

  approach:
    "The interiors were designed to enhance spatial clarity and productivity while maintaining a refined visual identity. Minimal detailing, premium materials, and carefully curated lighting compositions establish a timeless corporate aesthetic.",

  materials: [
    "Travertine Stone",
    "Dark Walnut Finish",
    "Acoustic Wall Panels",
    "Integrated LED Lighting",
    "Brushed Brass Details",
  ],
        },
      ],
    },
  ];


  return (
    <>
    <SEO
  title="Interior Design Portfolio | Vaagdesha Interiors"
  description="Explore the portfolio of Vaagdesha Interiors featuring luxury residential and commercial interior design projects, modern living spaces, elegant bedrooms, kitchens, and bespoke interiors."
  keywords="Interior Design Portfolio, Luxury Interior Projects, Residential Interiors, Commercial Interiors, Modern Living Room Design, Bedroom Interiors, Kitchen Interiors, Vaagdesha Interiors"
  url="https://vaagdeshainteriors.com/portfolio"
/>

    <section className=" relative overflow-hidden bg-[#0F0F10]
 pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6">
      <div className="absolute inset-0 opacity-80">
  <div className="absolute top-0 left-0 w-full h-full 
  bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.06),transparent_65%)]" />
</div>

      <Navbar />

      {/* HERO */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="
          max-w-6xl mx-auto

          grid md:grid-cols-2

          gap-10 sm:gap-12 md:gap-12

          mb-14 sm:mb-16 md:mb-20
        "
      >
       
        {/* LEFT */}
        <div className="text-center md:text-left">
          <p className="text-xs tracking-[0.3em] text-[#B08D57] mb-3 md:mb-4">
            CURATED EXCELLENCE
          </p>

          <h1 className="text-[42px] sm:text-5xl md:text-6xl font-serif font-light text-[#F5F1EA] leading-tight">
            The Collection
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center md:items-end text-center md:text-left">
          <p className="text-[#A8A29E] leading-relaxed text-[14px] sm:text-sm md:text-base leading-[1.9]">
            A collection of architectural narratives where heritage materials
            meet contemporary restraint. Each space is a study in light,
            volume, and intentionality.
          </p>
        </div>

      </motion.div>

      {/* CAROUSEL */}
      <motion.div
  variants={fadeScale}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.25 }}
  className="relative max-w-7xl mx-auto"
>
<div className="absolute inset-0 bg-[#0F0F10]/70" />
        <div className="absolute inset-0 opacity-[0.12]">
  <img
    src={portfoliobg}
    className="w-full h-full object-cover"
  />
</div>
        

  <div className="relative z-10">
    <FeaturedCarousel />
  </div>

</motion.div>

      {/* GRID */}
      <EditorialGrid />

      <motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="relative py-16 md:py-20 overflow-hidden bg-[#0F0F10]"
>
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#B08D57]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADING */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#B08D57] tracking-[0.35em] text-xs mb-5">
            CURATED COLLECTIONS
          </p>

          <h2 className="text-[38px] sm:text-5xl md:text-6xl font-serif text-[#F5F1EA] leading-tight">
            Spaces Designed Around
            <br />
            The Way You Live
          </h2>
        </div>

        {/* HORIZONTAL COLLECTIONS */}
        <div
  ref={scrollRef}
  className="
gap-10 md:gap-14
flex gap-8 overflow-x-auto
pb-6
snap-x snap-mandatory
scrollbar-hide
[-ms-overflow-style:none]
[scrollbar-width:none]
"
>
          {collections.map((item, i) => (
  <div
  data-card
  key={i}
  onClick={() => {
  setActive(item);
  setSelectedProject(item.projects[0]);
}}
    className={`
      group relative flex-shrink-0
      w-[220px] sm:w-[260px] md:w-[320px]
      h-[340px] sm:h-[400px] md:h-[460px]
      rounded-[36px]
      overflow-hidden
      cursor-pointer
      snap-center
      bg-[#1A1A1C]
      border border-white/[0.05]
      transition-all duration-700
      hover:-translate-y-3
      hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]

      ${i % 2 === 0 ? "md:mt-0" : "md:mt-12"}
    `}
  >
              {/* IMAGE */}
              <img
                src={item.cover}
                alt={item.title}
                className="
                  absolute inset-0 w-full h-full
                  object-cover
                  transition-all duration-[1400ms]
                  group-hover:scale-105
                "
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">

  <p className="
    text-[#B08D57]
    text-[10px] md:text-[11px]
    tracking-[0.35em]
    mb-2
  ">
    COLLECTION
  </p>

  <h3 className="
    text-[32px] sm:text-[42px] md:text-[56px]
    font-serif
    text-[#F5F1EA]
    mb-4
    leading-[0.92]
  ">
    {item.title}
  </h3>

  <p className="
    text-[#B8B2AC]
    text-[13px] sm:text-sm md:text-[15px]
    leading-[1.8]
    max-w-[240px]
  ">
    {item.description}
  </p>

</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-10 mt-10">

  <button
    onClick={scrollLeft}
    className="
      group
      w-14 h-14
      rounded-full
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      flex items-center justify-center
      transition-all duration-500
      hover:bg-[#B08D57]
      hover:border-[#B08D57]
      hover:scale-105
      hover:shadow-[0_8px_30px_rgba(176,141,87,0.25)]
    "
  >
    <ChevronLeft
      size={22}
      className="text-[#F5F1EA]"
    />
  </button>

  <button
    onClick={scrollRight}
    className="
      group
      w-14 h-14
      rounded-full
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      flex items-center justify-center
      transition-all duration-500
      hover:bg-[#B08D57]
      hover:border-[#B08D57]
      hover:scale-105
      hover:shadow-[0_8px_30px_rgba(176,141,87,0.25)]
    "
  >
    <ChevronRight
      size={22}
      className="text-[#F5F1EA]"
    />
  </button>

</div>
      </div>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-[#141416] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/[0.06] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            {/* CLOSE */}
            <button
              onClick={() => {
  setActive(null);
  setSelectedProject(null);
}}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              ✕
            </button>

            <div
  className="
    grid md:grid-cols-[1.2fr_0.8fr]

    h-[90vh] md:h-[85vh]
  "
>

  {/* LEFT SIDE */}
  <div className="overflow-y-auto no-scrollbar">

    {/* IMAGE */}
    <div className="relative h-[260px] sm:h-[340px] md:h-[420px]">
      <img
        src={selectedProject.image}
        alt={selectedProject.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-8 left-8">
        <p className="text-[#B08D57] tracking-[0.3em] text-xs mb-3">
          {selectedProject.location}
        </p>

        <h2 className="text-[32px] sm:text-4xl md:text-5xl font-serif text-[#F5F1EA]">
          {selectedProject.name}
        </h2>
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-5 sm:p-8 md:p-10 space-y-10">

      {/* INTRO */}
      <div>
        <h3 className="text-[#F5F1EA] text-2xl font-serif mb-5">
          Project Narrative
        </h3>

        <p className="text-[#A8A29E] leading-relaxed">
  {selectedProject.narrative}
</p>
      </div>

      {/* MATERIALS */}
      <div>
        <h3 className="text-[#F5F1EA] text-2xl font-serif mb-5">
          Materials & Finishes
        </h3>

        <div className="flex flex-wrap gap-3">
          {selectedProject.materials.map((tag, i) => (
            <span
              key={i}
              className="
                px-4 py-2 rounded-full
                bg-white/[0.04]
                border border-white/[0.06]
                text-[#D6C2A1]
                text-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-8">

        <div>
          <p className="text-[#B08D57] text-sm mb-2">
            Area
          </p>

          <h4 className="text-[#F5F1EA] text-xl">
            {selectedProject.area}
          </h4>
        </div>

        <div>
          <p className="text-[#B08D57] text-sm mb-2">
            Year
          </p>

          <h4 className="text-[#F5F1EA] text-xl">
            {selectedProject.year}
          </h4>
        </div>

      </div>

      {/* EXTRA PARAGRAPH */}
      <div>
        <h3 className="text-[#F5F1EA] text-2xl font-serif mb-5">
          Design Approach
        </h3>

        <p className="text-[#A8A29E] leading-relaxed">
  {selectedProject.approach}
</p>
      </div>

    </div>
  </div>

  {/* RIGHT SIDE */}
  <div
  className="
    border-t md:border-t-0
    md:border-l

    border-white/[0.06]

    p-5 sm:p-8

    overflow-y-auto
    no-scrollbar
  "
>

    <p className="text-[#B08D57] tracking-[0.3em] text-xs mb-8">
      COLLECTION PROJECTS
    </p>

    <div className="space-y-5">
      {active.projects.map((project, idx) => (

        <div
          key={idx}
          onClick={() => setSelectedProject(project)}
          className={`
            flex gap-3 sm:gap-4 p-3 rounded-xl sm:rounded-2xl cursor-pointer
            transition-all duration-500 border

            ${
              selectedProject?.name === project.name
                ? "bg-white/[0.06] border-white/[0.08]"
                : "bg-transparent border-transparent hover:bg-white/[0.03]"
            }
          `}
        >

          <img
            src={project.image}
            alt={project.name}
            className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl object-cover"
          />

          <div>
            <h4 className="text-[#F5F1EA] text-base sm:text-lg mb-1">
              {project.name}
            </h4>

            <p className="text-[#8D8D92] text-sm mb-2">
              {project.location}
            </p>

            <div className="flex gap-3 text-xs text-[#B08D57]">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.area}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>

</div>
            </div>
          </div>
      )}
    </motion.section>

      {/* CTA */}
      {/* CTA */}
<div className="relative overflow-hidden py-16 sm:py-20 md:py-24 border-t border-white/[0.05]">

  {/* BACKGROUND */}
  <div className="absolute inset-0 bg-[#0B0B0C]" />

  {/* RADIAL GLOW */}
  <div className="
    absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[900px] h-[900px]
    bg-[#B08D57]/10
    blur-[160px]
    rounded-full
  " />

  {/* GRADIENT OVERLAY */}
  <div className="
    absolute inset-0
    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]
  " />

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl mx-auto text-center px-6">

    {/* LABEL */}
    <p className="
      text-[#B08D57]
      tracking-[0.4em]
      text-[11px]
      mb-6
    ">
      CURATED INTERIORS
    </p>

    {/* HEADING */}
    <h2 className="
      text-[42px] sm:text-5xl md:text-7xl
      font-serif
      text-[#F5F1EA]
      leading-[1.05]
      mb-8
    ">
      Begin Your <br />
      Design Journey
    </h2>

    {/* SUBTEXT */}
    <p className="
      max-w-2xl mx-auto
      text-[#A8A29E]
      text-[15px] md:text-lg
      leading-[1.9]
      mb-12
    ">
      Crafted spaces that balance architectural restraint,
      emotional warmth, and timeless materiality —
      tailored for modern luxury living.
    </p>

    {/* BUTTONS */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">

      {/* PRIMARY */}
      <button
        onClick={() => {
          document.getElementById("catalog")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="
          group relative overflow-hidden
          bg-[#F5F1EA]
          text-[#6B0F1A]
          px-7 sm:px-10 py-3 sm:py-4
          rounded-full
          tracking-[0.25em]
          text-sm
          transition-all duration-500
          hover:-translate-y-1
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        "
      >

        <span
          className="
            relative z-10
            text-[#6B0F1A]
            transition-colors duration-500
            group-hover:text-white
          "
        >
          VIEW COLLECTIONS
        </span>

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#8A1D2C]
            via-[#A54A3C]
            to-[#B08D57]
            opacity-0
            group-hover:opacity-100
            transition-all duration-500
          "
        />
      </button>

      {/* SECONDARY */}
      <button
        onClick={() => navigate("/contact#form")}
        className="
          border border-white/[0.08]
          bg-white/[0.02]
          backdrop-blur-xl
          text-[#F5F1EA]
          px-10 py-4
          rounded-full
          tracking-[0.25em]
          text-sm
          transition-all duration-500
          hover:bg-white/[0.06]
          hover:-translate-y-1
        "
      >
        BOOK CONSULTATION
      </button>

    </div>

  </div>
</div>

    </section>
    </>
  );
}