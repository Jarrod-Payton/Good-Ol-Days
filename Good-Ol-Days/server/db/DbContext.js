import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album'
import { ChallengeSchema } from '../models/Challenge'
import { CollaboratorSchema } from '../models/Collaborator'
import { MessageSchema } from '../models/Message'
import { NotificationSchema } from '../models/Notification'
import { PostSchema } from '../models/Post'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Albums = mongoose.model('Album', AlbumSchema)

  Challenges = mongoose.model('Challenge', ChallengeSchema)

  Collaborators = mongoose.model('Collaborator', CollaboratorSchema)

  Posts = mongoose.model('Post', PostSchema)

  Notifications = mongoose.model('Notification', NotificationSchema)

  Messages = mongoose.model('Message', MessageSchema)
}

export const dbContext = new DbContext()
