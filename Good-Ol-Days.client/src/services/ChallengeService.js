import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ChallengeService {
  grabThreeChallenges(array) {
    //Grabs three challenges one by one and after one is selected then deletes that one from the potential options which are all sorted by type before being passed in
    let challenge1 = array[Math.floor(Math.random() * array.length)]
    array = array.filter(s => s !== challenge1)
    let challenge2 = array[Math.floor(Math.random() * array.length)]
    array = array.filter(s => s !== challenge2)
    let challenge3 = array[Math.floor(Math.random() * array.length)]
    const recommended3 = [challenge1, challenge2, challenge3]
    return recommended3
  }
  async createActiveChallenge(ChallengeBody) {
    //This just grabs the info created from the form over in the Challenge.vue component and assigns the bits we need in order to prevent making the challenge part of the form required for albums that do not have any challenges then sends it to the data base and the AppState
    const body = {}
    body.title = ChallengeBody
    body.albumId = AppState.activeAlbum.id
    const activeChallenge = await api.post(`api/challenges`, body)
    AppState.activeChallenge = activeChallenge.data
  }
  async getChallenges() {
    //This checks if the active album has challenges and if it does it makes a network request to get all of them and if it doesn't it saves the client from sending an extra network request, it then filters those to find the one that is set to is active and if there is none then it comes back as an empty object but keeps the challenges stored in the AppState to be used for the back of the post cards
    if (AppState.activeAlbum.hasChallenges === true) {
      const res = await api.get(`api/albums/${AppState.activeAlbum.id}/challenges`)
      AppState.challenges = res.data
      if (AppState.challenges.length > 0) {
        let found = AppState.challenges.find(c => c.isActive === true)
        if (found == undefined) {
          AppState.activeChallenge = {}
        } else {
          AppState.activeChallenge = found
          const check = new Date(AppState.activeChallenge.createdAt).getTime() + 60000
          const today = new Date().getTime()
          if (check < today) {
            await api.delete(`api/challenges/${AppState.activeChallenge.id}`)
            AppState.activeChallenge = {}
          }
        }
      }
    }
  }
  // 606590170 This is a week in miliseconds in order to actually get our app functional

  async getPostChallenge(id) {
    const res = await api.get('api/challenges/' + id)
    AppState.postChallenge = res.data
  }
}

export const challengeService = new ChallengeService()