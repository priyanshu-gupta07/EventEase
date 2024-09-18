import baseQuery from "../query";

export const signup = async (userData) => {
    return baseQuery({
      method: 'POST',
      url: '/user/signup', // Replace with your signup endpoint
      data: userData,
    });
};

  export const login = async (credentials) => {
    return baseQuery({
      method: 'POST',
      url: '/user/login', // Replace with your login endpoint
      data: credentials,
    });
  };