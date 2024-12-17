import Form from "../../Components/Form"
import * as S from "./List.styles"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <S.StyledList>
            <Form origin={"login"} />
            <p>Não tem uma conta? <Link to={"/register"}>Registre-se agora mesmo</Link></p>
        </ S.StyledList>
    )
}

export default Login