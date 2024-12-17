import React from "react";
import TaskCard from "../../Components/TaskCard"; // Ajuste o caminho conforme necessário
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const TaskPage: React.FC = () => {
    const { id } = useParams(); // Pega o id da URL

    // Garantir que id seja um número ou redirecionar em caso de erro
    const parsedId = id ? parseInt(id) : NaN;  // Use NaN em vez de undefined

    // Se o id for NaN, redireciona ou exibe uma mensagem de erro
    if (isNaN(parsedId)) {
        return <div>Erro: ID inválido</div>;
    }

    return (
        <>
            <Header origin="task" />
            <TaskCard origin="task" id={parsedId} /> {/* Passando o id corretamente */}
            <Footer />
        </>
    );
};

export default TaskPage;
