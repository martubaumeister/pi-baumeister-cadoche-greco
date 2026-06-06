import React from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Logout() {
  auth.signOut()
    .then(() => props.navigation.navigate('Login'))
    .catch(error => console.log(error))
}
function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mi perfil</Text>
      <Text style={styles.text}>Email: {auth.currentUser.email}</Text>

      <Pressable style={styles.boton} onPress={Logout}>
        <Text style={styles.textoBoton}>Cerrar sesión.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  boton: {
    backgroundColor: "rgb(75, 75, 234)",
    borderRadius: 10, 
    padding: 10, 
    marginTop: 15, 
    alignItems: "center",
    width: 200, 
    alignSelf:'center',
  },
  text:{
    fontSize: 16, 
    marginBottom: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  }
})
export default Profile;