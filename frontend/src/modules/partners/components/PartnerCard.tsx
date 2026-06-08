import { Partner } from "../types/partner";

interface Props {
  partner: Partner;
}

export default function PartnerCard({
  partner,
}: Props) {
  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-6
        hover:border-green-500
        transition
      "
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="
          h-24
          mx-auto
          object-contain
          mb-6
        "
      />

      <h3
        className="
          text-xl
          font-bold
          text-center
          mb-3
        "
      >
        {partner.name}
      </h3>

      <p
        className="
          text-slate-300
          text-center
        "
      >
        {partner.description}
      </p>
    </a>
  );
}