import mongoose from 'mongoose'
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

export const NotificationSchema = new Schema(
  {
    notifier:{type:objectId, required:true, ref:'Account'},
    albumId: {type:objectId, required:true, ref:'Album'},
    seen: {type:Boolean, required:true, default:false},
    type:{type:String, enum:['post', 'collaborator'], required:true},
    isVerified:{type:Boolean},
    recipient:{type:objectId, ref:'Account'}
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
NotificationSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})
NotificationSchema.virtual('account', {
  localField: 'notifier',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
