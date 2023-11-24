import React, { useEffect, useRef, useState } from 'react';

import { getFirebaseToken, messageInitialization, onForegroundMessage } from 'config/firebase';
import { useUpdateFCMToken } from './apiHooks/settings/fcm.hook';
import { useToaster } from './useToaster';

const useNotification = () => {
  const ref = useRef(false);
  const [token, setToken] = useState('');

  const { mutateAsync: _fcmTokenHandler } = useUpdateFCMToken();
  const { toastNotification } = useToaster();

  const tokenGeneration = async () => {
    getFirebaseToken()
      .then(async (firebaseToken) => {
        if (firebaseToken) {
          setToken(firebaseToken);
          await updateTokenOnBackend(firebaseToken); //#TODO: send Token to Backend, use thisFunction updateTokenOnBackend()
          initializeMessaging();
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err));
  };

  const getNewTokenHandler = async () => {
    try {
      if (Notification.permission === 'default' || Notification.permission === 'granted') {
        // Ask for permission
        await tokenGeneration();
      }
      if (Notification.permission === 'denied') {
        console.warn('Notification Permission Denied ');
      }
    } catch (error) {
      console.error('Error getting permission or token:', error);
    }
  };

  // Function to initialize messaging for receiving messages
  const initializeMessaging = async () => {
    // Implement initialization logic using 'onMessage' function
    messageInitialization()
      .then((payload) => {
        //messaging is initialized
      })
      .catch((err) => console.error('An error occured while retrieving foreground message. ', err));
  };

  // Function to update the token on the backend
  const updateTokenOnBackend = async (newToken) => {
    // Hit your API endpoint to update the token
    try {
      const res = await _fcmTokenHandler({ fcmToken: newToken });
    } catch (err) {
      throw new Error('An error occurred while sending token to backend');
    }
  };

  //#Todo: instead of Show Browser notification We Can use custom Toaster for display notification

  useEffect(() => {
    if (!ref.current) {
      // Call the function to handle permission and token retrieval on component mount
      getNewTokenHandler();
      ref.current = true;
    }
  }, []);

  // #todo:  make some function to remove message listening and remove serverWorker and return them
};

export default useNotification;
