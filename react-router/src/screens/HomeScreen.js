import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

// Ruta a tu imagen de logo
const logoImage = require('../components/logo.jpeg');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://www.example.com/fondo.jpg' }} // 
        style={styles.background}
        resizeMode="cover" // Para cubrir toda la pantalla
      >
        <View style={styles.overlay} /> {/* Capa transparente */}
        <Image source={logoImage} style={styles.logo}  />
        <Text style={styles.title}>Bienvenido a Distribuidora de Frutos y Verduras MAYU</Text>
        <Text style={styles.subtitle}>Aprovecha nuestras promociones del mes!</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#388e3c', // Capa de superposición oscura
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
    
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff', // Texto blanco para contraste
    marginBottom: 10,
    textShadowColor: '#000', // Sombra de texto para mejorar la legibilidad
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#f0f0f0', // Color suave para subtítulo
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
