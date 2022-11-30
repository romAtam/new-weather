import fetch from "node-fetch";
const getWeather = async (lat, long) => {
  try {
    const dataJson = await fetch(
      `http://api.weatherstack.com/current?access_key=3b341919f45eabdb27de758dbd3bc99b&query=${lat},${long}`
    );
    const data = await dataJson.json();
    if (data.error) {
      console.log(data.error.info);
      return;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export default getWeather;
