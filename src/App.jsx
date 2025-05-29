import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Footer from './components/Footer'
import WhatWeDo from './components/WhatWeDo'
import BookService from './components/BookServices'
import Menu from './Mcomponents/Menu'
import Contact from './Mcomponents/Contact'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="font-sans">
          <Header />
          <Hero />
          <Services />
          <WhatWeDo />
          <Footer />
        </div>
      } />
      <Route path="/book-service" element={<BookService />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/Bookingservices" element={<BookService />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
