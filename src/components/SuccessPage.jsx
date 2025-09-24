import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function SuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="text-center p-10">
        Sipariş bilgileri bulunamadı. Lütfen ana sayfaya dönün.
      </div>
    );
  }

  const { title, size, dough, extras, total, note } = order;

  return (
    <div className="flex flex-col min-h-screen bg-red-600 text-white">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center font-[barlow] text-center p-6">
        <h2 className="text-4xl sm:text-5xl md:text-4xl font-['Satisfy'] text-yellow-400 mb-2">
          lezzetin yolda
        </h2>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-[roboto-condensed] tracking-wider border-b-2 pb-6 mb-10">
          SİPARİŞ ALINDI
        </h1>
        <div className="flex flex-col gap-4 text-white text-lg sm:text-xl">
          <p className="font-[semibold] text-3xl  text-center">{title}</p>
          <p>
            <span className="font-[semibold]">Boyut:</span> {size}
          </p>
          <p>
            <span className="font-[semibold]">Hamur:</span> {dough}
          </p>
          {extras.length > 0 && (
            <p>
              <span className="font-[semibold]">Ek Malzemeler:</span>{" "}
              {extras.join(", ")}
            </p>
          )}{" "}
          {note && ( // Sadece not varsa göster
            <div className="mt-4">
              <p className="font-semibold text-lg">Sipariş Notu:</p>
              <p className="text-white text-md italic">{note}</p>{" "}
            </div>
          )}
        </div>
        <div className=" text-white border-2 p-8 rounded-lg shadow-md mt-10 w-full max-w-sm">
          <h4 className="font-[semibold] text-2xl mb-4">Sipariş Toplamı</h4>
          <div className="flex justify-between items-center text-xl mb-2">
            <span className="font-[medium]">Seçimler:</span>
            <span className="font-[bold]">{extras.length * 5}₺</span>
          </div>
          <div className="flex justify-between items-center text-2xl">
            <span>Toplam:</span>
            <span>{total.toFixed(2)}₺</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
