const CACHE_NAME = "gyomu-kanri-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

/* =========================
   Firebase Cloud Messaging
========================= */

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

/* バックグラウンド通知 */

messaging.onBackgroundMessage((payload) => {

  console.log(
    "[firebase-messaging-sw.js] Background message:",
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


/* =========================
   キャッシュ
========================= */

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>
      Promise.all(

        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))

      )
    )

  );

  self.clients.claim();
});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response =>

        response || fetch(event.request)

      )

  );

});
