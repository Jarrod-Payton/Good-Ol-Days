import { albumsService } from '../services/AlbumsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengeService } from '../services/ChallengeService'
import { firebaseService } from '../services/FirebaseService'
import { collaboratorsService } from "../services/CollaboratorsService"

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getAlbumById)
      .get('/:id/challenges', this.getChallengesByAlbum)
      .get('/:id/collaborators', this.getCollabByAlbumId)
      .post('', this.createAlbum)
      .put('/:id', this.editAlbum)
      .delete('/:id', this.deleteAlbum)
  }

  async getAlbumById(req, res, next) {
    try {
      const result = await albumsService.getAlbumById(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
  async getCollabByAlbumId(req,res,next){
    try {
      const result = await collaboratorsService.getCollabByAlbumId(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getChallengesByAlbum(req, res, next) {
    try {
      const result = await challengeService.getChallengesByAlbum(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const result = await albumsService.createAlbum(req.body)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

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
