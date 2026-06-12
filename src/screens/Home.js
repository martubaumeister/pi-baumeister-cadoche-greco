import { View, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import Post from '../components/Post';

export default function Home(props) {

    let [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {

                let postsArray = [];

                docs.forEach(doc => {
                    postsArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setPosts(postsArray);

            })

    }, [])

    return (
        <View style={styles.container}>

            <Text style={styles.travelBook}>
                Travel Book
            </Text>

            <Text style={styles.descripcionApp}>
                Descubrí destinos increíbles a través de experiencias reales. Compartí tus aventuras, inspirá a otros viajeros y encontrá recomendaciones auténticas de una comunidad apasionada por explorar el mundo.
            </Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (

                    <Post
                        id={item.id}
                        data={item.data}
                        navigation={props.navigation}

                    />

                )}
            />

        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#eaeaea'
    },

    travelBook: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
        color: '#384d62',
        letterSpacing: 1
    },

    descripcionApp: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
        color: '#384d62',
    }
});