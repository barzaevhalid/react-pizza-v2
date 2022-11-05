import Header from "./components/header/Header";
import { FC } from "react";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Skeleton from "./components/pizzaBlock/Skeleton";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const App: FC = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path={"/"} element={<Home search={search} />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
