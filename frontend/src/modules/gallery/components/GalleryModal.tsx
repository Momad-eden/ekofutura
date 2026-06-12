"use client";

import {
  useEffect,
} from "react";

import {
  X,
  Image as ImageIcon,
  PlayCircle,
} from "lucide-react";

import { GalleryItem } from "../types/gallery";

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryModal({
  item,
  onClose,
}: Props) {

  useEffect(() => {

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );

  }, [onClose]);

  if (!item) return null;

  const mediaLabel =
    item.media_type === "IMAGE"
      ? "Photo"
      : item.media_type === "VIDEO"
      ? "Vidéo"
      : "Reportage";

  const youtubeEmbedUrl =
    item.youtube_url
      ?.replace(
        "https://www.youtube.com/watch?v=",
        "https://www.youtube.com/embed/"
      )
      ?.replace(
        "https://youtu.be/",
        "https://www.youtube.com/embed/"
      );

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/90
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >

      <div
        className="
          relative
          w-full
          max-w-6xl
          max-h-[95vh]
          overflow-auto
          bg-card
          rounded-2xl
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* Bouton fermeture */}

        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-20
            bg-black/60
            hover:bg-black/80
            p-2
            rounded-full
            transition
          "
        >
          <X size={24} />
        </button>

        {/* Média */}

        {item.media_type === "IMAGE" &&
          item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="
                w-full
                max-h-[70vh]
                object-contain
                bg-black
              "
            />
          )}

        {item.media_type === "VIDEO" &&
          item.video && (
            <video
              controls
              className="
                w-full
                max-h-[70vh]
                bg-black
              "
            >
              <source
                src={item.video}
              />
            </video>
          )}

        {item.media_type === "YOUTUBE" &&
          youtubeEmbedUrl && (
            <div
              className="
                aspect-video
                w-full
              "
            >
              <iframe
                src={youtubeEmbedUrl}
                title={item.title}
                className="
                  w-full
                  h-full
                "
                allowFullScreen
              />
            </div>
          )}

        {/* Informations */}

        <div className="p-6">

          <div
            className="
              flex
              flex-wrap
              gap-3
              mb-4
            "
          >

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-green-600/20
                text-green-500
                text-sm
              "
            >
              {item.category}
            </span>

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-blue-600/20
                text-blue-400
                text-sm
                flex
                items-center
                gap-1
              "
            >
              {item.media_type === "IMAGE" ? (
                <ImageIcon size={14} />
              ) : (
                <PlayCircle size={14} />
              )}

              {mediaLabel}
            </span>

          </div>

          <h2
            className="
              text-3xl
              font-bold
              mb-3
            "
          >
            {item.title}
          </h2>

          <p
            className="
              text-sm
              text-slate-500
              mb-4
            "
          >
            {new Date(
              item.created_at
            ).toLocaleDateString(
              "fr-FR"
            )}
          </p>

          <p
            className="
              text-slate-300
              leading-7
            "
          >
            {item.description}
          </p>

        </div>

      </div>

    </div>
  );
}