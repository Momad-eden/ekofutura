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

          <div className="flex items-center gap-4 mb-8">

            <Image
              src="/logo.png"
              alt="EKOFUTURA"
              width={90}
              height={90}
              priority
            />

            <div>

              <p className="text-green-400 uppercase tracking-[0.3em] font-semibold">
                EKOFUTURA
              </p>

              <p className="text-slate-300">
                Veille environnementale citoyenne
              </p>

            </div>

          </div>

          <h1 className="mt-6 text-6xl md:text-7xl font-black leading-tight">

            Protégeons aujourd'hui

            <span className="block text-green-500">
              le Sénégal de demain.
            </span>

          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-2xl">

            Une plateforme citoyenne
            dédiée à la surveillance
            environnementale, à la lutte
            contre la pollution plastique
            et au suivi de l'érosion côtière.

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
              className="border border-slate-600 px-6 py-3 rounded-xl"
            >
              Voir la carte
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}