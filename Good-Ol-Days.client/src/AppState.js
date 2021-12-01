import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  myAlbums: [],  
  myGroupAlbums: [],
  activeAlbum: {},
  posts: [{ id: 1, title: 'Name here', imgUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  },{ id: 2, title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1633113214698-485cdb2f56fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"  }, { id: 3,title: 'Example of Name', imgUrl: "https://images.unsplash.com/photo-1628191013085-990d39ec25b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  }, { id: 4, title: 'Another One', imgUrl: "https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  }, { id: 5, title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  }, { id: 6, title: 'Example', imgUrl: "https://images.unsplash.com/photo-1506836467174-27f1042aa48c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"  }, { id: 7, title: 'Hello', imgUrl: "https://images.unsplash.com/photo-1588979355313-6711a095465f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=372&q=80"  },],
  activeChallenge: {},
  activePost: {},
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  activeQuote: ''
})
