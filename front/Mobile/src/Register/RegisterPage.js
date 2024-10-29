import { ImageBackground, Text, Image, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './RegisterPageStyle';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
        try {
            const response = await fetch("http://inox-qcb.fr:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    name: name,
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
        <ImageBackground style={styles.background} source={require('./../../assets/background.png')} style={styles.background}>
            <View style={styles.popup}>
                <Image style={styles.title} source={require('./../../assets/kaizenLogo.png')} />
                <Text style={styles.title}>Inox QCB</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Email'
                    onChangeText={setEmail}
                    placeholderTextColor={'#CAC7C7'}
                    color = {'#CAC7C7'}
                />
                <View style={styles.utilsInfo}>
                    <TextInput
                        style={styles.formInputUtilsInfo}
                        placeholder='Prénom'
                        onChangeText={setName}
                        placeholderTextColor={'#CAC7C7'}
                        color = {'#CAC7C7'}
                    />
                    <TextInput
                        style={styles.formInputUtilsInfo}
                        placeholder='Pseudo'
                        onChangeText={setUsername}
                        placeholderTextColor={'#CAC7C7'}
                        color = {'#CAC7C7'}
                    />
                </View>
                <TextInput
                    style={styles.formInput}
                    placeholder='Mot de passe'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholderTextColor={'#CAC7C7'}
                    color = {'#CAC7C7'}
                />
                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>S'enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textRegisterButton}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}