import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Footer from './components/Footer'
import WhatWeDo from './components/WhatWeDo'
import BookService from './components/BookServices'

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Services />
      <WhatWeDo />
      <Footer />
    </div>
  );
}
