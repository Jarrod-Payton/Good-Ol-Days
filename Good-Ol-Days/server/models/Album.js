import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema(
  {
    coverImg: { type: String, required: true, default: 'https://firebasestorage.googleapis.com/v0/b/good-ol--days.appspot.com/o/albumpic.png?alt=media&token=44c45d74-d3d4-41eb-8d98-bc4dc4a48d5e' },
    hasChallenges: { type: Boolean, required: true, default: false },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' },
    title: { type: String, requried: true },
    background: { type: String, enum: ['lightWood', 'darkWood', 'dark', 'board'], default: 'darkWood' }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
