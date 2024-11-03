import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFetchUrl } from './getFetchUrl';

export default async function isLogged(navigation) {
    const token = await AsyncStorage.getItem('accessToken');
    const fetchUrl = await getFetchUrl();

    fetch(fetchUrl + "/isLogged", {
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
        console.error('isLogged Error:', error);
    });
}
