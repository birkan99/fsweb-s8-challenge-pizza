import React from "react";

export default function Card() {
  return (
    <div className="flex justify-center items-center gap-5 w-[90vw] h-[320px] mx-auto my-10">
      {/* Sol Kolon */}
      <section className="relative w-[400px] h-full rounded-xl overflow-hidden flex flex-col justify-start items-start text-white p-5">
        <img
          src="/images/iteration-2-images/cta/kart-1.png"
          alt="Özel Lezzetus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="relative text-3xl font-quattrocento mt-6 mb-0 leading-tight z-10">
          Özel<br />Lezzetus
        </h1>
        <h4 className="relative text-sm mt-0 mb-4 z-10">
          Position:Absolute Acı Burger
        </h4>
        <button className="relative mt-0 px-5 py-2 bg-white text-[#ce2829] font-bold rounded-[20px] font-['Roboto_Condensed'] cursor-pointer z-10">
          SİPARİŞ VER
        </button>
      </section>

      {/* Sağ Kolon */}
      <div className="flex flex-col justify-start gap-4 w-[400px] h-full">
        {/* Hackathlon */}
        <section className="relative w-full h-[150px] rounded-xl overflow-hidden flex flex-col justify-start items-start p-5">
          <img
            src="/images/iteration-2-images/cta/kart-2.png"
            alt="Hackathlon Burger Menü"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <h3 className="relative text-xl mb-2 z-10">
            Hackathlon<br />Burger Menü
          </h3>
          <button className="relative mt-0 px-5 py-2 bg-white text-[#ce2829] font-bold rounded-[20px] font-['Roboto_Condensed'] cursor-pointer z-10">
            SİPARİŞ VER
          </button>
        </section>

        {/* npm */}
        <section className="relative w-full h-[150px] rounded-xl overflow-hidden flex flex-col justify-start items-start p-5">
          <img
            src="/images/iteration-2-images/cta/kart-3.png"
            alt="npm gibi kurye"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <h3 className="relative text-xl mb-2 z-10">
            <span className="text-[#ce2829]">Çoooook</span> hızlı<br />npm gibi kurye
          </h3>
          <button className="relative mt-0 px-5 py-2 bg-white text-[#ce2829] font-bold rounded-[20px] font-['Roboto_Condensed'] cursor-pointer z-10">
            SİPARİŞ VER
          </button>
        </section>
      </div>
    </div>
  );
}
