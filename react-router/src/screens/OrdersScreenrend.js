// src/screens/OrdersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/orders/all'); // Cambia el puerto si es necesario
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Cargando pedidos...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text style={styles.orderText}>Producto: {item.productName}</Text>
            <Text style={styles.orderText}>Cantidad: {item.quantity}</Text>
            <Text style={styles.orderText}>Email: {item.email}</Text>
            <Text style={styles.orderText}>Dirección: {item.deliveryAddress}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  orderText: {
    fontSize: 16,
  },
});

export default OrdersScreen;
