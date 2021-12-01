import { Auth0Provider } from '@bcwdev/auth0provider'
import { collaboratorsService } from '../services/CollaboratorsService'
import BaseController from '../utils/BaseController'

export class CollaboratorsController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addCollaborator)
      .delete('/:id', this.deleteCollaborator)
      .put('/:id', this.editCollaborator)
  }

  async addCollaborator(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newCollaborator = await collaboratorsService.addCollaborator(req.body)
      return res.send(newCollaborator)
    } catch (error) {
      next(error)
    }
  }

  async deleteCollaborator(req, res, next) {
    try {
      const userId = req.userInfo.id
      const collaboratorId = req.params.id
      await collaboratorsService.deleteCollaborator(userId, collaboratorId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }

  async editCollaborator(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const collaboratorId = req.params.id
      const result = await collaboratorsService.editCollaborator(collaboratorId, req.body)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
}
