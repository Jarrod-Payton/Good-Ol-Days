import { reactive } from 'vue'
import challengeData from './StaticData.json'
// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  suggestedChallenges: challengeData.suggestedChallenges,
  myAlbums: [],
  myGroupAlbums: [],
  activeAlbum: {},
  activeGroupAlbum: {},
  posts: [],
  challenges: [],
  activeChallenge: {},
  activePost: {},
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  activeQuote: '',
  collaborators: []
})
