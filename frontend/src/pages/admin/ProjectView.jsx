import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Loader2,
} from "lucide-react";

import ProjectSpecificationPreview from "../../components/admin/ProjectSpecificationPreview";
const API_URL = import.meta.env.VITE_API_URL;


/* =========================================================
   GENERAL SECTIONS
========================================================= */

const generalSections = [

  {
    id: "hall",
    title: "Hall",
    fields: [
      {
        id: "concept",
        label: "Design Concept",
      },
    ],
  },

  {
    id: "bedrooms",
    title: "Bedrooms",
    fields: [
      {
        id: "theme",
        label: "Bedroom Type / Theme",
      },
    ],
  },

  {
    id: "kitchen",
    title: "Kitchen",
    fields: [
      {
        id: "layout",
        label: "Kitchen Layout",
      },
    ],
  },

  {
    id: "dining",
    title: "Dining",
    fields: [
      {
        id: "concept",
        label: "Design Concept",
      },
    ],
  },
];


/* =========================================================
   ADD-ON SECTIONS
========================================================= */

const addonSections = [
  {
    id: "bedroomTvUnit",
    title: "Bedroom TV Unit",
    fields: [
      {
        id: "design",
        label: "TV Unit Design",
      },
    ],
  },

  {
    id: "bedBackground",
    title: "Bed Background",
    fields: [
      {
        id: "design",
        label: "Design Details",
      },
    ],
  },

  {
    id: "hallTvUnit",
    title: "Hall TV Unit",
    fields: [
      {
        id: "design",
        label: "TV Unit Design",
      },
    ],
  },

  {
    id: "hallSideWall",
    title: "Hall Side Wall Design",
    fields: [
      {
        id: "design",
        label: "Wall Design",
      },
    ],
  },

  {
    id: "hallBackWall",
    title: "Hall Back Wall Design",
    fields: [
      {
        id: "design",
        label: "Wall Design",
      },
    ],
  },

  {
    id: "bedroom1",
    title: "Bedroom 1 Specs",
    fields: [
      {
        id: "theme",
        label: "Bedroom Theme",
      },
    ],
  },

  {
    id: "room2",
    title: "Room 2 Specs",
    fields: [
      {
        id: "theme",
        label: "Room Theme",
      },
    ],
  },

  {
    id: "room3",
    title: "Room 3 Specs",
    fields: [
      {
        id: "theme",
        label: "Room Theme",
      },
    ],
  },

  {
    id: "room4",
    title: "Room 4 Specs",
    fields: [
      {
        id: "theme",
        label: "Room Theme",
      },
    ],
  },

  {
    id: "secondHall",
    title: "Second Hall Specs",
    fields: [
      {
        id: "concept",
        label: "Design Concept",
      },
    ],
  },

  {
    id: "ceiling",
    title: "Ceiling Specs",
    fields: [
      {
        id: "type",
        label: "Ceiling Type",
      },
    ],
  },
];


const allSections = [
  ...generalSections,
  ...addonSections,
];


/* =========================================================
   A4 PREVIEW WIDTH

   ProjectSpecificationPreview uses:
   max-w-[794px]

   We keep that exact size and only scale the visual
   representation on smaller screens.
========================================================= */

const A4_PREVIEW_WIDTH = 794;


/* =========================================================
   COMPONENT
========================================================= */

export default function ProjectView() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [previewScale, setPreviewScale] = useState(1);
  const [previewHeight, setPreviewHeight] =
    useState(null);

  const previewWrapperRef = useRef(null);
  const previewContentRef = useRef(null);


  /* =======================================================
     FETCH PROJECT
  ======================================================= */

  useEffect(() => {
  const fetchProject = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem(
        "vaagdesha_token"
      );

      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(
        `${API_URL}/api/project-specifications/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch project"
        );
      }

      setProject(data.project);
    } catch (error) {
      console.error(
        "Fetch Project Error:",
        error
      );

      alert(
        error.message ||
          "Failed to fetch project"
      );
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchProject();
  }
}, [id]);


  /* =======================================================
     RESPONSIVE A4 PREVIEW

     Desktop:
       scale = 1

     Mobile:
       A4 preview scales down to fit the available width.

     The actual ProjectSpecificationPreview remains
     794px wide. We only visually transform it here.
  ======================================================= */

  useEffect(() => {
    const updatePreviewScale = () => {
      const wrapper =
        previewWrapperRef.current;

      const content =
        previewContentRef.current;

      if (!wrapper || !content) {
        return;
      }


      const availableWidth =
        wrapper.clientWidth;


      /*
       * Leave a small amount of breathing room.
       */

      const horizontalPadding =
        window.innerWidth < 640
          ? 8
          : 0;


      const usableWidth =
        Math.max(
          availableWidth -
            horizontalPadding,
          280
        );


      /*
       * Never enlarge beyond the original
       * A4 preview size.
       */

      const scale = Math.min(
        usableWidth /
          A4_PREVIEW_WIDTH,
        1
      );


      setPreviewScale(scale);


      /*
       * The transformed element does not automatically
       * reduce its layout height.
       *
       * Therefore we manually calculate the wrapper
       * height so there is no huge blank/overlapping area.
       */

      const naturalHeight =
        content.scrollHeight;


      setPreviewHeight(
        naturalHeight * scale
      );
    };


    /*
     * Wait until the preview has rendered.
     */

    const initialTimer =
      setTimeout(
        updatePreviewScale,
        100
      );


    window.addEventListener(
      "resize",
      updatePreviewScale
    );


    /*
     * ResizeObserver catches changes caused by:
     *
     * - images loading
     * - fonts loading
     * - project content changing
     */

    let resizeObserver;

    if (
      previewContentRef.current &&
      typeof ResizeObserver !==
        "undefined"
    ) {
      resizeObserver =
        new ResizeObserver(
          updatePreviewScale
        );

      resizeObserver.observe(
        previewContentRef.current
      );
    }


    return () => {
      clearTimeout(initialTimer);

      window.removeEventListener(
        "resize",
        updatePreviewScale
      );

      resizeObserver?.disconnect();
    };
  }, [project]);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6] px-4">

        <div className="flex items-center gap-3 text-sm text-[#8B7A6B]">

          <Loader2
            size={22}
            className="animate-spin text-[#5A0F14]"
          />

          Loading pdf...

        </div>

      </div>
    );
  }


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5EFE6] px-6 text-center">

        <h1 className="font-serif text-2xl text-[#5A0F14]">
          Pdf Not Found
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#8B7A6B]">
          The pdf you are looking for could not
          be found.
        </p>

        <Link
          to="/admin/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5A0F14] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#741820]"
        >
          <ArrowLeft size={17} />

          Back to Pdf List
        </Link>

      </div>
    );
  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#F5EFE6]">


      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#E5D9CC] bg-[#F5EFE6]/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4 lg:px-10">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* -----------------------------------------------
              PROJECT INFORMATION
          ------------------------------------------------ */}

          <div className="min-w-0">

            <Link
              to="/admin/projects"
              className="mb-2 inline-flex items-center gap-2 text-xs text-[#8B7A6B] transition hover:text-[#5A0F14] sm:text-sm"
            >
              <ArrowLeft size={15} />

              Back to Pdf List
            </Link>


            <h1 className="break-words font-serif text-xl leading-tight text-[#5A0F14] sm:text-2xl lg:text-3xl">
              {project.projectName}
            </h1>


            <p className="mt-1 break-all text-[10px] uppercase tracking-[0.15em] text-[#B08D57] sm:text-xs">
              {project.projectId}
            </p>

          </div>


          {/* -----------------------------------------------
              EDIT BUTTON
          ------------------------------------------------ */}

          <div className="flex w-full sm:w-auto">

            <Link
              to={`/admin/create-project?edit=${project._id}`}
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#B08D57] bg-white px-5 py-2.5 text-sm font-medium text-[#5A0F14] transition hover:bg-[#F8F1E8] sm:w-auto"
            >
              Edit Pdf
            </Link>

          </div>

        </div>

      </header>


      {/* =====================================================
          PDF PREVIEW AREA
      ====================================================== */}

      <main className="w-full min-w-0 px-2 py-4 sm:px-6 sm:py-8 lg:px-10">


        {/* -----------------------------------------------
            PREVIEW CONTAINER

            On mobile, this gives the A4 preview a
            controlled responsive area.
        ------------------------------------------------ */}

        <div
          ref={previewWrapperRef}
          className="mx-auto w-full min-w-0 overflow-hidden"
          style={{
            height:
              previewHeight
                ? `${previewHeight}px`
                : "auto",
          }}
        >

          {/* ---------------------------------------------
              A4 PREVIEW

              Width remains 794px.

              Only visual scale changes.
          ---------------------------------------------- */}

          <div
            ref={previewContentRef}
            className="origin-top-left"
            style={{
              width: `${A4_PREVIEW_WIDTH}px`,
              transform: `scale(${previewScale})`,
            }}
          >

            <ProjectSpecificationPreview
              project={project}
              sections={allSections}
            />

          </div>

        </div>

      </main>

    </div>
  );
}