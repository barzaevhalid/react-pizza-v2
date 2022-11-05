import React, { useState } from "react";
import { useWhyDidYouUpdate } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../store/filterSlice";
import { RootState } from "../store/store";
const Categories: React.FC = () => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]; 
  const categoryId = useSelector((state: RootState) => state.filterSlice.categoryId);
  useWhyDidYouUpdate("Categories", {categoryId})
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              className={categoryId === i ? "active" : ""}
              onClick={() => dispatch(setCategoryId(i))}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
