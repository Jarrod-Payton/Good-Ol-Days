import { AppState } from "../AppState"
import { api } from "./AxiosService"
import {fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from "../utils/Logger"



class FirebaseService {

    constructor() {
        this.albumsCollection = storage.ref('albums')
        this.profileCollection = storage.ref('profilePictures')
       
    }
    // The Upload function stores images in firebase, building the path based on 
    //the album name and the file name of the image itself
    //Collection refers to the referencing the 'albums' storage file
    async upload(mediaData, parentData, collectionType) {
        const accountId = AppState.account.id
        //Resource is path to the specific asset, .child is the method used to define
        //a child of the previous folder
        let resource
        if (collectionType === 'profile') {
            resource = this.profileCollection.child(parentData.name + '-' + parentData.id)
            
        } else if (collectionType === 'post') {
             resource = this.albumsCollection.child(`${parentData.title}-${accountId}`).child(`${mediaData.name}-${accountId}`)
        } else {   
             resource = this.albumsCollection.child(`${parentData.title}-${accountId}`).child('coverImg').child(`${mediaData.name}-${accountId}`)
        }

        //Snapshot is a banana word, this part appends our metadata to the file

        const snapshot = await resource.put(mediaData, {
            customMetadata: {
                 uid: AppState.account.id, size: mediaData.size, type: mediaData.type
            }
        })

        //get the firebase hosting url
        const url = await snapshot.ref.getDownloadURL()
        logger.log(url)

        //return the url to be saved into the MongoDB object
        return url
    }

    //This function mimics the upload function above, except that it stores the images
    //in a different destination to be used as album cover images
    //TODO refactor to reduce repeated lines



    async uploadCoverImg(data, albumData) {
        logger.log('Cover DATA:', data)
        logger.log('ALBUM DATA:', albumData)
        const collection = storage.ref('albums')
      
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