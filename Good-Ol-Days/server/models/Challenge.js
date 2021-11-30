import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const ChallengeSchema = new Schema(
{
  title: {type:String, requried:true},
  albumId: {type:ObjectId, required:true, ref:'Album'}
},
{ timestamps: true, toJSON: { virtuals: true } }
)
ChallengeSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})