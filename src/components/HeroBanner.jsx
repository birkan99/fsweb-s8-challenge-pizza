import { useHistory } from "react-router-dom";
export default function HeroBanner({ bannerImage }) {
  const history = useHistory();

  const handleOrder = () => {
    history.push("/order/2");
  };
  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-white">
        <h1 className="text-6xl font-['Londrina_Solid']" data-cy="hero-title">
          Teknolojik Yemekler
        </h1>
        <p className="text-2xl font-['Satisfy'] mt-10 text-yellow-400">
          fırsatı kaçırma
        </p>
        <h1
          className="text-5xl font-['Roboto_Condensed'] uppercase mt-6"
          data-cy="hero-slogan"
        >
          KOD ACIKTIRIR <br /> PİZZA, DOYURUR
        </h1>
        <button
          onClick={handleOrder}
          className="mt-8 px-10 py-3 text-black font-bold text-xl shadow-lg hover:opacity-90 transition rounded-[50px] font-['Barlow'] bg-yellow-400"
        >
          Acıktım
        </button>
      </div>
    </div>
  );
}
