import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Menu() {
    const menuItems = [
        {
            title: "Corporate Events",
            desc: "Professional catering for your business events and conferences. We are experienced in product launches, office parties, and luncheons."
        },
        {
            title: "Weddings",
            desc: "Make your special day unforgettable with our elegant and flavorful wedding menus. Our team works closely with you to craft a dining experience that complements your celebration."
        },
        {
            title: "Private Parties",
            desc: "Delicious dishes for intimate gatherings and celebrations with your family and friends. Our catering services bring vibrant flavors and personalized touches."
        },
        {
            title: "Buffet Services",
            desc: "Our customizable buffet options are perfect for any occasion, offering a variety of dishes to suit diverse tastes and dietary needs."
        },
        {
            title: "Drop-off Catering",
            desc: "Enjoy hassle-free catering with our convenient drop-off services, delivering fresh and delicious meals right to your doorstep."
        }
    ];

    return (
        <div className="font-sans min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-bold text-center my-8">Menu</h2>
                <div className="space-y-6">
                    {menuItems.map((item, index) => (
                        <div key={index} className="border rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-semibold">{item.title}</h3>
                            <p className="text-gray-700">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}