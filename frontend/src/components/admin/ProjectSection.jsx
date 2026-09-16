import { useRef, useState } from "react";
import {
  ImagePlus,
  X,
  ChevronDown,
  Check,
} from "lucide-react";

export default function ProjectSection({
  title,
  fields = [],
  fieldValues = {},
  description,
  images,
  allowImages = true,
  onFieldChange,
  onDescriptionChange,
  onImagesChange,
  onRemoveImage,
}) {
  const fileInputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const hasDescription = description?.trim().length > 0;

  const hasFields = Object.values(fieldValues).some(
    (value) => value?.trim?.().length > 0
  );

  const hasImages = images?.length > 0;

  const isStarted = hasDescription || hasFields || hasImages;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    onImagesChange([...images, ...newImages]);

    e.target.value = "";
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5D9CC] bg-white shadow-sm">

      {/* =========================
          ACCORDION HEADER
      ========================== */}

      <button
        type="button"
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[#FCFAF7]"
      >
        <div className="flex min-w-0 items-center gap-4">

          {/* STATUS */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
              isStarted
                ? "border-[#5A0F14] bg-[#5A0F14] text-white"
                : "border-[#E5D9CC] bg-[#F5EFE6] text-[#8B7A6B]"
            }`}
          >
            {isStarted ? (
              <Check size={18} strokeWidth={2} />
            ) : (
              <span className="text-sm">+</span>
            )}
          </div>

          {/* TITLE */}
          <div className="min-w-0">

            <h3 className="truncate text-lg font-serif text-[#5A0F14]">
              {title}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#A49588]">

              {isStarted ? (
                <span className="text-[#7A5A35]">
                  Section started
                </span>
              ) : (
                <span>
                  Add specifications and 3D images
                </span>
              )}

              {hasImages && (
                <>
                  <span>•</span>

                  <span>
                    {images.length} image
                    {images.length !== 1 ? "s" : ""}
                  </span>
                </>
              )}

            </div>
          </div>
        </div>

        {/* CHEVRON */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5D9CC] text-[#6D5C4D] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>


      {/* =========================
          ACCORDION CONTENT
      ========================== */}

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">

          <div className="border-t border-[#E5D9CC] px-6 pb-6 pt-6">

            {/* =========================
                STRUCTURED FIELDS
            ========================== */}

            {fields.length > 0 && (
              <div className="space-y-5">

                {fields.map((field) => (
                  <div key={field.id}>

                    <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                      {field.label}
                    </label>

                    <textarea
                      value={fieldValues[field.id] || ""}
                      onChange={(e) =>
                        onFieldChange(field.id, e.target.value)
                      }
                      rows={3}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="w-full resize-y rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition placeholder:text-[#B5A79A] focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />

                  </div>
                ))}

              </div>
            )}


            {/* =========================
                ADDITIONAL DESCRIPTION
            ========================== */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-[#6D5C4D]">
                Additional Description
              </label>

              <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                rows={4}
                placeholder={`Add any additional details about ${title}...`}
                className="w-full resize-y rounded-xl border border-[#E5D9CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#3E3E3E] outline-none transition placeholder:text-[#B5A79A] focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
              />

            </div>


            {/* =========================
              IMAGE UPLOAD
          ========================== */}

          {allowImages && (
            <div className="mt-6">

              <div className="mb-3 flex items-center justify-between gap-3">

                <label className="text-sm font-medium text-[#6D5C4D]">
                  3D Design Images
                </label>

                <span className="text-xs text-[#A49588]">
                  JPG, PNG, WEBP
                </span>

              </div>

              <div className="flex flex-wrap gap-4">

                {/* IMAGE PREVIEWS */}

                {images.map((image, index) => (
                  <div
                    key={image?.preview || image?.url || index}
                    className="group relative h-36 w-36 overflow-hidden rounded-xl border border-[#E5D9CC] bg-[#F5EFE6]"
                  >

                    <img
                      src={image?.preview || image?.url}
                      alt={`${title} design ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage(index);
                      }}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                    >
                      <X size={15} />
                    </button>

                  </div>
                ))}

                {/* ADD IMAGE */}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex h-36 w-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#D7C8B8] bg-[#FCFAF7] text-[#9B8978] transition hover:border-[#B08D57] hover:bg-[#F8F1E8] hover:text-[#5A0F14]"
                >

                  <ImagePlus
                    size={26}
                    strokeWidth={1.5}
                  />

                  <span className="mt-2 text-sm font-medium">
                    Add Images
                  </span>

                  <span className="mt-1 text-xs">
                    Multiple allowed
                  </span>

                </button>

                {/* FILE INPUT */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

              </div>

              {hasImages && (
                <p className="mt-3 text-xs text-[#A49588]">
                  {images.length} image
                  {images.length !== 1 ? "s" : ""} added
                </p>
              )}

            </div>
          )}

          </div>

        </div>
      </div>

    </section>
  );
}