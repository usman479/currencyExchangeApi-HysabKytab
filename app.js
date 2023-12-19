import axios from "axios";
import 'dotenv/config'

async function exchangeRate() {
    const {data} = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}`)
    const currencies = data.data
    const newData = {};
    for (const key in currencies) {
        newData[`USD${key}`] = currencies[key].value;
    }
    console.log(newData)
}

exchangeRate();
