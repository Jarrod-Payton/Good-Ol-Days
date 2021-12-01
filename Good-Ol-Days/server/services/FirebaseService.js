import firebaseAdmin from 'firebase-admin'

const firebaseAccountKey = require('../../firebase-admin.json')

const bucket = firebaseAdmin.storage().bucket()
class FirebaseService {
  constructor() {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }

  async getFirebaseAuthToken(user) {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(user.id)
    return firebaseToken
  }

  async deleteFirebasePost(imageURL) {
    const fileName = imageURL.slice(imageURL.indexOf('%2F') + 3, imageURL.indexOf('?alt'))
    await bucket.deleteFiles({
      prefix: `${fileName}`
    })
  }

  async deleteFirebaseFolder(albumName) {
    await bucket.deleteFiles({
      prefix: `${albumName}`
    })
  }
}

export const firebaseService = new FirebaseService()
