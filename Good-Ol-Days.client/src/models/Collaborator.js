

export class Collaborator {
  constructor(data){
    this.albumId = data.albumId
    this.albumTitle = data.album.title
    this.picture = data.account.picture
    this.name = data.account.name
    this.accountId = data.accountId
    this.verified = data.verified
  }
}