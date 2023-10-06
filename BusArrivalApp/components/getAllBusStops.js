import { useState, useEffect } from 'react';

export function useBusStops() {
  const [allBusStops, setAllBusStops] = useState([]);

  useEffect(() => {
    // Fetch bus stops data and set it in the state
    fetch('http://datamall2.mytransport.sg/ltaodataservice/BusStops', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        AccountKey: 'fPOHHjmQQ2Cw0HbIs3oLUw==',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const busStops = json.value.slice(0, 100); // Limit to 100 entries(Since the whole list is over 5000 entries long)
        setAllBusStops(busStops); // Store the data in state
        console.log(busStops); // log the updated Bus Stops here
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return allBusStops;
}
