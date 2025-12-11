export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">GetGo</h1>

        <div className="flex items-center gap-6 text-gray-600 font-medium">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
        </div>
      </div>
    </nav>
  );
}
