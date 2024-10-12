import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";  // Pantalla para listar productos
import DetailScreen from "./src/screens/DetailScreen";  // Pantalla de detalles del producto
import OrdersScreen from "./src/screens/OrdersScreen";  // Pantalla futura para pedidos
import ContactScreen from "./src/screens/ContactScreen";  // Pantalla de contacto

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para los productos y detalles
function ProductsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Productos' }} />
      <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Detalles del producto' }} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {/* HomeScreen */}
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerLabel: 'Inicio',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={focused ? '#2196F3' : '#000'}
                />
              ),
            }}
          />
          
          {/* Products and Details */}
          <Drawer.Screen
            name="Products"
            component={ProductsStackNavigator}
            options={{
              drawerLabel: 'Productos',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'leaf' : 'leaf-outline'}
                  size={size}
                  color={focused ? '#4CAF50' : '#000'}
                />
              ),
            }}
          />

          {/* OrdersScreen (futura pantalla para pedidos) */}
          <Drawer.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              drawerLabel: 'Pedidos',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'cart' : 'cart-outline'}
                  size={size}
                  color={focused ? '#FF9800' : '#000'}
                />
              ),
            }}
          />

          {/* ContactScreen */}
          <Drawer.Screen
            name="Contact"
            component={ContactScreen}
            options={{
              drawerLabel: 'Contacto',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'mail' : 'mail-outline'}
                  size={size}
                  color={focused ? '#FF5722' : '#000'}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
