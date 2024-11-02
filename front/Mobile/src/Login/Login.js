import { ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './LoginStyle';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkLocation from '../NetworkLocation/NetworkLocation';
import { getFetchUrl } from '../getFetchUrl';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const fetchUrl = await getFetchUrl();
          const token = await AsyncStorage.getItem('accessToken');
          if (token === null) {
            return;
          }
          const response = await fetch(fetchUrl + "/isLogged", {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + token,
            },
          });
          if (response.status === 200) {
            navigation.navigate('Home');
          }
        } catch (error) {
          console.error('test2Error:', error);
        }
      };
      checkLoginStatus();
    }, [navigation])
  );

  async function onLogin() {
    try {
      const fetchUrl = await getFetchUrl();
      const response = await fetch(fetchUrl + "/login", {
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
        await AsyncStorage.setItem('accessToken', data.token);
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textRegisterButton}>Register</Text>
        </TouchableOpacity>
      </View>
      <NetworkLocation />
    </ImageBackground>
  );
}