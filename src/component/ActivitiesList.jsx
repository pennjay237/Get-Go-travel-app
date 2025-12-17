import React, { useEffect, useState } from "react";
import { fetchAttractions } from "../hooks/geoapify";
import { fetchPlaceImage } from "../hooks/unsplash";
import AttractionModal from "./AttractionModal";

export default function ActivitiesList({
  lat,
  lon,
  city,
  country,
  limit = 10,
}) {
  const [activities, setActivities] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    let cancelled = false;

    async function loadActivities() {
      setLoading(true);
      setError(null);

      try {
        const categories = [
          "tourist_attraction",
          "museum",
          "park",
          "entertainment",
        ];

        let results = [];

        for (const cat of categories) {
          const data = await fetchAttractions(lat, lon, limit, cat);
          if (data?.length) results.push(...data);
        }

        const unique = Array.from(
          new Map(results.map(p => [p.properties.place_id, p])).values()
        );

        const enriched = await Promise.all(
          unique.map(async (poi) => {
            const name = poi.properties.name || "Attraction";
            const image = await fetchPlaceImage(name, city, country);

            return {
              ...poi,
              image,
              category: resolveCategory(poi),
            };
          })
        );

        enriched.sort(
          (a, b) =>
            categoryPriority(a.category) -
            categoryPriority(b.category)
        );

        if (!cancelled) setActivities(enriched);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load attractions");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadActivities();
    return () => (cancelled = true);
  }, [lat, lon, city, country, limit]);

  /* States */
  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-500">
        Loading attractions…
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-red-600">
        {error}
      </div>
    );

  if (!activities.length)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-500">
        No attractions found.
      </div>
    );

  return (
    <>
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h3 className="text-2xl font-bold">
          Attractions & Activities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.slice(0, visible).map((poi) => (
            <div
              key={poi.properties.place_id}
              onClick={() => setSelected(poi)}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
            >
              {/* Image */}
              <div className="relative h-44">
                <img
                  src={
                    poi.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={poi.properties.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-lg line-clamp-2">
                  {poi.properties.name || "Unnamed place"}
                </h4>

                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full capitalize">
                  {poi.category}
                </span>

                {poi.properties.distance && (
                  <p className="text-sm text-gray-500">
                    {(poi.properties.distance / 1000).toFixed(1)} km away
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {visible < activities.length && (
          <div className="text-center">
            <button
              onClick={() => setVisible(v => v + 6)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Show more
            </button>
          </div>
        )}
      </section>

      {/* MODAL */}
      {selected && (
        <AttractionModal
          place={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

/* Helpers */
function resolveCategory(poi) {
  const raw = poi.properties?.datasource?.raw;
  if (!raw) return "Attraction";
  if (raw.museum) return "Museum";
  if (raw.tourism) return raw.tourism.replace("_", " ");
  if (raw.amenity) return raw.amenity.replace("_", " ");
  return "Attraction";
}

function categoryPriority(category) {
  if (category === "Museum") return 1;
  if (category.includes("park")) return 2;
  return 3;
}
