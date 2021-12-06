import { AppState } from "../AppState"
import { Collaborator } from "../models/Collaborator"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"
import { notificationService } from "./NotificationService"


class CollaboratorService {
  async getAllMyCollabAlbums() {
    // Get all the colaborations verified true for this account
    const res = await api.get('account/collaborators')
    logger.log('MY COLLAB ALBUMS', res.data)
    const collab = res.data.map(c => c = new Collaborator(c))
    AppState.collaborators = collab
    logger.log('APPSTATE COLLABORATORS', AppState.collaborators)
  }
  async getCollabThisAlbum(albumId) {
    // Get all the collaborator for this album, verify true or false with album ID
    const res = await api.get('api/albums/' + albumId + '/collaborators')
    const collab = res.data.map(c => c = new Collaborator(c))
    AppState.collabThisAlbum = collab
    logger.log('COLLAB THIS ALBUM', AppState.collabThisAlbum)
  }


  async verify(id) {
    // Change the verify to true with the collaboration ID
    const res = await api.put('api/collaborators/' + id)
    logger.log('VERIFY COLLAB', res.data)
  }
  async unverify(collab){
    const res = await api.delete(`api/collaborators/${collab.id}`)
    logger.log(`Collaboration with ${collab.name} ended`, res.data )
  }
  async addColab(albumId) {
    // Add someone as collaborator but verify is false with the album ID
    const res = await api.post('api/collaborators', { albumId: albumId })
    logger.log('ADD COLLAB', res.data)
  }
  async acceptColab(notification) {
    // Get the album that this collab if from, with album ID from the notification
    const album = AppState.myAlbums.find(a => a.id === notification.albumId)
    logger.log('TEST JOHN 1', album)
    // Get All collabs on this album with the album ID
    await this.getCollabThisAlbum(album.id)
    // Get the person that matches the notification that you accepted to change verify to true
    const collabToAccept = AppState.collabThisAlbum.find(c => c.accountId === notification.notifier.id)
    logger.log('TEST JOHN 2', collabToAccept)
    // Change the verify to true with the collaboration ID
    await this.verify(collabToAccept.id)
    // Delete that notification with notification ID
    await api.delete(`account/notifications/${notification.id}`)
    AppState.notifications = AppState.notifications.filter(n => n.id != notification.id)
    Pop.toast('Accepted Collab')
  }
  async Deny(notification) {
    // Get the album that this collab if from, with album ID from the notification
    const album = AppState.myAlbums.find(a => a.id === notification.albumId)
    logger.log('TEST Jarrod 1', album)
    // Get All collabs on this album with the album ID
    await this.getCollabThisAlbum(album.id)
    // Get the person that matches the notification that you accepted to change verify to true
    const collab = AppState.collabThisAlbum.find(c => c.accountId === notification.notifier.id)
    logger.log('TEST JOHN 2', collab)
    await api.delete(`api/collaborators/${collab.id}`)
  }
}
export const collaboratorService = new CollaboratorService()