import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class MessagesService {
  async getAll(id) {
    const messages = await dbContext.Messages.find({ albumId: id })
    return messages
  }

  async findById(id) {
    const message = await dbContext.Messages.findById(id)
    return message
  }

  async updateMessages(albumId) {
    const update = await dbContext.Messages.updateMany({ albumId: albumId }, { seen: true })
    return update
  }

  async createMessage(body) {
    const message = await dbContext.Messages.create(body)
    return message
  }

  async deleteMessage(messageId, userId) {
    const found = await this.findById(messageId)
    if (!found) {
      throw new BadRequest('This message does not exsist')
    }
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your message')
    }
    await dbContext.Messages.findByIdAndDelete(messageId)
  }
}
export const messagesService = new MessagesService()
