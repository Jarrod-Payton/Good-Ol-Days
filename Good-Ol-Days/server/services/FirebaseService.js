import firebaseAdmin from 'firebase-admin'
import { logger } from '../utils/Logger'

const firebaseAccountKey = require('../../firebase-admin.json')

class FirebaseService {
  constructor() {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
    this.bucket = firebaseAdmin.storage().bucket('gs://good-ol--days.appspot.com/')
  }

  async getFirebaseAuthToken(userId) {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(userId)
    return firebaseToken
  }

  async deleteFirebasePost(albumName, imageURL, userId) {
    logger.log(imageURL)
    const fileName = imageURL.slice(imageURL.indexOf('%2F') + 3, imageURL.indexOf('?alt'))
    const slice = fileName.slice(fileName.indexOf('%2F') + 3)
    logger.log(slice)
    await this.bucket.deleteFiles({
      prefix: `albums/${albumName}-${userId}/${slice}`
    })
  }

  async deleteFirebaseFolder(albumName, userInfo) {
    await this.bucket.deleteFiles({
      prefix: `albums/${albumName}-${userInfo.id}`
    })
  }
}

export const firebaseService = new FirebaseService()
