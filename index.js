import axios from "axios";
import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL:process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};


async function exchangeRate() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const { data } = await axios.get(
      `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}`
    );
    const currencies = data.data;
    const newData = {};
    for (const key in currencies) {
      newData[`USD${key}`] = currencies[key].value;
    }
    await update(ref(db, "currency"), newData);
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

exchangeRate().then(() => {
  // Close Firebase connections or perform other cleanup if needed
  process.exit(0);
});
