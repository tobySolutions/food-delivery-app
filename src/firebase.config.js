import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB1vA5f-kXEsKkMPWs0gyphQw0uWX66rE0",
    authDomain: "restaurant-app-49762.firebaseapp.com",
    databaseURL: "https://restaurant-app-49762-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-49762",
    storageBucket: "restaurant-app-49762.appspot.com",
    messagingSenderId: "745083938213",
    appId: "1:745083938213:web:8243bada5256e90a81744c"
};

// We need to initialize the app only if there's no app
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };