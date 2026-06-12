"use client";

interface Props {
  videos: any[];
}

export default function VideoCarousel({
  videos,
}: Props) {
  return (
    <div
      className="
        flex
        gap-6
        overflow-x-auto
        pb-4
      "
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className="
            min-w-[300px]
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
          <img
            src={
              video.thumbnail ||
              "/images/hero.jpg"
            }
            alt={video.title}
            className="
              w-full
              h-48
              object-cover
            "
          />

          <div className="p-5">
            <h4
              className="
                font-bold
                mb-2
              "
            >
              {video.title}
            </h4>

            <p
              className="
                text-sm
                text-slate-400
                line-clamp-2
              "
            >
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}