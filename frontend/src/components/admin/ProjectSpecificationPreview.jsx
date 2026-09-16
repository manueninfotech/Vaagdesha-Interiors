import React, {
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import logo1 from "../../assets/logo1.png";

/* =========================================================
   A4 PAGE SETTINGS
========================================================= */

const PAGE_HEIGHT = 1120;
const PAGE_PADDING_Y = 56;

/*
 * Approximate header/footer heights.
 * The actual block heights are also measured below.
 */
const PAGE_HEADER_HEIGHT = 82;
const PAGE_FOOTER_HEIGHT = 48;

const PAGE_CONTENT_HEIGHT =
  PAGE_HEIGHT -
  PAGE_PADDING_Y * 2 -
  PAGE_HEADER_HEIGHT -
  PAGE_FOOTER_HEIGHT -
  8;


/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProjectSpecificationPreview({
  project,
  sections = [],
}) {
  const [pages, setPages] = useState([]);
  const [isMeasuring, setIsMeasuring] = useState(true);


  /* =======================================================
     HELPERS
  ======================================================= */

  const hasValue = (value) => {
    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    );
  };


  const getSectionData = (section) => {
    return project?.sections?.[section.id] || {};
  };


  const getImageSrc = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    return (
      image.preview ||
      image.url ||
      image.src ||
      image.imageUrl ||
      ""
    );
  };


  /* =======================================================
     PREPARE POPULATED SECTIONS
  ======================================================= */

  const populatedSections = useMemo(() => {
    return sections
      .map((section) => {
        const sectionData = getSectionData(section);

        const fields = (section.fields || []).filter(
          (field) =>
            hasValue(sectionData?.fields?.[field.id])
        );


        /*
         * Brand Details should NEVER show images.
         *
         * All other sections can show images.
         */

        const images =
          section.allowImages === false
            ? []
            : Array.isArray(sectionData?.images)
            ? sectionData.images.filter(Boolean)
            : [];


        const description =
          hasValue(sectionData?.description)
            ? sectionData.description
            : "";


        const hasContent =
          fields.length > 0 ||
          description ||
          images.length > 0;


        return {
          ...section,
          sectionData,
          populatedFields: fields,
          description,
          images,
          hasContent,
        };
      })
      .filter((section) => section.hasContent);
  }, [project, sections]);


  /* =======================================================
     CREATE FLOWABLE CONTENT BLOCKS

     IMPORTANT:

     Every small piece becomes its own block.

     Example:

     Kitchen
       ↓
     Design Specification
       ↓
     Kitchen Layout label + first line
       ↓
     Kitchen Layout second line
       ↓
     Kitchen Layout third line
       ↓
     Kitchen Layout fourth line
       ↓
     Kitchen image

     This allows the page to use every available space.
  ======================================================= */

  const contentBlocks = useMemo(() => {
    const blocks = [];

    populatedSections.forEach(
      (section, sectionIndex) => {
        const sectionNumber = sectionIndex + 1;


        /* -----------------------------------------------
           SECTION HEADER
        ------------------------------------------------ */

        blocks.push({
          id: `${section.id}-header`,
          type: "header",
          section,
          sectionNumber,
        });


        /* -----------------------------------------------
           DESCRIPTION

           Split paragraphs separately so that one large
           description does not unnecessarily move the
           entire section.
        ------------------------------------------------ */

        if (hasValue(section.description)) {
          const descriptionParts =
            String(section.description)
              .split(/\n\s*\n/)
              .map((part) => part.trim())
              .filter(Boolean);

          descriptionParts.forEach(
            (paragraph, paragraphIndex) => {
              blocks.push({
                id: `${section.id}-description-${paragraphIndex}`,
                type: "description",
                section,
                sectionNumber,
                text: paragraph,
              });
            }
          );
        }


        /* -----------------------------------------------
           FIELDS

           Each line gets its own flowable block.

           This is especially important for things like:

           Cabinet finish...
           Countertop...
           Backsplash...
           Storage...
           Hardware...
           Lighting...
        ------------------------------------------------ */

        section.populatedFields.forEach(
          (field, fieldIndex) => {
            const rawValue =
              section.sectionData.fields?.[field.id];

            const lines = String(rawValue || "")
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean);


            /*
             * If the field doesn't contain new lines,
             * still create one block.
             */

            if (lines.length === 0) {
              blocks.push({
                id: `${section.id}-field-${field.id}`,
                type: "field",
                section,
                field,
                sectionNumber,
                fieldIndex,
                text: "",
                showLabel: true,
              });

              return;
            }


            lines.forEach(
              (line, lineIndex) => {
                blocks.push({
                  id: `${section.id}-field-${field.id}-${lineIndex}`,
                  type: "field",
                  section,
                  field,
                  sectionNumber,
                  fieldIndex,
                  lineIndex,
                  text: line,

                  /*
                   * Only the first line displays the
                   * field label.
                   */
                  showLabel: lineIndex === 0,
                });
              }
            );
          }
        );


        /* -----------------------------------------------
           IMAGES
        ------------------------------------------------ */

        if (section.images.length > 0) {
          blocks.push({
            id: `${section.id}-images`,
            type: "images",
            section,
            sectionNumber,
          });
        }
      }
    );

    return blocks;
  }, [populatedSections]);


  /* =======================================================
     RENDER SECTION HEADER
  ======================================================= */

  const renderSectionHeader = ({
    section,
    sectionNumber,
  }) => {
    return (
      <div className="border-t border-[#E5D9CC] pb-3 pt-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 shrink-0 text-[10px] font-medium tracking-[0.15em] text-[#B08D57]">
            {String(sectionNumber).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-2xl leading-tight text-[#5A0F14]">
              {section.title}
            </h3>
          </div>
        </div>
      </div>
    );
  };


  /* =======================================================
     RENDER DESCRIPTION
  ======================================================= */

  const renderSectionDescription = ({
    text,
  }) => {
    if (!hasValue(text)) {
      return null;
    }

    return (
      <div className="pb-3 pl-8 pt-2">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
          Design Specification
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-[#8B7A6B]">
          {text}
        </p>
      </div>
    );
  };


  /* =======================================================
     RENDER INDIVIDUAL FIELD LINE
  ======================================================= */

  const renderSectionField = ({
    section,
    field,
    text,
    showLabel,
  }) => {
    return (
      <div
        className={`pl-8 ${
          showLabel
            ? "pb-2 pt-2"
            : "pb-2 pt-0"
        }`}
      >
        {showLabel && (
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-5 shrink-0 bg-[#B08D57]" />

            <p className="text-[9px] uppercase tracking-[0.18em] text-[#A49588]">
              {field.label}
            </p>
          </div>
        )}

        {hasValue(text) && (
          <p
            className={`whitespace-pre-line break-words text-sm leading-7 text-[#3E3E3E] ${
              showLabel ? "" : "pl-8"
            }`}
          >
            {text}
          </p>
        )}
      </div>
    );
  };


  /* =======================================================
     RENDER SECTION IMAGES
  ======================================================= */

  const renderSectionImages = ({
    section,
  }) => {
    const images = section.images || [];

    if (images.length === 0) {
      return null;
    }

    return (
      <div className="pb-5 pl-8 pt-2">

        {/* -----------------------------------------------
            VISUAL REFERENCE LABEL
        ------------------------------------------------ */}

        <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
          Visual Reference
        </p>


        {/* -----------------------------------------------
            ONE IMAGE
        ------------------------------------------------ */}

        {images.length === 1 && (
          <div className="overflow-hidden bg-[#EAE3D9]">
            <img
              src={getImageSrc(images[0])}
              alt={section.title}
              crossOrigin="anonymous"
              className="block max-h-[390px] w-full object-cover"
            />
          </div>
        )}


        {/* -----------------------------------------------
            TWO IMAGES
        ------------------------------------------------ */}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="h-[300px] overflow-hidden bg-[#EAE3D9]"
              >
                <img
                  src={getImageSrc(image)}
                  alt={`${section.title} ${index + 1}`}
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}


        {/* -----------------------------------------------
            THREE OR MORE IMAGES
        ------------------------------------------------ */}

        {images.length >= 3 && (
          <div className="grid grid-cols-2 gap-4">
            {images
              .slice(0, 4)
              .map((image, index) => (
                <div
                  key={index}
                  className="h-[235px] overflow-hidden bg-[#EAE3D9]"
                >
                  <img
                    src={getImageSrc(image)}
                    alt={`${section.title} ${index + 1}`}
                    crossOrigin="anonymous"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
          </div>
        )}


        {/* -----------------------------------------------
            ADDITIONAL IMAGE COUNT
        ------------------------------------------------ */}

        {images.length > 4 && (
          <p className="mt-3 text-right text-[9px] uppercase tracking-[0.15em] text-[#A49588]">
            + {images.length - 4} additional images
          </p>
        )}
      </div>
    );
  };


  /* =======================================================
     PAGINATION

     The measurement document uses EXACTLY the same
     rendering functions as the real pages.

     This is very important.

     The old version measured the new block types as
     "content", which no longer existed.

     This version measures:

       header
       description
       field
       images
  ======================================================= */

  useLayoutEffect(() => {
    if (contentBlocks.length === 0) {
      setPages([]);
      setIsMeasuring(false);
      return;
    }

    setIsMeasuring(true);

    const frame = requestAnimationFrame(() => {
      const container =
        document.querySelector(
          "[data-pagination-measurement]"
        );

      if (!container) {
        setIsMeasuring(false);
        return;
      }


      /* -----------------------------------------------
         GET ACTUAL HEADER HEIGHT
      ------------------------------------------------ */

      const pageHeader =
        container.querySelector(
          "[data-measure-header]"
        );

      const headerHeight =
        pageHeader?.getBoundingClientRect()
          .height || PAGE_HEADER_HEIGHT;


      /* -----------------------------------------------
         GET ACTUAL FOOTER HEIGHT
      ------------------------------------------------ */

      const pageFooter =
        container.querySelector(
          "[data-measure-footer]"
        );

      const footerHeight =
        pageFooter?.getBoundingClientRect()
          .height || PAGE_FOOTER_HEIGHT;


      /* -----------------------------------------------
         CALCULATE AVAILABLE CONTENT HEIGHT
      ------------------------------------------------ */

      const innerHeight =
        PAGE_HEIGHT -
        PAGE_PADDING_Y * 2;


      /*
       * Small safety allowance only.
       *
       * We don't reserve a huge artificial blank area.
       */

      const availableHeight =
        innerHeight -
        headerHeight -
        footerHeight -
        8;


      /* -----------------------------------------------
         MEASURE EVERY BLOCK
      ------------------------------------------------ */

      const elements = Array.from(
        container.querySelectorAll(
          "[data-measure-block]"
        )
      );


      const measuredBlocks = elements
        .map((element) => {
          const id =
            element.getAttribute(
              "data-block-id"
            );

          return {
            id,
            height: Math.ceil(
              element.getBoundingClientRect()
                .height
            ),
          };
        })
        .filter(
          (item) =>
            item.id &&
            item.height > 0
        );


      /* -----------------------------------------------
         BUILD PAGES
      ------------------------------------------------ */

      const generatedPages = [];

      let currentPage = [];
      let currentHeight = 0;


      measuredBlocks.forEach(
        ({ id, height }) => {
          const block =
            contentBlocks.find(
              (item) =>
                item.id === id
            );

          if (!block) {
            return;
          }


          /*
           * If this block doesn't fit:
           *
           * Move ONLY this block to the
           * next page.
           */

          if (
            currentPage.length > 0 &&
            currentHeight + height >
              availableHeight
          ) {
            generatedPages.push(
              currentPage
            );

            currentPage = [];
            currentHeight = 0;
          }


          currentPage.push(block);
          currentHeight += height;
        }
      );


      if (currentPage.length > 0) {
        generatedPages.push(
          currentPage
        );
      }


      setPages(generatedPages);
      setIsMeasuring(false);
    });


    return () => {
      cancelAnimationFrame(frame);
    };
  }, [contentBlocks]);


  /* =======================================================
     SPECIFICATION PAGE HEADER
  ======================================================= */

  const renderPageHeader = () => {
    return (
      <div className="flex items-end justify-between border-b border-[#E5D9CC] pb-6">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
            Project Specifications
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#5A0F14]">
            Design Details
          </h2>
        </div>

        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
          Vaagdesha Interiors
        </p>
      </div>
    );
  };


  /* =======================================================
     SPECIFICATION PAGE FOOTER
  ======================================================= */

  const renderPageFooter = (
    pageNumber
  ) => {
    return (
      <div className="mt-auto flex items-center justify-between border-t border-[#E5D9CC] pt-6">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
          Vaagdesha Interiors
        </p>

        <p className="text-[9px] text-[#A49588]">
          {String(pageNumber).padStart(2, "0")}
        </p>
      </div>
    );
  };


  /* =======================================================
     RENDER FLOWABLE BLOCK
  ======================================================= */

  const renderFlowBlock = (block) => {
    if (!block) {
      return null;
    }


    if (block.type === "header") {
      return (
        <React.Fragment key={block.id}>
          {renderSectionHeader(block)}
        </React.Fragment>
      );
    }


    if (block.type === "description") {
      return (
        <React.Fragment key={block.id}>
          {renderSectionDescription(block)}
        </React.Fragment>
      );
    }


    if (block.type === "field") {
      return (
        <React.Fragment key={block.id}>
          {renderSectionField(block)}
        </React.Fragment>
      );
    }


    if (block.type === "images") {
      return (
        <React.Fragment key={block.id}>
          {renderSectionImages(block)}
        </React.Fragment>
      );
    }


    return null;
  };


  /* =======================================================
     SPECIFICATION PAGE
  ======================================================= */

  const renderSpecificationPage = (
    pageBlocks,
    pageNumber
  ) => {
    return (
      <section
        key={`spec-page-${pageNumber}`}
        className="pdf-page mx-auto mb-10 flex min-h-[1120px] w-full max-w-[794px] flex-col bg-[#F8F4EE] px-14 py-14 shadow-2xl"
      >

        {/* HEADER */}

        {renderPageHeader()}


        {/* CONTENT */}

        <div className="mt-2">
          {pageBlocks.map(
            (block) =>
              renderFlowBlock(block)
          )}
        </div>


        {/* FOOTER */}

        {renderPageFooter(
          pageNumber
        )}
      </section>
    );
  };


  /* =======================================================
     MEASUREMENT DOCUMENT

     Invisible document used only to calculate
     the height of every individual block.

     IMPORTANT:
     It uses the SAME render functions as
     the actual PDF pages.
  ======================================================= */

  const renderMeasurementDocument = () => {
    return (
      <div
        data-pagination-measurement
        className="pointer-events-none absolute left-[-10000px] top-0 w-[682px]"
        aria-hidden="true"
      >

        {/* HEADER */}

        <div data-measure-header>
          {renderPageHeader()}
        </div>


        {/* FLOWABLE BLOCKS */}

        <div className="mt-2">
          {contentBlocks.map(
            (block) => (
              <div
                key={block.id}
                data-measure-block
                data-block-id={block.id}
                className="w-full"
              >
                {renderFlowBlock(
                  block
                )}
              </div>
            )
          )}
        </div>


        {/* FOOTER */}

        <div data-measure-footer>
          {renderPageFooter(0)}
        </div>
      </div>
    );
  };


  /* =======================================================
     PAGE 1 — PROJECT COVER
  ======================================================= */

  const renderCoverPage = () => {
    return (
      <section className="pdf-page mx-auto mb-10 flex min-h-[1120px] w-full max-w-[794px] flex-col bg-[#F8F4EE] px-14 py-14 shadow-2xl">

        {/* BRAND HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-[#B08D57]">
              VAAGDESHA
            </p>

            <h1 className="mt-1 font-serif text-2xl tracking-[0.18em] text-[#5A0F14]">
              INTERIORS
            </h1>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#8B7A6B]">
              Project Specification
            </p>

            {hasValue(
              project?.projectId
            ) && (
              <p className="mt-1 text-[10px] text-[#A49588]">
                {project.projectId}
              </p>
            )}
          </div>
        </div>


        {/* GOLD LINE */}

        <div className="mt-8 h-px w-full bg-[#B08D57]/50" />


        {/* MAIN CONTENT */}

        <div className="flex flex-1 flex-col pt-12">

          {/* LOGO */}

          <div className="mb-10 flex w-full justify-center">
            <img
              src={logo1}
              alt="Vaagdesha Interiors"
              className="h-auto w-[300px] object-contain"
            />
          </div>


          {/* CATEGORY */}

          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B08D57]">
            Interior Design
          </p>


          {/* PROJECT NAME */}

          <h2 className="max-w-[620px] font-serif text-[52px] leading-[1.05] text-[#3E3E3E]">
            {project?.projectName ||
              "Project Name"}
          </h2>


          {/* DECORATIVE LINE */}

          <div className="mt-6 h-px w-20 bg-[#5A0F14]" />


          {/* DESCRIPTION */}

          <p className="mt-6 max-w-[500px] text-sm leading-7 text-[#8B7A6B]">
            A detailed specification of the
            interior design, materials, finishes,
            furniture and design elements proposed
            for this project.
          </p>


          {/* PROJECT INFORMATION */}

          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-7 border-y border-[#E5D9CC] py-8">
            {[
              [
                "Client",
                project?.clientName,
              ],
              [
                "Location",
                project?.location,
              ],
              [
                "Project Type",
                project?.projectType,
              ],
              [
                "Date",
                formatDate(
                  project?.date
                ),
              ],
            ].map(
              ([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
                    {label}
                  </p>

                  <p className="mt-2 text-sm text-[#3E3E3E]">
                    {hasValue(value)
                      ? value
                      : "—"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>


        {/* FOOTER */}

        <div className="mt-8 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
            Design • Detail • Craft
          </p>

          <p className="text-[9px] text-[#A49588]">
            01
          </p>
        </div>
      </section>
    );
  };


  /* =======================================================
     FINAL THANK YOU PAGE
  ======================================================= */

  const renderFinalPage = () => {
    return (
      <section className="pdf-page mx-auto flex min-h-[1120px] w-full max-w-[794px] flex-col items-center justify-center bg-[#F8F4EE] px-14 py-14 text-center shadow-2xl">

        {/* LOGO */}

        <div className="mb-2 flex w-full justify-center">
          <img
            src={logo1}
            alt="Vaagdesha Interiors"
            className="h-auto w-[220px] object-contain"
          />
        </div>


        {/* BRAND */}

        <h2 className="mt-2 font-serif text-4xl tracking-[0.12em] text-[#B08D57]"> 
          VAAGDESHA
        </h2>

        <h2 className="mt-2 font-serif text-4xl tracking-[0.12em] text-[#5A0F14]">
          INTERIORS
        </h2>


        {/* LINE */}

        <div className="mt-8 h-px w-20 bg-[#B08D57]" />


        {/* TAGLINE */}

        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[#8B7A6B]">
          Design • Detail • Craft
        </p>


        {/* MESSAGE */}

        <p className="mt-10 max-w-[420px] text-sm leading-7 text-[#8B7A6B]">
          Thank you for choosing Vaagdesha
          Interiors. This project specification
          represents the design details and finishes
          prepared for your project.
        </p>


        {/* PROJECT ID */}

        {hasValue(
          project?.projectId
        ) && (
          <p className="mt-12 text-[10px] uppercase tracking-[0.2em] text-[#A49588]">
            Project {project.projectId}
          </p>
        )}


        {/* FOOTER */}

        <div className="mt-auto w-full border-t border-[#E5D9CC] pt-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
            Project Specification
          </p>
        </div>
      </section>
    );
  };


  /* =======================================================
     MAIN RETURN
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#D9D2C8] px-4 py-10">

      {/* PAGE 1 */}

      {renderCoverPage()}


      {/* INVISIBLE MEASUREMENT DOCUMENT */}

      {renderMeasurementDocument()}


      {/* SPECIFICATION PAGES */}

      {!isMeasuring &&
        pages.map(
          (pageBlocks, index) =>
            renderSpecificationPage(
              pageBlocks,
              index + 2
            )
        )}


      {/* FINAL PAGE */}

      {!isMeasuring &&
        renderFinalPage()}

    </div>
  );
}