import axios from "axios";

const publicFetch = axios.create({
	baseURL: `http://localhost:3001/api`
});

export { publicFetch };
