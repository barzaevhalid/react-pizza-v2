import React from 'react';
import qs from 'qs'
import {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {list} from '../components/Sort'
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pizza from "../components/PizzaBlock";
import Pagination from '../components/Pagination'
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom"

import {setCategoryId, setCurrentPag, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";


const Home = ({search}) => {
    const categoryId = useSelector(state => state.filterSlice.categoryId)
    const sortType = useSelector(state => state.filterSlice.sort)
    const currentPage = useSelector(state => state.filterSlice.currentPage)
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    const searchFetch = search ?  `&search=${search}`: ''
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        const params = qs.parse(window.location.search.substring(1))
        const sort = list.find(obj => obj.sortProperty === params.sortProperty)
        dispatch(setFilters({
            ...params,
            sort
        }))
        console.log(sort)
    }, [])

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes("-") ? "asc" : "desc"
        const sortBy  = sortType.sortProperty.replace("-", "");
        const category =  categoryId > 0 ? `&category=${categoryId}` : '';
        axios.get(`https://62b8898203c36cb9b7c8a8a6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${searchFetch}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, search, currentPage])

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sortType.sortProperty,
            categoryId,
            currentPage,
        })
        navigate(`?${queryString}`)
    }, [categoryId, sortType, currentPage])


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
