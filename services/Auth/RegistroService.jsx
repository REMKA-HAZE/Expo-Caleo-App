import axios from "axios";
import { urlBack } from "../../environments/environments.url";

const RegistroService = (usuario) => {
    return axios.post(`${urlBack}/persona`, usuario)
}

export { RegistroService }