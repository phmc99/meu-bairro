/* eslint-disable no-console */
import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
// import { useRouter } from 'next/router';
import { firebaseCloudMessaging } from '../../../utils/firebase';
import { useToast } from '@chakra-ui/react';

function AppNotification({ children }: any) {
  const toast = useToast();
  // const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('token', token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  // const handleClickPushNotification = (url: any) => {
  //   router.push(url);
  // };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage(message => {
      toast({
        title: message?.notification?.title,
        description: message?.notification?.body,
        duration: 4000,
        isClosable: true
      });
    });
  }

  return <>{children}</>;
}

export default AppNotification;
