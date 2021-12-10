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
      .on('NEW_MESSAGE', this.recieveAlbumMessage)
    //TODO write recieved function here to catch emits from server
  }
  
  recieveAlbumMessage(payload) {
    logger.log('RECIEVING_ALBUM_MESSAGE')
    AppState.messages.push(payload)
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
