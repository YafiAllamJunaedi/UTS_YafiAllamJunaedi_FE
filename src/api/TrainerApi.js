import axios from 'axios';

const API_URL = 'http://localhost:3000';

// GET all Trainers
export const getAllTrainers = async () => {
    try {
        const response = await axios.get(`${API_URL}/trainer`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Trainers:', error);
        throw error;
    }
};

// POST new Trainer
export const addTrainer = async (trainerData) => {
    try {
        const response = await axios.post(`${API_URL}/trainer/create`, trainerData);
        return response.data;
    } catch (error) {
        console.error('Error adding trainer:', error);
        throw error;
    }
};

// PUT to update a Trainer by ID
export const updateTrainer = async (id, trainerData) => {
    try {
        const response = await axios.put(`${API_URL}/trainer/update/${id}`, trainerData);
        return response.data;
    } catch (error) {
        console.error('Error updating trainer:', error);
        throw error;
    }
};

// DELETE a Trainer by ID
export const deleteTrainer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/trainer/delete/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error deleting trainer:', error);
        throw error;
    }
};
