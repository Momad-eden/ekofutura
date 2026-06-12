import GalleryGrid from "@/modules/gallery/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <main
      className="
        container
        mx-auto
        px-4
        md:px-6
        py-12
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
          text-center
          mb-14
        "
      >
        <div
          className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-green-600/20
            text-green-500
            font-medium
            mb-6
          "
        >
          Médiathèque EKOFUTURA
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          "
        >
          Galerie
          <span className="block text-green-500">
            environnementale
          </span>
        </h1>

        <p
          className="
            text-lg
            text-slate-400
            leading-8
          "
        >
          Découvrez nos reportages,
          événements et actions en faveur
          de l'environnement au Sénégal.
        </p>
      </div>

      <GalleryGrid />

    </main>
  );
}