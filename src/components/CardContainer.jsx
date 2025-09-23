// CardContainer.jsx
import Card from "./bottomCard";
import { foods } from "./data";

export default function CardContainer() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-24 mt-10 w-full">
        {foods.map((food) => (
          <Card
            key={food.id}
            id={food.id} // Bu satırı ekleyin veya kontrol edin
            image={food.image}
            title={food.title}
            score={food.score}
            stock={food.stock}
            price={food.price}
          />
        ))}
      </div>
    </div>
  );
}