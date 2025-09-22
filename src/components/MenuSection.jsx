
import { useState } from "react";

const menuItems = [
  { id: 1, name: "Ramen", icon: "/images/iteration-2-images/icons/1.svg" },
  { id: 2, name: "Pizza", icon: "/images/iteration-2-images/icons/2.svg" },
  { id: 3, name: "Burger", icon: "/images/iteration-2-images/icons/3.svg" },
  { id: 4, name: "French fries", icon: "/images/iteration-2-images/icons/4.svg" },
  { id: 5, name: "Fast food", icon: "/images/iteration-2-images/icons/5.svg" },
  { id: 6, name: "Soft drinks", icon: "/images/iteration-2-images/icons/6.svg" },
];

export default function MenuSection() {
  const [active, setActive] = useState(2); // default Pizza seçili

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Başlıklar */}
      <div className="text-center">
        <h3 className="font-[Satisfy] text-red-600 text-2xl font-bold">
          en çok paketlenen menüler
        </h3>
        <h2 className="font-[Barlow] text-gray-800 text-3xl font-bold mt-1">
          Acıktıran Kodlara Doyuran Lezzetler
        </h2>
      </div>

      {/* Menü Butonları */}
      <div className="flex flex-wrap justify-center gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-base transition-all
              ${
                active === item.id
                  ? "bg-gray-800 text-white border-2 border-gray-800 hover:bg-white hover:text-black"
                  : "bg-white text-black hover:bg-gray-800 hover:text-white"
              }`}
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
