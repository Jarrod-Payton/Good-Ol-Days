import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"
import { albumsService } from "./AlbumsService"
import { notificationService } from "./NotificationService"

class CollaboratorsService {
  async getAllMyCollabAlbums(userId){
    const res = await dbContext.Collaborators.find({accountId: userId}).populate('album account')
    return res
  }
  async getCollabByAlbumId(albumId){
    const res = await dbContext.Collaborators.find({albumId: albumId}).populate('album account')
    return res
  }
  async addCollaborator(data){
    const found = await dbContext.Collaborators.findOne({albumId: data.albumId, accountId: data.accountId})
    if(found){
      throw new BadRequest('They are already a collaborator')
    }
    const newCollaborator = await dbContext.Collaborators.create(data)
    await notificationService.createCollaboratorNotification(data.accountId, data.albumId)
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
    await dbContext.Notifications.findOneAndDelete({notifier: res.accountId, albumId: res.albumId})
  }
  async editCollaborator(collaboratorId, body){
    const found = await dbContext.Collaborators.findById(collaboratorId)
    if(!found){
      throw new BadRequest('Invalid Id')
    }

    const updatedCollab = await dbContext.Collaborators.findByIdAndUpdate(collaboratorId, {verified: true}, {new:true})
    
    await dbContext.Notifications.findOneAndUpdate({albumId: found.albumId, notifier:found.accountId}, {isVerified: true}, {new:true})
    return updatedCollab
  }
}
export const collaboratorsService = new CollaboratorsService()