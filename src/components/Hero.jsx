import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate(); // Initialize the navigate function

    return (
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Delicious Catering for Every Occasion</h2>
          <p className="text-lg text-gray-600 mb-6">Create a dining experience that is uniquely yours with our tailored menu options. We collaborate with you to design menus that align with your event theme, dietary preferences and culinary vision, ensuring every dish is crafted to perfection for an unforgettable occasion.</p>
          <button 
            onClick={() => navigate('/Bookingservices')} 
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-900 transition">
            Book a Service
          </button>
          
        </div>
      </section>
    );
}