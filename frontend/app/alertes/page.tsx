import AlertsList
from "@/modules/alerts/components/AlertsList";

export default function AlertsPage() {
  return (
    <main
      className="
        container
        mx-auto
        px-6
        py-12
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-10
          text-center
        "
      >
        Alertes validées
      </h1>

      <AlertsList />
    </main>
  );
}