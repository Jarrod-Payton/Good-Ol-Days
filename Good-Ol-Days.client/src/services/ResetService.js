import { AppState } from "../AppState"

class ResetService {
  resetUtil() {
    AppState.activeAlbum = {}
    AppState.posts = []
    AppState.activePost = {}
    AppState.activeChallenge = {}
    AppState.doneSyncing = false
  }
}

export const resetService = new ResetService()