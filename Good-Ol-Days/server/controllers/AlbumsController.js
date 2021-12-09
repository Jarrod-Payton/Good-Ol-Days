import { albumsService } from '../services/AlbumsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengeService } from '../services/ChallengeService'
import { firebaseService } from '../services/FirebaseService'
import { collaboratorsService } from '../services/CollaboratorsService'
import { postsService } from '../services/PostsService'
import { messagesService } from '../services/MessagesService'
import { socketProvider } from '../SocketProvider'
export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('/:id/posts', this.getPostsByAlbumId)
      .get('/:id', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:id/messages', this.createMessage)
      .get('/:id/messages', this.getMessages)
      .put('/:id/messages', this.toggleMessage)
      .delete('/:id/messages/:messageId', this.deleteMessage)
      .get('/:id/challenges', this.getChallengesByAlbum)
      .get('/:id/collaborators', this.getCollabByAlbumId)
      .post('', this.createAlbum)
      .put('/:id', this.editAlbum)
      .delete('/:id', this.deleteAlbum)
  }

  // This gets all the Posts in our one album
  async getPostsByAlbumId(req, res, next) {
    try {
      const posts = await postsService.getPostsByAlbumId(req.params.id)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  // This gets just one single Album
  async getAlbumById(req, res, next) {
    try {
      const result = await albumsService.getAlbumById(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This gets all the collaborators associated with this one album
  async getCollabByAlbumId(req, res, next) {
    try {
      const result = await collaboratorsService.getCollabByAlbumId(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This gets all the challenges assouciated with this one album
  async getChallengesByAlbum(req, res, next) {
    try {
      const result = await challengeService.getChallengesByAlbum(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This creates an Album
  async createAlbum(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const result = await albumsService.createAlbum(req.body)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getMessages(req, res, next) {
    try {
      const messages = await messagesService.getAll(req.params.id)
      res.send(messages)
    } catch (error) {
      next(error)
    }
  }

  async createMessage(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.albumId = req.params.id
      const message = await messagesService.createMessage(req.body)
      res.send(message)
      socketProvider.messageRoom(`ALBUM_ROOM_${req.params.id}`, 'NEW_MESSAGE', message)
    } catch (error) {
      next(error)
    }
  }

  async deleteMessage(req, res, next) {
    try {
      const messageId = req.params.messageId
      const userId = req.userInfo.id
      await messagesService.deleteMessage(messageId, userId)
      return ('Deleted')
    } catch (error) {
      next(error)
    }
  }

  async toggleMessage(req, res, next) {
    try {
      const messages = await messagesService.updateMessages(req.params.id)
      res.send(messages)
    } catch (error) {
      next(error)
    }
  }

  // This deletes an Album and cascades to delete everything inside of the album
  async deleteAlbum(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      await albumsService.deleteAlbum(req.body, req.userInfo)
      return res.send('this album was deleted')
    } catch (error) {
      next(error)
    }
  }

  // This is so that we can edit any part of an album
  async editAlbum(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const albumId = req.params.id
      const editedAlbum = await albumsService.editAlbum(albumId, req.body)
      return res.send(editedAlbum)
    } catch (error) {
      next(error)
    }
  }
}
