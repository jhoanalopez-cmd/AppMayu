import React, { useEffect, useState } from 'react';
import { Text, View, Button, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';

// La API Key que tienes
const API_KEY = 'TU_API_KEY';

export default function CatScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "live_OKcY2EVemX3NHWErdG0cUK1pKVQEG4Wk3JMkyZqh9ORdknlEKHixTibxAj7TiCSm",
        });
        

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        };

        // Llamar a la API de The Cat API
        fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=50", requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            {item.breeds.length > 0 ? (
                <>
                    <Text style={styles.title}>{item.breeds[0].name}</Text>
                    <Image source={{ uri: item.url }} style={styles.image} />
                    <Button
                        title="Ver más"
                        onPress={() => navigation.navigate('Details', { item })}
                    />
                </>
            ) : (
                <Text>No breed data</Text>
            )}
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
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
        backgroundColor: '#800080',
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
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
    },
});
