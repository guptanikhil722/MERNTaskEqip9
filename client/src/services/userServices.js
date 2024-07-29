import axiosInstance from './axiosInstance'; // Import the Axios instance

// Function to update user data
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/update/${userId}` ,userData, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
    return response;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error updating user:', error);
    throw error;
  }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/users/delete/${userId}`, {
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
        return response;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error updating user:', error);
        throw error;
      }
}