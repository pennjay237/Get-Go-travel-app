import React, { useEffect, useState } from "react";

export default function LanguageCard({ countryCode }) {
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!countryCode) return;
    let cancelled = false;

    async function fetchLanguages() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!res.ok) throw new Error("Failed to fetch country data");
        const data = await res.json();
        if (cancelled) return;

        const langObj = data?.[0]?.languages || {};
        const langArray = Object.values(langObj);
        setLanguages(langArray);
        setStatus("success");
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        if (!cancelled) setStatus("error");
      }
    }

    fetchLanguages();
    return () => {
      cancelled = true;
    };
  }, [countryCode]);

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 animate-pulse transition-colors">
        <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow p-5 transition-colors">
        <h3 className="font-semibold mb-1">Languages</h3>
        <p className="text-sm">Language information unavailable</p>
      </div>
    );
  }

  if (!languages.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow p-5 space-y-4 transition-colors">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        🗣 Languages Spoken
      </h3>

      <div className="flex flex-wrap gap-2">
        {languages.map((lang, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-full text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-100 dark:border-blue-800"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}