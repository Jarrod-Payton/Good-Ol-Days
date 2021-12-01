import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class AlbumService {
  async getMyAlbums() {
    const res = await api.get(`/api/albums`)
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
    album.coverImg = `https://thiscatdoesnotexist.com`
    logger.log('Album Info', album)
    const newPost = await api.post(`/api/albums`, album)
    AppState.activeAlbum = newPost.data
    return newPost.data
  }
}
export const albumService = new AlbumService()