import React, { useState } from 'react';
import Header from './Header';
import '../App.css';
import { useNavigate } from 'react-router-dom'; // Change here

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Change here

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://127.0.0.1:8000/token/' : 'http://127.0.0.1:8000/signup/';
        
        const body = isLogin
            ? new URLSearchParams({ username: formData.username, password: formData.password })
            : JSON.stringify({ username: formData.username, email: formData.email, password: formData.password });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': isLogin ? 'application/x-www-form-urlencoded' : 'application/json',
            },
            body: body,
        });

        if (response.ok) {
            if (isLogin) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                alert('Login successful!');
                navigate('/'); // Change here
            } else {
                alert('Signup successful! You can now log in.');
                setIsLogin(true); // Switch to login mode
            }
        } else {
            alert('Failed to authenticate. Please check your credentials.');
        }
    };

    return (
        <>
            <Header />
            <section className="bg-gray-50 py-16 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        {!isLogin && (
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
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-green-600 hover:underline"
                        >
                            {isLogin ? 'Create an account' : 'Already have an account? Login'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}