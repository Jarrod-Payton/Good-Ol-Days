import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ChallengeService {
  grabThreeChallenges(array) {
    let challenge1 = array[Math.floor(Math.random() * array.length)]
    array = array.filter(s => s.body !== challenge1)
    let challenge2 = array[Math.floor(Math.random() * array.length)]
    array = array.filter(s => s !== challenge2)
    let challenge3 = array[Math.floor(Math.random() * array.length)]
    const recommended3 = [challenge1, challenge2, challenge3]
    return recommended3
  }
  async createActiveChallenge(ChallengeBody) {
    const body = {}
    body.title = ChallengeBody
    body.albumId = AppState.activeAlbum.id
    const activeChallenge = await api.post(`api/challenges`, body)
    logger.log('active Challenge', activeChallenge.data)
    AppState.activeChallenge = activeChallenge.data
  }
  async getChallenges() {
    AppState.activeChallenge = {}
    if (AppState.activeAlbum.hasChallenges === true) {
      const res = await api.get(`api/albums/${AppState.activeAlbum.id}/challenges`)
      logger.log('challenges', res.data)
      AppState.challenges = res.data
      if (AppState.challenges.length > 0) {
        AppState.activeChallenge = AppState.challenges.find(c => c.isActive === true)
      }
    }
  }
}

export const challengeService = new ChallengeService()