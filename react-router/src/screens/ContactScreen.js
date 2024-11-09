import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Preparar el objeto con los datos a enviar
    const contactData = {
      name,
      email,
      message
    };

    try {
      // Enviar el mensaje al backend usando fetch()
      const response = await fetch('http://localhost:8082/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert('Mensaje enviado exitosamente!');
        // Limpiar el formulario si la respuesta es exitosa
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contáctanos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
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
        placeholder="Mensaje"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Enviar" color={'#388e3c'} onPress={handleSubmit} />
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
