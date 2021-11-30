import Pop from "../utils/Pop"

class AlbumService {
  async setActiveAlbum(albumId) {
    Pop.toast('Hello')
  }
}
export const albumService = new AlbumService()