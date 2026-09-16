import { X, MapPin, CalendarDays, User, Home, Hash } from "lucide-react";

export default function ProjectPreview({
  project,
  sections,
  onClose,
}) {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8">

      <div className="mx-auto max-w-4xl">

        {/* TOP ACTION BAR */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-lg">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A49588]">
              Document Preview
            </p>

            <h2 className="mt-1 font-serif text-lg text-[#5A0F14]">
              Project Specification
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5EFE6] text-[#6D5C4D] transition hover:bg-[#5A0F14] hover:text-white"
          >
            <X size={18} />
          </button>

        </div>


        {/* DOCUMENT */}
        <div className="overflow-hidden bg-white shadow-2xl">

          {/* COVER / HEADER */}
          <div className="border-b-4 border-[#B08D57] px-8 py-12 sm:px-14">

            <div className="text-center">

              <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#5A0F14]">
                Vaagdesha Interiors
              </p>

              <div className="mx-auto mt-5 h-px w-20 bg-[#B08D57]" />

              <h1 className="mt-6 font-serif text-3xl text-[#3E3E3E] sm:text-4xl">
                Project Specification
              </h1>

              <p className="mt-3 text-sm text-[#8B7A6B]">
                {project.projectName || "Untitled Project"}
              </p>

            </div>


            {/* PROJECT INFORMATION */}
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#E5D9CC] bg-[#E5D9CC] sm:grid-cols-2">

              <InfoItem
                icon={<Hash size={16} />}
                label="Project ID"
                value={project.projectId || "-"}
              />

              <InfoItem
                icon={<Home size={16} />}
                label="Project Type"
                value={project.projectType || "-"}
              />

              <InfoItem
                icon={<User size={16} />}
                label="Client"
                value={project.clientName || "-"}
              />

              <InfoItem
                icon={<MapPin size={16} />}
                label="Location"
                value={project.location || "-"}
              />

              <InfoItem
                icon={<CalendarDays size={16} />}
                label="Date"
                value={formatDate(project.date)}
              />

              <InfoItem
                label="Project"
                value={project.projectName || "-"}
              />

            </div>

          </div>


          {/* PROJECT SECTIONS */}
          <div className="px-8 py-10 sm:px-14">

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#A49588]">
                Design Details
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#5A0F14]">
                Project Specifications
              </h2>
            </div>


            <div className="space-y-10">

              {sections.map((section, index) => {
                const sectionData = project.sections[section.id];

                if (!sectionData) return null;

                const hasFields = Object.values(
                  sectionData.fields || {}
                ).some((value) => value?.trim?.());

                const hasDescription =
                  sectionData.description?.trim();

                const hasImages =
                  sectionData.images?.length > 0;

                if (!hasFields && !hasDescription && !hasImages) {
                  return null;
                }

                return (
                  <section
                    key={section.id}
                    className="border-t border-[#E5D9CC] pt-7"
                  >

                    {/* SECTION HEADING */}
                    <div className="flex items-start gap-4">

                      <span className="mt-1 text-sm font-medium text-[#B08D57]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="font-serif text-xl text-[#5A0F14]">
                          {section.title}
                        </h3>
                      </div>

                    </div>


                    {/* FIELDS */}
                    {hasFields && (
                      <div className="mt-5 space-y-4 pl-8">

                        {section.fields?.map((field) => {
                          const value =
                            sectionData.fields?.[field.id];

                          if (!value?.trim()) return null;

                          return (
                            <div key={field.id}>

                              <h4 className="text-sm font-medium text-[#6D5C4D]">
                                {field.label}
                              </h4>

                              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#70645A]">
                                {value}
                              </p>

                            </div>
                          );
                        })}

                      </div>
                    )}


                    {/* ADDITIONAL DESCRIPTION */}
                    {hasDescription && (
                      <div className="mt-5 pl-8">

                        <h4 className="text-sm font-medium text-[#6D5C4D]">
                          Additional Description
                        </h4>

                        <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#70645A]">
                          {sectionData.description}
                        </p>

                      </div>
                    )}


                    {/* IMAGES */}
                    {hasImages && (
                      <div className="mt-6 grid gap-4 pl-8 sm:grid-cols-2">

                        {sectionData.images.map((image) => (
                          <div
                            key={image.preview}
                            className="overflow-hidden rounded-xl border border-[#E5D9CC] bg-[#F5EFE6]"
                          >
                            <img
                              src={image.preview}
                              alt={`${section.title} design`}
                              className="aspect-[4/3] w-full object-cover"
                            />
                          </div>
                        ))}

                      </div>
                    )}

                  </section>
                );
              })}

            </div>

          </div>


          {/* FOOTER */}
          <div className="border-t border-[#E5D9CC] bg-[#FCFAF7] px-8 py-6 text-center sm:px-14">

            <p className="font-serif text-sm text-[#5A0F14]">
              Vaagdesha Interiors
            </p>

            <p className="mt-1 text-xs text-[#A49588]">
              Project Specification Document
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


function InfoItem({ icon, label, value }) {
  return (
    <div className="bg-white px-5 py-4">

      <div className="flex items-center gap-2 text-[#A49588]">
        {icon}
        <span className="text-xs uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-[#3E3E3E]">
        {value}
      </p>

    </div>
  );
}