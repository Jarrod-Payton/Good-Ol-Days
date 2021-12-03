import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden, NotFound } from '../utils/Errors'
import { firebaseService } from './FirebaseService'
import { notificationService } from "./NotificationService"

class PostsService {
  async createPost(body) {
    const newPost = await dbContext.Posts.create(body)
    await notificationService.createPostNotification(body.accountId, body.albumId)
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

  async deletePost(body, userInfo) {
    const post = await this.getPostId(body.id)
    if (post.creatorId.toString() !== userInfo.id) {
      throw new Forbidden('You do not have permission to delete this post')
    }
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    await firebaseService.deleteFirebasePost(post.imgUrl)
    await dbContext.Posts.findByIdAndDelete(body.id)
  }
}
export const postsService = new PostsService()
