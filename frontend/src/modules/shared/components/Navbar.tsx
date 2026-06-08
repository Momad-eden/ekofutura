import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="
      sticky top-0 z-50
      backdrop-blur-xl
      bg-slate-950/80
      border-b border-slate-800
    "
    >
      <div
        className="
        container mx-auto
        px-6
        h-24
        flex
        items-center
        justify-between
      "
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="EKOFUTURA"
            width={180}
            height={60}
            style={{
              width: "auto",
              height: "auto",
            }}
            priority
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex gap-8 font-medium">

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

        </nav>

        <Link
          href="/signaler"
          className="
          bg-green-600
          hover:bg-green-700
          px-5 py-3
          rounded-xl
          font-semibold
          transition
        "
        >
          Signaler
        </Link>
      </div>
    </header>
  );
}