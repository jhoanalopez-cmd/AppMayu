import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
    const { item } = route.params;
    const breed = item.breeds[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{breed.name}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Temperamento: {breed.temperament}</Text>
                <Text style={styles.detail}>Peso: {breed.weight.metric} kg</Text>
                <Text style={styles.detail}>Esperanza de vida: {breed.life_span}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF', // Color de fondo suave
        padding: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2F4F4F', // Color de texto oscuro
    },
    imageContainer: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#B0C4DE', // Borde color claro
        backgroundColor: '#FFFFFF', // Fondo blanco para la imagen
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF', // Fondo blanco para el detalle
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    detail: {
        fontSize: 18,
        color: '#2F4F4F', // Color de texto oscuro
        marginBottom: 10,
    },
});
