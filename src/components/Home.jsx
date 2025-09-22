import homeBanner from "../../images/iteration-1-images/home-banner.png";

export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${homeBanner})` }}
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-white">
        {/* En üst yazı */}
        <h1 className="text-6xl font-['Londrina_Solid']">
          Teknolojik Yemekler
        </h1>

        {/* Alt yazı */}
        <p className="text-2xl font-['Satisfy'] mt-2 text-yellow-400 mt-10">
          {" "}
          fırsatı kaçırma
        </p>

        {/* Orta slogan */}
        <h2 className="text-5xl font-['Roboto_Condensed'] uppercase mt-6">
          KOD ACIKTIRIR <br /> PİZZA, DOYURUR
        </h2>

        {/* Buton */}
        <button className="mt-8 px-10 py-3 text-black font-bold text-xl shadow-lg hover:opacity-90 transition rounded-[50px] font-['Barlow'] bg-yellow-400">
          Acıktım
        </button>
      </div>
    </div>
  );
}
