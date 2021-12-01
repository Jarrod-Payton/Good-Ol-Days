import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
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
  async createPost(body) {
    if (body.challengeId === 'false') {
      body.challengeId = body.challengeId.remove
    }
    if (body.challengeId === 'true') {
      body.challengeId = AppState.activeChallenge.id
    }
    const res = await api.post(`api/albums/${AppState.activeAlbum.id}/posts`, body)
    AppState.posts.unshift(res.data)
  }
}
export const postService = new PostService()