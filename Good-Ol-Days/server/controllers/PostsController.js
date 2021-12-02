import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/albums/:albumId/posts')
    this.router
      .get('', this.getPostsByAlbumId)
      .get('/:id', this.getPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:id', this.deletePost)
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.albumId = req.params.albumId
      const post = await postsService.createPost(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getPostsByAlbumId(req, res, next) {
    try {
      const posts = await postsService.getPostsByAlbumId(req.params.albumId)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPostId(req, res, next) {
    try {
      const post = await postsService.getPostId(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      await postsService.deletePost(req.body, req.userInfo)
      return res.send('this post was deleted')
    } catch (error) {
      next(error)
    }
  }
}
