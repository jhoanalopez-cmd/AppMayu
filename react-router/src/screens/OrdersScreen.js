import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function OrdersScreen() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleSubmit = () => {
    // Aquí se puedes manejar el envío del pedido, por ejemplo, haciendo una llamada a la API.
    Alert.alert('Pedido enviado!', `Producto: ${productName}\nCantidad: ${quantity}\nCorreo: ${email}\nDirección: ${deliveryAddress}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección de entrega"
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
      />
      <Button color={'#388e3c'} title="Enviar Pedido" onPress={handleSubmit} />
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
