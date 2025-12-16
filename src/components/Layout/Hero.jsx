import React from "react";

export default function Hero() {
  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502920917128-1aa500764ce7')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Plan Your Trip in One Place
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Weather, attractions, currency, language & airports — all in one
          search.
        </p>
      </div>
    </section>
  );
}
