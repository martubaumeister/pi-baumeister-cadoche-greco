import React, { useEffect, useState } from "react";
import { TextInput, Pressable, StyleSheet, View, Text } from "react-native";
import { db, auth } from "../firebase/config";


function Register(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user != null) {
        props.navigation.navigate('HomeMenu');
      }
    })
  }, [])

  function onSubmit() {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        db.collection('users').add({
          username: username,
          email: email,
          createdAt: Date.now(),
        })
        props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error)
        setRegisterError(error.message)
      })
  }

  function redireccionar() {
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registro</Text>
      <TextInput style={styles.input}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => setEmail(text)}
        value={email} />
      <TextInput style={styles.input}
        keyboardType='default'
        placeholder='username'
        onChangeText={text => setUsername(text)}
        value={username} />
      <TextInput style={styles.input}
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password} />
      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text> Registrate </Text>
      </Pressable>

      {registerError == "" ? null : <Text style={styles.error} >{registerError}</Text>}

      <Pressable style={styles.button} onPress={() => redireccionar()}>
        <Text> Ya tenes cuenta? Inicia sesión </Text>
      </Pressable>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 12,
    backgroundColor: "rgb(165, 165, 165)",
  },
  button: {
    backgroundColor: "rgb(75, 75, 234)",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
  },
  error: {
    color: "#ff0000",
    textAlign: "center",
    fontSize: 12,
  },
  text: {
    marginBottom: 12,
  }
})
