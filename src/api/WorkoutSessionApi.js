import axios from 'axios';

const API_URL = 'http://localhost:3000';

// GET all Trainers
export const getAllWorkoutSessions = async () => {
    try {
        const response = await axios.get(`${API_URL}/workoutsession`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching WorkoutSession:', error);
        throw error;
    }
};

// POST new Trainer
export const addWorkoutSession = async (workoutsessionData) => {
    try {
        const response = await axios.post(`${API_URL}/workoutsession/create`, workoutsessionData);
        return response.data;
    } catch (error) {
        console.error('Error adding WorkoutSession:', error);
        throw error;
    }
};

// PUT to update a Trainer by ID
export const updateWorkoutSession = async (id, workoutsessionData) => {
    try {
        const response = await axios.put(`${API_URL}/workoutsession/update/${id}`, workoutsessionData);
        return response.data;
    } catch (error) {
        console.error('Error updating workoutSession:', error);
        throw error;
    }
};

// DELETE a Trainer by ID
export const deleteWorkoutSession = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/workoutsession/delete/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error deleting workoutsession:', error);
        throw error;
    }
};
