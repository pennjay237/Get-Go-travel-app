export default function TestApp() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4"></div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Diagnostic Test Running
            </h1>
            <p className="text-gray-600">
              If you see this, Tailwind + React + Vite are all working!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">React</h3>
              <p className="text-sm">Functional components</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">Tailwind</h3>
              <p className="text-sm">Utility classes working</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-700 mb-2">Vite</h3>
              <p className="text-sm">Fast refresh enabled</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}