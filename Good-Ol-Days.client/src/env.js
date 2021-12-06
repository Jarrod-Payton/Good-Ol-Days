export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = true
export const domain = 'dev-lszte4un.us.auth0.com'
export const clientId = 'UxyDEa3WSyRfuRMFsP3hSI4Fhbo5MeFN'
export const audience = 'https://good-ol-days.com'


export const firebaseConfig = {
  apiKey: "AIzaSyD9_lNlvnsAwjSMSHlrI63X2Eeqs_NGvlw",
  authDomain: "good-ol--days.firebaseapp.com",
  projectId: "good-ol--days",
  storageBucket: "good-ol--days.appspot.com",
  messagingSenderId: "272823108667",
  appId: "1:272823108667:web:96c9185d1d5e1b5403081e",
  measurementId: "G-V4NB752DX4"
};
