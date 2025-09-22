import React from "react";

export default function LargeCard({ image, title, subtitle, buttonText }) {
  return (
    <section className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-start items-start text-white p-5">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10">
        <h1 className="text-3xl font-quattrocento mt-6 leading-tight">
          {title}
        </h1>
        {subtitle && <h4 className="text-sm mb-4">{subtitle}</h4>}
        <button className="px-5 py-2 bg-white text-[#ce2829] font-bold rounded-[20px] font-['Roboto_Condensed'] cursor-pointer">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
