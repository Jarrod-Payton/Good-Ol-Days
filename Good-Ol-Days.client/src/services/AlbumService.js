import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class AlbumService {
  async getMyAlbums() {
    // Get all albums created by current account
    const res = await api.get(`/account/albums`)
    logger.log('All Albums', res.data)
    AppState.myAlbums = res.data
  }
  async setActiveAlbum(albumId) {
    // Set active Album with album ID
    const res = await api.get(`/api/albums/${albumId}`)
    logger.log('Active Album', res.data)
    AppState.activeAlbum = res.data
  }
  async getPosts(albumId) {
    // Get all posts for active Album with album ID
    const res = await api.get(`api/albums/${albumId}/posts`)
    logger.log('Posts', res.data)
  }
  async createAlbum(album) {
    // Creates a new Album with Album Data
    logger.log('Album Info', album)
    const newPost = await api.post(`/api/albums`, album)
    AppState.activeAlbum = newPost.data
    return newPost.data
  }
  async deleteAlbum(albumId) {
    // Deletes an Album with album ID
    const res = await api.delete('api/albums/' + albumId)
    logger.log('DELETE ALBUM', res.data)
    AppState.myAlbums.filter(a => a.id !== albumId)
  }
  clear() {
    // Clear the data in AppState for activeAlbum and collabThisAlbum
    AppState.activeAlbum = {}
    AppState.collabThisAlbum = []
  }
}
export const albumService = new AlbumService()