import '../App.css';
import { Link } from 'react-router-dom';
import React from 'react'; 


export default function Header() {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Komeko Catering</h1>
          
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-green-600">Menu</Link>
            <Link to="/Bookingservices" className="text-gray-700 hover:text-green-600">Booking</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
          </nav>
        </div>
      </header>
    );
  }
