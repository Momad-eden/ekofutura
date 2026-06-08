import PartnersList from "@/modules/partners/components/PartnersList";

export default function PartnersPage() {
  return (
    <main
      className="
        container
        mx-auto
        px-6
        py-16
      "
    >
      <div className="text-center mb-16">

        <h1
          className="
            text-5xl
            font-bold
            mb-6
          "
        >
          Nos partenaires
        </h1>

        <p
          className="
            text-xl
            text-slate-400
          "
        >
          Ensemble pour un
          environnement durable.
        </p>

      </div>

      <PartnersList />

    </main>
  );
}