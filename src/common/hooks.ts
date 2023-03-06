import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { useState, useEffect } from 'react';
import { LatLng } from 'react-native-maps';
import { Place } from '../@types/Place';
import { fetchPlaces, loadPhotoUrl } from './functions';

const placeMap = new Map();

const useCurrentPosition = (from: string = '') => {
  console.log('useCurrentPosition', from);

  const options: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
  };
  const [position, setGeoLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [error, setError] = useState<GeolocationError>();

  useEffect(() => {
    const onSuccess = (geolocation: GeolocationResponse) => {
      const {
        coords: { latitude, longitude },
      } = geolocation;
      console.log(geolocation);

      setGeoLocation({ latitude, longitude });
    };
    const onError = (error: any) => {
      setError(error);
    };

    Geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return { position, error };
};

const useGoogleNewrByPlaces = (
  position: ReturnType<typeof useCurrentPosition>['position'],
  type: string
) => {
  const [places, setPlaces] = useState<Place[]>([]);
  console.log('useGoogleNewrByPlaces');

  useEffect(() => {
    console.log('type changed , now type is ', type);

    if (type === '') {
      setPlaces([]);
    }

    const handleTypeChange = async () => {
      if (placeMap.has(type)) {
        console.log("data load from placeMap so don't worry");
        setPlaces(placeMap.get(type));
      } else {
        const data = await fetchPlaces(position, type);
        console.log({ data });

        if (data) {
          // const photos_refs: Promise<string>[] = [];
          // data.forEach(({ photos }) => {
          //   if (photos) {
          //     photos.forEach(({ photo_reference }) => {
          //       photos_refs.push(loadPhotoUrl(photo_reference));
          //     });
          //   }
          // });

          // await Promise.all(photos_refs).then(response => {
          //   let index = 0;
          //   const newdata = data.map(place => {
          //     return {
          //       ...place,
          //       photos: place.photos.map(place_photos => ({
          //         ...place_photos,
          //         uri: response[index++],
          //       })),
          //     };
          //   });
          //   setPlaces(newdata);
          //   placeMap.set(type, newdata);
          // });

          setPlaces(data);
          placeMap.set(type, data);
        }
      }
    };
    handleTypeChange();
  }, [type]);

  return { places };
};

export { useCurrentPosition, useGoogleNewrByPlaces };
