import React from 'react';
import {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pizza from "../components/PizzaBlock";
import Pagination from '../components/Pagination'
import {useDispatch, useSelector} from "react-redux";

import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";


const Home = ({search}) => {
    const categoryId = useSelector(state => state.filterSlice.categoryId)
    const sortType = useSelector(state => state.filterSlice.sort)
    const currentPage = useSelector(state => state.filterSlice.currentPage)
    const dispatch = useDispatch()

    const searchFetch = search ?  `&search=${search}`: ''
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }
    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc"
        const sortBy  = sortType.sortProperty.replace("-", "");
        const category =  categoryId > 0 ? `&category=${categoryId}` : '';
        fetch(`https://62b8898203c36cb9b7c8a8a6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${searchFetch}`)
            .then(data => data.json())
            .then(data => {
                setItems(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, search, currentPage])

    return (
        <div className="container" >
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(sortObj) => dispatch(setCategoryId(sortObj))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : items.map(item => <Pizza key={item.id}  {...item} />)
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
