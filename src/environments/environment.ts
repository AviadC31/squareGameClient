// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:8000',
  version: require('../../package.json').version,
  firebaseConfig:  {
    apiKey: "AIzaSyAt4PO-LXcWeQSsWb_D2TUPGPOw5FcMICc",
    authDomain: "quickstart-1599500169501.firebaseapp.com",
    projectId: "quickstart-1599500169501",
    storageBucket: "quickstart-1599500169501.appspot.com",
    messagingSenderId: "310561696098",
    appId: "1:310561696098:web:5fc477f57d44775eee643b",
    measurementId: "G-ZXF6Q8KMVK"
  }
};
