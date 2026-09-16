import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FolderOpen,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  /* =========================================================
     FETCH PROJECTS
  ========================================================= */

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("vaagdesha_token");

      const response = await fetch(
        `${API_URL}/api/project-specifications`,
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
          data.message || "Failed to fetch projects"
        );
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error(
        "Fetch Projects Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while loading projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  /* =========================================================
     DELETE PROJECT
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem(
        "vaagdesha_token"
      );

      const response = await fetch(
        `${API_URL}/api/project-specifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete project"
        );
      }

      setProjects((prev) =>
        prev.filter(
          (project) => project._id !== id
        )
      );

      alert(
        "Project deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete Project Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while deleting the project."
      );
    } finally {
      setDeletingId(null);
    }
  };


  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#F5EFE6] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        {/* TITLE */}

        <div className="min-w-0">

          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A49588] sm:text-xs">
            Project Management
          </p>

          <h1 className="mt-1 font-serif text-3xl text-[#5A0F14]">
            Pdf List
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8B7A6B]">
            View and manage your project specifications.
          </p>

        </div>


        {/* CREATE PDF */}

        <Link
          to="/admin/create-project"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5A0F14] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#741820] sm:w-auto"
        >
          <Plus size={18} />

          <span>
            Create Pdf
          </span>
        </Link>

      </div>


      {/* =====================================================
          PROJECT COUNT
      ====================================================== */}

      {!loading && (
        <div className="mb-5 text-sm text-[#8B7A6B]">
          {projects.length}{" "}
          {projects.length === 1
            ? "project"
            : "projects"}{" "}
          found
        </div>
      )}


      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-[#E5D9CC] bg-white px-5">

          <div className="flex items-center gap-3 text-sm text-[#8B7A6B]">

            <Loader2
              size={20}
              className="animate-spin text-[#5A0F14]"
            />

            Loading projects...

          </div>

        </div>
      ) : projects.length === 0 ? (

        /* ===================================================
           EMPTY STATE
        ==================================================== */

        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-[#E5D9CC] bg-white px-5 text-center shadow-sm">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFE6] text-[#5A0F14]">
            <FolderOpen size={28} />
          </div>

          <h2 className="mt-5 font-serif text-xl text-[#5A0F14]">
            No Projects Yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#8B7A6B]">
            Create your first project specification
            to start building your project document.
          </p>

          <Link
            to="/admin/create-project"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#B08D57] px-5 py-3 text-sm font-medium text-[#5A0F14] transition hover:bg-[#F8F1E8]"
          >
            <Plus size={18} />

            Create Your First Pdf
          </Link>

        </div>

      ) : (

        /* ===================================================
           PROJECT LIST
        ==================================================== */

        <div className="w-full min-w-0 space-y-4">

          {projects.map((project) => (

            <div
              key={project._id}
              className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#E5D9CC] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >

              {/* =================================================
                  PROJECT CONTENT
              ================================================== */}

              <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* =============================================
                    PROJECT INFO
                ============================================== */}

                <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                  {/* PROJECT ICON */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5EFE6] text-[#5A0F14] sm:h-12 sm:w-12">
                    <FolderOpen
                      size={21}
                    />
                  </div>


                  {/* INFORMATION */}

                  <div className="min-w-0 flex-1">

                    {/* PROJECT NAME + TYPE */}

                    <div className="flex min-w-0 flex-wrap items-center gap-2">

                      <h2 className="min-w-0 break-words font-serif text-lg leading-6 text-[#5A0F14]">
                        {project.projectName ||
                          "Untitled Project"}
                      </h2>

                      {project.projectType && (
                        <span className="shrink-0 rounded-full bg-[#F5EFE6] px-3 py-1 text-[10px] font-medium text-[#6D5C4D] sm:text-[11px]">
                          {project.projectType}
                        </span>
                      )}

                    </div>


                    {/* PROJECT ID */}

                    <p className="mt-2 break-all text-[11px] font-medium uppercase tracking-[0.12em] text-[#B08D57]">
                      {project.projectId ||
                        "—"}
                    </p>


                    {/* CLIENT + LOCATION */}

                    <div className="mt-3 flex min-w-0 flex-col gap-1 text-sm leading-6 text-[#8B7A6B]">

                      {project.clientName && (
                        <span className="break-words">
                          <span className="font-medium text-[#70645A]">
                            Client:
                          </span>{" "}
                          {project.clientName}
                        </span>
                      )}

                      {project.location && (
                        <span className="break-words">
                          <span className="font-medium text-[#70645A]">
                            Location:
                          </span>{" "}
                          {project.location}
                        </span>
                      )}

                    </div>


                    {/* CREATED DATE */}

                    <p className="mt-2 text-xs text-[#A49588]">
                      Created{" "}
                      {formatDate(
                        project.createdAt
                      )}
                    </p>

                  </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================== */}

                <div className="w-full shrink-0 lg:w-auto">

                  {/* ---------------------------------------------
                      DESKTOP ACTIONS
                  ---------------------------------------------- */}

                  <div className="hidden items-center justify-end gap-2 sm:flex">

                    {/* VIEW */}

                    <Link
                      to={`/admin/projects/${project._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5D9CC] bg-white px-4 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                      <Eye size={17} />

                      View
                    </Link>


                    {/* EDIT */}

                    <Link
                      to={`/admin/create-project?edit=${project._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5D9CC] bg-white px-4 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                      <Pencil size={17} />

                      Edit
                    </Link>


                    {/* DELETE */}

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        project._id
                      }
                      onClick={() =>
                        handleDelete(
                          project._id
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId ===
                      project._id ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2
                          size={17}
                        />
                      )}

                      Delete
                    </button>

                  </div>


                  {/* ---------------------------------------------
                      MOBILE ACTIONS
                  ---------------------------------------------- */}

                  <div className="grid w-full grid-cols-3 gap-2 sm:hidden">

                    {/* VIEW */}

                    <Link
                      to={`/admin/projects/${project._id}`}
                      className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#E5D9CC] bg-white px-1.5 py-2.5 text-xs font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                      <Eye
                        size={15}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        View
                      </span>
                    </Link>


                    {/* EDIT */}

                    <Link
                      to={`/admin/create-project?edit=${project._id}`}
                      className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#E5D9CC] bg-white px-1.5 py-2.5 text-xs font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                      <Pencil
                        size={15}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        Edit
                      </span>
                    </Link>


                    {/* DELETE */}

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        project._id
                      }
                      onClick={() =>
                        handleDelete(
                          project._id
                        )
                      }
                      className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-1.5 py-2.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId ===
                      project._id ? (
                        <Loader2
                          size={15}
                          className="shrink-0 animate-spin"
                        />
                      ) : (
                        <Trash2
                          size={15}
                          className="shrink-0"
                        />
                      )}

                      <span className="truncate">
                        Delete
                      </span>
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}