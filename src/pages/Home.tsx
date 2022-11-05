import React, { useRef } from "react";
import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import { sort } from "../components/Sort";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPizzas, fetchPizzas, SearchPizzaParams } from "../store/pizzasSlice";
import { setParams } from "../store/filterSlice";
import { useNavigate } from "react-router-dom";
import {RootState, useAppDispatch, useAppSelector } from '../store/store'

type HomeProps = {
  search: string
}
const Home:React.FC<HomeProps> = ({ search }) => {
  //hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { pizzas, status }  = useSelector((state: RootState) => state.pizzasSlice)

  // const { pizzas, status } = useSelector((state: any) => state.pizzasSlice);
  const selectedSort = useSelector((state: RootState) => state.filterSlice.selectedSort);
  const active = useSelector((state: RootState) => state.filterSlice.categoryId);
  
  const sortCategory = active ? `category=${active}` : "";
  const sortBy = selectedSort.sort.replace("-", "");
  const order = selectedSort.sort.includes("-") ? "asc" : "desc";
  const getSearch = search && `&search=${search} `;

  useEffect(() => {
    console.log(!window.location.search, 'asdas')
    if (!window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      const sortProperty = sort.find((obj) => obj.name === params?.sortBy?.sort);
      console.log(params);
      
        
      if(sortProperty) {
        params.sortBy = sortProperty
      }      
      dispatch(
        setParams({
          selectedSort: params.sortBy,
          categoryId: +params.sortCategory
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    
    if (!isSearch.current) {
      //@ts-ignore
      dispatch(fetchPizzas({ sortCategory, sortBy, order, getSearch }));

      window.scrollTo(0, 0);
    }
  }, [active, selectedSort, getSearch]);

  useEffect(() => {
    if (!isMounted.current) {
      const queryString = qs.stringify({
        sort: selectedSort.sort,
        categoryId: active,
      });
      navigate("?" + queryString);
    }
    isMounted.current = true;
  }, [active, selectedSort, getSearch]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzasRender = pizzas.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div>Ошибка запроса пицц</div>
        ) : status === "loading" ? (
          skeletons
        ) : (
          pizzasRender
        )}
      </div>
     
    </>
  );
};

export default Home;
