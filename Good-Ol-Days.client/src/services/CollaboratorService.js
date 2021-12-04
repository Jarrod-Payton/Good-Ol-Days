import { AppState } from "../AppState"
import { Collaborator } from "../models/Collaborator"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class CollaboratorService {
  async getAllMyCollabAlbums() {
    const res = await api.get('account/collaborators')
    logger.log('MY COLLAB ALBUMS', res.data)
    const collab = res.data.map(c => c = new Collaborator(c))
    AppState.collaborators = collab
    logger.log('APPSTATE COLLABORATORS', AppState.collaborators)
  }
  async getCollabThisAlbum(albumId) {
    const res = await api.get('api/albums/' + albumId + '/collaborators')
    const collab = res.data.map(c => c = new Collaborator(c))
    AppState.collabThisAlbum = collab
    logger.log('COLLAB THIS ALBUM', AppState.collabThisAlbum)
  }


  async verify(id) {
    const res = await api.put('api/collaborators/' + id)
    logger.log('VERIFY COLLAB', res.data)
  }
  async addColab(albumId) {
    const res = await api.post('api/collaborators', { albumId: albumId })
    logger.log('ADD COLLAB', res.data)
  }
  async acceptColab() {
    Pop.toast('Accepted Collab')
  }
}
export const collaboratorService = new CollaboratorService()