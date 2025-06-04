import axios from "axios";

export const getProjects = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/1.0/project/get_all");
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error);
        return [];
    }
} 