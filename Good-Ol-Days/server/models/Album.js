import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema(
  {
    coverImg: { type: String, required: true, default: 'https://firebasestorage.googleapis.com/v0/b/good-ol--days.appspot.com/o/albumpic.png?alt=media&token=7bd4da52-8d3a-4d28-8ea0-5c56862e4df3' },
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
