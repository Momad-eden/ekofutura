"use client";

import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getYoutubeVideos,
} from "../../services/home.service";

import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export default function EkofuturaTV() {

  const [videos, setVideos] =
    useState<any[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedVideo, setSelectedVideo] =
    useState<any>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
  try {
    const data = await getYoutubeVideos();

    // Mettre les vidéos "À la une" en premier
    const sortedVideos = [...data].sort(
      (a, b) =>
        Number(b.featured) -
        Number(a.featured)
    );

    setVideos(sortedVideos);

    // Positionner le carrousel
    // sur la première vidéo à la une
    const featuredIndex =
      sortedVideos.findIndex(
        (video) => video.featured
      );

    setCurrentIndex(
      featuredIndex >= 0
        ? featuredIndex
        : 0
    );

  } catch (error) {
    console.error(
      "Erreur chargement vidéos :",
      error
    );
  }
}
  function nextSlide() {
    setCurrentIndex((prev) =>
      prev === videos.length - 1
        ? 0
        : prev + 1
    );
  }

  function prevSlide() {
    setCurrentIndex((prev) =>
      prev === 0
        ? videos.length - 1
        : prev - 1
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-24">

      <div className="text-center mb-14">

        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-4
          "
        >
          EKOFUTURA TV
        </h2>

        <p className="text-slate-400">
          Reportages, documentaires
          et récits environnementaux.
        </p>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block">

        <div className="relative">

          <button
            onClick={prevSlide}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-30
              bg-card
              border
              border-custom
              rounded-full
              p-3
            "
          >
            <ChevronLeft />
          </button>

          <div
            className="
              flex
              justify-center
              items-center
              gap-6
            "
          >
            {videos.map((video, index) => {

              const offset =
                index - currentIndex;

              const visible =
                offset >= -2 &&
                offset <= 2;

              if (!visible) {
                return null;
              }

              return (
                <div
                  key={video.id}
                  className={`
                    transition-all
                    duration-500

                    ${
                      offset === 0
                        ? "w-[480px]"
                        : "w-[280px]"
                    }
                  `}
                >
                  <VideoCard
                    video={video}
                    active={
                      offset === 0
                    }
                    onClick={() =>
                      setSelectedVideo(
                        video
                      )
                    }
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-30
              bg-card
              border
              border-custom
              rounded-full
              p-3
            "
          >
            <ChevronRight />
          </button>

        </div>

      </div>

      {/* Mobile */}

      <div
        className="
          lg:hidden
          flex
          overflow-x-auto
          gap-5
          pb-4
          snap-x
        "
      >
        {videos.map((video) => (

          <div
            key={video.id}
            className="
              min-w-[90%]
              snap-center
            "
          >
            <VideoCard
              video={video}
              active
              onClick={() =>
                setSelectedVideo(video)
              }
            />
          </div>

        ))}
      </div>

      {/* Indicateurs */}

      <div
        className="
          flex
          justify-center
          gap-3
          mt-10
        "
      >
        {videos.map((_, index) => (

          <button
            key={index}
            onClick={() =>
              setCurrentIndex(index)
            }
            className={`
              w-3
              h-3
              rounded-full
              transition

              ${
                currentIndex === index
                  ? "bg-green-500"
                  : "bg-slate-600"
              }
            `}
          />

        ))}
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() =>
          setSelectedVideo(null)
        }
      />

    </section>
  );
}