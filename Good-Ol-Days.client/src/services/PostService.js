import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"
import { challengeService } from "./ChallengeService"



class PostService {
  async setActive(id) {
    // Set post to Active Post
    const active = AppState.posts.find(p => p.id === id)
    AppState.activePost = active
    if (active.challengeId) {
      await challengeService.getPostChallenge(active.challengeId)
    }
  }
  async getPosts(albumId) {
    // Get all posts for this album with album ID
    const res = await api.get(`api/albums/${albumId}/posts`)
    AppState.posts = res.data
    AppState.doneSyncing = true
    this.sort('mostRecent')
  }
  async createPost(body, hasChallenge) {
    // Create a new post with post body and if it has challenge or not
    if (hasChallenge === 'true') {
      body.challengeId = AppState.activeChallenge.id
    }
    body.albumId = AppState.activeAlbum.id
    const res = await api.post('api/posts', body)
    AppState.posts.push(res.data)
    this.sort('mostRecent')
  }
  async deletePost() {
    // Deletes a post with the active Post ID
    await api.delete(`api/posts/${AppState.activePost.id}`)
    AppState.posts = AppState.posts.filter(p => p.id !== AppState.activePost.id)
    AppState.activePost = {}
    Pop.toast('Deleted Post')
  }

  sort(type) {
    let sorted = []
    if (type == 'mostRecent') {
      logger.log('mostRecent')
      sorted = AppState.posts.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    }
    else if (type === 'oldest') {
      sorted = AppState.posts.sort(function (a, b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
    }
    else if (type == 'aToZ') {
      sorted = AppState.posts.sort(function (a, b) {
        if (a.title < b.title) { return -1 }
        if (a.title > b.title) { return 1 }
        return 0
      })
    }
    else if (type == 'zToA') {
      sorted = AppState.posts.sort(function (a, b) {
        if (a.title > b.title) { return -1 }
        if (a.title < b.title) { return 1 }
        return 0
      })
    }
    else if (type == 'challenges') {
      sorted = AppState.posts.sort(function (a, b) {
        if (a.challengeId) { return -1 }
        if (!a.challengeId) { return 1 }
        return 0
      })
    }
    AppState.posts = sorted
  }
}
export const postService = new PostService()