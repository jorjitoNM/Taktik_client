import axios from 'axios'

const addUserStory = async (userStory) => {
    try {
        const response = await axios.post('http://localhost:8080/api/1.0')  
    } catch (error) {
        console.error("Request error: ", error)
        throw error           
    }
}