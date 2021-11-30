import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"

class CollaboratorsService {
  async getAllMyAlbums(userId){
    const res = await dbContext.Collaborators.find({accountId: userId}).populate('album account')
    return res
  }
  async addCollaborator(data){
    const found = await dbContext.Collaborators.findOne({albumId: data.albumId, accountId: data.accountId})
    if(found){
      throw new BadRequest('They are already a collaborator')
    }
    const newCollaborator = await dbContext.Collaborators.create(data)
    return newCollaborator.populate('album account')
  }
  async deleteCollaborator(user, collaborator){
    const res = await dbContext.Collaborators.findById(collaborator)
    if(!res){
      throw new BadRequest('Invalid Id')
    }
    if(res.accountId.toString()!== user) {
      throw new Forbidden("You don't have permission to do this")
    }
    await dbContext.Collaborators.findByIdAndDelete(collaborator)
  }
  async editCollaborator(collaborator, body){
    const found = await dbContext.Collaborators.findById(collaborator)
    if(!found){
      throw new BadRequest('Invalid Id')
    }
    if(found.accountId.toString()!== body.creatorId) {
      throw new Forbidden("You don't have permission to do this")
    }
    const updatedCollab = await dbContext.Collaborators.findByIdAndUpdate(collaborator, {verified: true}, {new:true})
    return updatedCollab
  }
}
export const collaboratorsService = new CollaboratorsService()