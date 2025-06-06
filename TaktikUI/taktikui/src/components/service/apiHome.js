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

export const addProject = async (projectData) => {
    try {
        const response = await axios.post("http://localhost:8080/api/1.0/project/add", projectData, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log("Project added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
};

export const getProject = async (projectId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/1.0/project/${projectId}/get`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}