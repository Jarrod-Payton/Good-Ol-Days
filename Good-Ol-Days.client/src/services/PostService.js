import { AppState } from "../AppState"
import { logger } from "../utils/Logger"



class PostService{
setActive(id){
  const active = AppState.posts.find( p => p.id === id)
AppState.activePost = active
logger.log('ACTIVE', AppState.activePost)
}
}
export const postService = new PostService()