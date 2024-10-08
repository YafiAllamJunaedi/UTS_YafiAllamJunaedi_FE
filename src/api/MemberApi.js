import axios from 'axios';

const API_URL = 'http://localhost:3000';

// GET all members
export const getAllMembers = async () => {
    try {
        const response = await axios.get(`${API_URL}/member`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error;
    }
};

export const getAllData = async (path) => {
    try {
        const response = await axios.get(`${API_URL}/${path}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        throw error;
    }
};



// GET member by ID
export const getMemberById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching member:', error);
        throw error;
    }
};

// POST new member
export const addMember = async (memberData) => {
    try {
        const response = await axios.post(`${API_URL}/member/create`, memberData);
        return response.data;
    } catch (error) {
        console.error('Error adding member:', error);
        throw error;
    }
};

// PUT to update a member by ID
export const updateMember = async (id, memberData) => {
    try {
        const response = await axios.put(`${API_URL}/member/update/${id}`, memberData);
        return response.data;
    } catch (error) {
        console.error('Error updating member:', error);
        throw error;
    }
};

// DELETE a member by ID
export const deleteMember = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/member/delete/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error deleting member:', error);
        throw error;
    }
};
