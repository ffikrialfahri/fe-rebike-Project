import axios from './axios';

const ADMIN_URL = '/admin/admins';

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(ADMIN_URL, adminData);
    return response.data.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};
