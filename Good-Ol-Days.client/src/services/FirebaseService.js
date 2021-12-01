const { AppState } = require("../AppState")
const { api } = require("./AxiosService")


class FirebaseService {
    async upload(data, type) {
        const collection = storage.ref(type)
        const resource = collection.child(data.name)
        const snapshot = await resource.put(data, {
            customMetadata: {
                uid: AppState.account.id, size: data.size, type: data.type
            }
        })
        const url = await snapshot.ref.getDownloadURL()
        return url
    }
    async login() {
        try {
            const res = await api.get('/account/firebase-token')
            const firebaseAuthToken = res.data.token
            await firebaseAuthToken.signInWithCustomToken(firebaseAuthToken)
        } catch (error) {
            next(error)
        }
    }
}

export const firebaseService = new FirebaseService()