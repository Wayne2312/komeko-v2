import React from 'react';
import '../App.css'; // Ensure Tailwind CSS is imported

// Import images
import saladbar from '../assets/image/saladbar.jpg';
import dessert from '../assets/image/Dessert.jpg';
import mainDish from '../assets/image/Main Dish.jpg';
import cocktails from '../assets/image/cocktails.jpg';

export default function WhatWeDo() {
    const items = [
        { label: "Salad Bar", image: saladbar },
        { label: "Dessert Bar", image: dessert },
        { label: "Main Dish", image: mainDish },
        { label: "Cocktails", image: cocktails },
    ];

    return (
        <section className="bg-white py-16 px-6 text-center">
            <p className="text-gray-600 mb-10">Celebrate important moments with Komeko Catering</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {items.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <img
                            src={item.image}
                            alt={item.label}
                            className="rounded-full w-28 h-28 object-cover shadow-md mb-3"
                            style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsive behavior
                        />
                        <p className="text-sm font-medium">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
