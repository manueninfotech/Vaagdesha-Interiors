import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import reviewhero from "../assets/reviews/review-hero.webp";
import review from "../assets/reviews/review.webp";
import transformation1 from "../assets/reviews/transformation1.webp";
import transformation2 from "../assets/reviews/transformation2.webp";
import transformation3 from "../assets/reviews/transformation3.webp";
import transformation4 from "../assets/reviews/transformation4.webp";
import transformation5 from "../assets/reviews/transformation5.webp";


export default function Reviews() {
  const navigate = useNavigate();

  const [imgRef, imgVisible] = useInView();
  const [cardRef, cardVisible] = useInView();
  const [heroRef, heroVisible] = useInView();
const [featuredRef, featuredVisible] = useInView();
const [cardsRef, cardsVisible] = useInView();
const [gridRef, gridVisible] = useInView();
const [ctaRef, ctaVisible] = useInView();
const [lastCardsRef, lastCardsVisible] = useInView();

function useInView() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

const transformations = [
  {
    title: "Modern Heritage Residence",
    image: transformation1,
  },
  {
    title: "Luxury Living Transformation",
    image: transformation2,
  },
  {
    title: "Contemporary Villa Upgrade",
    image: transformation3,
  },
  {
    title: "Minimalist Interior Revival",
    image: transformation4,
  },
  {
    title: "luxury reading lounge",
    image: transformation5,
  },

];
  return (

    <div className="bg-[#0F0F10] overflow-hidden">
      <SEO
  title="Client Reviews | Vaagdesha Interiors"
  description="Read client reviews and testimonials about Vaagdesha Interiors. Discover how our luxury interior design solutions transformed homes and commercial spaces with exceptional craftsmanship and attention to detail."
  keywords="Interior Design Reviews, Client Testimonials, Customer Reviews, Luxury Interior Design Feedback, Home Interior Reviews, Commercial Interior Reviews, Vaagdesha Interiors"
  url="https://vaagdeshainteriors.com/reviews"
/>
      <Navbar />

    {/*Hero SECTION */}

    <section
  ref={heroRef}
  className={`
    relative
    min-h-screen
    overflow-hidden

    flex items-center justify-center
    text-center

    pt-14 sm:pt-16 md:pt-20
    pb-16 md:pb-20

    transition-all duration-1000 ease-out

    ${heroVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"}
  `}
>

  {/* BACKGROUND IMAGE */}
  <img
  src={reviewhero}
  alt="Luxury interior design project by Vaagdesha Interiors"
  fetchPriority="high"
  decoding="async"
  width="1920"
  height="1080"
  className="
    absolute inset-0
    w-full h-full
    object-cover
    scale-[1.03]
    brightness-[0.58]
  "
/>

  {/* DARK OVERLAY */}
  <div
    className="
      absolute inset-0
      bg-black/35
    "
  />

  {/* SOFT VIGNETTE */}
  <div
    className="
      absolute inset-0

      bg-gradient-to-b
      from-black/25
      via-transparent
      to-black/30
    "
  />

  {/* BRONZE GLOW */}
  <div
    className="
      absolute left-1/2 top-1/2
      -translate-x-1/2 -translate-y-1/2

      w-[320px]
sm:w-[520px]
md:w-[700px]

h-[220px]
sm:h-[300px]
md:h-[400px]

      bg-[#B08D57]/[0.10]

      blur-[70px]
      rounded-full
    "
  />

  {/* CONTENT */}
  <div className="
  relative z-10
  w-full
  px-6 sm:px-10
  text-center
">
  <div className="max-w-5xl mx-auto">

    {/* LABEL */}
    <p
      className="
        text-[#B08D57]

        tracking-[0.4em]
        uppercase

        text-xs md:text-sm

        mb-8
      "
    >
      Client Reviews
    </p>

    {/* HEADING */}
    <h1
      className="
  text-[32px]
sm:text-[40px]
md:text-[56px]

  leading-[1]
  tracking-[-0.04em]

  font-serif
  font-light

  text-[#F5F1EA]

  drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]

  mb-6 sm:mb-10
">
      Spaces They Truly Feel.
    </h1>

    {/* DESCRIPTION */}
    <p
      className="
        max-w-3xl
        mx-auto

        text-[#D1CCC7]

        text-[14px]
sm:text-[16px]
md:text-[20px]

        leading-[1.9]

        font-light

        mb-16
      "
    >
      Every interior we create is designed to evoke
      warmth, emotion, and timeless architectural presence —
      reflected beautifully through the voices
      of our clients.
    </p>

    {/* STATS */}
    <div className="
      flex flex-wrap
      justify-center
      gap-8 sm:gap-12 md:gap-20
    ">

      <div>
        <h3 className="
          text-3xl sm:text-4xl md:text-5xl
          font-serif
          text-[#F5F1EA]
          mb-2
        ">
          120+
        </h3>

        <p className="
          text-[#C6B8A5]
          text-xs

          tracking-[0.3em]
          uppercase
        ">
          Luxury Projects
        </p>
      </div>

      <div>
        <h3 className="
          text-4xl md:text-5xl
          font-serif
          text-[#F5F1EA]
          mb-2
        ">
          98%
        </h3>

        <p className="
          text-[#C6B8A5]
          text-xs

          tracking-[0.3em]
          uppercase
        ">
          Client Satisfaction
        </p>
      </div>

      <div>
        <h3 className="
          text-4xl md:text-5xl
          font-serif
          text-[#F5F1EA]
          mb-2
        ">
          10+
        </h3>

        <p className="
          text-[#C6B8A5]
          text-xs

          tracking-[0.3em]
          uppercase
        ">
          Years Experience
        </p>
      </div>

    </div>

  </div>
  </div>

</section>

    {/*Featured Testimonials SECTION */}

    <section className="py-14 md:py-20 px-4 sm:px-6 md:px-20 bg-[#0F0F10]">

      <div className="md:hidden">
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={16}
    slidesPerView={1.02}
    centeredSlides
    loop={false}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    pagination={{
      el: ".custom-pagination",
      clickable: true,
    }}
  >
    {[
      { 
        comment: "The level of sophistication and attention to detail in their work is remarkable.They truly understand our vision for a quite, luxury home.",
        client: "Aria Kensington",
        role: "CREATIVE DIRECTOR"
      },
      {
        comment: "Working with vagdeesha was a seamless experience. They managed to balance historical integrity with absolute modern comfort.",
        client: "Thomas Moreland",
        role: "ESTATE COLLECTOR"
      },
      {
        comment: "Their approach to lighting and texture changed how we feel in our space. It's not just a house anymore, it's a curated gallery.",
        client: "Isabella Vough",
        role: "PRIVATE CLIENT"
      }
    ].map((item, i) => (
      <SwiperSlide key={i}>
        <div className="bg-[#1A1A1C]/80
backdrop-blur-xl
border border-white/[0.05] p-5 sm:p-6 rounded-xl border border-[#E5D9CC]">
          <div className="text-[#C89B3C] mb-2">★★★★★</div>

          <p className="text-[#7A6A5A] text-[13px] sm:text-sm mb-4">
            {item.comment}
          </p>

          <p className="text-[#F5F1EA] font-medium">
            {item.client}
          </p>

          <p className="text-xs text-[#A89A8A] uppercase">
            {item.role}
          </p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  <div className="custom-pagination mt-4 flex justify-center"></div>
</div>

      <div
  
  className="
    group hidden md:grid max-w-6xl mx-auto md:grid-cols-3 gap-8
    transition-opacity transition-transform duration-700 ease-out
    "
>
        {[
          { 
            comment: "The level of sophistication and attention to detail in their work is remarkable.They truly understand our vision for a quite, luxury home.",
            client: "Aria Kensington",
            role: "CREATIVE DIRECTOR"
          },
          {
            comment: "Working with vagdeesha was a seamless experience. They managed to balance historical integrity with absolute modern comfort.",
            client: "Thomas Moreland",
            role: "ESTATE COLLECTOR"
          },
          {
            comment: "Their approach to lighting and texture changed how we feel in our space. It's not just a house anymore, it's a curated gallery.",
            client: "Isabella Vough",
            role: "PRIVATE CLIENT"
          }
         
        ].map((item,i)=>(
          <div
  key={i}
  className="
    relative overflow-hidden

    bg-white/[0.03]
    backdrop-blur-sm

    border border-white/[0.06]

    p-6 sm:p-8 lg:p-10

    rounded-[28px]

    transition-opacity transition-transform duration-700 ease-out

    hover:-translate-y-2
    hover:border-[#B08D57]/30

    hover:bg-white/[0.045]

    shadow-[0_10px_40px_rgba(0,0,0,0.25)]

    group
  "
>

  {/* GOLD GLOW */}
  <div
    className="
      absolute -top-20 -right-20
      w-[180px] h-[180px]

      bg-[#B08D57]/[0.08]
      blur-[40px]

      opacity-0
      group-hover:opacity-100

      transition duration-700
    "
  />

  {/* STARS */}
  <div
    className="
      relative z-10

      text-[#B08D57]

      tracking-[0.2em]
      text-sm

      mb-8
    "
  >
    ★★★★★
  </div>

  {/* REVIEW */}
  <p
    className="
      relative z-10

      text-[#A8A29E]

      leading-[1.9]

      text-[15px] sm:text-[16px]

      mb-10
    "
  >
    {item.comment}
  </p>

  {/* CLIENT */}
  <div className="relative z-10">

    <p
      className="
        text-[#F5F1EA]

        text-[20px]
        font-medium

        mb-1
      "
    >
      {item.client}
    </p>

    <p
      className="
        text-[#B08D57]

        text-xs
        tracking-[0.28em]
        uppercase
      "
    >
      {item.role}
    </p>

  </div>

</div>
        ))}
      </div>
    </section>


<section className="relative py-14 md:py-20 px-4 sm:px-6 bg-[#0F0F10] overflow-hidden">

  {/* AMBIENT GLOW */}
  <div
    className="
      absolute top-0 left-1/2 -translate-x-1/2
      w-[900px] h-[500px]
      bg-[#B08D57]/[0.05]
      blur-[70px]
      pointer-events-none
    "
  />

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

    {/* IMAGE SIDE */}
    <div
      ref={imgRef}
      className={`
        relative overflow-hidden

        border border-white/[0.06]

        bg-white/[0.03]
        backdrop-blur-sm

        transition-opacity transition-transform duration-700 ease-out

        ${imgVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
        }

        group
      `}
    >

      <img
        src={review}
        alt="Luxury interior transformation by Vaagdesha Interiors"
        loading="lazy"
        decoding="async"
        width="900"
        height="700"
        className={`
          w-full
          h-[320px] sm:h-[420px] md:h-[560px]
          object-cover
          transition-transform duration-[2200ms] ease-out
          group-hover:scale-105
          ${imgVisible ? "scale-100" : "scale-110"}
        `}
      />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
        "
      />

      {/* CONTENT */}
      <div className="absolute bottom-8 left-8 right-8">

        <p
          className="
            text-[#F5F1EA]
            italic
            text-lg
            md:text-xl
            leading-relaxed
            mb-3
          "
        >
          "A masterclass in modern architectural heritage."
        </p>

        <span
          className="
            text-[#B08D57]
            text-xs
            tracking-[0.3em]
            uppercase
          "
        >
          — Architectural Digest
        </span>

      </div>

    </div>

    {/* REVIEW CARD */}
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden

        bg-white/[0.03]
        backdrop-blur-sm

        border border-white/[0.06]

        p-6 sm:p-8 md:p-12

        transition-opacity transition-transform duration-700 ease-out

        ${cardVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
        }
      `}
    >

      {/* GOLD GLOW */}
      <div
        className="
          absolute -top-20 -right-20
          w-[220px] h-[220px]
          bg-[#B08D57]/[0.08]
          blur-[50px]
        "
      />

      <div className="relative z-10">

        {/* CLIENT */}
        <div className="flex items-center gap-4 mb-8">

          <div
            className="
              w-12 h-12
              rounded-full

              bg-[#B08D57]/15

              flex items-center justify-center

              text-sm
              font-semibold

              text-[#F5F1EA]
            "
          >
            MB
          </div>

          <div>

            <h3
              className="
                text-[#F5F1EA]
                text-lg
                font-medium
              "
            >
              Marcus Bennett
            </h3>

            <div
              className="
                text-[#B08D57]
                text-sm
                tracking-[0.2em]
              "
            >
              ★★★★★
            </div>

          </div>

        </div>

        {/* REVIEW */}
        <p
          className="
            text-[#A8A29E]

            text-[15px]
            sm:text-[16px]
            md:text-[17px]
            leading-[2]

            mb-10
          "
        >
          "From the initial sketch to the final placement of the
          custom-woven rugs, the journey was seamless. They don’t
          just design rooms; they curate a lifestyle that feels
          both historic and incredibly fresh."
        </p>

        {/* LINK */}
        <button
  onClick={() => {
    document.getElementById("view")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  className="
    inline-flex items-center gap-3

    text-[#B08D57]

    text-sm
    tracking-[0.25em]
    uppercase

    transition duration-500

    hover:text-[#F5F1EA]
  "
>
  Explore This Transformation
  <span>→</span>
</button>

      </div>

    </div>

  </div>

</section>


    <section id="view" className="relative py-14 md:py-20 overflow-hidden bg-[#0F0F10]">

      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.08),transparent_60%)]" />

      {/* TOP CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center mb-14">

        <p className="text-[#B08D57] uppercase tracking-[0.35em] text-xs mb-5">
          Before & After
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F1EA] leading-tight mb-6">
          Spaces Reimagined
        </h2>

        <p className="max-w-2xl mx-auto text-[#A8A29E] leading-relaxed text-sm md:text-base">
          Witness the transformation of interiors through thoughtful design,
          refined materiality, and timeless architectural elegance.
        </p>

      </div>

      {/* SLIDER */}
      <div className="relative">

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.05}
          centeredSlides={true}
          loop={true}
          speed={900}
          spaceBetween={16}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1.6,
            },
            1200: {
              slidesPerView: 2.0,
            },
          }}
          className="!overflow-visible"
        >

          {transformations.map((item, index) => (

            <SwiperSlide key={index}>

  <div
    className="
      group relative overflow-hidden
      border border-white/[0.06]
      bg-white/[0.03]
      backdrop-blur-xl
      shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    "
  >

    {/* SINGLE SPLIT IMAGE */}
    <div className="relative overflow-hidden h-[200px] sm:h-[240px] md:h-[320px]">

      <img
        src={item.image}
        alt={`${item.title} - Vaagdesha Interiors`}
        loading="lazy"
        decoding="async"
        width="1200"
        height="700"
        className="
          w-full h-full object-cover
          transition-transform duration-[2500ms]
          group-hover:scale-105
        "
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* CENTER DIVIDER */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-white/20" />

      {/* BEFORE LABEL */}
      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">

        <p className="text-[#B08D57] text-[9px] tracking-[0.35em] uppercase mb-2">
          Before
        </p>

        <h3 className="text-[#F5F1EA] text-[16px] sm:text-lg md:text-2xl font-serif">
          Outdated Space
        </h3>

      </div>

      {/* AFTER LABEL */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 text-right">

        <p className="text-[#B08D57] text-[9px] tracking-[0.35em] uppercase mb-2">
          After
        </p>

        <h3 className="text-[#F5F1EA] text-[16px] sm:text-lg md:text-2xl font-serif">
          Refined Luxury
        </h3>

      </div>

    </div>

  </div>

</SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  

<section

  className={`
    relative overflow-hidden
    py-14 md:py-20 px-4 sm:px-6
    bg-[#0F0F10]
  `}
>

  {/* ambient glow */}
  <div className="
    absolute inset-0
    bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.10),transparent_60%)]
  " />

  {/* noise texture */}
  

  <div
  className="
    relative z-10
    max-w-4xl
    mx-auto

    text-center

    px-5 sm:px-8
  "
>

    {/* small label */}
    <p className="
      text-[#B08D57]
      text-xs
      tracking-[0.35em]
      uppercase
      mb-6
    ">
      Begin Your Journey
    </p>

    {/* heading */}
    <h2 className="
      text-3xl sm:text-4xl md:text-6xl
      font-serif
      text-[#F5F1EA]
      leading-[1]
      mb-6
    ">
      Ready to Create
      <br />
      Something Timeless?
    </h2>

    {/* description */}
    <p className="
      max-w-2xl mx-auto
      text-[#A8A29E]
      text-sm sm:text-base
      leading-[1.9]
      mb-10
    ">
      From intimate residences to grand architectural experiences,
      we craft interiors that embody warmth, refinement,
      and enduring sophistication.
    </p>

    {/* buttons */}
    <div className="
      flex flex-col sm:flex-row
      justify-center items-center
      gap-5
    ">

      {/* primary */}
      <button
        onClick={() => navigate("/contact#form")}
        className="
          bg-[#B08D57]
          text-black

          px-6 sm:px-8
          py-3 sm:py-4
          rounded-full

          text-sm tracking-[0.2em]

          transition-all duration-500

          hover:bg-[#C8A46B]
          hover:scale-[1.03]
          hover:shadow-[0_10px_40px_rgba(176,141,87,0.35)]
        "
      >
        START A CONVERSATION
      </button>

    </div>

  </div>
</section>

    </div>
  );
}