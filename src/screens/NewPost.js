import React from "react";
import { View, Text, Pressable, TextInputu, TextInput } from "react-native";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { StyleSheet } from "react-native";


function NewPost() {
  const [descripcion, setDescripcion] = useState("");
  function onSubmit() {
    db.collection("posts").add({
      email: auth.currentUser.email,
      description: descripcion,
      likes: [],
      createdAt: Date.now(),
    })
      .then(() => {
        console.log("Se creo el post correctamente.");
        setDescripcion("")
      }
)
.catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>New post</Text>
      <TextInput placeholder="Contá tu experiencia viajera..." value={descripcion} onChangeText={text=>setDescripcion(text)} style={styles.input}></TextInput>
      <Pressable style={styles.boton} onPress={onSubmit}>
        <Text style={styles.textoBoton}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    padding:20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    textAlign: 'center', 
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input:{
    borderColor: "black", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 20,
  },
  boton:{
    backgroundColor:"rgb(119, 115, 238)", 
    borderRadius: 10, 
    padding:12,
    alignItems: 'center',
    width: 200, 
    alignSelf: "center"
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  }
})

export default NewPost;