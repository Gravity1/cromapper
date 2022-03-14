import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mapbox-gl/dist/mapbox-gl.css';


// Load client library.
var ee = require("@google/earthengine");
const YOUR_CLIENT_ID =
  "838210871922-slqjajl6g0k22qugm4154h94btd3djti.apps.googleusercontent.com";

function auth() {
  ee.data.authenticateViaOauth(
    // clientId,
    YOUR_CLIENT_ID,
    // success,
    () => {
      console.log("authenticateViaOauth SUCCESS ");
      initialize();
      return;
    },
    // error,
    (e) => {
      console.log("authenticateViaOauth FAILED", e);
      ee.data.authenticateViaPopup(
        () => {
          console.log("intial authenticateViaPopup fallback SUCCESSFUL");
          return;
        },
        (e) => {
          return console.log("intial authenticateViaPopup fallback FAILED", e);
        }
      );
    },
    // extraScopes,
    null,
    // onImmediateFailed,
    () => {
      console.log("authenticateViaOauth onimmediateFailed FAILED");
      ee.data.authenticateViaPopup(
        () => {
          console.log("authenticateViaPopup fallback SUCCESSFUL");
          initialize();
          return;
        },
        (e) => {
          console.log("authenticateViaPopup fallback FAILED", e);
        }
      );
    },
    // suppressDefaultScopes
    null
  );
}

function initialize() {
  // console.log("call not from auth function");
  console.log("initializing");
  ee.initialize(
    // baseurl,
    null,
    // tileurl,
    null,
    // successCallback,
    // () => {
    //   console.log("initialized");
    // },
    analyze(),
    // errorCallback,
    (e) => {
      console.log("INITIALIZING FAILED ",e );
    },
    null,
    // xsrfToken,
    null,
    // project
    null
  );
  console.log("Finished init");
  return;
  // analyze();
}

function analyze() {
  var image = new ee.Image("srtm90_v4");
  console.log(image);
  console.log("afterimage");
  image.getMap({ min: 0, max: 1000 }, (map) => {
    console.log(map);
  });
  
}

auth();
// analyze();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
