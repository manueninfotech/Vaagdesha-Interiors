import SEO from "../components/SEO";
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import Reveal from "../components/Reveal";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";



export default function Contact() {
  const ref = useRef();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.hash === "#form") {
      const el = document.getElementById("form");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);


  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 6;   // SMALL tilt
    const rotateY = ((x - midX) / midX) * 6;

    ref.current.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const reset = () => {
    ref.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    details: "",
    file: null
  });

  const [success, setSuccess] = useState(false);
  const fileRef = useRef();
const [fileName, setFileName] = useState("No file chosen");

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE FILE
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const allowedTypes = [
  "application/pdf",

  "image/jpeg",
  "image/jpg",
  "image/png",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

if (file && !allowedTypes.includes(file.type)) {
  toast.error(
    "Please upload a PDF, Image, Word or Excel file."
  );
  return;
}

    setFormData({
      ...formData,
      file: file
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    if (!formData.name.trim()) {
  return toast.error("Please enter your name");
}

if (!formData.phone.trim()) {
  return toast.error("Please enter your phone number");
}

if (!formData.email.trim()) {
  return toast.error("Please enter your email");
}

if (!formData.details.trim()) {
  return toast.error("Please enter your project details");
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  return toast.error("Please enter a valid email address");
}
    const form = new FormData();

    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("location", formData.location);
    form.append("details", formData.details);

    if (formData.file) {
      form.append("file", formData.file);
    }

    const res = await fetch("https://vaagdesha-interiors.onrender.com/api/contact", {
      method: "POST",
      body: form,
    });

    const result = await res.json();

if (!res.ok) {
  return toast.error(result.message || "Failed to send inquiry");
}

toast.success("Inquiry submitted successfully! We'll contact you soon.", {
  style: {
    background: "#5A0F14",
    color: "#fff",
    border: "1px solid #C89B3C",
  },
});

    // ✅ 🔥 RESET FORM HERE
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      details: "",
      file: null
    });

    setFileName("No file chosen");

  } catch (error) {
    console.error(error);
    toast.error("Failed to send inquiry. Please try again.");
  }finally {
  setLoading(false);
}
};

const inputStyle = `
  w-full

  bg-white/[0.04]
  border border-white/[0.08]

  text-[#F5F1EA]
  placeholder:text-[#6F6F73]

  backdrop-blur-xl

  px-4
py-3 sm:py-3.5

  rounded-xl

  outline-none

  focus:border-[#B08D57]
  focus:bg-white/[0.06]

  transition-all duration-300

  autofill:bg-transparent
`;

const labelStyle = `
  block
  text-xs
  tracking-[0.22em] sm:tracking-[0.28em]
  text-[#B08D57]
  uppercase
  mb-3
`;

  return (

    <div className="bg-[#0F0F10] text-[#F5F1EA] overflow-hidden">
      <SEO
  title="Contact Vaagdeesha Interiors | Interior Design Consultation"
  description="Contact Vaagdeesha Interiors for luxury residential and commercial interior design services. Schedule a consultation and bring your dream space to life with our expert designers."
  keywords="Contact Vaagdeesha Interiors, Interior Design Consultation, Interior Designers, Luxury Interiors, Residential Interiors, Commercial Interiors, Home Interior Design"
/>
          <Navbar />
    
    <section
  id="form"
  className="
    relative
    overflow-hidden
    py-12 sm:py-16 md:py-20
    px-4 sm:px-6
    bg-[#0F0F10]
  "
>

  {/* GOLD GLOW */}
  <div
    className="
      absolute
      top-20 left-1/2
      -translate-x-1/2

      w-[320px]
sm:w-[500px]
md:w-[700px]

h-[220px]
sm:h-[300px]
md:h-[400px]

      bg-[#B08D57]/10
      blur-[140px]
    "
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1C] to-[#0F0F10]" />

  <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1fr] gap-14 md:gap-20 xl:gap-28 items-start">

    {/* LEFT SIDE */}
    <div className="pt-2 md:pt-6">

      <p
        className="
          text-[#B08D57]
          tracking-[0.35em]
          uppercase
          text-xs
          mb-6
        "
      >
        Contact Us
      </p>

      <h1
        className="
          text-[42px]
          sm:text-[54px]
          md:text-[76px]
          leading-[0.95]
          tracking-[-0.04em]
          font-serif
          text-[#F5F1EA]
          mb-8
        "
      >
        Let’s Design
        <br />
        Your Space
      </h1>

      <p
        className="
          text-[#A8A29E]
          text-[15px]
          sm:text-[16px]
          md:text-[17px]
          leading-[1.9]
          max-w-md
          mb-10 sm:mb-14
        "
      >
        Share your vision with us and our team will
        craft interiors that feel timeless, refined,
        and deeply personal.
      </p>

      {/* CONTACT DETAILS */}
      <div className="space-y-8 sm:space-y-10">

        <div>
          <p className="text-[#B08D57] text-xs tracking-[0.3em] uppercase mb-2">
            Email
          </p>

          <p className="text-[#F5F1EA] text-base sm:text-lg">
            vaagdeshainteriors@gmail.com
          </p>
        </div>

        <div>
          <p className="text-[#B08D57] text-xs tracking-[0.3em] uppercase mb-2">
            Phone
          </p>

          <p className="text-[#F5F1EA] text-base sm:text-lg">
            +91 7599999729
          </p>
        </div>

        <div>
          <p className="text-[#B08D57] text-xs tracking-[0.3em] uppercase mb-2">
            Studio
          </p>

          <p className="text-[#F5F1EA] text-base sm:text-lg leading-relaxed">
            Rama heights, Flat 101, JKC College Road, Next to Orion, Guntur, 
            Andhra Pradesh, 522006
          </p>
        </div>

      </div>

    </div>

    {/* RIGHT SIDE FORM */}
    <div
      className="
        relative
        overflow-hidden

        bg-white/[0.03]
        backdrop-blur-2xl

        border border-white/[0.06]

        rounded-[24px] sm:rounded-[32px]

        p-5 sm:p-8 md:p-12

        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
      "
    >

      {/* BRONZE GLOW */}
      <div
        className="
          absolute
          top-0 right-0

          w-[300px] h-[300px]

          bg-[#B08D57]/10
          blur-[120px]
        "
      />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">

        {/* ROW 1 */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">

          <div>
            <label className="labelStyle">FULL NAME*</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="labelStyle">PHONE NUMBER*</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className={inputStyle}
            />
          </div>

        </div>

        {/* ROW 2 */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="labelStyle">EMAIL*</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@address.com"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>LOCATION</label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City / Area"
              className={inputStyle}
            />
          </div>

        </div>

        {/* FILE */}
        <div>

          <p className="text-xs tracking-[0.28em] text-[#B08D57] mb-3 uppercase">
            Upload House Plan
          </p>

          <div
            className="
              flex flex-col sm:flex-row
items-start sm:items-center
gap-4 sm:gap-0
justify-between

              border border-white/[0.08]

              bg-white/[0.03]

              px-4 py-4

              rounded-xl
            "
          >

            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="
                border border-[#B08D57]

                px-4 py-2

                text-sm text-[#F5F1EA]

                hover:bg-[#B08D57]/10

                transition-all duration-300
              "
            >
              SELECT FILE
            </button>

            <span className="text-sm text-[#A8A29E] truncate max-w-full sm:max-w-[200px]">
              {fileName}
            </span>

            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
              ref={fileRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setFileName(file.name);

                  setFormData({
                    ...formData,
                    file: file
                  });
                }
              }}
            />

          </div>

        </div>

        {/* TEXTAREA */}
        <div>

          <label className="labelStyle">DETAILS</label>

          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Tell us about your space and aesthetic preferences..."
            className="
              w-full

              bg-white/[0.04]
              border border-white/[0.08]

              text-[#F5F1EA]
              placeholder:text-[#777]

              backdrop-blur-md

              px-4 py-4

              h-[120px] sm:h-[140px]

              rounded-xl

              outline-none

              focus:border-[#B08D57]
              focus:bg-white/[0.06]

              transition-all duration-300
            "
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}

          className="
            w-full

            bg-[#B08D57]
            text-[#0F0F10]

            py-3.5 sm:py-4

            rounded-xl

            font-medium
            tracking-wide

            hover:-translate-y-1
            hover:shadow-[0_15px_40px_rgba(176,141,87,0.25)]

            transition-all duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loading ? "SENDING..." : "SUBMIT INQUIRY →"}
        </button>

      </form>

    </div>

  </div>

</section>


<section
  className="
    relative
    overflow-hidden

    py-12 sm:py-14 md:py-16

    bg-[#0F0F10]
  "
>

  {/* SUBTLE GLOW */}
  <div
    className="
      absolute
      top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2

      w-[700px] h-[300px]

      bg-[#B08D57]/10
      blur-[140px]
    "
  />

  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">

      {/* PHONE */}
      <div
        className="
          group

          bg-white/[0.03]
          backdrop-blur-xl

          border border-white/[0.06]

          rounded-[22px] sm:rounded-[28px]

          p-6 sm:p-8 md:p-10

          text-center

          flex flex-col
          justify-center

          min-h-[300px]

          transition-all duration-500

          hover:-translate-y-2
          hover:border-[#B08D57]/30
          hover:bg-white/[0.05]
        "
      >

        <div
          className="
            w-14 h-14 sm:w-14 sm:h-14 mx-auto mb-5

            rounded-full

            bg-[#B08D57]/10

            flex items-center justify-center
          "
        >
          <Phone className="text-[#B08D57]" size={24} />
        </div>

        <p
          className="
            text-[#B08D57]
            text-xs
            tracking-[0.35em]
            uppercase
            mb-4
          "
        >
          Phone
        </p>

        <p className="text-[#F5F1EA] text-base sm:text-lg">
          +91 7599999729
        </p>

      </div>

      {/* EMAIL */}
      <div
        className="
          group

          bg-white/[0.03]
          backdrop-blur-xl

          border border-white/[0.06]

          rounded-[22px] sm:rounded-[28px]

          p-6 sm:p-8 md:p-10

          text-center

          flex flex-col
          justify-center

          min-h-[300px]

          transition-all duration-500

          hover:-translate-y-2
          hover:border-[#B08D57]/30
          hover:bg-white/[0.05]
        "
      >

        <div
          className="
            w-14 h-14 mx-auto mb-5

            rounded-full

            bg-[#B08D57]/10

            flex items-center justify-center
          "
        >
          <Mail className="text-[#B08D57]" size={24} />
        </div>

        <p
          className="
            text-[#B08D57]
            text-xs
            tracking-[0.35em]
            uppercase
            mb-4
          "
        >
          Email
        </p>

        <p className="text-[#F5F1EA] text-base sm:text-lg break-all">
          vaagdeshainteriors@gmail.com
        </p>

      </div>

      {/* LOCATION */}
      <div
        className="
          group

          bg-white/[0.03]
          backdrop-blur-xl

          border border-white/[0.06]

          rounded-[22px] sm:rounded-[28px]

          p-6 sm:p-8 md:p-10

          text-center

          flex flex-col
          justify-center

          min-h-[300px]

          transition-all duration-500

          hover:-translate-y-2
          hover:border-[#B08D57]/30
          hover:bg-white/[0.05]
        "
      >

        <div
          className="
            w-14 h-14 mx-auto mb-5

            rounded-full

            bg-[#B08D57]/10

            flex items-center justify-center
          "
        >
          <MapPin className="text-[#B08D57]" size={24} />
        </div>

        <p
          className="
            text-[#B08D57]
            text-xs
            tracking-[0.35em]
            uppercase
            mb-4
          "
        >
          Studio
        </p>

        <p className="text-[#F5F1EA] text-base sm:text-lg leading-[1.9]">
          Rama heights, Flat 101,   
          <br />
          JKC College Road, Next to Orion,
          <br />
          Guntur, Andhra Pradesh, 522006
        </p>

      </div>

    </div>

  </div>

</section>

</div>
  );
}