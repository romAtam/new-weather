import fetch from "node-fetch";
const getLatLong = async (place) => {
  try {
    const dataJson = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=pk.eyJ1Ijoicm9tYW41Nzc3IiwiYSI6ImNrc2VwMm9hNDEyZmIycG1jemJ1NXBlMzYifQ.Sx5BlQeQz-HaaDFUta9S2w&limit=1`
    );
    const data = await dataJson.json();
    if (data.features.length === 0) {
      return null;
    }
    return data.features[0].center;
  } catch (error) {
    console.log(error.message);
  }
};
const gotWeather = async (place, cb) => {
  try {
    const coords = await getLatLong(place);
    console.log(coords);
    if (!coords) throw new Error("place not found");
    const [long, lat] = coords;
    cb(undefined, { long: long, lat: lat });
  } catch (error) {
    cb(error, undefined);
  }
};
export default gotWeather;
