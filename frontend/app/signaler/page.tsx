import AlertForm from "@/modules/alerts/components/AlertForm";

export default function SignalerPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Signaler un problème environnemental
      </h1>

      <AlertForm />
    </main>
  );
}