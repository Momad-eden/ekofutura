import {
  Image as ImageIcon,
  PlayCircle,
  Star,
} from "lucide-react";

import { GalleryItem } from "../types/gallery";

interface Props {
  item: GalleryItem;
  onClick?: () => void;
}

const categoryLabels: Record<string, string> = {
  EROSION: "Érosion côtière",
  PLASTIC: "Pollution plastique",
  EVENT: "Événement",
  REPORTAGE: "Reportage",
  BIODIVERSITY: "Biodiversité",
  INTERVIEW: "Interview",
  OTHER: "Autre",
};

export default function GalleryCard({
  item,
  onClick,
}: Props) {
  const preview =
    item.thumbnail ||
    item.image ||
    "/images/placeholder.jpg";

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          onClick?.();
        }
      }}
      className="
        cursor-pointer
        bg-card
        border
        border-custom
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:-translate-y-1
        transition
      "
    >
      <div className="relative">

        <img
          src={preview}
          alt={item.title}
          className="
            w-full
            h-64
            object-cover
            transition
            duration-300
            hover:scale-110
          "
        />

        {item.featured && (
          <div
            className="
              absolute
              top-3
              left-3
              bg-yellow-500
              text-black
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              flex
              items-center
              gap-1
            "
          >
            <Star size={14} />
            À la une
          </div>
        )}

        <div
          className="
            absolute
            top-3
            right-3
            bg-black/70
            text-white
            px-3
            py-1
            rounded-full
            text-xs
            flex
            items-center
            gap-1
          "
        >
          {item.media_type === "IMAGE" && (
            <>
              <ImageIcon size={14} />
              Photo
            </>
          )}

          {item.media_type === "VIDEO" && (
            <>
              <PlayCircle size={14} />
              Vidéo
            </>
          )}

          {item.media_type === "YOUTUBE" && (
            <>
              <PlayCircle size={14} />
              Reportage
            </>
          )}
        </div>

      </div>

      <div className="p-5">

        <span
          className="
            inline-block
            mb-3
            px-3
            py-1
            rounded-full
            bg-green-600/20
            text-green-500
            text-sm
          "
        >
          {categoryLabels[item.category] ||
            item.category}
        </span>

        <h3
          className="
            text-xl
            font-bold
            mb-2
          "
        >
          {item.title}
        </h3>

        <p className="text-slate-400 line-clamp-3">
          {item.description}
        </p>

        <p
          className="
    mt-4
    text-sm
    text-slate-500
  "
        >
          {new Date(
            item.created_at
          ).toLocaleDateString(
            "fr-FR"
          )}
        </p>

      </div>
    </article>
  );
}