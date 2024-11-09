import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';

export default function DatabaseTablesScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userResponse = await fetch('http://localhost:8082/api/users/all');
        if (!userResponse.ok) throw new Error('Error al obtener usuarios');
        const userData = await userResponse.json();
        console.log("Usuarios:", userData); // Verificación de datos
        setUsers(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderTable = (tableName, data, columns) => (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{tableName}</Text>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No hay datos disponibles</Text>
      ) : (
        <ScrollView horizontal={true}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns.map((col, index) => (
                <Text key={index} style={[styles.tableColumn, styles.headerColumn]}>
                  {col}
                </Text>
              ))}
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  {columns.map((col, index) => (
                    <Text key={index} style={styles.tableColumn}>
                      {item[col.toLowerCase()] || "N/A"}
                    </Text>
                  ))}
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <View style={styles.container}><Text style={styles.errorText}>Error: {error}</Text></View>;

  return (
    <View style={styles.container}>
      {renderTable("Usuarios", users, ['Nombre', 'Apellido', 'Ciudad', 'Correo'])}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tableContainer: {
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    minWidth: 600,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableColumn: {
    flex: 1,
    textAlign: 'center',
    minWidth: 100,
  },
  headerColumn: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    paddingVertical: 20,
  },
});
