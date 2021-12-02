import mongoose from 'mongoose'
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

export const NotificationSchema = new Schema(
  {
    notifier:{type:String, required:true},
    albumName: {type:String, required:true},
    seen: {type:Boolean, required:true, default:false},
    type:{type:String, enum:['post', 'collaborator'], required:true},
    isAnswered:{type:Boolean},
    recipients:[{type:objectId, ref:'Profile'}]
  },
  { timestamps: true, toJSON: { virtuals: true } }

)