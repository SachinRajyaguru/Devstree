import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { TabView } from '@screens';

export type Props = {};

const Stack = createStackNavigator();

const App: React.FC<Props> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabView"
            component={TabView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
