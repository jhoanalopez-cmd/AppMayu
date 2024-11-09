import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

const ContactScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los mensajes de contacto desde el backend
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/contact/all"); // Cambia el puerto si es necesario
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Error al obtener los mensajes de contacto.");
      }
    } catch (error) {
      console.error("Error en la conexión al backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los mensajes al montar el componente
  useEffect(() => {
    fetchMessages();
  }, []);

  // Renderizar cada mensaje en el FlatList
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No hay mensajes de contacto.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  messageContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
});

export default ContactScreen;
