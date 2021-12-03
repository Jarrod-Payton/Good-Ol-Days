import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema(
  {
    // This default coverImg is from firebase and it is our default Album image
    coverImg: { type: String, required: true, default: 'https://firebasestorage.googleapis.com/v0/b/good-ol--days.appspot.com/o/defaultCoverImg%2Falbumpic.png?alt=media&token=a18e9380-4b7f-42ba-bb37-0e38ed2da186' },
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
