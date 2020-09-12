import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-0128.firebaseio.com/",
});

export default instance;
