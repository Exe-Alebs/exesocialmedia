import axiosInstance from 'axiosfolder/axiosInstance';

export const loginUser = async (params) => {
  try {
    const response = await axiosInstance.post('/auth/login', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = () => {};
