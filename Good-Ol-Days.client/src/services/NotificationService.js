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
}

export const notificationService = new NotificationService()