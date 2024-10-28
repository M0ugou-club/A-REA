import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function isLogged(navigation) {
    const token = await AsyncStorage.getItem('accessToken');
    fetch("http://inox-qcb.fr:8000/isLogged", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    .then(response => {
        if (response.status != 200) {
            navigation.navigate('Login');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
