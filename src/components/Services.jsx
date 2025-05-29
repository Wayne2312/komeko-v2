const services = [
    { title: "Corporate Events", desc: "Professional catering for your business events and conferences. We are experienced in product launches and office parties and conferences as well as luncheons." },
    { title: "Weddings", desc: "Make your special day unforgettable with our elegant and flavorful wedding menus. Our team works closely with you to craft a dining experience that complements your celebration, offering everything from sophisticated plated dinners to beautifully presented buffets, all tailored to your unique style and preferences." },
    { title: "Private Parties", desc: "Delicious dishes for intimate gatherings and celebrations with your family and friends to celebrate and make new memories. Whether it’s a milestone birthday, anniversary or a cozy get-together, our catering services bring vibrant flavors and personalized touches to make your private party truly special." },
    { title: "Buffet Services", desc: "Our customizable buffet options are perfect for any occasion, offering a wide variety of dishes to suit diverse tastes and dietary needs. From casual gatherings to formal events, our beautifully arranged buffets combine convenience and quality, ensuring your guests enjoy a delightful dining experience." },
    { title: "Drop-off Catering", desc: "Enjoy hassle-free catering with our convenient drop-off services, delivering fresh and delicious meals right to your doorstep. Ideal for meetings, parties, or any event, our drop-off catering provides high-quality food with the ease and flexibility you need for a seamless experience." },  ];
  
  export default function Services() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-green-700 mb-10">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-semibold text-green-800 mb-2">{s.title}</h4>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  