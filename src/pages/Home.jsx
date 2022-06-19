import React from 'react';
import {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pizza from "../components/PizzaBlock";


const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch("https://62ac9e6d9fa81d00a7b62716.mockapi.io/items")
            .then(data => data.json())
            .then(data => {
                setItems(data)
                setIsLoading(false)
            })
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : items.map(item => <Pizza key={item.id}  {...item} />)
                }
            </div>
        </>
    );
};

export default Home;
