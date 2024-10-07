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
  },

  popup: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'white',
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
    borderColor: 'gray',
    borderRadius: 10,
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
    color: 'white',
    fontSize: width * 0.05,
  },

});

export default styles;