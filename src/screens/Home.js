import { View, FlatList, StyleSheet } from 'react-native';
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
    }
});