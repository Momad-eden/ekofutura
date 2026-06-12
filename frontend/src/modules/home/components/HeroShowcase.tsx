import Image from "next/image";

export default function HeroShowcase() {
  return (
    <>
      {/* ===== Desktop ===== */}

      <div className="hidden lg:block">

        {/* Nettoyage : haut-centre */}

        <div
          className="
            absolute
            top-0
            left-[52%]
            -translate-x-1/2
            w-[340px]
            rounded-[32px]
            overflow-hidden
            border
            border-white/15
            shadow-2xl
            bg-white/5
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-2
            hover:scale-[1.02]
          "
        >
          <div className="relative">

            <Image
              src="/images/nettoyage_plage.jpeg"
              alt="Nettoyage des plages"
              width={500}
              height={320}
              quality={100}
              sizes="320px"
              className="
                w-full
                h-[320px]
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
              "
            >
              <span
                className="
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-green-600
                  text-sm
                  font-bold
                "
              >
                REPORTAGE
              </span>

              <h3
                className="
                  mt-4
                  text-2xl
                  font-black
                "
              >
                Nettoyage des plages
              </h3>

              <p className="mt-2 text-slate-300">
                Mobilisation citoyenne
                pour préserver notre littoral.
              </p>
            </div>

          </div>
        </div>

        {/* Sensibilisation : bas-droite */}

        <div
            className="
                absolute
                bottom-0
                right-0
                w-[270px]
                rounded-[32px]
                overflow-hidden
                border
                border-white/15
                shadow-2xl
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:scale-[1.02]
            "
        >
          <div className="relative">

            <Image
              src="/images/sensibilisation.jpeg"
              alt="Sensibilisation"
              width={400}
              height={320}
              quality={100}
              sizes="270px"
              className="
                w-full
                h-[320px]
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
              "
            >
              <span
                className="
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-yellow-500
                  text-black
                  text-sm
                  font-bold
                "
              >
                COMMUNAUTÉ
              </span>

              <h3
                className="
                  mt-4
                  text-xl
                  font-black
                "
              >
                Sensibilisation
              </h3>

              <p className="mt-2 text-slate-300 text-sm">
                Éduquer et inspirer
                les générations futures.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ===== Mobile ===== */}

      <div
        className="
          lg:hidden
          mt-12
          space-y-6
        "
      >

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/15
            shadow-xl
          "
        >
          <Image
            src="/images/nettoyage_plage.jpeg"
            alt="Nettoyage"
            width={800}
            height={400}
            quality={100}
            className="
              w-full
              h-[240px]
              object-cover
            "
          />
        </div>

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/15
            shadow-xl
          "
        >
          <Image
            src="/images/sensibilisation.jpeg"
            alt="Sensibilisation"
            width={800}
            height={400}
            quality={100}
            className="
              w-full
              h-[240px]
              object-cover
            "
          />
        </div>

      </div>
    </>
  );
}