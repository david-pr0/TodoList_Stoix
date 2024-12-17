import React, { useState, useEffect, useRef } from "react";
import * as S from "./TaskCard.styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateContent } from "../../redux/contentSlice";
import { useNavigate } from "react-router-dom";

type CardOrigin =
    | { origin: "task"; id: number } // id é obrigatório para "task"
    | { origin: "editTask"; id?: number } // id opcional para "editTask"
    | { origin: "createTask" }; // origin para criação de tarefas

const TaskCard: React.FC<CardOrigin> = (props) => {
    const { origin } = props; // origin é obrigatório
    const id = (props as { origin: "task" | "editTask"; id: number }).id; // id é opcional, só existe se origin for "task" ou "editTask"
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Obtendo o conteúdo da store (somente para edição)
    const contentFromStore = useSelector((state: RootState) =>
        state.content.contentList.find((item) => item.id === id)?.description
    );
    const currentContent = useSelector((state: RootState) => state.content.currentContent);

    // Obtendo o ID do usuário do estado Redux
    const userId = useSelector((state: RootState) => state.user.id);

    const [localContent, setLocalContent] = useState<string>("");

    // Usar useEffect para definir o conteúdo inicial quando o componente for montado
    useEffect(() => {
        if (origin === "editTask" && id !== undefined) {
            setLocalContent(contentFromStore || currentContent || "");
        } else if (origin === "task" && id !== undefined) {
            setLocalContent(contentFromStore || currentContent || "");
        } else {
            setLocalContent(""); // Se não for edição, deixe vazio para criação
        }
    }, [origin, id, contentFromStore, currentContent]);

    // Função para atualizar o conteúdo local
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalContent(event.target.value);
    };

    // Função para salvar (criar ou editar a tarefa)
    const handleSave = async () => {
        if (!userId) {
            alert("Usuário não autenticado.");
            return;
        }

        const taskData = {
            description: localContent,
            status: "pending",
        };

        // Caso não exista id, faz uma requisição POST para criar a tarefa
        if (!id) {
            console.log("URL da requisição:", `http://projetostoix/api/tasks/${userId}`);

            try {
                const response = await fetch(`http://projetostoix/api/tasks/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(taskData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Tarefa criada com sucesso!");
                    navigate("/home");
                } else {
                    alert(data.message || "Erro ao criar tarefa.");
                }
            } catch (error) {
                alert("Erro ao criar a tarefa. Tente novamente.");
            }
        } else if (origin === "editTask" && id !== undefined) {
            // Caso haja id, faz uma requisição PUT para editar a tarefa
            try {
                const response = await fetch(`http://projetostoix/api/tasks/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(taskData),
                });

                const data = await response.json();

                if (response.ok) {
                    dispatch(updateContent({ id, description: localContent })); // Atualiza a tarefa na store
                    alert("Tarefa atualizada com sucesso!");
                    navigate("/home");
                } else {
                    alert(data.message || "Erro ao atualizar a tarefa.");
                }
            } catch (error) {
                alert("Erro ao atualizar a tarefa. Tente novamente.");
            }
        }
    };

    // Função para cancelar as alterações
    const handleCancel = () => {
        navigate("/home");
    };

    let contentElement = null;

    switch (origin) {
        case "task":
            contentElement = (
                <div className="container">
                    <S.Content ref={contentRef} value={localContent} readOnly onInput={() => {}} />
                </div>
            );
            break;
        case "editTask":
        case "createTask":
            contentElement = (
                <div className="container">
                    <S.Content
                        ref={contentRef}
                        value={localContent}
                        onChange={handleChange}
                        onInput={() => {}}
                    />
                    <S.Flex>
                        <S.SaveButton onClick={handleSave}>Salvar</S.SaveButton>
                        <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
                    </S.Flex>
                </div>
            );
            break;
        default:
            contentElement = (
                <div className="container">
                    <S.Content
                        ref={contentRef}
                        value={localContent} // Exibe conteúdo vazio
                        onChange={handleChange}
                        onInput={() => {}}
                    />
                    <S.Flex>
                        <S.SaveButton onClick={handleSave}>Salvar</S.SaveButton>
                        <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
                    </S.Flex>
                </div>
            );
            break;
    }

    return <S.StyledTask>{contentElement}</S.StyledTask>;
};

export default TaskCard;
