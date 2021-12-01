import { AppState } from "../AppState"
import { api } from "./AxiosService"
import {fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from "../utils/Logger"



class FirebaseService {
    async upload(postData, albumData) {
        logger.log('Post DATA:', postData)
         logger.log('ALBUM DATA:', albumData)
        const collection = storage.ref('albums')
        const resource = collection.child(albumData.title).child(postData.name)
        const snapshot = await resource.put(postData, {
            customMetadata: {
                 uid: AppState.account.id, size: postData.size, type: postData.type
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