import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('/:id', this.getPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:id', this.deletePost)
  }

  // This will create a post associated to an albumId. It will also add a notification
  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.createPost(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  // This will get jus one single post's Id
  async getPostId(req, res, next) {
    try {
      const post = await postsService.getPostId(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  // This will delete a single post.
  async deletePost(req, res, next) {
    try {
      await postsService.deletePost(req.params.id, req.userInfo.id)
      return res.send('this post was deleted')
    } catch (error) {
      next(error)
    }
  }
}
