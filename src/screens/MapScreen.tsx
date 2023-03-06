import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { apiKey, useCurrentPosition, useGoogleNewrByPlaces } from '@common';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Place } from '../@types/Place';

export type Props = {
  type: string;
};
const MapScreen: React.FC<Props> = ({ type }) => {
  const { position, error } = useCurrentPosition('MapScreen');
  console.log(position);

  const { places } = useGoogleNewrByPlaces(position, type);
  const [selectedPlacePhotoUrl, setSelectedPlacePhotoUrl] = useState<
    string | undefined
  >(undefined);

  
  const loadPhotoUrl = async (place: Place) => {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`;
    try {
      const response = await fetch(photoUrl);
      setSelectedPlacePhotoUrl(response.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          // latitude: 23.062499,
          // longitude: 72.5289527778328,
          ...position,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}>
        {position && (
          <>
            <Marker coordinate={position}>
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
          </>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
