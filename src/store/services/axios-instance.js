import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://invoiceapp-78800-default-rtdb.europe-west1.firebasedatabase.app/',
});
export default instance;
