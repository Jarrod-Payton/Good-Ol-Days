import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from "../utils/Logger"
import JSZip from "jszip"
import { saveAs } from "file-saver"



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

    async downloadFirebase(posts, albumName) {
        logger.log('posts', posts)
        const accountId = AppState.account.id
        const jszip = new JSZip()
        let resources = []
        let downloadUrls = []


        await posts.forEach(async p => {

            const fileName = p.imgUrl.slice(p.imgUrl.indexOf('%2F') + 3, p.imgUrl.indexOf('?alt'))
            const slice = fileName.slice(fileName.indexOf('%2F') + 3)
            logger.log(slice)
            const resource = this.albumsCollection.child(albumName + '-' + accountId).child(slice)
            resources.push(resource)
            logger.log('RESOURCE', resource)
        })

        logger.log('RESOURCE AT 0', resources[0])
        await Promise.all(
            resources.map(async r => r.getDownloadURL().then(res => downloadUrls.push(res)))
        )

        logger.log('urls', downloadUrls[0])
        const downloadedFiles = []
        await Promise.all(downloadUrls.map(url => fetch(url).then(async (res) => {
            logger.log('RES', res)
            downloadedFiles.push(await res.blob())
        })))

        logger.warn('blobs', downloadedFiles)
        downloadedFiles.forEach((file, i) => {
            jszip.file(posts[i].title, file)
        })
        const content = await jszip.generateAsync({ type: 'blob' })
        saveAs(content, "Good Ol' Days")
    }

    //This function mimics the upload function above, except that it stores the images
    //in a different destination to be used as album cover images



    // async uploadCoverImg(data, albumData) {
    //     logger.log('Cover DATA:', data)
    //     logger.log('ALBUM DATA:', albumData)
    //     const collection = storage.ref('albums')

    //     const snapshot = await resource.put(data, {
    //         customMetadata: {
    //              uid: AppState.account.id, size: data.size, type: data.type
    //         }
    //     })
    //     const url = await snapshot.ref.getDownloadURL()
    //     logger.log(url)
    //     return url
    // }

    // //Same story here except for profile pictures
    //   async uploadProfileImage(profileImg, profileName) {

    //     const resource = collection.child('profilePic').child(profileImg)
    //     const snapshot = await resource.put(data, {
    //         customMetadata: {
    //              uid: AppState.account.id, size: data.size, type: data.type
    //         }
    //     })
    //     const url = await snapshot.ref.getDownloadURL()
    //     logger.log(url)
    //     return url
    // }

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