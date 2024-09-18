import baseQuery from "../query";

export const getevents = async () => {
    return baseQuery({
      method: 'GET',
      url: '/api/events', // Replace with your signup endpoint
    });
};


export const geteventsbyorganiser = async (email) => {
    return baseQuery({
      method: 'GET',
      url: `/api/events/organizer/${email}`, // Replace with your signup endpoint
    });
};

export const getEventById = async (id) => {
  return baseQuery({
    method: 'GET',
    url: `/api/events/${id}`, // Replace with your signup endpoint
  });
};
