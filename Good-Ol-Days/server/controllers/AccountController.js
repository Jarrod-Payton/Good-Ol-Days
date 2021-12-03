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
      .put('/notifications', this.setSeen)
      .delete('/notifications/:id', this.deleteNotification)
      .put('', this.updateAccount)
  }

  // This is so we can get our account
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  //This is so we can edit the parts of an account
  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  // This gets all of my albums that I am the creator for
  async getAllMyAlbums(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const result = await albumsService.getAllMyAlbums(req.body)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
  
  // This gets all of my albums that I am a collaborator for
  async getAllMyCollabAlbums(req, res, next) {
    try {
      const result = await collaboratorsService.getAllMyCollabAlbums(req.userInfo.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This is how firebase connects and authenticates your account to firebase
  async getFirebaseAuthToken(req, res, next) {
    try {
      const token = await firebaseService.getFirebaseAuthToken(req.userInfo.id)
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }

  //This function gets all of my notifactions, both the posts and the collaborator ones
  async getMyNotifications(req,res,next){
    try {
      const result = await notificationService.getMyNotifications(req.userInfo.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This deletes a notification and it is a Hard Delete
  async deleteNotification(req, res, next){
    try {
      const result = await notificationService.deleteNotification(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
  
  //This edits the bool of the notification on the "seen" to true
  async setSeen(req,res,next){
    try {
      const result = await notificationService.editSeen(req.userInfo.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
}
