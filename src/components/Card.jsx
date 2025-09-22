import React from "react";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

export default function Card() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 w-[90vw] max-w-6xl mx-auto my-10">
      {/* Sol Kolon */}
      <div className="w-full md:w-[400px] h-[320px] md:h-auto">
        <LargeCard
          image="/images/iteration-2-images/cta/kart-1.png"
          title={
            <>
              Özel
              <br />
              Lezzetus
            </>
          }
          subtitle="Position:Absolute Acı Burger"
          buttonText="SİPARİŞ VER"
        />
      </div>

      {/* Sağ Kolon */}
      <div className="flex flex-col gap-4 w-full md:w-[400px]">
        <SmallCard
          image="/images/iteration-2-images/cta/kart-2.png"
          title={
            <>
              Hackathlon
              <br />
              Burger Menü
            </>
          }
          buttonText="SİPARİŞ VER"
        />
        <SmallCard
          image="/images/iteration-2-images/cta/kart-3.png"
          title={
            <h3 className="text-xl mb-2 font-quattrocento">
              <span className="text-[#ce2829]">Çoooook</span>{" "}
              <span className="text-black font-medium">
                hızlı
                <br />
                npm gibi kurye
              </span>
            </h3>
          }
          buttonText="SİPARİŞ VER"
        />
      </div>
    </div>
  );
}
