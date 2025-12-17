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

  /* ---------- States ---------- */

  if (status === "loading") {
    return (
      <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
        <div className="h-5 w-36 bg-slate-200 rounded mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 bg-slate-100 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-1">Languages</h3>
        <p className="text-sm">Language information unavailable.</p>
      </div>
    );
  }

  if (!languages.length) return null;

  /* ---------- Success ---------- */

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        🗣 Languages Spoken
      </h3>

      <div className="flex flex-wrap gap-2">
        {languages.map((lang, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-sm
                       bg-blue-50 text-blue-700 font-medium"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
