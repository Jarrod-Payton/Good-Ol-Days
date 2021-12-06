import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { albumsService } from './AlbumsService'
import { notificationService } from './NotificationService'

class CollaboratorsService {
  // This gets all the albums where you are a collaborator
  async getAllMyCollabAlbums(userId) {
    const res = await dbContext.Collaborators.find({ accountId: userId }).populate('album account')
    return res
  }

  // This gets the collaborators for an album by album Id
  async getCollabByAlbumId(albumId) {
    const res = await dbContext.Collaborators.find({ albumId: albumId }).populate('album account')
    return res
  }

  // This adds a collaborator and assigns the albumId they're being added to
  async addCollaborator(data) {
    const found = await dbContext.Collaborators.findOne({ albumId: data.albumId, accountId: data.accountId })
    // If found is true the person being added is already a collaborator
    if (found) {
      throw new BadRequest('They are already a collaborator')
    }
    // Creates a new collaborator if found is false and also creates a notification for the collaborator being added
    const newCollaborator = await dbContext.Collaborators.create(data)
    await notificationService.createCollaboratorNotification(data.accountId, data.albumId)
    return newCollaborator.populate('album account')
  }

  // Removes a collaborator
  async deleteCollaborator(user, collaborator) {
    const res = await dbContext.Collaborators.findById(collaborator)
    // Checks to see if collaborator Id exists in Collaborators on the database. If false throws invalid Id
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    // Checks to see if the userId of the collaboration is not equal to the creator of the collaboration. If false throws invalid permission
    // If the if statements pass deletes the collaborator and the notification associated with it
    await dbContext.Collaborators.findByIdAndDelete(collaborator)
    await dbContext.Notifications.findOneAndDelete({ notifier: res.accountId, albumId: res.albumId })
  }

  // Edits a collaborator - flipping verified to true on both the notification and collaborator
  async editCollaborator(collaboratorId, body) {
    const found = await dbContext.Collaborators.findById(collaboratorId)
    // Checks to see if a collaborator in the database has a matching collaborator Id
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    // Flips the bool to verified in collaborators and notifications if the if statement passes
    const updatedCollab = await dbContext.Collaborators.findByIdAndUpdate(collaboratorId, { verified: true }, { new: true })
    await dbContext.Notifications.findOneAndUpdate({ albumId: found.albumId, notifier: found.accountId }, { isVerified: true }, { new: true })
    return updatedCollab
  }
}
export const collaboratorsService = new CollaboratorsService()
