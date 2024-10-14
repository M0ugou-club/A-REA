function isLogged() {
    fetch("http://212.195.222.157:8000/isLogged", {
        headers: {
            
        },
    })
    .then(response => {
        if (response.status === 200) {
            navigation.navigate('Home');
        }
    })
    .catch(error => {
        alert('Error:', error);
    });
}