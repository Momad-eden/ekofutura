"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getPartners,
} from "../services/partners.service";

import PartnerCard from "./PartnerCard";

import {
  Partner,
} from "../types/partner";

export default function PartnersList() {

  const [partners, setPartners] =
    useState<Partner[]>([]);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {

    try {

      const data =
        await getPartners();

      setPartners(data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {partners.map((partner) => (
        <PartnerCard
          key={partner.id}
          partner={partner}
        />
      ))}
    </div>
  );
}