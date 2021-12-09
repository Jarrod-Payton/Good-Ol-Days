import { reactive } from 'vue'
import challengeData from './StaticData.json'
// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  //A big ugly list of challenge suggestions all in their own object with their own type
  suggestedChallenges: challengeData.suggestedChallenges,
  //Set on the load of the home page which contains every album on that account
  myAlbums: [],
  myGroupAlbums: [],
  //Set on the Album Page so we can immediately grab whatever we need with only one network request 
  activeAlbum: {},
  //Every post for that album set in the album page on load
  posts: [],
  //Every challenge in that album's history and is set on the load for the album page
  challenges: [],
  //Is a filtered item set from the Challenge.vue component that is just the current challenges info
  activeChallenge: {},
  //Is used for the modal that opens up whenever you click on the post itself to store that posts info
  activePost: {},
  //A premade list of quotes that is filtered and used at the bottom of the Challenge.vue component
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  //A singular quote chosen at random from the list in quotes and stored for display purposes at the bottom of the Challenge.vue component
  activeQuote: '',
  //Every collaborator for the active album
  collaborators: [],
  collabThisAlbum: [],
  //A simple boolean that is flipped and watched for the beggining of the onMounted in the album page in order to prevent a glimpse of a form, purely for a better experience and not actually needed for raw functionality
  doneSyncing: false,
  //A bool so when you leave your off canvas for the profile edit you don't stay on that edit
  editProfile: true,
  //A list of every notification set a user has and is set in the NavHome.vue component's on load
  photoFlipped: true,
  notifications: [],
  postChallenge: {},
})
