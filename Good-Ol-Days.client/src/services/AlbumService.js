import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class AlbumService {
  async getMyAlbums() {
    const res = await api.get(`/account/albums`)
    logger.log('All Albums', res.data)
    AppState.myAlbums = res.data
  }
  async setActiveAlbum(albumId) {
    const res = await api.get(`/api/albums/${albumId}`)
    logger.log('Active Album', res.data)
    AppState.activeAlbum = res.data
  }
  async getPosts(albumId) {
    const res = await api.get(`api/albums/${albumId}/posts`)
    logger.log('Posts', res.data)
  }
  async createAlbum(album) {
    logger.log('Album Info', album)
    const newPost = await api.post(`/api/albums`, album)
    AppState.activeAlbum = newPost.data
    return newPost.data
  }
  async deleteAlbum(albumId) {
    const res = await api.delete('api/albums/' + albumId)
    logger.log('DELETE ALBUM', res.data)
    AppState.myAlbums.filter(a => a.id !== albumId)
  }
  clear() {
    AppState.activeAlbum = {}
    AppState.activeGroupAlbum = {}
    AppState.collabThisAlbum = []
  }
}
export const albumService = new AlbumService()