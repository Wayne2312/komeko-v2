import Header from './Header';
import '../App.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function BookService() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guests: 1,
        specialRequests: '',
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                index: '', // This will be generated on the backend
            }),
        });

        if (response.ok) {
            alert('Booking submitted successfully!');
            history.push('/'); // Redirect after successful submission
        } else {
            alert('Failed to submit booking.');
        }
    };

    return (
        <>
            <Header />
            <section className="bg-gray-50 py-16 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Book a Catering Service</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Type</label>
                            <select
                                name="eventType"
                                required
                                value={formData.eventType}
                                onChange={handleChange}
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
                                    name="eventDate"
                                    required
                                    value={formData.eventDate}
                                    onChange={handleChange}
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
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                rows="4"
                                value={formData.specialRequests}
                                onChange={handleChange}
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