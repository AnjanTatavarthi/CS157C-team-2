import axios from "axios";

const backend = axios.create({
    baseURL: "http://localhost:8080", // replace with your API URL and default port
});

export default backend;