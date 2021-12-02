import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { albumsService } from "./AlbumsService"
import { profileService } from "./ProfileService"

class NotificationService{
  async createCollaboratorNotification(user,album){
      const found = await albumsService.getAlbumById({albumId: album})
      const profile = await profileService.getProfileById(user)
      if(!found){
        throw new BadRequest("You're trying to join an album that doesn't exist")
      }
      const res = await dbContext.Notifications.create({type: 'collaborator', notifier:`${profile.name}`,albumName:found.title, isAnswered:false, recipients:[found.creatorId], })
      return res
    }
  async getMyNotifications(userId){
    const notifications = await dbContext.Notifications.find({})
    if(!notifications){
      throw new BadRequest('You have no notifications')
    }
    const myNotifications = notifications.filter(n => n.recipients.includes(userId))
    return myNotifications
  }
  
}
export const notificationService = new NotificationService()