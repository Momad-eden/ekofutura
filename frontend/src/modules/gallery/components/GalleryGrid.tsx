"use client";

import { useEffect, useState } from "react";

import {
  getGalleryItems,
  getFeaturedItems,
} from "../services/gallery.service";

import GalleryCard from "./GalleryCard";
import GalleryFilter from "./GalleryFilter";
import GalleryModal from "./GalleryModal";

import {
  GalleryItem,
} from "../types/gallery";

export default function GalleryGrid() {

  const [items, setItems] =
    useState<GalleryItem[]>([]);

  const [featured, setFeatured] =
    useState<GalleryItem[]>([]);

  const [mediaType, setMediaType] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadGallery();
  }, [mediaType, search]);

  useEffect(() => {
    loadFeatured();
  }, []);

  async function loadGallery() {

    try {

      setLoading(true);

      const data =
        await getGalleryItems(
          mediaType,
          search
        );

      setItems(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function loadFeatured() {

    try {

      const data =
        await getFeaturedItems();

      setFeatured(data);

    } catch (error) {

      console.error(error);

    }
  }

  return (
    <div>

      {/* Contenus à la une */}

      {featured.length > 0 && (

        <section className="mb-14">

          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            ⭐ À la une
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
            "
          >
            {featured.map((item) => (

              <GalleryCard
                key={item.id}
                item={item}
                onClick={() =>
                  setSelectedItem(item)
                }
              />

            ))}
          </div>

        </section>

      )}

      {/* Recherche */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Rechercher un contenu..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-xl
            border
            border-custom
            bg-card
          "
        />

      </div>

      {/* Filtre */}

      <GalleryFilter
        value={mediaType}
        onChange={setMediaType}
      />

      {/* Nombre de résultats */}

      {!loading && (
        <p
          className="
            mb-6
            text-sm
            text-slate-500
          "
        >
          {items.length} contenu(x)
          trouvé(s)
        </p>
      )}

      {/* Chargement */}

      {loading && (

        <div
          className="
            text-center
            py-16
            text-slate-500
          "
        >
          Chargement de la médiathèque...
        </div>

      )}

      {/* Aucun résultat */}

      {!loading &&
        items.length === 0 && (

          <div
            className="
              text-center
              py-16
              bg-card
              border
              border-custom
              rounded-2xl
            "
          >
            Aucun contenu trouvé.
          </div>

      )}

      {/* Grille */}

      {!loading &&
        items.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >
            {items.map((item) => (

              <GalleryCard
                key={item.id}
                item={item}
                onClick={() =>
                  setSelectedItem(item)
                }
              />

            ))}
          </div>

      )}

      {/* Modal */}

      <GalleryModal
        item={selectedItem}
        onClose={() =>
          setSelectedItem(null)
        }
      />

    </div>
  );
}