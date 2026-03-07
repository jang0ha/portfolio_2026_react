import axios from 'axios';

export const getProject = async (key) => {
    try {
        const response = await axios.get(`api/projects/${key}`);
    } catch (error) {
        throw error;
    }
}