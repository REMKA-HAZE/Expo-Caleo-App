import axios from "axios";
import { urlBack } from "../../environments/environments.url";

const UsuarioService = (idUsuario) => {
    return axios.get(`${urlBack}/user/${idUsuario}`);
}

export { UsuarioService }
