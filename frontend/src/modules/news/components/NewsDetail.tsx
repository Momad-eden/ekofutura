"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getNewsDetail,
} from "../services/news.service";

export default function NewsDetail({
  slug,
}: {
  slug: string;
}) {
  const [article, setArticle] =
    useState<any>(null);

  useEffect(() => {
    loadArticle();
  }, []);

  async function loadArticle() {
    try {
      const data =
        await getNewsDetail(slug);

      setArticle(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        Chargement...
      </div>
    );
  }

  return (
    <article
      className="
        max-w-4xl
        mx-auto
        px-6
        py-12
      "
    >
      <h1
        className="
          text-5xl
          font-bold
          mb-6
        "
      >
        {article.title}
      </h1>

      <p
        className="
          text-slate-400
          mb-8
        "
      >
        {new Date(
          article.created_at
        ).toLocaleDateString("fr-FR")}
      </p>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="
            w-full
            rounded-2xl
            mb-10
            max-h-[500px]
            object-cover
          "
        />
      )}

      <p
        className="
          text-xl
          text-slate-300
          mb-10
          leading-8
        "
      >
        {article.summary}
      </p>

      <div
        className="
          leading-8
          text-lg
          text-slate-200
        "
      >
        {article.content}
      </div>
    </article>
  );
}