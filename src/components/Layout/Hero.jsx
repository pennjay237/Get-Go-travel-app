import React from "react";
export default function Hero() {
  return (
    <section
      className="h-[60vh] flex items-center justify-center text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Plan Your Trip in One Place
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Weather, attractions, currency, language & airports — all in one app.
        </p>
      </div>
    </section>
  );
}

