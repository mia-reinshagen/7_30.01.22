import axios from "axios";

const api_url = "http://localhost:3500/api/"
export const register = async (user) => {

    axios.post(`${api_url}auth/signup`, user)

}