export default function WhatWeDo() {
    const items = [
      { label: "Salad Bar", image: "/src/assets/image/saladbar.jpg" },
      { label: "Dessert Bar", image: "/src/assets/image/Dessert.jpg" },
      { label: "Main Dish", image: "/src/assets/image/Main Dish.jpg" },
      { label: "Cocktails", image: "/src/assets/image/cocktails.jpg" },
    ];
  
    return (
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-600 mb-10">Celebrate important moments with Komeko Catering</p>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={item.image} alt={item.label} className="rounded-full w-28 h-28 object-cover shadow-md mb-3" />
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  