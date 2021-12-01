import { AppState } from "../AppState"
import { logger } from "../utils/Logger"



class PostService {
  setActive(id) {
    const active = AppState.posts.find(p => p.id === id)
    AppState.activePost = active
    logger.log('ACTIVE', AppState.activePost)
  }
  async getPosts(albumId) {
    const res = await api.get(`api/albums/${albumId}/posts`)
    logger.log('Posts', res.data)
  }
}
export const postService = new PostService()