import { useQuery } from "@tanstack/react-query";
import { fetchAttractions } from "../hooks/geoapify";

export default function POIList({ lat, lon }) {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pois", lat, lon],
    queryFn: () => fetchAttractions(lat, lon),
    enabled: Boolean(lat && lon),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  /* ---------- Loading ---------- */
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-slate-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (isError) {
    return (
      <div className="bg-rose-50 text-rose-700 rounded-2xl shadow p-5">
        Failed to load attractions.
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-5 text-slate-500">
        No attractions found nearby.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5 space-y-4">
      <h3 className="text-lg font-semibold">Nearby Attractions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((poi) => {
          const props = poi.properties || {};

          return (
            <div
              key={props.place_id}
              className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
            >
              <div className="font-medium text-slate-900">
                {props.name || "Unnamed place"}
              </div>

              {props.categories?.length > 0 && (
                <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {props.categories.join(", ")}
                </div>
              )}

              {props.distance && (
                <div className="text-xs text-slate-500 mt-2">
                  {(props.distance / 1000).toFixed(1)} km away
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
