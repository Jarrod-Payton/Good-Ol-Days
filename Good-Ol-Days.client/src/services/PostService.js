import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"



class PostService {
  setActive(id) {
    const active = AppState.posts.find(p => p.id === id)
    AppState.activePost = active
    logger.log('ACTIVE', AppState.activePost)
  }
  async getPosts(albumId) {
    const res = await api.get(`api/albums/${albumId}/posts`)
    logger.log('Posts', res.data)
    AppState.posts = res.data
  }
  async createPost(body, hasChallenge) {
    if (hasChallenge === 'true') {
      body.challengeId = AppState.activeChallenge.id
    }
    body.albumId = AppState.activeAlbum.id
    const res = await api.post('api/posts', body)
    AppState.posts.push(res.data)
  }
  async deletePost() {
    await api.delete(`api/posts/${AppState.activePost.id}`)
    AppState.posts = AppState.posts.filter(p => p.id !== AppState.activePost.id)
    AppState.activePost = {}
    Pop.toast('Deleted Post')
  }
}
export const postService = new PostService()