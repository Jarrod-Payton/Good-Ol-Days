import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  myAlbums: [],  
  myGroupAlbums: [],
  activeAlbum: {},
  posts: [{ title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  },{ title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  }, { title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  }],
  activeChallenge: {},
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  activeQuote: ''
})
