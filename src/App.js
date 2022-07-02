import Header from './components/Header';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import {useState} from "react";

const App = () => {
    const [search, setSearch] = useState('')

  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
        <div className="content">
            <Routes>
              <Route path="/" element={<Home search={search} setSearch={setSearch}/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
     </div>
  );
};

export default App;
