"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  Home,
  Newspaper,
  TriangleAlert,
  Map,
  Images,
  Info,
  Users,
  Phone,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeToggle from "./ThemeToggle";

const links = [
  {
    href: "/",
    label: "Accueil",
    icon: Home,
  },
  {
    href: "/news",
    label: "Actualités",
    icon: Newspaper,
  },
  {
    href: "/alertes",
    label: "Alertes",
    icon: TriangleAlert,
  },
  {
    href: "/map",
    label: "Carte",
    icon: Map,
  },
  {
    href: "/gallery",
    label: "Médiathèque",
    icon: Images,
  },
  {
    href: "/a-propos",
    label: "À propos",
    icon: Info,
  },
  {
    href: "/partenaires",
    label: "Partenaires",
    icon: Users,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Phone,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          bg-background/90
          border-b
          border-custom
        "
      >
        <div
          className="
            container
            mx-auto
            px-4
            lg:px-6
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
              width={220}
              height={80}
              priority
              className="
                h-16
                w-auto
                object-contain
              "
            />
          </Link>

          <nav
            className="
              hidden
              xl:flex
              items-center
              gap-6
              font-medium
            "
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-green-500"
                    : "hover:text-green-500 transition"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <ThemeToggle />

            <Link
              href="/signaler"
              className="
                hidden
                md:inline-flex
                bg-green-600
                hover:bg-green-700
                px-5
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Signaler
            </Link>

            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="
                xl:hidden
                p-2
              "
            >
              {isOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-background
            flex
            flex-col
            justify-center
            items-center
            gap-8
          "
        >
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className="
                  flex
                  items-center
                  gap-3
                  text-2xl
                  font-semibold
                "
              >
                <Icon size={24} />
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/signaler"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              mt-4
              bg-green-600
              hover:bg-green-700
              px-8
              py-4
              rounded-xl
              font-semibold
            "
          >
            Signaler un problème
          </Link>
        </div>
      )}
    </>
  );
}