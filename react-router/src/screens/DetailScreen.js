import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
    const { item } = route.params; // Recibir el item desde la navegación

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Image
                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                style={styles.image}
            />
            <Text style={styles.subtitle}>Detalles de la receta o ensalada:</Text>
            <Text style={styles.details}>{item.details || 'No hay detalles disponibles.'}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    details: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
});

export default DetailScreen;
