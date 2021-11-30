import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CollaboratorSchema = new Schema(
{
  albumId:{type:ObjectId, required:true, ref:'Album'},
  accountId:{type:ObjectId, required:true, ref:'Account'},
  verified:{type:Boolean, default:false}
},
{ timestamps: true, toJSON: { virtuals: true } }

)
CollaboratorSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})
CollaboratorSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})