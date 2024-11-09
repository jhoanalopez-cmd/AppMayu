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
  const [nit, setNit] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    const newUser = {
      nombre: firstName,
      apellido: lastName,
      ciudad: city,
      tipoDocumentoIdentidad: documentType,
      documentoIdentidad: documentNumber,
      nit,
      telefono: phone,
      correo: email,
      contrasena: password,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8082/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    
      
  
      if (response.ok) {
        alert('Registro exitoso');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
        alert(`Error al registrar usuario: ${errorData.message || 'Consulta la consola para más detalles'}`);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Hubo un problema con la conexión al servidor');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Campos del formulario */}
      <TextInput style={styles.input} placeholder="Nombre" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Apellidos" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Ciudad" value={city} onChangeText={setCity} />
      <View style={styles.pickerContainer}>
        <Picker selectedValue={documentType} style={styles.picker} onValueChange={(itemValue) => setDocumentType(itemValue)}>
          <Picker.Item label="Cédula" value="Cédula" />
          <Picker.Item label="Cédula extranjería" value="Cédulaex" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
        </Picker>
      </View>
      <TextInput style={styles.input} placeholder="Número de Documento" value={documentNumber} onChangeText={setDocumentNumber} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="NIT" value={nit} onChangeText={setNit} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <Button color={'#388e3c'} title="Registrarse" onPress={handleRegister} />
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
