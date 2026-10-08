importScripts(
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA7ihB1-aqHXlZ0Hz8ZNz9OWbilUTAvy7o",
  authDomain: "gyomu-kanri-2acaf.firebaseapp.com",
  projectId: "gyomu-kanri-2acaf",
  storageBucket: "gyomu-kanri-2acaf.firebasestorage.app",
  messagingSenderId: "265801141421",
  appId: "1:265801141421:web:fdd61594aedbdc419c0a24"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "業務管理";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "新しい通知があります。",
    icon: "./logo.png",
    badge: "./logo.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
