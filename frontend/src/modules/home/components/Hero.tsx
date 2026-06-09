import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative container mx-auto px-6">

        <div className="max-w-4xl">


          <p
            className="
              inline-flex
              items-center
              bg-yellow-500
              text-black
              font-semibold
              px-5
              py-2
              rounded-full
            "
          >
            Veille environnementale citoyenne
          </p>


          

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">

            Protégeons aujourd'hui

            <span className="block text-green-500">
              le Sénégal de demain.
            </span>

          </h1>

          <p
            className="
              mt-8
              text-lg
              md:text-xl
              text-slate-300
              max-w-2xl
            "
          >

             Une plateforme citoyenne dédiée à la
            protection de l'environnement, à la
            sensibilisation écologique et à la
            promotion du développement durable.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/signaler"
              className="eko-btn"
            >
              Signaler un problème
            </Link>

            <Link
              href="/map"
              className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-3 rounded-xl"
            >
              Voir la carte
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}