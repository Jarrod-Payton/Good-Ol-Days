import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { accountService } from "./AccountService"
import { albumsService } from "./AlbumsService"
import { profileService } from "./ProfileService"

class NotificationService{
  async createCollaboratorNotification(user,album){
      const found = await albumsService.getAlbumById({_id: album})
      if(!found){
        throw new BadRequest("You're trying to join an album that doesn't exist")
      }
      await dbContext.Notifications.create({type: 'collaborator', notifier:`${user}`,albumId:found.id, isVerified:false, recipient:[found.creatorId], })
    }
    async createPostNotification(user,album){
      const found = await albumsService.getAlbumById({_id: album})
      await dbContext.Notifications.create({type: 'post', notifier:`${user}`, albumId:found.id, recipient:[found.creatorId]})
    }
  async getMyNotifications(userId){
    const notifications = await dbContext.Notifications.find({recipient: userId}).populate('album').populate('recipient')
    if(!notifications){
      throw new BadRequest('You have no notifications')
    }
    return notifications
  }
  async deleteNotification(notificationId){
    const res = await dbContext.Notifications.findById(notificationId)
    if(!res){
      throw new BadRequest('Invalid Id')
    }
    // if(res.accountId.toString()!== user) {
    //   throw new Forbidden("You don't have permission to do this")
    // }
    await dbContext.Notifications.findByIdAndDelete(notificationId)
  }
  async editSeen(accountId){
    const result = await dbContext.Notifications.find({recipient: accountId})
    if(!result){
      throw new BadRequest('You have no notifications')
    }
    await dbContext.Notifications.updateMany({recipient: accountId}, {seen:true}, {new:true})
    const update = await dbContext.Notifications.find({recipient: accountId})
    return  update
  }
}
export const notificationService = new NotificationService()