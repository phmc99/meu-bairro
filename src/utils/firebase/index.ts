import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: 'AIzaSyBgkiimKZIUtbKQXr6VL61h7nMqZCf5500',
        authDomain: 'meu-bairro-e5b75.firebaseapp.com',
        projectId: 'meu-bairro-e5b75',
        storageBucket: 'meu-bairro-e5b75.appspot.com',
        messagingSenderId: '820606093133',
        appId: '1:820606093133:web:c4c5247fc8a05a408f1904'
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem('@mb:fcm-token');

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              'BEXuLDePAWumj5BEMpLDC9NBc-xgoIRtDMG3UkUceZRb3qBuT6-MZAww4LrdMkUJBVFtYbCeAt4M9nt1lnu32bw'
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('@mb:fcm-token', fcm_token);
            localStorage.setItem('@mb:fcm-token', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
};
export { firebaseCloudMessaging };
