import React from 'react';
import { Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaidOrders from './src/components/PaidOrders';
import ProcessedOrders from './src/components/ProcessedOrders';
import Details from './src/components/Details';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const App = () => {
  // const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="orders" component={Orders} />
        <Stack.Screen name="details" component={Details} />
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name="Paid Orders" component={PaidOrders} />
        <Tab.Screen name="Processed Orders" component={ProcessedOrders} />
      </Tab.Navigator>
    </NavigationContainer>
    // <View>
    //   <Text>Hello World</Text>
    // </View>
  );
};

export default App;
