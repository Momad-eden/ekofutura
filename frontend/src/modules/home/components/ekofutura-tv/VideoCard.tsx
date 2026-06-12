"use client";

import {
  PlayCircle,
} from "lucide-react";

import {
  getYoutubeThumbnail,
} from "./utils/youtube";

interface Props {
  video: any;
  active?: boolean;
  onClick: () => void;
}

export default function VideoCard({
  video,
  active = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-custom
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2

        ${
          active
            ? "scale-110 z-20"
            : "scale-90 opacity-70"
        }
      `}
    >
      <img
        src={
          video.thumbnail ||
          getYoutubeThumbnail(
            video.youtube_url
          )
        }
        alt={video.title}
        className="
          w-full
          h-72
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/30
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <PlayCircle
          size={60}
          className="text-white"
        />
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-5
          text-left
        "
      >
        <h3 className="font-bold">
          {video.title}
        </h3>

        <p
          className="
            text-sm
            text-slate-300
            line-clamp-2
          "
        >
          {video.description}
        </p>
      </div>
    </button>
  );
}