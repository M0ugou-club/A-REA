import { ImageBackground, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import styles from './RegisterPageStyle';
import { useNavigation } from '@react-navigation/native';
import { getFetchUrl } from '../getFetchUrl';
import NetworkLocation from '../NetworkLocation/NetworkLocation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
        try {
            const fetchUrl = await getFetchUrl();
            const response = await fetch(`${fetchUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    surname: lastName,
                    email: email,
                    password: password,
                    passwordConfirm: password,
                    image: "",
                }),
            });
            if (response.status === 201) {
                console.log('User created');
                navigation.navigate('Login');
            } else if (response.status === 500) {
                console.log('Invalid email');
                alert('Invalid email');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <ImageBackground style={styles.background} source={require('./../../assets/background.png')}>
            <Image style={styles.kayzen} source={require('../../assets/kayzen.png')} />
            <View style={styles.popup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.welcome}>Bienvenue !</Text>
                    <Text style={styles.title}>S'enregistrer</Text>
                </View>
                <View>
                    <TextInput 
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        style={styles.normalTextInputs}
                    />
                    <View style={styles.nameContainer}>
                        <TextInput
                            placeholder="Prénom"
                            onChangeText={(text) => setName(text)}
                            style={styles.middleTextInput}
                        />
                        <TextInput
                            placeholder="Nom"
                            onChangeText={(text) => setLastName(text)}
                            style={styles.middleTextInput}
                        />
                    </View>
                    <TextInput
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.normalTextInputs}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.textButton}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <NetworkLocation></NetworkLocation>
        </ImageBackground>
    );
}
