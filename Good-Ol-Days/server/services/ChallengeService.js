import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ChallengeService {

  // Get one challenge's Id
  async getChallengeById(id){
    const res = await dbContext.Challenges.findById(id)
    return res
  }

  // get all the challenges in active album
  async getChallengesByAlbum(id){
    const res = await dbContext.Challenges.find({albumId: id}).populate('album')
    return res
  }

  // create a challenge 
  async createChallenge(data){
    const found = await this.getChallengeById(data.id)
    if(found){
      // if there is no challengeId found, then throw BadRequest
      throw new BadRequest('Invalid Id')
    }
  
    const newChallenge = await dbContext.Challenges.create(data)
    return newChallenge
  }

  // This is a soft delete for the challenges
  // This function flips the bool for "isActive"
  async flipActive(id){
    const found = await this.getChallengeById(id)
    if(!found.isActive) {
      throw new BadRequest('This challenge is no longer active')
    }
    return await dbContext.Challenges.findByIdAndUpdate(id, {isActive: false})

  }
}
export const challengeService = new ChallengeService()