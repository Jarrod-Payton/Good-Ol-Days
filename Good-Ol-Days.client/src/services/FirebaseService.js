import { AppState } from "../AppState"
import { api } from "./AxiosService"
import {fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from "../utils/Logger"



class FirebaseService {
    async upload(data, albumData, ) {
        logger.log('Post DATA:', data)
         logger.log('ALBUM DATA:', albumData)
        const collection = storage.ref('albums')
        const resource = collection.child(albumData.title).child(data.name)
        const snapshot = await resource.put(data, {
            customMetadata: {
                 uid: AppState.account.id, size: data.size, type: data.type
            }
        })
        const url = await snapshot.ref.getDownloadURL()
        logger.log(url)
        return url
    }
    async uploadCoverImg(data, albumData) {
        logger.log('Cover DATA:', data)
        logger.log('ALBUM DATA:', albumData)
        const collection = storage.ref('albums')
        const resource = collection.child(albumData.title).child('coverImg').child(data.name)
        const snapshot = await resource.put(data, {
            customMetadata: {
                 uid: AppState.account.id, size: data.size, type: data.type
            }
        })
        const url = await snapshot.ref.getDownloadURL()
        logger.log(url)
        return url
    }
      async uploadProfileImage(profileImg, profileName) {
        const collection = storage.ref(`${profileName}`)
        const resource = collection.child('profilePic').child(profileImg)
        const snapshot = await resource.put(data, {
            customMetadata: {
                 uid: AppState.account.id, size: data.size, type: data.type
            }
        })
        const url = await snapshot.ref.getDownloadURL()
        logger.log(url)
        return url
    }
    
    async login() {
        try {
            const res = await api.get('/account/firebase-token')
            const firebaseAuthToken = res.data.token
            await fbAuth.signInWithCustomToken(firebaseAuthToken)
            logger.log('FB LOGIN SUCCESSFUL')
        } catch (error) {
            logger.error('FB AUTHENTICATION ERROR', error)
        }
    }
}

export const firebaseService = new FirebaseService()