import { useQuery } from "@tanstack/react-query";
import { fetchAttractions } from "../../hooks/geoapify";

export default function POIList({ lat, lon }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pois", lat, lon],
    queryFn: () => fetchAttractions(lat, lon),
    enabled: !!lat && !!lon,
  });

  if (isLoading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 animate-pulse transition-colors">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl shadow p-5 transition-colors">
        Failed to load attractions
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow p-5 space-y-4 transition-colors">
      <h3 className="font-semibold">Attractions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data?.map((p) => (
          <div
            key={p.properties.place_id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="font-medium">{p.properties.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {p.properties.categories?.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}