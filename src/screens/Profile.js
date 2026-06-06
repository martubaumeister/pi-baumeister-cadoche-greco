import React from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

function Profile(props) {
  function Logout() {
    auth.signOut()
      .then(() => props.navigation.navigate('Login'))
      .catch(error => console.log(error))
  }

  const [misPosteos, setMisPosteos] = useState([]);
  const[username, setUsername] = useState("");

  useEffect(() => {
    db.collection('posts')
      .where("email", "==", auth.currentUser.email).onSnapshot(
        docs => {
          let posts = [];
          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setMisPosteos(posts);
        })
    db.collection('users')
      .where("email", "==", auth.currentUser.email).onSnapshot(
        docs => {
          docs.forEach(doc => {
            setUsername(doc.data().username);
          })
        })
        
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mi perfil</Text>
      <Text style={styles.text}>Username: {username}</Text>
      <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
      <View>
        <Text style={styles.publicaciones}>Mis publicaciones.</Text>
        <FlatList
          data={misPosteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.post}>
              <Text style={styles.textoPost}>{item.data.description}</Text>
              <Text style={styles.fecha}>{item.data.createdAt}</Text>
            </View>} />
      </View>
      <Pressable style={styles.boton} onPress={Logout}>
        <Text style={styles.textoBoton}>Cerrar sesión.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding:12, 
  },
  boton: {
    backgroundColor: "rgb(75, 75, 234)",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    alignItems: "center",
    width: 200,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  post: {
    padding: 12, 
    borderColor: "black", 
    borderWidth: 1, 
    marginTop: 10, 
    marginBottom: 10, 
    borderRadius: 10,
  },
  textoPost: {
    fontSize: 15, 
    marginBottom: 8,
  },
  fecha: {
    fontWeight: 'bold',
  },
  publicaciones: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10, 
    marginBottom: 10, 
  }
})
export default Profile;