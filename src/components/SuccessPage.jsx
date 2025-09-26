import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SuccessPage() {
  const location = useLocation();
  const history = useHistory();
  const { order } = location.state || {};

  useEffect(() => {
    if (!order || Object.keys(order).length === 0) {
      history.push("/");
    }
  }, [order, history]);

  if (!order) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-600 font-sans text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center pt-24 pb-12 text-center">
        <h1 className="text-4xl font-['Satisfy'] text-yellow-400 mb-4">
          lezzetin yolda
        </h1>
        <h2 className="text-6xl font-barlow-bold tracking-wider uppercase mb-8">
          SİPARİŞ ALINDI
        </h2>
        <hr className="border-t-2 border-white w-1/3 mb-10" />
        <div className="mb-4">
          <p className="text-xl font-barlow-light tracking-wide">
            Sn.{" "}
            <strong className="text-2xl font-barlow-bold">{order.isim}</strong>,
          </p>
        </div>
        <div className="mb-10">
          <p className="text-3xl font-barlow-bold tracking-wide text-yellow-400">
            {order.urun_isim}
          </p>
        </div>

        <div className="text-lg font-barlow-light text-left w-64 mb-10">
          <p>
            <strong>Boyut:</strong> {order.boyut}
          </p>
          <p>
            <strong>Hamur:</strong> {order.hamur}
          </p>
          {order.malzemeler && order.malzemeler.length > 0 && (
            <p className="mt-4">
              <strong>Ek Malzemeler:</strong> <br />
              {order.malzemeler.join(", ")}
            </p>
          )}
          {order.ozel_not && (
            <p className="mt-4">
              <strong>Özel Not:</strong> <br />
              {order.ozel_not}
            </p>
          )}
        </div>

        <div className="w-64 p-6 border-2 border-white text-left">
          <h3 className="text-lg font-barlow-bold mb-4">Sipariş Toplamı</h3>
          <div className="flex justify-between font-barlow-light">
            <p>Seçimler</p>
            <p>{(order.malzemeler.length * 5).toFixed(2)}₺</p>
          </div>
          <div className="flex justify-between font-barlow-bold mt-2 text-xl">
            <p>Toplam</p>
            <p>{order.toplam}₺</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
