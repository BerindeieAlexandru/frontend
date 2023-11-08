import axios from 'axios';

// Configure Axios with the base URL
const api = axios.create({
    baseURL: 'http://localhost:5000',
});

// Define your API functions
export const addScooter = (dataToSend) => {
    return api.post('/add-scooter', dataToSend);
};

export const addReservation = (dataToSend) => {
    return api.post('/add-reservation', dataToSend);
};

export const updateScooter = (dataToSend) => {
    return api.post('/update-scooter', dataToSend);
};
