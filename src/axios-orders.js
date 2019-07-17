import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-react-ac776.firebaseio.com/"
});

export default instance;
