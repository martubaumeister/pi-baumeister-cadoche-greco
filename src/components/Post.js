import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from "../firebase/config";
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

export default function Post(props) {
    let [comentarios, setComentarios] = useState([]);

    useEffect(() => {

        db.collection('comments')
            .where('postId', '==', props.id)
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {

                let comentariosArray = [];

                docs.forEach(doc => {
                    comentariosArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setComentarios(comentariosArray);

            })

    }, [])




    let liked =
        props.data.likes &&
        props.data.likes.includes(auth.currentUser.email);


    function like() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    auth.currentUser.email
                )
            })
            .catch(error => console.log(error));
    }

    function unlike() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    auth.currentUser.email
                )
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>

            <Text style={styles.user}>
                {props.data.email}
            </Text>

            <Text style={styles.description}>
                {props.data.descripcionPost}
            </Text>


            <Text style={styles.likes}>
                Likes: {props.data.likes ? props.data.likes.length : 0}
            </Text>

            {liked ? (

                <Pressable onPress={unlike}>
                    <Text style={styles.button}>Unlike</Text>
                </Pressable>

            ) : (

                <Pressable onPress={like}>
                    <Text style={styles.button}>Like</Text>
                </Pressable>

            )}

            <Pressable
                onPress={() =>
                    props.navigation.navigate(
                        'Comentarios',
                        { id: props.id }
                    )
                }>

                <Text style={styles.commentButton}>
                    Comentar
                </Text>
            </Pressable>

            <Text style={styles.commentTitle}>
                Comentarios
            </Text>

            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (

                    <View style={styles.commentBox}>

                        <Text style={styles.commentEmail}>
                            {item.data.email}
                        </Text>

                        <Text>
                            {item.data.comentario}
                        </Text>
                    </View>

                )} />

        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15
    },

    user: {
        fontWeight: 'bold',
        marginBottom: 8
    },

    description: {
        fontSize: 16,
        marginBottom: 10
    },

    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 10
    },

    likes: {
        marginBottom: 8
    },

    button: {
        color: 'blue',
        marginBottom: 10
    },

    commentButton: {
        color: 'purple',
        fontWeight: 'bold'
    },
    commentTitle: {
        marginTop: 15,
        fontWeight: 'bold',
        marginBottom: 8
    },

    commentBox: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 8
    },

    commentEmail: {
        fontWeight: 'bold',
        marginBottom: 4
    }


});