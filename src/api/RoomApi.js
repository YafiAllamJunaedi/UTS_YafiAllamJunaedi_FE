import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllRooms = async () => {
    try {
        const response = await axios.get(`${API_URL}/room`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Rooms:', error);
        throw error;
    }
};

export const addRoom = async (roomData) => {
    try {
        const response = await axios.post(`${API_URL}/room/create`, roomData);
        return response.data;
    } catch (error) {
        console.error('Error adding trainer:', error);
        throw error;
    }
};

export const updateRoom = async (id, roomData) => {
    try {
        const response = await axios.put(`${API_URL}/room/update/${id}`, roomData);
        return response.data;
    } catch (error) {
        console.error('Error updating room:', error);
        throw error;
    }
};

export const deleteRoom = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/room/delete/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error deleting trainer:', error);
        throw error;
    }
};
