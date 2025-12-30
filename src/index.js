import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import useStatsStore from "@/store/statsStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Track PWA install
window.addEventListener('beforeinstallprompt', (e) => {
  // User can install the app
  console.log('App can be installed');
});

window.addEventListener('appinstalled', () => {
  // App was installed
  console.log('App installed successfully');
  const { recordInstall } = useStatsStore.getState();
  recordInstall();
});
