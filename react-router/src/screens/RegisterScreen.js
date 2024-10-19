import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [documentType, setDocumentType] = useState('Cédula');
  const [documentNumber, setDocumentNumber] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Manejar lógica de registro
    console.log("Registrar con:", {
      email,
      password,
      firstName,
      lastName,
      city,
      documentType,
      documentNumber,
      phone
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Campos de nombre y apellidos */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Ciudad */}
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={city}
        onChangeText={setCity}
      />

      {/* Tipo de documento */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={documentType}
          style={styles.picker}
          onValueChange={(itemValue) => setDocumentType(itemValue)}
        >
          <Picker.Item label="Cédula" value="Cédula" />
          <Picker.Item label="Cédula extranjería" value="Cédulaex" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
          
        </Picker>
      </View>

      {/* Número de documento */}
      <TextInput
        style={styles.input}
        placeholder="Número de Documento"
        value={documentNumber}
        onChangeText={setDocumentNumber}
        keyboardType="numeric"
      />

      {/* Teléfono */}
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirmar contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botón de registro */}
      <Button color={'#388e3c'} title="Registrarse" onPress={handleRegister} />

      {/* Enlace para iniciar sesión */}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión aquí.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  link: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
  },
});
