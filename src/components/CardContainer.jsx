import Card from "./bottomCard";
import { foods } from "./data";

export default function CardContainer() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-8 mt-10 w-full">
        {foods.map((food) => (
          <Card
            key={food.id}
            id={food.id} 
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