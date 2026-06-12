"use client";

import { X } from "lucide-react";

import {
  getYoutubeEmbed,
} from "./utils/youtube";

interface Props {
  video: any;
  onClose: () => void;
}

export default function VideoModal({
  video,
  onClose,
}: Props) {
  if (!video) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/90
        z-50
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-5xl
          bg-card
          rounded-3xl
          overflow-hidden
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div
          className="
            flex
            justify-end
            p-4
          "
        >
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="aspect-video">
          <iframe
            src={getYoutubeEmbed(
              video.youtube_url
            )}
            className="
              w-full
              h-full
            "
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}