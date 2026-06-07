import AlertsList from "@/modules/alerts/components/AlertsList";

export default function AlertsPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Alertes citoyennes
      </h1>

      <AlertsList />
    </main>
  );
}