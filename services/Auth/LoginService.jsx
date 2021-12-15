import axios from "axios";
import { urlBack } from "../../environments/environments.url";

const LoginService = (data) => {
    return axios.post(`${urlBack}/login`, data);
}

export { LoginService }