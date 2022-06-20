import React from 'react';
import {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pizza from "../components/PizzaBlock";


const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating",
    })
    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc"
        const sortBy  = sortType.sortProperty.replace("-", "");
        const category =  categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://62ac9e6d9fa81d00a7b62716.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(data => data.json())
            .then(data => {
                setItems(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])
    return (
        <div className="container" >
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType} onClickSortType={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : items.map(item => <Pizza key={item.id}  {...item} />)
                }
            </div>
        </div>
    );
};

export default Home;
