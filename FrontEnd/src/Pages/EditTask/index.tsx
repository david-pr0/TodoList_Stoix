import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import TaskCard from "../../Components/TaskCard";
import { useParams } from "react-router-dom";

const EditTask = () => {
    const { id } = useParams();  // Obtém o id da URL
    const parsedId = id ? parseInt(id) : undefined;  // Converte o id para número ou undefined

    return (
        <>
            <Header origin="task" />
            <TaskCard origin="editTask" id={parsedId} />  {/* Passa o id para o TaskCard */}
            <Footer />
        </>
    );
};

export default EditTask;
