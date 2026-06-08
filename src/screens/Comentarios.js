import { View, Text, StyleSheet, Pressable, useEffect, useState } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';


export default function Comentarios({ }) {

    function agregarComentario() {

        let [comentario, setComentario] = useState('');
        let [comentarios, setComentarios] = useState([]);

        let postId = ;

        function agregarComentario() {

            db.collection('comments')
                .add({
                    postId: postId,
                    comentario: comentario,
                    email: auth.currentUser.email,
                    createdAt: Date.now()
                })
                .then(() => {
                    setComentario('');
                })
                .catch(error => console.log(error));
        }

        useEffect(() => {

            db.collection('comments')
                .where('postId', '==', postId)
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

        return (
            <View style={styles.container}>

                <Text style={styles.title}>
                    Comentarios
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Escribí un comentario'
                    onChangeText={text => setComentario(text)}
                    value={comentario}
                />

                <Pressable
                    style={styles.button}
                    onPress={agregarComentario}
                >
                    <Text>Comentar</Text>
                </Pressable>

                <FlatList
                    data={comentarios}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (

                        <View style={styles.commentBox}>

                            <Text style={styles.email}>
                                {item.data.email}
                            </Text>

                            <Text>
                                {item.data.comentario}
                            </Text>

                        </View>

                    )}
                />

            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#eaeaea',
            padding: 20
        },

        title: {
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 20
        },

        input: {
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 5,
            marginBottom: 10
        },

        button: {
            backgroundColor: 'skyblue',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 20
        },

        commentBox: {
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 5,
            marginBottom: 10
        },

        email: {
            fontWeight: 'bold',
            marginBottom: 5
        }
    })}