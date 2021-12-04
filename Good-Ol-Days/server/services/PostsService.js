import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden, NotFound } from '../utils/Errors'
import { albumsService } from './AlbumsService'
import { firebaseService } from './FirebaseService'
import { notificationService } from './NotificationService'

class PostsService {
  async createPost(body) {
    const newPost = await dbContext.Posts.create(body)
    await notificationService.createPostNotification(body.creatorId, body.albumId)
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

  async deletePost(postId, userId) {
    const post = await this.getPostId(postId)
    const album = await albumsService.getAlbumById(post.albumId)
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have permission to delete this post')
    }
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    await firebaseService.deleteFirebasePost(album.title, post.imgUrl)
    await dbContext.Posts.findByIdAndDelete(postId)
  }

  async deletePostByAlbum(album) {
    const res = await dbContext.Posts.findByIdAndDelete({ albumId: album })
    return res
  }
}
export const postsService = new PostsService()
