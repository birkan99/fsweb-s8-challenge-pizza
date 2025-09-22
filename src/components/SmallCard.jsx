import React from "react";

export default function SmallCard({ image, title, buttonText }) {
  return (
    <section className="relative w-full h-[150px] rounded-xl overflow-hidden flex flex-col justify-start items-start p-5 text-white">
      <img
        src={image}
        alt={typeof title === "string" ? title : "card image"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10">
        <div className="text-xl font-semibold mb-2">{title}</div>
        <button className="px-5 py-2 bg-white text-[#ce2829] font-bold rounded-[20px] font-['Roboto_Condensed'] cursor-pointer">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
