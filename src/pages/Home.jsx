import Navbar from "../components/Layout/Navbar";
import PageContainer from "../components/Layout/PageContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <PageContainer>
        <section className="flex flex-col items-center justify-center text-center mt-10">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Discover Your Next Destination
          </h1>

          <p className="text-lg text-gray-600 mt-4 max-w-xl">
            Weather, attractions, currency, tours, airports — everything in one place.
          </p>

          <div className="mt-10 w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for a destination..."
              className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
          </div>

          <div className="mt-16">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Travel Hero"
              className="rounded-2xl shadow-lg w-full max-w-3xl object-cover"
            />
          </div>
        </section>
      </PageContainer>

    </div>
  );
}
