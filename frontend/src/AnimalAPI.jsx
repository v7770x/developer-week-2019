import axios from 'axios';

export const getAnimal = async (name) => {
  const res = await axios.get(`http://localhost:5000/animals/${name}`);
  var parser = new DOMParser();
}

export const fetchAnimals = async (
  latitude,
  longitude
) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/get_nearby_images', {
        latitude: latitude,
        longitude: longitude,
      });
    return res;
  } catch (e) {
    alert(e);
  }
}