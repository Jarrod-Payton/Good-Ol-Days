import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class NotificationService {
  async getMyNotifications() {
    const res = await api.get(`account/notifications`)
    logger.log('Notifications', res.data)
    AppState.notifications = res.data
  }
  findType(notification) {
    if (notification.type === "post") {
      return false
    }
    if (notification.type === "collaborator") {
      return true
    }
  }
  async deleteNotification(notificationId) {
    await api.delete(`account/notifications/${notificationId}`)
    AppState.notifications = AppState.notifications.filter(n => n.id != notificationId)
    Pop.toast('Deleted Notification')
  }
  async seen() {
    await api.put(`account/notifications`)
  }
  async clear() {
    for (let n = 0; n < AppState.notifications.length; n++) {
      api.delete(`account/notifications/${n.id}`)
    }
    AppState.notifications = []
  }
}

export const notificationService = new NotificationService()