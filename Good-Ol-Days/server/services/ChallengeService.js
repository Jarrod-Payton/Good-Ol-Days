import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ChallengeService {
  async getChallengeById(id){
    const res = await dbContext.Challenges.findById(id)
    return res
  }
  async getChallengesByAlbum(id){
    const res = await dbContext.Challenges.find({albumId: id}).populate('album')
    return res
  }
  async createChallenge(data){
    const found = await this.getChallengeById(data.id)
    if(found){
      throw new BadRequest('Invalid Id')
    }
  
    const newChallenge = await dbContext.Challenges.create(data)
    return newChallenge
  }
}
export const challengeService = new ChallengeService()