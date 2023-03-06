import { useCurrentPosition, useGoogleNewrByPlaces } from '@common';
import { Chip } from '@components';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Place } from 'src/@types/Place';

export type Props = {
  type: string;
};

const ListScreen: React.FC<Props> = ({ type }) => {
  const { position, error } = useCurrentPosition('ListScreen');
  const { places } = useGoogleNewrByPlaces(position, type);

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item: place }) => {
          return <PlaceItem {...place} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListScreen;

const PlaceItem = (place: Place) => {
  return (
    <View style={{ margin: 16 }}>
      <FlatList
        data={place.photos}
        renderItem={({ item }) => {
          return (
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: item.uri }}
            />
          );
        }}
      />
      <Text>rating: {place.rating}</Text>
      <Text>{place.name}</Text>
      <Text>address: {place.vicinity}</Text>
    </View>
  );
};
