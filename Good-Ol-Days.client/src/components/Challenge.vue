<template >
  <div>
    <div class="row m-0">
      <!--This is a if statement that is only there for a better UI experience so that you aren't seeing a glimpse of an empty form and the previous posts from the last album-->
      <div class="col-12 paddingmobile" v-if="doneSyncing">
        <div class="d-flex justify-content-center align-content-center">
          <div class="card cardspec">
            <div class="card-body">
              <!--This is the make some memories header-->
              <div class="row">
                <div class="col-12">
                  <h2 class="text-center font pb-3 pt-2 text-sm-h2">
                    Let's make some memories!
                  </h2>
                </div>
              </div>
              <!--This is for when the challenge is active-->
              <div class="row" v-if="activeChallenge?.title">
                <div class="col-12">
                  <h3 class="font limeText weeklyChallenges">
                    Weekly Challenge:
                  </h3>
                </div>
                <div class="col-12">
                  <!-- This is where we will put the challenge if we have one -->
                  <h3 class="font takeAPhoto challengeFont">
                    {{ activeChallenge.title }}
                  </h3>
                </div>
                <div class="col-12">
                  <div
                    class="d-flex justify-content-end align-content-center mt-4"
                  >
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#createPostModal"
                      class="customBtn btn btn-success cloudy"
                      title="Upload Photo"
                    >
                      <div class="d-flex align-items-center">
                        <i class="mdi mdi-cloud-upload me-1" />
                        <h5 class="upload">Upload</h5>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <!--If No Challenge-->
              <div class="row" v-if="!activeChallenge.title">
                <div class="col-12" v-if="activeAlbum.creatorId === account.id">
                  <!--This is in place to make sure only the creator can choose the next challenge and if you take away the v-show then it will still work as intended-->
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex">
                        <h5 class="font">
                          Here are some suggested challenges:
                        </h5>
                        <!--A spot for the client to choose the type of suggestion he desires which is used to go through a filter-->
                        <select
                          class="heightSet font mx-2 px-2 py-0 font"
                          v-model="type"
                        >
                          <option value="General">General</option>
                          <option value="Family">Family</option>
                          <option value="Friends">Friends</option>
                          <option value="Fun">Random / Fun</option>
                          <option value="SignificantOther">
                            Significant Other
                          </option>
                          <option value="Child">Child</option>
                          <option value="Meme">Meme</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <!--This whole DIV is just to be able to re run the function that gets your three suggestions-->
                      <div class="heightSet px-1 d-flex shuffleParent">
                        <h5 class="font shuffleSuggest">
                          Shuffle Suggestions:
                        </h5>
                        <i
                          class="
                            mdi mdi-shuffle-variant
                            selectable1
                            refreshButton
                            border-2
                            px-1
                            mb-5
                          "
                          title="Refresh Options"
                          @click="refreshOptions"
                        />
                      </div>
                    </div>
                  </div>
                  <!--This is to get the cards for the three challenges and uses a v-for to make one for each-->
                  <div class="row">
                    <div class="col-12" v-for="s in mySuggestions" :key="s">
                      <ChallengeSuggestions :suggestion="s" />
                    </div>
                  </div>
                  <!--This whole DIV is used to toggle a form which gives the client the chance to work in their own challenge if they don't want or like the suggested ones-->
                  <div class="row">
                    <div class="col-12">
                      <h5 class="font createOwnText">
                        Don't like ours? try making your own!
                        <i
                          class="mdi mdi-comment-edit selectable1"
                          title="Refresh Options"
                          @click="toggleMakeOwn"
                        />
                      </h5>
                      <form @submit.prevent="madeChallenge" v-if="makeOwn">
                        <input
                          type="text"
                          required
                          class="form-control border-white inputField font"
                          v-model="form"
                          placeholder="What would you like your challenge for the week to be ..."
                          maxlength="200"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-12" v-else>
                  <div class="d-flex justify-content-center">
                    <h2 class="text-center pt-2 font">
                      As a collaborator you have to wait for the creator to
                      select a challenge
                    </h2>
                  </div>
                </div>
              </div>
              <!--This is for the quote being shown-->
            </div>
            <div class="row m-0">
              <div class="col-12 align-self-end">
                <p class="text-center mt-3 quote-font">"{{ quote }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--This is the loading icon so that the user sees a loading icon while the application is getting their challenge and posts so they don't feel inclined to refresh before the request is finished-->
      <div class="col-12" v-else>
        <div class="card cardspec">
          <div class="card-body">
            <div class="d-flex justify-content-center align-items-center">
              <i class="mdi mdi-spin mdi-loading loadingthing text-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { quoteService } from "../services/QuoteService"
import { challengeService } from "../services/ChallengeService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  //If you are a collaborator you can see the challenge, this is to pass down the collaborators
  setup() {
    //The filter for the suggested challenges
    const type = ref('')
    //The list of three suggestions
    const mySuggestions = ref([])
    //The form to create your own challenge
    const form = ref('')
    //The ref to toggle open or closed the create your own form
    const makeOwn = ref(false)
    watchEffect(() => {
      //One of my instructors Mark Ohnsman helped me write this code for a different project and it is brilliant for the suggested challenge filter by type, we had to use a variable because the watchEffect looks for changes in the variables displayed in order to trigger the function but if we used the straight AppState then we ran into a problem where it was seeing the AppState constantly chaning so it was always re running the function
      let s = AppState.suggestedChallenges
      //If the string isn't empty
      if (type.value != '') {
        //Filters the AppState
        s = AppState.suggestedChallenges.filter(s => s.type == type.value)
        //Grabs three challenges based on the array given
        mySuggestions.value = challengeService.grabThreeChallenges(s)
      }
    })
    onMounted(async () => {
      //Sets the active quote
      await quoteService.setActiveQuote()
      //Sets the value of the filter for suggested challenges to start at general
      type.value = 'General'
    })
    return {
      form,
      type,
      mySuggestions,
      makeOwn,
      toggleMakeOwn() {
        try {
          //Just flipps the value of the form being displayed
          makeOwn.value = !makeOwn.value
        } catch (error) {
          logger.log(error)
        }
      },
      async madeChallenge() {
        //Sends the challenge up to the server and sets it as the active Challenge
        await challengeService.createActiveChallenge(form.value)
      },
      refreshOptions() {
        //Same exact code from the watchEffect in order to reroll the three suggested challenges
        let s = AppState.suggestedChallenges
        if (type.value != '') {
          s = AppState.suggestedChallenges.filter(s => s.type == type.value)
          mySuggestions.value = challengeService.grabThreeChallenges(s)
        } else {
          Pop.toast('You need to select a genre')
        }
      },
      quote: computed(() => AppState.activeQuote),
      MyChallenges: computed(() => AppState.suggestedChallenges),
      activeChallenge: computed(() => AppState.activeChallenge),
      activeAlbum: computed(() => AppState.activeAlbum),
      doneSyncing: computed(() => AppState.doneSyncing),
      account: computed(() => AppState.account),
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
    }
  },
}
</script>
<style scoped>
.upload {
  font-size: 1.5vh;
  margin-top: 1vh;
}
.quote-font {
  font-size: 1.47vh;
  font-family: "Saira Condensed", sans-serif;
}
.loadingthing {
  font-size: 3vh;
  width: 10vh;
  height: 10vh;
}
.card-thing {
  size: 100%;
}
.cloudy {
  margin-top: 3vh;
  font-size: 2vh;
}
.weeklyChallenges {
  margin-bottom: 3vh;
}
.takeAPhoto {
  padding-top: 0.5vh;
  padding-left: 1vh;
  margin-bottom: 1vh;
}
.createOwnText {
  padding-top: 0.4vh;
  padding-left: 1vh;
}
.shuffleSuggest {
  padding-top: 0.3vh;
  padding-right: 0.2vh;
}
.shuffleParent {
  padding-top: 1.3vh;
  margin-left: 1vh;
  padding-bottom: 2vh;
}
.inputField {
  border-color: #4ac26d !important;
  border-width: 0.2vh;
  border-radius: 0vh;
}
.refreshButton {
  font-size: 2.2vh;
}
.heightSet {
  height: 3vh;
}
.widthButton {
  width: 2vh;
  padding: 0;
}
.buttonscss {
  background-color: #4ac26d;
  margin-top: 0vh;
  margin-right: 3vh;
  color: white;
  font-size: 1.5vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
.cardspec {
  height: 100%;
  width: 70%;
  min-height: 40vh;
  border-width: 5px;
  border-radius: 0;
  border-color: #4ac26d;
  background-color: rgb(245, 245, 245, 0.9);
}
.font {
  font-family: "Saira Condensed", sans-serif;
}
.limeText {
  color: #4ac26d;
}
.customBtn {
  background-color: #4ac26d;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 0;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
}
@media only screen and (max-width: 500px) {
  .challengeFont {
    font-size: 2.5vh !important;
  }
  .upload {
    font-size: 1.4vh;
    margin-top: 1vh;
  }
  .cloudy {
    margin-top: 1vh;
    font-size: 1.3vh;
  }
  .cardspec {
    height: 100%;
    width: 100%;
    min-height: 20vh;
    border-width: 5px;
    border-radius: 0;
    border-color: #4ac26d;
    background-color: rgb(245, 245, 245, 0.9);
  }
  .text-sm-h2 {
    font-size: 3vh;
  }
  .paddingmobile {
    padding: 0;
  }
  .font {
    font-size: 1.4vh;
  }
  .refreshButton {
    font-size: 1.5vh;
  }
  .quote-font {
    font-size: 1.2vh;
    font-family: "Saira Condensed", sans-serif;
  }
  .customBtn {
    background-color: #4ac26d;
    color: rgb(255, 255, 255);
    font-family: "Saira Condensed", sans-serif;
    padding: 0px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 4vh;
  }
}
</style>