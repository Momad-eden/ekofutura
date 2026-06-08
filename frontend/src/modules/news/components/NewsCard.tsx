import Link from "next/link";

import { News } from "../types/news";

interface Props {
  article: News;
}

export default function NewsCard({
  article,
}: Props) {
  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        overflow-hidden
        border
        border-slate-700
        shadow-lg
      "
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="
            w-full
            h-56
            object-cover
          "
        />
      )}

      <div className="p-6">

        <h2
          className="
            text-xl
            font-bold
            mb-3
          "
        >
          {article.title}
        </h2>

        <p
          className="
            text-slate-300
            mb-4
          "
        >
          {article.summary}
        </p>

        <Link
          href={`/news/${article.slug}`}
          className="
            text-green-400
            hover:text-green-300
            font-semibold
          "
        >
          Lire l'article →
        </Link>

      </div>
    </div>
  );
}