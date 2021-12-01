import { challengeService } from "../services/ChallengeService";
import BaseController from "../utils/BaseController";
export class ChallengeController extends BaseController {
    constructor() {
        super('api/challenges')
        this.router
        .get('/:id', this.getChallengeById)
        .post('', this.createChallenge)
    }
    async getChallengeById(req,res,next){
        try {
            const result = await challengeService.getChallengeById(req.params.id)
            return res.send(result)
        } catch (error) {
            next(error)
        }
    }
    async createChallenge(req,res,next){
        try {
            const newChallenge = await challengeService.createChallenge(req.body)
            return res.send(newChallenge)
        } catch (error) {
            next(error)
        }
    }
}