import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"
import { profileService } from "./ProfileService"

class NotificationService{
  async createCollaboratorNotification(user,album){
      const found = await albumsService.getAlbumById({_id: album})
      const profile = await profileService.getProfileById(user)
      if(!found){
        throw new BadRequest("You're trying to join an album that doesn't exist")
      }
      await dbContext.Notifications.create({type: 'collaborator', notifier:`${profile.name}`,albumName:found.title, isAnswered:false, recipients:[found.creatorId], })
    }
  async getMyNotifications(userId){
    const notifications = await dbContext.Notifications.find({})
    if(!notifications){
      throw new BadRequest('You have no notifications')
    }
    const myNotifications = notifications.filter(n => n.recipients.includes(userId))
    return myNotifications
  }
  async deleteNotifi(notificationId){
    const res = await dbContext.Notifications.findById(notificationId)
    if(!res){
      throw new BadRequest('Invalid Id')
    }
    // if(res.accountId.toString()!== user) {
    //   throw new Forbidden("You don't have permission to do this")
    // }
    await dbContext.Notifications.findByIdAndDelete(notificationId)
  }
}
export const notificationService = new NotificationService()