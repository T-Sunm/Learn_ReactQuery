import { QueryClient } from "@tanstack/react-query";

export const queryclient = new QueryClient();

export async function fetchEvents({ searchTerm, max, signal }) {
  console.log(searchTerm);
  let url = "http://localhost:3000/events";

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (max) {
    url += "?max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();
  console.log(events)

  return events;
}

export async function createNewEvents(eventData) {
  let url = "http://localhost:3000/events";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });



  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();
console.log(events)
  return events;
}

export async function fetchSelectableImages({ signal }) {
  let url = "http://localhost:3000/events/images";

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}
export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();
  
  console.log(events);

  return events;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
