import * as S from "./Card.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentContent, removeTaskFromList } from "../../redux/contentSlice";

import { ReactComponent as EditIcon } from "../../Assets/Icons/edit.svg";
import { ReactComponent as OpenIcon } from "../../Assets/Icons/zoom.svg";
import { ReactComponent as TrashIcon } from "../../Assets/Icons/delete.svg";

type CardProps = {
    description: string;
    id: number;
};

const Card: React.FC<CardProps> = ({ description, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Função para abrir a tarefa e atualizar o conteúdo atual no Redux
    const handleOpenTask = () => {
        dispatch(setCurrentContent({ id, description }));
        navigate(`/task/${id}`);
    };

    // Função para editar a tarefa e atualizar o conteúdo atual no Redux
    const handleEditTask = () => {
        dispatch(setCurrentContent({ id, description }));
        navigate(`/edittask/${id}`);
    };

    // Função para excluir a tarefa com confirmação
    const handleDeleteTask = async () => {
        // Exibe um alerta de confirmação antes de excluir
        const isConfirmed = window.confirm("Você tem certeza que quer excluir esta tarefa?");
        if (!isConfirmed) {
            return; // Se o usuário cancelar, não faz nada
        }

        try {
            // Obtém o CSRF token armazenado no localStorage ou em algum outro lugar
            const csrfToken = localStorage.getItem('csrf_token');

            const response = await fetch(`http://projetostoix/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken || '', // Envia o CSRF token no cabeçalho
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Se a tarefa foi deletada com sucesso, remova ela do Redux
                dispatch(removeTaskFromList(id));
            } else {
                alert(data.message || "Erro ao excluir a tarefa.");
            }
        } catch (error) {
            alert("Erro ao excluir a tarefa. Tente novamente.");
        }
    };

    return (
        <S.CardItem>
            <div className="container">
                <S.CardButton onClick={handleEditTask}>
                    <EditIcon />
                </S.CardButton>
                <p>{description || "Sem descrição"}</p>
                <S.Flex>
                    <S.CardButton onClick={handleOpenTask}>
                        <OpenIcon />
                    </S.CardButton>
                    <S.CardButton onClick={handleDeleteTask}>
                        <TrashIcon />
                    </S.CardButton>
                </S.Flex>
            </div>
        </S.CardItem>
    );
};

export default Card;
