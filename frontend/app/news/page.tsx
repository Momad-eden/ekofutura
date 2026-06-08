import NewsList from "@/modules/news/components/NewsList";


export default function NewsPage() {
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
        Actualités environnementales
      </h1>

      <NewsList />
    </main>
  );
}