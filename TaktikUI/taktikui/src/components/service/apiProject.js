import axios from "axios";

const BASE_URL = "http://localhost:8080/api/1.0";

// Obtener detalles de un proyecto específico
export const getProject = async (projectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/project/${projectId}/get`);
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
    }
};

// Obtener tareas de una historia de usuario
export const getStoryTasks = async (projectId, storyId) => {
    try {
        const response = await axios.get(`${BASE_URL}/project/${projectId}/user_stories/${storyId}/tasks`);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching story tasks:", error);
        return [];
    }
};

// Crear nueva historia de usuario
export const addUserStory = async (projectId, storyData) => {
    try {
        const response = await axios.post(`${BASE_URL}/project/${projectId}/user_story/add`, storyData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
} catch (error) {
    console.error("Error adding user story:", error);
    throw error;
}
};

// Crear nuevo sprint
export const addSprint = async (projectId, sprintData) => {
    try {
        const response = await axios.post(`${BASE_URL}/project/${projectId}/sprint/add`, sprintData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating sprint:", error);
        throw error;
    }
};

// Invitar usuario al proyecto
export const inviteUserToProject = async (projectId, userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/project/${projectId}/user/invite`, userData, 
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error inviting user:", error);
        throw error;
    }
};