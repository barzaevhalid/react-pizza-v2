import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import s from "./search.module.scss";

type SearchProps = {
  setSearch: (str: string) => void
}
const Search:React.FC<SearchProps> = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearch("");
    setInputValue("");
    inputRef.current?.focus();
  };

  const onChangeInputValue = useCallback(
    debounce((e) => {
      setSearch(e);
    }, 250),
    []
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChangeInputValue(e.target.value);
  };
  return (
    <div className={s.root}>
      <svg
        className={s.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        className={s.searchInput}
        type="text"
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
      />
      {inputValue && (
        <svg
          onClick={onClickClear}
          className={s.clearIcon}
          id="Layer_1"
          version="1.1"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <g id="Layer_2">
            <g id="Layer_3">
              <path d="M40,5.4C20.9,5.4,5.4,20.9,5.4,40c0,19.1,15.5,34.6,34.5,34.6S74.5,59.1,74.6,40c0,0,0,0,0,0C74.5,20.9,59.1,5.5,40,5.4z     M40,71.6C22.6,71.6,8.4,57.4,8.4,40C8.4,22.6,22.6,8.4,40,8.4c17.4,0,31.6,14.1,31.6,31.5c0,0,0,0,0,0    C71.5,57.4,57.4,71.5,40,71.6z" />
              <path d="M40,14.9c-13.8,0-25.1,11.2-25.1,25.1h3c0-12.2,9.9-22.1,22.1-22.1V14.9z" />
              <polygon points="49.2,28.7 40,37.9 30.8,28.7 28.7,30.8 37.9,40 28.7,49.2 30.8,51.3 40,42.1 49.2,51.3 51.3,49.2 42.1,40     51.3,30.8   " />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
