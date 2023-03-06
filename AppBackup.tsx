import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  Callout,
} from 'react-native-maps';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { arrPlaceTypes } from './src/data/GooglePlaceTypes';
import { Chip } from '@components';
import { apiKey, createSearchParams } from '@common';

type Place = {
  place_id: string;
  name: string;
  rating: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
};
export type Props = {};

const App: React.FC<Props> = ({}) => {
  const [region, setGeoLocation] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [iPlaceType, setPlaceType] = useState<number>(-1);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlacePhotoUrl, setSelectedPlacePhotoUrl] = useState<
    string | undefined
  >(undefined);

  const fetchPlaces = async (region: Region, type: string) => {
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?sensor=false&location=${region.latitude},${region.longitude}&radius=5000&keyword=${type}&key=${apiKey}`;
    const baseUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const queryParams = {
      sensor: false,
      location: `${region.latitude},${region.longitude}`,
      radius: 5000,
      keyword: type,
      key: apiKey,
    };
    const query = createSearchParams(queryParams);
    const url = `${baseUrl}?${query}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error(error);
    }
  };

  const loadPhotoUrl = async (place: Place) => {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`;
    try {
      const response = await fetch(photoUrl);
      const res = await response.blob();
      const objectURL = URL.createObjectURL(res);
      console.log({ objectURL });

      setSelectedPlacePhotoUrl(objectURL);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (iPlaceType === -1) {
      return;
    }

    const handleTypeChange = async (type: string) => {
      const results = await fetchPlaces(region, type);
      console.log(results);

      if (results) {
        setPlaces(results);
      }
    };
    handleTypeChange(arrPlaceTypes[iPlaceType].value);
  }, [iPlaceType]);

  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }: GeolocationResponse) => {
          setGeoLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {region && (
          <MapView
            provider={PROVIDER_GOOGLE}
            region={region}
            style={{ flex: 1 }}>
            <Marker coordinate={region}>
              <Callout>
                <View>
                  <Text>You are here!</Text>
                </View>
              </Callout>
            </Marker>

            {places.map(place => (
              <Marker
                key={place.place_id}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
                onPress={() => {
                  loadPhotoUrl(place);
                }}>
                <Callout>
                  <View>
                    <Text>{place.name}</Text>
                    <Text>Rating: {place.rating}</Text>
                    <Image
                      source={{ uri: selectedPlacePhotoUrl }}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
        <FlatList
          data={arrPlaceTypes}
          renderItem={({ item, index }) => (
            <Chip
              label={item.name}
              isSelected={index == iPlaceType}
              onPress={() => {
                setPlaceType(index);
              }}
            />
          )}
          horizontal
          ListHeaderComponent={
            <Chip
              label={'Clear'}
              isSelected={true}
              onPress={() => {
                setPlaceType(-1);
              }}
            />
          }
          style={{ flexGrow: 0, position: 'absolute', top: 12 }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
