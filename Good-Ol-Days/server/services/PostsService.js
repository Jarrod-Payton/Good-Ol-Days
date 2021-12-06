import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden, NotFound } from '../utils/Errors'
import { albumsService } from './AlbumsService'
import { firebaseService } from './FirebaseService'
import { notificationService } from './NotificationService'

class PostsService {
  async createPost(body) {
    // Creates a post
    const newPost = await dbContext.Posts.create(body)
    // Creates a notification for the associated post
    await notificationService.createPostNotification(body.creatorId, body.albumId)
    return newPost.populate('creator')
  }

  async getPostsByAlbumId(albumId) {
    // Finds a post where albumId matches the request albumId
    return await dbContext.Posts.find({ albumId: albumId })
  }

  async getPostId(id) {
    const post = await dbContext.Posts.findById(id)
    // Checks to see if there's a post that matches a postId. If false throws a badrequest
    if (!post) {
      throw new BadRequest('Invalid Post Id')
    }
    return post
  }

  async deletePost(postId, userId) {
    // Gets post information by postId
    const post = await this.getPostId(postId)
    // Gets album information by albumId
    const album = await albumsService.getAlbumById(post.albumId)
    // Checks to see if the posts creator matches the current userId. If false throws a Forbidden
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have permission to delete this post')
    }
    // Checks to see if you were able to get a post. If false throws a badrequest
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    // Deletes post from firebase
    await firebaseService.deleteFirebasePost(album.title, post.imgUrl)
    // Deletes post from mongodb matching the postId
    await dbContext.Posts.findByIdAndDelete(postId)
  }

  async deletePostByAlbum(album) {
    // Deletes the posts where a posts albumId matches the requests albumId
    const res = await dbContext.Posts.findByIdAndDelete({ albumId: album })
    return res
  }
}
export const postsService = new PostsService()
