"use client";

import { useEffect, useState } from "react";

import { getNews } from "../services/news.service";

import NewsCard from "./NewsCard";

import { News } from "../types/news";

export default function NewsList() {
  const [articles, setArticles] =
    useState<News[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const data = await getNews();
      setArticles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        Chargement...
      </div>
    );
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
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
}