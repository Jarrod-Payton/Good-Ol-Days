import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('NEW_NOTIFICATION', this.recieveCollabNotification)
    //TODO write recieved function here to catch emits from server
  }
  recieveCollabNotification(payload) {
    logger.log('HIT_DA_SOCKET')
    AppState.notifications = payload
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
