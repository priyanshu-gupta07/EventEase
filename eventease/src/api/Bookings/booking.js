import baseQuery from "../query";

export const createbooking = async (data) => {
    return baseQuery({
      method: 'POST',
      url: '/api/bookings',
      data,
    });
}

