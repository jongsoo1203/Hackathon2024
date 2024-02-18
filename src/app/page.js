"use client"
import styles from "./page.module.css";
import React, { useState, useEffect } from "react"; // Import useState and useEffect

async function fetchEvents(query) {
  const data = {
    query: query
  };
  
  const searchParams = new URLSearchParams(data);
  
  // searchParams.toString() === 'var1=value1&var2=value2'
  const url = `https://umb.campuslabs.com/engage/api/discovery/event/search?&${searchParams.toString()}`;

  // return new Promise((resolve, reject) => {
  //   fetch(
  //     url,
  //     {
  //       mode: 'no-cors',
  //     }
  //   ).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     resolve(data);
  //   });
  // });

  const response = await fetch(
    url,
    {
      mode: 'no-cors',
    }
  )

  return await response.json();
}

fetchEvents("hackathon").then(data => {console.log(data)});



export default function Events() {
  // const [events, setEvents] = useState(dummyData.events);
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
      {
      // events.map(event => (
      //   <div key={event.id}>
      //     <h2>{event.name}</h2>
      //     <p>{event.date}</p>
      //   </div>
      // ))
      }
    </div>
  );
}
