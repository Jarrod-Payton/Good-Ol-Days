import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema(
  {
    coverImg: { type: String, required: true, default: 'https://firebasestorage.googleapis.com/v0/b/good-ol--days.appspot.com/o/defaultCoverImg%2Falbumpic.png?alt=media&token=47b73850-c9b5-411a-88af-e442f0dd43ee' },
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
