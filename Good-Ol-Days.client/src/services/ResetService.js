import { AppState } from "../AppState"

class ResetService {
  resetUtil() {
    //This is purely to save that little one second bugs when you switch albums quickly so that you don't see a glimpse of the last active album's content
    AppState.activeAlbum = {}
    AppState.posts = []
    AppState.activePost = {}
    AppState.activeChallenge = {}
    AppState.doneSyncing = false
  }
}

export const resetService = new ResetService()