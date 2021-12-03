import Pop from "../utils/Pop"

class NotificationService {
  findType(notification) {
    Pop.toast('Hello')
  }
}

export const notificationService = new NotificationService()