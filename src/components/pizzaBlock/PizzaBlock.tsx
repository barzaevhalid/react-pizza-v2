import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../store/cartSlice";
import {RootState} from '../../store/store'
type PizzaBlockProps = {
  id: string,
  category: string,
  imageUrl: string,
  name: string,
  price: number,
  rating: number,
  sizes: number[],
  types: number[],
}
const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  category,
  imageUrl,
  name,
  price,
  rating,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const pizzaType = ["тонкое", "традиционное"];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  
  const pizzaItem = useSelector((state: RootState) =>
    state.cartSlice.pizzaItems.find((obj) => obj.id === id)
  );
  const addedCount = pizzaItem ? pizzaItem.count : 0;
  const addPizzasCart = () => {
    const pizzaItem = {
      id,
      imageUrl,
      name,
      price,
      sizes: sizes[activeSize],
      types: pizzaType[activeType],
      count: 1,
    };
    dispatch(addPizza(pizzaItem));
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {pizzaType[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              className={activeSize === i ? "active" : ""}
              onClick={() => setActiveSize(i)}
            >
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={addPizzasCart}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount ? <i>{addedCount}</i> : ""}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
