import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const PostSchema = new Schema(
  {
    imgUrl: { type: String },
    title: { type: String, required: true, default: '' },
    type: { type: String, required: true },
    description: { type: String, required: true, default: '' },
    creatorId: { type: String, required: true, ref: 'Profile' },
    albumId: { type: ObjectId, required: true, ref: 'Album' },
    challengeId: { type: ObjectId, ref: 'Challenge' }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)

PostSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

PostSchema.virtual('challenge', {
  localField: 'challengeId',
  foreignField: '_id',
  justOne: true,
  ref: 'Challenge'
})
PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
