import Image from "next/image";
import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        mt-24
        border-t
        border-custom
        bg-card
      "
    >
      <div
        className="
          container
          mx-auto
          px-6
          py-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >
          {/* Présentation */}

          <div>
            <Image
              src="/logo.png"
              alt="EKOFUTURA"
              width={220}
              height={80}
              className="w-auto h-16"
            />

            <p
              className="
                mt-6
                text-slate-400
                leading-7
              "
            >
              Plateforme citoyenne de veille
              environnementale dédiée à la
              protection des écosystèmes
              sénégalais.
            </p>
          </div>

          {/* Navigation */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                mb-5
              "
            >
              Navigation
            </h3>

            <div
              className="
                flex
                flex-col
                gap-3
              "
            >
              <Link href="/">Accueil</Link>

              <Link href="/news">
                Actualités
              </Link>

              <Link href="/alertes">
                Alertes
              </Link>

              <Link href="/map">
                Carte
              </Link>

              <Link href="/gallery">
                Médiathèque
              </Link>

              <Link href="/a-propos">
                À propos
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                mb-5
              "
            >
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <Phone size={18} />
                <span>
                  +221 77 484 82 49
                </span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>
                  contact@ekofutura.org
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>
                  Dakar, Sénégal
                </span>
              </div>

            </div>
          </div>

          {/* Agir */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                mb-5
              "
            >
              Agir
            </h3>

            <Link
              href="/signaler"
              className="
                inline-flex
                bg-green-600
                hover:bg-green-700
                px-5
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Signaler un problème
            </Link>

           
          </div>

        </div>

        {/* Bas de page */}

        <div
          className="
            border-t
            border-custom
            mt-12
            pt-6
            text-center
            text-slate-500
          "
        >
          © {new Date().getFullYear()} EKOFUTURA · Tous droits réservésvés
        </div>

      </div>
    </footer>
  );
}