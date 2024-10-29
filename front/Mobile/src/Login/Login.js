import { ImageBackground, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token === null) {
          return;
        }
        const response = await fetch("http://inox-qcb.fr:8000/isLogged", {
          method: "GET",
          headers: {
            "Authorization": "Bearer" + token,
          },
        });
        if (response.status === 200) {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  async function onLogin() {
    try {
      const response = await fetch("http://inox-qcb.fr:8000/login", {
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
        <Image style={styles.title} source={require('./../../assets/kaizenLogo.png')} />
        <Text style={styles.title}>Inox QCB</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
          placeholderTextColor={'#CAC7C7'}
          color = {'#CAC7C7'}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.formInput}
          placeholder='Mot de passe'
          placeholderTextColor={'#CAC7C7'}
          color = {'#CAC7C7'}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton}
          onPress={() => onLogin()}
        >
          <Text style={styles.textLoginButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textRegisterButton}>S'enregistrer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}