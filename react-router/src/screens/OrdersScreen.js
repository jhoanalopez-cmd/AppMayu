import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function OrdersScreen() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de la solicitud

  const handleSubmit = async () => {
    // Validar los campos
    if (!productName || !quantity || !email || !deliveryAddress) {
      alert("Error", "Por favor complete todos los campos.");
      return;
    }

    // Crear el objeto de datos a enviar
    const newOrder = {
      productName,
      quantity: parseInt(quantity),
      email,
      deliveryAddress
    };

    setIsSubmitting(true); // Inicia el estado de envío

    try {
      // Hacer la solicitud POST al backend
      const response = await fetch('http://localhost:8082/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      setIsSubmitting(false); // Finaliza el estado de envío

      if (response.ok) {
        const result = await response.json();
        alert('Pedido Enviado', `Pedido registrado exitosamente:\nProducto: ${result.productName}\nCantidad: ${result.quantity}\nCorreo: ${result.email}\nDirección: ${result.deliveryAddress}`);
        
        // Limpiar el formulario si la respuesta es exitosa
        setProductName('');
        setQuantity('');
        setEmail('');
        setDeliveryAddress('');

      } else {
        alert('Error', 'No se pudo registrar el pedido. Por favor intente de nuevo.');
      }
    } catch (error) {
      setIsSubmitting(false); // Finaliza el estado de envío en caso de error
      console.error("Error al enviar el pedido:", error);
      alert('Error', 'Hubo un problema al enviar el pedido.');
    }
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
      <Button
        color={'#388e3c'}
        title={isSubmitting ? "Enviando..." : "Enviar Pedido"}
        onPress={handleSubmit}
        disabled={isSubmitting} // Deshabilita el botón mientras se envía el pedido
      />
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
