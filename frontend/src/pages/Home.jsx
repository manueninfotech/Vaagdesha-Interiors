import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import portfoliobg from "../assets/portfolio/portfolio-bg.png";
import luxuryBg from "../assets/luxuryBg.png"
import textureBg from "../assets/texturebg.png"
import serviceBg from "../assets/serviceBg.png"
import ctaBg from "../assets/ctaBg.png"
import luxuryvilla from "../assets/luxury-villa.png"

import atelier1 from "../assets/atelier1.jpg";
import atelier2 from "../assets/atelier2.jpg";

import portfolio1 from "../assets/portfolio/portfolio1.png"
import portfolio2 from "../assets/portfolio/portfolio2.jpg"
import portfolio4 from "../assets/portfolio/portfolio4.jpg"
import portfolio3 from "../assets/portfolio/portfolio3.png"
import portfolio5 from "../assets/portfolio/portfolio5.jpg"
import portfolio6 from "../assets/portfolio/portfolio6.jpg"
import portfolio7 from "../assets/portfolio/portfolio7.jpg"
import portfolio8 from "../assets/portfolio/portfolio8.jpg"
import portfolio9 from "../assets/portfolio/portfolio9.jpg"
import portfolio10 from "../assets/portfolio/portfolio10.jpg"
import portfolio11 from "../assets/portfolio/portfolio11.jpg"
import portfolio12 from "../assets/portfolio/portfolio12.jpg"

import service01 from "../assets/services/service01.jpg"
import service02 from "../assets/services/service02.jpg"
import service03 from "../assets/services/service03.jpg"
import service04 from "../assets/services/service04.jpg"

import client from "../assets/client.png"
import client2 from "../assets/client2.png"
import { useEffect, useRef, useState } from "react"
import Counter from "../components/Counter";
import PageWrapper from "../components/PageWrapper";
import { Compass, Sofa, Pencil, ArrowLeft, ArrowRight } from "lucide-react";
import {
  PencilRuler, ChevronLeft, ChevronRight,
  Gem,
  Eye,
  Layers,
  Sparkles,
  Users
} from "lucide-react";


export default function Home() {

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  const [current, setCurrent] = useState(0);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, 7000);

  return () => clearInterval(interval);
}, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // ⏱ slow = luxury

    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentService((prev) => (prev + 1) % services.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  // 👇 Parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 1000) {
            setOffset(window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const extendedPortfolio = [
    {
      img: portfolio1,
      title: "The Celestial Villa",
      subtitle: "MODERN HERITAGE · HYDERABAD",
    },
    {
      img: portfolio2,
      title: "Ethenic Living",
      subtitle: "LUXURY · HYDERABAD",
    },
    {
      img: portfolio4,
      title: "Amber Residences",
      subtitle: "MINIMALIST LUXURY · BANGALORE",
    },
    {
      img: portfolio3,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio5,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio6,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio7,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio8,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio9,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio10,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio11,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },
    {
      img: portfolio12,
      title: "Opaline Studio",
      subtitle: "ART DECO REVIVAL · MUMBAI",
    },

  ];

  const services = [
    {
      title: "Architectural Design",
      desc: "Structural integrity meeting aesthetic perfection in every foundation.",
      image: service01,
    },
    {
      title: "Interior Styling",
      desc: "The art of choosing textures, colors, and furniture that speak to you.",
      image: service02,
    },
    {
      title: "Custom Furniture",
      desc: "Bespoke pieces crafted by master artisans to fit your space exactly.",
      image: service03,
    },
    {
      title: "Turnkey Solutions",
      desc: "Stress-free project management from concept to final reveal.",
      image: service04,
    },
  ];

  const testimonials = [
    {
      text: "Vaagdeesha Interiors transformed our ancestral home into a modern masterpiece without losing its soul. Their attention to detail is unparalleled.",
      name: "ADITI SHARMA",
      role: "RESIDENTIAL CLIENT, HYDERABAD",
      image: client,
    },
    {
      text: "The team understood our vision instantly. Every corner reflects elegance and intention. Truly a seamless experience.",
      name: "RAHUL MEHTA",
      role: "VILLA OWNER, BANGALORE",
      image: client2,
    },
    {
      text: "From concept to execution, everything was handled with precision. The result exceeded expectations.",
      name: "NEHA REDDY",
      role: "APARTMENT OWNER, HYDERABAD",
      image: client,
    },
  ];

  return (
    
      <>
      <SEO
  title="Vaagdesha Interiors | Luxury Residential & Commercial Interior Design"
  description="Vaagdesha Interiors specializes in luxury residential and commercial interior design, creating elegant and timeless spaces with exceptional craftsmanship."
  keywords="Vaagdesha Interiors, Interior Designers, Luxury Interiors, Residential Interiors, Commercial Interiors"
/>
  
        <Navbar />
        <Hero />

        {/* Atelier version 1 */}
        {false && (
          <section className="relative bg-[#2D2D2D] py-16 md:py-24 px-4 sm:px-6 md:px-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24
            bg-gradient-to-b
            from-black/25
            to-transparent
            pointer-events-none"
            />

            <div className="absolute inset-0
            backdrop-blur-[2px]
            bg-white/[0.015]" />

            <div className="absolute top-[-120px] left-[30%]
            w-[500px] h-[500px]
            bg-white/[0.03]
            blur-[160px]
            rounded-full" />

            <div className="absolute bottom-[-100px] right-[10%]
            w-[350px] h-[350px]
            bg-[#F8F5F2]/[0.025]
            blur-[140px]
            rounded-full" />

            {/* CONTENT */}
            <Reveal className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

              {/* LEFT CONTENT */}
              <div className="space-y-6 text-center md:text-left">

                {/* LABEL */}
                <p className="text-xs tracking-[0.38em] text-[#C89B3C] uppercase">
                  The Atelier
                </p>

                {/* HEADING */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant 
                    font-medium text-[#F8F5F2] leading-[1.05] tracking-[0.01em]">

                  Quiet Luxury,
                  <br />
                  Loud Heritage.

                </h2>

                {/* GOLD DIVIDER */}
                <div className="w-20 h-[1px] bg-[#C89B3C]/40 mx-auto md:mx-0" />

                {/* DESCRIPTION */}
                <div className="text-[#D6D0CB] max-w-xl mx-auto md:mx-0 
                     text-sm sm:text-base leading-relaxed space-y-4">

                  <p>
                    At Vaagdeesha, luxury is not defined by excess,
                    but by intention.
                  </p>

                  <p>
                    We create interiors that feel deeply personal —
                    spaces where textures, proportions, and light
                    exist in perfect harmony.
                  </p>

                  <p>
                    Blending timeless craftsmanship with contemporary
                    sensibilities, every design is curated to evoke
                    warmth, elegance, and enduring sophistication.
                  </p>

                </div>

                {/* SIGNATURE */}
                <p className="text-sm italic text-[#C89B3C]/80 pt-2">
                  — Designed with purpose. Crafted with precision.
                </p>

              </div>


              {/* RIGHT IMAGES */}
              <div className="relative flex justify-center items-center">


                {/* MAIN IMAGE */}
                <div className="relative z-10 w-[72%] 
                overflow-hidden border border-[#C89B3C]/15
                shadow-[0_25px_70px_rgba(0,0,0,0.45)]">

                  <img
                    src={atelier1}
                    alt=""
                    className="w-full h-[440px] object-cover "
                  />
                </div>

                {/* FLOATING IMAGE */}
                <div className="absolute -bottom-10 -left-2 z-20
                w-[220px] h-[260px] overflow-hidden
                border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

                  <img
                    src={atelier2}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

            </Reveal>

          </section>
        )}
        
          {/* Atelier version 2 */}

      <section
        className="
    relative
    bg-[#070707]

    py-20 sm:py-24 md:py-24

    px-4 sm:px-6 md:px-20

    overflow-hidden
  "
      >

        {/* OVERLAYS */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-br
      from-[#0B0B0B]/75
      via-[#0B0B0B]/45
      to-[#050505]/80
    "
        />

        {/* GLASS REFLECTION */}
        <div
          className="
      absolute inset-0
      bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_30%)]
      pointer-events-none
    "
        />

        {/* GOLD LINE */}
        <div
          className="
      absolute top-0 left-0
      w-full h-[1px]

      bg-gradient-to-r
      from-transparent
      via-[#C89B3C]/40
      to-transparent
    "
        />

        {/* TEXTURE */}
        <div className="absolute inset-0 opacity-[0.025]">
          <img
            src={luxuryBg}
            alt=""
            className="
        w-full h-full
        object-cover
        scale-110
        blur-[3px]
        brightness-[0.38]
        saturate-[0.8]
      "
          />
        </div>

        {/* CINEMATIC FADE */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-b
      from-[#1E1A18]/40
      via-transparent
      to-[#120F0D]/70
    "
        />

        <div
          className="
      absolute inset-0
      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_60%)]
    "
        />

        {/* CONTENT */}
        <Reveal
          className="
      relative z-10

      grid
      md:grid-cols-2

      gap-16 md:gap-20

      items-center
    "
        >

          {/* LEFT CONTENT */}
          <div
            className="
        relative

        space-y-6 sm:space-y-8

        text-center md:text-left

        bg-white/[0.025]
        backdrop-blur-xl

        border border-white/[0.06]

        px-5 sm:px-8 md:px-10
        py-8 sm:py-10 md:py-12

        shadow-[0_25px_80px_rgba(0,0,0,0.32)]

        overflow-hidden
      "
          >

            {/* LABEL */}
            <p
              className="
          text-[10px] sm:text-xs
          tracking-[0.34em] sm:tracking-[0.38em]
          text-[#B08A4A]
          uppercase
        "
            >
              The Atelier
            </p>

            {/* HEADING */}
            <h2
              className="
          text-[42px]
          sm:text-5xl
          md:text-6xl

          font-cormorant
          font-light

          text-[#F1E7DA]

          leading-[0.95]
          tracking-[-0.03em]
        "
            >
              Quiet Luxury,
              <br />
              Loud Heritage.
            </h2>

            {/* DIVIDER */}
            <div
              className="
          w-16 sm:w-20
          h-[1px]
          bg-[#C89B3C]/25

          mx-auto md:mx-0
        "
            />

            {/* DESCRIPTION */}
            <div
              className="
          text-[#9F9488]

          text-[14px]
          sm:text-base

          leading-[1.9]

          space-y-4

          max-w-xl
          mx-auto md:mx-0
        "
            >

              <p>
                At Vaagdeesha, luxury is not defined by excess,
                but by intention.
              </p>

              <p>
                We create interiors that feel deeply personal —
                spaces where textures, proportions, and light
                exist in perfect harmony.
              </p>

              <p>
                Blending timeless craftsmanship with contemporary
                sensibilities, every design is curated to evoke
                warmth, elegance, and enduring sophistication.
              </p>

            </div>

            {/* SIGNATURE */}
            <p
              className="
          text-xs sm:text-sm
          italic
          text-[#C89B3C]/80
          pt-2
        "
            >
              — Designed with purpose. Crafted with precision.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
        relative
        flex
        justify-center
        items-center

        mt-4 md:mt-0
      "
          >

            {/* GLOW */}
            <div
              className="
          absolute

          right-0 md:right-10

          w-[260px] sm:w-[360px] md:w-[420px]
          h-[260px] sm:h-[360px] md:h-[420px]

          bg-[#C89B3C]/[0.05]

          blur-[100px] md:blur-[120px]
          rounded-full
        "
            />

            {/* MAIN IMAGE */}
            <div
              className="
          relative z-10

          w-[88%] sm:w-[78%] md:w-[72%]

          overflow-hidden

          border border-[#C89B3C]/15

          shadow-[0_25px_70px_rgba(0,0,0,0.45)]
        "
            >

              <img
                src={atelier1}
                alt=""

                className="
            w-full

            h-[360px]
            sm:h-[440px]
            md:h-[500px]

            object-cover

            scale-[1.02]

            brightness-[0.92]
            contrast-[1.04]
            saturate-[0.88]

            transition duration-700
          "
              />

            </div>

            {/* IMAGE OVERLAY */}
            <div
              className="
          absolute inset-0
          bg-gradient-to-t
          from-black/20
          to-transparent
        "
            />

            {/* FLOATING IMAGE */}
            <div
              className="
          absolute

          -bottom-10 sm:-bottom-12 md:-bottom-16
          left-0 sm:left-2 md:-left-2

          z-20

          w-[120px]
          sm:w-[160px]
          md:w-[200px]

          h-[150px]
          sm:h-[200px]
          md:h-[240px]

          overflow-hidden

          border border-white/10

          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        "
            >

              <img
                src={atelier2}
                alt=""

                className="
            w-full h-full
            object-cover

            opacity-[0.92]
            scale-[0.98]
          "
              />

            </div>

          </div>

        </Reveal>

      </section>
        

        
        {/* Atelier version 3 */}
        {false && (
        <section className="relative bg-[#0F0F10] py-16 md:py-24 px-4 sm:px-6 md:px-20 overflow-hidden">

          {/* TOP FADE */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#0F0F10]/70 to-[#0F0F10] z-[1]" />

          <div className="absolute top-[20%] left-[35%]
          w-[500px] h-[500px]
          bg-[#B08D57]/[0.04]
          blur-[160px] rounded-full"
          />

          <div className="absolute inset-0 bg-[#0F0F10]/90" />

          <div className="absolute top-[-120px] left-[30%]
          w-[500px] h-[500px]
          bg-[#B08D57]/[0.04]
          blur-[160px]
          rounded-full" />

          <div className="absolute bottom-[-100px] right-[10%]
          w-[350px] h-[350px]
          bg-[#B08D57]/[0.05]
          blur-[140px]
          rounded-full" />

          {/* CONTENT */}
          <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-6 text-center md:text-left">

              {/* LABEL */}
              <p className="text-xs tracking-[0.38em] text-[#B08D57] uppercase">
                The Atelier
              </p>

              {/* HEADING */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant 
                  font-light text-[#F5F1EA] leading-[1.05] tracking-[0.01em]">

                Quiet Luxury,
                <br />
                Loud Heritage.

              </h2>

              {/* GOLD DIVIDER */}
              <div className="w-20 h-[1px] bg-[#B08D57]/40 mx-auto md:mx-0" />

              {/* DESCRIPTION */}
              <div className="text-[#A8A29E] max-w-xl mx-auto md:mx-0 
                   text-sm sm:text-base leading-relaxed space-y-4">

                <p>
                  At Vaagdeesha, luxury is not defined by excess,
                  but by intention.
                </p>

                <p>
                  We create interiors that feel deeply personal —
                  spaces where textures, proportions, and light
                  exist in perfect harmony.
                </p>

                <p>
                  Blending timeless craftsmanship with contemporary
                  sensibilities, every design is curated to evoke
                  warmth, elegance, and enduring sophistication.
                </p>

              </div>

              {/* SIGNATURE */}
              <p className="text-sm italic text-[#B08D57]/80 pt-2">
                — Designed with purpose. Crafted with precision.
              </p>

            </div>


            {/* RIGHT IMAGES */}
            <div className="relative flex justify-center items-center">


              {/* MAIN IMAGE */}
              <div className="relative z-10 w-[72%] 
              overflow-hidden
              border border-[#B08D57]/20
              shadow-[0_25px_70px_rgba(0,0,0,0.45)]">

                <img
                  src={atelier1}
                  alt=""
                  className="w-full h-[440px] object-cover "
                />
              </div>

              {/* FLOATING IMAGE */}
              <div className="absolute -bottom-10 -left-10 z-20
              w-[220px] h-[260px]
              overflow-hidden
              border border-white/10
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

                <img
                  src={atelier2}
                  alt=""
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>


        </section>
        )}

        {/* why choose us version 1*/}
        {false && (
        <section
          ref={sectionRef}
          className="relative overflow-hidden py-28 md:py-36 px-6 bg-[#262626]">

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 opacity-[0.20]">
            <img
              src={luxuryBg}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r 
from-[#262626]/45 
via-[#262626]/78 
to-[#262626]/95" />

          {/* SOFT ATMOSPHERIC GLOW */}
          <div className="absolute top-[-120px] right-[-100px]
    w-[500px] h-[500px]
    bg-white/[0.03]
    blur-[160px]
    rounded-full" />

          {/* HUGE FADED BACKGROUND TEXT */}
          <div className="absolute inset-0 flex items-center justify-center
    pointer-events-none select-none overflow-hidden">

            <h1
              className={`
    text-[100px] md:text-[200px]
    font-cormorant
    text-white/[0.015]
    tracking-tight leading-none whitespace-nowrap
    transition-all duration-[2200ms]
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[120px] opacity-0"
                }
  `}
            >
              VAAGDESHA
            </h1>

          </div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto">

            <div className="grid md:grid-cols-2 gap-20 items-start">

              {/* LEFT SIDE */}
              <div>

                {/* LABEL */}
                <p className="text-xs tracking-[0.4em]
          text-[#B8B1AA]
          uppercase mb-6">

                  Why Choose Us

                </p>

                {/* HEADING */}
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl
          font-cormorant
          text-[#F8F5F2]
          font-medium
          leading-[1.05]
          tracking-tracking-[0.01em] mb-8"
                >
                  Designed Around
                  <br />
                  How You Want
                  <br />
                  To Feel.
                </h2>

                {/* GOLD DIVIDER */}
                <div className="w-20 h-[1px] bg-[#C89B3C]/40 mx-auto md:mx-0" />

                {/* PARAGRAPH */}
                <p
                  className="text-[#BEB7B0]
          text-base md:text-lg
          leading-relaxed
          max-w-xl"
                >
                  At Vaagdeesha, every interior is shaped with intention —
                  balancing atmosphere, proportion, materiality, and emotion
                  to create spaces that feel timeless, personal, and quietly luxurious.
                </p>

                <div className="
  mt-14
  max-w-[440px]
  border border-[#C89B3C]/20
  bg-[#F3E9DC]/8
  backdrop-blur-md
  p-8
  relative
  overflow-hidden
">

                  {/* SOFT GLOW */}
                  <div className="
    absolute inset-0
    bg-gradient-to-br
    from-white/[0.04]
    to-transparent
    pointer-events-none
  "></div>

                  {/* GOLD LINE */}
                  <div className="w-14 h-[1px] bg-[#C89B3C]/70 mb-8"></div>

                  {/* QUOTE */}
                  <p className="
    text-[#F3E9DC]
    font-serif
    italic
    text-3xl md:text-[34px]
    leading-[1.4]
    tracking-tight
  ">
                    “Luxury is the quiet balance
                    between emotion and restraint.”
                  </p>

                  {/* LABEL */}
                  <p className="
    mt-8
    text-[11px]
    tracking-[0.35em]
    uppercase
    text-[#B8B1AA]
  ">
                    Vaagdeesha Philosophy
                  </p>

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-14 md:pt-8">

                {[
                  {
                    number: "01",
                    title: "Tailored Spatial Identity",
                    desc: "Every design is crafted around your lifestyle, routines, and emotional connection to space.",
                  },
                  {
                    number: "02",
                    title: "Refined Material Palette",
                    desc: "We curate textures, finishes, and materials that create warmth, depth, and lasting elegance.",
                  },
                  {
                    number: "03",
                    title: "Quiet Attention To Detail",
                    desc: "From lighting balance to architectural alignment, every detail is thoughtfully considered.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group border-b border-[#C89B3C]/[0.15] pb-10"
                  >

                    {/* NUMBER */}
                    <p
                      className="text-[#8A8178]
              text-sm tracking-[0.3em]
              mb-4"
                    >
                      {item.number}
                    </p>

                    {/* TITLE */}
                    <h3
                      className="text-[#F3E9DC] font-serif
              text-2xl md:text-3xl
              font-cormorant
              mb-4
              transition-all duration-500
              group-hover:translate-x-2"
                    >
                      {item.title}
                    </h3>

                    {/* DESC */}
                    <p
                      className="text-[#BEB7B0]
              leading-relaxed
              max-w-lg"
                    >
                      {item.desc}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
          {/* SECTION BLEND */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#151311] pointer-events-none z-20"></div>

        </section>
        )}

        
        {/* why choose us version 2*/}
      <section
        ref={sectionRef}
        className="
    relative overflow-hidden

    py-20 sm:py-24 md:py-36

    px-4 sm:px-6 md:px-6

    bg-[#0F0F10]
  "
      >

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 opacity-[0.20]">
          <img
            src={luxuryBg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* SOFT ATMOSPHERIC GLOW */}
        <div
          className="
      absolute

      top-[-120px]
      right-[-120px]

      w-[300px]
      sm:w-[420px]
      md:w-[500px]

      h-[300px]
      sm:h-[420px]
      md:h-[500px]

      bg-white/[0.03]

      blur-[120px]
      md:blur-[160px]

      rounded-full
    "
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto">

          <div
            className="
        grid
        md:grid-cols-2

        gap-14 sm:gap-16 md:gap-20

        items-start
      "
          >

            {/* LEFT SIDE */}
            <div>

              {/* LABEL */}
              <p
                className="
            text-[10px]
            sm:text-xs

            tracking-[0.34em]
            sm:tracking-[0.4em]

            text-[#B08D57]
            uppercase

            mb-5 sm:mb-6
          "
              >
                Why Choose Us
              </p>

              {/* HEADING */}
              <h2
                className="
            text-[42px]
            sm:text-5xl
            md:text-5xl

            font-cormorant
            font-medium

            text-[#F5F1EA]

            leading-[1]
            tracking-[0.01em]

            mb-6 sm:mb-8
          "
              >
                Designed Around
                <br />
                How You Want
                <br />
                To Feel.
              </h2>

              {/* GOLD DIVIDER */}
              <div
                className="
            w-16 sm:w-20
            h-[1px]

            bg-[#B08D57]/40

            mx-0
          "
              />

              {/* PARAGRAPH */}
              <p
                className="
            mt-6

            text-[#A8A29E]

            text-[15px]
            sm:text-base
            md:text-lg

            leading-[1.9]

            max-w-xl
          "
              >
                Spaces designed to feel calm, timeless,
                and deeply personal.
              </p>

              {/* QUOTE BOX */}
              <div
                className="
            mt-10 sm:mt-14

            w-full
            max-w-[440px]

            border border-[#B08D57]/20

            bg-[#1A1A1C]/80
            backdrop-blur-md

            p-6 sm:p-8

            relative overflow-hidden
          "
              >

                {/* SOFT GLOW */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-br
              from-white/[0.04]
              to-transparent
              pointer-events-none
            "
                />

                {/* GOLD LINE */}
                <div
                  className="
              w-12 sm:w-14
              h-[1px]
              bg-[#B08D57]/70
              mb-6 sm:mb-8
            "
                />

                {/* QUOTE */}
                <p
                  className="
              text-[#F5F1EA]

              font-serif
              italic

              text-[24px]
              sm:text-[30px]
              md:text-[28px]

              leading-[1.35]
              tracking-tight
            "
                >
                  “Luxury is the quiet balance
                  between emotion and restraint.”
                </p>

                {/* LABEL */}
                <p
                  className="
              mt-6 sm:mt-8

              text-[10px]
              sm:text-[11px]

              tracking-[0.3em]
              sm:tracking-[0.35em]

              uppercase

              text-[#A8A29E]
            "
                >
                  Vaagdeesha Philosophy
                </p>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="
          space-y-10 sm:space-y-12 md:space-y-14

          md:pt-8
        "
            >

              {[
                {
                  number: "01",
                  title: "Spaces That Hold Emotion",
                  desc: "Designed around how you want to feel.",
                },
                {
                  number: "02",
                  title: "Materiality With Depth",
                  desc: "Warm textures layered with restraint.",
                },
                {
                  number: "03",
                  title: "Luxury In Restraint",
                  desc: "Quiet sophistication in every detail.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
              group

              border-b border-[#C89B3C]/[0.15]

              pb-8 sm:pb-10
            "
                >

                  {/* NUMBER */}
                  <p
                    className="
                text-[#8A8178]

                text-xs sm:text-sm

                tracking-[0.28em]
                sm:tracking-[0.3em]

                mb-3 sm:mb-4
              "
                  >
                    {item.number}
                  </p>

                  {/* TITLE */}
                  <h3
                    className="
                text-[#F5F1EA]

                text-[28px]
                sm:text-[34px]
                md:text-3xl

                font-cormorant

                mb-3 sm:mb-4

                transition-all duration-500
                group-hover:translate-x-2
              "
                  >
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
                text-[#A8A29E]

                text-[15px]
                sm:text-base

                leading-[1.9]

                max-w-lg
              "
                  >
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* SECTION BLEND */}
        <div
          className="
      absolute bottom-0 left-0

      w-full

      h-24 sm:h-32 md:h-40

      bg-gradient-to-b
      from-transparent
      to-[#151311]

      pointer-events-none
      z-20
    "
        />

      </section>

        {/*Portfolio SECTION version 1 */}
        {false && (
        <section className="relative overflow-hidden bg-[#47484c] py-16 md:py-24 px-4 sm:px-6 ">

          {/* TOP BLEND */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#2A2927] to-transparent z-0"></div>

          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 "
            style={{
  backgroundImage: `url(${portfoliobg})`,
}}
          ></div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="relative z-30">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16 max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F3E9DC] drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]">
                Portfolio Highlights
              </h2>

              <Link to="/portfolio" className="text-xs md:text-sm tracking-[0.2em] text-[#C89B3C]">
                EXPLORE ALL WORKS →

                {/* UNDERLINE */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#C89B3C]
                transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* GRID */}
            {/* GRID / SCROLL */}
            <div className="max-w-6xl mx-auto">

              {/* MOBILE → Horizontal Scroll */}
              <div className="flex gap-6 overflow-x-auto pb-4 md:hidden scroll-smooth snap-x snap-mandatory">

                {extendedPortfolio.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[75%] sm:min-w-[60%] snap-start group cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden rounded-xl">

                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-[300px] object-cover 
                        transition-all duration-700 ease-out 
                        group-hover:scale-110 group-hover:brightness-95"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                    </div>

                    {/* TEXT */}
                    <div className="mt-4">
                      <h3 className="text-[#F5F1EA] font-cormorant text-lg">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#B08D57] tracking-[0.15em] mt-1 uppercase">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP → Grid */}
              <div className="hidden md:flex gap-6 relative max-w-6xl mx-auto">

                {/* LEFT ARROW */}
                <button
                  onClick={() => scrollRef.current.scrollBy({ left: -400, behavior: "smooth" })}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                  w-12 h-12 rounded-full bg-white shadow-md 
                  border border-[#C89B3C] flex items-center justify-center
                  hover:bg-[#C89B3C] transition"
                >
                  <ArrowLeft className="w-5 h-5 text-[#5A0F14] group-hover:text-white" />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={() => scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
                  w-12 h-12 rounded-full bg-white shadow-md 
                  border border-[#C89B3C] flex items-center justify-center
                  hover:bg-[#C89B3C] transition"
                >
                  <ArrowRight className="w-5 h-5 text-[#5A0F14] group-hover:text-white" />
                </button>

                {/* SCROLL CONTAINER */}
                <div
                  ref={scrollRef}
                  className="hidden md:flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
                >

                  {extendedPortfolio.map((item, index) => (
                    <div
                      key={index}
                      className="min-w-[80%] sm:min-w-[55%] md:min-w-[32%] lg:min-w-[28%] flex-shrink-0 group cursor-pointer"
                    >

                      {/* IMAGE */}
                      <div className="relative overflow-hidden rounded-xl w-full aspect-[3/3]">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover 
                          transition-all duration-700 ease-out 
                          group-hover:scale-110 group-hover:brightness-95"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                      </div>

                      {/* TEXT */}
                      <div className="mt-4">
                        <h3 className="text-[#F5F1EA] font-cormorant text-base md:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#B08D57] tracking-[0.15em] mt-1 uppercase">
                          {item.subtitle}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32
          bg-gradient-to-b from-transparent to-[#151311]
          pointer-events-none z-20"
          />
        </section>
        )}

        {/*Portfolio SECTION version 2 */}
        <section className="relative overflow-hidden bg-[#0F0F10] py-16 md:py-24 px-4 sm:px-6 ">

          {/* TOP BLEND */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#2A2927] to-transparent z-0"></div>

          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 "
            style={{
  backgroundImage: `url(${portfoliobg})`,
}}
          ></div>

          {/* DARK OVERLAY */}
          

          <div className="relative z-30">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16 max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F5F1EA] drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]">
                Portfolio Highlights
              </h2>

              <Link to="/portfolio" className="text-xs md:text-sm tracking-[0.2em] text-[#B08D57]">
                EXPLORE ALL WORKS →

                {/* UNDERLINE */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B08D57]
                transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* GRID */}
            {/* GRID / SCROLL */}
            <div className="max-w-6xl mx-auto">

              {/* MOBILE → Horizontal Scroll */}
              <div className="flex gap-6 overflow-x-auto pb-4 md:hidden scroll-smooth snap-x snap-mandatory">

                {extendedPortfolio.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[75%] sm:min-w-[60%] snap-start group cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden rounded-xl">

                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-[300px] object-cover 
                        transition-all duration-700 ease-out 
                        group-hover:scale-110 group-hover:brightness-95"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                    </div>

                    {/* TEXT */}
                    <div className="mt-4">
                      <h3 className="text-[#F5F1EA] font-cormorant text-lg">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#B08D57] tracking-[0.15em] mt-1 uppercase">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP → Grid */}
              <div className="hidden md:flex gap-6 relative max-w-6xl mx-auto">

                {/* LEFT ARROW */}
                <button
                  onClick={() => scrollRef.current.scrollBy({ left: -400, behavior: "smooth" })}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                  w-12 h-12 rounded-full bg-white shadow-md 
                  border border-[#C89B3C] flex items-center justify-center
                  hover:bg-[#C89B3C] transition"
                >
                  <ArrowLeft className="w-5 h-5 text-[#5A0F14] group-hover:text-white" />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={() => scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
                  w-12 h-12 rounded-full bg-white shadow-md 
                  border border-[#C89B3C] flex items-center justify-center
                  hover:bg-[#C89B3C] transition"
                >
                  <ArrowRight className="w-5 h-5 text-[#5A0F14] group-hover:text-white" />
                </button>

                {/* SCROLL CONTAINER */}
                <div
                  ref={scrollRef}
                  className="hidden md:flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
                >

                  {extendedPortfolio.map((item, index) => (
                    <div
                      key={index}
                      className="min-w-[80%] sm:min-w-[55%] md:min-w-[32%] lg:min-w-[28%] flex-shrink-0 group cursor-pointer"
                    >

                      {/* IMAGE */}
                      <div className="relative overflow-hidden rounded-xl w-full aspect-[3/3]">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover 
                          transition-all duration-700 ease-out 
                          group-hover:scale-110 group-hover:brightness-95"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                      </div>

                      {/* TEXT */}
                      <div className="mt-4">
                        <h3 className="text-[#F5F1EA] font-cormorant text-base md:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#B08D57] tracking-[0.15em] mt-1 uppercase">
                          {item.subtitle}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32
          bg-gradient-to-b from-transparent to-[#151311]
          pointer-events-none z-20"
          />
        </section>

        {/*Service SECTION version 1 */}
        {false && (
        <section
          id="services"
          className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 text-center"
        >

          <div
            className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#151311]
            via-[#151311]/70 to-transparent pointer-events-none z-[2]"
          />

          <div className="absolute top-0 left-0 w-full h-40 
          bg-gradient-to-b from-[#151311] to-transparent z-[1]" />

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <img
              src={serviceBg}
              alt=""
              className="w-full h-full object-cover scale-110  brightness-[0.28] contrast-110"
            />
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-[#262626]/35" />

          {/* GOLD ATMOSPHERIC GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,155,60,0.10),transparent_60%)]" />

          {/* CONTENT */}
          <div className="relative z-10">

            {/* HEADING */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3E9DC] mb-6">
              Signature Services
            </h2>

            <p className="max-w-2xl mx-auto text-[#BEB7B0] mb-12 md:mb-16 text-sm md:text-base">
              From initial blueprint to final styling, we offer an end-to-end luxury experience tailored to your unique lifestyle.
            </p>

            {/* GRID */}
            {/* TABLET SHOWCASE */}
            <div className="relative max-w-5xl mx-auto flex justify-center items-center 
">

              {/* GLOW */}
              <div className="absolute w-[70%] h-[70%] bg-[#C89B3C]/10 blur-[120px] rounded-full" />

              {/* TABLET FRAME */}
              <div className="relative z-10 w-full max-w-4xl aspect-[16/10]
              bg-[#111111]/70 
              
              border border-[#C89B3C]/20
              ring-1 ring-white/10
              rounded-[40px]
              
              shadow-[0_30px_120px_rgba(0,0,0,0.65)]
              shadow-[#C89B3C]/10
              
              overflow-hidden
              backdrop-blur-[2px]
              transition-all duration-700
              ">

                <div className="absolute inset-0 rounded-[40px] border border-[#C89B3C]/15
                shadow-[0_0_50px_rgba(200,155,60,0.12)] pointer-events-none z-20"/>

                {/* TOP CAMERA */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-2 rounded-full bg-white/10 z-20"></div>

                {/* SERVICE IMAGE */}
                <div className="absolute inset-0">
                  <img
                    src={services[currentService].image}
                    alt=""
                    className="w-full h-full object-cover 
                    brightness-[1.05] contrast-[1.08] saturate-[1.1]
                    opacity-95 scale-[1.02]
                    transition-all duration-700"
                  />
                </div>

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10
                to-transparent" />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-end text-left
                p-8 md:p-14">

                  {/* NUMBER */}
                  <p className="text-[#C89B3C] tracking-[0.3em] text-xs mb-4">
                    0{currentService + 1}
                  </p>

                  {/* TITLE */}
                  <h3 className="text-3xl md:text-5xl font-serif text-[#F3E9DC] mb-5">
                    {services[currentService].title}
                  </h3>

                  {/* DESC */}
                  <p className="max-w-xl text-[#D6D0CA] leading-relaxed 
                  text-sm md:text-base">
                    {services[currentService].desc}
                  </p>

                  {/* CONTROLS */}
                  <div className="flex items-center justify-between mt-10">

                    {/* DOTS */}
                    <div className="flex gap-3">
                      {services.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentService(index)}
                          className={`
                            h-[4px] rounded-full transition-all duration-500
                            ${currentService === index
                              ? "w-10 bg-[#C89B3C]"
                              : "w-4 bg-white/30"}
                            `}
                        />
                      ))}
                    </div>

                    {/* ARROWS */}
                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          setCurrentService(
                            (prev) =>
                              (prev - 1 + services.length) % services.length
                          )
                        }
                        className="w-11 h-11 rounded-full border border-white/10 bg-white/5
                        text-white hover:bg-[#C89B3C] transition-all duration-300"
                      >
                        ←
                      </button>

                      <button
                        onClick={() =>
                          setCurrentService(
                            (prev) => (prev + 1) % services.length
                          )
                        }
                        className="w-11 h-11 rounded-full border border-white/10
                        bg-white/5 text-white hover:bg-[#C89B3C] transition-all duration-300"
                      >
                        →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>
        )}

        {/*Service SECTION version 2 */}
      <section
        id="services"
        className="
    relative overflow-hidden

    pt-12 sm:pt-14 md:pt-12
    pb-20 sm:pb-24 md:pb-24

    px-4 sm:px-6

    text-center
  "
      >

        {/* TOP BLEND */}
        <div
          className="
      absolute top-0 left-0
      w-full

      h-24 sm:h-32 md:h-40

      bg-gradient-to-b
      from-[#0F0F10]
      via-[#151311]/70
      to-transparent

      pointer-events-none
      z-[2]
    "
        />

        <div
          className="
      absolute top-0 left-0
      w-full

      h-24 sm:h-32 md:h-40

      bg-gradient-to-b
      from-[#0F0F10]
      to-transparent

      z-[1]
    "
        />

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src={serviceBg}
            alt=""
            className="
        w-full h-full
        object-cover

        scale-110

        brightness-[0.28]
        contrast-110
      "
          />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#262626]/35" />

        {/* GOLD GLOW */}
        <div
          className="
      absolute inset-0
      bg-[radial-gradient(circle_at_top,rgba(200,155,60,0.10),transparent_60%)]
    "
        />

        {/* CONTENT */}
        <div className="relative z-10">

          {/* HEADING */}
          <h2
            className="
        text-[36px]
        sm:text-4xl
        md:text-5xl

        font-serif
        text-[#F5F1EA]

        mb-5 sm:mb-6
      "
          >
            Signature Services
          </h2>

          {/* SUBTEXT */}
          <p
            className="
        max-w-2xl
        mx-auto

        text-[#A8A29E]

        mb-10 sm:mb-12 md:mb-16

        text-[14px]
        sm:text-sm
        md:text-base

        leading-[1.9]

        px-2
      "
          >
            From initial blueprint to final styling,
            we offer an end-to-end luxury experience
            tailored to your unique lifestyle.
          </p>

          {/* SHOWCASE */}
          <div
            className="
        relative

        max-w-5xl
        mx-auto

        flex justify-center items-center
      "
          >

            {/* GLOW */}
            <div
              className="
          absolute

          w-[80%]
          h-[80%]

          bg-[#B08D57]/10

          blur-[90px]
          sm:blur-[120px]

          rounded-full
        "
            />

            {/* TABLET FRAME */}
            <div
              className="
          relative z-10

          w-full

          aspect-[16/11]
          sm:aspect-[16/10]

          bg-[#111111]/70

          border border-[#C89B3C]/20
          ring-1 ring-white/10

          rounded-[24px]
          sm:rounded-[32px]
          md:rounded-[40px]

          shadow-[0_30px_120px_rgba(0,0,0,0.65)]
          shadow-[#C89B3C]/10

          overflow-hidden

          backdrop-blur-[2px]

          transition-all duration-700
        "
            >

              {/* INNER BORDER */}
              <div
                className="
            absolute inset-0

            rounded-[24px]
            sm:rounded-[32px]
            md:rounded-[40px]

            border border-[#C89B3C]/15

            shadow-[0_0_50px_rgba(200,155,60,0.12)]

            pointer-events-none
            z-20
          "
              />

              {/* CAMERA */}
              <div
                className="
            absolute

            top-3 sm:top-4

            left-1/2
            -translate-x-1/2

            w-14 sm:w-20
            h-[5px] sm:h-2

            rounded-full

            bg-white/40

            z-20
          "
              />

              {/* IMAGE */}
              <div className="absolute inset-0">

                <img
                  src={services[currentService].image}
                  alt=""

                  className="
              w-full h-full

              object-cover

              brightness-[1.05]
              contrast-[1.08]
              saturate-[1.1]

              opacity-95
              scale-[1.02]

              transition-opacity
              duration-1000
              ease-out
            "
                />

              </div>

              {/* OVERLAY */}
              <div
                className="
            absolute inset-0

            bg-gradient-to-t
            from-black/80
            via-black/15
            to-transparent
          "
              />

              {/* CONTENT */}
              <div
                key={currentService}
                className="
            relative z-10

            h-full

            flex flex-col
            justify-end

            text-left

            p-5 sm:p-8 md:p-14

            animate-[fadeIn_0.8s_ease]
          "
              >

                {/* NUMBER */}
                <p
                  className="
              text-[#B08D57]

              tracking-[0.28em]

              text-[10px]
              sm:text-xs

              mb-3 sm:mb-4
            "
                >
                  0{currentService + 1}
                </p>

                {/* TITLE */}
                <h3
                  className="
              text-[28px]
              sm:text-4xl
              md:text-5xl

              font-serif
              text-[#F5F1EA]

              mb-3 sm:mb-5

              leading-[1.05]
            "
                >
                  {services[currentService].title}
                </h3>

                {/* DESC */}
                <p
                  className="
              max-w-xl

              text-[#A8A29E]

              leading-[1.8]

              text-[13px]
              sm:text-sm
              md:text-base
            "
                >
                  {services[currentService].desc}
                </p>

                {/* CONTROLS */}
                <div
                  className="
              flex items-center justify-between

              mt-6 sm:mt-8 md:mt-10
            "
                >

                  {/* DOTS */}
                  <div className="flex gap-2 sm:gap-3">

                    {services.map((_, index) => (

                      <button
                        key={index}
                        onClick={() => setCurrentService(index)}

                        className={`
                    h-[4px]
                    rounded-full
                    transition-all duration-700

                    ${currentService === index
                            ? "w-10 sm:w-12 bg-[#B08D57]"
                            : "w-3 sm:w-4 bg-white/20 hover:bg-white/40"
                          }
                  `}
                      />

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/*Testimonial SECTION */}
      <section
        className="
    relative overflow-hidden

    bg-[#0F0F10]

    py-14 sm:py-16 md:py-20
  "
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={portfoliobg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div
          className="
      relative z-10

      text-center

      mb-16 sm:mb-20 md:mb-28
    "
        >

          {/* LABEL */}
          <p
            className="
        text-[#B08D57]

        uppercase

        tracking-[0.28em]
        sm:tracking-[0.35em]

        text-[10px]
        sm:text-xs

        mb-3 sm:mb-4
      "
          >
            Testimonials
          </p>

          {/* HEADING */}
          <h2
            className="
        text-[#F5F1EA]

        text-[38px]
        sm:text-4xl
        md:text-5xl

        font-cormorant
        font-light

        leading-[1.05]

        px-4
      "
          >
            Words From Our Clients
          </h2>

          {/* MARQUEE */}
          <div
            className="pt-14 max-w-4xl mx-auto px-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              key={current}
              className="relative bg-[#1A1A1C]/70 backdrop-blur-md border border-white/5 rounded-[32px] p-8 md:p-12 transition-all duration-700 animate-fade"
            >
              <p
                className="
                text-[#F5F1EA]
                text-[22px]
                md:text-[26px]
                italic
                font-cormorant
                leading-[1.6]
                text-center
                max-w-4xl
                mx-auto
              "
              >
                “{testimonials[current].text}”
              </p>

              <div className="flex flex-col items-center mt-10">
                <img
                  src={testimonials[current].image}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />

                <h4
                  className="
                  mt-4
                  uppercase
                  tracking-[0.15em]
                  text-[#F5F1EA]
                  text-sm
                "
                >
                  {testimonials[current].name}
                </h4>

                <p className="text-[#A8A29E] text-sm mt-2">
                  {testimonials[current].role}
                </p>
              </div>

              {/* Arrows */}

              <button
                onClick={() =>
                  setCurrent(
                    (current - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-11
                h-11
                rounded-full
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                transition
              "
              >
                <ChevronLeft className="w-5 h-5 text-white mx-auto" />
              </button>

              <button
                onClick={() =>
                  setCurrent(
                    (current + 1) % testimonials.length
                  )
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-11
                h-11
                rounded-full
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                transition
              "
              >
                <ChevronRight className="w-5 h-5 text-white mx-auto" />
              </button>
            </div>

            {/* Dots */}

            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-[#B08D57]"
                      : "w-2.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </section>


        {/*CTA SECTION */}
        <section className="relative overflow-hidden bg-[#0F0F10] py-24 md:py-30 px-3 sm:px-6 text-center">

          {/* TOP SECTION BLEND */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b
          from-[#151311] via-[#151311]/40 to-transparent z-[2]"
          />

          {/* BASE GRADIENT */}
          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 opacity-[0.20]">
            <img
              src={luxuryBg}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* DARK OVERLAY */}
          

          {/* SOFT ATMOSPHERIC GLOW */}
          <div className="absolute top-[-120px] right-[-100px] w-[500px] h-[500px]
          bg-white/[0.03] blur-[160px] rounded-full" />

          <div className="relative z-10 max-w-4xl mx-auto">

            {/* HEADING */}
            <h2
              className={`text-2xl sm:text-3xl md:text-5xl font-serif text-[#F5F1EA] mb-4 md:mb-6 
              transition-all duration-700 tracking-tight drop-shadow-[0_0_30px_rgba(200,155,60,0.15)] `}
            >
              Let’s Design Your Legacy.
            </h2>

            {/* SUBTEXT */}
            <p
              className={`text-[#A8A29E] text-sm md:text-lg mb-8 md:mb-10
               transition-all duration-700 `}
            >
              Begin your journey with the world's most refined interior atelier.
            </p>

            {/* BUTTON */}
            <button onClick={() => navigate("/contact#form")}
              className="
                  bg-[#F5F1EA]
                  text-[#5A0F14]
                  px-8 md:px-12
                  py-4
                  text-xs md:text-sm
                  tracking-[0.25em]
                  font-medium
                  rounded-full
                  transition-all duration-500

                  hover:bg-[#C89B3C]
                  hover:text-[#151311]
                  hover:scale-[1.04]

                  hover:shadow-[0_0_40px_rgba(200,155,60,0.35)]
                  "
            >
              INQUIRE TODAY
            </button>

          </div>
        </section>
      </>
  );
}
