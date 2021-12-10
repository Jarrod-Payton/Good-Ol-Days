import { SocketHandler } from '../utils/SocketHandler'
export class LiveChatHandler extends SocketHandler {
  constructor(io, socket) {
    super(io, socket)
    this
      .on('JOIN_ALBUM_ROOM', this.recieveAlbumJoin)
  }

  recieveAlbumJoin(roomName) {
    this.socket.join(roomName)
  }
}
