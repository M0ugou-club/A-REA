import { ImageBackground, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
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
    <ImageBackground style={styles.background} source={require('./../../assets/background.png')}>
        <Image style={styles.kayzen} source={require('../../assets/kayzen.png')} />
        <View style={styles.popup}>
            <View style={styles.titleContainer}>
                <Text style={styles.welcome}>Bienvenue !</Text>
                <Text style={styles.title}>Se connecter</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput 
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    style={styles.normalTextInputs}
                />
                <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.normalTextInputs}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={styles.linkContainer}
                >
                    <Text style={styles.link}>S'enregistrer</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onLogin}
                >
                    <Text style={styles.textButton}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </View>
        <NetworkLocation></NetworkLocation>
    </ImageBackground>
  );
}