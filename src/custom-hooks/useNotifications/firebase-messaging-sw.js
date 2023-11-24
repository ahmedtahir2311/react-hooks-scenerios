importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// const firebaseConfig = JSON.parse(new URL(location).searchparams.get('firebaseconfig'));

const firebaseConfig = JSON.parse(new URL(location).searchParams.get('firebaseconfig'));
//  how to use ENV in Public Folder as process is undefined in serviceworker.js

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;

  const notificationOptions = { body: payload.notification.body, icon: payload.data.actorImage };
  console.log('onBackgroundMessage', payload);
  self.registration.showNotification(notificationTitle, notificationOptions);
  self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification

    // Add your redirection logic here
    const openUrl = payload.data.redirectUrl; // Replace with the URL you want to open
    event.waitUntil(clients.openWindow(openUrl));
  });
});
