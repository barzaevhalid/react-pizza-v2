import logo from "../assets/img/pizza-logo.svg";
import Button from "./Button";
import {Link} from "react-router-dom";
import Search from "./Search";

const Header = ({setSearch}) => {
    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="38" src={logo} alt="Index logo" />
                        <div>
                            <h1>React pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <Search setSearch={setSearch} />
                <Button />
            </div>
        </div>

    );
};

export default Header;
