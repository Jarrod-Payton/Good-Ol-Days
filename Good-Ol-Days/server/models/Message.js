import mongoose from 'mongoose'

const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

export const MessageSchema = new Schema(
  {
    creatorId: { type: objectId, required: true, ref: 'Account' },
    albumId: { type: objectId, required: true, ref: 'Album' },
    body: { type: String, required: true },
    seen: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

MessageSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

MessageSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
