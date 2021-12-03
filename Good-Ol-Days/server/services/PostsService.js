import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden, NotFound } from '../utils/Errors'
import { firebaseService } from './FirebaseService'

class PostsService {
  async createPost(body) {
    const newPost = await dbContext.Posts.create(body)
    return newPost.populate('creator')
  }

  async getPostsByAlbumId(albumId) {
    return await dbContext.Posts.find({ albumId: albumId })
  }

  async getPostId(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('Invalid Post Id')
    }
    return post
  }

  async deletePost(postId, userInfo) {
    const post = await this.getPostId(postId)
    if (post.creatorId.toString() !== userInfo.id) {
      throw new Forbidden('You do not have permission to delete this post')
    }
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    await firebaseService.deleteFirebasePost(post.imgUrl)
    await dbContext.Posts.findByIdAndDelete(postId)
  }
  async deletePostByAlbum(album){
    const res = await dbContext.Posts.findByIdAndDelete({albumId: album})
    return res
  }
}
export const postsService = new PostsService()
