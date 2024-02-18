"use client"
import styles from "./page.module.css";
import React, { useState, useEffect } from "react"; // Import useState and useEffect

const dummyData = {
  events: [
    {
      id: 1,
      name: "Event 1",
      date: "2024-02-18T11:28:16-05:00"
    },
    {
      id: 2,
      name: "Event 2",
      date: "2024-02-18T11:28:16-05:00"
    },
    {
      id: 3,
      name: "Event 3",
      date: "2024-02-18T11:28:16-05:00"
    }
  ]
};


async function fetchEvents(query) {
  const data = {
    query: query
  };
  
  const searchParams = new URLSearchParams(data);
}

export default function Events() {
  const [events, setEvents] = useState(dummyData.events);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchEvents("yourQueryParameterHere") // Pass your query parameter if needed
    //   .then(data => {
    //     setEvents(data); // Assuming 'data' is the array of events
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     setError(error.toString());
    //     setIsLoading(false);
    //   });
  }, []); // Empty dependency array means this effect runs once on mount

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Other server-side or static content */}
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
