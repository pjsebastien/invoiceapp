import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Keys from '../store/services/Keys';

const firebaseConfig = {
    apiKey: Keys.firebase,
    authDomain: 'invoiceapp-78800.firebaseapp.com',
    databaseURL:
        'https://invoiceapp-78800-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'invoiceapp-78800',
    storageBucket: 'invoiceapp-78800.appspot.com',
    messagingSenderId: '568242210192',
    appId: '1:568242210192:web:48268c363dad680c24df15',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
