import { ref, query, orderByChild, startAt, endAt, get, limitToLast } from "firebase/database";
import { database } from "../firebaseConfig";

export const getHistoricalTemperatureData = async () => {
  const now = new Date().getTime();
  
  const tempRef = ref(database, 'temperature_logs');
  const tempQuery = query(tempRef);

  const snapshot = await get(tempQuery);

  if (snapshot.exists()) {
    const data = snapshot.val();
    
    // Get the latest timestamp from the temperature logs
    const latestTimestamp = Math.max(...Object.values(data).map(log => log.timestamp));
    
    // Determine if the device is online (let's say within the last 2 minutes)
    const isOnline = now - latestTimestamp >= (2 * 60 * 1000 * 1000000); // 2 minutes in milliseconds
    
    return { data, isOnline };

  } else {
    console.log("No data found for the query.");
    return { data: null, isOnline: false };
  }
};
