import React, { useEffect, useState } from "react";

export default function AttractionModal({ place, onClose }) {
  const [wiki, setWiki] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchWiki() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            place.properties.name
          )}`
        );

        if (!res.ok) throw new Error("Wiki not found");

        const data = await res.json();
        if (!cancelled) setWiki(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWiki();
    return () => (cancelled = true);
  }, [place]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden relative transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-700/90 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 shadow transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-64 w-full bg-gray-200 dark:bg-gray-700">
          <img
            src={
              place.image ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={place.properties.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">
              {place.properties.name || "Unnamed Place"}
            </h2>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full capitalize">
              {place.category}
            </span>
          </div>

          {loading && (
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">
              Loading information…
            </p>
          )}

          {error && (
            <p className="text-gray-500 dark:text-gray-400">
              No additional information available for this location.
            </p>
          )}

          {!loading && !error && wiki?.extract && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {wiki.extract}
            </p>
          )}

          {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
            >
              Read more on Wikipedia →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}