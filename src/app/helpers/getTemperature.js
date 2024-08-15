import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

export const getTemperatureData = (callback) => {
  const tempRef = ref(database, 'test/temperature');
  
  onValue(tempRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
