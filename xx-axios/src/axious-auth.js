import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/account'
});

instance.defaults.headers.common['Something'] = 'something';

export default instance;