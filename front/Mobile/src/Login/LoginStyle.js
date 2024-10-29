import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  title: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    margin: 20,
    color: '#CAC7C7',
  },

  popup: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 20,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formInput: {
    width: '80%',
    height: 40,
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CAC7C7',
    borderRadius: 10,
    placeholderTextColor: '#CAC7C7',
  },

  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#0089ED',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLoginButton : {
    color: '#CAC7C7',
    fontSize: width * 0.05,
  },

  registerButton: {
    backgroundColor: '#0089ED',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textRegisterButton: {
    color: '#CAC7C7',
    textDecorationLine: 'underline',
    fontSize: width * 0.04,
    marginTop: height * 0.02,
  },

});

export default styles;