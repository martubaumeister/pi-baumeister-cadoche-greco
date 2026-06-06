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
    <View>
      <Text>Login</Text>
      <TextInput 
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => setEmail(text)}
        value={email} />
      <TextInput 
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password} />

      <Pressable onPress={() => onSubmit()}>
        <Text> Logueate </Text>
      </Pressable>

      {errores == "" ? "" : <Text>{errores}</Text>} 

      <Pressable onPress={() => redireccionar()}>
        <Text> No tenes cuenta? Registrate </Text>
      </Pressable>
    </View>
  )
}

export default Login;