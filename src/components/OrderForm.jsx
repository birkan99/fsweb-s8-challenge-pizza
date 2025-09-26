import { useParams, Link, useHistory } from "react-router-dom";
import { foods } from "./data";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderForm() {
  const { id } = useParams();
  const food = foods.find((f) => f.id === Number(id));
  const history = useHistory();

  useEffect(() => {
    requestAnimationFrame(() =>
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
        const root = document.getElementById("root");
        if (root) root.scrollTop = 0;
      }, 0)
    );
  }, []);

  if (!food) {
    return <div>Ürün bulunamadı.</div>;
  }

  const [size, setSize] = useState("");
  const [dough, setDough] = useState("");
  const [extras, setExtras] = useState([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [doughError, setDoughError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const basePrice = parseFloat(food.price.replace("₺", ""));
  const extraPrice = 5;
  const total = (basePrice + extras.length * extraPrice) * quantity;

  const toggleExtra = (item) => {
    if (extras.includes(item)) {
      setExtras(extras.filter((x) => x !== item));
    } else if (extras.length < 10) {
      setExtras([...extras, item]);
    }
  };

  const isFormValid = size && dough && name.length >= 3 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!size) {
      setSizeError(true);
      valid = false;
    } else {
      setSizeError(false);
    }

    if (!dough) {
      setDoughError(true);
      valid = false;
    } else {
      setDoughError(false);
    }
    if (name.length < 3) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (valid) {
      setLoading(true);
      const payload = {
        isim: name,
        urun_isim: food.title,
        boyut: size,
        hamur: dough,
        malzemeler: extras,
        adet: quantity,
        ozel_not: note,
        toplam: total.toFixed(2),
      };

      try {
        const response = await axios.post(
          "https://reqres.in/api/pizza",
          payload,
          {
            headers: {
              "x-api-key": "reqres-free-v1",
            },
          }
        );
        console.log("Sipariş başarıyla gönderildi:", response.data);

        history.push({
          pathname: "/success",
          state: {
            order: {
              ...payload,
              id: response.data.id,
              date: response.data.createdAt,
            },
          },
        });
      } catch (error) {
        console.error("Sipariş gönderilirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Ürün Görseli ve Bilgileri Bölümü */}
      <div className="bg-white py-8 px-4 max-w-4xl mx-auto flex flex-col items-center">
        <img
          src={food.image}
          alt={food.title}
          className="w-60 h-60 object-cover"
        />

        {/*(Breadcrumb) */}
        <div className="w-full text-left mt-8 font-barlow text-gray-500">
          <Link to="/" className="hover:text-yellow-600">
            Anasayfa
          </Link>
          <span className="mx-2">&gt;</span>
          <span>Seçenekler</span>
          <span className="mx-2">&gt;</span>
          <span>Sipariş Oluştur</span>
        </div>

        <h1 className="text-3xl font-semibold mt-4 text-left w-full">
          {food.title}
        </h1>

        <div className="w-full text-left mt-2 flex flex-col items-start gap-2">
          <div className="flex gap-2 text-gray-800">
            <span className="font-bold text-2xl">{food.price}</span>
            <span className="flex items-center gap-1 font-barlow text-sm">
              <span className="text-yellow-500 text-lg">⭐</span>
              {food.score} {food.stock}
            </span>
          </div>
          <p className="text-gray-600 mt-2 text-sm w-full">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta
            denir.
          </p>
        </div>
      </div>

      {/* Sipariş Formu */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white w-full"
      >
        {/* Boyut Seç */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Boyut Seç *</h3>
          {sizeError && (
            <p className="text-red-500 text-sm mb-2">Lütfen bir boyut seçin.</p>
          )}
          <div className="flex gap-2">
            {["S", "M", "L"].map((s) => (
              <button
                key={s}
                type="button"
                className={`px-4 py-2 border rounded ${
                  size === s ? "bg-yellow-400" : ""
                }`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Hamur Seç */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Hamur Seç *</h3>
          {doughError && (
            <p className="text-red-500 text-sm mb-2">
              Lütfen hamur kalınlığı seçin.
            </p>
          )}
          <select
            className="border px-3 py-2 rounded w-full"
            value={dough}
            onChange={(e) => setDough(e.target.value)}
          >
            <option value="">--Hamur Kalınlığı Seç--</option>
            <option>İnce</option>
            <option>Orta</option>
            <option>Kalın</option>
          </select>
        </div>

        {/* Ekstra Malzemeler */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Ek Malzemeler (5₺)</h3>
          {extras.length >= 10 && (
            <p className="text-red-500 text-sm mb-2">
              En fazla 10 malzeme seçebilirsiniz.
            </p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {[
              "Pepperoni",
              "Sosis",
              "Kanada Jambonu",
              "Tavuk",
              "Soğan",
              "Domates",
              "Mısır",
              "Jalapeno",
              "Sarımsak",
              "Biber",
              "Sucuk",
              "Ananas",
              "Kabak",
            ].map((item) => (
              <button
                key={item}
                type="button"
                disabled={extras.length >= 10 && !extras.includes(item)}
                className={`px-3 py-2 border rounded ${
                  extras.includes(item) ? "bg-yellow-400" : ""
                } ${
                  extras.length >= 10 && !extras.includes(item)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => toggleExtra(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Adınız Soyadınız *</h3>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="En az 3 karakter olmalı"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              if (value.length < 3) {
                setNameError(true);
              } else {
                setNameError(false);
              }
            }}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-2" data-cy="name-error">
              Adınız en az 3 karakter olmalıdır.
            </p>
          )}
        </div>

        {/* Not */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Sipariş Notu</h3>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Özet */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
          <div>
            <p>Seçimler: {extras.length * extraPrice}₺</p>
            <p className="font-bold text-red-600">
              Toplam: {total.toFixed(2)}₺
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded"
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-3 py-1 border rounded"
              type="button"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Buton */}
        <button
          type="submit"
          className={`mt-6 w-full font-semibold py-3 rounded ${
            isFormValid
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          {loading ? "Sipariş Gönderiliyor..." : "SİPARİŞ VER"}
        </button>
      </form>
      <Footer />
    </div>
  );
}
