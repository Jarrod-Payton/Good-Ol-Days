import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NotificationSchema = new Schema(
  {
    message:{type:String, required:true},
    seen: {type:Boolean, required:true, default:false},
    type:{type:String, enum:['post', 'collaborator'], required:true},
    isAnswered:{type:Boolean, default:false}
  },
  { timestamps: true, toJSON: { virtuals: true } }

)