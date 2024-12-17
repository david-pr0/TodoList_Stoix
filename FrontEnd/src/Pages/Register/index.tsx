import Form from "../../Components/Form"
import * as S from "../Login/List.styles"
import { Link } from "react-router-dom"

const Register = () => {
    return (
        <S.StyledList>
            <Form origin="register"/>
            <p>Já possui uma conta? <Link to={"/"}>Faça Login</Link></p>
        </ S.StyledList>
    )
}

export default Register