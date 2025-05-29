
export default function Header() {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Komeko Catering</h1>
          
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-green-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Menu</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Services</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Contact</a>
          </nav>
        </div>
      </header>
    );
  }
