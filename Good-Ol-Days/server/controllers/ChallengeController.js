import { challengeService } from '../services/ChallengeService'
import BaseController from '../utils/BaseController'
export class ChallengeController extends BaseController {
  constructor() {
    super('api/challenges')
    this.router
      .get('/:id', this.getChallengeById)
      .post('', this.createChallenge)
      .delete('/:id', this.flipActive)
  }

  // This gets the single challenge by finding its id. 
  async getChallengeById(req, res, next) {
    try {
      const result = await challengeService.getChallengeById(req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  // This creates a challenge and connects it to the associated album
  async createChallenge(req, res, next) {
    try {
      const newChallenge = await challengeService.createChallenge(req.body)
      return res.send(newChallenge)
    } catch (error) {
      next(error)
    }
  }

  // This is a soft delete (edits) that flips a bool for a challenge. It changes the "isActive" to false
  async flipActive(req, res, next) {
    try {
      const flipped = await challengeService.flipActive(req.params.id)
      return res.send(flipped)
    } catch (error) {
      next(error)
    }
  }
}
