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
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mi perfil</Text>
      <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
      <View>
        <Text style={styles.text}>Mis publicaciones.</Text>
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text>{item.data.description}</Text>} />
      </View>
      <Pressable style={styles.boton} onPress={Logout}>
        <Text style={styles.textoBoton}>Cerrar sesión.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

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
  }
})
export default Profile;