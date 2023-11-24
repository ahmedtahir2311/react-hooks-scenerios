import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { toastNotification } from "hooks/useToaster";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    const serviceWorkerConfig = encodeURIComponent(
      JSON.stringify(firebaseConfig)
    );
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          `./firebase-messaging-sw.js?firebaseconfig=${serviceWorkerConfig}`,
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPIDKEY,
      serviceWorkerRegistration,
    })
  );

export const messageInitialization = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => onForegroundMessage(payload));
    resolve({ msg: "Notification Initialized" });
  });

export const onForegroundMessage = (payload) => {
  const { data, notification } = payload;
  const options = {
    hideProgressBar: false,
    icon: false,
    autoClose: 5000,
    newestOnTop: true,
    closeOnClick: false,
  };
  const NotificationOptions = {
    title: notification?.title || "",
    body: notification?.body || "",
    icon: data?.actorImage || "", // Set the path to your custom icon
    onClick: data?.redirectUrl || "",
  };
  toastNotification({ options, ...NotificationOptions });
};
