import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CatScreen from "./src/screens/CatScreen";  // Importar CatScreen

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Configuración del Stack Navigator para perros
function DogStackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Conoce acerca de los perros' }} />
      <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Detalles' }} />
    </Stack.Navigator>
  );
}

// Configuración del Stack Navigator para gatos (puedes reutilizar DetailScreen si quieres)
function CatStackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Cats" component={CatScreen} options={{ title: 'Conoce acerca de los gatos' }} />
      <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Detalles' }} />
    </Stack.Navigator>
  );
}

// Configuración del Drawer Navigator
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Dogs"
            component={DogStackNavigator}
            options={{
              drawerLabel: 'Dogs',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'paw' : 'paw-outline'}
                  size={size}
                  color={focused ? '#2196F3' : '#000'}
                />
              ),
              drawerLabelStyle: { color: '#2196F3' },
            }}
          />
          <Drawer.Screen
            name="Cats"
            component={CatStackNavigator}
            options={{
              drawerLabel: 'Cats',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'sparkles' : 'sparkles-outline'}
                  size={size}
                  color={focused ? '#800080' : '#000'}
                />
              ),
              drawerLabelStyle: { color: '#800080' },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
