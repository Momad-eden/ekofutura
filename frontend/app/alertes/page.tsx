import AlertsList from "@/modules/alerts/components/AlertsList";

export default function AlertsPage() {
  return (
    <main
      className="
        container
        mx-auto
        px-4
        md:px-6
        py-12
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
          text-center
          mb-14
        "
      >
        <div
          className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-green-600/20
            text-green-500
            font-medium
            mb-6
          "
        >
          Veille environnementale citoyenne
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          "
        >
          Alertes
          <span className="block text-green-500">
            environnementales validées
          </span>
        </h1>

        <p
          className="
            text-lg
            text-slate-400
            leading-8
          "
        >
          Consultez les signalements validés
          transmis par les citoyens concernant
          la pollution plastique, l'érosion
          côtière, les déchets sauvages,
          les inondations et d'autres enjeux
          environnementaux au Sénégal.
        </p>
      </div>

      <AlertsList />
    </main>
  );
}