import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'
import { BadRequest, Forbidden } from '../utils/Errors'
import { accountService } from './AccountService'
import { albumsService } from './AlbumsService'
import { profileService } from './ProfileService'

class NotificationService {
  // creates a notification when a collaborator is created
  async createCollaboratorNotification(user, album) {
    const found = await albumsService.getAlbumById({ _id: album })
    // Checks to see if an album has a matching album ID. If false throws badrequest
    if (!found) {
      throw new BadRequest("You're trying to join an album that doesn't exist")
    }
    // If the if statement passes it creates a notification for the collaborator that is being created
    await dbContext.Notifications.create({ type: 'collaborator', notifierId: `${user}`, albumId: found.id, isVerified: false, recipient: [found.creatorId] })
    const eventName = 'NEW_NOTIFICATION'
    const payload = await this.getMyNotifications(found.creatorId)
    socketProvider.messageUser(found.creatorId.toString(), eventName, payload)
  }

  async createPostNotification(user, album) {
    // Finds an album by album ID
    const found = await albumsService.getAlbumById({ _id: album })
    // Creates a post notification using the found album's data
    if(!user === found.creatorId){
      await dbContext.Notifications.create({ type: 'post', notifierId: `${user}`, albumId: found.id, recipient: [found.creatorId] })
    }
  }

  async getMyNotifications(userId) {
    const notifications = await dbContext.Notifications.find({ recipient: userId }).populate('album').populate('notifier')
    // Finds the notifications for an account where your accountId is in the array of recipients. If false throws badrequest
    if (!notifications) {
      throw new BadRequest('You have no notifications')
    }
    return notifications
  }

  async deleteNotification(notificationId) {
    const res = await dbContext.Notifications.findById(notificationId)
    // Checks to see if there's a notification for the notification Id. If false throws badrequest
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    // If the if statement passes - deletes the found notification that matches the Id
    await dbContext.Notifications.findByIdAndDelete(notificationId)
  }

  async editSeen(accountId) {
    const result = await dbContext.Notifications.find({ recipient: accountId })
    // Checks to see if there's a notification where recipient matches your accountId. If false throws badrequest
    if (!result) {
      throw new BadRequest('You have no notifications')
    }
    // If the if statement passes - updates your notifications and flips the seen bool to true
    await dbContext.Notifications.updateMany({ recipient: accountId }, { seen: true }, { new: true })
    // Finds the updated notifications and returns them
    const update = await dbContext.Notifications.find({ recipient: accountId })
    return update
  }
}
export const notificationService = new NotificationService()
