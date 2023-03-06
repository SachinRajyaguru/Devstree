import { LatLng } from 'react-native-maps';
import { Place } from '../@types/Place';
import { apiKey } from './consts';

const fetchPlaces = async (region: LatLng, type: string): Promise<Place[]> => {
  // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?sensor=false&location=${region.latitude},${region.longitude}&radius=5000&keyword=${type}&key=${apiKey}`;

  try {
    const baseUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const queryParams = {
      sensor: false,
      location: `${region.latitude},${region.longitude}`,
      radius: 5000,
      keyword: type,
      key: apiKey,
    };
    const url = `${baseUrl}?${createSearchParams(queryParams)}`;
    console.log({ url });

    const response = await fetch(url);
    const json = await response.json();
    console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

function createSearchParams(params: { [key: string]: any }) {
  const searchParams = new URLSearchParams();
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }
  return searchParams.toString();
}

const loadPhotoUrl = async (photo_reference: string): Promise<string> => {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${apiKey}`;
  try {
    const response = await fetch(photoUrl);
    if (response.status === 200) {
      return Promise.resolve(response.url);
    } else {
      return Promise.reject(undefined);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(undefined);
  }
};

export { fetchPlaces, createSearchParams, loadPhotoUrl };
