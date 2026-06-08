import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

export default function Post(props) {

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

            {/* {props.data.imagen ? (
                <Image
                    source={{ uri: props.data.imagen }}
                    style={styles.image}
                />
            ) : null} */}

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
    }
});