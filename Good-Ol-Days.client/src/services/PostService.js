import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"
import { challengeService } from "./ChallengeService"



class PostService {
 async setActive(id) {
    // Set post to Active Post
    const active = AppState.posts.find(p => p.id === id)
    AppState.activePost = active
    logger.log('ACTIVE', AppState.activePost)
    if(active.challengeId) {
  await challengeService.getPostChallenge(active.challengeId)
    }
  }
  async getPosts(albumId) {
    // Get all posts for this album with album ID
    const res = await api.get(`api/albums/${albumId}/posts`)
    logger.log('Posts', res.data)
    AppState.posts = res.data
    AppState.doneSyncing = true
  }
  async createPost(body, hasChallenge) {
    // Create a new post with post body and if it has challenge or not
    if (hasChallenge === 'true') {
      body.challengeId = AppState.activeChallenge.id
    }
    body.albumId = AppState.activeAlbum.id
    const res = await api.post('api/posts', body)
    AppState.posts.push(res.data)
  }
  async deletePost() {
    // Deletes a post with the active Post ID
    await api.delete(`api/posts/${AppState.activePost.id}`)
    AppState.posts = AppState.posts.filter(p => p.id !== AppState.activePost.id)
    AppState.activePost = {}
    Pop.toast('Deleted Post')
  }
}
export const postService = new PostService()