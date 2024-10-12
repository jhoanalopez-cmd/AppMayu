import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Pedido</Text>
      <TextInput style={styles.input} placeholder="Nombre del producto" />
      <TextInput style={styles.input} placeholder="Cantidad" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Dirección de entrega" />
      <Button title="Enviar Pedido" onPress={() => alert('Pedido enviado!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
