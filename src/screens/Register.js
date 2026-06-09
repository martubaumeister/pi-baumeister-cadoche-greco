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
    if (username != '') {
      auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          db.collection('users').add({
            username: username,
            email: email,
            createdAt: Date.now(),
          });
          props.navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error)
          setRegisterError(error.message)
        })
    }
    else {
      setRegisterError('El nombre de usuario es obligatorio');
    }
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
          <Text style={styles.buttonText}> Registrate </Text>
        </Pressable>

        {registerError == "" ? null : <Text style={styles.error} >{registerError}</Text>}

        <Pressable style={styles.button} onPress={() => redireccionar()}>
          <Text style={styles.buttonText}> Ya tenes cuenta? Inicia sesión </Text>
        </Pressable>
      </View>
    );
  }

  export default Register;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(200, 171, 196)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30
    },
    input: {
      width: "100%",
      borderWidth: 1,
      padding: 12,
      borderRadius: 12,
      marginBottom: 14,
      fontSize: 15,
      backgroundColor: "rgb(165, 165, 165)",
    },
    button: {
      backgroundColor: "rgb(75, 75, 234)",
      paddingVertical: 14,
      borderRadius: 12,
      width: "100%",
      alignItems: "center",
      marginBottom: 12,
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: "500",
    },
    error: {
      color: "#ff0000",
      textAlign: "center",
      fontSize: 12,
      marginTop: 8,
    },

    text: {
      marginBottom: 25,
      fontSize: 23,
      fontWeight: "bold",
    }
  })
