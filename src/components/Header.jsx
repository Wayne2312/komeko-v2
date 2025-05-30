import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import the user profile icon
import { auth } from './Firebase'; // Import your Firebase configuration
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleSignOut = async () => {
        await auth.signOut();
        setUser(null);
        navigate('/'); // Redirect to home after signing out
    };

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700">Komeko Catering</h1>
                
                <nav className="space-x-4 flex items-center">
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-4 py-2 bg-green-200 text-gray-700 rounded hover:bg-green-600 hover:text-white"
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => navigate('/menu')} 
                        className="px-4 py-2 bg-green-200 text-gray-700 rounded hover:bg-green-600 hover:text-white"
                    >
                        Menu
                    </button>
                    <button 
                        onClick={() => navigate('/Bookingservices')} 
                        className="px-4 py-2 bg-green-200 text-gray-700 rounded hover:bg-green-600 hover:text-white"
                    >
                        Booking
                    </button>
                    <button 
                        onClick={() => navigate('/contact')} 
                        className="px-4 py-2 bg-green-200 text-gray-700 rounded hover:bg-green-600 hover:text-white"
                    >
                        Contact
                    </button>

                    {/* User Profile Section */}
                    <div className="relative">
                        {user ? (
                            <button 
                                onClick={handleSignOut} 
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-200 text-gray-700 rounded hover:bg-blue-600 hover:text-white"
                            >
                                <FaUserCircle className="text-xl" /> {/* User profile icon */}
                                <span>{user.email}</span> {/* Display current user's email */}
                            </button>
                        ) : (
                            <button 
                                onClick={() => navigate('/sign-in')} 
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-200 text-gray-700 rounded hover:bg-blue-600 hover:text-white"
                            >
                                <FaUserCircle className="text-xl" /> {/* User profile icon */}
                                <span>Sign In</span>
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}