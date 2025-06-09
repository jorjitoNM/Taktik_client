import axios from 'axios'

const addUserStory = async (userStory) => {
    try {
        const response = await axios.post('http://localhost:8080/api/1.0/project/user-story/add', userStory,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                }
            })
            
        return response.data      
    } catch (error) {
        console.error("Request error: ", error)
        throw error           
    }
}