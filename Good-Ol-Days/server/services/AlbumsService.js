import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { firebaseService } from './FirebaseService'

class AlbumsService {
  async getAllMyAlbums(body) {
    return await dbContext.Albums.find({ creatorId: body.creatorId })
  }

  async getAlbumById(id) {
    const result = await dbContext.Albums.findById(id).populate('creator')
    if (!result) {
      throw new BadRequest('Invalid Id')
    }
    return result
  }

  async createAlbum(body) {
    const newAlbum = await dbContext.Albums.create(body)
    return newAlbum.populate('creator')
  }

  async editAlbum(id, body) {
    const found = await this.getAlbumById(id)
    if (found.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You do not have permission to delete this')
    }
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    const updatedAlbum = await dbContext.Albums.findByIdAndUpdate(id, body, { new: true })
    return updatedAlbum
  }

  async deleteAlbum(body, userInfo) {
    const found = await this.getAlbumById(body.id)
    if (found.creatorId.toString() !== userInfo.id) {
      throw new Forbidden('You do not have permission to delete this')
    }
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    await firebaseService.deleteFirebaseFolder(found.title)
    await dbContext.Albums.findByIdAndDelete(body.id)
    await dbContext.Posts.deleteMany({ albumId: body.id })
    await dbContext.Challenges.deleteMany({ albumId: body.id })
    await dbContext.Collaborators.deleteMany({ albumId: body.id })
  }
}
export const albumsService = new AlbumsService()
