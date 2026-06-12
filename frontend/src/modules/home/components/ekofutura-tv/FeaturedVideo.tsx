"use client";

interface Props {
  video: any;
}

export default function FeaturedVideo({
  video,
}: Props) {
  if (!video) return null;

  const embedUrl =
    video.youtube_url.replace(
      "watch?v=",
      "embed/"
    ).replace(
      "youtu.be/",
      "www.youtube.com/embed/"
    );

  return (
    <div
      className="
        bg-card
        border
        border-custom
        rounded-3xl
        overflow-hidden
        shadow-2xl
      "
    >
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="p-8">
        <span
          className="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-red-600/20
            text-red-400
            text-sm
          "
        >
          🎥 Documentaire à la une
        </span>

        <h3
          className="
            mt-4
            text-3xl
            font-black
          "
        >
          {video.title}
        </h3>

        <p
          className="
            mt-4
            text-slate-400
            leading-8
          "
        >
          {video.description}
        </p>
      </div>
    </div>
  );
}