import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class ResetService {
  resetUtil() {
    //This is purely to save that little one second bugs when you switch albums quickly so that you don't see a glimpse of the last active album's content
    AppState.activeAlbum = {}
    AppState.posts = []
    AppState.activePost = {}
    AppState.myGroupAlbums = []
    AppState.activeChallenge = {}
    AppState.doneSyncing = false
  }
  openOffCanvas() {
    AppState.editProfile = true
  }
  openPhotoModal() {
    AppState.photoFlipped = true
  }
  flipPhotoModal() {
    AppState.photoFlipped = !AppState.photoFlipped
  }
}

export const resetService = new ResetService()