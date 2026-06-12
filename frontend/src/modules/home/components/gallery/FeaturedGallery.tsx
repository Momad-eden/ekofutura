"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Image as ImageIcon,
  PlayCircle,
  Star,
} from "lucide-react";

import {
  getFeaturedItems,
} from "@/modules/gallery/services/gallery.service";

import type {
  GalleryItem,
} from "@/modules/gallery/types/gallery";

export default function FeaturedGallery() {
  const [items, setItems] =
    useState<GalleryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data =
        await getFeaturedItems();

      setItems(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400">
            Chargement de la galerie...
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-24">

      <div className="container mx-auto px-6">

        <div className="text-center mb-14">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-green-600/15
              text-green-500
              font-medium
            "
          >
            <Star size={16} />
            À la une
          </div>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-black
            "
          >
            Histoires du terrain
          </h2>

          <p
            className="
              mt-4
              text-slate-400
              max-w-3xl
              mx-auto
              leading-8
            "
          >
            Découvrez les initiatives,
            reportages et actions citoyennes
            qui façonnent l'avenir
            environnemental du Sénégal.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {items.map((item) => {

            const preview =
              item.thumbnail ||
              item.image ||
              "/images/placeholder.jpg";

            return (
              <article
                key={item.id}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  bg-card
                  border
                  border-custom
                  shadow-lg
                  transition
                  hover:-translate-y-2
                "
              >
                <div className="relative overflow-hidden">

                  <img
                    src={preview}
                    alt={item.title}
                    className="
                      w-full
                      h-80
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute
                      top-4
                      right-4
                      bg-black/70
                      text-white
                      px-3
                      py-1
                      rounded-full
                      flex
                      items-center
                      gap-2
                      text-sm
                    "
                  >
                    {item.media_type ===
                    "IMAGE" ? (
                      <>
                        <ImageIcon size={16} />
                        Photo
                      </>
                    ) : (
                      <>
                        <PlayCircle size={16} />
                        Vidéo
                      </>
                    )}
                  </div>

                </div>

                <div className="p-6">

                  <span
                    className="
                      inline-block
                      px-3
                      py-1
                      rounded-full
                      bg-green-600/15
                      text-green-500
                      text-sm
                    "
                  >
                    {item.category}
                  </span>

                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-bold
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-slate-400
                      leading-7
                    "
                  >
                    {item.description}
                  </p>

                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-14">

          <Link
            href="/gallery"
            className="
              inline-flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
              px-7
              py-4
              rounded-xl
              font-semibold
              transition
            "
          >
            Explorer la galerie

            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}