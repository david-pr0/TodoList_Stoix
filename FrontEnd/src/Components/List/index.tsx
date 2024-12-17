import Card from "../Card";
import { CardButton } from "../Card/Card.styles";
import * as S from "./List.styles";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../Assets/Icons/add.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContentListFromApi } from "../../redux/contentSlice";
import { RootState } from "../../redux/store";

const List = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Obtém as tarefas do Redux
    const tasks = useSelector((state: RootState) => state.content.contentList);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("userId");

    const handleCreate = () => {
        navigate("/edittask");
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) {
                setError("Usuário não autenticado.");
                return;
            }
            try {
                const response = await fetch(`http://projetostoix/api/tasks/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // Preenche o estado global com as tarefas recebidas da API
                        dispatch(setContentListFromApi(data)); 
                    } else {
                        setError("Formato de dados inválido.");
                    }
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Erro ao buscar as tarefas.");
                }
            } catch (error) {
                setError("Erro ao conectar ao servidor. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [userId, dispatch]);

    if (loading) {
        return <p>Carregando tarefas...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <S.List className="container">
            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada.</p>  // Exibe uma mensagem caso não haja tarefas
            ) : (
                tasks.map((task) => (
                    <Card key={task.id} id={task.id} description={task.description} />
                ))
            )}
            <CardButton id="add" onClick={handleCreate}>
                <AddIcon />
            </CardButton>
        </S.List>
    );
};

export default List;
