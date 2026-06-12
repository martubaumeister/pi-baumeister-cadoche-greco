import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import { useState, useEffect } from 'react';

function Comentarios(props) {

    let [comentario, setComentario] = useState('');
    let [comentarios, setComentarios] = useState([]);



    function agregarComentario() {

        db.collection('comments')
            .add({
                postId: props.route.params.id,
                comentario: comentario,
                email: auth.currentUser.email,
                createdAt: Date.now()
            })
            .then(() => {
                setComentario('');
                props.navigation.navigate("HomeMenu")
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {

        db.collection('comments')
            .where('postId', '==', props.route.params.id)
            // .orderBy('createdAt', 'desc')
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
                onPress={() => agregarComentario()}
            >
                <Text>Comentar</Text>
            </Pressable>



            <Pressable
                style={styles.buttonVolver}
                onPress={() => props.navigation.navigate("HomeMenu")}
            >
                <Text>Volver</Text>
            </Pressable>

            <Text style={styles.title}>
                Lista de comentarios
            </Text>


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
    },

    buttonVolver: {
        backgroundColor: '#d3d3d3',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: 60

    },

    titleComentarios: {
        marginBottom: 15,
        marginTop: 10
    },
})

export default Comentarios;