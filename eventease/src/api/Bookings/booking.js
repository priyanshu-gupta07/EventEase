import baseQuery from "../query";

export const createbooking = async (data) => {
    return baseQuery({
      method: 'POST',
      url: '/api/bookings',
      data,
    });
}

export const getBookings = async (userid,eventid) => {
    return baseQuery({
      method: 'GET',
      url: `/api/bookings/${userid}/${eventid}`,
    });
}

export const getBookingsByUserId = async (userId) => {
    return baseQuery({
      method: 'GET',
      url: `/api/bookings/users/${userId}`,
    });
}

export const getNextEvent = async (Userid) => {
    return baseQuery({
      method: 'GET',
      url: `/api/bookings/nextEvent/${Userid}`,
    });
}