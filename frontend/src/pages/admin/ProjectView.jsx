import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import ProjectSpecificationPreview from "../../components/admin/ProjectSpecificationPreview";

const generalSections = [
  {
    id: "brandDetails",
    title: "Brand Details",
    fields: [
      { id: "brandName", label: "Brand / Material Name" },
      { id: "details", label: "Brand Details" },
    ],
  },
  {
    id: "hall",
    title: "Hall",
    fields: [
      { id: "concept", label: "Design Concept" },
    ],
  },
  {
    id: "bedrooms",
    title: "Bedrooms",
    fields: [
      { id: "theme", label: "Bedroom Type / Theme" },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    fields: [
      { id: "layout", label: "Kitchen Layout" },
    ],
  },
  {
    id: "dining",
    title: "Dining",
    fields: [
      { id: "concept", label: "Design Concept" },
    ],
  },
];

const addonSections = [
  {
    id: "bedroomTvUnit",
    title: "Bedroom TV Unit",
    fields: [
      { id: "design", label: "TV Unit Design" },
    ],
  },
  {
    id: "bedBackground",
    title: "Bed Background",
    fields: [
      { id: "design", label: "Design Details" },
    ],
  },
  {
    id: "hallTvUnit",
    title: "Hall TV Unit",
    fields: [
      { id: "design", label: "TV Unit Design" },
    ],
  },
  {
    id: "hallSideWall",
    title: "Hall Side Wall Design",
    fields: [
      { id: "design", label: "Wall Design" },
    ],
  },
  {
    id: "hallBackWall",
    title: "Hall Back Wall Design",
    fields: [
      { id: "design", label: "Wall Design" },
    ],
  },
  {
    id: "bedroom1",
    title: "Bedroom 1 Specs",
    fields: [
      { id: "theme", label: "Bedroom Theme" },
    ],
  },
  {
    id: "room2",
    title: "Room 2 Specs",
    fields: [
      { id: "theme", label: "Room Theme" },
    ],
  },
  {
    id: "room3",
    title: "Room 3 Specs",
    fields: [
      { id: "theme", label: "Room Theme" },
    ],
  },
  {
    id: "room4",
    title: "Room 4 Specs",
    fields: [
      { id: "theme", label: "Room Theme" },
    ],
  },
  {
    id: "secondHall",
    title: "Second Hall Specs",
    fields: [
      { id: "concept", label: "Design Concept" },
    ],
  },
  {
    id: "ceiling",
    title: "Ceiling Specs",
    fields: [
      { id: "type", label: "Ceiling Type" },
    ],
  },
];

const allSections = [...generalSections, ...addonSections];

export default function ProjectView() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/project-specifications/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch project"
          );
        }

        setProject(data.project);
      } catch (error) {
        console.error("Fetch Project Error:", error);
        alert(
          error.message ||
            "Something went wrong while loading the project."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6]">
        <div className="flex items-center gap-3 text-[#8B7A6B]">
          <Loader2
            size={22}
            className="animate-spin text-[#5A0F14]"
          />
          Loading pdf...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5EFE6] px-6 text-center">
        <h1 className="text-2xl font-serif text-[#5A0F14]">
          Pdf Not Found
        </h1>

        <p className="mt-2 text-sm text-[#8B7A6B]">
          The pdf you are looking for could not be found.
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

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 border-b border-[#E5D9CC] bg-[#F5EFE6]/95 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Link
              to="/admin/projects"
              className="mb-2 inline-flex items-center gap-2 text-sm text-[#8B7A6B] transition hover:text-[#5A0F14]"
            >
              <ArrowLeft size={16} />
              Back to Pdf List
            </Link>

            <h1 className="truncate text-2xl font-serif text-[#5A0F14] lg:text-3xl">
              {project.projectName}
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#B08D57]">
              {project.projectId}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/admin/create-project?edit=${project._id}`}
              className="rounded-xl border border-[#B08D57] bg-white px-5 py-2.5 text-sm font-medium text-[#5A0F14] transition hover:bg-[#F8F1E8]"
            >
              Edit Pdf
            </Link>
          </div>
        </div>
      </header>

      {/* PROJECT PREVIEW */}
      <main className="px-4 py-8 sm:px-6 lg:px-10">
        <ProjectSpecificationPreview
          project={project}
          sections={allSections}
        />
      </main>
    </div>
  );
}