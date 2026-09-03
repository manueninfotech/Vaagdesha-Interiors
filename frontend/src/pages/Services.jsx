import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import servicehero from "../assets/services/services-hero.webp";
import service1 from "../assets/services/service1.webp";
import service2 from "../assets/services/service002.png";
import service3 from "../assets/services/service3.webp";
import service4 from "../assets/services/service4.webp";
import service5 from "../assets/services/service5.webp";

import process from "../assets/services/process-3d.webp";
import process1 from "../assets/services/process1-3d.webp";
import process2 from "../assets/services/process2-3d.webp";

export default function Services() {
   const navigate = useNavigate();
   const [activeIndex, setActiveIndex] = useState(0);
   const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeUp");
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);


const services = [
  {
    title: "Residential Interiors",
    image: service1,
    description:
      "We design homes that reflect emotional warmth, elegance, and functionality.",

    tagline: "DESIGNED\nAROUND YOU",

    points: [
      "Personalized conceptual planning",
      "Bespoke materials & finishes",
      "End-to-end execution",
    ],
  },

  {
    title: "Modular Kitchen Design",
    image: service2,
    description:
      "Functional yet aesthetic kitchens crafted with precision and premium finishes.",

    tagline: "BEAUTY\nMEETS FUNCTION",

    points: [
      "Smart storage systems",
      "Premium finishes",
      "Seamless appliance integration",
    ],
  },

  {
    title: "Office & Commercial Interiors",
    image: service3,
    description:
      "Transforming workspaces into inspiring environments that enhance productivity.",

    tagline: "INSPIRED\nWORKSPACES",

    points: [
      "Brand-aligned design",
      "Lighting optimization",
      "Flexible layouts",
    ],
  },

  {
    title: "Custom Furniture Design",
    image: service4,
    description:
      "Unique handcrafted furniture pieces blending art with functionality.",

    tagline: "CRAFTED\nTO LAST",

    points: [
      "Tailored dimensions",
      "Premium materials",
      "Fine craftsmanship",
    ],
  },
  {
  title: "Convention Hall Interiors",

  image: service5,

  description:
    "Designing grand convention spaces that balance elegance, functionality, and seamless guest experience for weddings, celebrations, and corporate gatherings.",

  tagline: "CELEBRATE\nIN STYLE",

  points: [
    " Stage & backdrop design",
    " Premium lighting concepts",
    " Seating & circulation planning",
    " Luxury ceiling treatments",
  ],
}
];


const processSteps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    desc: "Understanding lifestyle, spatial intent, emotional atmosphere, and architectural vision before shaping the design direction.",
  },

  {
    number: "02",
    title: "Concept & Material Curation",
    desc: "Developing layouts, curated materials, textures, finishes, and mood-driven visual storytelling for the space.",
  },

  {
    number: "03",
    title: "Execution & Coordination",
    desc: "Managing timelines, craftsmen, detailing, site coordination, and flawless execution with precision.",
  },

  {
    number: "04",
    title: "Styling & Final Reveal",
    desc: "Layering lighting, furniture, décor, and finishing details to create a refined luxury experience.",
  },
];

{/* SHOWCASE DATA */}
const showcaseItems = [
  {
    image: process,
    label: "Architectural Luxury",
    title: "Executive Living Space",
  },

  {
    image: process2,
    label: "Spatial Experience",
    title: "Open Dining Pavilion",
  },

  {
    image: process1,
    label: "Private Luxury",
    title: "Luxury Bedroom Suite",
  },
];

    const [activeShowcase, setActiveShowcase] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveShowcase((prev) =>
          prev === showcaseItems.length - 1 ? 0 : prev + 1
        );
      }, 4500);

      return () => clearInterval(interval);
    }, []);


    const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.75,
    },
  },
};


  return (
    <>
    <SEO
  title="Interior Design Services | Vaagdesha Interiors"
  description="Vaagdesha Interiors offers luxury residential and commercial interior design services, space planning, modular kitchens, custom furniture, false ceilings, lighting design, and complete interior solutions."
  keywords="Interior Design Services, Residential Interiors, Commercial Interiors, Modular Kitchen Design, False Ceiling Design, Custom Furniture, Luxury Interiors, Space Planning, Vaagdesha Interiors"
  url="https://vaagdeshainteriors.com/services"
/>
    
<section className="
relative min-h-screen
overflow-hidden
bg-[#050505]
">

  <Navbar />

  {/* ================= HERO ================= */}
{/* HERO SECTION */}
<section
  className="
    relative

    min-h-screen
    md:h-[120vh]

    overflow-hidden
    bg-black
  "
>

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">

    <motion.img
  src={servicehero}
  alt="Luxury interior design by Vaagdesha Interiors"
  fetchPriority="high"
  decoding="async"
  width="1920"
  height="1080"
  initial={{ scale: 1 }}
  animate={{ scale: 1.08 }}
  transition={{
    duration: 10,
    ease: "easeOut",
  }}
  className="
    absolute inset-0
    w-full h-full
    object-cover
  "
/>

    {/* LEFT GRADIENT */}
    <motion.div
  animate={{
    opacity: [0.75, 0.9, 0.75],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute inset-0
    bg-gradient-to-r
    from-black/85
    via-black/50
    to-transparent
  "
/>

    {/* CINEMATIC VIGNETTE */}
    <div
      className="
        absolute inset-0

        bg-gradient-to-b
        from-black/30
        via-transparent
        to-black/35
      "
    />

  </div>

  {/* CONTENT */}
  <div
    className="
      relative z-10

      min-h-screen

flex items-center

pt-32
pb-16

sm:pt-36
md:pt-32

      px-5 sm:px-10 lg:px-16

      max-w-7xl
      mx-auto
    "
  >

    <div className="max-w-[620px] w-full">

      {/* LABEL */}
      <motion.p
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={0.1}
    
        className="
          text-[#B08D57]

          text-[10px]
          sm:text-xs
          md:text-sm

          tracking-[0.32em]
          sm:tracking-[0.45em]

          mb-5 sm:mb-8
        "
      >
        OUR SERVICES
      </motion.p>

      {/* HEADING */}
      <motion.h1
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={0.3}
        className="
          font-serif

          text-[#F5F1EA]

          text-[44px]
          sm:text-5xl
          md:text-[70px]

          leading-[0.95]

          mb-6 sm:mb-8
        "
      >
        Crafting
        Thoughtful
        <br />
        Interior
        <br />
        Experiences
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={0.5}

        className="
          text-[#C6C1BA]

          text-[14px]
          sm:text-base
          md:text-lg

          leading-[1.9]

          max-w-[580px]

          mb-8 sm:mb-12
        "
      >
        From bespoke residential transformations
        to curated commercial ateliers, we translate
        your vision into a sanctuary of architectural elegance.
      </motion.p>

      {/* BUTTONS */}
      <motion.div
    variants={fadeScale}
    initial="hidden"
    animate="show"
    className="flex flex-wrap gap-4 sm:gap-5"
>
        <button
          onClick={() => navigate("/contact#form")}

          className="
            border border-[#B08D57]/50

            text-[#F5F1EA]

            px-6 sm:px-8
            py-3 sm:py-4

            tracking-[0.16em]
            sm:tracking-[0.2em]

            text-[11px]
            sm:text-sm

            rounded-md

            backdrop-blur-md

            bg-white/[0.03]

            transition-all duration-500

            hover:bg-white/10
            hover:-translate-y-1
            hover:scale-[1.03]
            active:scale-[0.98]
          "
        >
          BOOK CONSULTATION
        </button>

      </motion.div>

    </div>

  </div>

</section>

  {/* ================= DETAIL SECTIONS ================= */}

  {/* SECTION 1 */}
  <section
  id="services-grid"
  className="
    relative z-10

    pt-14 sm:pt-16 md:pt-20
    pb-14 sm:pb-16 md:pb-20
    
    px-4 sm:px-6 lg:px-16

    overflow-hidden

    bg-[#050505]
  "
>

  {/* GLASS BACKGROUND */}

<div
  className="
    absolute inset-0
    pointer-events-none
  "
>

  {/* BLUR GRADIENT */}
  <div
  className="
    absolute inset-0

    bg-[radial-gradient(circle_at_top_left,rgba(198,166,106,0.08),transparent_40%)]

    opacity-70
  "
/>

  {/* GOLDEN GLOW */}
  <div
    className="
      absolute
      top-[15%]
      left-[10%]

      w-[320px]
      h-[320px]

      rounded-full

      bg-[#C6A66A]/[0.05]
blur-[70px]
    "
  />

  {/* SECOND LIGHT */}
  <div
    className="
      absolute
      bottom-[10%]
      right-[5%]

      w-[280px]
      h-[280px]

      rounded-full

      bg-[#ffffff]/[0.02]
blur-[60px]
    "
  />

</div>

  {services.map((service, index) => (

    <div
      key={index}
      className="
        max-w-6xl mx-auto
        grid md:grid-cols-2
        gap-8 sm:gap-10 md:gap-12
        items-center

        px-4 sm:px-6
        pb-12 sm:pb-16 md:pb-24
      "
    >

      {/* IMAGE */}
      <div
        className={`
          overflow-hidden
          rounded-[22px]
          border border-white/[0.05]
          bg-[#141416]
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]

          ${index % 2 !== 0
            ? "order-1 md:order-2"
            : ""
          }
        `}
      >

        <img
          src={service.image}
          alt={`${service.title} - Vaagdesha Interiors`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          width="800"
          height="600"
          className="
            w-full
            h-[220px]
            sm:h-[280px]
            md:h-[360px]
            object-cover
            transition-transform
            duration-[1200ms]
            hover:scale-105
          "
        />

      </div>

      {/* CONTENT */}
      <div
  className={`
    relative

    flex
    flex-col
    justify-center

    bg-white/[0.03]
    backdrop-blur-md

    border border-white/[0.06]

    rounded-[22px] md:rounded-[28px]

    p-6 sm:p-8 md:p-10

    shadow-[0_20px_80px_rgba(0,0,0,0.35)]

    text-center md:text-left

    overflow-hidden

    ${index % 2 !== 0
      ? "order-2 md:order-1"
      : ""
    }
  `}
>

  <div
  className="
    absolute top-0 left-0
    w-full h-[1px]

    bg-gradient-to-r
    from-transparent
    via-[#C6A66A]/40
    to-transparent
  "
/>

    <div className="relative z-10">
        <p
          className="
            text-[#C6A66A]
            text-xs
            tracking-[0.35em]
            mb-4
          "
        >
          INTERIOR DESIGN
        </p>

        <h2
          className="
            text-[28px]
            sm:text-[36px]
            md:text-[42px]
            font-serif
            text-[#F5F1EA]

            mb-4 sm:mb-6
            leading-[1.1]
          "
        >
          {service.title}
        </h2>

        <p
          className="
            text-[#A8A29E]
            mb-4
            text-[14px]
            sm:text-[15px]
            md:text-base
            leading-[1.9]
            max-w-[520px]
          "
        >
          {service.description}
        </p>

        <div className="mt-8 flex items-center justify-between gap-5">

  {/* Points */}
  <div
    className="
      flex-1
      space-y-4
      text-[#D6D0C7]
      text-[14px]
      sm:text-[15px]
      md:text-base
    "
  >
   {service.points.map((point, i) => (
  <div
    key={i}
    className="flex items-center gap-3"
  >
    <span
      className="
        h-1.5
        w-1.5
        rounded-full
        bg-[#C6A66A]
        shrink-0
      "
    />

    <p
      className="
        leading-8
        text-[#D6D0C7]
      "
    >
      {point}
    </p>
  </div>
))}
  </div>

  {/* Divider + Tagline */}
  <div
  className="
    hidden
    lg:flex

    items-center

    gap-4

    ml-2
  "
>
  {/* Gold Line */}
  <div className="w-px h-28 bg-[#C6A66A]/35" />

  {/* Tagline */}
  <p
    className="
      inline-flex
      items-center
      justify-center

      px-6 py-2.5
      border border-[#C6A66A]/70
      rounded-full
      text-[#C6A66A]/80

      text-[10px]
      xl:text-[11px]

      tracking-[0.32em]
      uppercase

      leading-[1.9]

      whitespace-pre-line

      text-left
    "
  >
    {service.tagline}
  </p>
</div>

</div>

      </div>

      </div>

    </div>

  ))}

</section>

{/* =========================
    OUR APPROACH / PROCESS
========================= */}

<section
      className="
        relative
        py-14 sm:py-16 md:py-20
        
        px-4 sm:px-6 lg:px-16
        bg-[#050505]
        overflow-hidden
      "
    >
      {/* AMBIENT GLOW */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,rgba(198,166,106,0.08),transparent_55%)]
        "
      />
      {/* GOLD BLUR */}
      <div
        className="
          absolute
          top-[10%]
          right-[5%]
          w-[260px]
          sm:w-[400px]

          h-[260px]
          sm:h-[400px]

          blur-[70px]
          sm:blur-[120px]
          bg-[#C6A66A]/10
          rounded-full
        "
      />
      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20  items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* LABEL */}
            <p
              className="
                text-[#C6A66A]
                text-xs
                tracking-[0.38em]
                uppercase
                mb-6
              "
            >
              Our Approach
            </p>

            {/* HEADING */}
            <h2
              className="
                text-[42px]
                sm:text-[48px]
                md:text-[55px]

                leading-[0.98]
                tracking-[-0.04em]

                font-serif
                text-[#F5F1EA]

                mb-8
              "
            >
              Designed with clarity.
              Executed with precision.
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-[#9F978D]
                text-[14px]
                sm:text-[15px]
                md:text-[17px]
                leading-[1.9]
                max-w-[620px]
                mb-10 sm:mb-12
              "
            >
              Every project follows a refined process —
              balancing aesthetics, functionality,
              craftsmanship, and emotional experience
              through a deeply intentional design journey.
            </p>

            {/* DIVIDER */}
            <div className="w-24 h-[1px] bg-[#C6A66A]/40 mb-10" />

            {/* PROCESS LIST */}
            <div className="space-y-1">

              {processSteps.map((item, index) => {

                const isOpen = activeIndex === index;

                return (

                  <div
                    key={index}
                    className="
                      border-b border-white/[0.06]
                      py-4 sm:py-5
                    "
                  >

                    {/* HEADER */}
                    <button
                      onClick={() =>
                        setActiveIndex(isOpen ? null : index)
                      }

                      className="
                        w-full
                        flex
                        items-start
                        justify-between
                        gap-6

                        text-left

                        group
                      "
                    >

                      <div className="flex gap-5">

                        {/* NUMBER */}
                        <span
                          className="
                            text-[#C6A66A]/70
                            text-sm
                            tracking-[0.28em]
                            mt-2
                          "
                        >
                          {item.number}
                        </span>

                        {/* TITLE */}
                        <h3
                          className="
                            text-[#F5F1EA]
                            text-[22px]
                            sm:text-[24px]
                            md:text-[25px]
                            leading-[1.2]
                            font-serif

                            transition-all duration-500

                            group-hover:text-[#C6A66A]
                          "
                        >
                          {item.title}
                        </h3>

                      </div>

                      {/* ICON */}
                      <ChevronDown
                        size={22}
                        className={`
                          mt-2
                          text-[#C6A66A]
                          transition-all duration-500
                          ${isOpen ? "rotate-180" : ""}
                        `}
                      />

                    </button>

                    {/* DROPDOWN */}
                    <div
                      className={`
                        overflow-hidden
                        transition-all duration-700 ease-out

                        ${isOpen
                          ? "max-h-40 opacity-100 mt-6"
                          : "max-h-0 opacity-0"}
                      `}
                    >

                      <div className="flex gap-5">

                        {/* GOLD LINE */}
                        <div
                          className="
                            w-[1px]
                            bg-[#C6A66A]/40
                            ml-[10px]
                          "
                        />

                        {/* DESCRIPTION */}
                        <p
                          className="
                            text-[#9F978D]
                            text-[14px]
                            sm:text-[15px]
                            leading-[1.9]
                            max-w-[500px]
                            pb-2
                          "
                        >
                          {item.desc}
                        </p>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* RIGHT SIDE */}

            <div
              className="
    relative
    flex
    flex-col
    items-center
    justify-center

    mt-4 lg:-mt-10
  "
            >

              {/* GLOW */}
              <div
                className="
      absolute
      inset-0
      bg-[#C6A66A]/10
      blur-[120px]
      scale-75
    "
              />

              {/* IMAGE CONTAINER */}
              <div
                className="
      relative
      w-full
      flex
      items-center
      justify-center
      min-h-[380px]
      sm:min-h-[500px]
      md:min-h-[620px]
    "
              >
                {(() => {
                  const item = showcaseItems[activeShowcase];

                  return (
                    <div
                      key={activeShowcase}

                      className="
    absolute

    animate-[showcaseFade_0.8s_ease]
  "
                    >

                      {/* MAIN IMAGE */}
                      <div
                        className="
            relative

            hover:scale-[1.02]
            transition-all
            duration-700
          "
                      >

                        <img
                          src={item.image}
                          alt={`${item.title} - Vaagdesha Interiors`}
                          loading="lazy"
                          decoding="async"
                          width="760"
                          height="760"
                          className="
                            w-full
                            max-w-[340px]
                            sm:max-w-[520px]
                            md:max-w-[760px]
                            object-contain
                            drop-shadow-[0_40px_120px_rgba(0,0,0,0.85)]
                          "
                        />

                      </div>

                      {/* CONTENT */}
                      <div
                        className="
            text-center
            mt-6 sm:mt-10
            max-w-[620px]
            mx-auto
          "
                      >

                        {/* LABEL */}
                        <p
                          className="
              text-[#C6A66A]
              text-[11px]
              tracking-[0.35em]
              uppercase
              mb-4
            "
                        >
                          {item.label}
                        </p>

                        {/* TITLE */}
                        <h3
                          className="
              text-[#F5F1EA]
              font-serif

              text-[24px]
              sm:text-[28px]
              md:text-[30px]

              leading-[1.1]
              tracking-[-0.03em]

              mb-5
            "
                        >
                          {item.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className="
              text-[#9F978D]
              text-[14px]
              sm:text-[15px]
              md:text-[16px]

              leading-[1.9]

              max-w-[520px]
              mx-auto
            "
                        >
                          {item.desc}
                        </p>

                      </div>

                    </div>
                  );
                })()}
              </div>

              {/* INDICATORS */}
              <div
                className="
      flex
      items-center
      gap-3
      mt-4 sm:mt-6
    "
              >

                {showcaseItems.map((_, index) => (

                  <button
                    key={index}
                    onClick={() => setActiveShowcase(index)}

                    className={`
          transition-all
          duration-500
          rounded-full

          ${activeShowcase === index
                        ? "w-10 h-[3px] bg-[#C6A66A]"
                        : "w-3 h-3 bg-white/20 hover:bg-white/40"
                      }
        `}
                  />

                ))}

              </div>

              {/* QUOTE */}
              <div
                className="
      mt-12 sm:mt-16 md:mt-20
      text-center
      max-w-[520px]
    "
              >

                <p
                  className="
        text-[#F5F1EA]
        font-serif

        text-[20px]
        sm:text-[24px]
        md:text-[28px]

        leading-[1.5]
        tracking-[-0.02em]

        mb-6
      "
                >
                  “Luxury is not created through excess —
                  but through intentional detail.”
                </p>

                <div
                  className="
        w-16
        h-[1px]
        bg-[#C6A66A]/40
        mx-auto
        mb-4
      "
                />

                <p
                  className="
        text-[#9F978D]
        text-sm
        tracking-[0.3em]
        uppercase
      "
                >
                  Vaagdeesha Interiors
                </p>

              </div>

            </div>

          </div>

        </div>

</section>

  {/* ================= CTA ================= */}
  {/* CTA */}
<div className="
  relative overflow-hidden
  py-14 sm:py-16 md:py-20
  border-t border-white/[0.05]
">

  {/* BACKGROUND */}
  <div className="absolute inset-0 bg-[#0D0D0E]" />

  {/* GLOW */}
  <div className="
    absolute left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[320px]
sm:w-[520px]
md:w-[700px]

h-[320px]
sm:h-[520px]
md:h-[700px]

bg-[#B08D57]/10

blur-[70px]
sm:blur-[100px]
md:blur-[140px]
    rounded-full
  " />

  <div
  className="
    relative z-10

    text-center

    px-4 sm:px-6
  "
>

    <p className="
      text-[#B08D57]
      tracking-[0.4em]
      text-[11px]
      mb-4 sm:mb-5
    ">
      CURATED SPACES
    </p>

    <h2 className="
      text-[38px]
sm:text-5xl
md:text-6xl
      font-serif
      text-[#F5F1EA]
      leading-[1]
      mb-6 sm:mb-8
    ">
      Let’s Design <br />
      Your Dream Space
    </h2>

    <p className="
      max-w-[320px]
sm:max-w-2xl

mx-auto

text-[#9A9A9D]

text-[14px]
sm:text-base

leading-[1.9]

mb-8 sm:mb-10
    ">
      Bespoke interiors crafted with timeless materials,
      architectural precision, and emotional warmth.
    </p>

    <button
      onClick={() => navigate("/contact#form")}
      className="
        group relative overflow-hidden
        bg-[#F5F1EA]
        px-7 sm:px-10
        py-3 sm:py-4
        rounded-full
        tracking-[0.18em] sm:tracking-[0.25em]
        text-[12px] sm:text-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
      "
    >

      <span
        className="
          relative z-10
          text-black
          transition-colors duration-500
          group-hover:text-white
        "
      >
        BOOK CONSULTATION
      </span>

      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-[#7D1220]
        to-[#B08D57]
        opacity-0
        group-hover:opacity-100
        transition duration-500
      " />
    </button>

  </div>
</div>

</section>
</>
  );
}