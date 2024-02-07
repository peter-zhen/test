import React from "react";
import { createRoot } from "react-dom/client";

import { I18nextProvider } from "react-i18next";

// Localization setup
import i18n from "./i18n";

// Main Component
import App from "./App";

// Firebase Setup
import "./firebase";

// background services
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import reportWebVitals from "./reportWebVitals";

import "./global.css"

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
