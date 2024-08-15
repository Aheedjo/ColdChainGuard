import { ref, query, orderByChild, startAt, endAt, get } from "firebase/database";
import { database } from "../firebaseConfig";

export const getHistoricalTemperatureData = async () => {
  const now = new Date().getTime();
  const twoHoursAgo = now - (2 * 60 * 60 * 1000); // 2 hours in milliseconds
  
  const tempRef = ref(database, 'temperature_logs');
  // console.log("Temp Reference:", tempRef);
  
  // const tempQuery = query(tempRef, orderByChild('timestamp'), startAt(twoHoursAgo), endAt(now));
  // console.log("Query:", tempQuery);
  
  const snapshot = await get(tempRef);

  console.log(snapshot.val())
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Data:", data);
    return data;
  } else {
    console.log("No data found for the query.");
    return null;
  }
};
