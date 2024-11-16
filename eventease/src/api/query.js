import axios from 'axios';

const URL=process.env.REACT_APP_GATEWAY_SERVICE_URL;
console.log(URL);
// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: URL, // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the base query function
const baseQuery = async (config, token) => {
  try {
    // If a token is provided, set the Authorization header
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axiosInstance(config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  } catch (error) {
    // Handle errors here
    throw {
      data: null,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
    };
  }
};

export default baseQuery;
