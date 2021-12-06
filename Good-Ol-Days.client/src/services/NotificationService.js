import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class NotificationService {
  async getMyNotifications() {
    //This grabs all of the notifications wether seen or not and sets them to the AppState to be filtered or shown later on
    const res = await api.get(`account/notifications`)
    logger.log('Notifications', res.data)
    AppState.notifications = res.data
  }
  async deleteNotification(notificationId) {
    //This just deletes the notification by notification id and filters the AppState so it deletes on the user end without refresh
    await api.delete(`account/notifications/${notificationId}`)
    AppState.notifications = AppState.notifications.filter(n => n.id != notificationId)
    Pop.toast('Deleted Notification')
  }
  async seen() {
    //this just sets all the notifications on someones profile to seen
    await api.put(`account/notifications`)
  }
  async clear() {
    //This just deletes every notification that a person has through a simple forloop
    for (let n = 0; n < AppState.notifications.length; n++) {
      api.delete(`account/notifications/${AppState.notifications[n].id}`)
    }
    AppState.notifications = []
  }
}

export const notificationService = new NotificationService()