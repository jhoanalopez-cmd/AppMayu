import React, { useEffect, useState } from 'react';
import { Text, View, Button, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';

// Coloca tu API Key de Spoonacular aquí
const API_KEY = '37e8413034714d4ba1d60436af628e22';

export default function ProductsScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=vegetable&apiKey=${API_KEY}`);
                const json = await response.json();
                setData(json.results);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchVegetables();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            {item.image && <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} style={styles.image} />}
            <Button
                title="Ver más"
                onPress={() => navigation.navigate('Details', { item })} // Cambiado a "Details"
            />
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
    },
    item: {
        backgroundColor: '#90ee90',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
    },
});
