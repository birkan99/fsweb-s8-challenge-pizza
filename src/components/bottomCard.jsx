// bottomCard.jsx

import { useHistory } from "react-router-dom";

export default function bottomCard({ id, image, title, score, stock, price }) {
  const history = useHistory();

  // Kartın tamamını tıklanabilir hale getiren fonksiyon
  const handleCardClick = () => {
    history.push(`/order/${id}`);
  };

   return (
    <div
      onClick={handleCardClick}
      className="bg-white flex flex-col justify-between w-64 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-md">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="font-barlow font-semibold text-xl text-[#292929] mt-3">
        {title}
      </h3>
      <div className="flex justify-between text-lg font-barlow mt-2">
        <p className="text-gray-800">{score}</p>
        <p className="text-gray-500">{stock}</p>
        <p className="text-gray-900 font-semibold">{price}</p>
      </div>
    </div>
  );
}