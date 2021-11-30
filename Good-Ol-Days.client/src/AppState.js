import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  myAlbums: [],  
  myGroupAlbums: [],
  activeAlbum: {},
  posts: [{ title: 'Hello' }, { title: 'Hello' }, { title: 'New Row' }, { title: 'New Row 2' }, { title: 'New Row 3' }, { title: 'New Row 4' },],
  activeChallenge: {},
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  activeQuote: ''
})
