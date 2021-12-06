import { firebaseConfig } from '../env'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'


//Exporting all of the useful functions and initializing our firebase app
export const fb = firebase.initializeApp(firebaseConfig)
export const fbAuth = fb.auth()
export const storage = fb.storage()