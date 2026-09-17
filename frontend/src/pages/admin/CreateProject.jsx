import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
  FolderPlus,
  FileText,
} from "lucide-react";

import ProjectSection from "../../components/admin/ProjectSection";
import ProjectSpecificationPreview from "../../components/admin/ProjectSpecificationPreview";

const API_URL = import.meta.env.VITE_API_URL;

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

const allSections = [...generalSections, ...addonSections];

const createInitialSections = () => {
  const sections = {};

  allSections.forEach((section) => {
    const fields = {};

    section.fields?.forEach((field) => {
      fields[field.id] = "";
    });

    sections[section.id] = {
      fields,
      description: "",
      images: [],
    };
  });

  return sections;
};

export default function CreateProject() {
  const [activeTab, setActiveTab] = useState("general");
    const [showPreview, setShowPreview] = useState(false);
    const pdfPreviewRef = useRef(null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const editId = searchParams.get("edit");

    const [loadingProject, setLoadingProject] = useState(false);
    const [saving, setSaving] = useState(false);
  const [project, setProject] = useState({
    projectId: "",
    projectName: "",
    clientName: "",
    location: "",
    projectType: "Residential",
    date: "",
    sections: createInitialSections(),
  });

  useEffect(() => {
  if (!editId) return;

  const fetchProject = async () => {
    try {
      setLoadingProject(true);

      const token = localStorage.getItem("vaagdesha_token");

      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(
        `${API_URL}/api/project-specifications/${editId}`,
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
          data.message || "Failed to load project"
        );
      }

      const savedProject = data.project;

      setProject({
  projectId: savedProject.projectId || "",
  projectName: savedProject.projectName || "",
  clientName: savedProject.clientName || "",
  location: savedProject.location || "",
  projectType: savedProject.projectType || "Residential",
  date: savedProject.date
    ? savedProject.date.substring(0, 10)
    : "",

  sections: Object.fromEntries(
    allSections.map((section) => {
      const savedSection = savedProject.sections?.[section.id];

      return [
        section.id,
        {
          fields: {
            ...createInitialSections()[section.id].fields,
            ...(savedSection?.fields || {}),
          },
          description: savedSection?.description || "",
          images: Array.isArray(savedSection?.images)
            ? savedSection.images.filter(Boolean)
            : [],
        },
      ];
    })
  ),
});
    } catch (error) {
      console.error("Load Project Error:", error);

      alert(
        error.message ||
          "Something went wrong while loading the project."
      );

      navigate("/admin/projects");
    } finally {
      setLoadingProject(false);
    }
  };

  fetchProject();
}, [editId, navigate]);

  const updateProjectField = (field, value) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSectionField = (sectionId, fieldId, value) => {
  setProject((prev) => ({
    ...prev,
    sections: {
      ...prev.sections,
      [sectionId]: {
        ...prev.sections[sectionId],
        fields: {
          ...prev.sections[sectionId].fields,
          [fieldId]: value,
        },
      },
    },
  }));
};

  const updateSectionDescription = (sectionId, value) => {
    setProject((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          ...prev.sections[sectionId],
          description: value,
        },
      },
    }));
  };

  const updateSectionImages = (sectionId, images) => {
    setProject((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          ...prev.sections[sectionId],
          images,
        },
      },
    }));
  };

  const removeSectionImage = (sectionId, index) => {
    setProject((prev) => {
      const currentImages = [...prev.sections[sectionId].images];

      const imageToRemove = currentImages[index];

      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      currentImages.splice(index, 1);

      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            images: currentImages,
          },
        },
      };
    });
  };

  const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const token = localStorage.getItem("vaagdesha_token");

  if (!token) {
    throw new Error("Authentication required.");
  }

  const response = await fetch(
    `${API_URL}/api/upload-project-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload image"
    );
  }

  return data.image;
};

const prepareProjectForSave = async () => {
  const updatedSections = {};

  for (const section of allSections) {
    const currentSection =
      project.sections?.[section.id] || {};

    const currentImages = Array.isArray(currentSection.images)
      ? currentSection.images.filter(Boolean)
      : [];

    const uploadedImages = [];

    for (const image of currentImages) {
      // Already uploaded to Cloudinary
      if (image.url && image.publicId) {
        uploadedImages.push({
          url: image.url,
          publicId: image.publicId,
        });

        continue;
      }

      // New local image
      if (image.file) {
        const uploadedImage = await uploadImageToCloudinary(
          image.file
        );

        uploadedImages.push(uploadedImage);
      }
    }

    updatedSections[section.id] = {
      fields: currentSection.fields || {},
      description: currentSection.description || "",
      images: uploadedImages,
    };
  }

  return {
  projectId: project.projectId || "",
  projectName: project.projectName,
  clientName: project.clientName,
  location: project.location,
  projectType: project.projectType,
  date: project.date,
  sections: updatedSections,
};
};

  const saveProject = async () => {
  if (!project.projectName.trim()) {
    throw new Error("Please enter a Project Name.");
  }

  const projectToSave = await prepareProjectForSave();

  const existingProjectId = editId || project._id;

  const url = existingProjectId
    ? `${API_URL}/api/project-specifications/${existingProjectId}`
    : `${API_URL}/api/project-specifications`;

  const method = existingProjectId ? "PUT" : "POST";

  const token = localStorage.getItem("vaagdesha_token");

if (!token) {
  throw new Error("Authentication required.");
}

const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(projectToSave),
});

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Failed to ${editId ? "update" : "save"} project`
    );
  }

  /*
   * IMPORTANT:
   * Backend returns the generated Project ID here.
   *
   * New project:
   * VAI-2026-001
   *
   * Existing project:
   * keeps its existing ID.
   */
  setProject(data.project);

  return data.project;
};

const handleSaveDraft = async () => {
  try {
    setSaving(true);

    await saveProject();

    alert(
      editId
        ? "Project updated successfully!"
        : "Project specification saved successfully!"
    );

    if (editId) {
      navigate(`/admin/projects/${editId}`);
    }
  } catch (error) {
    console.error(
      editId
        ? "Update Project Error:"
        : "Save Project Error:",
      error
    );

    alert(
      error.message ||
        "Something went wrong while saving the project."
    );
  } finally {
    setSaving(false);
  }
};

  const handleGeneratePDF = async () => {
  try {
    if (!project.projectName?.trim()) {
      alert("Please enter a Project Name before generating the PDF.");
      return;
    }

    setSaving(true);

    // =========================================================
    // STEP 1 — SAVE PROJECT FIRST
    // =========================================================
    //
    // For a NEW project:
    // Backend generates:
    // VAI-2026-001
    //
    // For an EXISTING project:
    // Existing Project ID is preserved.
    //
    const savedProject = await saveProject();

    // =========================================================
    // STEP 2 — WAIT FOR REACT TO UPDATE THE PREVIEW
    // =========================================================
    //
    // setProject() above updates the preview asynchronously.
    // We need to wait until the DOM has rendered the new ID.
    //
    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    // Small extra delay to make sure layout is complete
    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    // =========================================================
    // STEP 3 — GET PDF PREVIEW
    // =========================================================

    const pdfContainer = pdfPreviewRef.current;

    if (!pdfContainer) {
      throw new Error("PDF preview is not ready.");
    }

    // =========================================================
    // STEP 4 — MAKE SURE FONTS ARE LOADED
    // =========================================================

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // =========================================================
    // STEP 5 — WAIT FOR ALL IMAGES
    // =========================================================

    const images = Array.from(
      pdfContainer.querySelectorAll("img")
    );

    await Promise.all(
      images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // =========================================================
    // STEP 6 — SMALL LAYOUT DELAY
    // =========================================================

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    // =========================================================
    // STEP 7 — GET ALL PDF PAGES
    // =========================================================

    const pages = Array.from(
      pdfContainer.querySelectorAll(".pdf-page")
    );

    if (!pages.length) {
      throw new Error("No PDF pages found.");
    }

    // =========================================================
    // STEP 8 — CREATE PDF
    // =========================================================

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // =========================================================
    // STEP 9 — CONVERT EACH PAGE
    // =========================================================

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#F8F4EE",
        logging: false,
        imageTimeout: 15000,
      });

      const imageData = canvas.toDataURL(
        "image/jpeg",
        0.95
      );

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        0,
        210,
        297,
        undefined,
        "FAST"
      );
    }

    // =========================================================
    // STEP 10 — PDF FILE NAME
    // =========================================================

    const safeProjectName = savedProject.projectName
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    const projectId = savedProject.projectId
      ? `-${savedProject.projectId.toLowerCase()}`
      : "";

    pdf.save(
      `${safeProjectName || "vaagdesha-project"}${projectId}-specification.pdf`
    );

    // =========================================================
    // SUCCESS
    // =========================================================

    alert(
      `Project PDF generated successfully!\n\nProject ID: ${savedProject.projectId}`
    );
  } catch (error) {
    console.error("PDF Generation Error:", error);

    alert(
      error.message ||
        "Something went wrong while generating the PDF."
    );
  } finally {
    setSaving(false);
  }
};

  if (loadingProject) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6]">
      <div className="flex items-center gap-3 text-[#8B7A6B]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#E5D9CC] border-t-[#5A0F14]" />
        Loading project...
      </div>
    </div>
  );
}

  return (
    <div className="flex min-h-screen bg-[#F5EFE6] text-[#3E3E3E]">

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1">

        <div>

          {/* TOP BAR */}
          <header className="sticky top-0 z-20 border-b border-[#E5D9CC] bg-[#F5EFE6]/95 px-6 py-5 backdrop-blur-md lg:px-10">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
                {editId ? "Project Management / Edit" : "Project Management"}
              </p>

              <h2 className="mt-1 text-2xl font-serif text-[#5A0F14] lg:text-3xl">
                {editId ? "Edit Pdf" : "Create Pdf"}
              </h2>
            </div>

            <div className="hidden items-center gap-3 sm:flex">

              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={saving}
                className="rounded-xl border border-[#D7C8B8] bg-white px-5 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14] disabled:cursor-not-allowed disabled:opacity-60"
                >
                {saving
                    ? "Saving..."
                    : editId
                    ? "Update Project"
                    : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 rounded-xl bg-[#5A0F14] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#741820]"
              >
                <FileText size={17} />
                Preview Pdf
              </button>

            </div>

          </div>

        </header>

        {/* FORM */}
        <div className="mx-auto max-w-6xl space-y-8 px-6 py-8 lg:px-10">

          {/* PROJECT DETAILS */}
          <section className="rounded-2xl border border-[#E5D9CC] bg-white p-6 shadow-sm">

            {/* SECTION HEADER */}
            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5EFE6] text-[#5A0F14]">
                <FolderPlus size={20} />
              </div>

              <div>
                <h3 className="text-xl font-serif text-[#5A0F14]">
                  Project Details
                </h3>

                <p className="text-sm text-[#8B7A6B]">
                  Basic information used for the project specification document.
                </p>
              </div>

            </div>


            {/* FORM GRID */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* PROJECT ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3E3E3E]">
                  Project ID
                </label>

                <div className="rounded-xl border border-[#E5D9CC] bg-[#F5EFE6] px-4 py-3">
                  <div className="text-sm font-semibold tracking-wide text-[#5A0F14]">
                    {project.projectId || "Auto-generated"}
                  </div>

                  <p className="mt-1 text-xs text-[#8B7A6B]">
                    Project ID will be generated automatically when the project is saved.
                  </p>
                </div>
              </div>


              {/* PROJECT NAME */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                  Project Name
                </label>

                <input
                  type="text"
                  value={project.projectName}
                  onChange={(e) =>
                    updateProjectField("projectName", e.target.value)
                  }
                  placeholder="Example: Luxury Villa Interiors"
                  className="w-full rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition placeholder:text-[#B5A79A] focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                />

              </div>


              {/* CLIENT NAME */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                  Client Name
                </label>

                <input
                  type="text"
                  value={project.clientName}
                  onChange={(e) =>
                    updateProjectField("clientName", e.target.value)
                  }
                  placeholder="Enter client name"
                  className="w-full rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition placeholder:text-[#B5A79A] focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                />

              </div>


              {/* LOCATION */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                  Location
                </label>

                <input
                  type="text"
                  value={project.location}
                  onChange={(e) =>
                    updateProjectField("location", e.target.value)
                  }
                  placeholder="Example: Guntur, Andhra Pradesh"
                  className="w-full rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition placeholder:text-[#B5A79A] focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                />

              </div>


              {/* PROJECT TYPE */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                  Project Type
                </label>

                <select
                  value={project.projectType}
                  onChange={(e) =>
                    updateProjectField("projectType", e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                >
                  <option value="Residential">
                    Residential
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>
                </select>

              </div>


              {/* DATE */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                  Date
                </label>

                <input
                  type="date"
                  value={project.date}
                  onChange={(e) =>
                    updateProjectField("date", e.target.value)
                  }
                  className="w-full rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                />

              </div>

            </div>

          </section>

          {/* DESIGN SPECIFICATIONS */}

          <div className="pt-2">

            <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
              Design Specifications
            </p>

            <h3 className="mt-1 text-2xl font-serif text-[#5A0F14]">
              Project Sections
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8B7A6B]">
              Add the design specifications and 3D reference images
              for each area of the project.
            </p>

          </div>


          {/* TABS */}

          <div className="mt-6 rounded-2xl border border-[#E5D9CC] bg-white p-2 shadow-sm">

            <div className="grid grid-cols-2 gap-2">

              {/* GENERAL TAB */}
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
                  activeTab === "general"
                    ? "bg-[#5A0F14] text-white shadow-sm"
                    : "text-[#6D5C4D] hover:bg-[#FAF6F0]"
                }`}
              >
                General
              </button>

              {/* ADD-ONS TAB */}
              <button
                type="button"
                onClick={() => setActiveTab("addons")}
                className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
                  activeTab === "addons"
                    ? "bg-[#5A0F14] text-white shadow-sm"
                    : "text-[#6D5C4D] hover:bg-[#FAF6F0]"
                }`}
              >
                Add-ons
              </button>

            </div>

          </div>


          {/* TAB CONTENT */}

          <div className="mt-6 space-y-5">

            {/* GENERAL */}

            {activeTab === "general" && (
              <>
                <div className="mb-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
                    General
                  </p>

                  <h4 className="mt-1 text-xl font-serif text-[#5A0F14]">
                    Main Project Details
                  </h4>

                  <p className="mt-1 text-sm text-[#8B7A6B]">
                    Add the primary design information for this project.
                  </p>

                </div>

                {generalSections.map((section) => (
                  <ProjectSection
                    key={section.id}
                    title={section.title}
                    fields={section.fields}
                    allowImages={section.allowImages !== false}
                    fieldValues={project.sections[section.id].fields}
                    description={project.sections[section.id].description}
                    onFieldChange={(fieldId, value) =>
                      updateSectionField(section.id, fieldId, value)
                    }
                    images={project.sections[section.id].images}
                    onDescriptionChange={(value) =>
                      updateSectionDescription(section.id, value)
                    }
                    onImagesChange={(images) =>
                      updateSectionImages(section.id, images)
                    }
                    onRemoveImage={(index) =>
                      removeSectionImage(section.id, index)
                    }
                  />
                ))}
              </>
            )}


            {/* ADD-ONS */}

            {activeTab === "addons" && (
              <>
                <div className="mb-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
                    Add-ons
                  </p>

                  <h4 className="mt-1 text-xl font-serif text-[#5A0F14]">
                    Additional Specifications
                  </h4>

                  <p className="mt-1 text-sm text-[#8B7A6B]">
                    Add additional design elements, room specifications,
                    wall designs, and ceiling details.
                  </p>

                </div>

                {addonSections.map((section) => (
                  <ProjectSection
                    key={section.id}
                    title={section.title}
                    fields={section.fields}
                    allowImages={section.allowImages !== false}
                    fieldValues={project.sections[section.id].fields}
                    description={project.sections[section.id].description}
                    images={project.sections[section.id].images}
                    onFieldChange={(fieldId, value) =>
                      updateSectionField(section.id, fieldId, value)
                    }
                    onDescriptionChange={(value) =>
                      updateSectionDescription(section.id, value)
                    }
                    onImagesChange={(images) =>
                      updateSectionImages(section.id, images)
                    }
                    onRemoveImage={(index) =>
                      removeSectionImage(section.id, index)
                    }
                  />
                ))}
              </>
            )}

          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-col gap-3 border-t border-[#E5D9CC] pt-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving}
            className="rounded-xl border border-[#D7C8B8] bg-white px-5 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14] disabled:cursor-not-allowed disabled:opacity-60"
            >
            {saving
                ? "Saving..."
                : editId
                ? "Update Project"
                : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="rounded-xl border border-[#B08D57] bg-white px-6 py-3 text-sm font-medium text-[#5A0F14] transition hover:bg-[#F8F1E8]"
          >
            Preview Pdf
          </button>

          <button
            type="button"
            onClick={handleGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#5A0F14] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#741820]"
          >
            <FileText size={18} />
            Generate Project PDF
          </button>

        </div>

        </div>

          </div>

</main>

     {/* =========================
          HIDDEN PDF RENDERER
      ========================= */}

      <div
        ref={pdfPreviewRef}
        className="fixed left-[-10000px] top-0 z-[-1] w-[794px]"
        aria-hidden="true"
      >
        <ProjectSpecificationPreview
          project={project}
          sections={allSections}
        />
      </div>
      {showPreview && (
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60">

        <div className="relative min-h-screen">

          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="fixed right-6 top-6 z-[110] rounded-full bg-white px-4 py-2 text-sm font-medium text-[#5A0F14] shadow-lg transition hover:bg-[#F5EFE6]"
          >
            Close Preview
          </button>

          <ProjectSpecificationPreview
            project={project}
            sections={allSections}
          />

        </div>

      </div>
    )}

    </div>
  );
}