import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { firebaseService } from './FirebaseService'

class AlbumsService {
  // This gets all of my Albums that I am the creator for. "I" being the current user
  async getAllMyAlbums(body) {
    return await dbContext.Albums.find({ creatorId: body.creatorId })
  }

  // This will get just the single Album Id and populate the creator
  async getAlbumById(id) {
    const result = await dbContext.Albums.findById(id).populate('creator')
    // if there is no Id, throw bad request
    if (!result) {
      throw new BadRequest('Invalid Id')
    }
    return result
  }

  // This will create an album, passing the body or our information into the schema
  async createAlbum(body) {
    const newAlbum = await dbContext.Albums.create(body)
    return newAlbum.populate('creator')
  }

  // This will edit an album.
  async editAlbum(id, body) {
    // First we need to get the album's Id
    const found = await this.getAlbumById(id)
    // checks if the single album Id's creator is the same as the user (creatorId) logged in
    if (found.creatorId.toString() !== body.creatorId) {
      // if it does not match (because of the !), you don't have permission to edit a post
      throw new Forbidden('You do not have permission to delete this')
    }
    // if theere is no Id, throw BadRequest
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    // Go into mongoose and into the Album schema, find by Id, Id being the albumId(declared in the controller) and update it with the new info put in
    const updatedAlbum = await dbContext.Albums.findByIdAndUpdate(id, body, { new: true })
    return updatedAlbum
  }

  // This function will delete an album and delete everything else inside of the album (cascading delete)
  async deleteAlbum(body, userInfo) {
    // First we find the album Id
    const found = await this.getAlbumById(body.id)
    // This if will check if creatorId on the album is equal to the current user's Id
    if (found.creatorId.toString() !== userInfo.id) {
      // if it does not match (because of the !), you don't have permission to edit a post
      throw new Forbidden('You do not have permission to delete this')
    }
    if (!found) {
      // if there is no Id, throw BadRequest
      throw new BadRequest('Invalid Id')
    }
    // deletes the album from firebase
    await firebaseService.deleteFirebaseFolder(found.title, userInfo)
    // Delete the album from database then cascade deletes posts/challenges/collabs/contifications associated to the album
    await dbContext.Albums.findByIdAndDelete(body.id)
    await dbContext.Posts.deleteMany({ albumId: body.id })
    await dbContext.Challenges.deleteMany({ albumId: body.id })
    await dbContext.Collaborators.deleteMany({ albumId: body.id })
    await dbContext.Notifications.deleteMany({ albumId: body.id })
  }
}
export const albumsService = new AlbumsService()
