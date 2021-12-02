import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { albumsService } from '../services/AlbumsService'
import { collaboratorsService } from '../services/CollaboratorsService'
import { firebaseService } from '../services/FirebaseService'
import { notificationService } from "../services/NotificationService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getAllMyCollabAlbums)
      .get('/albums', this.getAllMyAlbums)
      .get('/firebase-token', this.getFirebaseAuthToken)
      .get('/notifications', this.getMyNotifications)
      .delete('/notifications/:id', this.deleteNotifi)
      .put('', this.updateAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAllMyAlbums(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const result = await albumsService.getAllMyAlbums(req.body)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllMyCollabAlbums(req, res, next) {
    try {
      const result = await collaboratorsService.getAllMyCollabAlbums(req.userInfo.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getFirebaseAuthToken(req, res, next) {
    try {
      const token = await firebaseService.getFirebaseAuthToken(req.userInfo.id)
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
  async getMyNotifications(req,res,next){
    try {
      const result = await notificationService.getMyNotifications(req.userInfo.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
  async deleteNotifi(req, res, next){
    try {
      const result = await notificationService.deleteNotifi(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
}
