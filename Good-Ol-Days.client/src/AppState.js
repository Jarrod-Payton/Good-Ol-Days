import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  suggestedChallenges: [{ type: 'Family', body: 'Take a photo that reminds you of your favorite memory with family' }, { type: 'Family', body: 'Take a photo with your nearest family member with your goofiest faces on' }, { type: 'Family', body: 'take a photo of you and a family member on an adventure' }, { type: 'Family', body: 'Take a photo of you and your family doing your favorite family activity' }, { type: 'Family', body: ' Take a photo with the youngest in the family near you eating their favorite kind of food' }, { type: 'Family', body: 'Take a photo of your family doing something they enjoy but act like you dont enjoy it' }, { type: 'Family', body: 'Take a photo of everyone in a ninja pose' }, { type: 'Family', body: 'Take a photo of you and your family with all your feet off the ground' }, { type: 'Family', body: 'Take a photo of your family at the park' }, { type: 'Family', body: 'Take a photo of you and your going on a walk' }, { type: 'Friends', body: 'Take a photo with your friends in your favorite place to eat' }, { type: 'Friends', body: 'Take a photo with the friend youve known the longest' }, { type: 'Friends', body: 'Take a photo with the friend who you didnt expect to get close with' }, { type: 'Friends', body: 'Take a weird really too close together selfie with a friend' }, { type: 'Friends', body: 'Take a photo of you and a friend doing something you enjoy together' }, { type: 'Fun', body: 'Take a photo of you conquering something small that most people wouldnt care about' }, { type: 'Fun', body: 'Take a photo of something that caught your eye' }, { type: 'Fun', body: 'Take a photo of something you thought was kind of funny but not hilarious' }, { type: 'Fun', body: 'Take a photo of your least favorite thing during your daily routine' }, { type: 'Fun', body: 'Take a photo of you in front of a store you despise' }, { type: 'SignificantOther', body: 'Take a photo of your Significant Other doing something you think deserves more praise' }, { type: 'SignificantOther', body: 'Take a photo of you and your Significant Other having fun' }, { type: 'SignificantOther', body: 'Take a photo of you and your Significant Other pretending to have not just disagreed' }, { type: 'SignificantOther', body: 'Take a photo of you and your Significant Other when you feel closest' }, { type: 'SignificantOther', body: 'Take a photo of you and your spouse at your favorite spot' }, { type: 'Child', body: 'Take a photo of your child doing something totally ridicoulous' }, { type: 'Child', body: 'Take a photo of your childs biggest accomplishment today' }, { type: 'Child', body: 'Take a photo of your child eating his favorite kind of food' }, { type: 'Child', body: 'Take a photo of your child eating something they probaobly shouldnt be allowed to eat given the circumstances' }, { type: 'Child', body: 'Take a photo of your child doing what they get the most thrill out of' }],
  recommendedChallenges: [],
  myAlbums: [],
  myGroupAlbums: [],
  activeAlbum: {},
  activeGroupAlbum: {},
  posts: [],
  activeChallenge: {},
  activePost: {},
  quotes: ['Things end but memories last forever.', 'Memories are timeless treasures of the heart.', 'Happy times come and go but the memories stay forever', 'It takes more than good memory to have good memories.', 'The best thing about memories is making them.', 'Little moments big memories.', 'A good life is a collection of good memories.'],
  activeQuote: '',
  collaborators: []
})
