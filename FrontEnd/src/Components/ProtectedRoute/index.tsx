import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("authToken");

    // Se o token não existe, redireciona para a tela de login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Se o token existe, renderiza o componente filho
    return children;
};

export default ProtectedRoute;
