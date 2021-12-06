import { AppState } from "../AppState"
import { api } from "./AxiosService"
import {fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from "../utils/Logger"



class FirebaseService {

    // The Upload function stores images in firebase, building the path based on 
    //the album name and the file name of the image itself

    async upload(data, albumData,) {

        //Collection refers to the referecne to the 'albums' storage file
        const collection = storage.ref('albums')

        //Resource is path to the specific asset, .child is the method used to define
        //a child of the previous folder

        const resource = collection.child(albumData.title).child(data.name)

        //Snapshot is a bannana word, this part appends our metadata to the file

        const snapshot = await resource.put(data, {
            customMetadata: {
                 uid: AppState.account.id, size: data.size, type: data.type
            }
        })

        //get the firebase hosting url
        const url = await snapshot.ref.getDownloadURL()
        logger.log(url)

        //return the url to be saved into the MongoDB object
        return url
    }

    //This functions mimics the upload function above, except that it stores the images
    //in a different destination to be used as album cover images
    //TODO refactor to reduce repeated lines
    async uploadCoverImg(data, albumData) {
        logger.log('Cover DATA:', data)
        logger.log('ALBUM DATA:', albumData)
        const collection = storage.ref('albums')

        //this is the only deeplly different line from the upload function above
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

    //Same story here except for profile pictures
    //TODO this is unfinished and needs refactoring
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
    
    //This function calls to our backend service to establish a connection with 
    //firebase. The app uses only one FB user. 
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