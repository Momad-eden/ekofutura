import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
      mt-24
      border-t
      border-slate-800
      bg-slate-950
    "
    >
      <div
        className="
        container mx-auto
        px-6
        py-16
      "
      >
        <div
          className="
          grid
          md:grid-cols-3
          gap-12
        "
        >
          <div>

            <Image
              src="/logo.png"
              alt="EKOFUTURA"
              width={220}
              height={80}
              style={{
                width: "auto",
                height: "auto",
              }}
            />

            <p
              className="
              mt-6
              text-slate-400
            "
            >
              Plateforme citoyenne de veille
              environnementale dédiée à la
              protection des écosystèmes
              sénégalais.
            </p>

          </div>

          <div>

            <h3
              className="
              text-lg
              font-semibold
              mb-4
            "
            >
              Navigation
            </h3>

            <div
              className="
              flex
              flex-col
              gap-3
              text-slate-400
            "
            >
              <Link href="/">
                Accueil
              </Link>

              <Link href="/news">
                Actualités
              </Link>

              <Link href="/alertes">
                Alertes
              </Link>

              <Link href="/gallery">
                Médiathèque
              </Link>

              <Link href="/a-propos">
                À propos
              </Link>

              <Link href="/map">
                Carte
              </Link>

              <Link href="/partenaires">
                Partenaires
              </Link>

              <Link href="/contact">
                Contact
              </Link>
            </div>

          </div>

          <div>

            <h3
              className="
              text-lg
              font-semibold
              mb-4
            "
            >
              Agir
            </h3>

            <Link
              href="/signaler"
              className="
              inline-block
              bg-green-600
              hover:bg-green-700
              px-5
              py-3
              rounded-xl
              font-semibold
            "
            >
              Signaler un problème
            </Link>

          </div>

        </div>

        <div
          className="
          border-t
          border-slate-800
          mt-12
          pt-6
          text-center
          text-slate-500
        "
        >
          © 2026 EKOFUTURA • Tous droits réservés
        </div>

      </div>
    </footer>
  );
}