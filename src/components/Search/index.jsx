import React, {useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import s from './search.module.scss'
const Search = ({setSearch}) => {

    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef()
    const onClickClear = () => {
        setInputValue('')
        setSearch('')
        inputRef.current.focus()

    }
    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearch(str)
        }, 250), [])

    const onChangeInput = (e) => {
        setInputValue(e)
        updateSearchValue(e)
    }
    return (
        <div className={s.root}>
            <svg
                className={s.search}
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z"/></svg>
            <input ref={inputRef} className={s.input} value={inputValue} onChange={(e) => onChangeInput(e.target.value)} placeholder="Поиск пиццы..."/>
            {inputValue && <svg
                onClick={onClickClear}
                className={s.deleteIcon}
                enableBackground="new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z" fill="#425661"/><polygon fill="#425661" points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "/></svg>
            }
             </div>
    );
};

export default Search;
