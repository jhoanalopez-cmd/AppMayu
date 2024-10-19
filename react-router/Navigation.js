import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import DetailScreen from "./src/screens/DetailScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import ContactScreen from "./src/screens/ContactScreen";
import LoginScreen from './src/screens/LoginScreen';  // Importa la pantalla de inicio de sesión
import RegisterScreen from './src/screens/RegisterScreen';  // Importa la pantalla de registro

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

// Stack Navigator para el inicio de sesión y registro
function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
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

          {/* Auth screens for Login and Register */}
          <Drawer.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{
              drawerLabel: 'Autenticación',
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={focused ? 'log-in' : 'log-in-outline'}
                  size={size}
                  color={focused ? '#03A9F4' : '#000'}
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

          {/* OrdersScreen */}
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
