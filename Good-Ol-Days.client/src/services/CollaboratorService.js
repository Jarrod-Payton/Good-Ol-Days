import { AppState } from "../AppState"
import { Collaborator } from "../models/Collaborator"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CollaboratorService{
 async getAllMyCollabAlbums(){
   const res = await api.get('account/collaborators')
   logger.log('MY COLLAB ALBUMS', res.data)
   const collab = res.data.map( c => c = new Collaborator(c))
 AppState.collaborators = collab
 logger.log('APPSTATE COLLABORATORS', AppState.collaborators)
}
async getCollabThisAlbum(abumId){
  const res = await api.get('api/albums/' + abumId + '/collaborators' )
  const collab = res.data.map( c => c = new Collaborator(c))
  AppState.collabThisAlbum = collab
  logger.log('COLLAB THIS ALBUM', AppState.collabThisAlbum)

}
}
export const collaboratorService = new CollaboratorService()