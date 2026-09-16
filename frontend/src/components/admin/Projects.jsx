import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  FileText,
  Loader2,
} from "lucide-react";


export default function Projects({
  onCreateProject,
  onViewProject,
  onEditProject,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

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
    } catch (err) {
      console.error("Fetch Projects Error:", err);
      setError(err.message || "Failed to load projects");
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
    } catch (err) {
      console.error("Delete Project Error:", err);

      alert(
        err.message || "Something went wrong while deleting."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#A49588]">
            Project Management
          </p>

          <h1 className="mt-2 font-serif text-3xl text-[#5A0F14]">
            Projects
          </h1>

          <p className="mt-2 text-sm text-[#8B7A6B]">
            Manage project specifications and client documents.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateProject}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5A0F14] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#430B0F]"
        >
          <Plus size={17} />
          Create Project
        </button>

      </div>


      {/* CONTENT */}
      <div className="overflow-hidden rounded-xl border border-[#E5D9CC] bg-white">

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#8B7A6B]">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Loading projects...
            </div>
          </div>
        )}


        {/* ERROR */}
        {!loading && error && (
          <div className="flex min-h-[250px] items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-medium text-[#5A0F14]">
                Unable to load projects
              </p>

              <p className="mt-2 text-sm text-[#8B7A6B]">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchProjects}
                className="mt-4 rounded-lg border border-[#E5D9CC] px-4 py-2 text-sm text-[#5A0F14] hover:bg-[#F5EFE6]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}


        {/* EMPTY */}
        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFE6] text-[#B08D57]">
                <FileText size={24} />
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#5A0F14]">
                No projects yet
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#8B7A6B]">
                Create your first project specification to
                start building your project library.
              </p>

              <button
                type="button"
                onClick={onCreateProject}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#5A0F14] px-5 py-3 text-sm font-medium text-white"
              >
                <Plus size={17} />
                Create Project
              </button>

            </div>
          )}


        {/* DESKTOP TABLE */}
        {!loading &&
          !error &&
          projects.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-left">

                <thead>
                  <tr className="border-b border-[#E5D9CC] bg-[#FCFAF7]">

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Project ID
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Project
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Client
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Type
                    </th>

                    <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.15em] text-[#A49588]">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {projects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-[#E5D9CC] last:border-0 hover:bg-[#FCFAF7]"
                    >

                      <td className="px-6 py-5">
                        <span className="font-mono text-sm text-[#5A0F14]">
                          {project.projectId}
                        </span>
                      </td>

                      <td className="px-6 py-5">

                        <p className="font-medium text-[#3E3E3E]">
                          {project.projectName}
                        </p>

                        <p className="mt-1 text-xs text-[#A49588]">
                          Created{" "}
                          {formatDate(project.createdAt)}
                        </p>

                      </td>

                      <td className="px-6 py-5 text-sm text-[#70645A]">
                        {project.clientName || "-"}
                      </td>

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-[#F5EFE6] px-3 py-1 text-xs text-[#6D5C4D]">
                          {project.projectType || "-"}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-[#70645A]">
                        {formatDate(project.date)}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() =>
                              onViewProject(project)
                            }
                            title="View"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D9CC] text-[#6D5C4D] transition hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
                          >
                            <Eye size={16} />
                          </button>


                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() =>
                              onEditProject(project)
                            }
                            title="Edit"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D9CC] text-[#6D5C4D] transition hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
                          >
                            <Pencil size={16} />
                          </button>


                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(project._id)
                            }
                            title="Delete"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D9CC] text-[#8B5E5E] transition hover:bg-[#FBECEC] hover:text-[#8B1E1E]"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

      </div>
    </div>
  );
}