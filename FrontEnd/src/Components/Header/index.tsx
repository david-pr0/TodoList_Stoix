import * as S from "./Header.styles";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Back } from "../../Assets/Icons/back.svg";
import logo from "../../Assets/logo.png";

type HeaderOrigin = {
    origin: "home" | "task";
};

const Header: React.FC<HeaderOrigin> = ({ origin }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        // Remove o token de autenticação
        localStorage.removeItem("authToken");
        // Redireciona para a tela de login
        navigate("/");
    };

    return (
        <S.Header>
            {origin === "home" ? (
                <div className="container home-header">
                    <S.Image src={logo} alt="logo" />
                    <S.SearchBar
                        type="text"
                        name="search-bar"
                        id="search-bar"
                        placeholder="Buscar"
                    />
                    <S.Button type="button" onClick={handleLogout}>
                        Logout
                    </S.Button>
                </div>
            ) : (
                <div className="container">
                    <button onClick={handleGoBack}>
                        <Back />
                    </button>
                    <S.Image src={logo} alt="logo" />
                </div>
            )}
        </S.Header>
    );
};

export default Header;
