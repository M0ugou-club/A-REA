import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from './LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        console.log('Token:', token);
        navigation.navigate('Home');
      }
    }
    checkToken();
  });

  async function onLogin() {
    try {
      const response = await fetch("http://212.195.222.157:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        await AsyncStorage.setItem('accessToken', "Bearer " + data.token);
        navigation.navigate('Home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Error:', error);
    }
  }

  return (
    <ImageBackground source={require('./../../assets/background.png')} style={styles.background}>
      <View style={styles.popup}>
        <Text style={styles.title}>Inox QCB</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.formInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton}
          onPress={() => onLogin()}
        >
          <Text style={styles.textLoginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}