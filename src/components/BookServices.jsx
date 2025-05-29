import Header from './Header';
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BookService() {
    return (
        <>
            <Header />
            <section className="bg-gray-50 py-16 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Book a Catering Service</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Type</label>
                            <select
                                name="eventType"
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="">Select Event Type</option>
                                <option>Wedding</option>
                                <option>Birthday</option>
                                <option>Corporate</option>
                                <option>Private Party</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    required
                                    min="1"
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                            <textarea
                                name="message"
                                rows="4"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                placeholder="Let us know anything important..."
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Submit Bookings
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
