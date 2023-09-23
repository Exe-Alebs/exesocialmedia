import axiosInstance from 'axiosfolder/axiosInstance';

export const loginUser = async (params) => {
  try {
    const response = await axiosInstance.post('/auth/login', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
