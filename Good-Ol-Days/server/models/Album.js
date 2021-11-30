import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const lightWood = 'https://images.unsplash.com/photo-1597113366853-fea190b6cd82?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
const darkWood = 'https://images.unsplash.com/photo-1541138858526-9f296df15693?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
const dark = 'https://images.unsplash.com/photo-1585773816589-99af4e1711c1?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1223&q=80'
const board = 'https://images.unsplash.com/photo-1558051815-0f18e64e6280?ixlib=rb-1.2.1&ixid=MnwxMjA3[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'


export const AlbumSchema = new Schema(
{
  coverImg:{type:String, required:true},
  hasChallenges:{type:Boolean, required:true, default:false},
  creatorId: {type:ObjectId, required: true, ref:'Profile'},
  title: {type: String, requried: true},
  // background: {type:String, enum:[lightWood, darkWood, dark, board], default:darkWood}

},
{ timestamps: true, toJSON: { virtuals: true } }
)
AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})