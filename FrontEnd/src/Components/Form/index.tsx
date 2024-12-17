import * as S from "./Form.styles";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice"; // Importando a ação de login

type FormProps = {
    origin: "login" | "register";
};

const Form: React.FC<FormProps> = ({ origin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Hook para disparar ações no Redux
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateFields = () => {
        if (!userName.trim() || !password.trim()) {
            setError("Todos os campos devem ser preenchidos.");
            return false;
        }
        if (userName.length < 3) {
            setError("O nome de usuário deve ter pelo menos 3 caracteres.");
            return false;
        }
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }
        return true;
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(""); // Reseta o erro anterior
        if (!validateFields()) return; // Valida os campos antes de prosseguir
        setIsLoading(true);

        try {
            const response = await fetch("http://projetostoix/api/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username: userName,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Armazena o token e outros dados do usuário no Redux
                dispatch(setUser({
                    id: data.user.id,
                    username: data.user.username,
                    token: data.token,
                }));
                localStorage.setItem("authToken", data.token); // Opcional, para persistência
                localStorage.setItem("userId", data.user.id.toString());
                localStorage.setItem("username", data.user.username);
                navigate("/home"); // Redireciona para a página inicial
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao tentar fazer login.");
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false); // Desativa o carregamento
        }
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(""); // Reseta o erro anterior
        if (!validateFields()) return; // Valida os campos antes de prosseguir
        setIsLoading(true);

        try {
            const response = await fetch("http://projetostoix/api/users", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username: userName,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Usuário registrado com sucesso:", data);
                alert("Cadastro realizado com sucesso!");
                navigate("/"); // Redireciona para o login
            } else {
                // Trata o erro de nome de usuário já existente
                if (data.error === "Username already exists") {
                    setError("Nome de usuário já existe. Tente outro.");
                } else {
                    setError(data.message || "Erro ao registrar. Tente novamente.");
                }
            }
        } catch (error) {
            console.error("Erro ao tentar registrar usuário:", error);
            setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false); // Desativa o carregamento
        }
    };

    return (
        <S.StyledForm className="container" onSubmit={origin === "login" ? handleLogin : handleRegister}>
            <S.Image src={logo} alt="logo" />
            <h2>{origin === "login" ? "Login" : "Registrar"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe erro, se houver */}
            <input
                type="text"
                name="user_name"
                id="user-name"
                placeholder="Nome do usuário"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {origin === "login" ? (
                <S.LoginButton type="submit" disabled={isLoading}>
                    {isLoading ? "Carregando..." : "Entrar"}
                </S.LoginButton>
            ) : (
                <S.Flex>
                    <S.CreateAccount type="submit" disabled={isLoading}>
                        {isLoading ? "Carregando..." : "Registrar"}
                    </S.CreateAccount>
                    <S.Cancel type="button" onClick={() => navigate("/")}>
                        Cancelar
                    </S.Cancel>
                </S.Flex>
            )}
        </S.StyledForm>
    );
};

export default Form;
