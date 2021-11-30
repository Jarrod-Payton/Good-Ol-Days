import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  myAlbums: [],  
  myGroupAlbums: [],
  activeAlbum: {},
  posts: [{ title: 'Hello' }, { title: 'Hello' }, { title: 'New Row' }, { title: 'New Row 2' }, { title: 'New Row 3' }, { title: 'New Row 4' },],
  activeChallenge: {}
})
