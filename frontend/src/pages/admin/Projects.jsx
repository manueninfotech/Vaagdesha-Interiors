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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/project-specifications"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error("Fetch Projects Error:", error);
      alert(
        error.message || "Something went wrong while loading projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `http://localhost:5000/api/project-specifications/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );

      alert("Project deleted successfully.");
    } catch (error) {
      console.error("Delete Project Error:", error);

      alert(
        error.message ||
          "Something went wrong while deleting the project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 py-8 lg:px-10">
      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
            Project Management
          </p>

          <h1 className="mt-1 text-3xl font-serif text-[#5A0F14]">
            Pdf List
          </h1>

          <p className="mt-2 text-sm text-[#8B7A6B]">
            View and manage your project specifications.
          </p>
        </div>

        <Link
          to="/admin/create-project"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5A0F14] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#741820]"
        >
          <Plus size={18} />
          Create Pdf
        </Link>
      </div>

      {/* PROJECT COUNT */}
      {!loading && (
        <div className="mb-5 text-sm text-[#8B7A6B]">
          {projects.length}{" "}
          {projects.length === 1 ? "project" : "projects"} found
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#E5D9CC] bg-white">
          <div className="flex items-center gap-3 text-[#8B7A6B]">
            <Loader2
              size={20}
              className="animate-spin text-[#5A0F14]"
            />
            Loading projects...
          </div>
        </div>
      ) : projects.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-[#E5D9CC] bg-white px-6 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFE6] text-[#5A0F14]">
            <FolderOpen size={28} />
          </div>

          <h2 className="mt-5 text-xl font-serif text-[#5A0F14]">
            No Projects Yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#8B7A6B]">
            Create your first project specification to start building
            your project document.
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
        /* PROJECT LIST */
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl border border-[#E5D9CC] bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* PROJECT INFO */}
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5EFE6] text-[#5A0F14]">
                    <FolderOpen size={21} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-serif text-[#5A0F14]">
                        {project.projectName}
                      </h2>

                      <span className="rounded-full bg-[#F5EFE6] px-3 py-1 text-[11px] font-medium text-[#6D5C4D]">
                        {project.projectType}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#B08D57]">
                      {project.projectId}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#8B7A6B]">
                      {project.clientName && (
                        <span>
                          Client: {project.clientName}
                        </span>
                      )}

                      {project.location && (
                        <span>
                          Location: {project.location}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-[#A49588]">
                      Created{" "}
                      {project.createdAt
                        ? new Date(
                            project.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/admin/projects/${project._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E5D9CC] bg-white px-4 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                    <Eye size={17} />
                    View
                  </Link>

                  <Link
                    to={`/admin/create-project?edit=${project._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E5D9CC] bg-white px-4 py-2.5 text-sm font-medium text-[#6D5C4D] transition hover:border-[#B08D57] hover:text-[#5A0F14]"
                    >
                    <Pencil size={17} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    disabled={deletingId === project._id}
                    onClick={() => handleDelete(project._id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === project._id ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}

                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}