import React, { useEffect, useState } from "react";
import { TextInput, Pressable, StyleSheet, View, Text } from "react-native";
import { auth } from "../firebase/config";


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState('');

  useEffect(()=> {
      auth.onAuthStateChanged( user => {
        console.log(user)
        if (user != null) {
          props.navigation.navigate('HomeMenu');
        }
      })   
    }, [])

  function onSubmit() {
    setErrores('')
    if (!email.includes('@')) {
      setErrores('Email mal formateado');
    }

    else if (password.length < 6) {
      setErrores('La contraseña debe tener una longitud minima de 6 caracteres');
      
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
          props.navigation.navigate('HomeMenu');
        })
        .catch(error => {
          console.log(error)
          setErrores('Credenciales inválidas')

        })
    }
  }
  function redireccionar(){
    props.navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput style={styles.input}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => setEmail(text)}
        value={email} />
      <TextInput style={styles.input}
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password} />

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}> Logueate </Text>
      </Pressable>

      {errores == "" ? "" : <Text style={styles.error}>{errores}</Text>} 

      <Pressable style={styles.button} onPress={() => redireccionar()}>
        <Text style={styles.buttonText}> No tenes cuenta? Registrate </Text>
      </Pressable>
    </View>
  )
}

export default Login;

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
