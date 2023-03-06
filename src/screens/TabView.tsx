import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ListScreen, MapScreen } from '@screens';

import { arrPlaceTypes } from '../data/GooglePlaceTypes';
import { Chip } from '@components';
import { Place } from '../@types/Place';
const Tab = createMaterialTopTabNavigator();

const EmptyOBJ = {
  name: '',
  value: '',
};

export type Props = {};
const TabView: React.FC<Props> = ({}) => {
  const [iPlaceType, setPlaceType] = useState<number>(-1);

  const getType = () => {
    if (iPlaceType === -1) {
      return '';
    }
    return arrPlaceTypes[iPlaceType].value;
  };

  return (
    <View style={{ flex: 1 }}>
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
        style={{ flexGrow: 0, marginVertical: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      <Tab.Navigator>
        <Tab.Screen name="MapScreen" options={{ title: 'Map' }}>
          {props => {
            return <MapScreen {...props} type={getType()} />;
          }}
        </Tab.Screen>
        <Tab.Screen name="ListScreen" options={{ title: 'List' }}>
          {props => {
            return <ListScreen {...props} type={getType()}/>;
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabView;
