import homeBanner from "../../images/iteration-1-images/home-banner.png";

export default function Home() {
  return (
    <>
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
      {/* yeni div */}
      <div className="w-full relative overflow-x-hidden">
        <nav className="flex justify-center flex-wrap space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/1.svg"
              alt="Kore"
              className="w-6 h-6"
            />
            <a
              href="/dashboard"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              YENİ! Kore
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/2.svg"
              alt="Pizza"
              className="w-6 h-6"
            />{" "}
            <a
              href="/team"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Pizza
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/3.svg"
              alt="Burger"
              className="w-6 h-6"
            />
            <a
              href="/projects"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Burger
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/4.svg"
              alt="Kızartmalar"
              className="w-6 h-6"
            />
            <a
              href="/reports"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Kızartmalar
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/5.svg"
              alt="Fast food"
              className="w-6 h-6"
            />
            <a
              href="/reports"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Fast food
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/images/iteration-2-images/icons/6.svg"
              alt="Gazlı İçecek"
              className="w-6 h-6"
            />
            <a
              href="/reports"
              className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Gazlı İçecek
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
