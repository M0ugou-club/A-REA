import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import styles from './LoginStyle';

export default function App() {
  return (
    <ImageBackground source={require('./../../assets/background.png')} style={styles.background}>
      <View style={styles.popup}>
        <Text style={styles.title}>Inox QCB</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
        />
        <TextInput
          style={styles.formInput}
          placeholder='Password'
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.textLoginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

